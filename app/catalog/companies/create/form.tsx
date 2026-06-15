'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createCompanyAction } from '@/app/catalog/companies/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { CountryResponse } from '@/types/models/countryModels'

interface CompanyCreateFormProps {
  countries: CountryResponse[]
}

const CompanyCreateForm = ({ countries }: CompanyCreateFormProps) => {
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const { showOk, showError } = useLayout()

  const countryOptions = countries.map(c => ({ value: c.code, label: `${c.code} – ${c.name}` }))

  const handleSubmit = async () => {
    const result = await createCompanyAction({ name, countryCode })
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

export default CompanyCreateForm
