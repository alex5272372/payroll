'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { CountryRequest } from '@/types/models/countryModels'
import { z } from 'zod'
import { mapErrorTree, authorize } from '@/lib'

const countrySchema = z.object({
  code: z.string().min(1).max(2),
  name: z.string().min(1).max(60),
})

const createCountry = async (country: CountryRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COUNTRIES, CRUD.CREATE)
  if (guard) return guard

  const validation = countrySchema.safeParse(country)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const existingCountry = await prisma.country.findUnique({
    where: { code: country.code },
  })
  if (existingCountry) {
    return { success: false, errorTree: { errors: ['Country with this code already exists'] }}
  }

  await prisma.country.create({
    data: { code: country.code, name: country.name },
  })

  return { success: true }
}

const updateCountry = async (country: CountryRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COUNTRIES, CRUD.UPDATE)
  if (guard) return guard

  const validation = countrySchema.safeParse(country)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  await prisma.country.update({
    where: { code: country.code },
    data: { name: country.name },
  })

  return { success: true }
}

const deleteCountry = async (code: string): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COUNTRIES, CRUD.DELETE)
  if (guard) return guard

  await prisma.country.delete({
    where: { code },
  })

  return { success: true }
}

export {
  createCountry,
  updateCountry,
  deleteCountry,
}
