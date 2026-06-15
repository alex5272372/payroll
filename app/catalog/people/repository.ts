import prisma from '@/lib/prisma'
import { PersonResponse } from '@/types/models/personModels'
import { Gender } from '@/types/enums'

const getAllPeopleDb = async (): Promise<PersonResponse[]> => {
  const people = await prisma.person.findMany()
  return people.map(p => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    middleName: p.middleName,
    gender: p.gender as Gender,
    birthdate: p.birthdate,
  }))
}

const getPersonByIdDb = async (id: number): Promise<PersonResponse | null> => {
  const p = await prisma.person.findUnique({ where: { id }})
  return p ? {
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    middleName: p.middleName,
    gender: p.gender as Gender,
    birthdate: p.birthdate,
  } : null
}

export {
  getAllPeopleDb,
  getPersonByIdDb,
}
