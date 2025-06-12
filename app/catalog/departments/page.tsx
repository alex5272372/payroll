'use client'
import { useEffect, useState } from 'react'
import { DepartmentWithCompany, getAllDepartments } from '@/actions/departmentActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { catalogToolbar } from '@/lib'
import { ActionResult, TableData } from '@/types'

const initialData: TableData = {
  columns: [
    { header: 'ID', width: 80 },
    { header: 'Name', width: 300 },
    { header: 'Company', width: 300 },
    { header: 'Country', width: 80 },
  ],
  rows: []
}

const DepartmentsCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)

  useEffect(() => {
    getAllDepartments().then((departments: ActionResult<DepartmentWithCompany[]>) => {
      setTableData((prev: TableData) => ({
        ...prev,
        rows: departments.value?.map((department: DepartmentWithCompany) => ({ cells: [
          String(department.id),
          department.name,
          `${department.company.name} (${department.companyId})`,
          department.countryCode,
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

export default DepartmentsCatalog
