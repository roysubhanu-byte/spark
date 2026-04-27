import { useMemo } from 'react'
import type { Idea, DeckPref, ChannelPref } from '../types'

export function useDeck(
  ideas: Idea[],
  q2: DeckPref | null,
  q1: ChannelPref | null,
  interests: Set<string>,
  region: string,
): Idea[] {
  return useMemo(() => {
    let pool = ideas.slice()

    // Deck filter
    if (q2 && q2 !== 'all') {
      pool = pool.filter(i => i.deck === q2)
    }

    // Channel filter (physical only)
    if (q2 === 'physical' && q1 && q1 !== 'both') {
      pool = pool.filter(i => !i.channels || i.channels.length === 0 || i.channels.includes(q1))
    }

    // Region filter
    pool = pool.filter(i => !i.markets || i.markets.includes(region as any))

    // Sort by sparkScore (highest first) within interest groups
    const byScore = (a: Idea, b: Idea) => {
      const sa = a.validation?.sparkScore ?? 0
      const sb = b.validation?.sparkScore ?? 0
      return sb - sa
    }

    if (interests.size > 0) {
      const matched = pool.filter(i => i.interests.some(int => interests.has(int)))
      const rest = pool.filter(i => !i.interests.some(int => interests.has(int)))
      pool = [...matched.sort(byScore), ...rest.sort(byScore)]
    } else {
      pool.sort(byScore)
    }

    return pool
  }, [ideas, q2, q1, interests, region])
}
