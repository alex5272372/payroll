import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { CompanyResponse } from '@/types/models/companyModels'

const getAllCompanies = async (): Promise<CompanyResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const companies = await prisma.company.findMany()
  return companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode }))
}

const getCompanyById = async (id: number): Promise<CompanyResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const company = await prisma.company.findUnique({ where: { id }})
  return company ? { id: company.id, name: company.name, countryCode: company.countryCode } : null
}

export {
  getAllCompanies,
  getCompanyById,
}
