import { PrismaClient } from './generated/client'
import companies from './data/companies'
import countries from './data/countries'
import departments from './data/departments'
import employees from './data/employees'
import people from './data/people'
import users from './data/users'

const prisma = new PrismaClient()

const mapElement = (element: Record<string, unknown>): Record<string, unknown> => {
  const resEl: Record<string, unknown> = {}

  for (const key in element) {
    if (Array.isArray(element[key]))
      resEl[key] = mapData(element[key])

    else if (typeof element[key] === 'object' && element[key] !== null && !(element[key] instanceof Date))
      resEl[key] = mapElement(element[key] as Record<string, unknown>)

    else
      resEl[key] = element[key]
  }
  return resEl
}

const mapData = <T>(data: T[]): T[] => {
  const resData: unknown[] = []

  for (const element of data) {
    if (Array.isArray(element))
      resData.push(mapData(element))

    else if (typeof element === 'object' && element !== null && !(element instanceof Date))
      resData.push(mapElement(element as Record<string, unknown>))

    else
      resData.push(element)
  }
  return resData as T[]
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
    birthdate: create.birthdate as Date
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
