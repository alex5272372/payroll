'use client'
import { useCallback, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getCountryByCode, updateCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import { ActionResult, ButtonState } from '@/types'
import { CRUD } from '@/lib/data/roleMatrix'
import { MenuItemPath } from '@/lib/data/navigation'
import { Country } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useOverlay } from '@/components/OverlayContext'

const CountryUpdate = () => {
  const [name, setName] = useState('')
  const { showError, showOk, showOkCancel, closeDialog } = useOverlay()

  const params = useParams()

  useEffect(() => {
    getCountryByCode(params.code as string).then((country: ActionResult<Country>) => {
      if (!country.success) {
        showError('Server error', country.error || 'Failed to fetch country')
        return
      }
      setName(country.value?.name || '')
    })
  }, [params.code, showError])

  const submitConfirmed = useCallback(async (formData: FormData): Promise<void> => {
    closeDialog()
    const result = await updateCountry(formData)

    if (result.success) {
      showOk('Country updated', 'Country has been updated successfully')
    } else {
      showError('Server error', result.error || 'Failed to update country')
    }
  }, [closeDialog, showError, showOk])

  const handleSubmit = async (formData: FormData) => {
    showOkCancel(
      () => submitConfirmed(formData),
      'Update country',
      `Are you sure you want to update country ${params.code}?`
    )
  }

  const buttons: ButtonState[] = [
    { title: 'Save', Icon: PencilIcon, action: handleSubmit, permission: CRUD.UPDATE },
  ]
  const submitButton = buttons.find((button) => button.action)

  return <Layout>
    <main>
      <form action={submitButton?.action}>
        <Toolbar buttons={buttons} menuPath={MenuItemPath.COUNTRIES} />

        <div className="p-4">
          <TextField
            name="code"
            label="Country code"
            value={params.code as string}
            readonly
          />
          <TextField
            name="name"
            label="Country name"
            value={name}
            setValue={setName}
          />
        </div>
      </form>
    </main>
  </Layout>

}

export default CountryUpdate
