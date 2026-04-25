import type { DeckPref } from '../types'
import { INTERESTS } from '../lib/constants'

interface Props {
  open: boolean
  deckPref: DeckPref | null
  interests: Set<string>
  onChangeDeck: (d: DeckPref) => void
  onToggleInterest: (id: string) => void
  onClose: () => void
}

const DECK_OPTIONS: { value: DeckPref; icon: string; label: string }[] = [
  { value: 'all', icon: '🎲', label: 'All' },
  { value: 'physical', icon: '📦', label: 'Physical' },
  { value: 'digital', icon: '💾', label: 'Digital' },
  { value: 'saas', icon: '⚡', label: 'SaaS' },
]

export function FilterSheet({ open, deckPref, interests, onChangeDeck, onToggleInterest, onClose }: Props) {
  return (
    <div className={`absolute inset-0 z-[200] flex items-end transition-opacity duration-300
      ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full bg-bg rounded-t-3xl px-6 pt-3 pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.15)]
        z-[201] transition-transform duration-300 max-h-[80vh] overflow-y-auto scrollbar-hide
        ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1)' }}>
        <div className="w-9 h-1 bg-line rounded-sm mx-auto mb-[18px]" />

        {/* Category */}
        <h3 className="font-display font-normal text-xl tracking-tight mb-1">What to show</h3>
        <p className="text-[13px] text-ink-mute mb-4">Change anytime. Your saved ideas stay.</p>

        <div className="flex gap-2 mb-6">
          {DECK_OPTIONS.map(o => (
            <button key={o.value}
              onClick={() => onChangeDeck(o.value)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border cursor-pointer transition-all font-body
                ${deckPref === o.value
                  ? 'bg-ink border-ink text-bg'
                  : 'bg-card border-line-soft text-ink hover:border-line'}`}>
              <span className="text-lg">{o.icon}</span>
              <span className="text-xs font-medium">{o.label}</span>
            </button>
          ))}
        </div>

        {/* Interests */}
        <h3 className="font-display font-normal text-xl tracking-tight mb-1">Interests</h3>
        <p className="text-[13px] text-ink-mute mb-4">We'll show matching ideas first.</p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {INTERESTS.map(i => (
            <button key={i.id}
              onClick={() => onToggleInterest(i.id)}
              className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl cursor-pointer
                transition-all font-body text-xs font-medium
                ${interests.has(i.id)
                  ? 'bg-ink border-ink text-bg'
                  : 'bg-card border-line-soft text-ink hover:border-line'}`}>
              <span className="text-base">{i.emoji}</span>
              {i.label}
            </button>
          ))}
        </div>

        <button onClick={onClose}
          className="w-full py-3.5 bg-ink text-bg rounded-2xl font-body text-sm font-medium
            cursor-pointer transition-all hover:bg-accent-deep active:scale-[0.98]">
          Done
        </button>
      </div>
    </div>
  )
}
