import type { Screen } from '../hooks/useStore'

interface Props {
  active: Screen
  openTodos: number
  onNav: (screen: Screen) => void
}

const tabs: { screen: Screen; icon: string; label: string }[] = [
  { screen: 'deck', icon: '🃏', label: 'Discover' },
  { screen: 'saved', icon: '💖', label: 'Saved' },
  { screen: 'todos', icon: '📋', label: 'Plan' },
  { screen: 'settings', icon: '⚙️', label: 'Settings' },
]

export function BottomNav({ active, openTodos, onNav }: Props) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 flex justify-around
      px-4 pt-[10px] pb-6 bg-bg/85 backdrop-blur-[20px] backdrop-saturate-[1.4]
      border-t border-line-soft z-10">
      {tabs.map(t => (
        <button
          key={t.screen}
          onClick={() => onNav(t.screen)}
          className={`flex-1 bg-transparent border-none py-2 cursor-pointer flex flex-col
            items-center gap-1 font-body relative transition-colors duration-200
            ${active === t.screen ? 'text-ink' : 'text-ink-mute'}`}
        >
          <span className="text-xl leading-none">{t.icon}</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.08em]">{t.label}</span>
          {t.screen === 'todos' && openTodos > 0 && (
            <span className="absolute top-1 translate-x-[14px] min-w-4 h-4 bg-accent text-white
              rounded-lg text-[9px] font-bold px-1 flex items-center justify-center">
              {openTodos}
            </span>
          )}
        </button>
      ))}
    </nav>
  )
}
