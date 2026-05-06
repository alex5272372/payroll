'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import { MenuItemPath } from '@/lib/data/navigation'
import { CRUD } from '@/lib/data/roleMatrix'
import { ButtonState } from '@/types'
import { useOverlay } from '@/components/OverlayContext'

const CountryCreate = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const { showError, showOk } = useOverlay()

  const handleSubmit = async (formData: FormData) => {
    const result = await createCountry(formData)
    if (result.success) {
      showOk('Create country', `Country ${code} has been created successfully`)
    } else {
      showError('Server error', result.error || 'Failed to create country')
    }
  }

  const buttons: ButtonState[] = [
    { title: 'Create', Icon: PlusIcon, action: handleSubmit, permission: CRUD.CREATE },
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
