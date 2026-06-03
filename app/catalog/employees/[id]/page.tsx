'use client'
import { useCallback, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getEmployeeById, updateEmployee } from '@/app/catalog/employees/actions'
import { getAllDepartments } from '@/app/catalog/departments/actions'
import { getAllPeople } from '@/app/catalog/people/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import SelectField from '@/components/inputs/SelectField'
import { ActionResult, ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { useParams } from 'next/navigation'
import { EmployeeResponse } from '@/types/models/employeeModels'

const EmployeeUpdate = () => {
  const [departmentId, setDepartmentId] = useState('')
  const [personId, setPersonId] = useState('')
  const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>([])
  const [personOptions, setPersonOptions] = useState<{ value: string; label: string }[]>([])
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()
  const params = useParams()
  const id = Number(params.id)

  useEffect(() => {
    getEmployeeById(id).then((result: ActionResult<EmployeeResponse>) => {
      if (!result.success) { showError(result.errorTree); return }
      setDepartmentId(String(result.value?.departmentId || ''))
      setPersonId(String(result.value?.personId || ''))
    })
    getAllDepartments().then(result => {
      if (result.success && result.value) {
        setDepartmentOptions(result.value.map(d => ({ value: String(d.id), label: `${d.name} (${d.companyName})` })))
      }
    })
    getAllPeople().then(result => {
      if (result.success && result.value) {
        setPersonOptions(result.value.map(p => ({ value: String(p.id), label: `${p.firstName} ${p.lastName}` })))
      }
    })
  }, [id, showError])

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateEmployee(id, { departmentId: Number(departmentId), personId: Number(personId) })
    if (result.success) {
      showOk('Employee updated', 'Employee has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, id, departmentId, personId, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update employee', `Are you sure you want to update employee ${id}?`)
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Save', Icon: PencilIcon, onClick: handleSubmit, permission: CRUD.UPDATE },
    ],
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.EMPLOYEES} />
      <div className="p-4">
        <SelectField
          name="departmentId"
          label="Department"
          value={departmentId}
          setValue={setDepartmentId}
          options={departmentOptions}
        />
        <SelectField
          name="personId"
          label="Person"
          value={personId}
          setValue={setPersonId}
          options={personOptions}
        />
      </div>
    </main>
  </Layout>
}

export default EmployeeUpdate
