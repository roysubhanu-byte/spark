export function TrustStrip() {
  return (
    <div className="flex items-center justify-center gap-2 mx-[22px] mb-2 px-3.5 py-[9px]
      bg-gradient-to-br from-accent/[0.08] to-gold/[0.08] border border-accent/[0.18]
      rounded-full text-[11px] text-ink-soft tracking-[0.01em]">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
      </svg>
      <span>We scanned <strong className="text-ink font-semibold">190K+</strong> businesses to find these ideas</span>
    </div>
  )
}
