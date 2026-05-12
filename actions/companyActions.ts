'use server'
import prisma from '@/lib/prisma'
import { Company } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { roleMatrix } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/types/enums/navigation'

const getAllCompanies = async (): Promise<ActionResult<Company[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, errorTree: { errors: ['Unauthorized'] }}
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.COMPANIES]?.[role]?.[CRUD.READ])) {
    return { success: false, errorTree: { errors: ['Forbidden'] }}
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
