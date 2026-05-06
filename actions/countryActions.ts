'use server'
import prisma from '@/lib/prisma'
import { Country } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'

const getAllCountries = async (): Promise<ActionResult<Country[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COUNTRIES]?.[role]?.[CRUD.READ])) {
    return { success: false, error: 'Forbidden' }
  }

  const countries: Country[] = await prisma.country.findMany()

  return {
    success: true,
    value: countries,
  }
}

const getCountryByCode = async (code: string): Promise<ActionResult<Country>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COUNTRIES]?.[role]?.[CRUD.READ])) {
    return { success: false, error: 'Forbidden' }
  }

  const country = await prisma.country.findUnique({ where: { code }})
  if (!country) {
    return { success: false, error: 'Country not found' }
  }

  return {
    success: true,
    value: country,
  }
}

const updateCountry = async (formData: FormData): Promise<ActionResult> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COUNTRIES]?.[role]?.[CRUD.UPDATE])) {
    return { success: false, error: 'Forbidden' }
  }

  const code = formData.get('code')
  const name = formData.get('name')

  if (typeof code !== 'string' || typeof name !== 'string') {
    return { success: false, error: 'Invalid form data' }
  }

  await prisma.country.update({
    where: { code },
    data: { name },
  })

  return { success: true }
}

export {
  getAllCountries,
  getCountryByCode,
  updateCountry,
}
