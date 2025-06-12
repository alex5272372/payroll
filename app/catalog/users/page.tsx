'use client'
import { useEffect, useState } from 'react'
import { UserWithPerson, getAllUsers } from '@/actions/userActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { catalogToolbar } from '@/lib'
import { ActionResult, TableData } from '@/types'

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

  useEffect(() => {
    getAllUsers().then((users: ActionResult<UserWithPerson[]>) => {
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

  return <Layout>
    <main>
      <Toolbar items={catalogToolbar} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default UsersCatalog
