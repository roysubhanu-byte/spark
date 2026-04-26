import { IDEAS as HAND_CRAFTED } from './ideas'
import { PHYSICAL_IDEAS } from './generated-physical'
import { SAAS_IDEAS } from './generated-saas'
import type { Idea } from '../types'

// Merge: hand-crafted ideas take priority (richer data), then generated fill the rest
const handCraftedIds = new Set(HAND_CRAFTED.map((i: Idea) => i.id))
const generatedNew = [...PHYSICAL_IDEAS, ...SAAS_IDEAS].filter((i: Idea) => !handCraftedIds.has(i.id))
export const IDEAS: Idea[] = [...HAND_CRAFTED, ...generatedNew]

export { MACRO_VARIATIONS } from './macros'
export { INSPIRE_PROFILES } from './inspire'
export { SOURCES_DATA } from './sources'
