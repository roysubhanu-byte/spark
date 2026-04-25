import { useState, useCallback, useEffect } from 'react'
import type { Region, DeckPref, ChannelPref, TodoItem, SectionKey, Idea, ActivePlan } from '../types'
import { SECTION_LABELS } from '../lib/constants'

function loadLS<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(`spark_${key}`)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

function saveLS(key: string, value: unknown) {
  localStorage.setItem(`spark_${key}`, JSON.stringify(value))
}

export type Screen =
  | 'welcome' | 'q2-deck' | 'q1-channel' | 'q3-interests'
  | 'deck' | 'todos' | 'saved' | 'plan'

export function useStore() {
  const [screen, setScreen] = useState<Screen>(() => {
    const done = loadLS('onb_done', false)
    return done ? 'deck' : 'welcome'
  })

  const [region, setRegionState] = useState<Region>(() => loadLS('region', 'US'))
  const [q2, setQ2] = useState<DeckPref | null>(() => loadLS('q2', null))
  const [q1, setQ1] = useState<ChannelPref | null>(() => loadLS('q1', null))
  const [interests, setInterests] = useState<Set<string>>(() => new Set(loadLS<string[]>('interests', [])))
  const [saved, setSaved] = useState<string[]>(() => loadLS('saved', []))
  const [todos, setTodos] = useState<TodoItem[]>(() => loadLS('todos', []))
  const [cardIdx, setCardIdx] = useState(0)
  const [regionModalOpen, setRegionModalOpen] = useState(false)
  const [showFirstTimeHint, setShowFirstTimeHint] = useState(() => !loadLS('hint_dismissed', false))
  const [activePlans, setActivePlans] = useState<ActivePlan[]>(() => loadLS('activePlans', []))

  // Persist on change
  useEffect(() => { saveLS('region', region) }, [region])
  useEffect(() => { saveLS('q2', q2) }, [q2])
  useEffect(() => { saveLS('q1', q1) }, [q1])
  useEffect(() => { saveLS('interests', Array.from(interests)) }, [interests])
  useEffect(() => { saveLS('saved', saved) }, [saved])
  useEffect(() => { saveLS('todos', todos) }, [todos])
  useEffect(() => { saveLS('activePlans', activePlans) }, [activePlans])

  const setRegion = useCallback((r: Region) => setRegionState(r), [])

  const finishOnboarding = useCallback(() => {
    saveLS('onb_done', true)
    setScreen('deck')
  }, [])

  const dismissHint = useCallback(() => {
    setShowFirstTimeHint(false)
    saveLS('hint_dismissed', true)
  }, [])

  const saveIdea = useCallback((ideaId: string) => {
    setSaved(prev => prev.includes(ideaId) ? prev : [...prev, ideaId])
  }, [])

  const addTodo = useCallback((idea: Idea, section: SectionKey) => {
    setTodos(prev => {
      if (prev.some(t => t.ideaId === idea.id && t.section === section)) return prev
      return [...prev, {
        id: `${idea.id}-${section}-${Date.now()}`,
        ideaId: idea.id,
        ideaName: idea.name,
        ideaImage: idea.image,
        section,
        sectionLabel: SECTION_LABELS[section],
        text: idea.breakdown[section].action,
        done: false,
      }]
    })
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }, [])

  // --- Active Plans (30-day) ---
  const startPlan = useCallback((idea: Idea) => {
    setActivePlans(prev => {
      if (prev.some(p => p.ideaId === idea.id)) return prev
      const today = new Date().toISOString().split('T')[0]
      return [...prev, {
        ideaId: idea.id,
        ideaName: idea.name,
        ideaImage: idea.image,
        startedAt: today,
        tasks: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          completed: false,
        })),
        streak: 0,
        lastActiveDate: today,
      }]
    })
    // Also save the idea if not saved
    setSaved(prev => prev.includes(idea.id) ? prev : [...prev, idea.id])
  }, [])

  const completePlanTask = useCallback((ideaId: string, day: number) => {
    const today = new Date().toISOString().split('T')[0]
    setActivePlans(prev => prev.map(p => {
      if (p.ideaId !== ideaId) return p
      const newTasks = p.tasks.map(t =>
        t.day === day ? { ...t, completed: true, completedAt: today } : t
      )
      // Update streak
      const isConsecutive = p.lastActiveDate === today ||
        new Date(today).getTime() - new Date(p.lastActiveDate).getTime() <= 86400000 * 1.5
      const newStreak = isConsecutive ? p.streak + 1 : 1
      return { ...p, tasks: newTasks, streak: newStreak, lastActiveDate: today }
    }))
  }, [])

  const getActivePlan = useCallback((ideaId: string) => {
    return activePlans.find(p => p.ideaId === ideaId) || null
  }, [activePlans])

  const openTodos = todos.filter(t => !t.done).length
  const totalActivePlans = activePlans.length

  const toggleInterest = useCallback((id: string) => {
    setInterests(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return {
    screen, setScreen,
    region, setRegion,
    q2, setQ2,
    q1, setQ1,
    interests, toggleInterest,
    saved, saveIdea,
    todos, addTodo, toggleTodo, openTodos,
    cardIdx, setCardIdx,
    finishOnboarding,
    regionModalOpen, setRegionModalOpen,
    showFirstTimeHint, dismissHint,
    activePlans, startPlan, completePlanTask, getActivePlan, totalActivePlans,
  }
}

export type Store = ReturnType<typeof useStore>
