export type Deck = 'physical' | 'digital' | 'saas'
export type Channel = 'online' | 'offline'
export type DeckPref = Deck | 'all'
export type ChannelPref = Channel | 'both'
export type Region = 'US' | 'IN' | 'AE' | 'RU' | 'KZ'

export type BadgeKey =
  | 'trending' | 'beginner' | 'fastSale' | 'lowCapital'
  | 'lessCrowded' | 'growing' | 'provenIncome' | 'globalDemand' | 'verified'

export interface BreakdownSection {
  body: string
  action: string
  stats?: { label: string; value: string }[]
}

export interface Breakdown {
  strategy: BreakdownSection
  value: BreakdownSection
  profit: BreakdownSection
  distributors: BreakdownSection
  pricing: BreakdownSection
  sellingPrice: BreakdownSection
}

export type SectionKey = keyof Breakdown

export interface Idea {
  id: string
  deck: Deck
  deckLabel: string
  channels: Channel[]
  name: string
  hook: string
  capital: string
  effort: number // 1-3
  interests: string[]
  image: string
  bg: string
  badges: BadgeKey[]
  markets: Region[]
  capital_usd?: { low: number; high: number }
  sellingPrice_usd?: Record<string, number>
  distributors?: Record<Region, string>
  breakdown: Breakdown
}

export interface MacroVariation {
  id: string
  name: string
  hook: string
  image: string
  bg: string
  priceHint: string
}

export interface InspireProfile {
  handle: string
  name: string
  verified: boolean
  followers: string
  bio: string
  tiles: string[]
}

export interface SourceData {
  total: number
  savings?: string
  label: string
  ships: string
  tag: string
  tagColor: string
  tagText: string
  url: string
  note?: string
}

export interface RegionSources {
  amazon: SourceData
  supplier: SourceData
  bulk: SourceData
}

export interface RegionInfo {
  code: Region
  name: string
  flag: string
  currency: string
  symbol: string
  rate: number
}

export interface TodoItem {
  id: string
  ideaId: string
  ideaName: string
  ideaImage: string
  section: SectionKey
  sectionLabel: string
  text: string
  done: boolean
}

export interface OnboardingState {
  q2: DeckPref | null // what to sell
  q1: ChannelPref | null // where to sell (physical only)
  interests: Set<string>
}

export interface BadgeInfo {
  key: BadgeKey
  icon: string
  label: string
  className: string
}
