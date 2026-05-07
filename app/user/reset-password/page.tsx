'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { ActionResult, ButtonState } from '@/types'
import { resetPasswordAction } from '@/actions/userActions'
import PasswordField from '@/components/inputs/PasswordField'
import PasswordPolicy from '@/components/dataDisplay/PasswordPolicy'
import { useOverlay } from '@/components/OverlayContext'
import Layout from '@/components/Layout'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const { showError, showOk, showMain } = useOverlay()

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  if (email) {
    const handleResetPassword = async () => {
      const result: ActionResult = await resetPasswordAction(email, password)
      setSuccess(result.success)
    }

    const buttons: ButtonState[] = [
      {
        Icon: ArrowPathIcon,
        title: 'Reset password',
        disabled: !passwordValid,
        onClick: handleResetPassword,
      },
    ]

    if (success) {
      showOk('Password changed', 'Your password has been successfully changed.')

    } else {
      const dialogChildren = (<>
        <PasswordField setPassword={setPassword} />
        <PasswordField name="confirmPassword" label="Confirm password" setPassword={setConfirmPassword} />
        <PasswordPolicy password={password} confirmPassword={confirmPassword} setPasswordValid={setPasswordValid} />
      </>)
      showMain(dialogChildren, buttons, IdentificationIcon, 'Reset password')
    }

  } else {
    showError('Invalid link', 'Email parameter is missing in the reset password link.')
  }

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default ResetPassword
