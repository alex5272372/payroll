import prisma from '@/lib/prisma'
import { ActionResult } from '@/types'
import { EmployeeRequest, EmployeeResponse } from '@/types/models/employeeModels'

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
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      person: { select: { firstName: true, lastName: true }},
      department: { select: { name: true }},
    },
  })
  return employee ? {
    id: employee.id,
    departmentId: employee.departmentId,
    personId: employee.personId,
    firstName: employee.person.firstName,
    lastName: employee.person.lastName,
    departmentName: employee.department.name,
  } : null
}

const createEmployeeDb = async (emp: EmployeeRequest): Promise<ActionResult> => {
  await prisma.employee.create({ data: { departmentId: emp.departmentId, personId: emp.personId }})
  return { success: true }
}

const updateEmployeeDb = async (id: number, emp: EmployeeRequest): Promise<ActionResult> => {
  await prisma.employee.update({ where: { id }, data: { departmentId: emp.departmentId, personId: emp.personId }})
  return { success: true }
}

const deleteEmployeeDb = async (id: number): Promise<ActionResult> => {
  await prisma.employee.delete({ where: { id }})
  return { success: true }
}

export {
  getAllEmployeesDb,
  getEmployeeByIdDb,
  createEmployeeDb,
  updateEmployeeDb,
  deleteEmployeeDb,
}
