import { useState, useMemo, useCallback } from 'react'
import { IDEAS } from '../data'
import type { Idea } from '../types'
import triageData from '../../scripts/triage-results.json'

type Tier = 'S' | 'A' | 'B' | 'C'
type SortKey = 'name' | 'tier' | 'score' | 'sparkScore' | 'competition'

interface TriageEntry {
  id: string
  name: string
  deck: string
  capital: string
  interests: string[]
  quality_tier: Tier
  priority_score: number
  reason: string
  upgrade_priority: boolean
}

interface AdminState {
  tierOverrides: Record<string, Tier>
  recommendFlags: Record<string, boolean>
  upgradePriority: Record<string, boolean>
  notes: Record<string, string>
}

const LS_KEY = 'spark-admin-triage'

function loadState(): AdminState {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
  } catch {
    return { tierOverrides: {}, recommendFlags: {}, upgradePriority: {}, notes: {} }
  }
}

function saveState(state: AdminState) {
  localStorage.setItem(LS_KEY, JSON.stringify(state))
}

export default function AdminTriage() {
  const [state, setState] = useState<AdminState>(() => {
    const s = loadState()
    return { tierOverrides: s.tierOverrides || {}, recommendFlags: s.recommendFlags || {}, upgradePriority: s.upgradePriority || {}, notes: s.notes || {} }
  })
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<Tier | 'all'>('all')
  const [deckFilter, setDeckFilter] = useState<string>('all')
  const [upgradeFilter, setUpgradeFilter] = useState<'all' | 'yes' | 'no'>('all')
  const [sort, setSort] = useState<SortKey>('score')
  const [sortAsc, setSortAsc] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 50

  // Build merged data: triage + idea + overrides
  const allItems = useMemo(() => {
    const triageMap = new Map<string, TriageEntry>()
    for (const t of triageData as TriageEntry[]) {
      triageMap.set(t.id, t)
    }

    return IDEAS.map(idea => {
      const triage = triageMap.get(idea.id)
      const effectiveTier = state.tierOverrides[idea.id] || triage?.quality_tier || 'B'
      const isRecommended = state.recommendFlags[idea.id] ?? false
      const isUpgradePriority = state.upgradePriority[idea.id] ?? triage?.upgrade_priority ?? false
      const sparkScore = idea.validation?.sparkScore ?? 0
      const competition = idea.validation?.competition?.saturationLevel ?? 'unknown'
      const breakdownScore = triage?.priority_score ?? 0

      return {
        idea,
        triage,
        effectiveTier,
        isRecommended,
        isUpgradePriority,
        sparkScore,
        competition,
        breakdownScore,
        note: state.notes[idea.id] || '',
      }
    })
  }, [state])

  const filtered = useMemo(() => {
    let list = [...allItems]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(item =>
        item.idea.name.toLowerCase().includes(q) ||
        item.idea.hook.toLowerCase().includes(q) ||
        item.idea.interests.some(i => i.includes(q))
      )
    }
    if (tierFilter !== 'all') list = list.filter(item => item.effectiveTier === tierFilter)
    if (deckFilter !== 'all') list = list.filter(item => item.idea.deck === deckFilter)
    if (upgradeFilter !== 'all') list = list.filter(item => upgradeFilter === 'yes' ? item.isUpgradePriority : !item.isUpgradePriority)

    list.sort((a, b) => {
      let cmp = 0
      if (sort === 'name') cmp = a.idea.name.localeCompare(b.idea.name)
      else if (sort === 'tier') cmp = a.effectiveTier.localeCompare(b.effectiveTier)
      else if (sort === 'score') cmp = a.breakdownScore - b.breakdownScore
      else if (sort === 'sparkScore') cmp = a.sparkScore - b.sparkScore
      else if (sort === 'competition') cmp = a.competition.localeCompare(b.competition)
      return sortAsc ? cmp : -cmp
    })

    return list
  }, [allItems, search, tierFilter, deckFilter, upgradeFilter, sort, sortAsc])

  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  // Stats
  const stats = useMemo(() => {
    const tiers = { S: 0, A: 0, B: 0, C: 0 }
    let recommended = 0
    let upgradePri = 0
    for (const item of allItems) {
      tiers[item.effectiveTier as keyof typeof tiers]++
      if (item.isRecommended) recommended++
      if (item.isUpgradePriority) upgradePri++
    }
    return { tiers, recommended, upgradePri, total: allItems.length }
  }, [allItems])

  const updateState = useCallback((updater: (prev: AdminState) => AdminState) => {
    setState(prev => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  function setTier(id: string, tier: Tier) {
    updateState(s => ({ ...s, tierOverrides: { ...s.tierOverrides, [id]: tier } }))
  }

  function toggleRecommend(id: string) {
    updateState(s => ({ ...s, recommendFlags: { ...s.recommendFlags, [id]: !s.recommendFlags[id] } }))
  }

  function toggleUpgrade(id: string) {
    updateState(s => ({ ...s, upgradePriority: { ...s.upgradePriority, [id]: !s.upgradePriority[id] } }))
  }

  function setNote(id: string, note: string) {
    updateState(s => ({ ...s, notes: { ...s.notes, [id]: note } }))
  }

  function exportAudit() {
    const data = allItems.map(item => ({
      id: item.idea.id,
      name: item.idea.name,
      deck: item.idea.deck,
      tier: item.effectiveTier,
      sparkScore: item.sparkScore,
      competition: item.competition,
      breakdownScore: item.breakdownScore,
      recommended: item.isRecommended,
      upgradePriority: item.isUpgradePriority,
      note: item.note,
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `spark-triage-audit-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function toggleSort(key: SortKey) {
    if (sort === key) setSortAsc(!sortAsc)
    else { setSort(key); setSortAsc(key === 'name') }
  }

  const tierColors: Record<string, string> = {
    S: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    A: 'bg-green-500/20 text-green-300 border-green-500/30',
    B: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    C: 'bg-red-500/20 text-red-300 border-red-500/30',
  }

  const SortIcon = ({ k }: { k: SortKey }) => (
    sort === k ? <span className="ml-1 text-xs">{sortAsc ? '\u2191' : '\u2193'}</span> : null
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Idea Triage</h1>
          <p className="text-gray-400 text-sm">Audit and classify all 1,000 ideas before publishing</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportAudit} className="text-sm px-3 py-1.5 rounded border border-gray-700 hover:bg-gray-800">
            Export Audit
          </button>
          <a href="/admin" className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-700">
            Main Admin
          </a>
          <a href="/" className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-700">
            App
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="bg-gray-900 border border-yellow-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setTierFilter(tierFilter === 'S' ? 'all' : 'S')}>
          <div className="text-2xl font-bold text-yellow-400">{stats.tiers.S}</div>
          <div className="text-xs text-gray-500">S-tier</div>
        </div>
        <div className="bg-gray-900 border border-green-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setTierFilter(tierFilter === 'A' ? 'all' : 'A')}>
          <div className="text-2xl font-bold text-green-400">{stats.tiers.A}</div>
          <div className="text-xs text-gray-500">A-tier</div>
        </div>
        <div className="bg-gray-900 border border-blue-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setTierFilter(tierFilter === 'B' ? 'all' : 'B')}>
          <div className="text-2xl font-bold text-blue-400">{stats.tiers.B}</div>
          <div className="text-xs text-gray-500">B-tier</div>
        </div>
        <div className="bg-gray-900 border border-red-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setTierFilter(tierFilter === 'C' ? 'all' : 'C')}>
          <div className="text-2xl font-bold text-red-400">{stats.tiers.C}</div>
          <div className="text-xs text-gray-500">C-tier</div>
        </div>
        <div className="bg-gray-900 border border-emerald-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setUpgradeFilter(upgradeFilter === 'yes' ? 'all' : 'yes')}>
          <div className="text-2xl font-bold text-emerald-400">{stats.upgradePri}</div>
          <div className="text-xs text-gray-500">Upgrade</div>
        </div>
        <div className="bg-gray-900 border border-purple-900/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.recommended}</div>
          <div className="text-xs text-gray-500">Recommended</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input type="text" placeholder="Search ideas..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(0) }}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm flex-1 min-w-[200px]" />
        <select value={tierFilter} onChange={e => { setTierFilter(e.target.value as any); setPage(0) }}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm">
          <option value="all">All Tiers</option>
          <option value="S">S-tier</option>
          <option value="A">A-tier</option>
          <option value="B">B-tier</option>
          <option value="C">C-tier</option>
        </select>
        <select value={deckFilter} onChange={e => { setDeckFilter(e.target.value); setPage(0) }}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm">
          <option value="all">All Decks</option>
          <option value="physical">Physical</option>
          <option value="saas">SaaS</option>
        </select>
        <select value={upgradeFilter} onChange={e => { setUpgradeFilter(e.target.value as any); setPage(0) }}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm">
          <option value="all">All Priority</option>
          <option value="yes">Upgrade Priority</option>
          <option value="no">Not Priority</option>
        </select>
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-500">Showing {pageItems.length} of {filtered.length} ideas (page {page + 1}/{totalPages})</p>
        <div className="flex gap-2">
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
            className="text-xs px-2 py-1 rounded border border-gray-700 disabled:opacity-30">Prev</button>
          <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
            className="text-xs px-2 py-1 rounded border border-gray-700 disabled:opacity-30">Next</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-400">
              <th className="py-2 px-2 w-8">#</th>
              <th className="py-2 px-2 cursor-pointer hover:text-white" onClick={() => toggleSort('tier')}>Tier<SortIcon k="tier" /></th>
              <th className="py-2 px-2 cursor-pointer hover:text-white" onClick={() => toggleSort('name')}>Name<SortIcon k="name" /></th>
              <th className="py-2 px-2">Deck</th>
              <th className="py-2 px-2">Capital</th>
              <th className="py-2 px-2 cursor-pointer hover:text-white" onClick={() => toggleSort('sparkScore')}>Spark<SortIcon k="sparkScore" /></th>
              <th className="py-2 px-2 cursor-pointer hover:text-white" onClick={() => toggleSort('competition')}>Competition<SortIcon k="competition" /></th>
              <th className="py-2 px-2 cursor-pointer hover:text-white" onClick={() => toggleSort('score')}>Quality<SortIcon k="score" /></th>
              <th className="py-2 px-2">Recommend</th>
              <th className="py-2 px-2">Upgrade</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item, idx) => {
              const isExp = expanded === item.idea.id
              return (
                <TriageRow
                  key={item.idea.id}
                  item={item}
                  index={page * PAGE_SIZE + idx + 1}
                  isExpanded={isExp}
                  onToggle={() => setExpanded(isExp ? null : item.idea.id)}
                  onSetTier={(t) => setTier(item.idea.id, t)}
                  onToggleRecommend={() => toggleRecommend(item.idea.id)}
                  onToggleUpgrade={() => toggleUpgrade(item.idea.id)}
                  onSetNote={(n) => setNote(item.idea.id, n)}
                  tierColors={tierColors}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TriageRow({ item, index, isExpanded, onToggle, onSetTier, onToggleRecommend, onToggleUpgrade, onSetNote, tierColors }: {
  item: any
  index: number
  isExpanded: boolean
  onToggle: () => void
  onSetTier: (t: Tier) => void
  onToggleRecommend: () => void
  onToggleUpgrade: () => void
  onSetNote: (n: string) => void
  tierColors: Record<string, string>
}) {
  const idea: Idea = item.idea
  const compColors: Record<string, string> = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    'very-high': 'text-red-400',
  }

  return (
    <>
      <tr className="border-b border-gray-800/50 hover:bg-gray-900/50 cursor-pointer" onClick={onToggle}>
        <td className="py-2 px-2 text-gray-600 text-xs">{index}</td>
        <td className="py-2 px-2">
          <span className={`text-xs px-2 py-0.5 rounded border ${tierColors[item.effectiveTier] || tierColors.B}`}>
            {item.effectiveTier}
          </span>
        </td>
        <td className="py-2 px-2 font-medium max-w-[200px] truncate">{idea.name}</td>
        <td className="py-2 px-2">
          <span className={`text-xs px-1.5 py-0.5 rounded ${idea.deck === 'physical' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {idea.deck}
          </span>
        </td>
        <td className="py-2 px-2 text-gray-400">{idea.capital}</td>
        <td className="py-2 px-2">
          <span className={item.sparkScore >= 65 ? 'text-green-400' : item.sparkScore >= 55 ? 'text-yellow-400' : 'text-gray-400'}>
            {item.sparkScore}
          </span>
        </td>
        <td className="py-2 px-2">
          <span className={compColors[item.competition] || 'text-gray-400'}>
            {item.competition}
          </span>
        </td>
        <td className="py-2 px-2 text-gray-400">{item.breakdownScore}/5</td>
        <td className="py-2 px-2" onClick={e => { e.stopPropagation(); onToggleRecommend() }}>
          <span className={`cursor-pointer text-lg ${item.isRecommended ? 'text-emerald-400' : 'text-gray-700'}`}>
            {item.isRecommended ? '\u2714' : '\u25CB'}
          </span>
        </td>
        <td className="py-2 px-2" onClick={e => { e.stopPropagation(); onToggleUpgrade() }}>
          <span className={`cursor-pointer text-lg ${item.isUpgradePriority ? 'text-purple-400' : 'text-gray-700'}`}>
            {item.isUpgradePriority ? '\u2605' : '\u2606'}
          </span>
        </td>
        <td className="py-2 px-2" onClick={e => e.stopPropagation()}>
          <div className="flex gap-1">
            {(['S', 'A', 'B', 'C'] as Tier[]).map(t => (
              <button key={t} onClick={() => onSetTier(t)}
                className={`text-[10px] w-5 h-5 rounded border ${item.effectiveTier === t ? tierColors[t] : 'border-gray-700 text-gray-600 hover:text-gray-300'}`}>
                {t}
              </button>
            ))}
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-900/30">
          <td colSpan={11} className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-amber-400 mb-1">Strategy</h4>
                <div className="text-gray-300 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: idea.breakdown.strategy.body }} />
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">Buyer Profile</h4>
                <div className="text-gray-300 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: idea.breakdown.value.body }} />
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-1">Distributors</h4>
                <div className="text-gray-300 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: idea.breakdown.distributors.body }} />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 items-center">
              <span className="text-xs text-gray-500">Hook: {idea.hook}</span>
              <span className="text-xs text-gray-500">Interests: {idea.interests.join(', ')}</span>
              <span className="text-xs text-gray-500">Reason: {item.triage?.reason || 'N/A'}</span>
            </div>
            <div className="mt-3">
              <input type="text" placeholder="Add audit note..."
                value={item.note} onChange={e => onSetNote(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-xs text-gray-300" />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
