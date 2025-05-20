export type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>

export type MenuItem = {
  id: MenuItemType;
  name: string;
  icon: HeroIcon;
  auth?: boolean;
  items?: MenuItem[];
}

export type Navigation = Record<MenuType, MenuItem[]>;

export type TabItem = {
  menuPath: MenuItemType[];
  objectId?: number;
}

export type TabState = {
  tabs: TabItem[];
  activeTab: number | null;
}
