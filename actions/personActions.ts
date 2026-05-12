'use server'
import prisma from '@/lib/prisma'
import { Person } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { roleMatrix } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/types/enums/navigation'

const getAllPeople = async (): Promise<ActionResult<Person[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, errorTree: { errors: ['Unauthorized'] }}
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.PEOPLE]?.[role]?.[CRUD.READ])) {
    return { success: false, errorTree: { errors: ['Forbidden'] }}
  }

  const people: Person[] = await prisma.person.findMany()

  return {
    success: true,
    value: people,
  }
}

export {
  getAllPeople,
}
