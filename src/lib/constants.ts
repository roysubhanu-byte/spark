import type { SectionKey } from '../types'

export const SECTION_KEYS: SectionKey[] = [
  'strategy', 'value', 'profit', 'distributors', 'pricing', 'sellingPrice',
]

export const SECTION_LABELS: Record<SectionKey, string> = {
  strategy: 'Strategy',
  value: 'Value',
  profit: 'Profit Math',
  distributors: 'Materials',
  pricing: 'Pricing',
  sellingPrice: 'Where to Sell',
}

export const SECTION_EYEBROW: Record<SectionKey, string> = {
  strategy: 'The angle',
  value: 'Who buys this',
  profit: 'Show me the money',
  distributors: 'What you need to make it',
  pricing: 'How you charge',
  sellingPrice: 'Where your customers are',
}

// Feature flags
export const FEATURE_FLAGS = {
  multiRegion: false,  // v1 = US only. Set true to enable IN/AE/RU/KZ
}

export const INTERESTS = [
  { id: 'pets', emoji: '🐕', label: 'Pets' },
  { id: 'kids', emoji: '👶', label: 'Kids' },
  { id: 'jewelry', emoji: '💍', label: 'Jewelry' },
  { id: 'home', emoji: '🏠', label: 'Home' },
  { id: 'crafts', emoji: '🎨', label: 'Crafts' },
  { id: 'beauty', emoji: '💄', label: 'Beauty' },
  { id: 'food', emoji: '🍪', label: 'Food' },
  { id: 'fashion', emoji: '👗', label: 'Fashion' },
  { id: 'fitness', emoji: '💪', label: 'Fitness' },
  { id: 'travel', emoji: '✈️', label: 'Travel' },
  { id: 'garden', emoji: '🌱', label: 'Garden' },
  { id: 'wellness', emoji: '🧘', label: 'Wellness' },
  { id: 'vintage', emoji: '🏺', label: 'Vintage' },
  { id: 'leather', emoji: '👜', label: 'Leather' },
  { id: 'woodwork', emoji: '🪵', label: 'Woodwork' },
  { id: 'writing', emoji: '✍️', label: 'Writing' },
  { id: 'design', emoji: '🖌️', label: 'Design' },
  { id: 'tech', emoji: '💻', label: 'Tech' },
  { id: 'ai', emoji: '🤖', label: 'AI' },
  { id: 'eco', emoji: '♻️', label: 'Eco' },
]
