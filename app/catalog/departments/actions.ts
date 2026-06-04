'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { DepartmentRequest } from '@/types/models/departmentModels'
import { z } from 'zod'

const departmentSchema = z.object({
  name: z.string().min(1).max(120),
  companyId: z.number().int().positive(),
  countryCode: z.string().length(2),
})

const createDepartment = async (dept: DepartmentRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.CREATE)
  if (guard) return guard

  const validation = departmentSchema.safeParse(dept)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  await prisma.department.create({
    data: { name: dept.name, companyId: dept.companyId, countryCode: dept.countryCode },
  })

  return { success: true }
}

const updateDepartment = async (id: number, dept: DepartmentRequest): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.UPDATE)
  if (guard) return guard

  const validation = departmentSchema.safeParse(dept)
  if (!validation.success) {
    return { success: false, errorTree: mapErrorTree(z.treeifyError(validation.error)) }
  }

  await prisma.department.update({
    where: { id },
    data: { name: dept.name, companyId: dept.companyId, countryCode: dept.countryCode },
  })

  return { success: true }
}

const deleteDepartment = async (id: number): Promise<ActionResult> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.DELETE)
  if (guard) return guard

  await prisma.department.delete({ where: { id }})

  return { success: true }
}

export {
  createDepartment,
  updateDepartment,
  deleteDepartment,
}
