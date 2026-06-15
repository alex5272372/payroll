import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CompanyRequest, CompanyResponse } from '@/types/models/companyModels'

const getAllCompaniesDb = async (): Promise<CompanyResponse[]> => {
  const companies = await prisma.company.findMany()
  return companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode }))
}

const getCompanyByIdDb = async (id: number): Promise<CompanyResponse | null> => {
  const company = await prisma.company.findUnique({ where: { id }})
  return company ? { id: company.id, name: company.name, countryCode: company.countryCode } : null
}

const createCompanyDb = async (company: CompanyRequest): Promise<ActionResult> => {
  await prisma.company.create({ data: { name: company.name, countryCode: company.countryCode }})
  return { success: true }
}

const updateCompanyDb = async (id: number, company: CompanyRequest): Promise<ActionResult> => {
  await prisma.company.update({ where: { id }, data: { name: company.name, countryCode: company.countryCode }})
  return { success: true }
}

const deleteCompanyDb = async (id: number): Promise<ActionResult> => {
  await prisma.company.delete({ where: { id }})
  return { success: true }
}

export {
  getAllCompaniesDb,
  getCompanyByIdDb,
  createCompanyDb,
  updateCompanyDb,
  deleteCompanyDb,
}
