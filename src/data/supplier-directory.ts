/**
 * Curated supplier directory — real platforms with real URLs.
 * Organized by category so each product idea gets matched to the right suppliers.
 *
 * Sources: Shopify wholesale guide, China manufacturer directories,
 * IndiaMART, Faire, DHgate, category-specific B2B sites.
 */

export interface SupplierPlatform {
  name: string
  url: string
  type: 'marketplace' | 'manufacturer-direct' | 'wholesale' | 'b2b-directory'
  region: 'global' | 'china' | 'india' | 'us' | 'eu'
  bestFor: string // "Small test orders" | "Bulk manufacturing" | etc
  moqRange: string // "1 unit" | "50-100" | "500+"
  shippingDays: string
  color: string // brand color for pill
  textColor: string
}

export interface CategorySuppliers {
  category: string
  keywords: string[] // match product ideas to this category
  platforms: SupplierPlatform[]
  chinaDirectSites: { name: string; url: string; specialty: string }[]
  youtubeGuides: { title: string; url: string; views: string; channel: string }[]
}

// ============================================================
// GLOBAL PLATFORMS — work for almost every product category
// ============================================================

export const GLOBAL_PLATFORMS: SupplierPlatform[] = [
  {
    name: 'AliExpress',
    url: 'https://www.aliexpress.com',
    type: 'marketplace',
    region: 'china',
    bestFor: 'Small test orders (1-10 units), fast sampling',
    moqRange: '1 unit',
    shippingDays: '7-14 days',
    color: '#FFE4B5',
    textColor: '#1F1B16',
  },
  {
    name: 'Alibaba',
    url: 'https://www.alibaba.com',
    type: 'manufacturer-direct',
    region: 'china',
    bestFor: 'Bulk orders, custom branding, factory direct',
    moqRange: '50-500 units',
    shippingDays: '14-30 days',
    color: '#FF6A00',
    textColor: '#fff',
  },
  {
    name: 'DHgate',
    url: 'https://www.dhgate.com',
    type: 'marketplace',
    region: 'china',
    bestFor: 'Mid-range orders, good for electronics + fashion',
    moqRange: '5-50 units',
    shippingDays: '10-20 days',
    color: '#FF6B00',
    textColor: '#fff',
  },
  {
    name: 'Faire',
    url: 'https://www.faire.com',
    type: 'wholesale',
    region: 'us',
    bestFor: 'US/EU wholesale brands, net-60 payment terms, free returns',
    moqRange: 'Varies by brand',
    shippingDays: '3-7 days (US)',
    color: '#000000',
    textColor: '#fff',
  },
  {
    name: 'IndiaMART',
    url: 'https://www.indiamart.com',
    type: 'b2b-directory',
    region: 'india',
    bestFor: 'Indian manufacturers direct, lowest prices, negotiate MOQ',
    moqRange: '10-100 units',
    shippingDays: '3-7 days (India), 14-21 days (international)',
    color: '#FF6F00',
    textColor: '#fff',
  },
  {
    name: 'Wholesale Central',
    url: 'https://www.wholesalecentral.com',
    type: 'b2b-directory',
    region: 'us',
    bestFor: 'US wholesale suppliers directory, verified sellers',
    moqRange: 'Varies',
    shippingDays: '3-7 days (US)',
    color: '#2563EB',
    textColor: '#fff',
  },
  {
    name: 'Thomasnet',
    url: 'https://www.thomasnet.com',
    type: 'b2b-directory',
    region: 'us',
    bestFor: 'US/North American manufacturers, industrial + consumer goods',
    moqRange: 'Varies',
    shippingDays: '5-14 days',
    color: '#00843D',
    textColor: '#fff',
  },
  {
    name: 'Shopify Collective',
    url: 'https://www.shopify.com/collective',
    type: 'wholesale',
    region: 'us',
    bestFor: 'Sell other Shopify brands products, no inventory needed',
    moqRange: 'No MOQ — dropship from brands',
    shippingDays: '3-5 days (brand ships)',
    color: '#96BF48',
    textColor: '#fff',
  },
  {
    name: 'EK Wholesale',
    url: 'https://www.ekwholesale.com',
    type: 'wholesale',
    region: 'eu',
    bestFor: 'EU wholesale, trending products, low MOQ',
    moqRange: '10+ units',
    shippingDays: '5-10 days (EU)',
    color: '#E91E63',
    textColor: '#fff',
  },
  {
    name: 'LightInTheBox',
    url: 'https://www.lightinthebox.com',
    type: 'marketplace',
    region: 'china',
    bestFor: 'General merchandise, fashion, home goods, small orders',
    moqRange: '1 unit',
    shippingDays: '7-14 days',
    color: '#FF4081',
    textColor: '#fff',
  },
]

// ============================================================
// CATEGORY-SPECIFIC SUPPLIERS — China direct + niche platforms
// ============================================================

export const CATEGORY_SUPPLIERS: CategorySuppliers[] = [
  {
    category: 'Candles & Home Fragrance',
    keywords: ['candle', 'soy candle', 'wax melt', 'reed diffuser', 'room spray', 'fragrance'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'CaiFeDeCandles', url: 'https://caifedecandles.com', specialty: 'Candle manufacturing, custom scents, private label' },
    ],
    youtubeGuides: [
      { title: 'How to Find the Best Manufacturer for Your Product', url: 'https://youtube.com/@marshallcrews_', views: '218K', channel: '@marshallcrews_' },
    ],
  },
  {
    category: 'Jewelry & Accessories',
    keywords: ['jewelry', 'silver', 'resin', 'polymer clay', 'earrings', 'bracelet', 'necklace', 'ring', 'pendant'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'EasyWholesales', url: 'https://easywholesales.com', specialty: 'Wholesale jewelry, fashion accessories' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Pet Supplies',
    keywords: ['pet', 'dog', 'cat', 'bandana', 'tag', 'treat', 'toy', 'collar', 'leash'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'ChongWuYongPin', url: 'https://chongwuyongpin.51sole.com', specialty: 'Pet products wholesale from China' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Beauty & Skincare',
    keywords: ['soap', 'bath bomb', 'lip balm', 'serum', 'body butter', 'scrub', 'oil', 'beauty', 'skincare'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [],
    youtubeGuides: [],
  },
  {
    category: 'Fashion & Clothing',
    keywords: ['clothing', 'shirt', 'dress', 'fashion', 'scrunchie', 'bag', 'wallet', 'tie-dye', 'crochet'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [],
    youtubeGuides: [],
  },
  {
    category: 'Home & Living',
    keywords: ['home', 'rug', 'macrame', 'pillow', 'planter', 'coaster', 'decor', 'wall hanging', 'flower'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'MeiJiaVIP', url: 'https://meijiavip.com', specialty: 'Furniture and home goods manufacturing' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Bags & Cases',
    keywords: ['bag', 'case', 'phone case', 'tote', 'backpack', 'pouch', 'wallet'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'China BagsNet', url: 'https://china.bagsnet.com', specialty: 'Bags and cases wholesale manufacturing' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Stationery & Paper',
    keywords: ['sticker', 'card', 'washi tape', 'print', 'stamp', 'bookmark', 'stationery', 'planner'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'ShenZhen FH', url: 'https://szrfh.com', specialty: 'School and office supplies manufacturing' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Packaging & Printing',
    keywords: ['packaging', 'label', 'box', 'printing', 'custom packaging'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'CPP114', url: 'https://cpp114.com', specialty: 'Packaging and printing industry' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Lighting',
    keywords: ['light', 'lamp', 'led', 'lighting', 'neon'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'XTFJ Deng', url: 'https://xtfj.deng.com', specialty: 'Lights and lighting manufacturing' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Tools & Hardware',
    keywords: ['tool', 'hardware', 'equipment', 'tufting gun', 'engraving'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'ToolChina', url: 'https://toolchina.com', specialty: 'Tools and hardware wholesale' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Health & Wellness',
    keywords: ['health', 'wellness', 'aromatherapy', 'essential oil', 'supplement'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'Zokogo', url: 'https://m.zokogo.com', specialty: 'Health products manufacturing' },
    ],
    youtubeGuides: [],
  },
  {
    category: 'Food & Beverage',
    keywords: ['food', 'spice', 'sauce', 'honey', 'granola', 'cookie', 'tea', 'coffee'],
    platforms: [
      ...GLOBAL_PLATFORMS.filter(p => ['IndiaMART', 'Faire', 'Wholesale Central'].includes(p.name)),
    ],
    chinaDirectSites: [],
    youtubeGuides: [],
  },
  {
    category: 'Kids & Baby',
    keywords: ['kids', 'baby', 'children', 'toy', 'wooden toy', 'sensory', 'art kit'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [],
    youtubeGuides: [],
  },
]

// ============================================================
// MATCHER — given a product name, find the best suppliers
// ============================================================

export function findSuppliersForProduct(productName: string): {
  category: CategorySuppliers | null
  searchUrls: { platform: string; url: string; color: string; textColor: string }[]
} {
  const lower = productName.toLowerCase()

  // Find matching category
  const match = CATEGORY_SUPPLIERS.find(c =>
    c.keywords.some(k => lower.includes(k))
  )

  // Generate search URLs for top platforms
  const q = encodeURIComponent(productName.toLowerCase())
  const searchUrls = [
    { platform: 'AliExpress', url: `https://www.aliexpress.com/wholesale?SearchText=${q}+supplies`, color: '#FFE4B5', textColor: '#1F1B16' },
    { platform: 'Alibaba', url: `https://www.alibaba.com/trade/search?SearchText=${q}`, color: '#FF6A00', textColor: '#fff' },
    { platform: 'DHgate', url: `https://www.dhgate.com/wholesale/search.do?searchkey=${q}`, color: '#FF6B00', textColor: '#fff' },
    { platform: 'IndiaMART', url: `https://dir.indiamart.com/search.mp?ss=${q}`, color: '#FF6F00', textColor: '#fff' },
    { platform: 'Faire', url: `https://www.faire.com/search?q=${q}`, color: '#000', textColor: '#fff' },
    { platform: 'Wholesale Central', url: `https://www.wholesalecentral.com/srch.cfm?searchterm=${q}`, color: '#2563EB', textColor: '#fff' },
  ]

  return { category: match || null, searchUrls }
}
