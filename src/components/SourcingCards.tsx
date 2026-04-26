import { useMemo } from 'react'
import type { Idea, Region } from '../types'
import { findSuppliersForProduct } from '../data/supplier-directory'
import { findSuppliers } from '../lib/supplier-api'
import type { SupplierResult } from '../lib/supplier-api'

interface Props {
  idea: Idea
  region: Region
}

export function SourcingCards({ idea, region }: Props) {
  if (idea.deck === 'digital') return <DigitalTools />
  if (idea.deck === 'saas') return <SaasTools />
  return <PhysicalSourcing idea={idea} region={region} />
}

function SupplierCard({ supplier, isPrimary, isSample }: { supplier: SupplierResult; isPrimary?: boolean; isSample?: boolean }) {
  const platformColors: Record<string, { bg: string; text: string }> = {
    aliexpress: { bg: '#FFE4B5', text: '#1F1B16' },
    alibaba: { bg: '#FF6A00', text: '#fff' },
    amazon: { bg: '#FF9900', text: '#1F1B16' },
    etsy: { bg: '#F16521', text: '#fff' },
  }
  const colors = platformColors[supplier.platform] || platformColors.aliexpress

  return (
    <a href={supplier.url} target="_blank" rel="noopener noreferrer"
      className="block px-4 py-3.5 rounded-xl border transition-all no-underline hover:-translate-y-0.5 hover:shadow-md"
      style={{
        background: isPrimary ? 'rgba(201,154,75,0.08)' : 'var(--color-card)',
        borderColor: isPrimary ? 'rgba(201,154,75,0.3)' : 'var(--color-line-soft)',
      }}>
      <div className="flex justify-between items-start mb-1">
        {isPrimary && (
          <div className="inline-block text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 bg-gold text-ink rounded-full">
            Top rated
          </div>
        )}
        {!isPrimary && <div />}
        {isSample && (
          <span className="text-[9px] text-gray-400 tracking-wide" title="We're verifying real suppliers for this product. Check back this week.">
            Sample data
          </span>
        )}
      </div>

      {/* Supplier name + platform */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-bold px-2 py-0.5 rounded"
          style={{ background: colors.bg, color: colors.text }}>
          {supplier.platform === 'aliexpress' ? 'AliExpress' : supplier.platform === 'alibaba' ? 'Alibaba' : supplier.platform}
        </span>
        <span className="text-xs font-medium text-ink truncate">{supplier.name}</span>
      </div>

      {/* Rating + reviews + badges */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-1">
          <span className="text-amber-400 text-xs">{'★'.repeat(Math.round(supplier.rating))}</span>
          <span className="text-xs font-medium text-ink">{supplier.rating}</span>
        </div>
        <span className="text-[11px] text-ink-mute">{supplier.reviewCount.toLocaleString()} reviews</span>
        {supplier.isGoldMember && (
          <span className="text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded">Gold</span>
        )}
        {supplier.isVerified && (
          <span className="text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">Verified</span>
        )}
      </div>

      {/* Price + MOQ + shipping */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="font-display italic text-lg font-medium text-ink">{supplier.price}</span>
          <span className="text-[11px] text-ink-mute ml-2">MOQ: {supplier.moq}</span>
        </div>
        <span className="text-[11px] text-ink-mute">{supplier.shipsIn}</span>
      </div>

      {/* Orders + shipping from */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[11px] text-ink-mute">{supplier.orderCount}</span>
        <span className="text-[11px] text-ink-mute">Ships from: {supplier.shipsFrom}</span>
      </div>
    </a>
  )
}

function PhysicalSourcing({ idea, region }: { idea: Idea; region: Region }) {
  const { category, searchUrls } = findSuppliersForProduct(idea.name)
  const supplierData = useMemo(() => findSuppliers(idea.name), [idea.name])

  return (
    <div className="flex flex-col gap-2.5">
      {/* Supplier cards with ratings */}
      {supplierData.suppliers.map((supplier, i) => (
        <SupplierCard key={i} supplier={supplier} isPrimary={i === 0} isSample={supplierData.source === 'sample'} />
      ))}

      {supplierData.source === 'sample' && (
        <div className="text-[10px] text-ink-mute text-center py-1">
          Showing category-matched suppliers. Tap to search on platform.
        </div>
      )}

      {/* More platforms */}
      <div className="mt-2">
        <div className="text-[10px] uppercase tracking-[0.1em] text-ink-mute font-medium mb-2">
          Also search on
        </div>
        <div className="flex flex-wrap gap-1.5">
          {searchUrls.filter(s => !['AliExpress', 'Alibaba'].includes(s.platform)).map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-card border border-line-soft rounded-full
                text-[11px] font-medium text-ink no-underline hover:border-line transition-all">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              {s.platform}
            </a>
          ))}
        </div>
      </div>

      {/* China direct sites if available */}
      {category?.chinaDirectSites && category.chinaDirectSites.length > 0 && (
        <div className="mt-2">
          <div className="text-[10px] uppercase tracking-[0.1em] text-ink-mute font-medium mb-2">
            Factory direct
          </div>
          {category.chinaDirectSites.map((site, i) => (
            <a key={i} href={`https://${site.url.replace('https://', '')}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-card border border-line-soft rounded-lg mb-1
                text-xs text-ink no-underline hover:border-line transition-all">
              <span className="text-accent">🏭</span>
              <span className="font-medium">{site.name}</span>
              <span className="text-ink-mute">- {site.specialty}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function DigitalTools() {
  const tools = [
    { label: 'Create with', platform: 'Canva', color: '#7B2FF7', textColor: '#fff', url: 'https://www.canva.com/', price: 'Free', time: 'Start now', primary: true, desc: 'Design templates, presets, ebooks' },
    { label: 'Sell on', platform: 'Gumroad', color: '#FF90E8', textColor: '#1F1B16', url: 'https://gumroad.com/', price: '10% fee', time: '10 min setup', desc: 'List and collect payments instantly' },
    { label: 'Grow with', platform: 'Pinterest', color: '#E60023', textColor: '#fff', url: 'https://business.pinterest.com/', price: 'Free', time: 'Organic', desc: 'Every pin = landing page. Best free traffic.', note: 'Pins last 4 months vs 24 hours on Instagram' },
  ]

  return (
    <div className="flex flex-col gap-2.5">
      {tools.map((t, i) => (
        <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
          className="block px-4 py-3.5 rounded-xl border transition-all no-underline hover:-translate-y-0.5 hover:shadow-md"
          style={{
            background: t.primary ? 'rgba(201,154,75,0.08)' : 'var(--color-card)',
            borderColor: t.primary ? 'rgba(201,154,75,0.3)' : 'var(--color-line-soft)',
          }}>
          {t.primary && <div className="inline-block text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 bg-gold text-ink rounded-full mb-2">Start here</div>}
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: t.color, color: t.textColor }}>{t.platform}</span>
            <span className="text-xs text-ink-mute">{t.desc}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display italic text-lg font-medium text-ink">{t.price}</span>
            <span className="text-[11px] text-ink-mute">{t.time}</span>
          </div>
          {t.note && <div className="text-[11px] text-ink-mute mt-1.5">{t.note}</div>}
        </a>
      ))}
    </div>
  )
}

function SaasTools() {
  const tools = [
    { label: 'Build with', platform: 'Bolt.new', color: '#6366F1', textColor: '#fff', url: 'https://bolt.new/', price: 'Free tier', time: 'Ship in 1 day', primary: true, desc: 'AI builds your app from a prompt' },
    { label: 'Payments', platform: 'Stripe', color: '#635BFF', textColor: '#fff', url: 'https://stripe.com/', price: '2.9% + 30¢', time: '15 min setup', desc: 'Accept money from day one' },
    { label: 'Launch on', platform: 'Product Hunt', color: '#DA552F', textColor: '#fff', url: 'https://www.producthunt.com/', price: 'Free', time: 'Plan launch day', desc: 'Get your first 100 users free', note: 'Launch Tuesday/Wednesday for max visibility' },
  ]

  return (
    <div className="flex flex-col gap-2.5">
      {tools.map((t, i) => (
        <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
          className="block px-4 py-3.5 rounded-xl border transition-all no-underline hover:-translate-y-0.5 hover:shadow-md"
          style={{
            background: t.primary ? 'rgba(201,154,75,0.08)' : 'var(--color-card)',
            borderColor: t.primary ? 'rgba(201,154,75,0.3)' : 'var(--color-line-soft)',
          }}>
          {t.primary && <div className="inline-block text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 bg-gold text-ink rounded-full mb-2">Start here</div>}
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ background: t.color, color: t.textColor }}>{t.platform}</span>
            <span className="text-xs text-ink-mute">{t.desc}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display italic text-lg font-medium text-ink">{t.price}</span>
            <span className="text-[11px] text-ink-mute">{t.time}</span>
          </div>
          {t.note && <div className="text-[11px] text-ink-mute mt-1.5">{t.note}</div>}
        </a>
      ))}
    </div>
  )
}
