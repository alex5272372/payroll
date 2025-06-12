'use server'
import prisma from '@/lib/prisma'
import { Country } from '@prisma/client'
import { ActionResult } from '@/types'

const getAllCountries = async (): Promise<ActionResult<Country[]>> => {
  const countries: Country[] = await prisma.country.findMany()

  return {
    success: true,
    value: countries,
  }
}

export {
  getAllCountries,
}
