'use server'
import prisma from '@/lib/prisma'
import { signIn } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { ActionResult, SignUpData } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize } from '@/lib'
import { AuthProvider } from '@/types/enums'
import { UserResponse } from '@/types/models/userModels'

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

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
