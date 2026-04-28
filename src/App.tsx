import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { Toast, showToast } from './components/Toast'
import { BottomNav } from './components/BottomNav'
import { Topbar } from './components/Topbar'
import { TrustStrip } from './components/TrustStrip'
import { RegionPicker } from './components/RegionPicker'
import { FilterSheet } from './components/FilterSheet'
import { Welcome, DeckPicker, ChannelPicker, InterestChips } from './components/Onboarding'
import { DeckStage } from './components/DeckStage'
import { ProductPage } from './components/ProductPage'
import { StoriesPlayer } from './components/StoriesPlayer'
import { LaunchPlan } from './components/LaunchPlan'
import { TodoList } from './components/TodoList'
import { SparkCoach } from './components/SparkCoach'
import { useStore } from './hooks/useStore'
import { useDeck } from './hooks/useDeck'
import { useAuth } from './hooks/useAuth'
import { useSupabaseSync } from './hooks/useSupabaseSync'
import { usePushNotifications } from './hooks/usePushNotifications'
import type { Idea, SectionKey } from './types'
import { IDEAS, INSPIRE_PROFILES } from './data'

export default function App() {
  const store = useStore()
  const { user } = useAuth()
  const { syncSave, syncPlanStart, syncTaskComplete, syncProfile } = useSupabaseSync(user, store)
  const filteredIdeas = useDeck(IDEAS, store.q2, store.q1, store.interests, store.region)
  const push = usePushNotifications()
  const [filterOpen, setFilterOpen] = useState(false)

  // Overlay state
  const [productIdea, setProductIdea] = useState<Idea | null>(null)
  const [storiesIdea, setStoriesIdea] = useState<Idea | null>(null)
  const [, setStoriesStartAt] = useState<SectionKey>('strategy')
  const [planIdea, setPlanIdea] = useState<Idea | null>(null)
  const [coachOpen, setCoachOpen] = useState(false)

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
    else if (store.screen === 'q3-interests') {
      store.finishOnboarding()
      syncProfile()
    }
  }, [store, syncProfile])

  // Deck → Save (swipe right)
  const handleSave = useCallback((idea: Idea) => {
    store.saveIdea(idea.id)
    syncSave(idea.id)
  }, [store, syncSave])

  // Deck → Tap card → open product page
  const handleTapCard = useCallback((idea: Idea) => {
    setProductIdea(idea)
  }, [])

  // Product page → open stories at specific section
  const handleOpenStories = useCallback((startAt: SectionKey) => {
    if (productIdea) {
      setStoriesIdea(productIdea)
      setStoriesStartAt(startAt)
    }
  }, [productIdea])

  // Product page → "I'm in — start my 30-day plan"
  const handleStartPlan = useCallback(() => {
    if (productIdea) {
      store.startPlan(productIdea)
      syncPlanStart(productIdea.id, productIdea.name, productIdea.image)
      showToast(`Plan started for ${productIdea.name}!`)
      setProductIdea(null)
      setPlanIdea(productIdea)

      // Ask for push notification permission on first plan start
      if (push.supported && push.permission !== 'granted' && push.permission !== 'denied') {
        setTimeout(() => {
          push.requestPermission().then((granted) => {
            if (granted) {
              push.scheduleDaily(1, productIdea.name)
            }
          })
        }, 2000) // slight delay so plan animation finishes first
      } else if (push.enabled) {
        push.scheduleDaily(1, productIdea.name)
      }
    }
  }, [productIdea, store, syncPlanStart, push])

  // Stories → add todo
  const handleAddTodo = useCallback((section: SectionKey) => {
    if (storiesIdea) store.addTodo(storiesIdea, section)
  }, [storiesIdea, store])

  // Region
  const handleRegionPick = useCallback((r: typeof store.region) => {
    store.setRegion(r)
    store.setRegionModalOpen(false)
    showToast(`Switched to ${r}`)
  }, [store])

  // Navigation
  const isOnboarding = ['welcome', 'q2-deck', 'q1-channel', 'q3-interests'].includes(store.screen)
  const hasOverlay = !!productIdea || !!storiesIdea || !!planIdea
  const showNav = !isOnboarding && !hasOverlay
  const showTopbar = store.screen === 'deck' && !hasOverlay

  return (
    <PhoneFrame>
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        <Toast />

        {/* === ONBOARDING === */}
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

        {/* === MAIN: DECK === */}
        {store.screen === 'deck' && !hasOverlay && (
          <div className="flex flex-col h-full">
            {showTopbar && (
              <Topbar region={store.region} deckPref={store.q2} savedCount={store.saved.length}
                onOpenRegion={() => store.setRegionModalOpen(true)}
                onOpenFilter={() => setFilterOpen(true)} />
            )}
            <TrustStrip />
            <DeckStage
              ideas={filteredIdeas}
              region={store.region}
              cardIdx={store.cardIdx}
              onCardIdxChange={store.setCardIdx}
              onSave={handleSave}
              onTap={handleTapCard}
              showHint={store.showFirstTimeHint}
              onDismissHint={store.dismissHint}
            />
          </div>
        )}

        {/* === MAIN: MY PLANS === */}
        {store.screen === 'todos' && !hasOverlay && (
          <div className="flex-1 flex flex-col h-full">
            <div className="px-6 pt-5 pb-3 border-b border-line-soft">
              <h1 className="font-display font-light text-[32px] tracking-tight mb-1">
                My <em className="italic text-accent font-normal">plans</em>
              </h1>
              <p className="text-[13px] text-ink-mute">
                {store.activePlans.length > 0
                  ? `${store.activePlans.length} active plan${store.activePlans.length > 1 ? 's' : ''}`
                  : 'Start a plan by tapping any idea'}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-[22px] pt-4 pb-20 scrollbar-hide">
              {store.activePlans.length === 0 ? (
                <div className="text-center py-[60px]">
                  <div className="text-[44px] mb-3.5">📋</div>
                  <h3 className="font-display text-2xl font-normal mb-1.5">No plans yet</h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed">
                    Swipe or tap any idea, then hit<br/>"I'm in" to start your 30-day plan.
                  </p>
                </div>
              ) : (
                store.activePlans.map(plan => {
                  const idea = IDEAS.find(i => i.id === plan.ideaId)
                  const completed = plan.tasks.filter(t => t.completed).length
                  const progress = Math.round((completed / 30) * 100)
                  return (
                    <div key={plan.ideaId}
                      onClick={() => idea && setPlanIdea(idea)}
                      className="flex items-center gap-3.5 px-4 py-4 bg-card border border-line-soft rounded-xl mb-3 cursor-pointer hover:border-line transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${plan.ideaImage})` }} />
                      <div className="flex-1">
                        <div className="font-display text-base font-medium">{plan.ideaName}</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-1 h-1.5 bg-line rounded-full overflow-hidden">
                            <div className="h-full bg-sage rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-[11px] text-ink-mute tabular-nums">{progress}%</span>
                        </div>
                        {plan.streak > 0 && (
                          <div className="text-[11px] text-gold font-medium mt-1">🔥 {plan.streak} day streak</div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}

              {/* Also show legacy todos if any */}
              {store.todos.length > 0 && (
                <div className="mt-6">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-ink-mute font-medium mb-3">Quick tasks</div>
                  <TodoList todos={store.todos} onToggle={store.toggleTodo} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* === MAIN: SAVED === */}
        {store.screen === 'saved' && !hasOverlay && (
          <div className="flex-1 flex flex-col h-full">
            <div className="px-6 pt-5 pb-3 border-b border-line-soft">
              <h1 className="font-display font-light text-[32px] tracking-tight mb-1">
                {store.saved.length} <em className="italic text-accent font-normal">saved</em>
              </h1>
              <p className="text-[13px] text-ink-mute">Tap to revisit.</p>
            </div>
            <div className="flex-1 overflow-y-auto px-[22px] pt-4 pb-20 scrollbar-hide">
              {store.saved.length === 0 ? (
                <div className="text-center py-[60px]">
                  <div className="text-[44px] mb-3.5">💖</div>
                  <h3 className="font-display text-2xl font-normal mb-1.5">Nothing saved yet</h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed">
                    Swipe right or tap the heart to save ideas.
                  </p>
                </div>
              ) : (
                store.saved.map(id => {
                  const idea = IDEAS.find(i => i.id === id)
                  if (!idea) return null
                  const hasPlan = store.activePlans.some(p => p.ideaId === id)
                  return (
                    <div key={id} onClick={() => setProductIdea(idea)}
                      className="flex items-center gap-3 px-3.5 py-3.5 bg-card border border-line-soft rounded-xl mb-2.5 cursor-pointer hover:border-line">
                      <div className="w-12 h-12 rounded-[10px] bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${idea.image})` }} />
                      <div className="flex-1 ml-1">
                        <div className="font-display text-base font-medium">{idea.name}</div>
                        <div className="text-xs text-ink-mute mt-0.5">{idea.capital} · {idea.deck}</div>
                      </div>
                      {hasPlan && (
                        <span className="text-[10px] uppercase tracking-[0.08em] font-medium px-2 py-1 rounded-full bg-sage/10 text-sage">
                          Active
                        </span>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* === MAIN: SETTINGS === */}
        {store.screen === 'settings' && !hasOverlay && (
          <div className="flex-1 flex flex-col h-full">
            <div className="px-6 pt-5 pb-3 border-b border-line-soft">
              <h1 className="font-display font-light text-[32px] tracking-tight mb-1">
                Settings
              </h1>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pt-6 pb-20 scrollbar-hide space-y-3">
              <div className="bg-card border border-line-soft rounded-xl p-4">
                <div className="text-sm font-medium text-ink mb-1">Your preferences</div>
                <div className="text-xs text-ink-mute mb-3">
                  Deck: {store.q2 || 'All'} | Channel: {store.q1 || 'Both'} | Interests: {store.interests.size > 0 ? Array.from(store.interests).join(', ') : 'None'}
                </div>
                <button onClick={() => { store.setScreen('q2-deck') }}
                  className="text-sm text-accent font-medium bg-transparent border-none cursor-pointer p-0">
                  Change preferences
                </button>
              </div>

              <div className="bg-card border border-line-soft rounded-xl p-4">
                <div className="text-sm font-medium text-ink mb-1">Stats</div>
                <div className="text-xs text-ink-mute space-y-1">
                  <div>Ideas explored: {store.cardIdx}</div>
                  <div>Ideas saved: {store.saved.length}</div>
                  <div>Active plans: {store.activePlans.length}</div>
                </div>
              </div>

              {/* Push notifications */}
              <div className="bg-card border border-line-soft rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-ink">Daily reminders</div>
                    <div className="text-xs text-ink-mute mt-0.5">
                      {push.enabled ? 'You\'ll get daily plan reminders at 9 AM' : 'Get reminded to work on your plan daily'}
                    </div>
                  </div>
                  <button
                    onClick={() => push.requestPermission()}
                    disabled={push.permission === 'denied' || !push.supported}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border-none
                      ${push.enabled
                        ? 'bg-sage/20 text-sage'
                        : push.permission === 'denied'
                        ? 'bg-line text-ink-mute cursor-not-allowed'
                        : 'bg-ink text-bg hover:bg-accent-deep'
                      }`}
                  >
                    {push.enabled ? 'On' : push.permission === 'denied' ? 'Blocked' : 'Enable'}
                  </button>
                </div>
              </div>

              <button onClick={() => {
                if (confirm('This will reset everything. Are you sure?')) {
                  store.resetAll()
                }
              }}
                className="w-full py-3.5 bg-accent/10 text-accent rounded-xl font-body text-sm font-medium
                  cursor-pointer border border-accent/20 transition-all hover:bg-accent/20">
                Reset app and start fresh
              </button>

              <div className="flex gap-4 justify-center pt-4">
                <a href="/privacy" className="text-xs text-ink-mute hover:text-ink">Privacy Policy</a>
                <a href="/terms" className="text-xs text-ink-mute hover:text-ink">Terms of Service</a>
              </div>
            </div>
          </div>
        )}

        {/* === OVERLAY: PRODUCT PAGE === */}
        <AnimatePresence>
        {productIdea && !storiesIdea && !planIdea && (
          <motion.div
            key="product-overlay"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="absolute inset-0 z-40"
          >
          <ProductPage
            idea={productIdea}
            region={store.region}
            profiles={INSPIRE_PROFILES[productIdea.id] || []}
            isSaved={store.saved.includes(productIdea.id)}
            onSave={() => { store.saveIdea(productIdea.id); showToast('Saved!') }}
            onOpenStories={handleOpenStories}
            onStartPlan={handleStartPlan}
            onClose={() => setProductIdea(null)}
            onAskCoach={() => setCoachOpen(true)}
          />
          </motion.div>
        )}
        </AnimatePresence>

        {/* === OVERLAY: STORIES === */}
        <AnimatePresence>
        {storiesIdea && (
          <motion.div
            key="stories-overlay"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50"
          >
          <StoriesPlayer
            idea={storiesIdea}
            region={store.region}
            addedSections={addedSections}
            onAddTodo={handleAddTodo}
            onClose={() => setStoriesIdea(null)}
          />
          </motion.div>
        )}
        </AnimatePresence>

        {/* === OVERLAY: LAUNCH PLAN === */}
        {planIdea && (
          (() => {
            const plan = store.getActivePlan(planIdea.id)
            if (!plan) return null
            return (
              <LaunchPlan
                plan={plan}
                deck={planIdea.deck}
                interests={planIdea.interests}
                onComplete={(day) => { store.completePlanTask(planIdea.id, day); syncTaskComplete(planIdea.id, day) }}
                onBack={() => setPlanIdea(null)}
              />
            )
          })()
        )}

        {/* === OVERLAY: SPARK COACH === */}
        <SparkCoach
          idea={productIdea}
          open={coachOpen}
          onClose={() => setCoachOpen(false)}
        />

        {/* === BOTTOM NAV === */}
        {showNav && (
          <BottomNav active={store.screen as any} openTodos={store.totalActivePlans || store.openTodos}
            onNav={(s) => store.setScreen(s)} />
        )}

        {/* === FILTER SHEET === */}
        <FilterSheet
          open={filterOpen}
          deckPref={store.q2}
          interests={store.interests}
          onChangeDeck={(d) => { store.setQ2(d); store.setCardIdx(0) }}
          onToggleInterest={store.toggleInterest}
          onClose={() => setFilterOpen(false)}
        />

        {/* === REGION PICKER === */}
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
