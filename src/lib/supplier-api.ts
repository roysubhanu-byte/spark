/**
 * Supplier API Integration Layer
 *
 * Connects to Amazon PA-API and AliExpress Affiliate API to fetch
 * real supplier data: ratings, reviews, prices, MOQ, shipping time,
 * gold/verified badges.
 *
 * Currently uses sample data for demo. Once API keys are configured,
 * switch to live API calls via the Supabase edge function.
 *
 * Required env vars (set in .env when ready):
 *   VITE_SUPPLIER_API_URL - Supabase edge function URL for supplier lookups
 */

export interface SupplierResult {
  platform: 'aliexpress' | 'alibaba' | 'amazon' | 'etsy'
  name: string
  url: string
  image?: string
  price: string
  priceRaw: number
  rating: number       // 0-5 stars
  reviewCount: number
  orderCount: string   // "2,000+ orders"
  isGoldMember: boolean
  isVerified: boolean
  moq: string          // "1 unit" or "50 units"
  shipsIn: string      // "Ships in 3-7 days"
  shipsFrom: string    // "China" or "US warehouse"
}

export interface SupplierSearchResult {
  query: string
  totalResults: number
  suppliers: SupplierResult[]
  cachedAt: string
  source: 'live' | 'sample'
}

// Sample supplier data for demo (used when API keys not configured)
const SAMPLE_SUPPLIERS: Record<string, SupplierResult[]> = {
  'candle': [
    { platform: 'aliexpress', name: 'YiWu CandleCraft Store', url: 'https://aliexpress.com', price: '$2.80-4.50', priceRaw: 2.8, rating: 4.8, reviewCount: 3420, orderCount: '8,000+ orders', isGoldMember: true, isVerified: true, moq: '10 units', shipsIn: '7-14 days', shipsFrom: 'China' },
    { platform: 'aliexpress', name: 'ShenZhen Wax & Wick Co', url: 'https://aliexpress.com', price: '$1.90-3.20', priceRaw: 1.9, rating: 4.6, reviewCount: 1890, orderCount: '5,200+ orders', isGoldMember: true, isVerified: false, moq: '20 units', shipsIn: '10-18 days', shipsFrom: 'China' },
    { platform: 'aliexpress', name: 'HomeScent Factory Direct', url: 'https://aliexpress.com', price: '$3.10-5.80', priceRaw: 3.1, rating: 4.9, reviewCount: 4560, orderCount: '12,000+ orders', isGoldMember: true, isVerified: true, moq: '5 units', shipsIn: '5-10 days', shipsFrom: 'US warehouse' },
    { platform: 'alibaba', name: 'Dongguan Bright Candle Mfg', url: 'https://alibaba.com', price: '$0.80-1.50/unit', priceRaw: 0.8, rating: 4.7, reviewCount: 890, orderCount: '50+ transactions', isGoldMember: true, isVerified: true, moq: '100 units', shipsIn: '15-30 days', shipsFrom: 'China (FOB)' },
  ],
  'jewelry': [
    { platform: 'aliexpress', name: 'Silver925 Direct Store', url: 'https://aliexpress.com', price: '$3.50-12.00', priceRaw: 3.5, rating: 4.7, reviewCount: 5670, orderCount: '15,000+ orders', isGoldMember: true, isVerified: true, moq: '1 unit', shipsIn: '7-12 days', shipsFrom: 'China' },
    { platform: 'aliexpress', name: 'JewelryParts Wholesale', url: 'https://aliexpress.com', price: '$0.30-2.00', priceRaw: 0.3, rating: 4.5, reviewCount: 2340, orderCount: '8,500+ orders', isGoldMember: false, isVerified: true, moq: '10 units', shipsIn: '8-15 days', shipsFrom: 'China' },
    { platform: 'alibaba', name: 'Yiwu Gemstone Trading Co', url: 'https://alibaba.com', price: '$1.20-5.00/unit', priceRaw: 1.2, rating: 4.8, reviewCount: 1200, orderCount: '100+ transactions', isGoldMember: true, isVerified: true, moq: '50 units', shipsIn: '14-25 days', shipsFrom: 'China (FOB)' },
  ],
  'soap': [
    { platform: 'aliexpress', name: 'Natural Bath Co Store', url: 'https://aliexpress.com', price: '$1.20-3.50', priceRaw: 1.2, rating: 4.6, reviewCount: 1890, orderCount: '4,500+ orders', isGoldMember: true, isVerified: false, moq: '5 units', shipsIn: '7-14 days', shipsFrom: 'China' },
    { platform: 'aliexpress', name: 'Essential Oils & Soap Depot', url: 'https://aliexpress.com', price: '$2.00-4.80', priceRaw: 2.0, rating: 4.8, reviewCount: 3200, orderCount: '9,000+ orders', isGoldMember: true, isVerified: true, moq: '3 units', shipsIn: '5-10 days', shipsFrom: 'US warehouse' },
  ],
  'pet': [
    { platform: 'aliexpress', name: 'PetLove Accessories Store', url: 'https://aliexpress.com', price: '$1.50-8.00', priceRaw: 1.5, rating: 4.7, reviewCount: 4500, orderCount: '11,000+ orders', isGoldMember: true, isVerified: true, moq: '1 unit', shipsIn: '7-14 days', shipsFrom: 'China' },
    { platform: 'aliexpress', name: 'FurBaby Supply Co', url: 'https://aliexpress.com', price: '$2.00-6.50', priceRaw: 2.0, rating: 4.5, reviewCount: 2100, orderCount: '5,800+ orders', isGoldMember: false, isVerified: true, moq: '5 units', shipsIn: '8-15 days', shipsFrom: 'China' },
  ],
  'leather': [
    { platform: 'aliexpress', name: 'Genuine Leather Craft Hub', url: 'https://aliexpress.com', price: '$5.00-25.00', priceRaw: 5.0, rating: 4.8, reviewCount: 2890, orderCount: '6,200+ orders', isGoldMember: true, isVerified: true, moq: '1 unit', shipsIn: '7-14 days', shipsFrom: 'China' },
    { platform: 'alibaba', name: 'Guangzhou LeatherWorks Ltd', url: 'https://alibaba.com', price: '$3.00-15.00/unit', priceRaw: 3.0, rating: 4.9, reviewCount: 1560, orderCount: '80+ transactions', isGoldMember: true, isVerified: true, moq: '20 units', shipsIn: '14-25 days', shipsFrom: 'China (FOB)' },
  ],
  'wood': [
    { platform: 'aliexpress', name: 'WoodCraft Direct Store', url: 'https://aliexpress.com', price: '$3.00-18.00', priceRaw: 3.0, rating: 4.6, reviewCount: 1780, orderCount: '4,100+ orders', isGoldMember: true, isVerified: false, moq: '2 units', shipsIn: '10-18 days', shipsFrom: 'China' },
    { platform: 'alibaba', name: 'Fujian Bamboo & Wood Mfg', url: 'https://alibaba.com', price: '$1.50-8.00/unit', priceRaw: 1.5, rating: 4.7, reviewCount: 950, orderCount: '60+ transactions', isGoldMember: true, isVerified: true, moq: '50 units', shipsIn: '15-30 days', shipsFrom: 'China (FOB)' },
  ],
  'default': [
    { platform: 'aliexpress', name: 'General Wholesale Store', url: 'https://aliexpress.com', price: '$2.00-10.00', priceRaw: 2.0, rating: 4.5, reviewCount: 1200, orderCount: '3,000+ orders', isGoldMember: false, isVerified: true, moq: '5 units', shipsIn: '7-14 days', shipsFrom: 'China' },
    { platform: 'alibaba', name: 'Yiwu Trading Company', url: 'https://alibaba.com', price: '$1.00-5.00/unit', priceRaw: 1.0, rating: 4.6, reviewCount: 800, orderCount: '40+ transactions', isGoldMember: true, isVerified: true, moq: '100 units', shipsIn: '14-30 days', shipsFrom: 'China (FOB)' },
  ],
}

/**
 * Find matching suppliers for a product.
 * Uses sample data now. Will call Supabase edge function when API keys are configured.
 */
export function findSuppliers(productName: string): SupplierSearchResult {
  const lower = productName.toLowerCase()

  // Match product name to a supplier category
  let suppliers: SupplierResult[] = SAMPLE_SUPPLIERS.default
  for (const [keyword, data] of Object.entries(SAMPLE_SUPPLIERS)) {
    if (keyword !== 'default' && lower.includes(keyword)) {
      suppliers = data
      break
    }
  }

  // Generate product-specific search URLs
  const q = encodeURIComponent(productName)
  suppliers = suppliers.map(s => ({
    ...s,
    url: s.platform === 'aliexpress'
      ? `https://www.aliexpress.com/wholesale?SearchText=${q}`
      : s.platform === 'alibaba'
      ? `https://www.alibaba.com/trade/search?SearchText=${q}`
      : s.url,
  }))

  return {
    query: productName,
    totalResults: suppliers.length * 50 + Math.floor(Math.random() * 200),
    suppliers,
    cachedAt: new Date().toISOString(),
    source: 'sample',
  }
}
