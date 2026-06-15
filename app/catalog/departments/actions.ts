'use server'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { DepartmentRequest } from '@/types/models/departmentModels'
import { z } from 'zod'
import { createDepartment, deleteDepartment, updateDepartment } from '@/app/catalog/departments/manager'

const departmentSchema = z.object({
  name: z.string().min(1).max(120),
  companyId: z.number().int().positive(),
  countryCode: z.string().length(2),
})

const createDepartmentAction = async (dept: DepartmentRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.CREATE)
  if (guard) return guard

  const validation = departmentSchema.safeParse(dept)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await createDepartment(dept)
  return result
}

const updateDepartmentAction = async (id: number, dept: DepartmentRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.UPDATE)
  if (guard) return guard

  const validation = departmentSchema.safeParse(dept)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  const result = await updateDepartment(id, dept)
  return result
}

const deleteDepartmentAction = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.DELETE)
  if (guard) return guard

  const result = await deleteDepartment(id)
  return result
}

export {
  createDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
}
