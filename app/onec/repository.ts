import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/onec-client'

const getPrisma = () => {
  if (!process.env.ONEC_DATABASE_URL) throw new Error('ONEC_DATABASE_URL is required')
  const globalForPrisma = globalThis as typeof globalThis & { onecPrisma?: PrismaClient }
  if (!globalForPrisma.onecPrisma) {
    globalForPrisma.onecPrisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.ONEC_DATABASE_URL }),
    })
  }
  return globalForPrisma.onecPrisma
}

export const getActiveSnapshotDb = async () => {
  const snapshot = await getPrisma().onecSourceSnapshot.findFirst({
    where: { isActive: true },
    orderBy: { importedAt: 'desc' },
    select: { id: true, sourceName: true, importedAt: true },
  })
  return snapshot && {
    id: snapshot.id.toString(),
    sourceName: snapshot.sourceName,
    importedAt: snapshot.importedAt.toISOString(),
  }
}

export const getSnapshotNodesDb = async (snapshotId: string) => {
  const nodes = await getPrisma().onecMetadataNode.findMany({
    where: { snapshotId: BigInt(snapshotId), isDeleted: false },
    orderBy: [{ orderIndex: 'asc' }, { nodeName: 'asc' }],
    select: { id: true, parentId: true, nodeName: true, nodeType: true, fullPath: true, sourceObjectId: true },
  })
  return nodes.map(node => ({
    id: node.id.toString(),
    parentId: node.parentId?.toString() ?? null,
    name: node.nodeName,
    type: node.nodeType,
    path: node.fullPath,
    sourceObjectId: node.sourceObjectId,
  }))
}

export const getNodeDetailsDb = async (snapshotId: string, nodeId: string) => {
  const node = await getPrisma().onecMetadataNode.findFirst({
    where: { id: BigInt(nodeId), snapshotId: BigInt(snapshotId), isDeleted: false },
    select: {
      objectDetails: { orderBy: { detailKey: 'asc' }, select: { detailKey: true, detailValueJson: true }},
    },
  })
  return node?.objectDetails.map(detail => ({
    key: detail.detailKey,
    value: detail.detailValueJson,
  })) ?? null
}
