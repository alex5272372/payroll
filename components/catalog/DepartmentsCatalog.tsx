'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { DepartmentResponse } from '@/types/models/departmentModels'

const buttonGroup: ButtonGroupState = {
  buttons: [
    { title: 'New', Icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
    { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
    { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
  ],
}

const columns = [
  { header: 'ID', width: 80 },
  { header: 'Name', width: 300 },
  { header: 'Company', width: 300 },
  { header: 'Country', width: 80 },
]

const DepartmentsCatalog = ({ departments }: { departments: DepartmentResponse[] }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const tableData = { columns, rows: departments.map(
    d => ({ cells: [String(d.id), d.name, `${d.companyName} (${d.companyId})`, d.countryCode] })) }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.DEPARTMENTS} />
      <DataTable tableData={tableData} selectedRows={selectedRows} onSelectionChange={setSelectedRows} />
    </main>
  </Layout>
}

export default DepartmentsCatalog
