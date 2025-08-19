'use client'
import { useEffect, useState } from 'react'
import { Company } from '@prisma/client'
import { getAllCompanies } from '@/actions/companyActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import Toolbar from '@/components/Toolbar'
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
    { header: 'Name', width: 400 },
    { header: 'Country', width: 80 }
  ],
  rows: []
}

const CompaniesCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllCompanies().then((companies: ActionResult<Company[]>) => {
      if (!companies.success) {
        setError(companies.error || '')
        return
      }

      setTableData((prev: TableData) => ({
        ...prev,
        rows: companies.value?.map((company: Company) => ({ cells: [
          String(company.id),
          company.name, company.countryCode,
        ] })) || []
      }))
    })
  }, [])

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

  return <Layout>
    <main>
      <Toolbar buttons={buttons} menuPath={MenuItemPath.COMPANIES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default CompaniesCatalog
