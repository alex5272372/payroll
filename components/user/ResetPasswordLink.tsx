'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import ModalDialogForm from '@/components/overlay/ModalDialog/ModalDialogForm'

const ResetPasswordLink = () => {
  const [email, setEmail] = useState('')

  const handleSignIn = async () => {
    await signIn('sendgrid-reset', {
      email,
      redirectTo: '/user/reset-password?email=' + encodeURIComponent(email),
    })
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: ArrowPathIcon,
        title: 'Send reset password link',
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
        className="ml-2 py-1 px-2 rounded-md bg-gray-100"
        onChange={(e) => setEmail(e.target.value)}
      />
    </Field>
  </ModalDialogForm>
}

export default ResetPasswordLink
