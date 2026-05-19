'use client'
import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import type { HeroIcon } from '@/types'
import type { DialogState, ErrorTree, OverlayContextType } from '@/types/overlay'
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import ErrorDialog from '@/components/overlay/ModalDialog/ErrorDialog'
import OkDialog from '@/components/overlay/ModalDialog/OkDialog'
import OkCancelDialog from '@/components/overlay/ModalDialog/OkCancelDialog'

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({ isOpen: false })

  const showError = useCallback((errorTree: ErrorTree) => {
    setDialog({
      isOpen: true,
      icon: ExclamationTriangleIcon,
      title: 'Error',
      children: <ErrorDialog errorTree={errorTree} onOk={() => setDialog({ isOpen: false })} />
    })
  }, [])

  const showOk = useCallback((header?: string, message?: string) => {
    setDialog({
      isOpen: true,
      icon: InformationCircleIcon,
      title: 'Information',
      children: <OkDialog header={header} message={message} onOk={() => setDialog({ isOpen: false })} />
    })
  }, [])

  const showOkCancel = useCallback((onOk: () => void, header?: string, message?: string ) => {
    setDialog({
      isOpen: true,
      icon: InformationCircleIcon,
      title: 'Confirmation',
      children: <OkCancelDialog
        header={header} message={message} onOk={onOk} onCancel={() => setDialog({ isOpen: false })} />
    })
  }, [])

  const showDialog = useCallback((
    children: ReactNode,
    icon?: HeroIcon,
    title?: string
  ) => {
    setDialog({
      isOpen: true,
      icon,
      title,
      children
    })
  }, [])

  const hideDialog = useCallback(() => {
    setDialog({ isOpen: false })
  }, [])

  return (
    <OverlayContext.Provider
      value={{ dialog, showError, showOk, showOkCancel, showDialog, hideDialog }}
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
