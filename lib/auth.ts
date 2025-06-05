import NextAuth, { User } from 'next-auth'
import { encode as defaultEncode } from 'next-auth/jwt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Prisma } from '@prisma/client'
import { Adapter, AdapterSession } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import crypto from 'crypto'
import prisma from '@/lib/prisma'
import { sendVerificationRequest } from '@/lib/authSendRequest'

const CustomPrismaAdapter = (prismaClient: typeof prisma): Adapter => {
  const prismaAdapter: Adapter = PrismaAdapter(prismaClient)

  return {
    ...prismaAdapter,
    createSession: async (session): Promise<AdapterSession> => {
      const data: Prisma.SessionUncheckedCreateInput = {
        ...session,
        userId: Number(session.userId),
      }

      const dbSession = await prismaClient.session.create({ data })
      return {
        ...dbSession,
        userId: String(dbSession.userId)
      } as AdapterSession
    },
  }
}

const adapter = CustomPrismaAdapter(prisma)

export const { handlers, signIn, signOut, auth } = NextAuth({
  // debug: process.env.NODE_ENV === 'development',
  adapter,
  pages: {
    error: '/user/error',
    signIn: '/user/sign-in',
    signOut: '/user/sign-out',
    newUser: '/user/sign-up',
    verifyRequest: '/user/verify-request',
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null

        const dbUser =
          await prisma.user.findUnique({
            where: { email: credentials.email as string },
            include: { person: true }
          })
        if (!dbUser) return null

        const isPasswordValid = await compare(credentials.password as string, dbUser.password as string)
        if (!isPasswordValid) return null

        const user: User = {
          id: String(dbUser.id),
          name: dbUser.person?.firstName + ' ' + dbUser.person?.lastName,
          email: dbUser.email,
          image: dbUser.image
        }
        return user
      },
    }),

    {
      id: 'sendgrid-signup',
      type: 'email',
      name: 'SendGrid Sign Up',
      maxAge: 24 * 60 * 60,
      sendVerificationRequest,
      options: {
        apiKey: process.env.AUTH_SENDGRID_KEY,
        from: 'no-reply@payroll8.net',
      },
    },

    {
      id: 'sendgrid-reset',
      type: 'email',
      name: 'SendGrid Reset Password',
      maxAge: 24 * 60 * 60,
      sendVerificationRequest,
      options: {
        apiKey: process.env.AUTH_SENDGRID_KEY,
        from: 'no-reply@payroll8.net',
      },
    },
  ],

  callbacks: {
    jwt: ({ token, account }) => {
      if (account?.provider === 'credentials') {
        token.credentials = true
      }
      return token
    },
  },

  jwt: {
    encode: async (params) => {
      if (params.token?.credentials) {
        const sessionToken = crypto.randomUUID()

        if (!params.token.sub) {
          throw new Error('User ID not found in token')
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        if (!createdSession) {
          throw new Error('Failed to create session in database')
        }

        return sessionToken
      }
      return defaultEncode(params)
    },
  },
})
