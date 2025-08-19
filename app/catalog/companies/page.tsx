'use client'
import { useEffect, useState } from 'react'
import { Company } from '@prisma/client'
import { getAllCompanies } from '@/actions/companyActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import Toolbar from '@/components/Toolbar'
import { ActionResult, TableData } from '@/types'
import { catalogToolbar } from '@/lib'
import { MenuItemPath } from '@/lib/data/navigation'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'

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
      <Toolbar items={catalogToolbar} menuPath={MenuItemPath.COMPANIES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default CompaniesCatalog
