import type { HeroIcon } from '@/types'
import type { MenuItemPath, MenuItemType, MenuSection } from '@/types/enums/navigation'
import { TabActionType } from '@/types/enums/navigation'

export type NavMenuItem = {
  type: MenuItemType;
  path: MenuItemPath;
  action?: () => void;
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
  activeTab: number | null;
}

export type TabAction =
  | { type: TabActionType.INIT; pathname: MenuItemPath }
  | { type: TabActionType.CLOSE; index: number }
