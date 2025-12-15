'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'

export type DepartmentWithCompany = Prisma.DepartmentGetPayload<{
  include: { company: { select: { name: boolean } } }
}>

const getAllDepartments = async (): Promise<ActionResult<DepartmentWithCompany[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.DEPARTMENTS]?.[role]?.[CRUD.READ])) {
    return { success: false, error: 'Forbidden' }
  }

  const departments: DepartmentWithCompany[] = await prisma.department.findMany({
    include: { company: { select: { name: true }}}
  })

  return {
    success: true,
    value: departments,
  }
}

export {
  getAllDepartments,
}
