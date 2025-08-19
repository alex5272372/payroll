'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { ButtonState } from '@/types'

const VerifyEmail = () => {
  const [email, setEmail] = useState('')

  const onClick = async () => {
    await signIn('sendgrid-signup', {
      email,
      redirectTo: '/email-verified',
    })
  }

  const buttons: ButtonState[] = [
    {
      Icon: ArrowPathIcon,
      title: 'Send verification link',
      onClick,
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

export default VerifyEmail
