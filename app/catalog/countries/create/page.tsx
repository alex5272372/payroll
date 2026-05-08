'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import { MenuItemPath } from '@/types/enums/navigation'
import { CRUD } from '@/types/enums/roleMatrix'
import { ButtonGroupState } from '@/types'
import { useOverlay } from '@/components/OverlayContext'
import { CountryRequest } from '@/types/models/countryModels'

const CountryCreate = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const { showError, showOk } = useOverlay()

  const handleSubmit = async (country: CountryRequest) => {
    const result = await createCountry(country)
    if (result.success) {
      showOk('Create country', `Country ${code} has been created successfully`)
    } else {
      showError('Server error', result.error || 'Failed to create country')
    }
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Create', Icon: PlusIcon, onClick: () => handleSubmit({ code, name }), permission: CRUD.CREATE },
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
            value={code}
            setValue={setCode}
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

export default CountryCreate
