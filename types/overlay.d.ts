import type { ButtonGroupState, HeroIcon } from '@/types'

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
  onClose?: () => void
}

export interface OverlayContextType {
  dialog: DialogState
  showError: (
    errorTree: ErrorTree<Record<string, unknown>>
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
  showDialog: (
    children: React.ReactNode,
    icon?: HeroIcon,
    title?: string
  ) => void
  hideDialog: () => void
}
