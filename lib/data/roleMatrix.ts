import { MenuItemPath } from '@/types/enums/navigation'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import type { RoleMatrix } from '@/types/roleMatrix'

const allPerms = (v: boolean) => ({
  [CRUD.READ]: v,
  [CRUD.CREATE]: v,
  [CRUD.UPDATE]: v,
  [CRUD.DELETE]: v,
})

const readOnly = (v = true) => ({ [CRUD.READ]: v })

export const roleMatrix: RoleMatrix = {
  [MenuItemPath.HOME]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(true),
  },
  [MenuItemPath.CALENDAR]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(true),
  },
  [MenuItemPath.CATALOG]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(false),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.DOCUMENT]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(false),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.REPORT]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.USER_PROFILE]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(true),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.SIGN_OUT]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.SIGN_IN]: {
    [UserRole.ADMINISTRATOR]: readOnly(false),
    [UserRole.MODERATOR]: readOnly(false),
    [UserRole.USER]: readOnly(false),
    [UserRole.UNAUTHORIZED]: readOnly(true),
  },
  [MenuItemPath.SIGN_UP]: {
    [UserRole.ADMINISTRATOR]: readOnly(false),
    [UserRole.MODERATOR]: readOnly(false),
    [UserRole.USER]: readOnly(false),
    [UserRole.UNAUTHORIZED]: readOnly(true),
  },
  [MenuItemPath.RESET_PASSWORD]: {
    [UserRole.ADMINISTRATOR]: readOnly(false),
    [UserRole.MODERATOR]: readOnly(false),
    [UserRole.USER]: readOnly(false),
    [UserRole.UNAUTHORIZED]: readOnly(true),
  },
  [MenuItemPath.COUNTRY_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(true),
  },
  [MenuItemPath.COMPANY_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.DEPARTMENT_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.EMPLOYEE_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.COUNTRIES]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: { ...allPerms(false), [CRUD.READ]: true },
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.COMPANIES]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.DEPARTMENTS]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.EMPLOYEES]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.PEOPLE]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.USERS]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: { ...allPerms(false), [CRUD.READ]: true },
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.CALENDAR_FILLING]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.CALCULATION_TEMPLATE]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.PAYROLL_CALCULATION]: {
    [UserRole.ADMINISTRATOR]: allPerms(true),
    [UserRole.MODERATOR]: allPerms(true),
    [UserRole.USER]: allPerms(false),
    [UserRole.UNAUTHORIZED]: allPerms(false),
  },
  [MenuItemPath.PAYSLIP]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(true),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
  [MenuItemPath.PAYMENT_STATEMENT]: {
    [UserRole.ADMINISTRATOR]: readOnly(true),
    [UserRole.MODERATOR]: readOnly(true),
    [UserRole.USER]: readOnly(false),
    [UserRole.UNAUTHORIZED]: readOnly(false),
  },
}
