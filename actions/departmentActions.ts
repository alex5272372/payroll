'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { roleMatrix } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/types/enums/navigation'

export type DepartmentWithCompany = Prisma.DepartmentGetPayload<{
  include: { company: { select: { name: boolean } } }
}>

const getAllDepartments = async (): Promise<ActionResult<DepartmentWithCompany[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, errorTree: { errors: ['Unauthorized'] }}
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.DEPARTMENTS]?.[role]?.[CRUD.READ])) {
    return { success: false, errorTree: { errors: ['Forbidden'] }}
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
