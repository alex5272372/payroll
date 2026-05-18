'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { ActionResult, ButtonGroupState } from '@/types'
import { resetPasswordAction } from '@/actions/userActions'
import PasswordField from '@/components/inputs/PasswordField'
import PasswordPolicy from '@/components/dataDisplay/PasswordPolicy'
import { useOverlay } from '@/components/overlay/OverlayContext'
import OverlayDialogForm from '../overlay/OverlayDialogForm'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const { showError, showOk } = useOverlay()

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  if (email) {
    const handleResetPassword = async () => {
      const result: ActionResult = await resetPasswordAction(email, password)
      setSuccess(result.success)
    }

    const buttonGroup: ButtonGroupState = {
      buttons: [
        {
          Icon: ArrowPathIcon,
          title: 'Reset password',
          disabled: !passwordValid,
          onClick: handleResetPassword,
        },
      ],
      submitButton: 0,
    }

    if (success) {
      showOk('Password changed', 'Your password has been successfully changed.')

    } else {
      return <OverlayDialogForm buttonGroup={buttonGroup}>
        <PasswordField setPassword={setPassword} />
        <PasswordField name="confirmPassword" label="Confirm password" setPassword={setConfirmPassword} />
        <PasswordPolicy password={password} confirmPassword={confirmPassword} setPasswordValid={setPasswordValid} />
      </OverlayDialogForm>
    }

  } else {
    showError({ errors: ['Email parameter is missing in the reset password link.'] })
  }

  return null
}

export default ResetPassword
