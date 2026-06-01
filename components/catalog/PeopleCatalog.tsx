'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { PersonResponse } from '@/types/models/personModels'

const buttonGroup: ButtonGroupState = {
  buttons: [
    { title: 'New', Icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
    { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
    { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
  ],
}

const columns = [
  { header: 'ID', width: 80 },
  { header: 'First name', width: 200 },
  { header: 'Last name', width: 200 },
  { header: 'Middle name', width: 200 },
  { header: 'Gender', width: 100 },
  { header: 'Birthdate', width: 150 },
]

const PeopleCatalog = ({ people }: { people: PersonResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const tableData = {
    columns,
    rows: people.map(p => ({ cells: [
      String(p.id), p.firstName, p.lastName,
      p.middleName || '', p.gender || '',
      p.birthdate?.toISOString().split('T')[0] || '',
    ] }))
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.PEOPLE} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default PeopleCatalog
