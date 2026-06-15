import prisma from '@/lib/prisma'
import { CountryResponse } from '@/types/models/countryModels'

const getAllCountriesDb = async (): Promise<CountryResponse[]> => {
  const countries = await prisma.country.findMany()
  return countries.map(c => ({ code: c.code, name: c.name }))
}

const getCountryByCodeDb = async (code: string): Promise<CountryResponse | null> => {
  const country = await prisma.country.findUnique({ where: { code }})
  return country ? { code: country.code, name: country.name } : null
}

export {
  getAllCountriesDb,
  getCountryByCodeDb,
}
