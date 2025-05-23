import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import prisma from './prisma'
import { compare } from 'bcryptjs'

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
          placeholder: 'johndoe@gmail.com',
        },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: '*****',
        },
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
          id: dbUser.id.toString(),
          name: dbUser.person.firstName + ' ' + dbUser.person.lastName,
          email: dbUser.email,
          image: dbUser.image
        }
        return user
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) return {
        ...token,
        id: user.id
      }
      return token
    },
    authorized: async ({ auth }) => {
      return !!auth
    },
  }
})
