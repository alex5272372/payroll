'use client'
import { createContext, useContext, useEffect, useReducer, useState, ReactNode, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { HeroIcon } from '@/types'
import type { DialogState, ErrorTree, OverlayContextType } from '@/types/overlay'
import { MenuItemPath, TabActionType } from '@/types/enums/navigation'
import type { TabAction, TabItem, TabState } from '@/types/navigation'
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import ErrorDialog from '@/components/overlay/ModalDialog/ErrorDialog'
import OkDialog from '@/components/overlay/ModalDialog/OkDialog'
import OkCancelDialog from '@/components/overlay/ModalDialog/OkCancelDialog'

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case TabActionType.INIT: {
      let newState: TabState = state
      const storedTabState = localStorage.getItem('tabState')
      if (storedTabState) newState = { ...JSON.parse(storedTabState), activeTab: null }
      if (action.pathname === MenuItemPath.HOME) return newState

      let activeTab = newState.tabs.findIndex((tab: TabItem) => tab.menuPath === action.pathname)
      if (activeTab === -1) {
        newState.tabs.push({ menuPath: action.pathname })
        activeTab = newState.tabs.length - 1
      }
      newState.activeTab = activeTab
      localStorage.setItem('tabState', JSON.stringify(newState))
      return newState
    }
    case TabActionType.CLOSE: {
      const tabs: TabItem[] = state.tabs.filter((_, i: number) => i !== action.index)
      const activeTab: number | null =
        state.activeTab === null || tabs.length === 0 ? null
          : state.activeTab > 0 || state.activeTab > action.index || state.activeTab === tabs.length
            ? state.activeTab - 1 : state.activeTab
      const newState: TabState = { tabs, activeTab }
      localStorage.setItem('tabState', JSON.stringify(newState))
      return newState
    }
    default:
      return state
  }
}

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogState>({ isOpen: false })
  const [tabState, dispatch] = useReducer(tabReducer, { tabs: [], activeTab: null })
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    dispatch({ type: TabActionType.INIT, pathname: pathname as MenuItemPath })
  }, [dispatch, pathname])

  const closeTab = useCallback((index: number) => {
    const nextTabItem: TabItem | null = tabState.tabs[index + 1]
      || tabState.tabs[index - 1] || null

    dispatch({ type: TabActionType.CLOSE, index })
    router.push(nextTabItem === null ? MenuItemPath.HOME : nextTabItem.menuPath)
  }, [dispatch, router, tabState.tabs])

  const showError = useCallback((errorTree: ErrorTree, closeTab?: boolean) => {
    setDialog({
      isOpen: true,
      icon: ExclamationTriangleIcon,
      title: 'Error',
      children: <ErrorDialog errorTree={errorTree} />,
      closeTab
    })
  }, [])

  const showOk = useCallback((header?: string, message?: string, closeTab?: boolean) => {
    setDialog({
      isOpen: true,
      icon: InformationCircleIcon,
      title: 'Information',
      children: <OkDialog header={header} message={message} />,
      closeTab
    })
  }, [])

  const showOkCancel = useCallback((onOk: () => void, header?: string, message?: string, closeTab?: boolean) => {
    setDialog({
      isOpen: true,
      icon: InformationCircleIcon,
      title: 'Confirmation',
      children: <OkCancelDialog header={header} message={message} onOk={onOk} />,
      closeTab
    })
  }, [])

  const showDialog = useCallback((
    children: ReactNode,
    icon?: HeroIcon,
    title?: string,
    closeTab?: boolean
  ) => {
    setDialog({
      isOpen: true,
      icon,
      title,
      children,
      closeTab
    })
  }, [])

  const hideDialog = useCallback(() => {
    if (dialog.closeTab && tabState.activeTab !== null) {
      closeTab(tabState.activeTab)
    }
    setDialog({ isOpen: false })
  }, [closeTab, dialog.closeTab, tabState.activeTab])

  return (
    <OverlayContext.Provider
      value={{
        dialog,
        tabState,
        closeTab,
        showError,
        showOk,
        showOkCancel,
        showDialog,
        hideDialog,
      }}
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
