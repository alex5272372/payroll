'use client'
import { useCallback, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getUserById, updateUserAdmin } from '@/app/catalog/users/actions'
import { getAllPeople } from '@/app/catalog/people/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ActionResult, ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { useParams } from 'next/navigation'
import { UserResponse } from '@/types/models/userModels'

const UserUpdate = () => {
  const [email, setEmail] = useState('')
  const [personId, setPersonId] = useState('')
  const [personOptions, setPersonOptions] = useState<{ value: string; label: string }[]>([])
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()
  const params = useParams()
  const id = Number(params.id)

  useEffect(() => {
    getUserById(id).then((result: ActionResult<UserResponse>) => {
      if (!result.success) { showError(result.errorTree); return }
      setEmail(result.value?.email || '')
      setPersonId(String(result.value?.personId || ''))
    })
    getAllPeople().then(result => {
      if (result.success && result.value) {
        setPersonOptions(result.value.map(p => ({ value: String(p.id), label: `${p.firstName} ${p.lastName}` })))
      }
    })
  }, [id, showError])

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updateUserAdmin(id, { email, personId: Number(personId) })
    if (result.success) {
      showOk('User updated', 'User has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, id, email, personId, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update user', `Are you sure you want to update user ${id}?`)
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

export default UserUpdate
