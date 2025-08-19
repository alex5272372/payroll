'use client'
import { useEffect, useState } from 'react'
import { getAllPeople } from '@/actions/personActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { catalogToolbar } from '@/lib'
import { ActionResult, TableData } from '@/types'
import { Person } from '@prisma/client'
import { MenuItemPath } from '@/lib/data/navigation'

const initialData: TableData = {
  columns: [
    { header: 'ID', width: 80 },
    { header: 'First name', width: 200 },
    { header: 'Last name', width: 200 },
    { header: 'Middle name', width: 200 },
    { header: 'Gender', width: 100 },
    { header: 'Birthdate', width: 150 },
  ],
  rows: []
}

const PeopleCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)

  useEffect(() => {
    getAllPeople().then((people: ActionResult<Person[]>) => {
      setTableData((prev: TableData) => ({
        ...prev,
        rows: people.value?.map((person: Person) => ({ cells: [
          String(person.id),
          person.firstName,
          person.lastName,
          person.middleName || '',
          person.gender || '',
          person.birthdate?.toISOString().split('T')[0] || '',
        ] })) || []
      }))
    })
  }, [])

  return <Layout>
    <main>
      <Toolbar items={catalogToolbar} menuPath={MenuItemPath.PEOPLE} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default PeopleCatalog
