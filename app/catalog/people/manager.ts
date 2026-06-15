import { cacheLife } from 'next/cache'
import { PersonRequest, PersonResponse } from '@/types/models/personModels'
import {
  createPersonDb,
  deletePersonDb,
  getAllPeopleDb,
  getPersonByIdDb,
  updatePersonDb
} from '@/app/catalog/people/repository'
import { ActionResult } from '@/types'

const getAllPeople = async (): Promise<PersonResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const people = await getAllPeopleDb()
  return people
}

const getPersonById = async (id: number): Promise<PersonResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const person = await getPersonByIdDb(id)
  return person
}

const createPerson = async (person: PersonRequest): Promise<ActionResult> => {
  const result = await createPersonDb(person)
  return result
}

const updatePerson = async (id: number, person: PersonRequest): Promise<ActionResult> => {
  const result = await updatePersonDb(id, person)
  return result
}

const deletePerson = async (id: number): Promise<ActionResult> => {
  const result = await deletePersonDb(id)
  return result
}

export {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
}
