'use client'
import { useEffect, useState } from 'react'
import { DepartmentWithCompany, getAllDepartments } from '@/actions/departmentActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult, ButtonGroupState, TableData } from '@/types'
import { MenuItemPath } from '@/types/enums/navigation'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { useOverlay } from '@/components/OverlayContext'

const buttonGroup: ButtonGroupState = {
  buttons: [
    { title: 'New', Icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
    { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
    { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
  ],
}

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
  const { showError } = useOverlay()

  useEffect(() => {
    getAllDepartments().then((departments: ActionResult<DepartmentWithCompany[]>) => {
      if (!departments.success) {
        showError(departments.errorTree)
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
  }, [showError])

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.DEPARTMENTS} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default DepartmentsCatalog
