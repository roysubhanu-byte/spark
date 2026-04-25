import { useRef } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import type { Idea, Region } from '../types'
import { pickBadges } from '../lib/badges'
import { formatMoney } from '../lib/regions'

interface Props {
  idea: Idea
  region: Region
  depth: number
  onSwipe: (dir: 'left' | 'right') => void
  onTap?: () => void
  showHint?: boolean
}

export function SwipeCard({ idea, region, depth, onSwipe, onTap, showHint }: Props) {
  const dragRef = useRef(false)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const likeOpacity = useTransform(x, [30, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, -30], [1, 0])

  const scale = 1 - depth * 0.04
  const yOff = depth * 8

  const capitalText = idea.capital_usd
    ? formatMoney(idea.capital_usd.low, idea.capital_usd.high, region)
    : idea.capital

  const badges = pickBadges(idea.badges, 2)
  const deckParts = idea.deckLabel.split('·')

  function handleDragStart() {
    dragRef.current = true
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > 100) {
      const dir = info.offset.x > 0 ? 'right' : 'left'
      onSwipe(dir)
    }
  }

  function handleClick() {
    // Only fire tap if we didn't just drag
    if (!dragRef.current && depth === 0 && onTap) {
      onTap()
    }
    dragRef.current = false
  }

  const effortDots = [1, 2, 3].map(n => (
    <span key={n} className={`w-1.5 h-1.5 rounded-full ${n <= idea.effort ? 'bg-ink' : 'bg-line'}`} />
  ))

  return (
    <motion.div
      className="absolute inset-0 bg-card rounded-[22px] overflow-hidden shadow-md will-change-transform cursor-grab active:cursor-grabbing"
      style={{
        x: depth === 0 ? x : 0,
        rotate: depth === 0 ? rotate : 0,
        zIndex: 10 - depth,
      }}
      drag={depth === 0 ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragStart={depth === 0 ? handleDragStart : undefined}
      onDragEnd={depth === 0 ? handleDragEnd : undefined}
      onPointerUp={handleClick}
      initial={{ scale, y: yOff, opacity: depth === 0 ? 0.9 : 1 }}
      animate={{ scale, y: yOff, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Image area */}
      <div
        className="w-full h-[64%] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${idea.image})`, backgroundColor: idea.bg }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/92 backdrop-blur-lg rounded-full
          text-[11px] font-semibold text-ink tracking-[0.04em] uppercase">
          {deckParts[1]?.trim()}
        </div>
        <div className="absolute top-4 right-4 px-2.5 py-1.5 bg-ink/60 backdrop-blur-lg rounded-full
          text-[10px] font-medium text-white tracking-[0.08em] uppercase">
          {deckParts[0]?.trim()}
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-[2] max-w-[calc(100%-32px)]">
            {badges.map(b => (
              <span key={b.key} className={`inline-flex items-center gap-1 px-[9px] py-[5px] rounded-full
                text-[10px] font-semibold tracking-[0.02em] shadow-[0_2px_6px_rgba(0,0,0,0.12)] ${b.className}`}>
                <span className="text-[11px] leading-none">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        )}

        {/* Swipe stamps */}
        {depth === 0 && (
          <>
            <motion.div
              className="absolute top-[30px] right-6 px-[22px] py-2.5 border-[3px] border-sage
                rounded-lg font-display italic font-semibold text-[28px] text-sage tracking-[0.05em]
                rotate-12 pointer-events-none"
              style={{ opacity: likeOpacity }}
            >
              SAVE
            </motion.div>
            <motion.div
              className="absolute top-[30px] left-6 px-[22px] py-2.5 border-[3px] border-accent
                rounded-lg font-display italic font-semibold text-[28px] text-accent tracking-[0.05em]
                -rotate-12 pointer-events-none"
              style={{ opacity: nopeOpacity }}
            >
              SKIP
            </motion.div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="px-5 pt-[18px] pb-5 h-[36%] flex flex-col justify-between">
        <div>
          <div className="font-display text-[26px] font-normal leading-[1.1] tracking-tight text-ink mb-1.5">
            {idea.name}
          </div>
          <div className="text-[13px] leading-[1.45] text-ink-soft">{idea.hook}</div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-line-soft">
          <span className="font-display italic text-sm text-accent-deep font-medium">{capitalText}</span>
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-ink-mute font-medium">
            Effort
            <span className="flex gap-[3px]">{effortDots}</span>
          </span>
        </div>
      </div>

      {/* First-time hint */}
      {depth === 0 && showHint && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-6 px-5 py-3 bg-ink/80 backdrop-blur-sm rounded-full text-bg text-xs font-medium">
            <span className="opacity-70">← Skip</span>
            <span className="text-gold font-semibold">Tap to explore</span>
            <span className="opacity-70">Save →</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
