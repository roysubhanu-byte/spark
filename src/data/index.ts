import type { Idea, MacroVariation, InspireProfile, RegionSources } from '../types'

// Placeholder data — will be replaced with full MVP data
export const IDEAS: Idea[] = [
  {
    id: 'soy-candles',
    deck: 'physical',
    deckLabel: 'Physical · online + offline',
    channels: ['online', 'offline'],
    name: 'Soy Candles',
    hook: 'Pour, scent, pour again. $6 cost, $28 retail.',
    capital: '$60 – 180',
    effort: 2,
    interests: ['home', 'crafts'],
    image: 'https://images.unsplash.com/photo-1602874801007-aa24b7551751?w=900&q=80',
    bg: '#C99A4B',
    badges: ['trending', 'beginner', 'lowCapital'],
    markets: ['US', 'IN', 'AE', 'RU', 'KZ'],
    capital_usd: { low: 60, high: 180 },
    breakdown: {
      strategy: {
        body: "Candles sell because people buy <strong>feelings</strong>, not wax. Pick ONE vibe — calm, romance, focus — and own it completely. That's the whole strategy.",
        action: 'Pick your one vibe word',
      },
      value: {
        body: "Buyer: 25-40 woman who wants her apartment to feel like a boutique hotel. She'll pay $28 for what cost you $6. <strong>You sell atmosphere, not candles.</strong>",
        action: 'Define your buyer in 1 sentence',
      },
      profit: {
        body: "Wax + wick + jar + scent = <strong>$4-6 per candle</strong>. Sell at $24-34. <strong>75% margin</strong>. 50 candles/month = $1,200 profit.",
        stats: [{ label: 'Cost', value: '$5' }, { label: 'Margin', value: '75%' }],
        action: 'Calculate your cost per candle',
      },
      distributors: {
        body: "<strong>Soy wax:</strong> CandleScience, BulkApothecary. <strong>Wicks + jars:</strong> Wholesale Supplies Plus. <strong>Fragrance:</strong> NaturesGarden. Order $30 sample first.",
        action: 'Order a $30 starter sample',
      },
      pricing: {
        body: "<strong>8oz jar</strong> $24. <strong>Gift set (3)</strong> $58. <strong>Subscription</strong> $22/month. Gift sets are 40% of revenue.",
        action: 'Set 3 pricing tiers',
      },
      sellingPrice: {
        body: "Launch at <strong>$28 for 8oz jar</strong>. Don't go below $18 — you'll attract bargain hunters who don't repurchase.",
        stats: [{ label: '8oz Jar', value: '$28' }, { label: 'Gift Set', value: '$58' }],
        action: 'List first 3 candles on Etsy',
      },
    },
  },
]

export const MACRO_VARIATIONS: Record<string, MacroVariation[]> = {}
export const INSPIRE_PROFILES: Record<string, InspireProfile[]> = {}
export const SOURCES_DATA: Record<string, Record<string, RegionSources>> = {}
