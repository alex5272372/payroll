import Layout from '@/components/Layout'
import { getConfiguration, getNodeDetails } from '@/app/onec/manager'
import ConfigurationTree from '@/components/onec/ConfigurationTree'

const displayValue = (value: unknown) => {
  if (value === null) return 'null'
  if (typeof value === 'string') return value
  return JSON.stringify(value, null, 2)
}

const OnecPage = async ({ searchParams }: { searchParams: Promise<{ node?: string | string[] }> }) => {
  const { node: requestedNode } = await searchParams
  const configuration = await getConfiguration()
  const nodes = configuration?.nodes ?? []
  const selected = nodes.find(node => node.id === requestedNode) ?? nodes.find(node => node.parentId === null) ?? null
  const details = configuration && selected ? await getNodeDetails(configuration.snapshot.id, selected.id) : null

  return <Layout>
    <main className="flex min-h-[calc(100vh-128px)] flex-col bg-[#f5f6f4] text-gray-900">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white px-5 py-3">
        <div>
          <p className="text-xs font-semibold uppercase text-emerald-700">1C / Designer</p>
          <h1 className="text-xl font-semibold">{configuration?.snapshot.sourceName ?? 'Configuration'}</h1>
        </div>
        {configuration && <span className="text-xs text-gray-500">
          Active snapshot | Imported {new Date(configuration.snapshot.importedAt).toLocaleDateString('en-GB')}
        </span>}
      </header>
      {!configuration || nodes.length === 0 ? <div className="m-auto px-6 py-16 text-center">
        <h2 className="text-lg font-semibold">No configuration available</h2>
        <p className="mt-2 text-sm text-gray-600">Import a 1C snapshot into the 1C database to browse its metadata.</p>
      </div> : <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <ConfigurationTree nodes={nodes} selectedId={selected?.id ?? null} />
        <section className="min-w-0 flex-1 px-5 py-5 md:px-8" aria-label="Metadata details">
          {selected && <div className="mx-auto max-w-5xl">
            <div className="border-b border-gray-200 pb-5">
              <p className="mb-1 text-xs font-semibold uppercase text-emerald-700">{selected.type}</p>
              <h2 className="break-words text-2xl font-semibold">{selected.name}</h2>
              <p className="mt-2 break-all font-mono text-xs text-gray-500">{selected.path}</p>
            </div>
            <dl className="mt-5 divide-y divide-gray-200 border-y border-gray-200 bg-white text-sm">
              <div className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-gray-500">Type</dt><dd>{selected.type}</dd>
              </div>
              {selected.sourceObjectId && <div className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr]">
                <dt className="font-medium text-gray-500">Source ID</dt>
                <dd className="break-all font-mono text-xs">{selected.sourceObjectId}</dd>
              </div>}
              {details?.map(detail => <div
                key={detail.key}
                className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_minmax(0,1fr)]"
              >
                <dt className="break-words font-medium text-gray-500">{detail.key}</dt>
                <dd className="min-w-0">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed">
                    {displayValue(detail.value)}
                  </pre>
                </dd>
              </div>)}
            </dl>
            {details?.length === 0 && <p className="mt-4 text-sm text-gray-500">
              No additional properties for this node.
            </p>}
          </div>}
        </section>
      </div>}
    </main>
  </Layout>
}

export default OnecPage
