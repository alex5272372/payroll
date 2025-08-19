import { CRUD, UserRole } from '@/lib/data/roleMatrix'

declare module 'next-auth' {
  interface Session {
    roles?: UserRole[]
  }
}

export type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>

export type TabItem = {
  menuPath: MenuItemPath;
  objectId?: number;
}

export type TabState = {
  tabs: TabItem[];
  activeTab: number | null;
}

export type ToolbarItem = {
  name: string;
  icon: HeroIcon;
  permission: CRUD;
}

export type ButtonState = {
  Icon: HeroIcon;
  title: string;
  permission?: CRUD;
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

export type TableDataRow = {
  cells: string[];
  selected?: boolean;
}

export type TableData = {
  columns: TableDataColumn[];
  rows: TableDataRow[];
}
