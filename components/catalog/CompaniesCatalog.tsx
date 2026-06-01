'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import Toolbar from '@/components/Toolbar'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { CompanyResponse } from '@/types/models/companyModels'

const buttonGroup: ButtonGroupState = {
  buttons: [
    { title: 'New', Icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
    { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
    { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
  ]
}

const columns = [
  { header: 'ID', width: 80 },
  { header: 'Name', width: 400 },
  { header: 'Country', width: 80 },
]

const CompaniesCatalog = ({ companies }: { companies: CompanyResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const tableData = { columns, rows: companies.map(c => ({ cells: [String(c.id), c.name, c.countryCode] })) }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COMPANIES} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default CompaniesCatalog
