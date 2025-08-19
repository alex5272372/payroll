'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { ActionResult, ButtonState } from '@/types'
import { resetPasswordAction } from '@/actions/userActions'
import PasswordField from '@/components/inputs/PasswordField'
import PasswordPolicy from '@/components/dataDisplay/PasswordPolicy'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'
import OkDialog from '@/components/MainDialog/OkDialog'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [success, setSuccess] = useState(false)

  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  if (!email) {
    return <ErrorDialog header='Reset Password' message='Email parameter is missing.' />
  }

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
    return <OkDialog header="Password changed" message="Your password has been successfully changed." />

  } else {
    return <MainDialog
      Icon={IdentificationIcon}
      title="User"
      buttons={buttons}
    >
      <PasswordField setPassword={setPassword} />
      <PasswordField name="confirmPassword" label="Confirm password" setPassword={setConfirmPassword} />
      <PasswordPolicy password={password} confirmPassword={confirmPassword} setPasswordValid={setPasswordValid} />
    </MainDialog>
  }
}

export default ResetPassword
