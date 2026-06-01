'use client'
import { useCallback, useEffect, useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { getPersonById, updatePerson } from '@/actions/personActions'
import Layout from '@/components/Layout'
import Toolbar from '@/components/Toolbar'
import TextField from '@/components/inputs/TextField'
import SelectField from '@/components/inputs/SelectField'
import { ActionResult, ButtonGroupState } from '@/types'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD } from '@/types/enums/roleMatrix'
import { useLayout } from '@/components/LayoutContext'
import { useParams } from 'next/navigation'
import { PersonResponse } from '@/types/models/personModels'

const genderOptions = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
]

const PersonUpdate = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const { showError, showOk, showOkCancel, hideDialog } = useLayout()
  const params = useParams()
  const id = Number(params.id)

  useEffect(() => {
    getPersonById(id).then((result: ActionResult<PersonResponse>) => {
      if (!result.success) { showError(result.errorTree); return }
      setFirstName(result.value?.firstName || '')
      setLastName(result.value?.lastName || '')
      setMiddleName(result.value?.middleName || '')
      setGender(result.value?.gender || '')
      setBirthdate(result.value?.birthdate?.toISOString().split('T')[0] || '')
    })
  }, [id, showError])

  const submitConfirmed = useCallback(async (): Promise<void> => {
    hideDialog()
    const result = await updatePerson(id, {
      firstName,
      lastName,
      middleName: middleName || null,
      gender: (gender as 'MALE' | 'FEMALE' | 'OTHER') || null,
      birthdate: birthdate || null,
    })
    if (result.success) {
      showOk('Person updated', 'Person has been updated successfully')
    } else {
      showError(result.errorTree)
    }
  }, [hideDialog, id, firstName, lastName, middleName, gender, birthdate, showOk, showError])

  const handleSubmit = () => {
    showOkCancel(submitConfirmed, 'Update person', `Are you sure you want to update person ${id}?`)
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
        <SelectField
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

export default PersonUpdate
