import type { Region, RegionInfo } from '../types'

export const REGIONS: Record<Region, RegionInfo> = {
  US: { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$ ', rate: 1 },
  IN: { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', rate: 83 },
  AE: { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', symbol: 'AED ', rate: 3.67 },
  RU: { code: 'RU', name: 'Russia', flag: '🇷🇺', currency: 'RUB', symbol: '₽', rate: 92 },
  KZ: { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', currency: 'KZT', symbol: '₸', rate: 450 },
}

export const ACTIVE_REGIONS: Region[] = ['US', 'IN', 'AE', 'RU', 'KZ']

export function formatMoney(lowUsd: number, highUsd: number, region: Region): string {
  const r = REGIONS[region]
  const lo = Math.round(lowUsd * r.rate)
  const hi = Math.round(highUsd * r.rate)
  if (lo === hi) return `${r.symbol}${lo.toLocaleString()}`
  return `${r.symbol}${lo.toLocaleString()} – ${hi.toLocaleString()}`
}

export function formatPrice(usd: number, region: Region): string {
  const r = REGIONS[region]
  return `${r.symbol}${Math.round(usd * r.rate).toLocaleString()}`
}
