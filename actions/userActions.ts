'use server'
import prisma from '@/lib/prisma'
import { signIn } from "@/lib/auth"
import bcrypt from 'bcryptjs'
import { ActionResult, SignUpData } from '@/types'
import { Prisma } from '@prisma/client'

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

export type UserWithPerson = Prisma.UserGetPayload<{
  select: {
    id: boolean,
    email: boolean,
    personId: boolean,
    person: { select: { firstName: boolean, lastName: boolean }}
    emailVerified: boolean,
  }
}>

const getAllUsers = async (): Promise<ActionResult<UserWithPerson[]>> => {
  const users: UserWithPerson[] = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      personId: true,
      person: { select: {firstName: true, lastName: true }},
      emailVerified: true,
    }
  })
  
  return {
    success: true,
    value: users,
  }
}

const signUpAction = async (data: SignUpData): Promise<ActionResult> => {
  const dbUser = await prisma.user.findFirst({ where: { email: data.email }})
  if (dbUser) return { success: false, error: 'User already exists' }

  await prisma.user.create({
    data: {
      email: data.email,
      password: crypt(data.password),
      person: { create: {
        firstName: data.firstName,
        lastName: data.lastName,
      }},
      userRoles: { create: [
        { role: 'USER' }
      ]}
    }
  })
  
  await signIn('sendgrid-signup', {
    email: data.email,
    redirectTo: '/email-verified',
  })

  return { success: true }
}

const resetPasswordAction = async (email: string, password: string): Promise<ActionResult> => {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('User not found')
  }

  await prisma.user.update({
    where: { email },
    data: {
      password: crypt(password)
    }
  })

  return { success: true }
}

export {
  getAllUsers,
  signUpAction,
  resetPasswordAction
}
