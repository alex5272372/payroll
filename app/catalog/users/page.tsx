'use client'
import { useEffect, useState } from 'react'
import { getAllUsers } from '@/actions/userActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult, ButtonGroupState, TableData } from '@/types'
import { UserResponse } from '@/types/models/userModels'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'

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
    { header: 'Email', width: 300 },
    { header: 'Person', width: 300 },
    { header: 'Email verified', width: 250 },
    { header: 'Roles', width: 300 },
  ],
  rows: []
}

const UsersCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)
  const { showError } = useLayout()

  useEffect(() => {
    getAllUsers().then((users: ActionResult<UserResponse[]>) => {
      if (!users.success) {
        showError(users.errorTree)
        return
      }

      setTableData((prev: TableData) => ({
        ...prev,
        rows: users.value?.map((user: UserResponse) => ({ cells: [
          String(user.id),
          user.email,
          `${user.firstName} ${user.lastName} (${user.personId})`,
          user.emailVerified?.toISOString() || '',
          user.roles.join(', '),
        ] })) || []
      }))
    })
  }, [showError])

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.USERS} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default UsersCatalog
