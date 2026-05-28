'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize } from '@/lib'
import { PersonResponse } from '@/types/models/personModels'

const getAllPeople = async (): Promise<ActionResult<PersonResponse[]>> => {
  const guard = await authorize(MenuItemPath.PEOPLE, CRUD.READ)
  if (guard) return guard

  const people = await prisma.person.findMany()

  return {
    success: true,
    value: people.map(p => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      middleName: p.middleName,
      gender: p.gender,
      birthdate: p.birthdate,
    })),
  }
}

export {
  getAllPeople,
}
