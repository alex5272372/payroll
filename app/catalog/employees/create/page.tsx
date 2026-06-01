'use client'
import { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createEmployee } from '@/actions/employeeActions'
import { getAllDepartments } from '@/actions/departmentActions'
import { getAllPeople } from '@/actions/personActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'

const EmployeeCreate = () => {
  const [departmentId, setDepartmentId] = useState('')
  const [personId, setPersonId] = useState('')
  const [departmentOptions, setDepartmentOptions] = useState<{ value: string; label: string }[]>([])
  const [personOptions, setPersonOptions] = useState<{ value: string; label: string }[]>([])
  const { showOk, showError } = useLayout()

  useEffect(() => {
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
  }, [])

  const handleSubmit = async () => {
    const result = await createEmployee({ departmentId: Number(departmentId), personId: Number(personId) })
    if (result.success) {
      showOk('Create employee', 'Employee has been created successfully')
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

export default EmployeeCreate
