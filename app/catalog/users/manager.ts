import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { UserResponse } from '@/types/models/userModels'

const getAllUsers = async (): Promise<UserResponse[]> => {
  'use cache'
  cacheLife('minutes')

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

const getUserById = async (id: number): Promise<UserResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const u = await prisma.user.findUnique({
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

  return u ? {
    id: u.id,
    email: u.email,
    personId: u.personId,
    emailVerified: u.emailVerified,
    firstName: u.person.firstName,
    lastName: u.person.lastName,
    roles: u.userRoles.map(ur => ur.role),
  } : null
}

export {
  getAllUsers,
  getUserById,
}
