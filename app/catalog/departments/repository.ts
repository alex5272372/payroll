import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { DepartmentRequest, DepartmentResponse } from '@/types/models/departmentModels'

const getAllDepartmentsDb = async (): Promise<DepartmentResponse[]> => {
  const departments = await prisma.department.findMany({
    include: { company: { select: { name: true }}}
  })

  return departments.map(d => ({
    id: d.id,
    name: d.name,
    companyId: d.companyId,
    countryCode: d.countryCode,
    companyName: d.company.name,
  }))
}

const getDepartmentByIdDb = async (id: number): Promise<DepartmentResponse | null> => {
  const department = await prisma.department.findUnique({
    where: { id },
    include: { company: { select: { name: true }}}
  })

  return department ? {
    id: department.id,
    name: department.name,
    companyId: department.companyId,
    countryCode: department.countryCode,
    companyName: department.company.name,
  } : null
}

const createDepartmentDb = async (dept: DepartmentRequest): Promise<ActionResult> => {
  await prisma.department.create({
    data: { name: dept.name, companyId: dept.companyId, countryCode: dept.countryCode },
  })

  return { success: true }
}

const updateDepartmentDb = async (id: number, dept: DepartmentRequest): Promise<ActionResult> => {
  await prisma.department.update({
    where: { id },
    data: { name: dept.name, companyId: dept.companyId, countryCode: dept.countryCode },
  })

  return { success: true }
}

const deleteDepartmentDb = async (id: number): Promise<ActionResult> => {
  await prisma.department.delete({ where: { id }})
  return { success: true }
}

export {
  getAllDepartmentsDb,
  getDepartmentByIdDb,
  createDepartmentDb,
  updateDepartmentDb,
  deleteDepartmentDb,
}
