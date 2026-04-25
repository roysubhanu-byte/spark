import type { Idea, Region } from '../types'

interface Props {
  idea: Idea
  region: Region
}

interface CardData {
  tier: string
  label: string
  description: string
  platform: string
  color: string
  textColor: string
  priceRange: string
  timeframe: string
  searchUrl: string
  note?: string
  primary?: boolean
}

export function SourcingCards({ idea, region }: Props) {
  const cards = idea.deck === 'physical'
    ? getPhysicalSourcing(idea.name, region)
    : idea.deck === 'digital'
      ? getDigitalTools(idea.name)
      : getSaasTools(idea.name)

  return (
    <div className="flex flex-col gap-2.5">
      {cards.map((card, i) => (
        <a key={i}
          href={card.searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-3.5 rounded-xl border transition-all no-underline
            hover:-translate-y-0.5 hover:shadow-md
            ${card.primary
              ? 'bg-gold/[0.08] border-gold/30'
              : 'bg-card border-line-soft'}"
          style={card.primary ? { background: 'rgba(201,154,75,0.08)', borderColor: 'rgba(201,154,75,0.3)' } : undefined}
        >
          {card.primary && (
            <div className="inline-block text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5
              bg-gold text-ink rounded-full mb-2">
              Recommended
            </div>
          )}
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded"
              style={{ background: card.color, color: card.textColor }}>
              {card.platform}
            </span>
            <span className="text-xs text-ink-mute">{card.description}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-display italic text-xl font-medium text-ink">{card.priceRange}</span>
              <span className="text-xs text-ink-mute ml-2">{card.label}</span>
            </div>
            <span className="text-[11px] text-ink-mute">{card.timeframe}</span>
          </div>
          {card.note && (
            <div className="text-[11px] text-ink-mute mt-1.5">{card.note}</div>
          )}
        </a>
      ))}
    </div>
  )
}

function getPhysicalSourcing(ideaName: string, region: Region): CardData[] {
  const q = encodeURIComponent(ideaName.toLowerCase().replace(/\s+/g, '+'))
  const indiaMartQ = encodeURIComponent(ideaName.toLowerCase().replace(/\s+/g, '-'))

  return [
    {
      tier: 'test',
      label: 'Test first',
      description: '5-10 units to test quality',
      platform: 'AliExpress',
      color: '#FFE4B5',
      textColor: '#1F1B16',
      priceRange: '$15–40',
      timeframe: '7–14 days',
      searchUrl: `https://www.aliexpress.com/wholesale?SearchText=${q}+supplies`,
      primary: true,
    },
    {
      tier: 'starter',
      label: 'Starter batch',
      description: 'MOQ 50-100 units, real margins',
      platform: 'Alibaba',
      color: '#FF6A00',
      textColor: '#fff',
      priceRange: '$50–200',
      timeframe: '14–30 days',
      searchUrl: `https://www.alibaba.com/trade/search?SearchText=${q}`,
      note: 'Message 3 suppliers, compare samples before ordering',
    },
    ...(region === 'IN' ? [{
      tier: 'local' as const,
      label: 'Local supplier',
      description: 'Indian manufacturers direct',
      platform: 'IndiaMART',
      color: '#FF6F00',
      textColor: '#fff',
      priceRange: '₹500–5,000',
      timeframe: '3–7 days',
      searchUrl: `https://www.indiamart.com/proddetail/${indiaMartQ}/`,
      note: 'Negotiate MOQ, ask for samples first',
    }] : [{
      tier: 'scale' as const,
      label: 'Scale up',
      description: 'Factory direct, best unit price',
      platform: '1688',
      color: '#FF4400',
      textColor: '#fff',
      priceRange: '$0.30–2/unit',
      timeframe: '30–45 days',
      searchUrl: `https://s.1688.com/selloffer/offer_search.htm?keywords=${q}`,
      note: 'When you are selling 100+/month. Use sourcing agent.',
    }]),
  ]
}

function getDigitalTools(_ideaName: string): CardData[] {
  return [
    {
      tier: 'create',
      label: 'Create with',
      description: 'Design and build your product',
      platform: 'Canva',
      color: '#7B2FF7',
      textColor: '#fff',
      priceRange: 'Free',
      timeframe: 'Start now',
      searchUrl: 'https://www.canva.com/',
      primary: true,
    },
    {
      tier: 'sell',
      label: 'Sell on',
      description: 'List and collect payments',
      platform: 'Gumroad',
      color: '#FF90E8',
      textColor: '#1F1B16',
      priceRange: '10% fee',
      timeframe: 'Setup in 10 min',
      searchUrl: 'https://gumroad.com/',
    },
    {
      tier: 'grow',
      label: 'Grow with',
      description: 'Free traffic that compounds',
      platform: 'Pinterest',
      color: '#E60023',
      textColor: '#fff',
      priceRange: 'Free',
      timeframe: 'Organic growth',
      searchUrl: 'https://business.pinterest.com/',
      note: 'Every pin is a landing page. Best free channel for digital products.',
    },
  ]
}

function getSaasTools(_ideaName: string): CardData[] {
  return [
    {
      tier: 'create',
      label: 'Build with',
      description: 'AI builds your app from a prompt',
      platform: 'Bolt.new',
      color: '#6366F1',
      textColor: '#fff',
      priceRange: 'Free tier',
      timeframe: 'Ship in 1 day',
      searchUrl: 'https://bolt.new/',
      primary: true,
    },
    {
      tier: 'sell',
      label: 'Payments',
      description: 'Accept money from day one',
      platform: 'Stripe',
      color: '#635BFF',
      textColor: '#fff',
      priceRange: '2.9% + 30¢',
      timeframe: 'Setup in 15 min',
      searchUrl: 'https://stripe.com/',
    },
    {
      tier: 'grow',
      label: 'Launch on',
      description: 'Get your first 100 users free',
      platform: 'Product Hunt',
      color: '#DA552F',
      textColor: '#fff',
      priceRange: 'Free',
      timeframe: 'Plan your launch day',
      searchUrl: 'https://www.producthunt.com/',
      note: 'Ship on Tuesday/Wednesday for maximum visibility.',
    },
  ]
}
