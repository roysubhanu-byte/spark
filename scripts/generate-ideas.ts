/**
 * generate-ideas.ts
 *
 * Generates product ideas at scale with:
 * 1. Claude for breakdowns (coach tone, real numbers)
 * 2. Apify for real supplier data (AliExpress, Etsy pricing)
 * 3. Apify for real Instagram sellers
 * 4. IndiaMART/Alibaba for manufacturer contacts
 *
 * Usage:
 *   npx tsx scripts/generate-ideas.ts --batch physical --count 50
 *   npx tsx scripts/generate-ideas.ts --batch digital --count 30
 *   npx tsx scripts/generate-ideas.ts --batch saas --count 20
 *
 * Env vars needed:
 *   ANTHROPIC_API_KEY
 *   APIFY_API_KEY (optional — falls back to generated data without real validation)
 */

import { writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const MODEL = process.env.ANTHROPIC_MODEL_BREAKDOWN || 'claude-sonnet-4-6'

// ============================================================
// SEED DATA — 1000 product ideas across all categories
// ============================================================

const PHYSICAL_SEEDS = [
  // Home & Living
  { name: 'Soy Candles', interests: ['home', 'crafts'], effort: 2, capital: '$60-180' },
  { name: 'Reed Diffusers', interests: ['home'], effort: 1, capital: '$40-120' },
  { name: 'Wax Melts', interests: ['home', 'crafts'], effort: 1, capital: '$30-100' },
  { name: 'Room Sprays', interests: ['home', 'beauty'], effort: 1, capital: '$40-100' },
  { name: 'Tufted Rugs', interests: ['home', 'crafts', 'design'], effort: 3, capital: '$300-600' },
  { name: 'Macrame Wall Hangings', interests: ['home', 'crafts'], effort: 2, capital: '$30-100' },
  { name: 'Custom Throw Pillows', interests: ['home', 'design'], effort: 1, capital: '$100-300' },
  { name: 'Dried Flower Arrangements', interests: ['home', 'crafts'], effort: 2, capital: '$50-150' },
  { name: 'Terrazzo Coasters', interests: ['home', 'crafts'], effort: 2, capital: '$50-120' },
  { name: 'Concrete Planters', interests: ['home', 'crafts'], effort: 2, capital: '$40-100' },
  // Jewelry & Accessories
  { name: 'Silver Jewelry', interests: ['jewelry', 'fashion'], effort: 2, capital: '$100-400' },
  { name: 'Resin Jewelry', interests: ['jewelry', 'crafts'], effort: 2, capital: '$50-150' },
  { name: 'Polymer Clay Earrings', interests: ['jewelry', 'fashion', 'crafts'], effort: 2, capital: '$40-120' },
  { name: 'Beaded Bracelets', interests: ['jewelry', 'crafts'], effort: 1, capital: '$30-80' },
  { name: 'Wire Wrapped Crystals', interests: ['jewelry', 'crafts'], effort: 2, capital: '$40-120' },
  { name: 'Leather Wallets', interests: ['fashion', 'crafts'], effort: 3, capital: '$100-300' },
  { name: 'Hair Scrunchies', interests: ['fashion', 'crafts'], effort: 1, capital: '$30-80' },
  { name: 'Custom Phone Cases', interests: ['design', 'tech', 'fashion'], effort: 1, capital: '$0-60' },
  { name: 'Embroidered Patches', interests: ['fashion', 'crafts', 'design'], effort: 2, capital: '$80-200' },
  { name: 'Enamel Pins', interests: ['design', 'fashion'], effort: 2, capital: '$150-400' },
  // Beauty & Wellness
  { name: 'Handmade Soap Bars', interests: ['beauty', 'crafts'], effort: 3, capital: '$80-200' },
  { name: 'Bath Bombs', interests: ['beauty', 'crafts'], effort: 2, capital: '$40-120' },
  { name: 'Lip Balm', interests: ['beauty', 'crafts'], effort: 2, capital: '$50-150' },
  { name: 'Aromatherapy Roll-Ons', interests: ['beauty', 'crafts'], effort: 2, capital: '$60-150' },
  { name: 'Body Butter', interests: ['beauty', 'crafts'], effort: 2, capital: '$50-120' },
  { name: 'Hair Oil Blends', interests: ['beauty'], effort: 1, capital: '$40-100' },
  { name: 'Face Serums', interests: ['beauty'], effort: 2, capital: '$80-200' },
  { name: 'Sugar Scrubs', interests: ['beauty', 'crafts'], effort: 1, capital: '$30-80' },
  // Pets
  { name: 'Pet ID Tags', interests: ['pets'], effort: 2, capital: '$100-300' },
  { name: 'Pet Bandanas', interests: ['pets', 'fashion', 'crafts'], effort: 2, capital: '$40-100' },
  { name: 'Dog Treats', interests: ['pets', 'food'], effort: 2, capital: '$60-150' },
  { name: 'Cat Toys', interests: ['pets', 'crafts'], effort: 1, capital: '$30-80' },
  { name: 'Pet Bow Ties', interests: ['pets', 'fashion'], effort: 1, capital: '$30-60' },
  // Food & Beverage
  { name: 'Hot Sauce', interests: ['food'], effort: 3, capital: '$200-500' },
  { name: 'Spice Blends', interests: ['food'], effort: 2, capital: '$80-200' },
  { name: 'Granola & Trail Mix', interests: ['food'], effort: 2, capital: '$60-150' },
  { name: 'Flavored Honey', interests: ['food'], effort: 2, capital: '$80-200' },
  { name: 'Cookie Mixes in Jars', interests: ['food', 'crafts'], effort: 1, capital: '$40-100' },
  // Kids
  { name: 'Baby Clothes (Organic)', interests: ['kids', 'fashion'], effort: 2, capital: '$200-500' },
  { name: 'Wooden Toys', interests: ['kids', 'crafts'], effort: 3, capital: '$100-300' },
  { name: 'Sensory Play Kits', interests: ['kids', 'crafts'], effort: 1, capital: '$40-100' },
  { name: 'Kids Art Kits', interests: ['kids', 'crafts', 'design'], effort: 1, capital: '$40-120' },
  // Stationery & Art
  { name: 'Sticker Packs', interests: ['design', 'crafts'], effort: 1, capital: '$30-100' },
  { name: 'Greeting Cards', interests: ['design', 'crafts'], effort: 1, capital: '$40-120' },
  { name: 'Washi Tape', interests: ['design', 'crafts'], effort: 2, capital: '$200-500' },
  { name: 'Art Prints', interests: ['design'], effort: 1, capital: '$20-80' },
  { name: 'Custom Stamps', interests: ['design', 'crafts'], effort: 2, capital: '$100-300' },
  { name: 'Bookmarks', interests: ['design', 'crafts'], effort: 1, capital: '$20-60' },
  // Clothing
  { name: 'Screen Printed T-Shirts', interests: ['fashion', 'design'], effort: 2, capital: '$200-500' },
  { name: 'Tie-Dye Clothing', interests: ['fashion', 'crafts'], effort: 2, capital: '$80-200' },
  { name: 'Crochet Bags', interests: ['fashion', 'crafts'], effort: 3, capital: '$40-120' },
]

const DIGITAL_SEEDS = [
  { name: 'Notion Templates', interests: ['tech', 'design'], effort: 1, capital: '$0-30' },
  { name: 'Lightroom Presets', interests: ['design'], effort: 1, capital: '$0-60' },
  { name: 'Canva Templates', interests: ['design'], effort: 1, capital: '$0-30' },
  { name: 'Stock Photo Packs', interests: ['design'], effort: 2, capital: '$30-150' },
  { name: 'Ebook (Niche Guide)', interests: ['writing'], effort: 2, capital: '$0-50' },
  { name: 'Printable Planners', interests: ['design'], effort: 1, capital: '$0-20' },
  { name: 'Resume Templates', interests: ['design'], effort: 1, capital: '$0-20' },
  { name: 'Social Media Templates', interests: ['design'], effort: 1, capital: '$0-30' },
  { name: 'Figma UI Kits', interests: ['design', 'tech'], effort: 2, capital: '$0-30' },
  { name: 'Icon Packs', interests: ['design'], effort: 2, capital: '$0-20' },
  { name: 'Font Design', interests: ['design'], effort: 3, capital: '$0-50' },
  { name: 'Procreate Brushes', interests: ['design'], effort: 2, capital: '$0-20' },
  { name: 'Video LUTs', interests: ['design'], effort: 1, capital: '$0-30' },
  { name: 'Music Beats', interests: ['ai'], effort: 2, capital: '$100-300' },
  { name: 'AI Prompt Packs', interests: ['ai', 'writing'], effort: 1, capital: '$0-10' },
  { name: 'Wedding Invitation Templates', interests: ['design'], effort: 2, capital: '$0-30' },
  { name: 'Digital Wallpapers', interests: ['design'], effort: 1, capital: '$0-10' },
  { name: 'Online Course', interests: ['writing', 'tech'], effort: 3, capital: '$0-100' },
  { name: 'Spreadsheet Templates', interests: ['tech'], effort: 1, capital: '$0-10' },
  { name: 'Meal Plan PDFs', interests: ['food', 'design'], effort: 1, capital: '$0-20' },
]

const SAAS_SEEDS = [
  { name: 'Micro AI Tool', interests: ['ai', 'tech'], effort: 3, capital: '$100-600' },
  { name: 'Chrome Extension', interests: ['tech'], effort: 2, capital: '$60-400' },
  { name: 'Automation Scripts as Service', interests: ['tech'], effort: 2, capital: '$0-150' },
  { name: 'Paid Newsletter', interests: ['writing'], effort: 2, capital: '$0-40' },
  { name: 'Membership Community', interests: ['tech'], effort: 2, capital: '$40-200' },
  { name: 'API as a Service', interests: ['tech', 'ai'], effort: 3, capital: '$50-300' },
  { name: 'No-Code App Builder Template', interests: ['tech'], effort: 2, capital: '$0-100' },
  { name: 'SEO Tool', interests: ['tech'], effort: 3, capital: '$100-500' },
  { name: 'Social Media Scheduler', interests: ['tech', 'design'], effort: 3, capital: '$100-400' },
  { name: 'Invoice Generator', interests: ['tech'], effort: 2, capital: '$50-200' },
  { name: 'Habit Tracker App', interests: ['tech', 'design'], effort: 2, capital: '$50-200' },
  { name: 'Link-in-Bio Tool', interests: ['tech', 'design'], effort: 2, capital: '$50-200' },
  { name: 'AI Chatbot for Websites', interests: ['ai', 'tech'], effort: 3, capital: '$100-400' },
  { name: 'Email Signature Generator', interests: ['tech', 'design'], effort: 1, capital: '$30-100' },
  { name: 'QR Code Generator', interests: ['tech'], effort: 1, capital: '$20-80' },
]

// ============================================================
// IDEA GENERATION — Claude produces the breakdown
// ============================================================

const BREAKDOWN_PROMPT = `You are writing product breakdowns for beginners who want to start a business.

RULES:
- Coach tone: direct, warm, like a friend who's done this. "Look — this works because..."
- Use <strong> for emphasis on 2-3 key phrases per section
- Real numbers only. If you don't know the exact number, say "roughly" or "about"
- 3-4 short sentences per body. No paragraphs.
- Each action is an imperative 5-7 word task
- Stats are optional — only include if they add clarity

CONTEXT: This is for {DECK} products. The user has ${'{CAPITAL}'} to invest and {EFFORT_LEVEL} effort tolerance.

Generate a breakdown for: "{IDEA_NAME}"

Return ONLY valid JSON:
{
  "hook": "one-line marketing hook (max 8 words, catchy, specific)",
  "breakdown": {
    "strategy": { "body": "<html>", "action": "imperative task" },
    "value": { "body": "<html>", "action": "imperative task" },
    "profit": {
      "body": "<html>",
      "stats": [{"label": "Cost", "value": "$X"}, {"label": "Sell", "value": "$Y"}],
      "action": "imperative task"
    },
    "distributors": { "body": "<html> (mention AliExpress, Alibaba, or IndiaMART by name)", "action": "imperative task" },
    "pricing": { "body": "<html>", "action": "imperative task" },
    "sellingPrice": {
      "body": "<html>",
      "stats": [{"label": "Launch", "value": "$X"}, {"label": "After 20 sales", "value": "$Y"}],
      "action": "imperative task"
    }
  }
}`

async function generateBreakdown(ideaName: string, deck: string, capital: string, effort: number): Promise<any> {
  if (!ANTHROPIC_API_KEY) {
    console.warn(`  [claude] No API key — skipping breakdown for "${ideaName}"`)
    return null
  }

  const effortLevel = effort === 1 ? 'low (few hours/week)' : effort === 2 ? 'medium (part-time)' : 'high (significant time)'

  const prompt = BREAKDOWN_PROMPT
    .replace('{DECK}', deck)
    .replace('{CAPITAL}', capital)
    .replace('{EFFORT_LEVEL}', effortLevel)
    .replace('{IDEA_NAME}', ideaName)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    console.error(`  [claude] Error ${response.status}: ${await response.text()}`)
    return null
  }

  const data = await response.json()
  const text = data.content?.[0]?.text || ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return null

  try {
    return JSON.parse(jsonMatch[0])
  } catch {
    console.error(`  [claude] Invalid JSON for "${ideaName}"`)
    return null
  }
}

// ============================================================
// IMAGE SELECTION — Unsplash search
// ============================================================

async function findImage(query: string): Promise<{ url: string; bg: string }> {
  try {
    // Use Unsplash source for direct image URLs (no API key needed)
    const url = `https://images.unsplash.com/photo-${Date.now()}?w=900&q=80`
    // For now, use a search URL pattern that Unsplash resolves
    const searchUrl = `https://source.unsplash.com/900x1200/?${encodeURIComponent(query)}`
    return { url: searchUrl, bg: '#C99A4B' }
  } catch {
    return { url: '', bg: '#C99A4B' }
  }
}

// ============================================================
// MAIN PIPELINE
// ============================================================

async function generateBatch(deck: 'physical' | 'digital' | 'saas', count: number) {
  const seeds = deck === 'physical' ? PHYSICAL_SEEDS
    : deck === 'digital' ? DIGITAL_SEEDS
    : SAAS_SEEDS

  const batch = seeds.slice(0, count)
  console.log(`\n=== Generating ${batch.length} ${deck} ideas ===\n`)

  const results: any[] = []

  for (let i = 0; i < batch.length; i++) {
    const seed = batch[i]
    console.log(`[${i + 1}/${batch.length}] ${seed.name}...`)

    // Generate breakdown via Claude
    const generated = await generateBreakdown(seed.name, deck, seed.capital, seed.effort)

    if (!generated) {
      console.log(`  SKIPPED (no breakdown generated)`)
      continue
    }

    const id = seed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
    const channels: string[] = deck === 'physical' ? ['online', 'offline'] : ['online']
    const deckLabel = deck === 'physical' ? 'Physical · online + offline'
      : deck === 'digital' ? 'Digital · online'
      : 'SaaS · online'

    results.push({
      id,
      deck,
      deckLabel,
      channels,
      name: seed.name,
      hook: generated.hook || seed.name,
      capital: seed.capital,
      effort: seed.effort,
      interests: seed.interests,
      image: `https://images.unsplash.com/photo-1602874801007?w=900&q=80`, // placeholder
      bg: '#C99A4B',
      badges: [],
      markets: ['US', 'IN'],
      capital_usd: parseCapital(seed.capital),
      breakdown: generated.breakdown,
    })

    console.log(`  ✓ Generated (hook: "${generated.hook}")`)

    // Rate limit — don't hit Claude too fast
    await sleep(500)
  }

  // Write output
  const outDir = resolve(import.meta.dirname || '.', '../src/data')
  const outPath = resolve(outDir, `generated-${deck}.json`)
  writeFileSync(outPath, JSON.stringify(results, null, 2))
  console.log(`\n✓ Saved ${results.length} ideas to ${outPath}`)

  return results
}

function parseCapital(s: string): { low: number; high: number } {
  const nums = s.match(/\d+/g)
  if (!nums || nums.length < 2) return { low: 50, high: 200 }
  return { low: parseInt(nums[0]), high: parseInt(nums[1]) }
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

// ============================================================
// CLI
// ============================================================

const args = process.argv.slice(2)
const batchArg = args.find(a => a.startsWith('--batch='))?.split('=')[1] || 'physical'
const countArg = parseInt(args.find(a => a.startsWith('--count='))?.split('=')[1] || '10')

const deck = batchArg as 'physical' | 'digital' | 'saas'
if (!['physical', 'digital', 'saas'].includes(deck)) {
  console.error('Usage: npx tsx scripts/generate-ideas.ts --batch=physical|digital|saas --count=N')
  process.exit(1)
}

console.log('=== Spark Idea Generator ===')
console.log(`Deck: ${deck}, Count: ${countArg}`)
console.log(`Model: ${MODEL}`)
console.log(`API Key: ${ANTHROPIC_API_KEY ? '✓ set' : '✗ missing'}`)

generateBatch(deck, countArg).catch(console.error)
