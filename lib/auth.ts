import NextAuth, { User } from 'next-auth'
import { encode as defaultEncode } from 'next-auth/jwt'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Prisma } from '@prisma/client'
import { Adapter, AdapterSession } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import SendGrid from 'next-auth/providers/sendgrid'
import { compare } from 'bcryptjs'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

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
    signIn: '/sign-in',
    signOut: '/sign-out',
    newUser: '/sign-up',
    verifyRequest: '/verify-request',
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

    SendGrid({}),
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
