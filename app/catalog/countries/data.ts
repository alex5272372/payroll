import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { CountryResponse } from '@/types/models/countryModels'

export async function getCachedAllCountries(): Promise<CountryResponse[]> {
  'use cache'
  cacheLife('minutes')
  const countries = await prisma.country.findMany()
  return countries.map(c => ({ code: c.code, name: c.name }))
}

export async function getCachedCountryByCode(code: string): Promise<CountryResponse | null> {
  'use cache'
  cacheLife('minutes')
  const country = await prisma.country.findUnique({ where: { code }})
  return country ? { code: country.code, name: country.name } : null
}
