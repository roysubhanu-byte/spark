import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-full max-w-[440px] mx-auto bg-bg overflow-hidden
      sm:max-w-[400px] sm:h-[calc(100vh-48px)] sm:max-h-[880px] sm:rounded-[44px]
      sm:shadow-[0_0_0_12px_#1a1612,0_0_0_13px_#3a342c,0_40px_80px_rgba(0,0,0,0.5)]
      sm:border sm:border-white/[0.04]">
      {children}
    </div>
  )
}
