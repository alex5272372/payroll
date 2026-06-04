'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { CompanyRequest } from '@/types/models/companyModels'
import { z } from 'zod'

const companySchema = z.object({
  name: z.string().min(1).max(120),
  countryCode: z.string().length(2),
})

const createCompany = async (company: CompanyRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COMPANIES, CRUD.CREATE)
  if (guard) return guard

  const validation = companySchema.safeParse(company)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  await prisma.company.create({ data: { name: company.name, countryCode: company.countryCode }})

  return { success: true }
}

const updateCompany = async (id: number, company: CompanyRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COMPANIES, CRUD.UPDATE)
  if (guard) return guard

  const validation = companySchema.safeParse(company)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  await prisma.company.update({ where: { id }, data: { name: company.name, countryCode: company.countryCode }})

  return { success: true }
}

const deleteCompany = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.COMPANIES, CRUD.DELETE)
  if (guard) return guard

  await prisma.company.delete({ where: { id }})

  return { success: true }
}

export {
  createCompany,
  updateCompany,
  deleteCompany,
}
