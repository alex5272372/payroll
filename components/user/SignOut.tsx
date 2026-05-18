'use client'
import { signOut } from 'next-auth/react'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import OverlayDialogButtons from '../overlay/OverlayDialogButtons'

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut({ redirectTo: '/' })
  }

  const buttonGroup: ButtonGroupState = {
    buttons: [
      {
        Icon: ArrowRightStartOnRectangleIcon,
        title: 'Sign Out',
        onClick: handleSignOut,
      },
    ],
    submitButton: 0,
  }

  return <>
    <h2 className="text-2xl text-gray-100">Are you sure you want to sign out?</h2>
    <OverlayDialogButtons buttonGroup={buttonGroup} />
  </>
}

export default SignOut
