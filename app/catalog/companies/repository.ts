import prisma from '@/lib/prisma'
import { CompanyResponse } from '@/types/models/companyModels'

const getAllCompaniesDb = async (): Promise<CompanyResponse[]> => {
  const companies = await prisma.company.findMany()
  return companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode }))
}

const getCompanyByIdDb = async (id: number): Promise<CompanyResponse | null> => {
  const company = await prisma.company.findUnique({ where: { id }})
  return company ? { id: company.id, name: company.name, countryCode: company.countryCode } : null
}

export {
  getAllCompaniesDb,
  getCompanyByIdDb,
}
