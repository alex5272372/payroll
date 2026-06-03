import { cacheLife } from 'next/cache'
import prisma from '@/lib/prisma'
import { EmployeeResponse } from '@/types/models/employeeModels'
import { DepartmentResponse } from '@/types/models/departmentModels'
import { PersonResponse } from '@/types/models/personModels'

export async function getCachedAllEmployees(): Promise<EmployeeResponse[]> {
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

export async function getCachedEmployeeById(id: number): Promise<EmployeeResponse | null> {
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

/**
 * Cached query for all departments (for forms)
 * Revalidates every 60 seconds
 */
export async function getCachedAllDepartments(): Promise<DepartmentResponse[]> {
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

/**
 * Cached query for all people (for forms)
 * Revalidates every 60 seconds
 */
export async function getCachedAllPeople(): Promise<PersonResponse[]> {
  'use cache'
  cacheLife('minutes')
  const people = await prisma.person.findMany()
  return people.map(p => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    middleName: p.middleName,
    gender: p.gender,
    birthdate: p.birthdate,
  }))
}
