import EmployeeForm from '@/app/catalog/employees/[id]/form'
import { notFound } from 'next/navigation'
import { getEmployeeById } from '@/app/catalog/employees/manager'
import { getAllPeople } from '@/app/catalog/people/manager'
import { getAllDepartments } from '@/app/catalog/departments/manager'

const EmployeeUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const employeeId = Number(id)

  if (isNaN(employeeId)) {
    notFound()
  }

  const [employee, departments, people] = await Promise.all([
    getEmployeeById(employeeId),
    getAllDepartments(),
    getAllPeople(),
  ])

  if (!employee) {
    notFound()
  }

  return <EmployeeForm employee={employee} departments={departments} people={people} />
}

export default EmployeeUpdatePage
