import type { InspireProfile } from '../types'

function buildImg(slug: string, w = 300) {
  return `https://images.unsplash.com/${slug}?w=${w}&q=70&auto=format&fit=crop`
}

interface Props {
  productName: string
  profiles: InspireProfile[]
  onImIn: () => void
  onNotForMe: () => void
}

export function InspireProfileFeed({ productName, profiles, onImIn, onNotForMe }: Props) {
  return (
    <div className="absolute inset-0 bg-bg flex flex-col z-40">
      {/* Hero header */}
      <div className="relative px-[22px] pt-4 pb-[18px] bg-card border-b border-line-soft shrink-0">
        <button onClick={onNotForMe}
          className="bg-transparent border-none text-ink-soft cursor-pointer p-0 pb-3 flex items-center gap-1.5 font-body text-[13px]">
          ← Back
        </button>
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent mb-2 font-medium">
          Real people doing this
        </div>
        <h2 className="font-display font-light text-[30px] leading-[1.1] tracking-tight mb-2">
          People selling <em className="italic font-normal text-accent">{productName}</em>
        </h2>
        <p className="text-sm text-ink-soft leading-relaxed">
          These sellers started where you are. Closed-loop preview — no external links.
        </p>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-[18px] pt-4 pb-[220px] scrollbar-hide">
        {profiles.length === 0 ? (
          <div className="text-center py-[60px]">
            <div className="text-[44px] mb-3.5">🔍</div>
            <h3 className="font-display text-2xl font-normal mb-1.5">No examples loaded yet</h3>
            <p className="text-[13px] text-ink-soft leading-relaxed">We'll add real seller pages here soon.</p>
          </div>
        ) : (
          profiles.map((p, idx) => (
            <div key={idx} className="bg-card border border-line-soft rounded-[18px] overflow-hidden mb-3.5 shadow-sm"
              style={{ animation: `fadeUp 480ms ${idx * 80}ms cubic-bezier(0.2, 0.9, 0.3, 1) backwards` }}>
              {/* Profile header */}
              <div className="flex items-center gap-3 px-3.5 pt-3.5 pb-2.5">
                <div className="w-11 h-11 rounded-full bg-cover bg-center border-2 border-white shadow-[0_0_0_2px_var(--color-accent)] shrink-0"
                  style={{ backgroundImage: `url(${buildImg(p.tiles[0], 120)})` }} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-ink flex items-center gap-1">
                    {p.handle}
                    {p.verified && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                        <path d="M12 2L9.91 4.36 7 3.37 6.51 6.51 3.37 7l.99 2.91L2 12l2.36 2.09-.99 2.91 3.14.49.49 3.14L9.91 19.64 12 22l2.09-2.36 2.91.99.49-3.14 3.14-.49-.99-2.91L22 12l-2.36-2.09.99-2.91-3.14-.49-.49-3.14-2.91.99zM10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                      </svg>
                    )}
                  </div>
                  <div className="text-xs text-ink-soft mt-0.5 truncate leading-snug">{p.bio}</div>
                  <div className="text-[11px] text-ink-mute mt-0.5 tabular-nums">{p.followers} followers · {p.name}</div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-4 gap-px bg-line-soft">
                {p.tiles.map((t, i) => (
                  <div key={i} className="aspect-square bg-cover bg-center bg-bg-deep relative"
                    style={{ backgroundImage: `url(${buildImg(t)})` }}>
                    {i === 0 && <span className="absolute top-1.5 right-1.5 text-white text-[10px] drop-shadow">▶</span>}
                    {(i === 3 || i === 5) && <span className="absolute top-1.5 right-1.5 text-white text-xs drop-shadow">⊞</span>}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="px-3.5 py-2.5 flex justify-between items-center text-xs">
                <div className="flex gap-3.5 text-ink-soft">
                  <span className="flex items-center gap-1">♡ {Math.floor(Math.random() * 800 + 200)}</span>
                  <span className="flex items-center gap-1">💬 {Math.floor(Math.random() * 80 + 12)}</span>
                </div>
                <span className="text-ink-mute text-[11px] font-medium tabular-nums">@ {p.handle}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-[18px] pt-4 pb-6 bg-gradient-to-t from-bg via-bg to-transparent">
        <div className="flex gap-2">
          <button onClick={onNotForMe}
            className="flex-1 py-4 bg-card text-ink-soft border border-line rounded-[14px] font-body text-sm font-medium
              cursor-pointer transition-all hover:border-ink-mute">
            Not for me
          </button>
          <button onClick={onImIn}
            className="flex-1 py-4 bg-ink text-bg rounded-[14px] font-body text-sm font-medium
              cursor-pointer transition-all hover:bg-accent-deep active:scale-[0.98] flex items-center justify-center gap-1.5">
            I'm in — show me how →
          </button>
        </div>
      </div>
    </div>
  )
}
