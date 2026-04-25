import type { TodoItem } from '../types'

interface Props {
  todos: TodoItem[]
  onToggle: (id: string) => void
}

export function TodoList({ todos, onToggle }: Props) {
  if (todos.length === 0) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="px-6 pt-5 pb-3 border-b border-line-soft">
          <h1 className="font-display font-light text-[32px] tracking-tight mb-1">
            Your <em className="italic text-accent font-normal">plan</em>
          </h1>
          <p className="text-[13px] text-ink-mute">No tasks yet. Swipe & save first.</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-7">
            <div className="text-[44px] mb-3.5">📋</div>
            <h3 className="font-display text-2xl font-normal mb-1.5">Your plan is empty</h3>
            <p className="text-[13px] text-ink-soft leading-relaxed">
              Swipe ideas and tap "Take action" inside<br/>each one to build your plan.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Group by idea
  const grouped: Record<string, { name: string; image: string; tasks: TodoItem[] }> = {}
  todos.forEach(t => {
    if (!grouped[t.ideaId]) grouped[t.ideaId] = { name: t.ideaName, image: t.ideaImage, tasks: [] }
    grouped[t.ideaId].tasks.push(t)
  })

  const totalOpen = todos.filter(t => !t.done).length
  const totalDone = todos.filter(t => t.done).length

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="px-6 pt-5 pb-3 border-b border-line-soft shrink-0">
        <h1 className="font-display font-light text-[32px] tracking-tight mb-1">
          Your <em className="italic text-accent font-normal">plan</em>
        </h1>
        <p className="text-[13px] text-ink-mute">{totalOpen} open · {totalDone} done</p>
      </div>
      <div className="flex-1 overflow-y-auto px-[22px] pt-4 pb-20 scrollbar-hide">
        {Object.entries(grouped).map(([ideaId, group]) => {
          const done = group.tasks.filter(t => t.done).length
          return (
            <div key={ideaId} className="mb-7">
              <div className="flex items-center gap-3 mb-3.5 px-1">
                <div className="w-8 h-8 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${group.image})` }} />
                <div className="font-display text-[17px] font-medium tracking-tight flex-1">{group.name}</div>
                <div className="text-[11px] text-ink-mute tabular-nums">{done} / {group.tasks.length}</div>
              </div>
              {group.tasks.map(t => (
                <div key={t.id}
                  onClick={() => onToggle(t.id)}
                  className={`flex items-start gap-3 px-3.5 py-3 bg-card border border-line-soft rounded-xl
                    mb-2 cursor-pointer transition-all hover:border-line
                    ${t.done ? 'opacity-70' : ''}`}>
                  <div className={`w-[22px] h-[22px] rounded-full border-[1.5px] shrink-0 mt-px
                    flex items-center justify-center transition-all
                    ${t.done ? 'bg-sage border-sage' : 'border-line'}`}>
                    {t.done && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <div className="flex-1 text-sm leading-[1.45]">
                    <span className={t.done ? 'text-ink-mute line-through' : 'text-ink'}>{t.text}</span>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mt-1">{t.sectionLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
