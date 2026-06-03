'use client'
import { useCallback, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getDepartmentById, updateDepartment } from '@/app/catalog/departments/actions'
import { getAllCompanies } from '@/app/catalog/companies/actions'
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
import { DepartmentResponse } from '@/types/models/departmentModels'

const DepartmentUpdate = () => {
  const [name, setName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [companyOptions, setCompanyOptions] = useState<{ value: string; label: string }[]>([])
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([])
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()
  const params = useParams()
  const id = Number(params.id)

  useEffect(() => {
    getDepartmentById(id).then((result: ActionResult<DepartmentResponse>) => {
      if (!result.success) { showError(result.errorTree); return }
      setName(result.value?.name || '')
      setCompanyId(String(result.value?.companyId || ''))
      setCountryCode(result.value?.countryCode || '')
    })
    getAllCompanies().then(result => {
      if (result.success && result.value) {
        setCompanyOptions(result.value.map(c => ({ value: String(c.id), label: `${c.name} (${c.countryCode})` })))
      }
    })
    getAllCountries().then(result => {
      if (result.success && result.value) {
        setCountryOptions(result.value.map(c => ({ value: c.code, label: `${c.code} – ${c.name}` })))
      }
    })
  }, [id, showError])

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateDepartment(id, { name, companyId: Number(companyId), countryCode })
    if (result.success) {
      showOk('Department updated', 'Department has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, id, name, companyId, countryCode, showOk, showError])

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

export default DepartmentUpdate
