import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'
import { CountryResponse } from '@/types/models/countryModels'

export const getCachedAllCountries = unstable_cache(
  async (): Promise<CountryResponse[]> => {
    const countries = await prisma.country.findMany()
    return countries.map(c => ({ code: c.code, name: c.name }))
  },
  ['countries-all'],
  { revalidate: 60 }
)

export const getCachedCountryByCode = unstable_cache(
  async (code: string): Promise<CountryResponse | null> => {
    const country = await prisma.country.findUnique({ where: { code }})
    return country ? { code: country.code, name: country.name } : null
  },
  ['country-by-code'],
  { revalidate: 60 }
)
