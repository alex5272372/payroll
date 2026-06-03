import { getCachedAllDepartments, getCachedAllPeople } from '@/app/catalog/employees/data'
import EmployeeCreateForm from '@/app/catalog/employees/create/form'

const EmployeeCreatePage = async () => {
  const [departments, people] = await Promise.all([
    getCachedAllDepartments(),
    getCachedAllPeople(),
  ])
  return <EmployeeCreateForm departments={departments} people={people} />
}

export default EmployeeCreatePage
