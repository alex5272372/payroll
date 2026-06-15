import prisma from '@/lib/prisma'
import { EmployeeResponse } from '@/types/models/employeeModels'

const getAllEmployeesDb = async (): Promise<EmployeeResponse[]> => {
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

const getEmployeeByIdDb = async (id: number): Promise<EmployeeResponse | null> => {
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
  getAllEmployeesDb,
  getEmployeeByIdDb,
}
