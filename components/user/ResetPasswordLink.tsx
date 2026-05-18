'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import { OverlayDialog } from '@/components/OverlayContext'

const ResetPasswordLink = () => {
  const [email, setEmail] = useState('')
  const emailRef = useRef(email)

  useEffect(() => {
    emailRef.current = email
  }, [email])

  const handleSignIn = useMemo(() => {
    return async () => {
      await signIn('sendgrid-reset', {
        email: emailRef.current,
        redirectTo: '/user/reset-password?email=' + encodeURIComponent(emailRef.current),
      })
    }
  }, [])

  const buttonGroup: ButtonGroupState = useMemo(() => ({
    buttons: [
      {
        Icon: ArrowPathIcon,
        title: 'Send reset password link',
        onClick: handleSignIn,
      },
    ],
    submitButton: 0,
  }), [handleSignIn])

  const dialogChildren = useMemo(() => (
    <Field>
      <Label className="text-gray-100">Email:</Label>
      <Input
        name="email"
        type="email"
        className="ml-2 py-1 px-2 rounded-md bg-gray-100"
        onChange={(e) => setEmail(e.target.value)}
      />
    </Field>
  ), [])

  return (
    <OverlayDialog
      open
      buttonGroup={buttonGroup}
      icon={IdentificationIcon}
      title="Reset password"
    >
      {dialogChildren}
    </OverlayDialog>
  )
}

export default ResetPasswordLink
