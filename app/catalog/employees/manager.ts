import { cacheLife } from 'next/cache'
import { EmployeeResponse } from '@/types/models/employeeModels'
import { getAllEmployeesDb, getEmployeeByIdDb } from '@/app/catalog/employees/repository'

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

export {
  getAllEmployees,
  getEmployeeById,
}
