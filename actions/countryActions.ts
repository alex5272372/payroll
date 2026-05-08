'use server'
import prisma from '@/lib/prisma'
import { Country } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { roleMatrix } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/types/enums/navigation'
import { CountryRequest, CountryResponse } from '@/types/models/countryModels'
import { z } from 'zod'

const countrySchema = z.object({
  code: z.string().min(1).max(2),
  name: z.string().min(1).max(60),
})

const getAllCountries = async (): Promise<ActionResult<CountryResponse[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COUNTRIES]?.[role]?.[CRUD.READ])) {
    return { success: false, error: 'Forbidden' }
  }

  const countries: Country[] = await prisma.country.findMany()

  return {
    success: true,
    value: countries.map((country) => ({ code: country.code, name: country.name })),
  }
}

const getCountryByCode = async (code: string): Promise<ActionResult<CountryResponse>> => {
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
    value: { code: country.code, name: country.name },
  }
}

const createCountry = async (country: CountryRequest): Promise<ActionResult> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COUNTRIES]?.[role]?.[CRUD.CREATE])) {
    return { success: false, error: 'Forbidden' }
  }

  const validation = countrySchema.safeParse(country)
  if (!validation.success) {
    return { success: false, zodError: z.treeifyError(validation.error) }
  }

  const existingCountry = await prisma.country.findUnique({
    where: { code: country.code },
  })
  if (existingCountry) {
    return { success: false, error: 'Country with this code already exists' }
  }

  await prisma.country.create({
    data: { code: country.code, name: country.name },
  })

  return { success: true }
}

const updateCountry = async (country: CountryRequest): Promise<ActionResult> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COUNTRIES]?.[role]?.[CRUD.UPDATE])) {
    return { success: false, error: 'Forbidden' }
  }

  const validation = countrySchema.safeParse(country)
  if (!validation.success) {
    return { success: false, zodError: z.treeifyError(validation.error) }
  }

  await prisma.country.update({
    where: { code: country.code },
    data: { name: country.name },
  })

  return { success: true }
}

const deleteCountry = async (code: string): Promise<ActionResult> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COUNTRIES]?.[role]?.[CRUD.DELETE])) {
    return { success: false, error: 'Forbidden' }
  }

  await prisma.country.delete({
    where: { code },
  })

  return { success: true }
}

export {
  getAllCountries,
  getCountryByCode,
  createCountry,
  updateCountry,
  deleteCountry,
}
