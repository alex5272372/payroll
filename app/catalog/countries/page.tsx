'use client'
import { useEffect, useState } from 'react'
import { getAllCountries } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { catalogToolbar } from '@/lib'
import { ActionResult, TableData } from '@/types'
import { Country } from '@prisma/client'
import { MenuItemPath } from '@/lib/data/navigation'

const initialData: TableData = {
  columns: [
    { header: 'Code', width: 80 },
    { header: 'Name', width: 400 }
  ],
  rows: []
}

const CountriesCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)

  useEffect(() => {
    getAllCountries().then((countries: ActionResult<Country[]>) => {
      setTableData((prev: TableData) => ({
        ...prev,
        rows: countries.value?.map((country: Country) => ({ cells: [
          country.code,
          country.name,
        ] })) || []
      }))
    })
  }, [])

  return <Layout>
    <main>
      <Toolbar items={catalogToolbar} menuPath={MenuItemPath.COUNTRIES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default CountriesCatalog
