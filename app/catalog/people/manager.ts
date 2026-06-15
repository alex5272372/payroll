import { cacheLife } from 'next/cache'
import { PersonResponse } from '@/types/models/personModels'
import { getAllPeopleDb, getPersonByIdDb } from '@/app/catalog/people/repository'

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

export {
  getAllPeople,
  getPersonById,
}
