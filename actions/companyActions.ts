'use server'
import prisma from '@/lib/prisma'
import { Company } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'

const getAllCompanies = async (): Promise<ActionResult<Company[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.USERS]?.[role]?.[CRUD.READ])) {
    return { success: false, error: 'Forbidden' }
  }

  const companies: Company[] = await prisma.company.findMany()

  return {
    success: true,
    value: companies,
  }
}

export {
  getAllCompanies,
}
