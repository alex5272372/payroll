'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { deletePerson } from '@/app/catalog/people/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { PersonResponse } from '@/types/models/personModels'
import { useLayout } from '@/components/LayoutContext'

const columns = [
  { header: 'ID', width: 80 },
  { header: 'First name', width: 200 },
  { header: 'Last name', width: 200 },
  { header: 'Middle name', width: 200 },
  { header: 'Gender', width: 100 },
  { header: 'Birthdate', width: 150 },
]

const PeopleList = ({ people }: { people: PersonResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const tableData = {
    columns,
    rows: people.map(p => ({ id: String(p.id), cells: [
      String(p.id), p.firstName, p.lastName,
      p.middleName || '', p.gender || '',
      p.birthdate?.toISOString().split('T')[0] || '',
    ] }))
  }

  const deleteConfirmed = useCallback(async (ids: string[]): Promise<void> => {
    hideDialog()
    for (const id of ids) {
      const result = await deletePerson(Number(id))
      if (!result.success) {
        showError(result.errorTree)
        return
      }
    }
    router.refresh()
    const label = ids.length > 1 ? `${ids.length} people` : `Person ${ids[0]}`
    showOk('Delete person', `${label} deleted successfully`)
  }, [hideDialog, router, showError, showOk])

  const handleDelete = () => {
    if (!selectedRows.size) return
    const label = selectedRows.size > 1
      ? `${selectedRows.size} people`
      : `person ${[...selectedRows][0]}`
    showOkCancel(
      () => deleteConfirmed([...selectedRows]),
      'Delete person',
      `Are you sure you want to delete ${label}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'New', Icon: PlusIcon, href: `${MenuItemPath.PEOPLE}/create`, permission: CRUD.CREATE },
      {
        title: 'Edit',
        Icon: PencilIcon,
        onClick: () => {
          if (selectedRows.size === 1) router.push(`${MenuItemPath.PEOPLE}/${[...selectedRows][0]}`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.PEOPLE} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default PeopleList
