'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { UserResponse } from '@/types/models/userModels'

const buttonGroup: ButtonGroupState = {
  buttons: [
    { title: 'New', Icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
    { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
    { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
  ],
}

const columns = [
  { header: 'ID', width: 80 },
  { header: 'Email', width: 300 },
  { header: 'Person', width: 300 },
  { header: 'Email verified', width: 250 },
  { header: 'Roles', width: 300 },
]

const UsersCatalog = ({ users }: { users: UserResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const tableData = {
    columns,
    rows: users.map(u => ({ cells: [
      String(u.id), u.email,
      `${u.firstName} ${u.lastName} (${u.personId})`,
      u.emailVerified?.toISOString() || '',
      u.roles.join(', '),
    ] }))
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.USERS} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default UsersCatalog
