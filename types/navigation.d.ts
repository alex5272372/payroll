import type { HeroIcon } from '@/types'
import { MenuItemPath, MenuSection } from '@/types/enums/navigation'

export type MenuItem = {
  path: MenuItemPath;
  section: MenuSection;
  name: string;
  icon: HeroIcon;
  parent?: MenuItemPath;
}
