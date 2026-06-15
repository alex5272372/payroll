'use server'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { CountryRequest } from '@/types/models/countryModels'
import { z } from 'zod'
import { mapErrorTree, authorize } from '@/lib'
import { createCountry, deleteCountry, updateCountry } from '@/app/catalog/countries/manager'

const countrySchema = z.object({
  code: z.string().min(1).max(2),
  name: z.string().min(1).max(60),
})

const createCountryAction = async (country: CountryRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COUNTRIES, CRUD.CREATE)
  if (guard) return guard

  const validation = countrySchema.safeParse(country)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await createCountry(country)
  return result
}

const updateCountryAction = async (country: CountryRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COUNTRIES, CRUD.UPDATE)
  if (guard) return guard

  const validation = countrySchema.safeParse(country)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await updateCountry(country)
  return result
}

const deleteCountryAction = async (code: string): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COUNTRIES, CRUD.DELETE)
  if (guard) return guard

  const result = await deleteCountry(code)
  return result
}

export {
  createCountryAction,
  updateCountryAction,
  deleteCountryAction,
}
