'use client'
import { signOut } from 'next-auth/react'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import ModalDialogButtons from '@/components/overlay/ModalDialog/ModalDialogButtons'

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

  return <div className='flex flex-col items-center p-4 rounded-b-md bg-gray-600'>
    <h2 className="mb-4 text-2xl text-gray-100">Are you sure you want to sign out?</h2>
    <ModalDialogButtons buttonGroup={buttonGroup} />
  </div>
}

export default SignOut
