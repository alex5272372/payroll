'use server'
import prisma from '@/lib/prisma'
import { signIn } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { ActionResult, SignUpData } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { AuthProvider } from '@/types/enums'
import { UserResponse } from '@/types/models/userModels'
import { z } from 'zod'

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

const passwordSchema = z.string().min(8).max(80)
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/\d/, 'Must contain a number')

const signUpSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(100),
  password: passwordSchema,
})

const resetPasswordSchema = z.object({
  email: z.string().email().max(100),
  password: passwordSchema,
})

const getAllUsers = async (): Promise<ActionResult<UserResponse[]>> => {
  const guard = await authorize(MenuItemPath.USERS, CRUD.READ)
  if (guard) return guard

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      personId: true,
      person: { select: { firstName: true, lastName: true }},
      emailVerified: true,
      userRoles: { select: { role: true }}
    }
  })

  return {
    success: true,
    value: users.map(u => ({
      id: u.id,
      email: u.email,
      personId: u.personId,
      emailVerified: u.emailVerified,
      firstName: u.person.firstName,
      lastName: u.person.lastName,
      roles: u.userRoles.map(ur => ur.role),
    })),
  }
}

const signUpAction = async (data: SignUpData): Promise<ActionResult> => {
  const validation = signUpSchema.safeParse(data)
  if (!validation.success) return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }

  const dbUser = await prisma.user.findFirst({ where: { email: data.email }})
  if (dbUser) return { success: false, errorTree: { errors: ['User already exists'] }}

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
      ] }
    }
  })

  await signIn(AuthProvider.SendGridSignup, {
    email: data.email,
    redirect: false,
  })

  return { success: true }
}

const resetPasswordAction = async (email: string, password: string): Promise<ActionResult> => {
  const validation = resetPasswordSchema.safeParse({ email, password })
  if (!validation.success) return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    return { success: false, errorTree: { errors: ['User not found'] }}
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
