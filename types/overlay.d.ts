import type { ButtonGroupState, HeroIcon } from '@/types'
import type { TabState } from '@/types/navigation'

export type ErrorTree = {
  errors: string[]
  properties?: {
    [K in keyof Record<string, ErrorTree>]?: ErrorTree
  }
}

export interface DialogState {
  isOpen: boolean
  icon?: HeroIcon
  title?: string
  children?: React.ReactNode
  closeTab?: boolean
  onClose?: () => void
}

export interface OverlayContextType {
  dialog: DialogState
  tabState: TabState
  closeTab: (index: number) => void
  showError: (
    errorTree: ErrorTree<Record<string, unknown>>,
    closeTab?: boolean
  ) => void
  showOk: (
    header?: string,
    message?: string,
    closeTab?: boolean
  ) => void
  showOkCancel: (
    onOk: () => void,
    header?: string,
    message?: string,
    closeTab?: boolean
  ) => void
  showDialog: (
    children: React.ReactNode,
    icon?: HeroIcon,
    title?: string,
    closeTab?: boolean
  ) => void
  hideDialog: () => void
}
