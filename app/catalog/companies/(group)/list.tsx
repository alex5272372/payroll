'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCompany } from '@/app/catalog/companies/actions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import Toolbar from '@/components/Toolbar'
import { ButtonGroupState, TableDataColumn } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { CompanyResponse } from '@/types/models/companyModels'
import { useLayout } from '@/components/LayoutContext'

const columns: TableDataColumn[] = [
  { header: 'ID', width: 80 },
  { header: 'Name', width: 400 },
  { header: 'Country', width: 80 },
]

const CompaniesList = ({ companies }: { companies: CompanyResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const tableData = {
    columns,
    rows: companies.map(c => ({ id: String(c.id), cells: [String(c.id), c.name, c.countryCode] }))
  }

  const deleteConfirmed = useCallback(async (ids: string[]): Promise<void> => {
    hideDialog()
    for (const id of ids) {
      const result = await deleteCompany(Number(id))
      if (!result.success) {
        showError(result.errorTree)
        return
      }
    }
    router.refresh()
    const label = ids.length > 1 ? `${ids.length} companies` : `Company ${ids[0]}`
    showOk('Delete company', `${label} deleted successfully`)
  }, [hideDialog, router, showError, showOk])

  const handleDelete = () => {
    if (!selectedRows.size) return
    const label = selectedRows.size > 1
      ? `${selectedRows.size} companies`
      : `company ${[...selectedRows][0]}`
    showOkCancel(
      () => deleteConfirmed([...selectedRows]),
      'Delete company',
      `Are you sure you want to delete ${label}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'New', Icon: PlusIcon, href: `${MenuItemPath.COMPANIES}/create`, permission: CRUD.CREATE },
      {
        title: 'Edit',
        Icon: PencilIcon,
        onClick: () => {
          if (selectedRows.size === 1) router.push(`${MenuItemPath.COMPANIES}/${[...selectedRows][0]}`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COMPANIES} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default CompaniesList
