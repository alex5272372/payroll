'use client'
import { DialogType } from '@/types'
import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

export interface DialogState {
  type?: DialogType
  header?: string
  message?: string
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
  closeDialog: () => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({})

  const showError = useCallback((header?: string, message?: string) => {
    setDialog({ type: 'error', header, message, onOk: () => setDialog({}) })
  }, [])

  const showOk = useCallback((header?: string, message?: string) => {
    setDialog({ type: 'ok', header, message, onOk: () => setDialog({}) })
  }, [])

  const showOkCancel = useCallback((onOk: () => void, header?: string, message?: string ) => {
    setDialog({ type: 'okCancel', onOk, header, message, onCancel: () => setDialog({}) })
  }, [])

  const closeDialog = useCallback(() => {
    setDialog({})
  }, [])

  return (
    <OverlayContext.Provider value={{ dialog, showError, showOk, showOkCancel, closeDialog }}>
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
