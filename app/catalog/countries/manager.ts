import { cacheLife } from 'next/cache'
import { CountryResponse } from '@/types/models/countryModels'
import { getAllCountriesDb, getCountryByCodeDb } from '@/app/catalog/countries/repository'

const getAllCountries = async (): Promise<CountryResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const countries = await getAllCountriesDb()
  return countries
}

const getCountryByCode = async (code: string): Promise<CountryResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const country = await getCountryByCodeDb(code)
  return country
}

export {
  getAllCountries,
  getCountryByCode,
}
