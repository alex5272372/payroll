import EmployeesCatalog from '@/components/catalog/EmployeesCatalog'
import { getAllEmployees } from '@/actions/employeeActions'

const EmployeesPage = async () => {
  const result = await getAllEmployees()
  return <EmployeesCatalog employees={result.value ?? []} />
}

export default EmployeesPage
