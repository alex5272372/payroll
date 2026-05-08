'use client'
import { useEffect, useState } from 'react'
import { EmployeeWithPersonAndDepartment, getAllEmployees } from '@/actions/employeeActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult, ButtonGroupState, TableData } from '@/types'
import { MenuItemPath } from '@/lib/data/navigation'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/lib/data/roleMatrix'
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
    { header: 'Person', width: 300 },
    { header: 'Department', width: 300 },
  ],
  rows: []
}

const EmployeesCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)
  const { showError } = useOverlay()

  useEffect(() => {
    getAllEmployees().then((employees: ActionResult<EmployeeWithPersonAndDepartment[]>) => {
      if (!employees.success) {
        showError(employees.error || '')
        return
      }

      setTableData((prev: TableData) => ({
        ...prev,
        rows: employees.value?.map((employee: EmployeeWithPersonAndDepartment) => ({ cells: [
          String(employee.id),
          `${employee.person.firstName} ${employee.person.lastName} (${employee.personId})`,
          `${employee.department.name} (${employee.departmentId})`,
        ] })) || []
      }))
    })
  }, [showError])

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.EMPLOYEES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default EmployeesCatalog
