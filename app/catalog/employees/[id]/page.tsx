import { getCachedEmployeeById, getCachedAllDepartments, getCachedAllPeople } from '@/app/catalog/employees/data'
import EmployeeForm from '@/app/catalog/employees/[id]/form'
import { notFound } from 'next/navigation'

const EmployeeUpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const employeeId = Number(id)

  if (isNaN(employeeId)) {
    notFound()
  }

  const [employee, departments, people] = await Promise.all([
    getCachedEmployeeById(employeeId),
    getCachedAllDepartments(),
    getCachedAllPeople(),
  ])

  if (!employee) {
    notFound()
  }

  return <EmployeeForm employee={employee} departments={departments} people={people} />
}

export default EmployeeUpdatePage
