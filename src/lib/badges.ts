import type { BadgeKey, BadgeInfo } from '../types'

const BADGE_MAP: Record<BadgeKey, BadgeInfo> = {
  trending:     { key: 'trending',     icon: '🔥', label: 'Trending',    className: 'bg-gradient-to-br from-[#ffd1c2] to-[#ffb89e] text-[#6e2818]' },
  beginner:     { key: 'beginner',     icon: '⭐', label: 'Beginner',    className: 'bg-gradient-to-br from-[#ffe9c2] to-[#ffd28a] text-[#6e4818]' },
  fastSale:     { key: 'fastSale',     icon: '⚡', label: 'Fast Sale',   className: 'bg-gradient-to-br from-[#fff3a3] to-[#ffe57a] text-[#5e4a18]' },
  lowCapital:   { key: 'lowCapital',   icon: '🌱', label: 'Low Capital', className: 'bg-gradient-to-br from-[#d4f5d4] to-[#a8e6a8] text-[#1f4a1f]' },
  lessCrowded:  { key: 'lessCrowded',  icon: '🌊', label: 'Less Crowded',className: 'bg-gradient-to-br from-[#c2e8ff] to-[#9ed7ff] text-[#1f3e6e]' },
  growing:      { key: 'growing',      icon: '📈', label: 'Growing',     className: 'bg-gradient-to-br from-[#d4f0e0] to-[#a8e0c2] text-[#1f4a3a]' },
  provenIncome: { key: 'provenIncome', icon: '💰', label: 'Proven',      className: 'bg-gradient-to-br from-[#ffe6c2] to-[#ffd28a] text-[#6e3e18]' },
  globalDemand: { key: 'globalDemand', icon: '🌍', label: 'Global',      className: 'bg-gradient-to-br from-[#e0d4ff] to-[#c8b8ff] text-[#2a1f5e]' },
  verified:     { key: 'verified',     icon: '✓',  label: 'Verified',    className: 'bg-gradient-to-br from-white to-[#f0f0f0] text-[#1f1f1f]' },
}

const PRIORITY: BadgeKey[] = [
  'trending', 'beginner', 'fastSale', 'lowCapital', 'lessCrowded',
  'growing', 'provenIncome', 'globalDemand', 'verified',
]

export function pickBadges(badges: BadgeKey[] | undefined, max: number): BadgeInfo[] {
  if (!badges || badges.length === 0) return []
  return badges
    .sort((a, b) => PRIORITY.indexOf(a) - PRIORITY.indexOf(b))
    .slice(0, max)
    .map(k => BADGE_MAP[k])
    .filter(Boolean)
}
