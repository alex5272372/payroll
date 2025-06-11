export type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>

export type MenuItem = {
  path: MenuItemPath;
  name: string;
  icon: HeroIcon;
  auth?: boolean;
  items?: MenuItem[];
}

export type Navigation = Record<MenuType, MenuItem[]>;

export type TabItem = {
  menuPath: MenuItemPath[];
  objectId?: number;
}

export type TabState = {
  tabs: TabItem[];
  activeTab: number | null;
}

export type DialogButtonState = {
  Icon: HeroIcon;
  title: string;
  disabled?: boolean;
  href?: string;
  action?: (formData: FormData) => void;
  onClick?: () => void;
}

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type ActionResult<T = undefined> = {
  success: boolean;
  error?: string;
  value?: T;
}

export type TableDataColumn = {
  header: string;
  width: number;
}

export type TableData = {
  columns: TableDataColumn[];
  rows: string[][];
}