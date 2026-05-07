'use client'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { ButtonState } from '@/types'
import { useOverlay } from '@/components/OverlayContext'
import Layout from '@/components/Layout'

const ResetPasswordLink = () => {
  const [email, setEmail] = useState('')
  const { showMain } = useOverlay()

  useEffect(() => {
    const handleSignIn = async () => {
      await signIn('sendgrid-reset', {
        email,
        redirectTo: '/user/reset-password?email=' + encodeURIComponent(email),
      })
    }

    const buttons: ButtonState[] = [
      {
        Icon: ArrowPathIcon,
        title: 'Send reset password link',
        onClick: handleSignIn,
      },
    ]

    const dialogChildren = (<>
      <Field>
        <Label className="text-gray-100">Email:</Label>
        <Input
          name="email"
          type="email"
          className="ml-2 py-1 px-2 rounded-md bg-gray-100"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
    </>)

    showMain(dialogChildren, buttons, IdentificationIcon, 'Reset password')
  }, [email, showMain])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default ResetPasswordLink
