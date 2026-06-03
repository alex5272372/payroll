import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { DepartmentResponse } from '@/types/models/departmentModels'
import { CompanyResponse } from '@/types/models/companyModels'
import { CountryResponse } from '@/types/models/countryModels'

/**
 * Cached query for all departments
 * Revalidates every 60 seconds
 */
export const getCachedAllDepartments = unstable_cache(
  async (): Promise<DepartmentResponse[]> => {
    const departments = await prisma.department.findMany({
      include: { company: { select: { name: true }}}
    })
    return departments.map(d => ({
      id: d.id,
      name: d.name,
      companyId: d.companyId,
      countryCode: d.countryCode,
      companyName: d.company.name,
    }))
  },
  ['departments-all'],
  { revalidate: 60 }
)

/**
 * Cached query for a single department by ID
 * Revalidates every 60 seconds
 */
export const getCachedDepartmentById = unstable_cache(
  async (id: number): Promise<DepartmentResponse | null> => {
    const d = await prisma.department.findUnique({
      where: { id },
      include: { company: { select: { name: true }}}
    })
    return d ? {
      id: d.id,
      name: d.name,
      companyId: d.companyId,
      countryCode: d.countryCode,
      companyName: d.company.name,
    } : null
  },
  ['department-by-id'],
  { revalidate: 60 }
)

export const getCachedAllCompanies = unstable_cache(
  async (): Promise<CompanyResponse[]> => {
    const companies = await prisma.company.findMany()
    return companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode }))
  },
  ['companies-all'],
  { revalidate: 60 }
)

export const getCachedAllCountries = unstable_cache(
  async (): Promise<CountryResponse[]> => {
    const countries = await prisma.country.findMany()
    return countries.map(c => ({ code: c.code, name: c.name }))
  },
  ['countries-all'],
  { revalidate: 60 }
)
