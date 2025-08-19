import { MenuItemPath } from '@/lib/data/navigation'

export enum CRUD {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum UserRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export type AllPermissions = { [K in keyof typeof CRUD]: boolean }
type ReadOnlyPermission = { [K in 'READ']: boolean }
type Permission = AllPermissions | ReadOnlyPermission
type RolePermission = Record<UserRole, Permission>
export type RoleMatrix = Record<MenuItemPath, RolePermission>

export const roleMatrix: RoleMatrix = {
  [MenuItemPath.CALENDAR]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: true,
    },
  },
  [MenuItemPath.CATALOG]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.DOCUMENT]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.REPORT]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.USER_PROFILE]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.SIGN_OUT]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.SIGN_IN]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: false,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: false,
    },
    [UserRole.USER]: {
      [CRUD.READ]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: true,
    },
  },
  [MenuItemPath.SIGN_UP]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: false,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: false,
    },
    [UserRole.USER]: {
      [CRUD.READ]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: true,
    },
  },
  [MenuItemPath.RESET_PASSWORD]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: false,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: false,
    },
    [UserRole.USER]: {
      [CRUD.READ]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: true,
    },
  },
  [MenuItemPath.COUNTRY_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: true,
    },
  },
  [MenuItemPath.COMPANY_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.DEPARTMENT_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.EMPLOYEE_CALENDAR]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.COUNTRIES]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.COMPANIES]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.DEPARTMENTS]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.EMPLOYEES]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.PEOPLE]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.USERS]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.CALENDAR_FILLING]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.CALCULATION_TEMPLATE]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.PAYROLL_CALCULATION]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.CREATE]: true,
      [CRUD.READ]: true,
      [CRUD.UPDATE]: true,
      [CRUD.DELETE]: true,
    },
    [UserRole.USER]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.CREATE]: false,
      [CRUD.READ]: false,
      [CRUD.UPDATE]: false,
      [CRUD.DELETE]: false,
    },
  },
  [MenuItemPath.PAYSLIP]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: true,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
  [MenuItemPath.PAYMENT_STATEMENT]: {
    [UserRole.ADMINISTRATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.MODERATOR]: {
      [CRUD.READ]: true,
    },
    [UserRole.USER]: {
      [CRUD.READ]: false,
    },
    [UserRole.UNAUTHORIZED]: {
      [CRUD.READ]: false,
    },
  },
}
