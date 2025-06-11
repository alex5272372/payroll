import { DepartmentWithCompany, getAllDepartments } from '@/actions/departmentActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult } from '@/types'

const DepartmentsCatalog = async () => {
  const departments: ActionResult<DepartmentWithCompany[]> = await getAllDepartments()

  return <Layout>
    <main>
      <DataTable
        data={{
          columns: [
            { header: 'ID', width: 80 },
            { header: 'Name', width: 300 },
            { header: 'Company', width: 300 },
            { header: 'Country', width: 80 },
          ],
          rows: departments.value?.map((department: DepartmentWithCompany) => [
            String(department.id),
            department.name,
            `${department.company.name} (${department.companyId})`,
            department.countryCode,
          ]) || []
        }}
      />
    </main>
  </Layout>
}

export default DepartmentsCatalog
