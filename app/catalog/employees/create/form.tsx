'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createEmployeeAction } from '@/app/catalog/employees/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import type { DepartmentResponse } from '@/types/models/departmentModels'
import type { PersonResponse } from '@/types/models/personModels'

interface EmployeeCreateFormProps {
  departments: DepartmentResponse[]
  people: PersonResponse[]
}

const EmployeeCreateForm = ({ departments, people }: EmployeeCreateFormProps) => {
  const [departmentId, setDepartmentId] = useState('')
  const [personId, setPersonId] = useState('')
  const { showOk, showError } = useLayout()

  const departmentOptions = departments.map(d => ({ value: String(d.id), label: `${d.name} (${d.companyName})` }))
  const personOptions = people.map(p => ({ value: String(p.id), label: `${p.firstName} ${p.lastName}` }))

  const handleSubmit = async () => {
    const result = await createEmployeeAction({ departmentId: Number(departmentId), personId: Number(personId) })
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

export default EmployeeCreateForm
