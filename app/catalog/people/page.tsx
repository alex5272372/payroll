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
import ErrorDialog from '@/components/MainDialog/ErrorDialog'

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
  const [error, setError] = useState('')

  useEffect(() => {
    getAllPeople().then((people: ActionResult<Person[]>) => {
      if (!people.success) {
        setError(people.error || '')
        return
      }

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

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

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
