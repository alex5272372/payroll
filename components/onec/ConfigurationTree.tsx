'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDownIcon, ChevronRightIcon, CircleStackIcon, FolderIcon, MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import type { getConfiguration } from '@/app/onec/manager'

type Node = NonNullable<Awaited<ReturnType<typeof getConfiguration>>>['nodes'][number]

const ConfigurationTree = ({ nodes, selectedId }: { nodes: Node[]; selectedId: string | null }) => {
  const byId = new Map(nodes.map(node => [node.id, node]))
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const open = new Set(nodes.filter(node => node.parentId === null).map(node => node.id))
    let parentId = selectedId ? byId.get(selectedId)?.parentId : null
    while (parentId) {
      open.add(parentId)
      parentId = byId.get(parentId)?.parentId
    }
    return open
  })
  const [filter, setFilter] = useState('')
  const children = new Map<string | null, Node[]>()
  for (const node of nodes) {
    const siblings = children.get(node.parentId) ?? []
    siblings.push(node)
    children.set(node.parentId, siblings)
  }

  const visible = new Set<string>()
  if (filter.trim()) {
    const query = filter.trim().toLocaleLowerCase()
    for (const node of nodes) {
      if (!`${node.name} ${node.type} ${node.path}`.toLocaleLowerCase().includes(query)) continue
      let current: Node | undefined = node
      while (current && !visible.has(current.id)) {
        visible.add(current.id)
        current = current.parentId ? byId.get(current.parentId) : undefined
      }
    }
  }

  const toggle = (id: string) => {
    setExpanded(previous => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const renderNodes = (parentId: string | null, depth: number): React.ReactNode =>
    (children.get(parentId) ?? []).filter(node => !filter.trim() || visible.has(node.id)).map(node => {
      const hasChildren = children.has(node.id)
      const open = filter.trim() ? true : expanded.has(node.id)
      return <li key={node.id} role="treeitem" aria-selected={selectedId === node.id}>
        <div
          className={`group flex min-w-0 items-center border-l-2 text-sm ${selectedId === node.id
            ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
            : 'border-transparent text-gray-700 hover:bg-gray-100'}`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {hasChildren ? <button
            type="button"
            onClick={() => toggle(node.id)}
            aria-label={`${open ? 'Collapse' : 'Expand'} ${node.name}`}
            aria-expanded={open}
            className="flex h-8 w-6 shrink-0 items-center justify-center rounded hover:bg-gray-200"
          >
            {open ? <ChevronDownIcon className="size-4" /> : <ChevronRightIcon className="size-4" />}
          </button> : <span className="w-6 shrink-0" />}
          <Link
            href={`/onec?node=${node.id}`}
            scroll={false}
            prefetch={false}
            aria-current={selectedId === node.id ? 'page' : undefined}
            className="flex min-w-0 flex-1 items-center gap-2 py-1.5 pr-2"
            title={node.path}
          >
            {hasChildren
              ? <FolderIcon className="size-4 shrink-0 text-amber-600" />
              : <CircleStackIcon className="size-4 shrink-0 text-emerald-700" />}
            <span className="truncate">{node.name}</span>
          </Link>
        </div>
        {hasChildren && open && <ul role="group">{renderNodes(node.id, depth + 1)}</ul>}
      </li>
    })

  return <aside
    className={`flex min-h-64 flex-col border-b border-gray-200 bg-white
      lg:min-h-0 lg:w-[340px] lg:shrink-0 lg:border-r lg:border-b-0 xl:w-[390px]`}
    aria-label="Configuration tree"
  >
    <div className="border-b border-gray-200 px-4 py-3">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase text-gray-500">
        <span>Configuration</span><span>{nodes.length} objects</span>
      </div>
      <label className={`flex items-center gap-2 rounded border border-gray-300 bg-gray-50 px-2
        text-gray-500 focus-within:border-emerald-600`}>
        <MagnifyingGlassIcon className="size-4 shrink-0" />
        <input
          value={filter}
          onChange={event => setFilter(event.target.value)}
          type="search"
          placeholder="Find metadata"
          aria-label="Find metadata"
          className="h-9 min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none"
        />
      </label>
    </div>
    <div className="max-h-72 overflow-auto py-2 lg:max-h-none lg:flex-1">
      <ul role="tree" aria-label="Metadata objects">{renderNodes(null, 0)}</ul>
      {filter && visible.size === 0 && <p className="px-4 py-6 text-sm text-gray-500">No matching objects.</p>}
    </div>
  </aside>
}

export default ConfigurationTree
