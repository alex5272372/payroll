import 'dotenv/config'
import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from '@prisma/onec-client'
import { XMLParser } from 'fast-xml-parser'
import { ONEC_METADATA_BUCKETS } from '@/data/onec'
import type { MetadataBucket, ParsedObject, SkippedObject } from '@/types/onec'

const metadataBuckets = ONEC_METADATA_BUCKETS

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  parseTagValue: true,
  trimValues: true,
  isArray: tagName => ['item', 'Item', 'StandardAttribute', 'Attribute'].includes(tagName),
})

const databaseUrl = process.env.ONEC_DATABASE_URL
const configPath = process.env.ONEC_CONFIG_PATH

if (!databaseUrl) throw new Error('ONEC_DATABASE_URL is required')
if (!configPath) throw new Error('ONEC_CONFIG_PATH is required')

const adapter = new PrismaPg({ connectionString: databaseUrl })
const prisma = new PrismaClient({ adapter })

const toArray = <T>(value: T | T[] | null | undefined): T[] => {
  if (value === null || value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

const toPrismaJson = (value: unknown): Prisma.InputJsonValue | Prisma.JsonNullValueInput => {
  if (value === null || value === undefined) return Prisma.JsonNull
  return value as Prisma.InputJsonValue
}

const toPrismaRelationJson = (value: unknown): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput => {
  if (value === null || value === undefined) return Prisma.JsonNull
  return value as Prisma.InputJsonValue
}

const getText = (value: unknown): string | null => {
  if (value === null || value === undefined) return null
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (typeof value === 'object') {
    const objectValue = value as Record<string, unknown>
    if (typeof objectValue.content === 'string') return objectValue.content.trim() || null
    if (typeof objectValue['#text'] === 'string') return objectValue['#text'].trim() || null
  }
  return null
}

const extractMdRefs = (value: unknown): string[] => {
  const refs = new Set<string>()

  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object') return

    if (Array.isArray(node)) {
      for (const item of node) visit(item)
      return
    }

    const record = node as Record<string, unknown>
    const typeAttr = record['@_xsi:type']
    const text = getText(record)
    if (typeAttr === 'MDObjectRef' && text) refs.add(text)

    for (const child of Object.values(record)) visit(child)
  }

  visit(value)
  return [...refs]
}

const parseReferencePath = (rawRef: string): string | null => {
  const parts = rawRef.split('.')
  if (parts.length < 2) return null

  const [rawType, ...rest] = parts
  const nodeName = rest.join('.').trim()
  if (!nodeName) return null

  const bucket = metadataBuckets.find(
    item =>
      item.nodeType === rawType ||
      item.dirName === rawType ||
      item.nodeType.toLowerCase() === rawType.toLowerCase(),
  )
  const bucketName = bucket?.dirName ?? `${rawType}s`
  return `${bucketName}/${nodeName}`
}

const buildChecksum = async (rootPath: string): Promise<string> => {
  const hash = createHash('sha256')
  const files: string[] = []

  const walk = async (dirPath: string) => {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      const fullName = path.join(dirPath, entry.name)
      if (entry.isDirectory()) {
        await walk(fullName)
      } else if (entry.isFile() && fullName.endsWith('.xml')) {
        files.push(fullName)
      }
    }
  }

  await walk(rootPath)
  files.sort((left, right) => left.localeCompare(right))

  for (const fileName of files) {
    hash.update(path.relative(rootPath, fileName))
    hash.update(await fs.readFile(fileName))
  }

  return hash.digest('hex')
}

const parseConfigurationInfo = async (rootPath: string) => {
  const configurationFile = path.join(rootPath, 'Configuration.xml')
  const xml = await fs.readFile(configurationFile, 'utf8')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const document = parser.parse(xml) as Record<string, any>
  const configuration = document.MetaDataObject?.Configuration ?? {}
  const properties = configuration.Properties ?? {}

  return {
    sourceName: getText(properties.Name) ?? path.basename(rootPath),
    configurationUuid: configuration['@_uuid'] ?? null,
    synonym: getText(toArray(properties.Synonym?.item)[0]),
    version: getText(properties.Version),
    vendor: getText(properties.Vendor),
  }
}

const parseMetadataObjectFile = async (
  rootPath: string,
  bucket: MetadataBucket,
  fileName: string,
): Promise<ParsedObject> => {
  const xml = await fs.readFile(fileName, 'utf8')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const document = parser.parse(xml) as Record<string, any>
  const metaDataObject = document.MetaDataObject ?? {}
  const objectEntry = Object.entries(metaDataObject).find(([key]) => key !== '@_version')

  if (!objectEntry) {
    throw new Error(`Cannot find metadata object root in ${fileName}`)
  }

  const [rootTag, rootValueRaw] = objectEntry
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rootValue = rootValueRaw as Record<string, any>
  const properties = rootValue.Properties ?? {}
  const name = getText(properties.Name) ?? path.basename(fileName, '.xml')
  const synonymValue = toArray(properties.Synonym?.item)
    .map(item => ({
      lang: getText((item as Record<string, unknown>).lang),
      content: getText((item as Record<string, unknown>).content),
    }))
    .filter(item => item.lang || item.content)

  const details: Array<{ key: string; value: unknown }> = [
    { key: 'rootTag', value: rootTag },
    { key: 'uuid', value: rootValue['@_uuid'] ?? null },
    { key: 'name', value: name },
    { key: 'synonym', value: synonymValue },
    { key: 'comment', value: getText(properties.Comment) },
    { key: 'xmlFile', value: path.relative(rootPath, fileName).replace(/\\/g, '/') },
  ]

  const simplePropertyNames = [
    'Hierarchical',
    'HierarchyType',
    'LevelCount',
    'FoldersOnTop',
    'CodeLength',
    'DescriptionLength',
    'CodeType',
    'DefaultPresentation',
    'DefaultRoles',
  ]

  for (const propertyName of simplePropertyNames) {
    if (properties[propertyName] !== undefined) {
      details.push({ key: propertyName, value: properties[propertyName] })
    }
  }

  const generatedTypes = toArray(rootValue.InternalInfo?.GeneratedType).map(item => ({
    name: (item as Record<string, unknown>)['@_name'] ?? null,
    category: (item as Record<string, unknown>)['@_category'] ?? null,
    typeId: getText((item as Record<string, unknown>).TypeId),
    valueId: getText((item as Record<string, unknown>).ValueId),
  }))
  if (generatedTypes.length > 0) details.push({ key: 'generatedTypes', value: generatedTypes })

  const standardAttributes = toArray(properties.StandardAttributes?.StandardAttribute).map(item => ({
    name: (item as Record<string, unknown>)['@_name'] ?? null,
  }))
  if (standardAttributes.length > 0) details.push({ key: 'standardAttributes', value: standardAttributes })

  const outgoingRefs: Array<{ relationType: string; targetPath: string; payload?: unknown }> = []
  for (const relationType of ['Owners', 'DefaultRoles']) {
    const refs = extractMdRefs(properties[relationType])
    for (const ref of refs) {
      const targetPath = parseReferencePath(ref)
      if (targetPath) {
        outgoingRefs.push({
          relationType: relationType.toLowerCase(),
          targetPath,
          payload: { rawRef: ref },
        })
      }
    }
  }

  for (const ref of extractMdRefs(rootValue)) {
    const targetPath = parseReferencePath(ref)
    if (targetPath) {
      outgoingRefs.push({
        relationType: 'references',
        targetPath,
        payload: { rawRef: ref },
      })
    }
  }

  return {
    name,
    fullPath: `${bucket.dirName}/${name}`,
    nodeType: bucket.nodeType,
    sourceObjectId: typeof rootValue['@_uuid'] === 'string' ? rootValue['@_uuid'] : null,
    details,
    outgoingRefs,
  }
}

const ensureRootNode = async (snapshotId: bigint, sourceObjectId: string | null, sourceName: string) => {
  return prisma.onecMetadataNode.create({
    data: {
      snapshotId,
      parentId: null,
      nodeType: 'Configuration',
      nodeName: sourceName,
      fullPath: sourceName,
      sourceObjectId,
      orderIndex: 0,
    },
  })
}

const seedBucket = async (
  snapshotId: bigint,
  rootNodeId: bigint,
  rootPath: string,
  bucket: MetadataBucket,
  orderIndex: number,
) => {
  const dirPath = path.join(rootPath, bucket.dirName)
  try {
    const stat = await fs.stat(dirPath)
    if (!stat.isDirectory()) {
      return {
        createdNodes: new Map<string, bigint>(),
        parsedObjects: [] as ParsedObject[],
        skippedObjects: [] as SkippedObject[],
      }
    }
  } catch {
    return {
      createdNodes: new Map<string, bigint>(),
      parsedObjects: [] as ParsedObject[],
      skippedObjects: [] as SkippedObject[],
    }
  }

  const bucketNode = await prisma.onecMetadataNode.create({
    data: {
      snapshotId,
      parentId: rootNodeId,
      nodeType: 'Collection',
      nodeName: bucket.dirName,
      fullPath: bucket.dirName,
      orderIndex,
    },
  })

  const entries = (await fs.readdir(dirPath, { withFileTypes: true }))
    .filter(entry => entry.isFile() && entry.name.endsWith('.xml'))
    .map(entry => entry.name)
    .sort((left, right) => left.localeCompare(right, 'ru'))

  const createdNodes = new Map<string, bigint>()
  const parsedObjects: ParsedObject[] = []
  const skippedObjects: SkippedObject[] = []

  for (const [index, entryName] of entries.entries()) {
    let parsedObject: ParsedObject

    try {
      parsedObject = await parseMetadataObjectFile(rootPath, bucket, path.join(dirPath, entryName))
    } catch (error) {
      skippedObjects.push({
        fileName: path.join(bucket.dirName, entryName).replace(/\\/g, '/'),
        reason: error instanceof Error ? error.message : String(error),
      })
      continue
    }

    const node = await prisma.onecMetadataNode.create({
      data: {
        snapshotId,
        parentId: bucketNode.id,
        nodeType: parsedObject.nodeType,
        nodeName: parsedObject.name,
        fullPath: parsedObject.fullPath,
        sourceObjectId: parsedObject.sourceObjectId,
        orderIndex: index,
      },
    })

    createdNodes.set(parsedObject.fullPath, node.id)
    parsedObjects.push(parsedObject)

    if (parsedObject.details.length > 0) {
      await prisma.onecMetadataObjectDetail.createMany({
        data: parsedObject.details.map(detail => ({
          nodeId: node.id,
          detailKey: detail.key,
          detailValueJson: toPrismaJson(detail.value),
        })),
      })
    }
  }

  return { createdNodes, parsedObjects, skippedObjects }
}

const main = async () => {
  const rootPath = path.resolve(configPath)
  const configInfo = await parseConfigurationInfo(rootPath)
  const checksum = await buildChecksum(rootPath)

  await prisma.$transaction(async tx => {
    await tx.onecSourceSnapshot.updateMany({
      data: { isActive: false },
    })
  })

  const existing = await prisma.onecSourceSnapshot.findUnique({
    where: {
      sourceChecksum_parserVersion: {
        sourceChecksum: checksum,
        parserVersion: 'seed-v1',
      },
    },
  })

  if (existing) {
    await prisma.onecSourceSnapshot.update({
      where: { id: existing.id },
      data: {
        isActive: true,
        sourcePath: rootPath,
        sourceName: configInfo.sourceName,
        importNote: 'Reactivated existing snapshot from ONEC_CONFIG_PATH',
      },
    })
    console.log(`Snapshot already exists and was reactivated: ${configInfo.sourceName}`)
    return
  }

  const snapshot = await prisma.onecSourceSnapshot.create({
    data: {
      sourceName: configInfo.sourceName,
      sourcePath: rootPath,
      sourceChecksum: checksum,
      parserVersion: 'seed-v1',
      isActive: true,
      importNote: 'Imported from ONEC_CONFIG_PATH by prisma/onec/seed.ts',
    },
  })

  const rootNode = await ensureRootNode(snapshot.id, configInfo.configurationUuid, configInfo.sourceName)
  await prisma.onecMetadataObjectDetail.createMany({
    data: [
      { nodeId: rootNode.id, detailKey: 'synonym', detailValueJson: toPrismaJson(configInfo.synonym) },
      { nodeId: rootNode.id, detailKey: 'vendor', detailValueJson: toPrismaJson(configInfo.vendor) },
      { nodeId: rootNode.id, detailKey: 'version', detailValueJson: toPrismaJson(configInfo.version) },
      { nodeId: rootNode.id, detailKey: 'rootPath', detailValueJson: toPrismaJson(rootPath) },
    ],
  })

  const nodeIdsByPath = new Map<string, bigint>()
  nodeIdsByPath.set(configInfo.sourceName, rootNode.id)
  const parsedObjects: ParsedObject[] = []
  const skippedObjects: SkippedObject[] = []

  for (const [index, bucket] of metadataBuckets.entries()) {
    const bucketResult = await seedBucket(snapshot.id, rootNode.id, rootPath, bucket, index)
    for (const [fullPath, nodeId] of bucketResult.createdNodes.entries()) nodeIdsByPath.set(fullPath, nodeId)
    parsedObjects.push(...bucketResult.parsedObjects)
    skippedObjects.push(...bucketResult.skippedObjects)
  }

  const relationRows: Prisma.OnecMetadataRelationCreateManyInput[] = []
  const seenRelations = new Set<string>()

  for (const parsedObject of parsedObjects) {
    const fromNodeId = nodeIdsByPath.get(parsedObject.fullPath)
    if (!fromNodeId) continue

    for (const relation of parsedObject.outgoingRefs) {
      const toNodeId = nodeIdsByPath.get(relation.targetPath)
      if (!toNodeId) continue

      const relationKey = `${fromNodeId}:${relation.relationType}:${toNodeId}`
      if (seenRelations.has(relationKey)) continue
      seenRelations.add(relationKey)

      relationRows.push({
        snapshotId: snapshot.id,
        fromNodeId,
        relationType: relation.relationType,
        toNodeId,
        relationPayload: relation.payload === undefined ? undefined : toPrismaRelationJson(relation.payload),
      })
    }
  }

  if (relationRows.length > 0) {
    await prisma.onecMetadataRelation.createMany({ data: relationRows })
  }

  if (skippedObjects.length > 0) {
    await prisma.onecMetadataObjectDetail.createMany({
      data: skippedObjects.map((item, index) => ({
        nodeId: rootNode.id,
        detailKey: `skippedFile_${String(index + 1).padStart(4, '0')}`,
        detailValueJson: toPrismaJson(item),
      })),
    })
  }

  console.log(`Imported snapshot: ${configInfo.sourceName}`)
  console.log(`Metadata nodes: ${nodeIdsByPath.size}`)
  console.log(`Relations: ${relationRows.length}`)
  console.log(`Skipped files: ${skippedObjects.length}`)
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
