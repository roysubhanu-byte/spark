import type { SectionKey } from '../types'

export const SECTION_KEYS: SectionKey[] = [
  'strategy', 'value', 'profit', 'distributors', 'pricing', 'sellingPrice',
]

export const SECTION_LABELS: Record<SectionKey, string> = {
  strategy: 'Strategy',
  value: 'Value',
  profit: 'Profit Math',
  distributors: 'Distributors',
  pricing: 'Pricing Model',
  sellingPrice: 'Selling Price',
}

export const SECTION_EYEBROW: Record<SectionKey, string> = {
  strategy: 'The angle',
  value: 'Who buys this',
  profit: 'Show me the money',
  distributors: 'Where to source',
  pricing: 'How you charge',
  sellingPrice: 'Your launch price',
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
  { id: 'writing', emoji: '✍️', label: 'Writing' },
  { id: 'design', emoji: '🎨', label: 'Design' },
  { id: 'tech', emoji: '🔧', label: 'Tech' },
  { id: 'ai', emoji: '📱', label: 'AI' },
]
