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
      showToast(`Saved · ${idea.name}`)
    }
    if (showHint) onDismissHint()
    setTimeout(() => onCardIdxChange(cardIdx + 1), 300)
  }, [cardIdx, ideas, onSave, onCardIdxChange, showHint, onDismissHint])

  if (cardIdx >= ideas.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-7">
          <div className="text-5xl mb-4 grayscale-[20%]">🎉</div>
          <h3 className="font-display text-[28px] font-normal mb-2 tracking-tight">You've seen them all!</h3>
          <p className="text-sm text-ink-soft leading-relaxed">
            Check your saved ideas or adjust your filters to see more.
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
                onSwipe={handleSwipe}
                onTap={() => { if (showHint) onDismissHint(); onTap(idea) }}
                showHint={i === 0 && showHint}
              />
            )).reverse()}
          </AnimatePresence>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-[18px] px-[22px] pt-2 pb-[22px] shrink-0">
        <button
          onClick={() => handleSwipe('left')}
          className="w-[60px] h-[60px] rounded-full bg-card shadow-sm flex items-center justify-center
            cursor-pointer text-[22px] text-accent transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.92]"
        >
          ✕
        </button>
        <button
          onClick={() => ideas[cardIdx] && onTap(ideas[cardIdx])}
          className="w-[60px] h-[60px] rounded-full bg-card shadow-sm flex items-center justify-center
            cursor-pointer text-[18px] text-ink-soft transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.92]"
        >
          ℹ
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="w-[70px] h-[70px] rounded-full bg-card shadow-sm flex items-center justify-center
            cursor-pointer text-[26px] text-sage transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.92]"
        >
          ♡
        </button>
      </div>
    </>
  )
}
