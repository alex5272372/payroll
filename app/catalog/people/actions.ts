'use server'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { PersonRequest } from '@/types/models/personModels'
import { z } from 'zod'
import { createPerson, deletePerson, updatePerson } from '@/app/catalog/people/manager'

const personSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  middleName: z.string().max(80).nullable().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).nullable().optional(),
  birthdate: z.string().nullable().optional(),
})

const createPersonAction = async (person: PersonRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.PEOPLE, CRUD.CREATE)
  if (guard) return guard

  const validation = personSchema.safeParse(person)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await createPerson(person)
  return result
}

const updatePersonAction = async (id: number, person: PersonRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.PEOPLE, CRUD.UPDATE)
  if (guard) return guard

  const validation = personSchema.safeParse(person)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await updatePerson(id, person)
  return result
}

const deletePersonAction = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.PEOPLE, CRUD.DELETE)
  if (guard) return guard

  const result = await deletePerson(id)
  return result
}

export {
  createPersonAction,
  updatePersonAction,
  deletePersonAction,
}
