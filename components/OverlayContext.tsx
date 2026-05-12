'use client'
import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import type { ButtonGroupState, HeroIcon } from '@/types'
import type { DialogState, ErrorTree, OverlayContextType } from '@/types/overlay'

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({})

  const showError = useCallback((errorTree: ErrorTree) => {
    setDialog({
      type: 'error',
      errorTree,
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

  const showMain = useCallback((
    children: React.ReactNode,
    buttonGroup: ButtonGroupState,
    icon?: HeroIcon,
    title?: string
  ) => {
    setDialog({
      type: 'main',
      title,
      onClose: () => setDialog({}),
      children,
      buttonGroup,
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
