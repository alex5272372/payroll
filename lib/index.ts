import { auth } from '@/lib/auth'
import { roleMatrix } from '@/data/roleMatrix'
import { MenuItemPath } from '@/types/enums/layout'
import { CRUD, UserRole } from '@/types/enums/roleMatrix'
import { ActionResult } from '@/types'
import { ErrorTree } from '@/types'
import { $ZodErrorTree } from 'zod/v4/core'

export const authorize = async (path: MenuItemPath, crud: CRUD): Promise<ActionResult<never> | null> => {
  const session = await auth()
  if (!session?.roles)
    return { success: false, errorTree: { errors: ['Unauthorized'] }}
  if (!session.roles.some((role: UserRole) => !!roleMatrix[path]?.[role]?.[crud]))
    return { success: false, errorTree: { errors: ['Forbidden'] }}
  return null
}

export const mapErrorTree = (zodError: $ZodErrorTree<Record<string, unknown>>): ErrorTree => {
  const mapNode = (node: $ZodErrorTree<Record<string, unknown>>): ErrorTree => {
    const errorTree: ErrorTree = {
      errors: node.errors,
      properties: {}
    }

    if (node.properties) {
      for (const propertyKey in node.properties) {
        const childNode = node.properties[propertyKey] as $ZodErrorTree<Record<string, unknown>>
        errorTree.properties![propertyKey] = mapNode(childNode)
      }
    }

    return errorTree
  }

  return mapNode(zodError)
}
