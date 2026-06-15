'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { deleteUser } from '@/app/catalog/users/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState, TableDataColumn } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { UserResponse } from '@/types/models/userModels'
import { useLayout } from '@/components/LayoutContext'

const columns: TableDataColumn[] = [
  { header: 'ID', width: 80 },
  { header: 'Email', width: 300 },
  { header: 'Person', width: 300 },
  { header: 'Email verified', width: 250 },
  { header: 'Roles', width: 300 },
]

const UsersList = ({ users }: { users: UserResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const tableData = {
    columns,
    rows: users.map(u => ({ id: String(u.id), cells: [
      String(u.id), u.email,
      `${u.firstName} ${u.lastName} (${u.personId})`,
      u.emailVerified?.toISOString() || '',
      u.roles.join(', '),
    ] }))
  }

  const deleteConfirmed = useCallback(async (ids: string[]): Promise<void> => {
    hideDialog()
    for (const id of ids) {
      const result = await deleteUser(Number(id))
      if (!result.success) {
        showError(result.errorTree)
        return
      }
    }
    router.refresh()
    const label = ids.length > 1 ? `${ids.length} users` : `User ${ids[0]}`
    showOk('Delete user', `${label} deleted successfully`)
  }, [hideDialog, router, showError, showOk])

  const handleDelete = () => {
    if (!selectedRows.size) return
    const label = selectedRows.size > 1
      ? `${selectedRows.size} users`
      : `user ${[...selectedRows][0]}`
    showOkCancel(
      () => deleteConfirmed([...selectedRows]),
      'Delete user',
      `Are you sure you want to delete ${label}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'New', Icon: PlusIcon, href: `${MenuItemPath.USERS}/create`, permission: CRUD.CREATE },
      {
        title: 'Edit',
        Icon: PencilIcon,
        onClick: () => {
          if (selectedRows.size === 1) router.push(`${MenuItemPath.USERS}/${[...selectedRows][0]}`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.USERS} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default UsersList
