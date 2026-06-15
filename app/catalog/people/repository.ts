import prisma from '@/lib/prisma'
import { PersonRequest, PersonResponse } from '@/types/models/personModels'
import { Gender } from '@/types/enums'
import { ActionResult } from '@/types'

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
  const person = await prisma.person.findUnique({ where: { id }})
  return person ? {
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
    middleName: person.middleName,
    gender: person.gender as Gender,
    birthdate: person.birthdate,
  } : null
}

const createPersonDb = async (person: PersonRequest): Promise<ActionResult> => {
  await prisma.person.create({
    data: {
      firstName: person.firstName,
      lastName: person.lastName,
      middleName: person.middleName || null,
      gender: (person.gender as Gender) || null,
      birthdate: person.birthdate ? new Date(person.birthdate) : null,
    },
  })

  return { success: true }
}

const updatePersonDb = async (id: number, person: PersonRequest): Promise<ActionResult> => {
  await prisma.person.update({
    where: { id },
    data: {
      firstName: person.firstName,
      lastName: person.lastName,
      middleName: person.middleName || null,
      gender: (person.gender as Gender) || null,
      birthdate: person.birthdate ? new Date(person.birthdate) : null,
    },
  })

  return { success: true }
}

const deletePersonDb = async (id: number): Promise<ActionResult> => {
  await prisma.person.delete({ where: { id }})
  return { success: true }
}

export {
  getAllPeopleDb,
  getPersonByIdDb,
  createPersonDb,
  updatePersonDb,
  deletePersonDb,
}
