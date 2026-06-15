'use client'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { createPerson } from '@/app/catalog/people/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { Gender } from '@/types/enums'

const genderOptions = [
  { value: Gender.Male, label: 'Male' },
  { value: Gender.Female, label: 'Female' },
  { value: Gender.Other, label: 'Other' },
]

const PersonCreateForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [birthdate, setBirthdate] = useState('')
  const { showOk, showError } = useLayout()

  const handleSubmit = async () => {
    const result = await createPerson({
      firstName,
      lastName,
      middleName: middleName || null,
      gender: gender || null,
      birthdate: birthdate || null,
    })
    if (result.success) {
      showOk('Create person', `Person "${firstName} ${lastName}" has been created successfully`)
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
      <Toolbar buttonGroup={buttonGroup} menuPath={MenuItemPath.PEOPLE} />
      <div className="p-4">
        <TextField name="firstName" label="First name" value={firstName} setValue={setFirstName} />
        <TextField name="lastName" label="Last name" value={lastName} setValue={setLastName} />
        <TextField name="middleName" label="Middle name" value={middleName} setValue={setMiddleName} />
        <SelectField<Gender>
          name="gender"
          label="Gender"
          value={gender}
          setValue={setGender}
          options={genderOptions}
        />
        <TextField
          name="birthdate"
          label="Birthdate"
          value={birthdate}
          setValue={setBirthdate}
          placeholder="YYYY-MM-DD"
        />
      </div>
    </main>
  </Layout>
}

export default PersonCreateForm
