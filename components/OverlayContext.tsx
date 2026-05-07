'use client'
import { ButtonState, DialogType, HeroIcon } from '@/types'
import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

export interface DialogState {
  type?: DialogType
  title?: string
  header?: string
  message?: string
  children?: React.ReactNode
  buttons?: ButtonState[]
  icon?: HeroIcon
  onClose?: () => void
  onOk?: () => void
  onCancel?: () => void
}

interface OverlayContextType {
  dialog: DialogState
  showError: (
    header?: string,
    message?: string
  ) => void
  showOk: (
    header?: string,
    message?: string
  ) => void
  showOkCancel: (
    onOk: () => void,
    header?: string,
    message?: string,
  ) => void
  showMain: (
    children: React.ReactNode,
    buttons: ButtonState[],
    icon?: HeroIcon,
    title?: string,
  ) => void
  closeDialog: () => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({})

  const showError = useCallback((header?: string, message?: string) => {
    setDialog({
      type: 'error',
      header,
      message,
      onClose: () => setDialog({}),
      onOk: () => setDialog({})
    })
  }, [])

  const showOk = useCallback((header?: string, message?: string) => {
    setDialog({
      type: 'ok',
      header,
      message,
      onClose: () => setDialog({}),
      onOk: () => setDialog({})
    })
  }, [])

  const showOkCancel = useCallback((onOk: () => void, header?: string, message?: string ) => {
    setDialog({
      type: 'okCancel',
      header,
      message,
      onClose: () => setDialog({}),
      onOk,
      onCancel: () => setDialog({})
    })
  }, [])

  const showMain = useCallback((children: React.ReactNode, buttons: ButtonState[], icon?: HeroIcon, title?: string) => {
    setDialog({
      type: 'main',
      onClose: () => setDialog({}),
      children,
      buttons,
      icon
    })
  }, [])

  const closeDialog = useCallback(() => {
    setDialog({})
  }, [])

  return (
    <OverlayContext.Provider value={{ dialog, showError, showOk, showOkCancel, showMain, closeDialog }}>
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
