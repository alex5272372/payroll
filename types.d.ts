export type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>

export type MenuItemIcon =
  'ArrowRightEndOnRectangleIcon'
  | 'ArrowRightStartOnRectangleIcon'
  | 'CalendarIcon'
  | 'ChartBarIcon'
  | 'DocumentIcon'
  | 'DocumentTextIcon'
  | 'HomeModernIcon'
  | 'GlobeEuropeAfricaIcon'
  | 'IdentificationIcon'
  | 'UserIcon'
  | 'UserGroupIcon'
  | 'ViewColumnsIcon'

export type MenuItem = {
  id: MenuItemType;
  name: string;
  icon: MenuItemIcon;
  auth?: boolean;
  items?: MenuItem[];
}

export type Navigation = {
  mainMenu: MenuItem[];
  userMenu: MenuItem[];
}

export type TabItem = {
  id: MenuItemType;
  parentId?: MenuItemType;
  name: string;
  icon: MenuItemIcon;
}

export type TabState = {
  tabs: TabItem[];
  activeTab: number | null;
}
