import type { IdeaValidation } from '../types'

interface Props {
  validation: IdeaValidation
}

interface Signal {
  icon: string
  label: string
  type: 'good' | 'okay' | 'caution'
}

function getSignals(v: IdeaValidation): Signal[] {
  const signals: Signal[] = []

  // Demand signal
  if (v.demand.googleTrendsDirection === 'rising') {
    signals.push({ icon: '✅', label: 'Growing demand — more people searching for this every month', type: 'good' })
  } else if (v.demand.googleTrendsDirection === 'stable') {
    signals.push({ icon: '✅', label: 'Steady demand — consistent interest year-round', type: 'good' })
  } else {
    signals.push({ icon: '⚠️', label: 'Declining interest — consider a niche angle to stand out', type: 'caution' })
  }

  // Competition signal
  if (v.competition.saturationLevel === 'low') {
    signals.push({ icon: '✅', label: 'Low competition — great time to enter this market', type: 'good' })
  } else if (v.competition.saturationLevel === 'medium') {
    signals.push({ icon: '✅', label: 'Moderate competition — room for a unique angle', type: 'good' })
  } else if (v.competition.saturationLevel === 'high') {
    signals.push({ icon: '⚠️', label: 'Competitive market — niche down to stand out', type: 'okay' })
  } else {
    signals.push({ icon: '⚠️', label: 'Very crowded — you need a strong unique angle', type: 'caution' })
  }

  // Profit signal
  if (v.profitability.estimatedMargin >= 60) {
    signals.push({ icon: '✅', label: `Great margins — ~$${Math.round(v.profitability.avgSellingUsd - v.profitability.avgCostUsd)} profit per sale`, type: 'good' })
  } else if (v.profitability.estimatedMargin >= 40) {
    signals.push({ icon: '✅', label: `Good margins — ~$${Math.round(v.profitability.avgSellingUsd - v.profitability.avgCostUsd)} profit per sale`, type: 'good' })
  } else {
    signals.push({ icon: '⚠️', label: 'Tight margins — volume or premium pricing needed', type: 'caution' })
  }

  // Sourcing signal
  if (v.supplierHealth.supplierCount >= 20) {
    signals.push({ icon: '✅', label: `Easy to source — ${v.supplierHealth.supplierCount} verified suppliers available`, type: 'good' })
  } else if (v.supplierHealth.supplierCount >= 5) {
    signals.push({ icon: '✅', label: 'Suppliers available — multiple options to compare', type: 'good' })
  } else {
    signals.push({ icon: '⚠️', label: 'Limited suppliers — source carefully, get samples first', type: 'caution' })
  }

  return signals
}

function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 75) return { label: 'Strong opportunity', color: 'text-sage' }
  if (score >= 55) return { label: 'Good potential', color: 'text-ink' }
  if (score >= 35) return { label: 'Worth exploring', color: 'text-gold' }
  return { label: 'Needs research', color: 'text-accent' }
}

export function ValidationCard({ validation }: Props) {
  const signals = getSignals(validation)
  const { label, color } = getScoreLabel(validation.sparkScore)
  const goodCount = signals.filter(s => s.type === 'good').length

  // Simple traffic light: all green, mostly green, mixed
  const fillWidth = Math.min(100, validation.sparkScore)

  return (
    <div className="mx-5 mb-6">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
        Is this a good idea?
      </div>

      <div className="bg-card border border-line-soft rounded-2xl overflow-hidden">
        {/* Simple score bar — no numbers, just a visual level */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`font-display italic text-lg font-medium ${color}`}>{label}</span>
            <span className="text-[10px] text-ink-mute">{goodCount}/{signals.length} checks passed</span>
          </div>
          <div className="h-2 bg-line rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                validation.sparkScore >= 70 ? 'bg-sage' :
                validation.sparkScore >= 40 ? 'bg-gold' : 'bg-accent'
              }`}
              style={{ width: `${fillWidth}%` }}
            />
          </div>
        </div>

        {/* Simple signals — just icons + one-liners */}
        <div className="px-5 pb-4">
          {signals.map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 py-2 border-t border-line-soft first:border-0">
              <span className="text-base mt-0.5 shrink-0">{s.icon}</span>
              <span className="text-sm text-ink leading-snug">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
