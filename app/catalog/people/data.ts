import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { PersonResponse } from '@/types/models/personModels'

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

export const getCachedPersonById = unstable_cache(
  async (id: number): Promise<PersonResponse | null> => {
    const p = await prisma.person.findUnique({ where: { id }})
    return p ? {
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      middleName: p.middleName,
      gender: p.gender,
      birthdate: p.birthdate,
    } : null
  },
  ['person-by-id'],
  { revalidate: 60 }
)
