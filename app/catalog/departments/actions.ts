'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { DepartmentRequest, DepartmentResponse } from '@/types/models/departmentModels'
import { z } from 'zod'

const departmentSchema = z.object({
  name: z.string().min(1).max(120),
  companyId: z.number().int().positive(),
  countryCode: z.string().length(2),
})

const getAllDepartments = async (): Promise<ActionResult<DepartmentResponse[]>> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.READ)
  if (guard) return guard

  const departments = await prisma.department.findMany({
    include: { company: { select: { name: true }}}
  })

  return {
    success: true,
    value: departments.map(d => ({
      id: d.id,
      name: d.name,
      companyId: d.companyId,
      countryCode: d.countryCode,
      companyName: d.company.name,
    })),
  }
}

const getDepartmentById = async (id: number): Promise<ActionResult<DepartmentResponse>> => {
  const guard = await authorize(MenuItemPath.DEPARTMENTS, CRUD.READ)
  if (guard) return guard

  const d = await prisma.department.findUnique({
    where: { id },
    include: { company: { select: { name: true }}},
  })
  if (!d) return { success: false, errorTree: { errors: ['Department not found'] }}

  return {
    success: true,
    value: { id: d.id, name: d.name, companyId: d.companyId, countryCode: d.countryCode, companyName: d.company.name },
  }
}

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
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}
