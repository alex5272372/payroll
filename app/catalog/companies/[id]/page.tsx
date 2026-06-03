'use client'
import { useCallback, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getCompanyById, updateCompany } from '@/app/catalog/companies/actions'
import { getAllCountries } from '@/app/catalog/countries/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ActionResult, ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { useParams } from 'next/navigation'
import { CompanyResponse } from '@/types/models/companyModels'

const CompanyUpdate = () => {
  const [name, setName] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([])
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()
  const params = useParams()
  const id = Number(params.id)

  useEffect(() => {
    getCompanyById(id).then((result: ActionResult<CompanyResponse>) => {
      if (!result.success) { showError(result.errorTree); return }
      setName(result.value?.name || '')
      setCountryCode(result.value?.countryCode || '')
    })
    getAllCountries().then(result => {
      if (result.success && result.value) {
        setCountryOptions(result.value.map(c => ({ value: c.code, label: `${c.code} – ${c.name}` })))
      }
    })
  }, [id, showError])

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateCompany(id, { name, countryCode })
    if (result.success) {
      showOk('Company updated', 'Company has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, id, name, countryCode, showOk, showError])

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

export default CompanyUpdate
