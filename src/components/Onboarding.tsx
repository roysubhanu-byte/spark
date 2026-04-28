import { motion } from 'framer-motion'
import { INTERESTS } from '../lib/constants'
import type { DeckPref, ChannelPref } from '../types'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5,  },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

const cardItem = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35,  } },
}

interface WelcomeProps { onContinue: () => void }
export function Welcome({ onContinue }: WelcomeProps) {
  return (
    <motion.div
      className="flex flex-col h-full px-7 pt-6 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Stacked card illustration */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="relative w-[220px] h-[280px]">
          {[
            { rot: '-8deg', tx: '-30px', ty: '8px', bg: 'linear-gradient(135deg, #C99A4B, #8E4128)', label: 'candles', delay: 0.3 },
            { rot: '4deg', tx: '20px', ty: '-4px', bg: 'linear-gradient(135deg, #5C7A5C, #3a4f3a)', label: 'pet treats', delay: 0.15 },
            { rot: '-2deg', tx: '0', ty: '0', bg: 'linear-gradient(135deg, #B85C3C, #8E4128)', label: 'curry paste', delay: 0 },
          ].map((c, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-[18px] shadow-lg bg-cover bg-center"
              style={{ background: c.bg }}
              initial={{ opacity: 0, scale: 0.8, rotate: 0, x: 0, y: 40 }}
              animate={{
                opacity: 1, scale: 1,
                rotate: parseFloat(c.rot),
                x: parseFloat(c.tx),
                y: parseFloat(c.ty),
              }}
              transition={{ duration: 0.6, delay: c.delay,  }}
            >
              <div className="absolute bottom-4 left-4 right-4 text-white font-display italic text-lg font-normal drop-shadow-md">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Text content */}
      <motion.div className="shrink-0" {...fadeUp} transition={{ delay: 0.4, duration: 0.5 }}>
        <div className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent mb-3.5">
          Find what to start
        </div>
        <h1 className="font-display font-light text-[42px] leading-[1.05] tracking-tight text-ink mb-3.5">
          700+ ways to <em className="italic font-normal text-accent">begin</em>.<br/>Swipe to find yours.
        </h1>
        <p className="text-[15px] leading-[1.55] text-ink-soft mb-8">
          Every idea is researched. Real costs, real suppliers, real profit math. Pick one and start this week.
        </p>
        <motion.button
          onClick={onContinue}
          className="w-full py-[18px] bg-ink text-bg rounded-2xl font-body text-[15px] font-medium
            tracking-[0.01em] cursor-pointer transition-all hover:bg-accent-deep active:scale-[0.98]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          Let's go
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

interface DeckPickerProps {
  value: DeckPref | null
  onChange: (v: DeckPref) => void
  onContinue: () => void
}
export function DeckPicker({ value, onChange, onContinue }: DeckPickerProps) {
  const opts: { value: DeckPref; icon: string; title: string; sub: string }[] = [
    { value: 'physical', icon: '📦', title: 'Physical products', sub: 'Make and sell real things — candles, jewelry, pet products' },
    { value: 'saas', icon: '⚡', title: 'Software / SaaS', sub: 'Build an app, tool, or AI product' },
    { value: 'all', icon: '🎲', title: 'Show me everything', sub: "I'm open to anything that works" },
  ]

  return (
    <OnbLayout step={1} total={3} title={<>What do you want to <em className="italic font-normal text-accent">sell</em>?</>}
      sub="Pick whatever feels right. You can always change this later."
      ctaEnabled={!!value} onContinue={onContinue}>
      <motion.div className="flex flex-col gap-3" variants={stagger} initial="initial" animate="animate">
        {opts.map(o => (
          <motion.button key={o.value} variants={cardItem} onClick={() => onChange(o.value)}
            className={`flex items-center gap-3.5 px-5 py-[18px] border rounded-2xl cursor-pointer transition-all text-left w-full font-body
              ${value === o.value ? 'bg-ink border-ink text-bg shadow-lg scale-[1.02]' : 'bg-card border-line-soft text-ink hover:border-line hover:-translate-y-px'}`}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-[22px] leading-none">{o.icon}</span>
            <span className="flex-1">
              <div className="text-[15px] font-medium">{o.title}</div>
              <div className={`text-xs mt-0.5 ${value === o.value ? 'text-bg/65' : 'text-ink-mute'}`}>{o.sub}</div>
            </span>
            <motion.span
              className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0
                ${value === o.value ? 'bg-accent border-accent' : 'border-line'}`}
              animate={value === o.value ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {value === o.value && <span className="text-white text-xs font-bold">✓</span>}
            </motion.span>
          </motion.button>
        ))}
      </motion.div>
    </OnbLayout>
  )
}

interface ChannelPickerProps {
  value: ChannelPref | null
  onChange: (v: ChannelPref) => void
  onContinue: () => void
}
export function ChannelPicker({ value, onChange, onContinue }: ChannelPickerProps) {
  const opts: { value: ChannelPref; icon: string; title: string; sub: string }[] = [
    { value: 'online', icon: '🌐', title: 'Online', sub: 'Amazon, Etsy, Instagram, your own store' },
    { value: 'offline', icon: '📍', title: 'Offline', sub: 'Local market, exhibitions, retail stalls' },
    { value: 'both', icon: '✨', title: 'Both', sub: 'Sell wherever the customer is' },
  ]

  return (
    <OnbLayout step={2} total={3} title={<>Where do you want to <em className="italic font-normal text-accent">sell</em>?</>}
      sub="Same product, different reach. You can always change this."
      ctaEnabled={!!value} onContinue={onContinue}>
      <motion.div className="flex flex-col gap-3" variants={stagger} initial="initial" animate="animate">
        {opts.map(o => (
          <motion.button key={o.value} variants={cardItem} onClick={() => onChange(o.value)}
            className={`flex items-center gap-3.5 px-5 py-[18px] border rounded-2xl cursor-pointer transition-all text-left w-full font-body
              ${value === o.value ? 'bg-ink border-ink text-bg shadow-lg scale-[1.02]' : 'bg-card border-line-soft text-ink hover:border-line hover:-translate-y-px'}`}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-[22px] leading-none">{o.icon}</span>
            <span className="flex-1">
              <div className="text-[15px] font-medium">{o.title}</div>
              <div className={`text-xs mt-0.5 ${value === o.value ? 'text-bg/65' : 'text-ink-mute'}`}>{o.sub}</div>
            </span>
            <motion.span
              className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0
                ${value === o.value ? 'bg-accent border-accent' : 'border-line'}`}
              animate={value === o.value ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {value === o.value && <span className="text-white text-xs font-bold">✓</span>}
            </motion.span>
          </motion.button>
        ))}
      </motion.div>
    </OnbLayout>
  )
}

interface InterestChipsProps {
  selected: Set<string>
  onToggle: (id: string) => void
  onContinue: () => void
}
export function InterestChips({ selected, onToggle, onContinue }: InterestChipsProps) {
  return (
    <OnbLayout step={3} total={3} title={<>What <em className="italic font-normal text-accent">interests</em> you?</>}
      sub="Pick a few. We'll show the best ideas for you first."
      ctaEnabled={selected.size > 0} onContinue={onContinue}
      ctaLabel={selected.size > 0 ? `Show my ideas (${selected.size} selected)` : 'Continue'}
    >
      <motion.div className="grid grid-cols-2 gap-2.5" variants={stagger} initial="initial" animate="animate">
        {INTERESTS.map(i => (
          <motion.button key={i.id} variants={cardItem} onClick={() => onToggle(i.id)}
            className={`flex items-center gap-2.5 px-4 py-3.5 border rounded-[14px] cursor-pointer
              transition-all font-body text-sm font-medium
              ${selected.has(i.id) ? 'bg-ink border-ink text-bg shadow-md' : 'bg-card border-line-soft text-ink hover:border-line'}`}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{i.emoji}</span>
            {i.label}
          </motion.button>
        ))}
      </motion.div>
    </OnbLayout>
  )
}

// Shared layout with animations
function OnbLayout({ step, total, title, sub, ctaEnabled, onContinue, children, ctaLabel }: {
  step: number; total: number; title: React.ReactNode; sub: string
  ctaEnabled: boolean; onContinue: () => void; children: React.ReactNode
  ctaLabel?: string
}) {
  return (
    <motion.div
      className="flex flex-col h-full px-7 pt-6 pb-8"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4,  }}
    >
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-9">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 h-[3px] rounded-sm overflow-hidden bg-line">
            <motion.div
              className={i < step ? 'bg-accent' : i === step - 1 ? 'bg-ink' : 'bg-transparent'}
              style={{ height: '100%' }}
              initial={{ width: i < step - 1 ? '100%' : '0%' }}
              animate={{ width: i < step ? '100%' : '0%' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center overflow-y-auto scrollbar-hide">
        <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.4 }}>
          <div className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-accent mb-3.5">
            Step {step} of {total}
          </div>
          <h2 className="font-display font-light text-[38px] leading-[1.05] tracking-tight text-ink mb-3">
            {title}
          </h2>
          <p className="text-[15px] leading-[1.55] text-ink-soft mb-7">{sub}</p>
        </motion.div>
        {children}
      </div>

      <motion.button
        onClick={onContinue}
        disabled={!ctaEnabled}
        className="mt-5 w-full py-[18px] bg-ink text-bg rounded-2xl font-body text-[15px] font-medium
          tracking-[0.01em] cursor-pointer transition-all shrink-0
          hover:bg-accent-deep active:scale-[0.98]
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-ink"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        whileTap={ctaEnabled ? { scale: 0.97 } : {}}
      >
        {ctaLabel || 'Continue'}
      </motion.button>
    </motion.div>
  )
}
