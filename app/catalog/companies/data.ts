import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { CompanyResponse } from '@/types/models/companyModels'

export const getCachedAllCompanies = unstable_cache(
  async (): Promise<CompanyResponse[]> => {
    const companies = await prisma.company.findMany()
    return companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode }))
  },
  ['companies-all'],
  { revalidate: 60 }
)

export const getCachedCompanyById = unstable_cache(
  async (id: number): Promise<CompanyResponse | null> => {
    const company = await prisma.company.findUnique({ where: { id }})
    return company ? { id: company.id, name: company.name, countryCode: company.countryCode } : null
  },
  ['company-by-id'],
  { revalidate: 60 }
)
