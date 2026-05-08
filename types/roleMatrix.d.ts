import { MenuItemPath } from '@/types/enums/navigation'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'

export type Permission = {
  [CRUD.READ]: boolean,
  [CRUD.CREATE]?: boolean,
  [CRUD.UPDATE]?: boolean,
  [CRUD.DELETE]?: boolean,
}

type RolePermission = Record<UserRole, Permission>
export type RoleMatrix = Record<MenuItemPath, RolePermission>
