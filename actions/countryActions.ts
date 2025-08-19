'use server'
import prisma from '@/lib/prisma'
import { Country } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'

const getAllCountries = async (): Promise<ActionResult<Country[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => roleMatrix[MenuItemPath.USERS][role]?.READ)) {
    return { success: false, error: 'Forbidden' }
  }

  const countries: Country[] = await prisma.country.findMany()

  return {
    success: true,
    value: countries,
  }
}

export {
  getAllCountries,
}
