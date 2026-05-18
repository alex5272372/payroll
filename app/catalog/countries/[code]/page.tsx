'use client'
import { useCallback, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getCountryByCode, updateCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import { ActionResult, ButtonGroupState } from '@/types'
import { CRUD } from '@/types/enums/roleMatrix'
import { MenuItemPath } from '@/types/enums/navigation'
import { Country } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useOverlay } from '@/components/overlay/OverlayContext'
import { CountryRequest } from '@/types/models/countryModels'

const CountryUpdate = () => {
  const [name, setName] = useState('')
  const { showError, showOk, showOkCancel, hideDialog } = useOverlay()

  const params = useParams()

  useEffect(() => {
    getCountryByCode(params.code as string).then((country: ActionResult<Country>) => {
      if (!country.success) {
        showError(country.errorTree)
        return
      }
      setName(country.value?.name || '')
    })
  }, [params.code, showError])

  const submitConfirmed = useCallback(async (country: CountryRequest): Promise<void> => {
    hideDialog()
    const result = await updateCountry(country)

    if (result.success) {
      showOk('Country updated', 'Country has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, showError, showOk])

  const handleSubmit = async (formData: FormData) => {
    showOkCancel(
      () => submitConfirmed({ code: params.code as string, name: formData.get('name') as string }),
      'Update country',
      `Are you sure you want to update country ${params.code}?`
    )
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Save', Icon: PencilIcon, onClick: handleSubmit, permission: CRUD.UPDATE },
    ],
    submitButton: 0,
  }

  return <Layout>
    <main>
      <form action={buttonGroup.buttons[buttonGroup.submitButton || 0].onClick}>
        <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COUNTRIES} />

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
