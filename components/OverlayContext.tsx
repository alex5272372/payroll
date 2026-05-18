'use client'
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'
import type { ButtonGroupState, HeroIcon } from '@/types'
import type { DialogState, ErrorTree, OverlayContextType, OverlayDialogProps } from '@/types/overlay'
import { DialogType } from '@/types/enums/overlay'

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({})

  const showDialog = useCallback((dialogState: DialogState) => {
    setDialog(dialogState)
  }, [])

  const showError = useCallback((errorTree: ErrorTree) => {
    showDialog({
      type: DialogType.ERROR,
      errorTree,
      onClose: () => setDialog({}),
      onOk: () => setDialog({})
    })
  }, [showDialog])

  const showOk = useCallback((header?: string, message?: string) => {
    showDialog({
      type: DialogType.OK,
      header,
      message,
      onClose: () => setDialog({}),
      onOk: () => setDialog({})
    })
  }, [showDialog])

  const showOkCancel = useCallback((onOk: () => void, header?: string, message?: string ) => {
    showDialog({
      type: DialogType.OK_CANCEL,
      header,
      message,
      onClose: () => setDialog({}),
      onOk,
      onCancel: () => setDialog({})
    })
  }, [showDialog])

  const showMain = useCallback((
    children: React.ReactNode,
    buttonGroup: ButtonGroupState,
    icon?: HeroIcon,
    title?: string
  ) => {
    showDialog({
      type: DialogType.MAIN,
      title,
      onClose: () => setDialog({}),
      children,
      buttonGroup,
      icon
    })
  }, [showDialog])

  const hideDialog = useCallback(() => {
    setDialog({})
  }, [])

  const closeDialog = hideDialog

  return (
    <OverlayContext.Provider
      value={{ dialog, showDialog, showError, showOk, showOkCancel, showMain, hideDialog, closeDialog }}
    >
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlay = () => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider')
  }
  return context
}

export const OverlayDialog = ({
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
