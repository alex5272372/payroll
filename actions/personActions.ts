'use server'
import prisma from '@/lib/prisma'
import { Person } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'

const getAllPeople = async (): Promise<ActionResult<Person[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => roleMatrix[MenuItemPath.PEOPLE][role]?.READ)) {
    return { success: false, error: 'Forbidden' }
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
