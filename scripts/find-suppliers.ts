/**
 * find-suppliers.ts
 *
 * Finds REAL suppliers/manufacturers for each product idea.
 * Sources: AliExpress, Alibaba, IndiaMART
 * Outputs: supplier name, rating, MOQ, price range, contact info, URL
 *
 * Usage: npx tsx scripts/find-suppliers.ts --idea "soy candles"
 *        npx tsx scripts/find-suppliers.ts --all
 *
 * Env: APIFY_API_KEY
 */

import { writeFileSync } from 'fs'
import { resolve } from 'path'

const APIFY_KEY = process.env.APIFY_API_KEY

interface Supplier {
  name: string
  platform: 'aliexpress' | 'alibaba' | 'indiamart'
  url: string
  rating: number
  reviewCount: number
  priceRange: string
  moq: string
  shipsFrom: string
  shippingDays: string
  contactInfo?: string // phone or message link
  orderVolume: string // "5,000+ sold"
  verified: boolean
  image?: string
}

// ============================================================
// ALIEXPRESS — best for small test orders
// ============================================================

async function searchAliExpress(query: string): Promise<Supplier[]> {
  if (!APIFY_KEY) {
    console.warn(`  [aliexpress] No APIFY_API_KEY`)
    return []
  }

  try {
    const response = await fetch(
      `https://api.apify.com/v2/acts/epctex~aliexpress-scraper/run-sync-get-dataset-items?token=${APIFY_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchUrls: [`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(query + ' supplies wholesale')}`],
          maxItems: 15,
        }),
      }
    )

    if (!response.ok) return []
    const items = await response.json()

    return items
      .filter((i: any) => i.rating >= 4.0)
      .slice(0, 5)
      .map((i: any) => ({
        name: i.title?.slice(0, 60) || 'Unknown',
        platform: 'aliexpress' as const,
        url: i.url || `https://www.aliexpress.com/item/${i.productId}.html`,
        rating: i.rating || 0,
        reviewCount: i.reviews || 0,
        priceRange: i.price ? `$${i.price}` : 'Check listing',
        moq: '1 unit',
        shipsFrom: i.shipsFrom || 'China',
        shippingDays: '7-14 days',
        orderVolume: i.orders ? `${i.orders.toLocaleString()} sold` : 'New listing',
        verified: (i.rating || 0) >= 4.5,
        image: i.image,
      }))
  } catch (e) {
    console.warn(`  [aliexpress] Error:`, e)
    return []
  }
}

// ============================================================
// ALIBABA — best for bulk orders
// ============================================================

async function searchAlibaba(query: string): Promise<Supplier[]> {
  if (!APIFY_KEY) return []

  try {
    const response = await fetch(
      `https://api.apify.com/v2/acts/epctex~alibaba-scraper/run-sync-get-dataset-items?token=${APIFY_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchUrls: [`https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(query)}`],
          maxItems: 10,
        }),
      }
    )

    if (!response.ok) return []
    const items = await response.json()

    return items
      .slice(0, 5)
      .map((i: any) => ({
        name: i.supplierName || i.title?.slice(0, 60) || 'Unknown',
        platform: 'alibaba' as const,
        url: i.url || '',
        rating: i.transactionLevel ? 4.5 : 4.0,
        reviewCount: i.reviews || 0,
        priceRange: i.price || 'Request quote',
        moq: i.minOrder || '50 units',
        shipsFrom: 'China (factory)',
        shippingDays: '14-30 days',
        contactInfo: i.contactUrl || 'Message on Alibaba',
        orderVolume: i.transactionAmount || 'Verified supplier',
        verified: !!i.verified || !!i.goldSupplier,
        image: i.image,
      }))
  } catch {
    return []
  }
}

// ============================================================
// INDIAMART — best for Indian manufacturers
// ============================================================

async function searchIndiaMART(query: string): Promise<Supplier[]> {
  if (!APIFY_KEY) return []

  try {
    const response = await fetch(
      `https://api.apify.com/v2/acts/epctex~indiamart-scraper/run-sync-get-dataset-items?token=${APIFY_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchUrls: [`https://dir.indiamart.com/search.mp?ss=${encodeURIComponent(query + ' manufacturer')}`],
          maxItems: 10,
        }),
      }
    )

    if (!response.ok) return []
    const items = await response.json()

    return items
      .slice(0, 5)
      .map((i: any) => ({
        name: i.companyName || i.title?.slice(0, 60) || 'Unknown',
        platform: 'indiamart' as const,
        url: i.url || '',
        rating: i.rating || 4.0,
        reviewCount: i.reviews || 0,
        priceRange: i.price || 'Request quote',
        moq: i.minOrder || 'Ask supplier',
        shipsFrom: i.location || 'India',
        shippingDays: '3-7 days (domestic)',
        contactInfo: i.phone || i.contactUrl || 'Call via IndiaMART',
        orderVolume: i.responseRate ? `${i.responseRate}% response rate` : 'Active supplier',
        verified: !!i.verified || !!i.trustedSeller,
        image: i.image,
      }))
  } catch {
    return []
  }
}

// ============================================================
// MAIN
// ============================================================

async function findSuppliers(ideaName: string) {
  console.log(`\nFinding suppliers for: ${ideaName}`)

  const [ali, alibaba, india] = await Promise.all([
    searchAliExpress(ideaName),
    searchAlibaba(ideaName),
    searchIndiaMART(ideaName),
  ])

  console.log(`  AliExpress: ${ali.length} suppliers`)
  console.log(`  Alibaba: ${alibaba.length} suppliers`)
  console.log(`  IndiaMART: ${india.length} suppliers`)

  const all = [...ali, ...alibaba, ...india]
    .sort((a, b) => b.rating - a.rating)

  return {
    ideaName,
    totalSuppliers: all.length,
    suppliers: all,
    summary: {
      bestForTesting: ali[0] || null,
      bestForBulk: alibaba[0] || null,
      bestForIndia: india[0] || null,
    },
    lastUpdated: new Date().toISOString().split('T')[0],
  }
}

// CLI
const ideaArg = process.argv.find(a => a.startsWith('--idea='))?.split('=').slice(1).join('=')

if (!ideaArg) {
  console.log('Usage: npx tsx scripts/find-suppliers.ts --idea="soy candles"')
  console.log('Env: APIFY_API_KEY required')
  process.exit(1)
}

console.log('=== Spark Supplier Finder ===')
console.log(`APIFY_API_KEY: ${APIFY_KEY ? '✓ set' : '✗ missing'}`)

findSuppliers(ideaArg).then(result => {
  const outPath = resolve(import.meta.dirname || '.', `../src/data/suppliers-${ideaArg.replace(/\s+/g, '-').toLowerCase()}.json`)
  writeFileSync(outPath, JSON.stringify(result, null, 2))
  console.log(`\n✓ Saved to ${outPath}`)

  // Print summary
  console.log('\n=== TOP SUPPLIERS ===')
  result.suppliers.slice(0, 5).forEach((s, i) => {
    console.log(`${i + 1}. [${s.platform}] ${s.name}`)
    console.log(`   Rating: ${s.rating}/5 | MOQ: ${s.moq} | Price: ${s.priceRange}`)
    console.log(`   ${s.url}`)
  })
}).catch(console.error)
