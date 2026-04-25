import { useState } from 'react'
import type { Idea, Region } from '../types'
import { REGIONS } from '../lib/regions'

interface Props {
  idea: Idea
  region: Region
}

export function ProfitCalculator({ idea, region }: Props) {
  const r = REGIONS[region] || REGIONS.US

  // Sensible defaults based on idea data
  const defaultCost = idea.capital_usd ? Math.round(idea.capital_usd.low / 10) : 5
  const defaultPrice = idea.sellingPrice_usd?.single || defaultCost * 4
  const defaultUnits = 50

  const [cost, setCost] = useState(defaultCost)
  const [price, setPrice] = useState(defaultPrice)
  const [units, setUnits] = useState(defaultUnits)

  const revenue = price * units
  const totalCost = cost * units
  const profit = revenue - totalCost
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0
  const breakEven = profit > 0 ? Math.ceil((idea.capital_usd?.low || 100) / (price - cost)) : 0

  const fmt = (usd: number) => `${r.symbol}${Math.round(usd * r.rate).toLocaleString()}`

  return (
    <div className="mt-3 px-4 py-4 bg-card border border-line-soft rounded-xl">
      {/* Inputs */}
      <div className="flex flex-col gap-4 mb-5">
        <div>
          <label className="text-[10px] uppercase tracking-[0.12em] text-ink-mute block mb-1.5">
            Cost per unit ({r.currency})
          </label>
          <input type="number" value={Math.round(cost * r.rate)}
            onChange={e => setCost(Number(e.target.value) / r.rate)}
            className="w-full px-3 py-2.5 bg-bg border border-line rounded-lg text-ink font-body text-sm
              focus:outline-none focus:border-accent" />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.12em] text-ink-mute block mb-1.5">
            Selling price ({r.currency})
          </label>
          <input type="number" value={Math.round(price * r.rate)}
            onChange={e => setPrice(Number(e.target.value) / r.rate)}
            className="w-full px-3 py-2.5 bg-bg border border-line rounded-lg text-ink font-body text-sm
              focus:outline-none focus:border-accent" />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-[0.12em] text-ink-mute block mb-1.5">
            Units per month
          </label>
          <input type="number" value={units}
            onChange={e => setUnits(Number(e.target.value))}
            className="w-full px-3 py-2.5 bg-bg border border-line rounded-lg text-ink font-body text-sm
              focus:outline-none focus:border-accent" />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        <div className="px-3 py-3 bg-bg rounded-lg">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Monthly Revenue</div>
          <div className="font-display italic text-lg font-medium text-ink">{fmt(revenue)}</div>
        </div>
        <div className="px-3 py-3 bg-bg rounded-lg">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Monthly Profit</div>
          <div className={`font-display italic text-lg font-medium ${profit > 0 ? 'text-sage' : 'text-accent'}`}>
            {fmt(profit)}
          </div>
        </div>
        <div className="px-3 py-3 bg-bg rounded-lg">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Margin</div>
          <div className={`font-display italic text-lg font-medium ${margin >= 50 ? 'text-sage' : margin >= 30 ? 'text-gold' : 'text-accent'}`}>
            {margin}%
          </div>
        </div>
        <div className="px-3 py-3 bg-bg rounded-lg">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Break-even</div>
          <div className="font-display italic text-lg font-medium text-ink">
            {breakEven > 0 ? `${breakEven} units` : '—'}
          </div>
        </div>
      </div>

      {profit > 0 && (
        <div className="mt-4 px-3 py-2.5 bg-sage/10 border border-sage/20 rounded-lg text-xs text-sage leading-relaxed">
          Sell {units} units/month at {fmt(price)} each → you keep <strong>{fmt(profit)}/month</strong> after costs.
          {breakEven > 0 && ` You break even after selling ${breakEven} units.`}
        </div>
      )}
    </div>
  )
}
