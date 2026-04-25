export type Deck = 'physical' | 'digital' | 'saas'
export type Channel = 'online' | 'offline'
export type DeckPref = Deck | 'all'
export type ChannelPref = Channel | 'both'
export type Region = 'US' | 'IN' | 'AE' | 'RU' | 'KZ' // Active: US + IN. Others kept for data compatibility.

export type BadgeKey =
  | 'trending' | 'beginner' | 'fastSale' | 'lowCapital'
  | 'lessCrowded' | 'growing' | 'provenIncome' | 'globalDemand' | 'verified'

// --- Breakdown stories ---
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

// --- Core idea ---
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
  distributors?: Partial<Record<Region, string>>
  breakdown: Breakdown
  sellOn?: SellPlatform[] // where to sell (region-aware)
  launchPlan?: LaunchTask[] // 30-day plan
}

// --- Sourcing (physical: suppliers, digital/saas: build tools) ---
export interface SourcingTier {
  tier: 'test' | 'starter' | 'scale'  // physical
    | 'create' | 'sell' | 'grow'       // digital/saas
  label: string        // "Test first" / "Build with"
  description: string  // "5-10 units to test quality"
  platform: string     // "AliExpress" / "Canva"
  platformColor: string
  platformTextColor: string
  priceRange: string   // "$15-40" or "Free"
  timeframe: string    // "Ships 7-14 days" / "Instant"
  url: string          // search/affiliate URL
  note?: string        // "MOQ may apply"
}

// --- Where to sell ---
export interface SellPlatform {
  name: string         // "Etsy"
  region: Region       // which market
  url: string          // setup link
  difficulty: 'easy' | 'medium' | 'hard'
  note: string         // "Best for handmade, lowest barrier"
}

// --- 30-day launch plan ---
export interface LaunchTask {
  day: number          // 1-30
  title: string        // "Order your sample"
  description: string  // "Go to AliExpress, search for..."
  category: 'research' | 'source' | 'create' | 'brand' | 'list' | 'sell'
  estimatedMinutes: number
  link?: string        // optional URL to help complete the task
}

// --- User's active plan (persisted) ---
export interface ActivePlan {
  ideaId: string
  ideaName: string
  ideaImage: string
  startedAt: string     // ISO date
  tasks: ActivePlanTask[]
  streak: number
  lastActiveDate: string // ISO date
}

export interface ActivePlanTask {
  day: number
  completed: boolean
  completedAt?: string  // ISO date
}

// --- Macro variations ---
export interface MacroVariation {
  id: string
  name: string
  hook: string
  image: string
  bg: string
  priceHint: string
}

// --- Inspire profiles ---
export interface InspireProfile {
  handle: string
  name: string
  verified: boolean
  followers: string
  bio: string
  tiles: string[]
}

// --- Legacy source data (from MVP, will migrate) ---
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

// --- Region info ---
export interface RegionInfo {
  code: Region
  name: string
  flag: string
  currency: string
  symbol: string
  rate: number
}

// --- Todos (legacy, migrating to ActivePlan) ---
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

export interface BadgeInfo {
  key: BadgeKey
  icon: string
  label: string
  className: string
}
