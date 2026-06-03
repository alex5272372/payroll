import EmployeesCatalog from '@/components/catalog/EmployeesCatalog'
import { getAllEmployees } from '@/app/catalog/employees/actions'

const EmployeesPage = async () => {
  const result = await getAllEmployees()
  return <EmployeesCatalog employees={result.value ?? []} />
}

export default EmployeesPage
