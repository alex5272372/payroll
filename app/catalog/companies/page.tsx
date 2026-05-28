'use client'
import { useEffect, useState } from 'react'
import { getAllCompanies } from '@/actions/companyActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import Toolbar from '@/components/Toolbar'
import { ActionResult, ButtonGroupState, TableData } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { CompanyResponse } from '@/types/models/companyModels'

const buttonGroup: ButtonGroupState = {
  buttons: [
    { title: 'New', Icon: PlusIcon, onClick: () => {}, permission: CRUD.CREATE },
    { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
    { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
  ]
}

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
  const { showError } = useLayout()

  useEffect(() => {
    getAllCompanies().then((companies: ActionResult<CompanyResponse[]>) => {
      if (!companies.success) {
        showError(companies.errorTree)
        return
      }

      setTableData((prev: TableData) => ({
        ...prev,
        rows: companies.value?.map((company: CompanyResponse) => ({ cells: [
          String(company.id),
          company.name, company.countryCode,
        ] })) || []
      }))
    })
  }, [showError])

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COMPANIES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default CompaniesCatalog
