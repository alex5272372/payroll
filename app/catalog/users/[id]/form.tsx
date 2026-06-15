'use client'
import { useCallback, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { updateUserAction } from '@/app/catalog/users/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import type { UserResponse } from '@/types/models/userModels'
import type { PersonResponse } from '@/types/models/personModels'

interface UserFormProps {
  user: UserResponse
  people: PersonResponse[]
}

const UserForm = ({ user, people }: UserFormProps) => {
  const [email, setEmail] = useState(user.email)
  const [personId, setPersonId] = useState(String(user.personId))
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const personOptions = people.map(p => ({ value: String(p.id), label: `${p.firstName} ${p.lastName}` }))

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateUserAction(user.id, { email, personId: Number(personId) })
    if (result.success) {
      showOk('User updated', 'User has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, user.id, email, personId, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update user', `Are you sure you want to update user ${user.id}?`)
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Save', Icon: PencilIcon, onClick: handleSubmit, permission: CRUD.UPDATE },
    ],
  }

  return <Layout>
    <main>
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.USERS} />
      <div className="p-4">
        <TextField name="email" label="Email" value={email} setValue={setEmail} />
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

export default UserForm
