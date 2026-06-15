'use server'
import { signIn } from '@/lib/auth'
import { ActionResult, SignUpData } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { AuthProvider } from '@/types/enums'
import { UserCreateRequest, UserUpdateRequest } from '@/types/models/userModels'
import { z } from 'zod'
import { createUser, deleteUser, getUserByEmail, updatePassword, updateUser } from '@/app/catalog/users/manager'

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

const userUpdateSchema = z.object({
  email: z.string().email().max(100),
  personId: z.number().int().positive(),
})

const signUpAction = async (data: SignUpData): Promise<ActionResult> => {
  const validation = signUpSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const user = await getUserByEmail(data.email)
  if (user) {
    return { success: false, errorTree: { errors: ['User already exists'] }}
  }

  const result = await createUser(data)
  if (!result.success) return result

  await signIn(AuthProvider.SendGridSignup, {
    email: data.email,
    redirect: false,
  })

  return result
}

const resetPasswordAction = async (email: string, password: string): Promise<ActionResult> => {
  const validation = resetPasswordSchema.safeParse({ email, password })
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const user = await getUserByEmail(email)
  if (!user) {
    return { success: false, errorTree: { errors: ['User not found'] }}
  }

  const result = await updatePassword(email, password)
  return result
}

const createUserAction = async (data: UserCreateRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.USERS, CRUD.CREATE)
  if (guard) return guard

  const validation = signUpSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await createUser(data)
  return result
}

const updateUserAction = async (id: number, data: UserUpdateRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.USERS, CRUD.UPDATE)
  if (guard) return guard

  const validation = userUpdateSchema.safeParse(data)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await updateUser(id, data)
  return result
}

const deleteUserAction = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.USERS, CRUD.DELETE)
  if (guard) return guard

  const result = await deleteUser(id)
  return result
}

export {
  createUserAction,
  updateUserAction,
  deleteUserAction,
  signUpAction,
  resetPasswordAction,
}
