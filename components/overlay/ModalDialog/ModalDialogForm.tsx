'use client'
import { ReactNode } from 'react'
import ModalDialogButtons from '@/components/overlay/ModalDialog/ModalDialogButtons'
import { ButtonGroupState } from '@/types'

const ModalDialogForm = ({ children, buttonGroup } : { children: ReactNode, buttonGroup?: ButtonGroupState }) => {
  return <form
    action={buttonGroup?.submitButton !== undefined
      ? buttonGroup.buttons[buttonGroup.submitButton].onClick : undefined}
    className="flex flex-col items-end p-4 space-y-4 rounded-b-md bg-gray-600"
  >
    {children}
    <ModalDialogButtons buttonGroup={buttonGroup} />
  </form>
}

export default ModalDialogForm
