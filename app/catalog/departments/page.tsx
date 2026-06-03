import DepartmentsCatalog from '@/components/catalog/DepartmentsCatalog'
import { getAllDepartments } from '@/app/catalog/departments/actions'

const DepartmentsPage = async () => {
  const result = await getAllDepartments()
  return <DepartmentsCatalog departments={result.value ?? []} />
}

export default DepartmentsPage
