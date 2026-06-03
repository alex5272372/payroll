'use client'
import { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createCompany } from '@/app/catalog/companies/actions'
import { getAllCountries } from '@/app/catalog/countries/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'

const CompanyCreate = () => {
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([])
  const { showOk, showError } = useLayout()

  useEffect(() => {
    getAllCountries().then(result => {
      if (result.success && result.value) {
        setCountryOptions(result.value.map(c => ({ value: c.code, label: `${c.code} – ${c.name}` })))
      }
    })
  }, [])

  const handleSubmit = async () => {
    const result = await createCompany({ name, countryCode })
    if (result.success) {
      showOk('Create company', `Company "${name}" has been created successfully`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.COMPANIES} />
      <div className="p-4">
        <TextField name="name" label="Company name" value={name} setValue={setName} />
        <SelectField
          name="countryCode"
          label="Country"
          value={countryCode}
          setValue={setCountryCode}
          options={countryOptions}
        />
      </div>
    </main>
  </Layout>
}

export default CompanyCreate
