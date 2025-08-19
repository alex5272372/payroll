'use client'
import { useEffect, useState } from 'react'
import { DepartmentWithCompany, getAllDepartments } from '@/actions/departmentActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { catalogToolbar } from '@/lib'
import { ActionResult, TableData } from '@/types'
import { MenuItemPath } from '@/lib/data/navigation'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'

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
  const [error, setError] = useState('')

  useEffect(() => {
    getAllDepartments().then((departments: ActionResult<DepartmentWithCompany[]>) => {
      if (!departments.success) {
        setError(departments.error || '')
        return
      }

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

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

  return <Layout>
    <main>
      <Toolbar items={catalogToolbar} menuPath={MenuItemPath.DEPARTMENTS} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default DepartmentsCatalog
