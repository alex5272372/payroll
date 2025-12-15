'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActionResult } from '@/types'
import { auth } from '@/lib/auth'
import { CRUD, roleMatrix, UserRole } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'

export type EmployeeWithPersonAndDepartment = Prisma.EmployeeGetPayload<{
  include: {
    person: { select: { firstName: boolean, lastName: boolean }},
    department: { select: { name: boolean }}
  }
}>

const getAllEmployees = async (): Promise<ActionResult<EmployeeWithPersonAndDepartment[]>> => {
  const session = await auth()
  if (!session || !session.roles) {
    return { success: false, error: 'Unauthorized' }
  } else if (!session.roles.some((role: UserRole) => !!roleMatrix[MenuItemPath.EMPLOYEES]?.[role]?.[CRUD.READ])) {
    return { success: false, error: 'Forbidden' }
  }

  const employees: EmployeeWithPersonAndDepartment[] = await prisma.employee.findMany({
    include: {
      person: { select: { firstName: true, lastName: true }},
      department: { select: { name: true }}
    }
  })

  return {
    success: true,
    value: employees,
  }
}

export {
  getAllEmployees,
}
