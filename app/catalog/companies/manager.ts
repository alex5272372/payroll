import { cacheLife } from 'next/cache'
import { CompanyResponse } from '@/types/models/companyModels'
import { getAllCompaniesDb, getCompanyByIdDb } from '@/app/catalog/companies/repository'

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

export {
  getAllCompanies,
  getCompanyById,
}
