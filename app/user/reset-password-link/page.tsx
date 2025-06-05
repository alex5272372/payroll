'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'

const ResetPasswordLink = () => {
  const [email, setEmail] = useState('')

  const handleSignIn = async () => {
    await signIn('sendgrid-reset', {
      email,
      redirectTo: '/user/reset-password?email=' + encodeURIComponent(email),
    })
  }

  const buttons: DialogButtonState[] = [
    {
      Icon: ArrowPathIcon,
      title: 'Send reset password link',
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
        className="ml-2 py-1 px-2 rounded-md bg-gray-100"
        onChange={(e) => setEmail(e.target.value)}
      />
    </Field>
  </MainDialog>
}

export default ResetPasswordLink
