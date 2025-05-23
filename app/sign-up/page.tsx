'use client'
import { useState } from 'react'
import { Field, Input, Label } from '@headlessui/react'
import { UserPlusIcon, EyeIcon, EyeSlashIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'
import { signUpAction } from '@/actions/userActions'

const SignUp = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const buttons: DialogButtonState[] = [
    {
      Icon: UserPlusIcon,
      title: 'Sign Up',
      action: signUpAction
    },
  ]

  return <MainDialog
    Icon={IdentificationIcon}
    title="User"
    buttons={buttons}
  >
    <Field>
      <Label className="text-gray-100">Email:</Label>
      <Input
        name="email"
        type="email"
        className="ml-2 mr-8 py-1 px-2 rounded-md bg-gray-100"
      />
    </Field>

    <Field className="flex items-center">
      <Label className="text-gray-100">Password:</Label>
      <Input
        name="password"
        type={showPassword ? 'text' : 'password'}
        className="ml-2 py-1 px-2 rounded-md bg-gray-100"
        onChange={(e) => setPassword(e.target.value)}
      />
      {!showPassword && <EyeIcon
        className="h-6 ml-2 cursor-pointer bg-gray-700 text-gray-300 hover:bg-gray-500"
        onClick={() => setShowPassword(true)}
      />}
      {showPassword && <EyeSlashIcon
        className="h-6 ml-2 cursor-pointer bg-gray-700 text-gray-300 hover:bg-gray-500"
        onClick={() => setShowPassword(false)}
      />}
    </Field>

    <Field className="flex items-center">
      <Label className="text-gray-100">Confirm password:</Label>
      <Input
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        className="ml-2 py-1 px-2 rounded-md bg-gray-100"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {!showConfirmPassword && <EyeIcon
        className="h-6 ml-2 cursor-pointer bg-gray-700 text-gray-300 hover:bg-gray-500"
        onClick={() => setShowConfirmPassword(true)}
      />}
      {showConfirmPassword && <EyeSlashIcon
        className="h-6 ml-2 cursor-pointer bg-gray-700 text-gray-300 hover:bg-gray-500"
        onClick={() => setShowConfirmPassword(false)}
      />}
    </Field>

    <p className="text-yellow-300" hidden={password === confirmPassword}>
      Password and confirmation do not match
    </p>
  </MainDialog>
}

export default SignUp
