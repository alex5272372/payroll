import { cacheLife } from 'next/cache'
import { DepartmentResponse } from '@/types/models/departmentModels'
import { getAllDepartmentsDb, getDepartmentByIdDb } from '@/app/catalog/departments/repository'

const getAllDepartments = async (): Promise<DepartmentResponse[]> => {
  'use cache'
  cacheLife('minutes')

  const departments = await getAllDepartmentsDb()
  return departments
}

const getDepartmentById = async (id: number): Promise<DepartmentResponse | null> => {
  'use cache'
  cacheLife('minutes')

  const department = await getDepartmentByIdDb(id)
  return department
}

export {
  getAllDepartments,
  getDepartmentById,
}
