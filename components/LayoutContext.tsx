'use client'
import { createContext, useContext, useEffect, useReducer, useState, ReactNode, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { HeroIcon } from '@/types'
import type { DialogState, ErrorTree, LayoutContextType } from '@/types/layout'
import { MenuItemPath, TabActionType } from '@/types/enums/navigation'
import type { RoleTabState, TabAction, TabItem, TabState } from '@/types/navigation'
import { UserRole } from '@/types/enums/roleMatrix'
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import ErrorDialog from '@/components/ModalDialog/ErrorDialog'
import OkDialog from '@/components/ModalDialog/OkDialog'
import OkCancelDialog from '@/components/ModalDialog/OkCancelDialog'

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

const roleTabReducer = (state: RoleTabState, action: TabAction): RoleTabState => {
  const storedState = localStorage.getItem('roleTabState')
  const parsedState: RoleTabState = storedState ? JSON.parse(storedState) : {}
  const newState: RoleTabState = { ...state, ...parsedState }

  switch (action.type) {
    case TabActionType.INIT_TAB: {
      if (newState.activeRole && newState[newState.activeRole]) {
        const newTabState = { ...newState[newState.activeRole] as TabState }
        newState[newState.activeRole] = newTabState

        if (action.pathname === MenuItemPath.HOME) {
          newTabState.activeTab = undefined

        } else {
          const activeTab = newTabState.tabs.findIndex((tab: TabItem) => tab.menuPath === action.pathname)

          if (activeTab === -1) {
            const newTabs = [...newTabState.tabs]
            newTabState.tabs = newTabs

            newTabs.push({ menuPath: action.pathname })
            newTabState.activeTab = newTabs.length - 1

          } else {
            newTabState.activeTab = activeTab
          }
        }
      }
      if (newState.redirectTo) {
        delete newState.redirectTo
      }
      break
    }

    case TabActionType.CLOSE_TAB: {
      if (newState.activeRole && newState[newState.activeRole]) {
        const newTabState = { ...newState[newState.activeRole] as TabState }
        newState[newState.activeRole] = newTabState

        const newTabs = newTabState.tabs.filter((_, i: number) => i !== action.index)
        newTabState.tabs = newTabs

        const activeTab: number | undefined =
          newTabState.activeTab === undefined || newTabs.length === 0 ? undefined
            : newTabState.activeTab > 0
              || newTabState.activeTab > action.index
              || newTabState.activeTab === newTabs.length
              ? newTabState.activeTab - 1
              : newTabState.activeTab
        newTabState.activeTab = activeTab
      }
      break
    }

    case TabActionType.SET_ACTIVE_ROLE: {
      if (newState.activeRole !== action.role) {
        newState.activeRole = action.role

        if (!state[action.role]) {
          newState[action.role] = { tabs: [] }
        }

        if (state[action.role]?.activeTab !== undefined) {
          newState.redirectTo = state[action.role]?.tabs?.[state[action.role]?.activeTab ?? 0]?.menuPath
        }
      }
      break
    }

    default:
      break
  }

  localStorage.setItem('roleTabState', JSON.stringify(newState))
  return newState
}

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const [dialog, setDialog] = useState<DialogState>({ isOpen: false })
  const [roleTabState, dispatch] = useReducer(roleTabReducer, {})
  const pathname = usePathname()
  const router = useRouter()

  const tabState = roleTabState.activeRole ? roleTabState[roleTabState.activeRole] : undefined

  useEffect(() => {
    if (session === undefined) return
    let role: UserRole | undefined

    if (session?.roles === undefined) {
      role = UserRole.UNAUTHORIZED
    } else if (session.roles.findIndex(role => role === UserRole.ADMINISTRATOR) !== -1) {
      role = UserRole.ADMINISTRATOR
    } else if (session.roles.findIndex(role => role === UserRole.MODERATOR) !== -1) {
      role = UserRole.MODERATOR
    } else if (session.roles.findIndex(role => role === UserRole.USER) !== -1) {
      role = UserRole.USER
    } else {
      role = UserRole.UNAUTHORIZED
    }

    dispatch({ type: TabActionType.SET_ACTIVE_ROLE, role })
  }, [session])

  useEffect(() => {
    if (roleTabState.redirectTo) {
      router.push(roleTabState.redirectTo)
    }
  }, [roleTabState.redirectTo, router])

  useEffect(() => {
    dispatch({ type: TabActionType.INIT_TAB, pathname: pathname as MenuItemPath })
  }, [dispatch, pathname])

  const closeTab = useCallback((index: number) => {
    if (!tabState) return
    const nextTabItem: TabItem | undefined = tabState.tabs[index + 1]
      || tabState.tabs[index - 1] || undefined

    dispatch({ type: TabActionType.CLOSE_TAB, index })
    router.push(nextTabItem === null ? MenuItemPath.HOME : nextTabItem.menuPath)
  }, [router, tabState])

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
    if (dialog.closeTab && tabState?.activeTab !== undefined) {
      closeTab(tabState.activeTab)
    }
    setDialog({ isOpen: false })
  }, [closeTab, dialog.closeTab, tabState])

  return (
    <LayoutContext.Provider
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
    </LayoutContext.Provider>
  )
}

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
