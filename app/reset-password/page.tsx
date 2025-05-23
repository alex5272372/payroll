'use client'
import { Field, Input, Label } from '@headlessui/react'
import { ArrowPathIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import MainDialog from '@/components/MainDialog'
import { DialogButtonState } from '@/types'
import { resetPasswordAction } from '@/actions/userActions'

const ResetPassword = () => {
  const buttons: DialogButtonState[] = [
    {
      Icon: ArrowPathIcon,
      title: 'Send reset password link',
      action: resetPasswordAction
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
      />
    </Field>
  </MainDialog>
}

export default ResetPassword
