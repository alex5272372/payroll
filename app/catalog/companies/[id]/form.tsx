'use client'
import { useCallback, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { updateCompanyAction } from '@/app/catalog/companies/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import type { CompanyResponse } from '@/types/models/companyModels'
import type { CountryResponse } from '@/types/models/countryModels'

interface CompanyFormProps {
  company: CompanyResponse
  countries: CountryResponse[]
}

const CompanyForm = ({ company, countries }: CompanyFormProps) => {
  const [name, setName] = useState(company.name)
  const [countryCode, setCountryCode] = useState(company.countryCode)
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const countryOptions = countries.map(c => ({ value: c.code, label: `${c.code} – ${c.name}` }))

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateCompanyAction(company.id, { name, countryCode })
    if (result.success) {
      showOk('Company updated', 'Company has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, company.id, name, countryCode, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update company', `Are you sure you want to update company "${name}"?`)
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Save', Icon: PencilIcon, onClick: handleSubmit, permission: CRUD.UPDATE },
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

export default CompanyForm
