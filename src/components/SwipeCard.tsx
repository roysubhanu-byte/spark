import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import type { Idea, Region } from '../types'
import { pickBadges } from '../lib/badges'
import { REGIONS } from '../lib/regions'
import { findSuppliers } from '../lib/supplier-api'

interface Props {
  idea: Idea
  region: Region
  depth: number
  cardIndex: number // absolute index in the deck for variant selection
  onSwipe: (dir: 'left' | 'right') => void
  onTap?: () => void
  showHint?: boolean
}

const EFFORT_LABELS: Record<number, string> = {
  1: 'Easy weekend',
  2: 'Real commitment',
  3: 'Full-time builder',
}

const EFFORT_COLORS: Record<number, string> = {
  1: 'text-sage',
  2: 'text-gold',
  3: 'text-accent',
}

function getMarketSignal(idea: Idea): { label: string; color: string } | null {
  const spark = idea.validation?.sparkScore
  if (!spark) return null
  if (spark >= 72) return { label: 'High demand', color: 'bg-sage/90 text-white' }
  if (spark >= 65) return { label: 'Growing market', color: 'bg-gold/90 text-white' }
  return null
}

export function SwipeCard({ idea, region, depth, cardIndex, onSwipe, onTap, showHint }: Props) {
  const dragRef = useRef(false)
  const [showCurrency, setShowCurrency] = useState(false)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const likeOpacity = useTransform(x, [30, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, -30], [1, 0])

  const scale = 1 - depth * 0.04
  const yOff = depth * 8

  // Capital with currency name on tap
  const r = REGIONS[region] || REGIONS.US
  const lo = Math.round((idea.capital_usd?.low || 0) * r.rate)
  const hi = Math.round((idea.capital_usd?.high || 0) * r.rate)
  const capitalText = lo && hi
    ? `${r.symbol}${lo.toLocaleString()} – ${hi.toLocaleString()}`
    : idea.capital
  const currencyName = r.currency

  // Get real product image from supplier API if available
  const supplierData = findSuppliers(idea.name)
  const firstSupplierImage = supplierData.suppliers.find(s => s.image)?.image
  const heroImage = firstSupplierImage || idea.image

  const badges = pickBadges(idea.badges, 2)
  const deckParts = idea.deckLabel.split('\u00b7')

  // Text-led variant: every 5th card
  const isTextLed = cardIndex % 5 === 4

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
    if (!dragRef.current && depth === 0 && onTap) {
      onTap()
    }
    dragRef.current = false
  }

  if (isTextLed) {
    // TEXT-LED VARIANT: hook is the hero, small image inset
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
        initial={{ scale, y: yOff + 30, opacity: 0 }}
        animate={{ scale, y: yOff, opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: depth * 0.04 }}
      >
        {/* Colored background */}
        <div className="w-full h-full flex flex-col p-6 relative" style={{ backgroundColor: idea.bg }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

          {/* Top badges */}
          <div className="relative z-[2] flex justify-between items-start mb-auto">
            <div className="px-2.5 py-1.5 bg-white/20 backdrop-blur-lg rounded-full
              text-[10px] font-medium text-white tracking-[0.08em] uppercase">
              {deckParts[0]?.trim()}
            </div>
            {badges.length > 0 && (
              <div className="flex gap-1.5">
                {badges.map(b => (
                  <span key={b.key} className={`inline-flex items-center gap-1 px-[9px] py-[5px] rounded-full
                    text-[10px] font-semibold tracking-[0.02em] shadow-sm ${b.className}`}>
                    <span className="text-[11px] leading-none">{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hook as hero text */}
          <div className="relative z-[2] flex-1 flex flex-col justify-center">
            <div className="font-display text-[32px] font-light leading-[1.15] tracking-tight text-white mb-4">
              {idea.hook}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-cover bg-center shrink-0 border-2 border-white/20"
                style={{ backgroundImage: `url(${heroImage})`, backgroundColor: '#333' }} />
              <div>
                <div className="text-lg font-medium text-white">{idea.name}</div>
                <div className="text-xs text-white/60">{deckParts[1]?.trim()}</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-[2] flex justify-between items-center pt-4 border-t border-white/15">
            <span className="font-display italic text-sm text-white/90 font-medium cursor-pointer"
              onClick={e => { e.stopPropagation(); setShowCurrency(!showCurrency) }}>
              {capitalText}
              {showCurrency && <span className="text-[10px] text-white/50 ml-1 not-italic font-normal">{currencyName}</span>}
            </span>
            <span className={`text-[11px] font-medium ${EFFORT_COLORS[idea.effort] || 'text-white/60'}`}>
              {EFFORT_LABELS[idea.effort] || 'Medium effort'}
            </span>
          </div>

          {/* Swipe stamps */}
          {depth === 0 && (
            <>
              <motion.div className="absolute top-[30px] right-6 px-[22px] py-2.5 border-[3px] border-sage rounded-lg font-display italic font-semibold text-[28px] text-sage tracking-[0.05em] rotate-12 pointer-events-none z-10" style={{ opacity: likeOpacity }}>SAVE</motion.div>
              <motion.div className="absolute top-[30px] left-6 px-[22px] py-2.5 border-[3px] border-white/80 rounded-lg font-display italic font-semibold text-[28px] text-white/80 tracking-[0.05em] -rotate-12 pointer-events-none z-10" style={{ opacity: nopeOpacity }}>SKIP</motion.div>
            </>
          )}
        </div>

        {showHint && depth === 0 && <SwipeHint />}
      </motion.div>
    )
  }

  // IMAGE-LED VARIANT (default)
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
      initial={{ scale, y: yOff + 30, opacity: 0 }}
      animate={{ scale, y: yOff, opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 28, delay: depth * 0.04 }}
    >
      {/* Image area */}
      <div
        className="w-full h-[64%] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})`, backgroundColor: idea.bg }}
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

        {/* Badges + market signal */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-[2] max-w-[calc(100%-32px)]">
          {(() => {
            const signal = getMarketSignal(idea)
            return signal ? (
              <span className={`inline-flex items-center gap-1 px-[9px] py-[5px] rounded-full
                text-[10px] font-semibold tracking-[0.02em] shadow-[0_2px_6px_rgba(0,0,0,0.12)] ${signal.color}`}>
                {signal.label}
              </span>
            ) : null
          })()}
          {badges.map(b => (
            <span key={b.key} className={`inline-flex items-center gap-1 px-[9px] py-[5px] rounded-full
              text-[10px] font-semibold tracking-[0.02em] shadow-[0_2px_6px_rgba(0,0,0,0.12)] ${b.className}`}>
              <span className="text-[11px] leading-none">{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>

        {/* Swipe stamps */}
        {depth === 0 && (
          <>
            <motion.div className="absolute top-[30px] right-6 px-[22px] py-2.5 border-[3px] border-sage rounded-lg font-display italic font-semibold text-[28px] text-sage tracking-[0.05em] rotate-12 pointer-events-none" style={{ opacity: likeOpacity }}>SAVE</motion.div>
            <motion.div className="absolute top-[30px] left-6 px-[22px] py-2.5 border-[3px] border-accent rounded-lg font-display italic font-semibold text-[28px] text-accent tracking-[0.05em] -rotate-12 pointer-events-none" style={{ opacity: nopeOpacity }}>SKIP</motion.div>
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
          <span className="font-display italic text-sm text-accent-deep font-medium cursor-pointer"
            onClick={e => { e.stopPropagation(); setShowCurrency(!showCurrency) }}>
            {capitalText}
            {showCurrency && <span className="text-[10px] text-ink-mute ml-1 not-italic font-normal">{currencyName}</span>}
          </span>
          <span className={`text-[11px] font-medium ${EFFORT_COLORS[idea.effort] || 'text-ink-mute'}`}>
            {EFFORT_LABELS[idea.effort] || 'Medium effort'}
          </span>
        </div>
      </div>

      {showHint && depth === 0 && <SwipeHint />}
    </motion.div>
  )
}

function SwipeHint() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
      <div className="flex items-center gap-6 px-6 py-3.5 bg-ink/85 backdrop-blur-sm rounded-2xl text-bg text-sm font-medium shadow-xl">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg">&#8592;</span>
          <span className="text-xs opacity-70">Skip</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 px-3 border-l border-r border-white/15">
          <span className="text-lg">&#9758;</span>
          <span className="text-xs text-gold font-semibold">Tap to explore</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg">&#8594;</span>
          <span className="text-xs opacity-70">Save</span>
        </div>
      </div>
      <div className="mt-3 text-[11px] text-bg/60 bg-ink/60 px-3 py-1 rounded-full">Swipe or use buttons below</div>
    </div>
  )
}
