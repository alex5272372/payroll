'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getAllCountries, deleteCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState, TableData, TableDataRow } from '@/types'
import { Country } from '@prisma/client'
import { MenuItemPath } from '@/types/enums/navigation'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { useOverlay } from '@/components/OverlayContext'

const initialData: TableData = {
  columns: [
    { header: 'Code', width: 80 },
    { header: 'Name', width: 400 }
  ],
  rows: []
}

const CountriesCatalog = () => {
  const [tableData, setTableData] = useState<TableData>(initialData)
  const [selectedCode, setSelectedCode] = useState('')
  const router = useRouter()
  const { showError, showOk, showOkCancel, closeDialog } = useOverlay()

  const fetchCountries = useCallback(async (): Promise<void> => {
    const result = await getAllCountries()
    if (!result.success) {
      showError(result.errorTree)
    }
    setTableData((prev: TableData) => ({
      ...prev,
      rows: result.value?.map((country: Country) => ({ cells: [
        country.code,
        country.name,
      ] })) || []
    }))
  }, [showError])

  const deleteConfirmed = useCallback(async (code: string): Promise<void> => {
    closeDialog()
    const deleteResult = await deleteCountry(code)

    if (deleteResult.success) {
      setSelectedCode('')
      await fetchCountries()
      showOk('Delete country', `Country ${code} has been deleted successfully`)

    } else {
      showError(deleteResult.errorTree)
    }
  }, [closeDialog, fetchCountries, showError, showOk])

  const handleDelete = () => {
    if (!selectedCode) return

    showOkCancel(
      () => deleteConfirmed(selectedCode),
      'Delete country',
      `Are you sure you want to delete country ${selectedCode}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'New', Icon: PlusIcon, href: '/catalog/countries/create', permission: CRUD.CREATE },
      {
        title: 'Edit',
        Icon: PencilIcon,
        onClick: () => { selectedCode && router.push(`/catalog/countries/${selectedCode}`) },
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
  }

  useEffect(() => {
    (async () => await fetchCountries())()
  }, [fetchCountries])

  const handleRowSelect = (row?: TableDataRow) => {
    setSelectedCode(row?.cells?.[0] || '')
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COUNTRIES} />
      <DataTable
        tableData={tableData}
        setTableData={setTableData}
        onRowSelect={handleRowSelect}
      />
    </main>
  </Layout>
}

export default CountriesCatalog
