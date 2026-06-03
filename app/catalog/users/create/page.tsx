'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createUserAdmin } from '@/app/catalog/users/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import PasswordField from '@/components/inputs/PasswordField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'

const UserCreate = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const { showOk, showError } = useLayout()

  const handleSubmit = async () => {
    const result = await createUserAdmin({ email, firstName, lastName, password })
    if (result.success) {
      showOk('Create user', `User "${email}" has been created successfully`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.USERS} />
      <div className="p-4">
        <TextField name="email" label="Email" value={email} setValue={setEmail} />
        <TextField name="firstName" label="First name" value={firstName} setValue={setFirstName} />
        <TextField name="lastName" label="Last name" value={lastName} setValue={setLastName} />
        <PasswordField setPassword={setPassword} />
      </div>
    </main>
  </Layout>
}

export default UserCreate
