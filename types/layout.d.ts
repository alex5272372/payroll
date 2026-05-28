import type { HeroIcon } from '@/types'
import type { TabState } from '@/types/navigation'
import type { MenuItemPath, MenuItemType, MenuSection } from '@/types/enums/layout'
import type { UserRole } from '@/types/enums/roleMatrix'
import { TabActionType } from '@/types/enums/layout'

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

export interface LayoutContextType {
  dialog: DialogState
  tabState?: TabState
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

export type NavMenuItem = {
  type: MenuItemType;
  path: MenuItemPath;
  component?: React.ComponentType<object>;
  section: MenuSection;
  name: string;
  icon: HeroIcon;
  parent?: MenuItemPath;
}

export type TabItem = {
  menuPath: MenuItemPath;
  objectId?: number;
}

export type TabState = {
  tabs: TabItem[];
  activeTab?: number;
}

export type RoleTabState = Partial<Record<UserRole, TabState>> & {
  activeRole?: UserRole;
  redirectTo?: string;
}

export type TabAction =
  | { type: TabActionType.INIT_TAB; pathname: MenuItemPath }
  | { type: TabActionType.CLOSE_TAB; index: number }
  | { type: TabActionType.SET_ACTIVE_ROLE; role: UserRole }
