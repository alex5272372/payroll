'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { EmployeeRequest } from '@/types/models/employeeModels'
import { z } from 'zod'

const employeeSchema = z.object({
  departmentId: z.number().int().positive(),
  personId: z.number().int().positive(),
})

const createEmployee = async (emp: EmployeeRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.CREATE)
  if (guard) return guard

  const validation = employeeSchema.safeParse(emp)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  await prisma.employee.create({ data: { departmentId: emp.departmentId, personId: emp.personId }})

  return { success: true }
}

const updateEmployee = async (id: number, emp: EmployeeRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.UPDATE)
  if (guard) return guard

  const validation = employeeSchema.safeParse(emp)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  await prisma.employee.update({ where: { id }, data: { departmentId: emp.departmentId, personId: emp.personId }})

  return { success: true }
}

const deleteEmployee = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.DELETE)
  if (guard) return guard

  await prisma.employee.delete({ where: { id }})

  return { success: true }
}

export {
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
