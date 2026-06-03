import EmployeesCatalog from '@/components/catalog/EmployeesCatalog'
import { getCachedAllEmployees } from '@/app/catalog/employees/data'

const EmployeesPage = async () => {
  const employees = await getCachedAllEmployees()
  return <EmployeesCatalog employees={employees} />
}

export default EmployeesPage
