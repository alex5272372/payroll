import prisma from '@/lib/prisma'
import { DepartmentResponse } from '@/types/models/departmentModels'

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
  getAllDepartmentsDb,
  getDepartmentByIdDb,
}
