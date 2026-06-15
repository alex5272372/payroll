import { cacheLife } from 'next/cache'
import { DepartmentRequest, DepartmentResponse } from '@/types/models/departmentModels'
import {
  createDepartmentDb,
  deleteDepartmentDb,
  getAllDepartmentsDb,
  getDepartmentByIdDb,
  updateDepartmentDb
} from '@/app/catalog/departments/repository'
import { ActionResult } from '@/types'

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

const createDepartment = async (dept: DepartmentRequest): Promise<ActionResult> => {
  const result = await createDepartmentDb(dept)
  return result
}

const updateDepartment = async (id: number, dept: DepartmentRequest): Promise<ActionResult> => {
  const result = await updateDepartmentDb(id, dept)
  return result
}

const deleteDepartment = async (id: number): Promise<ActionResult> => {
  const result = await deleteDepartmentDb(id)
  return result
}

export {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}
