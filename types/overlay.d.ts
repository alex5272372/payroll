import type { ButtonGroupState, HeroIcon } from '@/types'
import type { $ZodErrorTree } from 'zod/v4/core'

export type DialogType = 'error' | 'ok' | 'okCancel' | 'main' | 'zod'

export interface DialogState {
  type?: DialogType
  title?: string
  header?: string
  message?: string
  zodError?: $ZodErrorTree<object>
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
    buttonGroup: ButtonGroupState,
    icon?: HeroIcon,
    title?: string
  ) => void
  showZod: (
    zodError: $ZodErrorTree<object>
  ) => void
  closeDialog: () => void
}
