'use client'
import { useState } from 'react'
import { Field, Input, Label } from '@headlessui/react'
import { UserPlusIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'
import { signUpAction } from '@/actions/userActions'
import PasswordField from '@/components/inputs/PasswordField'
import PasswordPolicy from '@/components/dataDisplay/PasswordPolicy'

const SignUp = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)

  const buttons: DialogButtonState[] = [
    {
      Icon: UserPlusIcon,
      title: 'Sign Up',
      disabled: !passwordValid,
      action: signUpAction
    },
  ]

  return <MainDialog
    Icon={IdentificationIcon}
    title="User"
    buttons={buttons}
  >
    <Field>
      <Label className="text-gray-100">First name:</Label>
      <Input
        name="firstName"
        type="text"
        className="ml-2 mr-8 py-1 px-2 rounded-md bg-gray-100"
      />
    </Field>

    <Field>
      <Label className="text-gray-100">Last name:</Label>
      <Input
        name="lastName"
        type="text"
        className="ml-2 mr-8 py-1 px-2 rounded-md bg-gray-100"
      />
    </Field>

    <Field>
      <Label className="text-gray-100">Email:</Label>
      <Input
        name="email"
        type="email"
        className="ml-2 mr-8 py-1 px-2 rounded-md bg-gray-100"
      />
    </Field>

    <PasswordField setPassword={setPassword} />
    <PasswordField name="confirmPassword" label="Confirm password" setPassword={setConfirmPassword} />
    <PasswordPolicy password={password} confirmPassword={confirmPassword} setPasswordValid={setPasswordValid} />
  </MainDialog>
}

export default SignUp
