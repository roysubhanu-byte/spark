import { useState, useCallback, useMemo } from 'react'
import { PhoneFrame } from './components/PhoneFrame'
import { Toast, showToast } from './components/Toast'
import { BottomNav } from './components/BottomNav'
import { Topbar } from './components/Topbar'
import { TrustStrip } from './components/TrustStrip'
import { RegionPicker } from './components/RegionPicker'
import { Welcome, DeckPicker, ChannelPicker, InterestChips } from './components/Onboarding'
import { DeckStage } from './components/DeckStage'
import { InspireProfileFeed } from './components/InspireProfileFeed'
import { StoriesPlayer } from './components/StoriesPlayer'
import { TodoList } from './components/TodoList'
import { useStore } from './hooks/useStore'
import { useDeck } from './hooks/useDeck'
import type { Idea, SectionKey } from './types'
import { IDEAS, MACRO_VARIATIONS, INSPIRE_PROFILES } from './data'

export default function App() {
  const store = useStore()
  const filteredIdeas = useDeck(IDEAS, store.q2, store.q1, store.interests, store.region)

  // Inspire + Stories state
  const [inspireIdea, setInspireIdea] = useState<Idea | null>(null)
  const [storiesIdea, setStoriesIdea] = useState<Idea | null>(null)

  const addedSections = useMemo(() => {
    if (!storiesIdea) return new Set<string>()
    return new Set(store.todos.filter(t => t.ideaId === storiesIdea.id).map(t => t.section))
  }, [storiesIdea, store.todos])

  // Onboarding navigation
  const handleOnbNext = useCallback(() => {
    if (store.screen === 'welcome') store.setScreen('q2-deck')
    else if (store.screen === 'q2-deck') {
      if (store.q2 === 'physical') store.setScreen('q1-channel')
      else {
        store.setQ1('online')
        store.setScreen('q3-interests')
      }
    }
    else if (store.screen === 'q1-channel') store.setScreen('q3-interests')
    else if (store.screen === 'q3-interests') store.finishOnboarding()
  }, [store])

  // Deck interactions
  const handleSave = useCallback((idea: Idea) => {
    store.saveIdea(idea.id)
    // Check for macro variations
    const hasMacro = MACRO_VARIATIONS[idea.id]?.length > 0
    if (hasMacro) {
      // For now, go straight to inspire (macro deck to be added)
      setTimeout(() => setInspireIdea(idea), 480)
    } else {
      setTimeout(() => setInspireIdea(idea), 480)
    }
  }, [store])

  const handlePeek = useCallback((idea: Idea) => {
    setInspireIdea(idea)
  }, [])

  const handleImIn = useCallback(() => {
    if (inspireIdea) {
      setStoriesIdea(inspireIdea)
      setInspireIdea(null)
    }
  }, [inspireIdea])

  const handleCloseInspire = useCallback(() => {
    setInspireIdea(null)
  }, [])

  const handleCloseStories = useCallback(() => {
    setStoriesIdea(null)
  }, [])

  const handleAddTodo = useCallback((section: SectionKey) => {
    if (storiesIdea) store.addTodo(storiesIdea, section)
  }, [storiesIdea, store])

  const handleRegionPick = useCallback((r: typeof store.region) => {
    store.setRegion(r)
    store.setRegionModalOpen(false)
    showToast(`Switched to ${r}`)
  }, [store])

  // Screen rendering
  const isOnboarding = ['welcome', 'q2-deck', 'q1-channel', 'q3-interests'].includes(store.screen)
  const showNav = !isOnboarding && !inspireIdea && !storiesIdea
  const showTopbar = store.screen === 'deck' && !inspireIdea && !storiesIdea

  return (
    <PhoneFrame>
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        <Toast />

        {/* Onboarding screens */}
        {store.screen === 'welcome' && <Welcome onContinue={handleOnbNext} />}
        {store.screen === 'q2-deck' && (
          <DeckPicker value={store.q2} onChange={store.setQ2} onContinue={handleOnbNext} />
        )}
        {store.screen === 'q1-channel' && (
          <ChannelPicker value={store.q1} onChange={store.setQ1} onContinue={handleOnbNext} />
        )}
        {store.screen === 'q3-interests' && (
          <InterestChips selected={store.interests} onToggle={store.toggleInterest} onContinue={handleOnbNext} />
        )}

        {/* Main screens */}
        {store.screen === 'deck' && !inspireIdea && !storiesIdea && (
          <div className="flex flex-col h-full">
            {showTopbar && (
              <Topbar region={store.region} savedCount={store.saved.length}
                onOpenRegion={() => store.setRegionModalOpen(true)} />
            )}
            <TrustStrip />
            <DeckStage ideas={filteredIdeas} region={store.region}
              cardIdx={store.cardIdx} onCardIdxChange={store.setCardIdx}
              onSave={handleSave} onPeek={handlePeek} />
          </div>
        )}

        {store.screen === 'todos' && !inspireIdea && !storiesIdea && (
          <TodoList todos={store.todos} onToggle={store.toggleTodo} />
        )}

        {store.screen === 'saved' && !inspireIdea && !storiesIdea && (
          <div className="flex-1 flex flex-col h-full">
            <div className="px-6 pt-5 pb-3 border-b border-line-soft">
              <h1 className="font-display font-light text-[32px] tracking-tight mb-1">
                {store.saved.length} <em className="italic text-accent font-normal">saved</em>.
              </h1>
              <p className="text-[13px] text-ink-mute">Tap to revisit the breakdown.</p>
            </div>
            <div className="flex-1 overflow-y-auto px-[22px] pt-4 pb-20 scrollbar-hide">
              {store.saved.length === 0 ? (
                <div className="text-center py-[60px]">
                  <div className="text-[44px] mb-3.5">💖</div>
                  <h3 className="font-display text-2xl font-normal mb-1.5">Nothing saved yet</h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed">
                    Swipe right on an idea to save it.<br/>Open it anytime from here.
                  </p>
                </div>
              ) : (
                store.saved.map(id => {
                  const idea = IDEAS.find(i => i.id === id)
                  if (!idea) return null
                  return (
                    <div key={id} onClick={() => setInspireIdea(idea)}
                      className="flex items-center gap-3 px-3.5 py-3.5 bg-card border border-line-soft rounded-xl mb-2.5 cursor-pointer hover:border-line">
                      <div className="w-12 h-12 rounded-[10px] bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${idea.image})` }} />
                      <div className="flex-1 ml-1">
                        <div className="font-display text-base font-medium">{idea.name}</div>
                        <div className="text-xs text-ink-mute mt-0.5">{idea.deckLabel} · {idea.capital}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Inspire overlay */}
        {inspireIdea && (
          <InspireProfileFeed
            productName={inspireIdea.name}
            profiles={INSPIRE_PROFILES[inspireIdea.id] || []}
            onImIn={handleImIn}
            onNotForMe={handleCloseInspire}
          />
        )}

        {/* Stories overlay */}
        {storiesIdea && (
          <StoriesPlayer
            idea={storiesIdea}
            region={store.region}
            addedSections={addedSections}
            onAddTodo={handleAddTodo}
            onClose={handleCloseStories}
          />
        )}

        {/* Bottom nav */}
        {showNav && (
          <BottomNav active={store.screen as any} openTodos={store.openTodos}
            onNav={(s) => store.setScreen(s)} />
        )}

        {/* Region picker */}
        <RegionPicker
          open={store.regionModalOpen}
          current={store.region}
          onPick={handleRegionPick}
          onClose={() => store.setRegionModalOpen(false)}
        />
      </div>
    </PhoneFrame>
  )
}
