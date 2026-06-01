'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { deleteDepartment } from '@/actions/departmentActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { DepartmentResponse } from '@/types/models/departmentModels'
import { useLayout } from '@/components/LayoutContext'

const columns = [
  { header: 'ID', width: 80 },
  { header: 'Name', width: 300 },
  { header: 'Company', width: 300 },
  { header: 'Country', width: 80 },
]

const DepartmentsCatalog = ({ departments }: { departments: DepartmentResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const tableData = { columns, rows: departments.map(
    d => ({ id: String(d.id), cells: [String(d.id), d.name, `${d.companyName} (${d.companyId})`, d.countryCode] })) }

  const deleteConfirmed = useCallback(async (ids: string[]): Promise<void> => {
    hideDialog()
    for (const id of ids) {
      const result = await deleteDepartment(Number(id))
      if (!result.success) {
        showError(result.errorTree)
        return
      }
    }
    router.refresh()
    const label = ids.length > 1 ? `${ids.length} departments` : `Department ${ids[0]}`
    showOk('Delete department', `${label} deleted successfully`)
  }, [hideDialog, router, showError, showOk])

  const handleDelete = () => {
    if (!selectedRows.size) return
    const label = selectedRows.size > 1
      ? `${selectedRows.size} departments`
      : `department ${[...selectedRows][0]}`
    showOkCancel(
      () => deleteConfirmed([...selectedRows]),
      'Delete department',
      `Are you sure you want to delete ${label}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'New', Icon: PlusIcon, href: `${MenuItemPath.DEPARTMENTS}/create`, permission: CRUD.CREATE },
      {
        title: 'Edit',
        Icon: PencilIcon,
        onClick: () => {
          if (selectedRows.size === 1) router.push(`${MenuItemPath.DEPARTMENTS}/${[...selectedRows][0]}`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.DEPARTMENTS} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default DepartmentsCatalog
