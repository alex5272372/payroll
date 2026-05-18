'use client'
import { ReactNode } from 'react'
import OverlayDialogButtons from '@/components/overlay/OverlayDialogButtons'
import { ButtonGroupState } from '@/types'

const OverlayDialogForm = ({ children, buttonGroup } : { children: ReactNode, buttonGroup?: ButtonGroupState }) => {
  return <form
    action={buttonGroup?.submitButton !== undefined
      ? buttonGroup.buttons[buttonGroup.submitButton].onClick : undefined}
    className="flex flex-col items-end p-4 space-y-4 rounded-b-md bg-gray-600"
  >
    {children}
    <OverlayDialogButtons buttonGroup={buttonGroup} />
  </form>
}

export default OverlayDialogForm
