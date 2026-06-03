import DepartmentsCatalog from '@/components/catalog/DepartmentsCatalog'
import { getCachedAllDepartments } from '@/app/catalog/departments/data'

const DepartmentsPage = async () => {
  const departments = await getCachedAllDepartments()
  return <DepartmentsCatalog departments={departments} />
}

export default DepartmentsPage
