'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllCountries, deleteCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonState, TableData, TableDataRow } from '@/types'
import { Country } from '@prisma/client'
import { MenuItemPath } from '@/lib/data/navigation'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/lib/data/roleMatrix'

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
  const [selectedCode, setSelectedCode] = useState('')
  const router = useRouter()

  const fetchCountries = async (): Promise<void> => {
    const result = await getAllCountries()
    if (!result.success) {
      setError(result.error || 'Failed to fetch countries')
    }
    setTableData((prev: TableData) => ({
      ...prev,
      rows: result.value?.map((country: Country) => ({ cells: [
        country.code,
        country.name,
      ] })) || []
    }))
  }

  const handleDelete = async () => {
    if (!selectedCode) return
    const deleteResult = await deleteCountry(selectedCode)
    if (!deleteResult.success) {
      setError(deleteResult.error || 'Failed to delete country')
      return
    }
    setSelectedCode('')
    await fetchCountries()
  }

  const buttons: ButtonState[] = [
    { title: 'New', Icon: PlusIcon, href: '/catalog/countries/create', permission: CRUD.CREATE },
    {
      title: 'Edit',
      Icon: PencilIcon,
      onClick: () => selectedCode && router.push(`/catalog/countries/${selectedCode}`),
      permission: CRUD.UPDATE,
      disabled: !selectedCode,
    },
    {
      title: 'Delete',
      Icon: TrashIcon,
      onClick: handleDelete,
      permission: CRUD.DELETE,
      disabled: !selectedCode,
    },
  ]

  useEffect(() => {
    (async () => await fetchCountries())()
  }, [])

  const handleRowSelect = (row?: TableDataRow) => {
    setSelectedCode(row?.cells?.[0] || '')
  }

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

  return <Layout>
    <main>
      <Toolbar buttons={buttons} menuPath={MenuItemPath.COUNTRIES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
        onRowSelect={handleRowSelect}
      />
    </main>
  </Layout>
}

export default CountriesCatalog
