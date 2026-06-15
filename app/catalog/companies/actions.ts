'use server'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { CompanyRequest } from '@/types/models/companyModels'
import { z } from 'zod'
import { createCompany, deleteCompany, updateCompany } from '@/app/catalog/companies/manager'

const companySchema = z.object({
  name: z.string().min(1).max(120),
  countryCode: z.string().length(2),
})

const createCompanyAction = async (company: CompanyRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COMPANIES, CRUD.CREATE)
  if (guard) return guard

  const validation = companySchema.safeParse(company)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await createCompany(company)
  return result
}

const updateCompanyAction = async (id: number, company: CompanyRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COMPANIES, CRUD.UPDATE)
  if (guard) return guard

  const validation = companySchema.safeParse(company)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await updateCompany(id, company)
  return result
}

const deleteCompanyAction = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COMPANIES, CRUD.DELETE)
  if (guard) return guard

  const result = await deleteCompany(id)
  return result
}

export {
  createCompanyAction,
  updateCompanyAction,
  deleteCompanyAction,
}
