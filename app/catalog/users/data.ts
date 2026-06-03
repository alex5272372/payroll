import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { UserResponse } from '@/types/models/userModels'
import { PersonResponse } from '@/types/models/personModels'

export async function getCachedAllUsers(): Promise<UserResponse[]> {
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

export async function getCachedUserById(id: number): Promise<UserResponse | null> {
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

export async function getCachedAllPeople(): Promise<PersonResponse[]> {
  'use cache'
  cacheLife('minutes')
  const people = await prisma.person.findMany()
  return people.map(p => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    middleName: p.middleName,
    gender: p.gender,
    birthdate: p.birthdate,
  }))
}
