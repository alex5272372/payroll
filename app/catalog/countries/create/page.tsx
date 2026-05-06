'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createCountry } from '@/actions/countryActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'
import { MenuItemPath } from '@/lib/data/navigation'
import { CRUD } from '@/lib/data/roleMatrix'
import { ButtonState } from '@/types'

const CountryCreate = () => {
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (formData: FormData) => {
    const result = await createCountry(formData)
    if (!result.success) {
      setError(result.error || 'Unknown error')
    } else {
      // redirect('/catalog/countries') --- IGNORE ---
    }
  }

  const buttons: ButtonState[] = [
    { title: 'Create', Icon: PlusIcon, action: handleSubmit, permission: CRUD.CREATE },
  ]
  const submitButton = buttons.find((button) => button.action)

  if (error) {
    return <ErrorDialog header='Server error' message={error} />
  }

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
