'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { PersonRequest } from '@/types/models/personModels'
import { Gender } from '@prisma/client'
import { z } from 'zod'

const personSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  middleName: z.string().max(80).nullable().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).nullable().optional(),
  birthdate: z.string().nullable().optional(),
})

const createPerson = async (person: PersonRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.PEOPLE, CRUD.CREATE)
  if (guard) return guard

  const validation = personSchema.safeParse(person)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

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

const updatePerson = async (id: number, person: PersonRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.PEOPLE, CRUD.UPDATE)
  if (guard) return guard

  const validation = personSchema.safeParse(person)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

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

const deletePerson = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.PEOPLE, CRUD.DELETE)
  if (guard) return guard

  await prisma.person.delete({ where: { id }})

  return { success: true }
}

export {
  createPerson,
  updatePerson,
  deletePerson,
}
