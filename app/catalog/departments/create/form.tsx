'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createDepartment } from '@/app/catalog/departments/actions'
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

interface DepartmentCreateFormProps {
  companies: CompanyResponse[]
  countries: CountryResponse[]
}

const DepartmentCreateForm = ({ companies, countries }: DepartmentCreateFormProps) => {
  const [name, setName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const { showOk, showError } = useLayout()

  const companyOptions = companies.map(c => ({ value: String(c.id), label: `${c.name} (${c.countryCode})` }))
  const countryOptions = countries.map(c => ({ value: c.code, label: `${c.code} – ${c.name}` }))

  const handleSubmit = async () => {
    const result = await createDepartment({ name, companyId: Number(companyId), countryCode })
    if (result.success) {
      showOk('Create department', `Department "${name}" has been created successfully`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.DEPARTMENTS} />
      <div className="p-4">
        <TextField name="name" label="Department name" value={name} setValue={setName} />
        <SelectField
          name="companyId"
          label="Company"
          value={companyId}
          setValue={setCompanyId}
          options={companyOptions}
        />
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

export default DepartmentCreateForm
