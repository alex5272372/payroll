'use client'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { ArrowRightStartOnRectangleIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { ButtonGroupState } from '@/types'
import { useOverlay } from '@/components/OverlayContext'
import Layout from '@/components/Layout'

const SignOut = () => {
  const { showMain } = useOverlay()

  useEffect(() => {
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

    const dialogChildren = (<h2 className="text-2xl text-gray-100">Are you sure you want to sign out?</h2>)

    showMain(dialogChildren, buttonGroup, IdentificationIcon, 'Sign Out')
  }, [showMain])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default SignOut
