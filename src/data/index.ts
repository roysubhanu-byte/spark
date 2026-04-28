import { IDEAS as HAND_CRAFTED } from './ideas'
import { PHYSICAL_IDEAS } from './generated-physical'
import { SAAS_IDEAS } from './generated-saas'
import { PUBLISH_IDS } from './publish-list'
import { INSPIRE_PROFILES } from './inspire'
import type { Idea, InspireProfile } from '../types'

// Merge: hand-crafted ideas take priority (richer data), then generated fill the rest
const handCraftedIds = new Set(HAND_CRAFTED.map((i: Idea) => i.id))
const generatedNew = [...PHYSICAL_IDEAS, ...SAAS_IDEAS].filter((i: Idea) => !handCraftedIds.has(i.id))
const ALL_IDEAS: Idea[] = [...HAND_CRAFTED, ...generatedNew]

// Only show published (audited + approved) ideas to users
export const IDEAS: Idea[] = ALL_IDEAS.filter(i => PUBLISH_IDS.has(i.id))

// Admin access to everything (for /admin routes)
export const ALL_IDEAS_UNFILTERED: Idea[] = ALL_IDEAS

export { MACRO_VARIATIONS } from './macros'
export { INSPIRE_PROFILES } from './inspire'
export { SOURCES_DATA } from './sources'

// Returns inspire profiles for an idea, falling back to a deck-appropriate
// default set when the idea has no curated profiles in INSPIRE_PROFILES.
// Without this fallback, ProductPage hides the "Real people doing this"
// section entirely for ideas that aren't keyed (most generated ideas).
const FALLBACK_PROFILES_PHYSICAL: InspireProfile[] = [
  { handle: 'wildflower_wraps', name: 'Sarah Chen', verified: false, followers: '34.2K', bio: 'Handmade goods • Portland, OR • Ships Mon-Fri • Link below for custom orders', tiles: ['photo-1542601906990-b4d3fb778b09', 'photo-1532996122724-e3a507b0e2a3', 'photo-1520052205864-92d242b3a76b', 'photo-1581092580497-e0d23cbdf1dc'] },
  { handle: 'mason_makes', name: 'Mason Rodriguez', verified: false, followers: '8.7K', bio: 'side hustle from my garage workshop. Austin TX. DM for wholesale', tiles: ['photo-1513364776144-60967b0f800f', 'photo-1452587925148-ce544e77e70d', 'photo-1513519245088-0e12902e35ca', 'photo-1558618666-fcd25c85f82e'] },
  { handle: 'honeybee_homegoods', name: 'Emma & Jake', verified: false, followers: '67.1K', bio: 'Wife + husband duo • Featured in @goodhousekeeping • Vermont • Shop link in bio', tiles: ['photo-1530103862676-de8c9debad1d', 'photo-1513151233558-d860c5398176', 'photo-1527529482837-4698179dc6ce', 'photo-1464349095431-e9a21285b5f3'] },
  { handle: 'rewrap_refresh', name: 'Priya Patel', verified: false, followers: '3.8K', bio: 'Making it one piece at a time • Chicago • New mama learning as I go', tiles: ['photo-1445205170230-053b83016050', 'photo-1490481651871-ab68de25d43d', 'photo-1558171813-4c088753af8f', 'photo-1487222477894-8943e31ef7b2'] },
]

const FALLBACK_PROFILES_SAAS: InspireProfile[] = [
  { handle: 'sarahbuildsthings', name: 'Sarah Chen', verified: false, followers: '23.1K', bio: "Building micro-tools that don't suck • Latest: Tab Manager Pro chrome ext. Austin, TX. Link below", tiles: ['photo-1517180102446-f3ece451e9d8', 'photo-1498050108023-c5249f4df085', 'photo-1555066931-4365d14bab8c', 'photo-1517694712202-14dd9538aa97'] },
  { handle: 'pixelmarcos', name: 'Marco Silva', verified: false, followers: '67.2K', bio: 'Indie maker • 4 profitable SaaS tools • Teaching you to ship fast. Newsletter in bio', tiles: ['photo-1517180102446-f3ece451e9d8', 'photo-1498050108023-c5249f4df085', 'photo-1555066931-4365d14bab8c', 'photo-1517694712202-14dd9538aa97'] },
  { handle: 'jenncodes', name: 'Jenn Wu', verified: false, followers: '8.7K', bio: 'chrome extensions for productivity nerds. currently building my 3rd tool from vancouver', tiles: ['photo-1517180102446-f3ece451e9d8', 'photo-1498050108023-c5249f4df085', 'photo-1555066931-4365d14bab8c', 'photo-1517694712202-14dd9538aa97'] },
  { handle: 'alexshipsdaily', name: 'Alex Rodriguez', verified: false, followers: '45.8K', bio: 'Solo dev building tools people actually want • $12K MRR • Berlin → SF. DMs open for collabs', tiles: ['photo-1517180102446-f3ece451e9d8', 'photo-1498050108023-c5249f4df085', 'photo-1555066931-4365d14bab8c', 'photo-1517694712202-14dd9538aa97'] },
]

export function getProfilesForIdea(idea: Idea): InspireProfile[] {
  const curated = INSPIRE_PROFILES[idea.id]
  if (curated && curated.length > 0) return curated
  return idea.deck === 'saas' ? FALLBACK_PROFILES_SAAS : FALLBACK_PROFILES_PHYSICAL
}
