'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { UserPlusIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { ActionResult, ButtonGroupState } from '@/types'
import { signUpAction } from '@/actions/userActions'
import PasswordField from '@/components/inputs/PasswordField'
import PasswordPolicy from '@/components/dataDisplay/PasswordPolicy'
import { useOverlay } from '@/components/OverlayContext'
import Layout from '@/components/Layout'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [error, setError] = useState('')
  const { showError, showMain } = useOverlay()

  const { data: session } = useSession()

  if (session) {
    showError('User already authorized', 'You are already signed in. Please sign out to create a new account.')
  }

  if (error) {
    showError('Server error', error)
  }

  useEffect(() => {
    const handleSubmit = async () => {
      const result: ActionResult = await signUpAction({ firstName, lastName, email, password })
      if (!result.success) setError(result.error || '')
    }

    const buttonGroup: ButtonGroupState = {
      buttons: [
        {
          Icon: UserPlusIcon,
          title: 'Sign Up',
          disabled: !passwordValid,
          onClick: handleSubmit
        },
      ],
      submitButton: 0,
    }

    const dialogChildren = (<>
      <Field>
        <Label className="text-gray-100">First name:</Label>
        <Input
          name="firstName"
          type="text"
          className="ml-2 mr-8 py-1 px-2 rounded-md bg-gray-100"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Field>

      <Field>
        <Label className="text-gray-100">Last name:</Label>
        <Input
          name="lastName"
          type="text"
          className="ml-2 mr-8 py-1 px-2 rounded-md bg-gray-100"
          onChange={(e) => setLastName(e.target.value)}
        />
      </Field>

      <Field>
        <Label className="text-gray-100">Email:</Label>
        <Input
          name="email"
          type="email"
          className="ml-2 mr-8 py-1 px-2 rounded-md bg-gray-100"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <PasswordField setPassword={setPassword} />
      <PasswordField name="confirmPassword" label="Confirm password" setPassword={setConfirmPassword} />
      <PasswordPolicy password={password} confirmPassword={confirmPassword} setPasswordValid={setPasswordValid} />
    </>)

    showMain(dialogChildren, buttonGroup, IdentificationIcon, 'Sign Up')
  }, [confirmPassword, email, error, firstName, lastName, password, passwordValid, showError, showMain])


  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default SignUp
