'use server'
import prisma from '@/lib/prisma'
import { Company } from '@prisma/client'
import { ActionResult } from '@/types'

const getAllCompanies = async (): Promise<ActionResult<Company[]>> => {
  const companies: Company[] = await prisma.company.findMany()
  
  return {
    success: true,
    value: companies,
  }
}

export {
  getAllCompanies,
}
