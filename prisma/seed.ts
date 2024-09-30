import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'

import companies from './data/companies.json'
import countries from './data/countries.json'
import departments from './data/departments.json'
import employees from './data/employees.json'
import people from './data/people.json'
import users from './data/users.json'

const prisma = new PrismaClient()

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

const mapElement = (element: any): any => {
  const resEl: Record<string, unknown> = {}

  for (const key in element) {
    if (key.substring(0, 1) === '_')
      resEl[key.substring(1)] = eval(element[key] as string)

    else if (key.substring(0, 1) === '/')
      resEl[key.substring(1)] = fs.readFileSync(path.join(__dirname, ...element[key]), 'utf8')

    else if (Array.isArray(element[key]))
      resEl[key] = mapData(element[key])

    else if (typeof element[key] === 'object' && element[key] !== null)
      resEl[key] = mapElement(element[key])

    else
      resEl[key] = element[key]
  }
  return resEl
}

const mapData = (data: any[]): any[] => {
  const resData = []

  for (const element of data) {
    if (Array.isArray(element))
      resData.push(mapData(element))

    else if (typeof element === 'object' && element !== null)
      resData.push(mapElement(element))

    else
      resData.push(element)
  }
  return resData
}

const main = async () => {
  const countriesData = mapData(countries)
  for (const create of countriesData) await prisma.country.upsert({ where: { code: create.code }, update: {}, create })
  console.log('Countries creation completed')

  const companiesData = mapData(companies)
  for (const create of companiesData) await prisma.company.upsert({ where: { name: create.name }, update: {}, create })
  console.log('Companies creation completed')

  const departmentsData = mapData(departments)
  for (const create of departmentsData) await prisma.department.upsert({ where: { name_companyId: {
    name: create.name,
    companyId: 1
  }}, update: {}, create })
  console.log('Departments creation completed')

  const peopleData = mapData(people)
  for (const create of peopleData) await prisma.person.upsert({ where: { firstName_lastName_birthdate: {
    firstName: create.firstName,
    lastName: create.lastName,
    birthdate: create.birthdate
  }}, update: {}, create })
  console.log('People creation completed')

  const usersData = mapData(users)
  for (const create of usersData) await prisma.user.upsert({ where: { email: create.email }, update: {}, create })
  console.log('Users creation completed')

  const employeesData = mapData(employees)
  for (const create of employeesData) await prisma.epmloyee.upsert({ where: { departmentId_personId: {
    departmentId: create.departmentId,
    personId: create.personId
  }}, update: {}, create })
  console.log('Employees creation completed')
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
