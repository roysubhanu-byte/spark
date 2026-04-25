import { useEffect, useState } from 'react'

let toastQueue: { text: string; id: number }[] = []
let listeners: (() => void)[] = []
let nextId = 0

export function showToast(text: string) {
  toastQueue = [{ text, id: nextId++ }]
  listeners.forEach(l => l())
}

export function Toast() {
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const listener = () => {
      const t = toastQueue[0]
      if (t) {
        setToast(t)
        setVisible(true)
        setTimeout(() => setVisible(false), 1800)
      }
    }
    listeners.push(listener)
    return () => { listeners = listeners.filter(l => l !== listener) }
  }, [])

  if (!toast) return null

  return (
    <div
      className={`absolute top-5 left-1/2 -translate-x-1/2 z-[100] px-[18px] py-3
        bg-ink text-bg rounded-full text-[13px] font-medium shadow-md
        flex items-center gap-2 transition-transform duration-300
        ${visible ? 'translate-y-0' : '-translate-y-20'}
      `}
      style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1.4)' }}
    >
      <span className="w-[18px] h-[18px] bg-sage rounded-full text-white text-[11px] font-bold
        flex items-center justify-center">✓</span>
      <span>{toast.text}</span>
    </div>
  )
}
