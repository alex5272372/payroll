'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import OverlayDialogForm from '../overlay/OverlayDialogForm'

const VerifyEmail = () => {
  const [email, setEmail] = useState('')

  const onClick = async () => {
    await signIn('sendgrid-signup', {
      email,
      redirectTo: '/email-verified',
    })
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: ArrowPathIcon,
        title: 'Send verification link',
        onClick,
      },
    ],
    submitButton: 0,
  }

  return <OverlayDialogForm buttonGroup={buttonGroup}>
    <Field>
      <Label className="text-gray-100">Email:</Label>
      <Input
        name="email"
        type="email"
        className="ml-2 py-1 px-2 rounded-md bg-gray-100"
        onChange={(e) => setEmail(e.target.value)}
      />
    </Field>
  </OverlayDialogForm>
}

export default VerifyEmail
