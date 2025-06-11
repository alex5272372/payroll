import { EmployeeWithPersonAndDepartment, getAllEmployees } from '@/actions/employeeActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult } from '@/types'

const EmployeesCatalog = async () => {
  const employees: ActionResult<EmployeeWithPersonAndDepartment[]> = await getAllEmployees()

  return <Layout>
    <main>
      <DataTable
        data={{
          columns: [
            { header: 'ID', width: 80 },
            { header: 'Person', width: 300 },
            { header: 'Department', width: 300 },
          ],
          rows: employees.value?.map((employee: EmployeeWithPersonAndDepartment) => [
            String(employee.id),
            `${employee.person.firstName} ${employee.person.lastName} (${employee.personId})`,
            `${employee.department.name} (${employee.departmentId})`,
          ]) || []
        }}
      />
    </main>
  </Layout>
}

export default EmployeesCatalog
