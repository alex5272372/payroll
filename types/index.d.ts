import type { $ZodErrorTree } from 'zod/v4/core'
import type { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { ErrorTree } from '@/types/overlay'

declare module 'next-auth' {
  interface Session {
    roles?: UserRole[]
  }
}

export type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>

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
  onClick?: MouseEventHandler<HTMLButtonElement> | ((formData: FormData) => void | Promise<void>);
}

export type ButtonGroupState = {
  buttons: ButtonState[];
  submitButton?: number;
}

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type ActionResult<T = undefined> = {
  success: boolean;
  errorTree?: ErrorTree;
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
