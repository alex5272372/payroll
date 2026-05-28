'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize } from '@/lib'
import { CompanyResponse } from '@/types/models/companyModels'

const getAllCompanies = async (): Promise<ActionResult<CompanyResponse[]>> => {
  const guard = await authorize(MenuItemPath.COMPANIES, CRUD.READ)
  if (guard) return guard

  const companies = await prisma.company.findMany()

  return {
    success: true,
    value: companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode })),
  }
}

export {
  getAllCompanies,
}
