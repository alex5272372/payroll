'use client'
import { useEffect, useState } from 'react'
import { UserWithPerson, getAllUsers } from '@/actions/userActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult, ButtonState, TableData } from '@/types'
import { MenuItemPath } from '@/lib/data/navigation'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/lib/data/roleMatrix'

const buttons: ButtonState[] = [
  { title: 'New', Icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
  { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
  { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
]

const initialData: TableData = {
  columns: [
    { header: 'ID', width: 80 },
    { header: 'Email', width: 300 },
    { header: 'Person', width: 300 },
    { header: 'Email verified', width: 250 },
    { header: 'Roles', width: 300 },
  ],
  rows: []
}

const UsersCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllUsers().then((users: ActionResult<UserWithPerson[]>) => {
      if (!users.success) {
        setError(users.error || '')
        return
      }

      setTableData((prev: TableData) => ({
        ...prev,
        rows: users.value?.map((user: UserWithPerson) => ({ cells: [
          String(user.id),
          user.email,
          `${user.person.firstName} ${user.person.lastName} (${user.personId})`,
          user.emailVerified?.toISOString() || '',
          user.userRoles.map(userRole => userRole.role).join(', '),
        ] })) || []
      }))
    })
  }, [])

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

  return <Layout>
    <main>
      <Toolbar buttons={buttons} menuPath={MenuItemPath.USERS} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default UsersCatalog
