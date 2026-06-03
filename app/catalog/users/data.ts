import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { UserResponse } from '@/types/models/userModels'
import { PersonResponse } from '@/types/models/personModels'

export const getCachedAllUsers = unstable_cache(
  async (): Promise<UserResponse[]> => {
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
  },
  ['users-all'],
  { revalidate: 60 }
)

export const getCachedUserById = unstable_cache(
  async (id: number): Promise<UserResponse | null> => {
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
  },
  ['user-by-id'],
  { revalidate: 60 }
)

export const getCachedAllPeople = unstable_cache(
  async (): Promise<PersonResponse[]> => {
    const people = await prisma.person.findMany()
    return people.map(p => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      middleName: p.middleName,
      gender: p.gender,
      birthdate: p.birthdate,
    }))
  },
  ['people-all'],
  { revalidate: 60 }
)
