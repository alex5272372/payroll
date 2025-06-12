'use client'
import { useEffect, useState } from 'react'
import { Company } from '@prisma/client'
import { getAllCompanies } from '@/actions/companyActions'
import Layout from '@/components/Layout'
import DataTable from '@/components/dataDisplay/DataTable'
import Toolbar from '@/components/Toolbar'
import { ActionResult, TableData } from '@/types'
import { catalogToolbar } from '@/lib'

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

  useEffect(() => {
    getAllCompanies().then((companies: ActionResult<Company[]>) => {
      setTableData((prev: TableData) => ({
        ...prev,
        rows: companies.value?.map((company: Company) => ({ cells: [
          String(company.id),
          company.name, company.countryCode,
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

export default CompaniesCatalog
