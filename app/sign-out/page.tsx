'use client'
import { signOut } from 'next-auth/react'
import { ArrowRightStartOnRectangleIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut({ redirectTo: '/' })
  }

  const buttons: DialogButtonState[] = [
    {
      Icon: ArrowRightStartOnRectangleIcon,
      title: 'Sign Out',
      onClick: handleSignOut,
    },
  ]

  return <MainDialog
    Icon={IdentificationIcon}
    title="User"
    buttons={buttons}
  >
    <h2 className="text-2xl text-gray-100">Are you sure you want to sign out?</h2>
  </MainDialog>
}

export default SignOut
