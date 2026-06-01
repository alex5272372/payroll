'use server'
import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { authorize, mapErrorTree } from '@/lib'
import { EmployeeRequest, EmployeeResponse } from '@/types/models/employeeModels'
import { z } from 'zod'

const employeeSchema = z.object({
  departmentId: z.number().int().positive(),
  personId: z.number().int().positive(),
})

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

const getEmployeeById = async (id: number): Promise<ActionResult<EmployeeResponse>> => {
  const guard = await authorize(MenuItemPath.EMPLOYEES, CRUD.READ)
  if (guard) return guard

  const e = await prisma.employee.findUnique({
    where: { id },
    include: {
      person: { select: { firstName: true, lastName: true }},
      department: { select: { name: true }},
    },
  })
  if (!e) return { success: false, errorTree: { errors: ['Employee not found'] }}

  return {
    success: true,
    value: {
      id: e.id,
      departmentId: e.departmentId,
      personId: e.personId,
      firstName: e.person.firstName,
      lastName: e.person.lastName,
      departmentName: e.department.name,
    },
  }
}

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
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
