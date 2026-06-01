'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import DataTable from '@/components/dataDisplay/DataTable'
import { ButtonGroupState, TableData } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { CountryResponse } from '@/types/models/countryModels'

const columns = [
  { header: 'Code', width: 80 },
  { header: 'Name', width: 400 },
]

const CountriesCatalog = ({ countries }: { countries: CountryResponse[] }) => {
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const tableData: TableData = {
    columns,
    rows: countries.map(c => ({ id: c.code, cells: [c.code, c.name] }))
  }

  const deleteConfirmed = useCallback(async (codes: string[]): Promise<void> => {
    hideDialog()
    for (const code of codes) {
      const result = await deleteCountry(code)
      if (!result.success) {
        showError(result.errorTree)
        return
      }
    }
    router.refresh()
    const label = codes.length > 1 ? `${codes.length} countries` : `Country ${codes[0]}`
    showOk('Delete country', `${label} deleted successfully`)
  }, [hideDialog, router, showError, showOk])

  const handleDelete = () => {
    if (!selectedCodes.size) return
    const label = selectedCodes.size > 1
      ? `${selectedCodes.size} countries`
      : `country ${[...selectedCodes][0]}`
    showOkCancel(
      () => deleteConfirmed([...selectedCodes]),
      'Delete country',
      `Are you sure you want to delete ${label}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'New', Icon: PlusIcon, href: '/catalog/countries/create', permission: CRUD.CREATE },
      {
        title: 'Edit',
        Icon: PencilIcon,
        onClick: () => {
          if (selectedCodes.size === 1) router.push(`/catalog/countries/${[...selectedCodes][0]}`)
        },
        permission: CRUD.UPDATE,
        disabled: selectedCodes.size !== 1,
      },
      {
        title: 'Delete',
        Icon: TrashIcon,
        onClick: handleDelete,
        permission: CRUD.DELETE,
        disabled: selectedCodes.size === 0,
      },
    ]
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COUNTRIES} />
      <DataTable
        tableData={tableData}
        selectedRows={selectedCodes}
        onSelectionChange={setSelectedCodes}
      />
    </main>
  </Layout>
}

export default CountriesCatalog
