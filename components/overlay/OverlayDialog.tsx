'use client'
import { useEffect } from 'react'
import type { OverlayDialogProps } from '@/types/overlay'
import { DialogType } from '@/types/enums/overlay'
import { useOverlay } from '@/components/overlay/OverlayContext'

const OverlayDialog = ({
  open,
  children,
  buttonGroup,
  icon,
  title,
  onClose,
}: OverlayDialogProps) => {
  const { showDialog, hideDialog } = useOverlay()

  useEffect(() => {
    if (!open) {
      hideDialog()
      return
    }

    showDialog({
      type: DialogType.MAIN,
      title,
      onClose: onClose ?? hideDialog,
      children,
      buttonGroup,
      icon,
    })

    return () => {
      hideDialog()
    }
  }, [open, showDialog, hideDialog, children, buttonGroup, icon, title, onClose])

  return null
}

export default OverlayDialog
