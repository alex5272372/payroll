/**
 * 1C:Enterprise metadata types for seed and runtime XML parsing
 */

export type MetadataBucket = {
  dirName: string
  nodeType: string
}

export type ParsedObject = {
  name: string
  fullPath: string
  nodeType: string
  sourceObjectId: string | null
  details: Array<{ key: string; value: unknown }>
  outgoingRefs: Array<{ relationType: string; targetPath: string; payload?: unknown }>
}

export type SkippedObject = {
  fileName: string
  reason: string
}
