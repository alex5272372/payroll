'use server'
import prisma from '@/lib/prisma'
import { signIn } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { ActionResult, SignUpData } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { AuthProvider } from '@/types/enums'
import { UserCreateRequest, UserUpdateRequest } from '@/types/models/userModels'
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

const userUpdateSchema = z.object({
  email: z.string().email().max(100),
  personId: z.number().int().positive(),
})

const createUserAdmin = async (data: UserCreateRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.USERS, CRUD.CREATE)
  if (guard) return guard

  const validation = signUpSchema.safeParse(data)
  if (!validation.success) return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }

  const existing = await prisma.user.findFirst({ where: { email: data.email }})
  if (existing) return { success: false, errorTree: { errors: ['User already exists'] }}

  await prisma.user.create({
    data: {
      email: data.email,
      password: crypt(data.password),
      person: { create: { firstName: data.firstName, lastName: data.lastName }},
      userRoles: { create: [{ role: 'USER' }] },
    },
  })

  return { success: true }
}

const updateUserAdmin = async (id: number, data: UserUpdateRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.USERS, CRUD.UPDATE)
  if (guard) return guard

  const validation = userUpdateSchema.safeParse(data)
  if (!validation.success) return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }

  await prisma.user.update({ where: { id }, data: { email: data.email, personId: data.personId }})

  return { success: true }
}

const deleteUser = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.USERS, CRUD.DELETE)
  if (guard) return guard

  await prisma.user.delete({ where: { id }})

  return { success: true }
}

export {
  createUserAdmin,
  updateUserAdmin,
  deleteUser,
  signUpAction,
  resetPasswordAction,
}
