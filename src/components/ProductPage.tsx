import { useState } from 'react'
import type { Idea, Region, SectionKey, InspireProfile } from '../types'
import { SECTION_LABELS } from '../lib/constants'
import { formatMoney } from '../lib/regions'
import { SourcingCards } from './SourcingCards'
import { ProfitCalculator } from './ProfitCalculator'
import { ValidationCard } from './ValidationCard'

interface Props {
  idea: Idea
  region: Region
  profiles: InspireProfile[]
  isSaved: boolean
  onSave: () => void
  onOpenStories: (startAt: SectionKey) => void
  onStartPlan: () => void
  onClose: () => void
}

function buildImg(slug: string) {
  return `https://images.unsplash.com/${slug}?w=400&q=70&auto=format&fit=crop`
}

export function ProductPage({ idea, region, profiles, isSaved, onSave, onOpenStories, onStartPlan, onClose }: Props) {
  const [showCalc, setShowCalc] = useState(false)

  const capitalText = idea.capital_usd
    ? formatMoney(idea.capital_usd.low, idea.capital_usd.high, region)
    : idea.capital

  const effortLabels = ['', 'Easy', 'Medium', 'Hard']

  return (
    <div className="absolute inset-0 bg-bg flex flex-col z-40 overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-28">
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-4 pb-3 bg-bg/90 backdrop-blur-lg">
          <button onClick={onClose}
            className="text-ink-soft text-sm font-body cursor-pointer bg-transparent border-none flex items-center gap-1">
            ← Back
          </button>
          <button onClick={onSave}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all border-none
              ${isSaved ? 'bg-sage text-white' : 'bg-ink text-bg hover:bg-accent-deep'}`}>
            {isSaved ? '♡ Saved' : '♡ Save'}
          </button>
        </div>

        {/* Hero image */}
        <div className="relative h-[240px] mx-5 rounded-[20px] overflow-hidden mb-5">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${idea.image})`, backgroundColor: idea.bg }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <div className="font-display text-[28px] font-normal text-white leading-tight tracking-tight">{idea.name}</div>
            <div className="text-white/80 text-sm mt-1">{idea.hook}</div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex gap-3 mx-5 mb-6">
          <div className="flex-1 px-4 py-3 bg-card border border-line-soft rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Capital</div>
            <div className="font-display italic text-lg font-medium text-accent-deep">{capitalText}</div>
          </div>
          <div className="flex-1 px-4 py-3 bg-card border border-line-soft rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Effort</div>
            <div className="font-display italic text-lg font-medium text-ink">{effortLabels[idea.effort]}</div>
          </div>
          <div className="flex-1 px-4 py-3 bg-card border border-line-soft rounded-xl">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Type</div>
            <div className="font-display italic text-lg font-medium text-ink capitalize">{idea.deck}</div>
          </div>
        </div>

        {/* Market validation */}
        {idea.validation ? (
          <ValidationCard validation={idea.validation} />
        ) : (
          <div className="mx-5 mb-5 p-4 bg-card border border-line-soft rounded-2xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-2">Quick check</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-sage">&#10003;</span>
                <span className="text-ink-soft">Real product category with active sellers</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-sage">&#10003;</span>
                <span className="text-ink-soft">Sourcing available on AliExpress/Alibaba</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-sage">&#10003;</span>
                <span className="text-ink-soft">Can be sold on Etsy, eBay, or Amazon</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-ink-mute">Start the 30-day plan to validate demand for your specific niche.</div>
          </div>
        )}

        {/* Real sellers section */}
        {profiles.length > 0 && (
          <div className="mx-5 mb-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
              Real people doing this
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {profiles.slice(0, 4).map((p, i) => (
                <div key={i} className="shrink-0 w-[140px] bg-card border border-line-soft rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-px bg-line-soft">
                    {p.tiles.slice(0, 4).map((t, j) => (
                      <div key={j} className="aspect-square bg-cover bg-center bg-bg-deep"
                        style={{ backgroundImage: `url(${buildImg(t)})` }} />
                    ))}
                  </div>
                  <div className="px-3 py-2.5">
                    <div className="text-xs font-semibold text-ink truncate flex items-center gap-1">
                      {p.handle}
                      {p.verified && <span className="text-accent text-[10px]">✓</span>}
                    </div>
                    <div className="text-[10px] text-ink-mute mt-0.5">{p.followers}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The Breakdown — 6 sections */}
        <div className="mx-5 mb-6">
          <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
            The breakdown
          </div>
          <div className="flex flex-col gap-2">
            {(['strategy', 'value', 'profit', 'distributors', 'pricing', 'sellingPrice'] as SectionKey[]).map(key => (
              <button key={key}
                onClick={() => onOpenStories(key)}
                className="flex items-center gap-3 px-4 py-3.5 bg-card border border-line-soft rounded-xl
                  cursor-pointer transition-all hover:border-line text-left w-full font-body group">
                <div className="w-9 h-9 rounded-full bg-bg-deep flex items-center justify-center text-lg shrink-0">
                  {key === 'strategy' && '🎯'}
                  {key === 'value' && '👤'}
                  {key === 'profit' && '💰'}
                  {key === 'distributors' && '📦'}
                  {key === 'pricing' && '🏷'}
                  {key === 'sellingPrice' && '💵'}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ink">{SECTION_LABELS[key]}</div>
                  <div className="text-xs text-ink-mute mt-0.5 line-clamp-1">{idea.breakdown[key].action}</div>
                </div>
                <span className="text-ink-mute group-hover:text-ink transition-colors">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Profit Calculator */}
        <div className="mx-5 mb-6">
          <button onClick={() => setShowCalc(!showCalc)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-gold/10 to-accent/10
              border border-gold/20 rounded-xl cursor-pointer font-body text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">🧮</span>
              <div>
                <div className="text-sm font-medium text-ink">Profit Calculator</div>
                <div className="text-xs text-ink-mute">Plug in your numbers</div>
              </div>
            </div>
            <span className="text-ink-mute">{showCalc ? '−' : '+'}</span>
          </button>
          {showCalc && <ProfitCalculator idea={idea} region={region} />}
        </div>

        {/* Sourcing / Build Tools */}
        <div className="mx-5 mb-6">
          <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
            {idea.deck === 'physical' ? 'Where to source' : 'Tools to build it'}
          </div>
          <SourcingCards idea={idea} region={region} />
        </div>

        {/* Where to sell */}
        <div className="mx-5 mb-6">
          <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
            Where to sell
          </div>
          <WhereTo deck={idea.deck} region={region} />
        </div>
      </div>

      {/* Fixed CTA at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pt-4 pb-6 bg-gradient-to-t from-bg via-bg to-transparent">
        <button onClick={onStartPlan}
          className="w-full py-4 bg-ink text-bg rounded-2xl font-body text-[15px] font-medium
            cursor-pointer transition-all hover:bg-accent-deep active:scale-[0.98]
            flex items-center justify-center gap-2">
          I'm in — start my 30-day plan →
        </button>
      </div>
    </div>
  )
}

function WhereTo({ deck, region }: { deck: Deck; region: Region }) {
  const platforms = getSellPlatforms(deck, region)
  return (
    <div className="flex flex-col gap-2">
      {platforms.map((p, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 bg-card border border-line-soft rounded-xl">
          <div className={`w-2 h-2 rounded-full ${
            p.difficulty === 'easy' ? 'bg-sage' : p.difficulty === 'medium' ? 'bg-gold' : 'bg-accent'
          }`} />
          <div className="flex-1">
            <div className="text-sm font-medium text-ink">{p.name}</div>
            <div className="text-xs text-ink-mute mt-0.5">{p.note}</div>
          </div>
          <span className={`text-[10px] uppercase tracking-[0.08em] font-medium px-2 py-1 rounded-full ${
            p.difficulty === 'easy' ? 'bg-sage/10 text-sage' : p.difficulty === 'medium' ? 'bg-gold/10 text-gold' : 'bg-accent/10 text-accent'
          }`}>
            {p.difficulty}
          </span>
        </div>
      ))}
    </div>
  )
}

type Deck = 'physical' | 'digital' | 'saas'

function getSellPlatforms(deck: Deck, region: Region) {
  if (deck === 'physical') {
    if (region === 'IN') return [
      { name: 'Meesho', difficulty: 'easy' as const, note: 'Zero investment reselling, huge reach' },
      { name: 'Amazon.in', difficulty: 'medium' as const, note: 'Biggest marketplace, needs FBA for volume' },
      { name: 'Instagram + WhatsApp', difficulty: 'easy' as const, note: 'DM commerce, no platform fees' },
      { name: 'Own website (Dukaan)', difficulty: 'medium' as const, note: 'Your brand, your margins' },
    ]
    return [
      { name: 'Etsy', difficulty: 'easy' as const, note: 'Best for handmade/craft, lowest barrier' },
      { name: 'eBay', difficulty: 'easy' as const, note: 'Anything goes, fast listing' },
      { name: 'Amazon', difficulty: 'medium' as const, note: 'Biggest volume, needs FBA' },
      { name: 'Shopify', difficulty: 'hard' as const, note: 'Own store, need to drive traffic yourself' },
    ]
  }
  if (deck === 'digital') return [
    { name: 'Gumroad', difficulty: 'easy' as const, note: 'Easiest to start, handles payments' },
    { name: 'Etsy (digital)', difficulty: 'easy' as const, note: 'Huge buyer base for templates/presets' },
    { name: 'Creative Market', difficulty: 'medium' as const, note: 'Design-focused, higher prices' },
    { name: 'Own site', difficulty: 'medium' as const, note: 'Lemon Squeezy or Stripe checkout' },
  ]
  return [ // saas
    { name: 'Own website', difficulty: 'medium' as const, note: 'Stripe payments, Vercel hosting' },
    { name: 'Product Hunt', difficulty: 'easy' as const, note: 'Free launch, early adopters' },
    { name: 'AppSumo', difficulty: 'medium' as const, note: 'Lifetime deals, volume burst' },
    { name: 'Chrome Web Store', difficulty: 'easy' as const, note: 'If building an extension' },
  ]
}
