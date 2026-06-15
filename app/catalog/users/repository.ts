import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { UserCreateRequest, UserResponse, UserUpdateRequest } from '@/types/models/userModels'
import bcrypt from 'bcryptjs'

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

const getAllUsersDb = async (): Promise<UserResponse[]> => {
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

  return users.map(u => ({
    id: u.id,
    email: u.email,
    personId: u.personId,
    emailVerified: u.emailVerified,
    firstName: u.person.firstName,
    lastName: u.person.lastName,
    roles: u.userRoles.map(ur => ur.role),
  }))
}

const getUserByIdDb = async (id: number): Promise<UserResponse | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      personId: true,
      person: { select: { firstName: true, lastName: true }},
      emailVerified: true,
      userRoles: { select: { role: true }}
    }
  })

  return user ? {
    id: user.id,
    email: user.email,
    personId: user.personId,
    emailVerified: user.emailVerified,
    firstName: user.person.firstName,
    lastName: user.person.lastName,
    roles: user.userRoles.map(ur => ur.role),
  } : null
}

const getUserByEmailDb = async (email: string): Promise<UserResponse | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      personId: true,
      person: { select: { firstName: true, lastName: true }},
      emailVerified: true,
      userRoles: { select: { role: true }}
    }
  })

  return user ? {
    id: user.id,
    email: user.email,
    personId: user.personId,
    emailVerified: user.emailVerified,
    firstName: user.person.firstName,
    lastName: user.person.lastName,
    roles: user.userRoles.map(ur => ur.role),
  } : null
}

const createUserDb = async (data: UserCreateRequest): Promise<ActionResult> => {
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

const updateUserDb = async (id: number, data: UserUpdateRequest): Promise<ActionResult> => {
  await prisma.user.update({ where: { id }, data: { email: data.email, personId: data.personId }})
  return { success: true }
}

const updatePasswordDb = async (email: string, password: string): Promise<ActionResult> => {
  await prisma.user.update({
    where: { email },
    data: {
      password: crypt(password)
    }
  })

  return { success: true }
}

const deleteUserDb = async (id: number): Promise<ActionResult> => {
  await prisma.user.delete({ where: { id }})
  return { success: true }
}

export {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmailDb,
  createUserDb,
  updateUserDb,
  updatePasswordDb,
  deleteUserDb,
}
