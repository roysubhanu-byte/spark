import type { Region, RegionInfo } from '../types'

export const REGIONS: Partial<Record<Region, RegionInfo>> & Record<'US' | 'IN', RegionInfo> = {
  US: { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$ ', rate: 1 },
  IN: { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', rate: 83 },
}

export const ACTIVE_REGIONS: Region[] = ['US', 'IN']

export function formatMoney(lowUsd: number, highUsd: number, region: Region): string {
  const r = REGIONS[region] || REGIONS.US
  const lo = Math.round(lowUsd * r.rate)
  const hi = Math.round(highUsd * r.rate)
  if (lo === hi) return `${r.symbol}${lo.toLocaleString()}`
  return `${r.symbol}${lo.toLocaleString()} – ${hi.toLocaleString()}`
}

export function formatPrice(usd: number, region: Region): string {
  const r = REGIONS[region] || REGIONS.US
  return `${r.symbol}${Math.round(usd * r.rate).toLocaleString()}`
}
