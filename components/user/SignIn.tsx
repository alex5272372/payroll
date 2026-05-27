'use client'
import { useEffect, useState } from 'react'
import { signIn, SignInResponse, useSession } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import PasswordField from '@/components/inputs/PasswordField'
import { useLayout } from '@/components/LayoutContext'
import ModalDialogForm from '@/components/ModalDialog/ModalDialogForm'
import { AuthProvider } from '@/types/enums'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { showError, hideDialog } = useLayout()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      showError({ errors: ['You are already signed in.'] })
    }
  }, [session, showError])

  const handleSignIn = async () => {
    const result: SignInResponse = await signIn(AuthProvider.Credentials, {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      hideDialog()
    } else {
      showError({ errors: [result?.error || 'An unknown error occurred.'] })
    }
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: ArrowRightEndOnRectangleIcon,
        title: 'Sign In',
        onClick: handleSignIn,
      },
    ],
    submitButton: 0,
  }

  return <ModalDialogForm buttonGroup={buttonGroup}>
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
  </ModalDialogForm>
}

export default SignIn
