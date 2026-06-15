'use client'
import { useCallback, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { updateEmployeeAction } from '@/app/catalog/employees/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import type { EmployeeResponse } from '@/types/models/employeeModels'
import type { DepartmentResponse } from '@/types/models/departmentModels'
import type { PersonResponse } from '@/types/models/personModels'

interface EmployeeFormProps {
  employee: EmployeeResponse
  departments: DepartmentResponse[]
  people: PersonResponse[]
}

const EmployeeForm = ({ employee, departments, people }: EmployeeFormProps) => {
  const [departmentId, setDepartmentId] = useState(String(employee.departmentId))
  const [personId, setPersonId] = useState(String(employee.personId))
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const departmentOptions = departments.map(d => ({ value: String(d.id), label: `${d.name} (${d.companyName})` }))
  const personOptions = people.map(p => ({ value: String(p.id), label: `${p.firstName} ${p.lastName}` }))

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateEmployeeAction(employee.id,
      { departmentId: Number(departmentId), personId: Number(personId) })
    if (result.success) {
      showOk('Employee updated', 'Employee has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, employee.id, departmentId, personId, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update employee', `Are you sure you want to update employee ${employee.id}?`)
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

export default EmployeeForm
