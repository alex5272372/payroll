import { cacheLife } from 'next/cache'
import { CountryRequest, CountryResponse } from '@/types/models/countryModels'
import {
  createCountryDb,
  deleteCountryDb,
  getAllCountriesDb,
  getCountryByCodeDb,
  updateCountryDb
} from '@/app/catalog/countries/repository'
import { ActionResult } from '@/types'

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

const createCountry = async (country: CountryRequest): Promise<ActionResult> => {
  const result = await createCountryDb(country)
  return result
}

const updateCountry = async (country: CountryRequest): Promise<ActionResult> => {
  const result = await updateCountryDb(country)
  return result
}

const deleteCountry = async (code: string): Promise<ActionResult> => {
  const result = await deleteCountryDb(code)
  return result
}

export {
  getAllCountries,
  getCountryByCode,
  createCountry,
  updateCountry,
  deleteCountry,
}
