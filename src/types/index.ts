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
  sellOn?: SellPlatform[]
  launchPlan?: LaunchTask[]
  validation?: IdeaValidation // REAL market data — no hallucination
  analysis?: IdeaAnalysis // deep analysis for engagement
}

// --- Product validation (all from REAL data sources) ---
export interface IdeaValidation {
  sparkScore: number // 0-100 composite from real data
  dataSource: string // "google_trends+etsy+aliexpress" — shows where data came from
  lastUpdated: string // ISO date

  demand: DemandData
  competition: CompetitionData
  profitability: ProfitabilityData
  supplierHealth: SupplierHealthData
  trending: TrendDirection
}

export interface DemandData {
  score: number // 0-100
  googleTrendsDirection: 'rising' | 'stable' | 'declining'
  googleTrendsValue: number // relative interest 0-100
  searchVolume: string // "18K/mo" — estimated monthly searches
  seasonality: string // "year-round" | "seasonal (Q4 peak)" | "summer only"
  evidence: string // "Search interest up 34% YoY, 18K monthly searches in US"
}

export interface CompetitionData {
  score: number // 0-100 (higher = less competition = better)
  etsyListings: number // how many listings exist
  etsyAvgPrice: number // USD
  etsyPriceRange: string // "$12-45"
  amazonResults: number // search result count
  saturationLevel: 'low' | 'medium' | 'high' | 'very-high'
  evidence: string // "4,200 Etsy listings, avg price $24. Medium competition."
}

export interface ProfitabilityData {
  score: number // 0-100
  avgCostUsd: number // typical sourcing cost
  avgSellingUsd: number // typical selling price
  estimatedMargin: number // percentage
  monthlyPotentialUsd: string // "$800-2,000/mo at 50 units"
  evidence: string // "AliExpress avg $3.20/unit, Etsy avg sell $24, ~87% margin"
}

export interface SupplierHealthData {
  score: number // 0-100
  supplierCount: number // on AliExpress/Alibaba
  avgSupplierRating: number // 0-5
  avgOrderVolume: string // "2,000+ orders"
  minMoq: number // minimum order quantity found
  evidence: string // "47 suppliers on AliExpress, avg 4.6 rating, MOQ from 10 units"
}

export type TrendDirection = 'hot' | 'rising' | 'stable' | 'cooling' | 'declining'

// --- Deep analysis (for 15-20 min engagement per idea) ---
export interface IdeaAnalysis {
  marketOverview: string // 2-3 paragraphs on the market
  targetBuyer: BuyerPersona
  competitorSnapshot: CompetitorSnapshot[]
  pricingStrategy: PricingBreakdown
  riskFactors: RiskFactor[]
  successStories: string[] // real examples
  firstWeekChecklist: ChecklistItem[]
  proTips: string[] // insider knowledge
}

export interface BuyerPersona {
  name: string // "Sarah, 28"
  description: string // "Working professional who..."
  painPoint: string
  buyingTrigger: string
  willPayUpTo: string // "$35 for a candle"
  whereSheShops: string[] // ["Etsy", "Instagram"]
}

export interface CompetitorSnapshot {
  name: string // "WickAndWhisper" (real Etsy shop)
  platform: string // "Etsy"
  priceRange: string
  reviewCount: number
  rating: number
  whatTheyDoWell: string
  gap: string // what they're missing
}

export interface PricingBreakdown {
  costPerUnit: number
  packagingCost: number
  shippingCost: number
  platformFee: number // percentage
  totalCost: number
  recommendedPrice: number
  netProfit: number
  marginPercent: number
}

export interface RiskFactor {
  risk: string
  severity: 'low' | 'medium' | 'high'
  mitigation: string
}

export interface ChecklistItem {
  task: string
  timeMinutes: number
  link?: string
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
