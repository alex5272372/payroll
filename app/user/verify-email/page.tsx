'use client'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import { useOverlay } from '@/components/OverlayContext'
import Layout from '@/components/Layout'

const VerifyEmail = () => {
  const [email, setEmail] = useState('')
  const { showMain } = useOverlay()

  useEffect(() => {
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

    showMain(
      dialogChildren,
      buttonGroup,
      IdentificationIcon,
      'Verify email'
    )
  }, [email, showMain])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default VerifyEmail
