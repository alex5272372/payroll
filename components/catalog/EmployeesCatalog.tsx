'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { deleteEmployee } from '@/actions/employeeActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { EmployeeResponse } from '@/types/models/employeeModels'
import { useLayout } from '@/components/LayoutContext'

const columns = [
  { header: 'ID', width: 80 },
  { header: 'Person', width: 300 },
  { header: 'Department', width: 300 },
]

const EmployeesCatalog = ({ employees }: { employees: EmployeeResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const tableData = { columns, rows: employees.map(e => ({ id: String(e.id), cells:
    [String(e.id), `${e.firstName} ${e.lastName} (${e.personId})`, `${e.departmentName} (${e.departmentId})`] })) }

  const deleteConfirmed = useCallback(async (ids: string[]): Promise<void> => {
    hideDialog()
    for (const id of ids) {
      const result = await deleteEmployee(Number(id))
      if (!result.success) {
        showError(result.errorTree)
        return
      }
    }
    router.refresh()
    const label = ids.length > 1 ? `${ids.length} employees` : `Employee ${ids[0]}`
    showOk('Delete employee', `${label} deleted successfully`)
  }, [hideDialog, router, showError, showOk])

  const handleDelete = () => {
    if (!selectedRows.size) return
    const label = selectedRows.size > 1
      ? `${selectedRows.size} employees`
      : `employee ${[...selectedRows][0]}`
    showOkCancel(
      () => deleteConfirmed([...selectedRows]),
      'Delete employee',
      `Are you sure you want to delete ${label}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'New', Icon: PlusIcon, href: `${MenuItemPath.EMPLOYEES}/create`, permission: CRUD.CREATE },
      {
        title: 'Edit',
        Icon: PencilIcon,
        onClick: () => {
          if (selectedRows.size === 1) router.push(`${MenuItemPath.EMPLOYEES}/${[...selectedRows][0]}`)
        },
        permission: CRUD.UPDATE,
        disabled: selectedRows.size !== 1,
      },
      {
        title: 'Delete',
        Icon: TrashIcon,
        onClick: handleDelete,
        permission: CRUD.DELETE,
        disabled: selectedRows.size === 0,
      },
    ],
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.EMPLOYEES} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default EmployeesCatalog
