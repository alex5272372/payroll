import { cacheLife } from 'next/cache'
import { getActiveSnapshotDb, getNodeDetailsDb, getSnapshotNodesDb } from '@/app/onec/repository'

export const getConfiguration = async () => {
  'use cache'
  cacheLife('minutes')

  if (!process.env.ONEC_DATABASE_URL) return null

  const snapshot = await getActiveSnapshotDb()
  if (!snapshot) return null

  return { snapshot, nodes: await getSnapshotNodesDb(snapshot.id) }
}

export const getNodeDetails = async (snapshotId: string, nodeId: string) => {
  'use cache'
  cacheLife('minutes')

  return getNodeDetailsDb(snapshotId, nodeId)
}
