import type { Region } from '../types'
import { REGIONS, ACTIVE_REGIONS } from '../lib/regions'

interface Props {
  open: boolean
  current: Region
  onPick: (r: Region) => void
  onClose: () => void
}

export function RegionPicker({ open, current, onPick, onClose }: Props) {
  return (
    <div className={`absolute inset-0 z-[200] flex items-end transition-opacity duration-300
      ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full bg-bg rounded-t-3xl px-6 pt-3 pb-8 shadow-[0_-8px_32px_rgba(0,0,0,0.15)]
        z-[201] transition-transform duration-300
        ${open ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1)' }}>
        <div className="w-9 h-1 bg-line rounded-sm mx-auto mb-[18px]" />
        <h3 className="font-display font-normal text-2xl tracking-tight mb-1">Your market</h3>
        <p className="text-[13px] text-ink-mute mb-[18px]">Find ideas that work for US makers and sellers.</p>
        <div className="flex flex-col gap-2">
          {Object.values(REGIONS).map(r => {
            const active = ACTIVE_REGIONS.includes(r.code)
            const selected = current === r.code
            return (
              <button key={r.code}
                onClick={() => active && onPick(r.code)}
                disabled={!active}
                className={`flex items-center gap-3.5 px-4 py-3.5 border rounded-[14px] w-full text-left font-body transition-all
                  ${selected ? 'bg-ink border-ink text-bg' : active ? 'bg-card border-line-soft text-ink hover:border-line cursor-pointer' : 'opacity-50 cursor-not-allowed bg-card border-line-soft text-ink'}`}>
                <span className="text-[26px] leading-none">{r.flag}</span>
                <span className="flex-1">
                  <div className="text-[15px] font-medium">{r.name}</div>
                  <div className={`text-[11px] mt-0.5 uppercase tracking-[0.04em] ${selected ? 'text-bg/60' : 'text-ink-mute'}`}>
                    {r.currency} · {r.symbol.trim()}
                  </div>
                </span>
                {!active && (
                  <span className="text-[10px] uppercase tracking-[0.1em] text-ink-mute bg-line-soft px-2 py-1 rounded-full font-medium">
                    Coming soon
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
