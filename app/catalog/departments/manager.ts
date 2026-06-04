import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { DepartmentResponse } from '@/types/models/departmentModels'

const getAllDepartments = async (): Promise<DepartmentResponse[]> => {
  'use cache'
  cacheLife('minutes')

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

const getDepartmentById = async (id: number): Promise<DepartmentResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const d = await prisma.department.findUnique({
    where: { id },
    include: { company: { select: { name: true }}}
  })
  return d ? {
    id: d.id,
    name: d.name,
    companyId: d.companyId,
    countryCode: d.countryCode,
    companyName: d.company.name,
  } : null
}

export {
  getAllDepartments,
  getDepartmentById,
}
