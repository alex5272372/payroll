'use server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActionResult } from '@/types'

export type EmployeeWithPersonAndDepartment = Prisma.EmployeeGetPayload<{
  include: {
    person: { select: { firstName: boolean, lastName: boolean }},
    department: { select: { name: boolean }}
  }
}>

const getAllEmployees = async (): Promise<ActionResult<EmployeeWithPersonAndDepartment[]>> => {
  const employees: EmployeeWithPersonAndDepartment[] = await prisma.employee.findMany({
    include: {
      person: { select: { firstName: true, lastName: true }},
      department: { select: { name: true }}
    }
  })
  
  return {
    success: true,
    value: employees,
  }
}

export {
  getAllEmployees,
}
