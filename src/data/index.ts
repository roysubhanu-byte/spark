import { IDEAS as HAND_CRAFTED } from './ideas'
import { PHYSICAL_IDEAS } from './generated-physical'
import { SAAS_IDEAS } from './generated-saas'
import { PUBLISH_IDS } from './publish-list'
import type { Idea } from '../types'

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
