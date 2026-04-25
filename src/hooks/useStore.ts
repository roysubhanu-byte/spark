import { useState, useCallback, useEffect } from 'react'
import type { Region, DeckPref, ChannelPref, TodoItem, SectionKey, Idea } from '../types'
import { SECTION_LABELS } from '../lib/constants'

// Persist onboarding to localStorage
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
  | 'deck' | 'macro' | 'inspire' | 'stories' | 'todos' | 'saved'

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
  const [savedMacro, setSavedMacro] = useState<string[]>(() => loadLS('savedMacro', []))
  const [todos, setTodos] = useState<TodoItem[]>(() => loadLS('todos', []))
  const [cardIdx, setCardIdx] = useState(0)
  const [regionModalOpen, setRegionModalOpen] = useState(false)

  // Persist on change
  useEffect(() => { saveLS('region', region) }, [region])
  useEffect(() => { saveLS('q2', q2) }, [q2])
  useEffect(() => { saveLS('q1', q1) }, [q1])
  useEffect(() => { saveLS('interests', Array.from(interests)) }, [interests])
  useEffect(() => { saveLS('saved', saved) }, [saved])
  useEffect(() => { saveLS('savedMacro', savedMacro) }, [savedMacro])
  useEffect(() => { saveLS('todos', todos) }, [todos])

  const setRegion = useCallback((r: Region) => {
    setRegionState(r)
  }, [])

  const finishOnboarding = useCallback(() => {
    saveLS('onb_done', true)
    setScreen('deck')
  }, [])

  const saveIdea = useCallback((ideaId: string) => {
    setSaved(prev => prev.includes(ideaId) ? prev : [...prev, ideaId])
  }, [])

  const saveMacro = useCallback((macroId: string) => {
    setSavedMacro(prev => prev.includes(macroId) ? prev : [...prev, macroId])
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

  const openTodos = todos.filter(t => !t.done).length

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
    savedMacro, saveMacro,
    todos, addTodo, toggleTodo, openTodos,
    cardIdx, setCardIdx,
    finishOnboarding,
    regionModalOpen, setRegionModalOpen,
  }
}

export type Store = ReturnType<typeof useStore>
