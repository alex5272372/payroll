'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createCountry } from '@/app/catalog/countries/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'

const CountryCreateForm = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const { showOk, showError } = useLayout()

  const handleSubmit = async () => {
    const result = await createCountry({ code, name })
    if (result.success) {
      showOk('Create country', `Country ${code} has been created successfully`)
    } else {
      showError(result.errorTree)
    }
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Create', Icon: PlusIcon, onClick: handleSubmit, permission: CRUD.CREATE },
    ],
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COUNTRIES} />
      <div className="p-4">
        <TextField name="code" label="Country code" value={code} setValue={setCode} />
        <TextField name="name" label="Country name" value={name} setValue={setName} />
      </div>
    </main>
  </Layout>
}

export default CountryCreateForm
