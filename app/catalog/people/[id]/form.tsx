'use client'
import { useCallback, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { updatePerson } from '@/app/catalog/people/actions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import type { PersonResponse } from '@/types/models/personModels'
import { Gender } from '@/types/enums'

const genderOptions: Array<{ value: Gender; label: string }> = [
  { value: Gender.Male, label: 'Male' },
  { value: Gender.Female, label: 'Female' },
  { value: Gender.Other, label: 'Other' },
]

interface PersonFormProps {
  person: PersonResponse
}

const PersonForm = ({ person }: PersonFormProps) => {
  const [firstName, setFirstName] = useState(person.firstName)
  const [lastName, setLastName] = useState(person.lastName)
  const [middleName, setMiddleName] = useState(person.middleName || '')
  const [gender, setGender] = useState<Gender | ''>(person.gender || '')
  const [birthdate, setBirthdate] = useState(
    person.birthdate ? new Date(person.birthdate).toISOString().split('T')[0] : ''
  )
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updatePerson(person.id, {
      firstName,
      lastName,
      middleName: middleName || null,
      gender: gender || null,
      birthdate: birthdate || null,
    })
    if (result.success) {
      showOk('Person updated', 'Person has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, person.id, firstName, lastName, middleName, gender, birthdate, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update person', `Are you sure you want to update person ${person.id}?`)
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      { title: 'Save', Icon: PencilIcon, onClick: handleSubmit, permission: CRUD.UPDATE },
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

export default PersonForm
