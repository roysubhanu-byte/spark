import { useState, useMemo } from 'react'
import { ALL_IDEAS_UNFILTERED as IDEAS } from '../data'
import type { Idea, Deck } from '../types'

type SortKey = 'name' | 'deck' | 'effort' | 'capital'
type Filter = { deck: Deck | 'all'; search: string; status: 'all' | 'approved' | 'rejected' | 'pending' }

export default function Admin() {
  const [filter, setFilter] = useState<Filter>({ deck: 'all', search: '', status: 'all' })
  const [sort, setSort] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected'>>(() => {
    try { return JSON.parse(localStorage.getItem('spark-admin-decisions') || '{}') } catch { return {} }
  })
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = [...IDEAS]

    if (filter.deck !== 'all') list = list.filter(i => i.deck === filter.deck)
    if (filter.search) {
      const q = filter.search.toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.hook.toLowerCase().includes(q))
    }
    if (filter.status !== 'all') {
      list = list.filter(i => {
        const d = decisions[i.id]
        if (filter.status === 'pending') return !d
        return d === filter.status
      })
    }

    list.sort((a, b) => {
      let cmp = 0
      if (sort === 'name') cmp = a.name.localeCompare(b.name)
      else if (sort === 'deck') cmp = a.deck.localeCompare(b.deck)
      else if (sort === 'effort') cmp = a.effort - b.effort
      else if (sort === 'capital') cmp = (a.capital_usd?.low || 0) - (b.capital_usd?.low || 0)
      return sortAsc ? cmp : -cmp
    })

    return list
  }, [filter, sort, sortAsc, decisions])

  const stats = useMemo(() => {
    const total = IDEAS.length
    const approved = Object.values(decisions).filter(d => d === 'approved').length
    const rejected = Object.values(decisions).filter(d => d === 'rejected').length
    const pending = total - approved - rejected
    const physical = IDEAS.filter(i => i.deck === 'physical').length
    const saas = IDEAS.filter(i => i.deck === 'saas').length
    return { total, approved, rejected, pending, physical, saas }
  }, [decisions])

  function decide(id: string, status: 'approved' | 'rejected') {
    const next = { ...decisions, [id]: status }
    setDecisions(next)
    localStorage.setItem('spark-admin-decisions', JSON.stringify(next))
  }

  function undecide(id: string) {
    const next = { ...decisions }
    delete next[id]
    setDecisions(next)
    localStorage.setItem('spark-admin-decisions', JSON.stringify(next))
  }

  function toggleSort(key: SortKey) {
    if (sort === key) setSortAsc(!sortAsc)
    else { setSort(key); setSortAsc(true) }
  }

  function exportApproved() {
    const approved = IDEAS.filter(i => decisions[i.id] === 'approved')
    const blob = new Blob([JSON.stringify(approved, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `spark-approved-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const SortIcon = ({ k }: { k: SortKey }) => (
    sort === k ? <span className="ml-1">{sortAsc ? '\u2191' : '\u2193'}</span> : null
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Spark Admin</h1>
          <p className="text-gray-400 text-sm">Review and approve ideas for the app</p>
        </div>
        <a href="/" className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded border border-gray-700">
          Back to App
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <StatCard label="Total" value={stats.total} color="text-white" />
        <StatCard label="Physical" value={stats.physical} color="text-amber-400" />
        <StatCard label="SaaS" value={stats.saas} color="text-blue-400" />
        <StatCard label="Approved" value={stats.approved} color="text-green-400" />
        <StatCard label="Rejected" value={stats.rejected} color="text-red-400" />
        <StatCard label="Pending" value={stats.pending} color="text-yellow-400" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search ideas..."
          value={filter.search}
          onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm flex-1 min-w-[200px]"
        />
        <select
          value={filter.deck}
          onChange={e => setFilter(f => ({ ...f, deck: e.target.value as Filter['deck'] }))}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
        >
          <option value="all">All Decks</option>
          <option value="physical">Physical</option>
          <option value="saas">SaaS</option>
        </select>
        <select
          value={filter.status}
          onChange={e => setFilter(f => ({ ...f, status: e.target.value as Filter['status'] }))}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          onClick={exportApproved}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
        >
          Export Approved ({stats.approved})
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">Showing {filtered.length} of {stats.total} ideas</p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="py-2 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort('name')}>
                Name<SortIcon k="name" />
              </th>
              <th className="py-2 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort('deck')}>
                Deck<SortIcon k="deck" />
              </th>
              <th className="py-2 px-3">Hook</th>
              <th className="py-2 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort('effort')}>
                Effort<SortIcon k="effort" />
              </th>
              <th className="py-2 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort('capital')}>
                Capital<SortIcon k="capital" />
              </th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(idea => (
              <IdeaRow
                key={idea.id}
                idea={idea}
                status={decisions[idea.id] || 'pending'}
                expanded={expanded === idea.id}
                onToggle={() => setExpanded(expanded === idea.id ? null : idea.id)}
                onApprove={() => decide(idea.id, 'approved')}
                onReject={() => decide(idea.id, 'rejected')}
                onUndo={() => undecide(idea.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

function IdeaRow({ idea, status, expanded, onToggle, onApprove, onReject, onUndo }: {
  idea: Idea
  status: 'approved' | 'rejected' | 'pending'
  expanded: boolean
  onToggle: () => void
  onApprove: () => void
  onReject: () => void
  onUndo: () => void
}) {
  const statusColors = {
    approved: 'text-green-400 bg-green-400/10',
    rejected: 'text-red-400 bg-red-400/10',
    pending: 'text-yellow-400 bg-yellow-400/10',
  }

  const effortLabel = ['', 'Low', 'Medium', 'High'][idea.effort] || '?'

  return (
    <>
      <tr
        className="border-b border-gray-800/50 hover:bg-gray-900/50 cursor-pointer"
        onClick={onToggle}
      >
        <td className="py-2 px-3 font-medium">{idea.name}</td>
        <td className="py-2 px-3">
          <span className={`text-xs px-2 py-0.5 rounded ${idea.deck === 'physical' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {idea.deck}
          </span>
        </td>
        <td className="py-2 px-3 text-gray-400 max-w-[300px] truncate">{idea.hook}</td>
        <td className="py-2 px-3">{effortLabel}</td>
        <td className="py-2 px-3">{idea.capital}</td>
        <td className="py-2 px-3">
          <span className={`text-xs px-2 py-0.5 rounded ${statusColors[status]}`}>{status}</span>
        </td>
        <td className="py-2 px-3" onClick={e => e.stopPropagation()}>
          <div className="flex gap-1">
            {status !== 'approved' && (
              <button onClick={onApprove} className="text-green-400 hover:text-green-300 text-xs px-2 py-1 rounded border border-green-800">
                Approve
              </button>
            )}
            {status !== 'rejected' && (
              <button onClick={onReject} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded border border-red-800">
                Reject
              </button>
            )}
            {status !== 'pending' && (
              <button onClick={onUndo} className="text-gray-400 hover:text-gray-300 text-xs px-2 py-1 rounded border border-gray-700">
                Undo
              </button>
            )}
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-900/30">
          <td colSpan={7} className="px-3 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-amber-400 mb-1">Strategy</h4>
                <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: idea.breakdown.strategy.body }} />
                <p className="text-xs text-gray-500 mt-1">Action: {idea.breakdown.strategy.action}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">Profit</h4>
                <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: idea.breakdown.profit.body }} />
                {idea.breakdown.profit.stats && (
                  <div className="flex gap-3 mt-1">
                    {idea.breakdown.profit.stats.map((s, i) => (
                      <span key={i} className="text-xs bg-gray-800 px-2 py-0.5 rounded">{s.label}: {s.value}</span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-1">Pricing</h4>
                <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: idea.breakdown.pricing.body }} />
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-1">Value Prop</h4>
                <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: idea.breakdown.value.body }} />
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-1">Distributors</h4>
                <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: idea.breakdown.distributors.body }} />
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-1">Selling Price</h4>
                <div className="text-gray-300" dangerouslySetInnerHTML={{ __html: idea.breakdown.sellingPrice.body }} />
                {idea.breakdown.sellingPrice.stats && (
                  <div className="flex gap-3 mt-1">
                    {idea.breakdown.sellingPrice.stats.map((s, i) => (
                      <span key={i} className="text-xs bg-gray-800 px-2 py-0.5 rounded">{s.label}: {s.value}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="text-xs text-gray-500">Interests: {idea.interests.join(', ')}</span>
              <span className="text-xs text-gray-500">| Badges: {idea.badges.join(', ') || 'none'}</span>
              <span className="text-xs text-gray-500">| Markets: {idea.markets.join(', ')}</span>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
