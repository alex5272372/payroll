import { ErrorTree } from '@/types/overlay'
import { $ZodErrorTree } from 'zod/v4/core'

export const MapErrorTree = (zodError: $ZodErrorTree<Record<string, unknown>>): ErrorTree => {
  const mapNode = (node: $ZodErrorTree<Record<string, unknown>>): any => {
    const errorTree: any = {
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
