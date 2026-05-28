'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize } from '@/lib'
import { EmployeeResponse } from '@/types/models/employeeModels'

const getAllEmployees = async (): Promise<ActionResult<EmployeeResponse[]>> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.READ)
  if (guard) return guard

  const employees = await prisma.employee.findMany({
    include: {
      person: { select: { firstName: true, lastName: true }},
      department: { select: { name: true }}
    }
  })

  return {
    success: true,
    value: employees.map(e => ({
      id: e.id,
      departmentId: e.departmentId,
      personId: e.personId,
      firstName: e.person.firstName,
      lastName: e.person.lastName,
      departmentName: e.department.name,
    })),
  }
}

export {
  getAllEmployees,
}
