'use client'
import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import type { ButtonGroupState, HeroIcon } from '@/types'
import type { DialogState, OverlayContextType } from '@/types/overlay'
import type { $ZodErrorTree } from 'zod/v4/core'

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

  const showZod = useCallback((zodError: $ZodErrorTree<object>) => {
    setDialog({
      type: 'zod',
      zodError,
      onClose: () => setDialog({}),
      onOk: () => setDialog({})
    })
  }, [])

  const closeDialog = useCallback(() => {
    setDialog({})
  }, [])

  return (
    <OverlayContext.Provider value={{ dialog, showError, showOk, showOkCancel, showMain, showZod, closeDialog }}>
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
