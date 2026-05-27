import type { HeroIcon } from '@/types'
import type { MenuItemPath, MenuItemType, MenuSection } from '@/types/enums/navigation'
import type { UserRole } from '@/types/enums/roleMatrix'
import { TabActionType } from '@/types/enums/navigation'

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
