import { cacheLife } from 'next/cache'
import { EmployeeRequest, EmployeeResponse } from '@/types/models/employeeModels'
import {
  createEmployeeDb,
  deleteEmployeeDb,
  getAllEmployeesDb,
  getEmployeeByIdDb,
  updateEmployeeDb
} from '@/app/catalog/employees/repository'
import { ActionResult } from '@/types'

const getAllEmployees = async (): Promise<EmployeeResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const employees = await getAllEmployeesDb()
  return employees
}

const getEmployeeById = async (id: number): Promise<EmployeeResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const employee = await getEmployeeByIdDb(id)
  return employee
}

const createEmployee = async (emp: EmployeeRequest): Promise<ActionResult> => {
  const result = await createEmployeeDb(emp)
  return result
}

const updateEmployee = async (id: number, emp: EmployeeRequest): Promise<ActionResult> => {
  const result = await updateEmployeeDb(id, emp)
  return result
}

const deleteEmployee = async (id: number): Promise<ActionResult> => {
  const result = await deleteEmployeeDb(id)
  return result
}

export {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
