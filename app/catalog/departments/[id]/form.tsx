'use client'
import { useCallback, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { updateDepartment } from '@/app/catalog/departments/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import type { DepartmentResponse } from '@/types/models/departmentModels'
import type { CompanyResponse } from '@/types/models/companyModels'
import type { CountryResponse } from '@/types/models/countryModels'

interface DepartmentFormProps {
  department: DepartmentResponse
  companies: CompanyResponse[]
  countries: CountryResponse[]
}

const DepartmentForm = ({ department, companies, countries }: DepartmentFormProps) => {
  const [name, setName] = useState(department.name)
  const [companyId, setCompanyId] = useState(String(department.companyId))
  const [countryCode, setCountryCode] = useState(department.countryCode)
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const companyOptions = companies.map(c => ({ value: String(c.id), label: `${c.name} (${c.countryCode})` }))
  const countryOptions = countries.map(c => ({ value: c.code, label: `${c.code} – ${c.name}` }))

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateDepartment(department.id, { name, companyId: Number(companyId), countryCode })
    if (result.success) {
      showOk('Department updated', 'Department has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, department.id, name, companyId, countryCode, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update department', `Are you sure you want to update department "${name}"?`)
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Save', Icon: PencilIcon, onClick: handleSubmit, permission: CRUD.UPDATE },
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

export default DepartmentForm
