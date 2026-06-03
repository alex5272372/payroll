import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { CompanyResponse } from '@/types/models/companyModels'

export async function getCachedAllCompanies(): Promise<CompanyResponse[]> {
  'use cache'
  cacheLife('minutes')
  const companies = await prisma.company.findMany()
  return companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode }))
}

export async function getCachedCompanyById(id: number): Promise<CompanyResponse | null> {
  'use cache'
  cacheLife('minutes')
  const company = await prisma.company.findUnique({ where: { id }})
  return company ? { id: company.id, name: company.name, countryCode: company.countryCode } : null
}
