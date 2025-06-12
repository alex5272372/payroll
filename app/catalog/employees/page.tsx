'use client'
import { useEffect, useState } from 'react'
import { EmployeeWithPersonAndDepartment, getAllEmployees } from '@/actions/employeeActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { catalogToolbar } from '@/lib'
import { ActionResult, TableData } from '@/types'

const initialData: TableData = {
  columns: [
    { header: 'ID', width: 80 },
    { header: 'Person', width: 300 },
    { header: 'Department', width: 300 },
  ],
  rows: []
}

const EmployeesCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)

  useEffect(() => {
    getAllEmployees().then((employees: ActionResult<EmployeeWithPersonAndDepartment[]>) => {
      setTableData((prev: TableData) => ({
        ...prev,
        rows: employees.value?.map((employee: EmployeeWithPersonAndDepartment) => ({ cells: [
          String(employee.id),
          `${employee.person.firstName} ${employee.person.lastName} (${employee.personId})`,
          `${employee.department.name} (${employee.departmentId})`,
        ] })) || []
      }))
    })
  }, [])

  return <Layout>
    <main>
      <Toolbar items={catalogToolbar} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default EmployeesCatalog
