'use client'
import { useEffect, useState } from 'react'
import { getAllCountries } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ActionResult, ButtonState, TableData } from '@/types'
import { Country } from '@prisma/client'
import { MenuItemPath } from '@/lib/data/navigation'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/lib/data/roleMatrix'

const buttons: ButtonState[] = [
  { title: 'New', Icon: PlusIcon, href: '/catalog/countries/create', permission: CRUD.CREATE },
  { title: 'Edit', Icon: PencilIcon, onClick: () => {}, permission: CRUD.UPDATE },
  { title: 'Delete', Icon: TrashIcon, onClick: () => {}, permission: CRUD.DELETE },
]

const initialData: TableData = {
  columns: [
    { header: 'Code', width: 80 },
    { header: 'Name', width: 400 }
  ],
  rows: []
}

const CountriesCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllCountries().then((countries: ActionResult<Country[]>) => {
      if (!countries.success) {
        setError(countries.error || '')
        return
      }

      setTableData((prev: TableData) => ({
        ...prev,
        rows: countries.value?.map((country: Country) => ({ cells: [
          country.code,
          country.name,
        ] })) || []
      }))
    })
  }, [])

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

  return <Layout>
    <main>
      <Toolbar buttons={buttons} menuPath={MenuItemPath.COUNTRIES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
      />
    </main>
  </Layout>
}

export default CountriesCatalog
