import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CountryRequest, CountryResponse } from '@/types/models/countryModels'

const getAllCountriesDb = async (): Promise<CountryResponse[]> => {
  const countries = await prisma.country.findMany()
  return countries.map(c => ({ code: c.code, name: c.name }))
}

const getCountryByCodeDb = async (code: string): Promise<CountryResponse | null> => {
  const country = await prisma.country.findUnique({ where: { code }})
  return country ? { code: country.code, name: country.name } : null
}

const createCountryDb = async (country: CountryRequest): Promise<ActionResult> => {
  const existingCountry = await prisma.country.findUnique({
    where: { code: country.code },
  })
  if (existingCountry) {
    return { success: false, errorTree: { errors: ['Country with this code already exists'] }}
  }

  await prisma.country.create({
    data: { code: country.code, name: country.name },
  })

  return { success: true }
}

const updateCountryDb = async (country: CountryRequest): Promise<ActionResult> => {
  await prisma.country.update({
    where: { code: country.code },
    data: { name: country.name },
  })

  return { success: true }
}

const deleteCountryDb = async (code: string): Promise<ActionResult> => {
  await prisma.country.delete({
    where: { code },
  })

  return { success: true }
}

export {
  getAllCountriesDb,
  getCountryByCodeDb,
  createCountryDb,
  updateCountryDb,
  deleteCountryDb,
}
