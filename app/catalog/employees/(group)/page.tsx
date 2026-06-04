import { getAllEmployees } from '@/app/catalog/employees/manager'
import EmployeesList from '@/app/catalog/employees/(group)/list'

const EmployeesPage = async () => {
  const employees = await getAllEmployees()
  return <EmployeesList employees={employees} />
}

export default EmployeesPage
