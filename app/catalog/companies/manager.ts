import { cacheLife } from 'next/cache'
import { CompanyRequest, CompanyResponse } from '@/types/models/companyModels'
import {
  createCompanyDb,
  deleteCompanyDb,
  getAllCompaniesDb,
  getCompanyByIdDb,
  updateCompanyDb
} from '@/app/catalog/companies/repository'
import { ActionResult } from '@/types'

const getAllCompanies = async (): Promise<CompanyResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const companies = await getAllCompaniesDb()
  return companies
}

const getCompanyById = async (id: number): Promise<CompanyResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const company = await getCompanyByIdDb(id)
  return company
}

const createCompany = async (company: CompanyRequest): Promise<ActionResult> => {
  const result = await createCompanyDb(company)
  return result
}

const updateCompany = async (id: number, company: CompanyRequest): Promise<ActionResult> => {
  const result = await updateCompanyDb(id, company)
  return result
}

const deleteCompany = async (id: number): Promise<ActionResult> => {
  const result = await deleteCompanyDb(id)
  return result
}

export {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
}
