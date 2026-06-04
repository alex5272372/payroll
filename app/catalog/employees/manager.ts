import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { EmployeeResponse } from '@/types/models/employeeModels'

const getAllEmployees = async (): Promise<EmployeeResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const employees = await prisma.employee.findMany({
    include: {
      person: { select: { firstName: true, lastName: true }},
      department: { select: { name: true }}
    }
  })
  return employees.map(e => ({
    id: e.id,
    departmentId: e.departmentId,
    personId: e.personId,
    firstName: e.person.firstName,
    lastName: e.person.lastName,
    departmentName: e.department.name,
  }))
}

const getEmployeeById = async (id: number): Promise<EmployeeResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const e = await prisma.employee.findUnique({
    where: { id },
    include: {
      person: { select: { firstName: true, lastName: true }},
      department: { select: { name: true }},
    },
  })
  return e ? {
    id: e.id,
    departmentId: e.departmentId,
    personId: e.personId,
    firstName: e.person.firstName,
    lastName: e.person.lastName,
    departmentName: e.department.name,
  } : null
}

export {
  getAllEmployees,
  getEmployeeById,
}
