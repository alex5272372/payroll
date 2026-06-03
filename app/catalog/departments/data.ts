import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { DepartmentResponse } from '@/types/models/departmentModels'
import { CompanyResponse } from '@/types/models/companyModels'
import { CountryResponse } from '@/types/models/countryModels'

/**
 * Cached query for all departments
 * Revalidates every 60 seconds
 */
export async function getCachedAllDepartments(): Promise<DepartmentResponse[]> {
  'use cache'
  cacheLife('minutes')
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
}

/**
 * Cached query for a single department by ID
 * Revalidates every 60 seconds
 */
export async function getCachedDepartmentById(id: number): Promise<DepartmentResponse | null> {
  'use cache'
  cacheLife('minutes')
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
}

export async function getCachedAllCompanies(): Promise<CompanyResponse[]> {
  'use cache'
  cacheLife('minutes')
  const companies = await prisma.company.findMany()
  return companies.map(c => ({ id: c.id, name: c.name, countryCode: c.countryCode }))
}

export async function getCachedAllCountries(): Promise<CountryResponse[]> {
  'use cache'
  cacheLife('minutes')
  const countries = await prisma.country.findMany()
  return countries.map(c => ({ code: c.code, name: c.name }))
}
