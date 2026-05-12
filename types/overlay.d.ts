import type { ButtonGroupState, HeroIcon } from '@/types'
import type { DialogType } from '@/types/enums/overlay'

export type ErrorTree = {
  errors: string[]
  properties?: {
    [K in keyof Record<string, ErrorTree>]?: ErrorTree
  }
}

export interface DialogState {
  type?: DialogType
  title?: string
  header?: string
  message?: string
  errorTree?: ErrorTree
  children?: React.ReactNode
  buttonGroup?: ButtonGroupState
  icon?: HeroIcon
  onClose?: () => void
  onOk?: () => void
  onCancel?: () => void
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
  showMain: (
    children: React.ReactNode,
    buttonGroup: ButtonGroupState,
    icon?: HeroIcon,
    title?: string
  ) => void
  closeDialog: () => void
}
