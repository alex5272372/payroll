'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'
import PasswordField from '@/components/inputs/PasswordField'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const searchParams = useSearchParams()
  const { data: session } = useSession()

  if (session) {
    return <ErrorDialog header='User already authorized' />
  }

  const error = searchParams.get('error')
  if (error) {
    return <ErrorDialog header='Invalid credentials' message='Incorrect email address or password.' />
  }

  const handleSignIn = async () => {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })
  }

  const buttons: DialogButtonState[] = [
    {
      Icon: ArrowRightEndOnRectangleIcon,
      title: 'Sign In',
      onClick: handleSignIn,
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
        onChange={(e) => setEmail(e.target.value)}
      />
    </Field>

    <PasswordField setPassword={setPassword} />
  </MainDialog>
}

export default SignIn
