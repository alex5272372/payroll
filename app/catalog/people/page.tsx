'use client'
import { useEffect, useState } from 'react'
import { getAllPeople } from '@/actions/personActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult, ButtonGroupState, TableData } from '@/types'
import { Person } from '@prisma/client'
import { MenuItemPath } from '@/lib/data/navigation'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/lib/data/roleMatrix'
import { useOverlay } from '@/components/OverlayContext'

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
  const { showError } = useOverlay()

  useEffect(() => {
    getAllPeople().then((people: ActionResult<Person[]>) => {
      if (!people.success) {
        showError(people.error || '')
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
  }, [showError])

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.PEOPLE} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default PeopleCatalog
