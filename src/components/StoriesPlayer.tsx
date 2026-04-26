import { useState, useEffect, useRef, useCallback } from 'react'
import type { Idea, Region, SectionKey } from '../types'
import { SECTION_KEYS, SECTION_LABELS, SECTION_EYEBROW } from '../lib/constants'
import { showToast } from './Toast'

interface Props {
  idea: Idea
  region: Region
  addedSections: Set<string>
  onAddTodo: (section: SectionKey) => void
  onClose: () => void
}

export function StoriesPlayer({ idea, region, addedSections, onAddTodo, onClose }: Props) {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const sectionKey = SECTION_KEYS[idx]
  const section = idea.breakdown[sectionKey]
  const isDistributors = sectionKey === 'distributors'

  // Region-aware body for distributors
  let bodyHtml = section.body
  const regionalBody = idea.distributors?.[region]
  if (sectionKey === 'distributors' && regionalBody) {
    bodyHtml = regionalBody
  }

  const isAdded = addedSections.has(sectionKey)

  const advance = useCallback(() => {
    if (idx < SECTION_KEYS.length - 1) setIdx(i => i + 1)
    else onClose()
  }, [idx, onClose])

  // Auto-advance (distributors gets 15s instead of 8s — more to read)
  useEffect(() => {
    const delay = isDistributors ? 15000 : 8000
    timerRef.current = setTimeout(advance, delay)
    return () => clearTimeout(timerRef.current)
  }, [idx, isDistributors, advance])

  function handleAction() {
    if (isAdded) return
    onAddTodo(sectionKey)
    showToast('Added to your plan')
  }

  return (
    <div className="absolute inset-0 bg-[#1F1B16] text-bg flex flex-col z-50">
      {/* Blurred bg */}
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.18] blur-[30px] saturate-[1.4]"
        style={{ backgroundImage: `url(${idea.image})`, backgroundColor: idea.bg }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1B16]/40 to-[#1F1B16]/95" />
      </div>

      {/* Progress bars */}
      <div className="relative z-[4] flex gap-1 px-4 pt-3.5">
        {SECTION_KEYS.map((_, i) => (
          <div key={i} className="flex-1 h-[2.5px] bg-white/25 rounded-sm overflow-hidden">
            <div
              className={`h-full bg-white transition-[width] ${
                i < idx ? 'w-full' : i === idx ? 'w-full' : 'w-0'
              }`}
              style={i === idx ? { transition: `width ${isDistributors ? '15' : '8'}s linear` } : undefined}
            />
          </div>
        ))}
      </div>

      {/* Header — z-[4] above tap zones z-[3] */}
      <div className="relative z-[4] flex items-center justify-between px-[18px] py-4">
        <div className="flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-full bg-cover bg-center border-2 border-white/20"
            style={{ backgroundImage: `url(${idea.image})` }} />
          <div>
            <div className="font-display text-base font-medium tracking-tight">{idea.name}</div>
            <div className="text-[11px] text-white/60 uppercase tracking-[0.12em]">{SECTION_LABELS[sectionKey]}</div>
          </div>
        </div>
        <button onClick={onClose} className="relative z-[4] bg-transparent border-none text-white text-2xl cursor-pointer p-1 px-2.5">✕</button>
      </div>

      {/* Content */}
      <div className="relative z-[4] flex-1 flex flex-col justify-center px-7 pb-6">
        <div className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-gold mb-4">
          {SECTION_EYEBROW[sectionKey]}
        </div>
        <h2 className="font-display font-light text-4xl leading-[1.1] tracking-tight mb-[22px]">
          {SECTION_LABELS[sectionKey]}
        </h2>
        <div className="text-base leading-[1.6] text-bg/85 mb-[26px] [&_strong]:text-bg [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: bodyHtml }} />

        {section.stats && (
          <div className="flex gap-4 mb-[26px]">
            {section.stats.map((s, i) => (
              <div key={i} className="flex-1 px-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl">
                <div className="text-[10px] uppercase tracking-[0.12em] text-white/50 mb-1">{s.label}</div>
                <div className="font-display italic text-[22px] font-medium">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleAction}
          className={`relative z-[4] flex items-center gap-3 px-[18px] py-4 border rounded-[14px] cursor-pointer
            transition-all w-full font-body text-left text-white
            ${isAdded ? 'bg-sage border-sage' : 'bg-white/[0.08] border-white/15 hover:bg-accent hover:border-accent'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0
            ${isAdded ? 'bg-white/25' : 'bg-white/15'}`}>
            {isAdded ? '✓' : '+'}
          </div>
          <div className="flex-1">
            <div className="text-[11px] opacity-70 uppercase tracking-[0.1em]">
              {isAdded ? 'Added to plan' : 'Take action'}
            </div>
            <div className="text-sm font-medium mt-0.5">{section.action}</div>
          </div>
        </button>
      </div>

      {/* Tap zones — z-[3] sits above content z-[2], but below interactive buttons z-[4] */}
      <div className="absolute inset-0 z-[3] flex">
        <div className="flex-[0.35] cursor-pointer" onClick={() => idx > 0 && setIdx(i => i - 1)} />
        <div className="flex-1 cursor-pointer" onClick={advance} />
      </div>

      {/* Navigation hints — visible at bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-[4] flex justify-between px-6 pointer-events-none">
        <span className={`text-xs text-white/40 ${idx === 0 ? 'opacity-0' : ''}`}>
          &#8592; Tap left
        </span>
        <span className="text-xs text-white/40">
          {idx < SECTION_KEYS.length - 1 ? 'Tap right \u2192' : 'Tap to close \u2192'}
        </span>
      </div>

      {/* Section dots — tap to jump to any section */}
      <div className="absolute bottom-10 left-0 right-0 z-[4] flex justify-center gap-2">
        {SECTION_KEYS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all
              ${i === idx ? 'bg-white w-5' : i < idx ? 'bg-white/50' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  )
}
