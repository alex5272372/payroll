import { getAllDepartments } from '@/app/catalog/departments/manager'
import DepartmentsList from '@/app/catalog/departments/(group)/list'

const DepartmentsPage = async () => {
  const departments = await getAllDepartments()
  return <DepartmentsList departments={departments} />
}

export default DepartmentsPage
