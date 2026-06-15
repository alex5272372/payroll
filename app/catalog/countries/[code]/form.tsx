'use client'
import { useCallback, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { updateCountryAction } from '@/app/catalog/countries/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import { ButtonGroupState } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { useLayout } from '@/components/LayoutContext'
import type { CountryResponse } from '@/types/models/countryModels'

interface CountryFormProps {
  country: CountryResponse
}

const CountryForm = ({ country }: CountryFormProps) => {
  const [name, setName] = useState(country.name)
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateCountryAction({ code: country.code, name })
    if (result.success) {
      showOk('Country updated', 'Country has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, country.code, name, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(
      submitConfirmed,
      'Update country',
      `Are you sure you want to update country ${country.code}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Save', Icon: PencilIcon, onClick: handleSubmit, permission: CRUD.UPDATE },
    ],
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COUNTRIES} />
      <div className="p-4">
        <TextField name="code" label="Country code" value={country.code} />
        <TextField name="name" label="Country name" value={name} setValue={setName} />
      </div>
    </main>
  </Layout>
}

export default CountryForm
