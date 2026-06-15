'use server'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { EmployeeRequest } from '@/types/models/employeeModels'
import { z } from 'zod'
import { createEmployee, deleteEmployee, updateEmployee } from '@/app/catalog/employees/manager'

const employeeSchema = z.object({
  departmentId: z.number().int().positive(),
  personId: z.number().int().positive(),
})

const createEmployeeAction = async (emp: EmployeeRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.CREATE)
  if (guard) return guard

  const validation = employeeSchema.safeParse(emp)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await createEmployee(emp)
  return result
}

const updateEmployeeAction = async (id: number, emp: EmployeeRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.UPDATE)
  if (guard) return guard

  const validation = employeeSchema.safeParse(emp)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await updateEmployee(id, emp)
  return result
}

const deleteEmployeeAction = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.DELETE)
  if (guard) return guard

  const result = await deleteEmployee(id)
  return result
}

export {
  createEmployeeAction,
  updateEmployeeAction,
  deleteEmployeeAction,
}
