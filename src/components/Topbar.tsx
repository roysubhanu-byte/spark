import type { Region } from '../types'
import { REGIONS } from '../lib/regions'

interface Props {
  region: Region
  savedCount: number
  onOpenRegion: () => void
}

export function Topbar({ region, savedCount, onOpenRegion }: Props) {
  const r = REGIONS[region] || REGIONS.US

  return (
    <div className="flex items-center justify-between px-[22px] pt-[18px] pb-3 shrink-0">
      <div className="font-display font-normal italic text-[22px] tracking-tight text-ink">
        Spark
        <span className="inline-block w-[7px] h-[7px] bg-accent rounded-full -translate-y-2 mx-[1px]" />
      </div>
      <div className="flex gap-1.5">
        <button
          onClick={onOpenRegion}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-card border border-line-soft
            rounded-full cursor-pointer font-body text-ink transition-all duration-200 hover:border-line hover:-translate-y-px"
        >
          <span className="text-base leading-none">{r.flag}</span>
          <span className="text-xs font-semibold tracking-[0.04em]">{r.code}</span>
          <svg width="10" height="6" className="text-ink-mute ml-0.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l4 4 4-4" />
          </svg>
        </button>
        {savedCount > 0 && (
          <span className="w-[38px] h-[38px] rounded-full flex items-center justify-center
            text-ink-soft text-xl relative">
            💖
            <span className="absolute top-1.5 right-1.5 min-w-4 h-4 bg-accent text-white rounded-lg
              text-[10px] font-semibold flex items-center justify-center px-1">
              {savedCount}
            </span>
          </span>
        )}
      </div>
    </div>
  )
}
