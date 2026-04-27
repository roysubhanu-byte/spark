import { useState, useMemo, useCallback, useEffect } from 'react'
import { IDEAS } from '../data'
import type { Idea } from '../types'

interface AuditResult {
  idea_id: string
  scores: { hook_strength: number; commodity_risk: number; regulatory_risk: number; capital_honesty: number; differentiation: number }
  duplicate_of: string | null
  recommendation: 'keep' | 'cut' | 'needs-review'
  reasoning: string
}

type Tab = 'keep' | 'review' | 'cut'
const LS_KEY = 'spark-audit-overrides'

interface OverrideState {
  overrides: Record<string, 'keep' | 'cut' | 'needs-review'>
}

function loadOverrides(): OverrideState {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') } catch { return { overrides: {} } }
}

export default function AdminAuditReview() {
  const [auditData, setAuditData] = useState<AuditResult[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('review')
  const [overrides, setOverrides] = useState<OverrideState>(() => {
    const s = loadOverrides()
    return { overrides: s.overrides || {} }
  })
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0)

  // Load audit results
  useEffect(() => {
    import('../../scripts/audit-results.json')
      .then(m => { setAuditData((m.default || []) as AuditResult[]); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Map ideas by ID for lookup
  const ideaMap = useMemo(() => {
    const map = new Map<string, Idea>()
    for (const idea of IDEAS) map.set(idea.id, idea)
    return map
  }, [])

  // Merge audit results with overrides
  const merged = useMemo(() => {
    return auditData.map(audit => {
      const effectiveRec: 'keep' | 'cut' | 'needs-review' = overrides.overrides[audit.idea_id] || audit.recommendation as 'keep' | 'cut' | 'needs-review'
      const idea = ideaMap.get(audit.idea_id)
      const totalScore = audit.scores ?
        audit.scores.hook_strength + audit.scores.commodity_risk + audit.scores.regulatory_risk +
        audit.scores.capital_honesty + audit.scores.differentiation : 0
      return { audit, effectiveRec, idea, totalScore }
    })
  }, [auditData, overrides, ideaMap])

  const keeps = useMemo(() => merged.filter(m => m.effectiveRec === 'keep').sort((a, b) => b.totalScore - a.totalScore), [merged])
  const reviews = useMemo(() => merged.filter(m => m.effectiveRec === 'needs-review').sort((a, b) => (a.audit.scores?.hook_strength || 0) - (b.audit.scores?.hook_strength || 0)), [merged])
  const cuts = useMemo(() => merged.filter(m => m.effectiveRec === 'cut').sort((a, b) => a.totalScore - b.totalScore), [merged])

  const tabData = tab === 'keep' ? keeps : tab === 'review' ? reviews : cuts
  const currentReview = reviews[currentReviewIdx]

  function saveOverride(id: string, decision: 'keep' | 'cut') {
    setOverrides(prev => {
      const next = { overrides: { ...prev.overrides, [id]: decision } }
      localStorage.setItem(LS_KEY, JSON.stringify(next))
      return next
    })
  }

  // Keyboard shortcuts for review tab (K=keep, C=cut, S=skip)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Don't fire when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (tab !== 'review' || !currentReview) return

      const id = currentReview.audit.idea_id
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault()
        saveOverride(id, 'keep')
        setCurrentReviewIdx(i => Math.min(i + 1, reviews.length - 1))
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        saveOverride(id, 'cut')
        setCurrentReviewIdx(i => Math.min(i + 1, reviews.length - 1))
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault()
        setCurrentReviewIdx(i => Math.min(i + 1, reviews.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        setCurrentReviewIdx(i => Math.max(0, i - 1))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [tab, currentReview, reviews.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const exportResults = useCallback(() => {
    const data = merged.map(m => ({
      id: m.audit.idea_id,
      name: m.idea?.name || m.audit.idea_id,
      recommendation: m.effectiveRec,
      scores: m.audit.scores,
      reasoning: m.audit.reasoning,
      overridden: m.audit.idea_id in overrides.overrides,
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `spark-audit-final-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  }, [merged, overrides])

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">Loading audit results...</div>

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Audit Review</h1>
          <p className="text-gray-400 text-sm">{auditData.length} ideas audited by AI. Your overrides are final.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportResults} className="text-sm px-3 py-1.5 rounded border border-gray-700 hover:bg-gray-800">Export</button>
          <a href="/admin/triage" className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-700">Triage</a>
          <a href="/" className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-700">App</a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{auditData.length}</div>
          <div className="text-xs text-gray-500">Audited</div>
        </div>
        <div className="bg-gray-900 border border-green-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setTab('keep')}>
          <div className="text-2xl font-bold text-green-400">{keeps.length}</div>
          <div className="text-xs text-gray-500">Keep</div>
        </div>
        <div className="bg-gray-900 border border-yellow-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setTab('review')}>
          <div className="text-2xl font-bold text-yellow-400">{reviews.length}</div>
          <div className="text-xs text-gray-500">Review</div>
        </div>
        <div className="bg-gray-900 border border-red-900/30 rounded-lg p-3 text-center cursor-pointer" onClick={() => setTab('cut')}>
          <div className="text-2xl font-bold text-red-400">{cuts.length}</div>
          <div className="text-xs text-gray-500">Cut</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-800">
        {(['keep', 'review', 'cut'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all
              ${tab === t ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
            {t === 'keep' ? `Auto-keep (${keeps.length})` : t === 'review' ? `Needs review (${reviews.length})` : `Auto-cut (${cuts.length})`}
          </button>
        ))}
      </div>

      {/* Review mode — one at a time with keyboard shortcuts */}
      {tab === 'review' && currentReview && (
        <div className="mb-6 p-4 bg-gray-900 border border-yellow-900/20 rounded-xl">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-lg font-bold">{currentReview.idea?.name || currentReview.audit.idea_id}</div>
              <div className="text-sm text-gray-400">{currentReview.idea?.hook}</div>
            </div>
            <div className="text-xs text-gray-500">{currentReviewIdx + 1} / {reviews.length}</div>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-3">
            {currentReview.audit.scores && Object.entries(currentReview.audit.scores).map(([key, val]) => (
              <div key={key} className="bg-gray-800 rounded px-2 py-1.5 text-center">
                <div className={`text-lg font-bold ${(val as number) >= 4 ? 'text-green-400' : (val as number) >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>{val as number}</div>
                <div className="text-[9px] text-gray-500 uppercase">{key.replace('_', ' ')}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-300 mb-4">{currentReview.audit.reasoning}</div>
          <div className="flex gap-2 items-center">
            <button onClick={() => { saveOverride(currentReview.audit.idea_id, 'keep'); setCurrentReviewIdx(i => Math.min(i + 1, reviews.length - 1)) }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded font-medium">
              Keep (K)
            </button>
            <button onClick={() => { saveOverride(currentReview.audit.idea_id, 'cut'); setCurrentReviewIdx(i => Math.min(i + 1, reviews.length - 1)) }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded font-medium">
              Cut (C)
            </button>
            <button onClick={() => setCurrentReviewIdx(i => Math.min(i + 1, reviews.length - 1))}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded font-medium">
              Skip (S)
            </button>
            <button onClick={() => setCurrentReviewIdx(i => Math.max(0, i - 1))}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded font-medium">
              Prev (P)
            </button>
            <span className="text-xs text-gray-500 ml-2">Keys: K=keep, C=cut, S=skip, P=prev</span>
          </div>
        </div>
      )}

      {/* Table for all tabs */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left text-gray-400">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Hook</th>
              <th className="py-2 px-2">Total</th>
              <th className="py-2 px-2">Hook</th>
              <th className="py-2 px-2">Commodity</th>
              <th className="py-2 px-2">Reg.</th>
              <th className="py-2 px-2">Capital</th>
              <th className="py-2 px-2">Diff.</th>
              <th className="py-2 px-2">Reasoning</th>
              {tab === 'cut' && <th className="py-2 px-2">Override</th>}
            </tr>
          </thead>
          <tbody>
            {tabData.map((item, idx) => {
              const s = item.audit.scores || {} as any
              return (
                <tr key={item.audit.idea_id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                  <td className="py-2 px-2 text-gray-600 text-xs">{idx + 1}</td>
                  <td className="py-2 px-2 font-medium max-w-[150px] truncate">{item.idea?.name || item.audit.idea_id}</td>
                  <td className="py-2 px-2 text-gray-400 max-w-[200px] truncate">{item.idea?.hook}</td>
                  <td className="py-2 px-2 font-bold">{item.totalScore}</td>
                  <td className="py-2 px-2"><ScoreCell v={s.hook_strength} /></td>
                  <td className="py-2 px-2"><ScoreCell v={s.commodity_risk} invert /></td>
                  <td className="py-2 px-2"><ScoreCell v={s.regulatory_risk} invert /></td>
                  <td className="py-2 px-2"><ScoreCell v={s.capital_honesty} /></td>
                  <td className="py-2 px-2"><ScoreCell v={s.differentiation} /></td>
                  <td className="py-2 px-2 text-gray-500 text-xs max-w-[250px] truncate">{item.audit.reasoning}</td>
                  {tab === 'cut' && (
                    <td className="py-2 px-2">
                      <button onClick={() => saveOverride(item.audit.idea_id, 'keep')}
                        className="text-xs px-2 py-1 rounded border border-green-800 text-green-400 hover:bg-green-900/30">
                        Restore
                      </button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ScoreCell({ v, invert }: { v?: number; invert?: boolean }) {
  if (v === undefined) return <span className="text-gray-600">-</span>
  const good = invert ? v <= 2 : v >= 4
  const bad = invert ? v >= 4 : v <= 2
  return <span className={`font-bold ${good ? 'text-green-400' : bad ? 'text-red-400' : 'text-yellow-400'}`}>{v}</span>
}
