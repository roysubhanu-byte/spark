import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Idea, Region } from '../types'
import { SwipeCard } from './SwipeCard'
import { showToast } from './Toast'

interface Props {
  ideas: Idea[]
  region: Region
  cardIdx: number
  onCardIdxChange: (idx: number) => void
  onSave: (idea: Idea) => void
  onTap: (idea: Idea) => void
  showHint: boolean
  onDismissHint: () => void
}

export function DeckStage({ ideas, region, cardIdx, onCardIdxChange, onSave, onTap, showHint, onDismissHint }: Props) {
  const handleSwipe = useCallback((dir: 'left' | 'right') => {
    const idea = ideas[cardIdx]
    if (!idea) return
    if (dir === 'right') {
      onSave(idea)
      showToast(`Saved \u00b7 ${idea.name}`)
    }
    if (showHint) onDismissHint()
    onCardIdxChange(cardIdx + 1)
  }, [cardIdx, ideas, onSave, onCardIdxChange, showHint, onDismissHint])

  // Empty deck state
  if (cardIdx >= ideas.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-8 max-w-[320px]">
          {/* Calm illustration */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sage/20 to-accent/10" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-sage/30 to-gold/20 flex items-center justify-center">
              <span className="text-4xl">&#10024;</span>
            </div>
          </div>
          <h3 className="font-display text-[24px] font-light mb-3 tracking-tight leading-tight">
            You've explored {cardIdx} ideas
          </h3>
          <p className="text-sm text-ink-soft leading-relaxed mb-5">
            That's everything matching your filters. Try changing your interests or deck type to discover more.
          </p>
        </div>
      </div>
    )
  }

  const visible = ideas.slice(cardIdx, cardIdx + 3)

  return (
    <>
      <div className="flex-1 relative px-[22px] py-2 flex items-center justify-center">
        <div className="relative w-full max-w-[360px]" style={{ aspectRatio: '3/4.4' }}>
          <AnimatePresence mode="popLayout">
            {visible.map((idea, i) => (
              <SwipeCard
                key={`${cardIdx}-${idea.id}`}
                idea={idea}
                region={region}
                depth={i}
                cardIndex={cardIdx + i}
                onSwipe={handleSwipe}
                onTap={() => { if (showHint) onDismissHint(); onTap(idea) }}
                showHint={i === 0 && showHint}
              />
            )).reverse()}
          </AnimatePresence>
        </div>
      </div>

      {/* Action buttons with labels */}
      <div className="flex justify-center items-end gap-[18px] px-[22px] pt-2 pb-[22px] shrink-0">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => handleSwipe('left')}
            className="w-[56px] h-[56px] rounded-full bg-card shadow-sm flex items-center justify-center
              cursor-pointer text-[20px] text-accent transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.92]
              border border-line-soft"
          >
            ✕
          </button>
          <span className="text-[10px] text-ink-mute font-medium">Skip</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => ideas[cardIdx] && onTap(ideas[cardIdx])}
            className="w-[56px] h-[56px] rounded-full bg-card shadow-sm flex items-center justify-center
              cursor-pointer text-[16px] text-ink-soft transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.92]
              border border-line-soft"
          >
            &#8505;
          </button>
          <span className="text-[10px] text-ink-mute font-medium">Details</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => handleSwipe('right')}
            className="w-[66px] h-[66px] rounded-full bg-sage/10 shadow-sm flex items-center justify-center
              cursor-pointer text-[24px] text-sage transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.92]
              border-2 border-sage/30"
          >
            &#9825;
          </button>
          <span className="text-[10px] text-sage font-semibold">Save</span>
        </div>
      </div>
    </>
  )
}
