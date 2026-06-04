import EmployeeCreateForm from '@/app/catalog/employees/create/form'
import { getAllDepartments } from '@/app/catalog/departments/manager'
import { getAllPeople } from '@/app/catalog/people/manager'

const EmployeeCreatePage = async () => {
  const [departments, people] = await Promise.all([
    getAllDepartments(),
    getAllPeople(),
  ])
  return <EmployeeCreateForm departments={departments} people={people} />
}

export default EmployeeCreatePage
