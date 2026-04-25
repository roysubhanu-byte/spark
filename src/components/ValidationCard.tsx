import type { IdeaValidation, TrendDirection } from '../types'

interface Props {
  validation: IdeaValidation
}

const TREND_CONFIG: Record<TrendDirection, { label: string; color: string; bg: string }> = {
  hot: { label: 'Hot', color: 'text-white', bg: 'bg-accent' },
  rising: { label: 'Rising', color: 'text-sage', bg: 'bg-sage/15' },
  stable: { label: 'Stable', color: 'text-ink', bg: 'bg-line' },
  cooling: { label: 'Cooling', color: 'text-gold', bg: 'bg-gold/15' },
  declining: { label: 'Declining', color: 'text-accent', bg: 'bg-accent/15' },
}

export function ValidationCard({ validation }: Props) {
  const trend = TREND_CONFIG[validation.trending]

  return (
    <div className="mx-5 mb-6">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
        Market validation
      </div>

      {/* Spark Score hero */}
      <div className="bg-card border border-line-soft rounded-2xl p-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-1">Spark Score</div>
            <div className="flex items-baseline gap-2">
              <span className={`font-display italic text-4xl font-medium ${
                validation.sparkScore >= 70 ? 'text-sage' :
                validation.sparkScore >= 40 ? 'text-gold' : 'text-accent'
              }`}>
                {validation.sparkScore}
              </span>
              <span className="text-ink-mute text-sm">/100</span>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${trend.bg} ${trend.color}`}>
            {trend.label}
          </div>
        </div>

        {/* Score breakdown bars */}
        <div className="flex flex-col gap-2.5">
          <ScoreBar label="Demand" score={validation.demand.score} />
          <ScoreBar label="Low competition" score={validation.competition.score} />
          <ScoreBar label="Profitability" score={validation.profitability.score} />
          <ScoreBar label="Supplier health" score={validation.supplierHealth.score} />
        </div>

        <div className="mt-3 pt-3 border-t border-line-soft text-[10px] text-ink-mute">
          Data: {validation.dataSource} · Updated {validation.lastUpdated}
        </div>
      </div>

      {/* Evidence cards */}
      <div className="grid grid-cols-2 gap-2">
        <EvidenceCard
          icon="📈"
          title="Demand"
          value={validation.demand.searchVolume}
          detail={validation.demand.googleTrendsDirection}
          positive={validation.demand.googleTrendsDirection !== 'declining'}
        />
        <EvidenceCard
          icon="🏪"
          title="Competition"
          value={`${validation.competition.etsyListings.toLocaleString()} listings`}
          detail={validation.competition.saturationLevel}
          positive={validation.competition.saturationLevel === 'low' || validation.competition.saturationLevel === 'medium'}
        />
        <EvidenceCard
          icon="💰"
          title="Margin"
          value={`${validation.profitability.estimatedMargin}%`}
          detail={`$${validation.profitability.avgCostUsd} → $${validation.profitability.avgSellingUsd}`}
          positive={validation.profitability.estimatedMargin >= 50}
        />
        <EvidenceCard
          icon="📦"
          title="Suppliers"
          value={`${validation.supplierHealth.supplierCount} found`}
          detail={`${validation.supplierHealth.avgSupplierRating}/5 avg rating`}
          positive={validation.supplierHealth.supplierCount >= 10}
        />
      </div>
    </div>
  )
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-ink-mute w-[100px] shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-line rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            score >= 70 ? 'bg-sage' : score >= 40 ? 'bg-gold' : 'bg-accent'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[11px] text-ink-mute tabular-nums w-8 text-right">{score}</span>
    </div>
  )
}

function EvidenceCard({ icon, title, value, detail, positive }: {
  icon: string; title: string; value: string; detail: string; positive: boolean
}) {
  return (
    <div className="px-3.5 py-3 bg-card border border-line-soft rounded-xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <span className="text-[10px] uppercase tracking-[0.08em] text-ink-mute font-medium">{title}</span>
      </div>
      <div className="font-display italic text-lg font-medium text-ink">{value}</div>
      <div className={`text-[11px] mt-0.5 ${positive ? 'text-sage' : 'text-accent'}`}>{detail}</div>
    </div>
  )
}
