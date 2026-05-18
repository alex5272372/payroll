'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowRightEndOnRectangleIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import PasswordField from '@/components/inputs/PasswordField'
import { useOverlay } from '@/components/overlay/OverlayContext'
import Layout from '@/components/Layout'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { showError, showMain } = useOverlay()

  const searchParams = useSearchParams()
  const { data: session } = useSession()

  if (session) {
    showError({ errors: ['You are already signed in.'] })
  }

  const error = searchParams.get('error')
  if (error) {
    showError({ errors: ['Invalid email or password. Please try again.'] })
  }

  useEffect(() => {
    const handleSignIn = async () => {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/',
      })
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

    const dialogChildren = (<>
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
    </>)

    showMain(dialogChildren, buttonGroup, IdentificationIcon, 'Sign In')
  }, [email, password, showError, showMain])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default SignIn
