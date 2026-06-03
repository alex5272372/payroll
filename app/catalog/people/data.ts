import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { PersonResponse } from '@/types/models/personModels'

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

export async function getCachedPersonById(id: number): Promise<PersonResponse | null> {
  'use cache'
  cacheLife('minutes')
  const p = await prisma.person.findUnique({ where: { id }})
  return p ? {
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    middleName: p.middleName,
    gender: p.gender,
    birthdate: p.birthdate,
  } : null
}
