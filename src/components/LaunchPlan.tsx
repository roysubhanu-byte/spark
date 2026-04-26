import { useMemo } from 'react'
import type { ActivePlan, Deck } from '../types'
import { getPlanForIdea } from '../data/launch-plans'

interface Props {
  plan: ActivePlan
  deck: Deck
  interests: string[]
  onComplete: (day: number) => void
  onBack: () => void
}

const CATEGORY_COLORS: Record<string, string> = {
  research: 'bg-blue-100 text-blue-700',
  source: 'bg-amber-100 text-amber-700',
  create: 'bg-purple-100 text-purple-700',
  brand: 'bg-pink-100 text-pink-700',
  list: 'bg-green-100 text-green-700',
  sell: 'bg-emerald-100 text-emerald-700',
}

export function LaunchPlan({ plan, deck, interests, onComplete, onBack }: Props) {
  const template = useMemo(() => getPlanForIdea(deck, interests), [deck, interests])
  const tasks = template.tasks
  const completedCount = plan.tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const progress = Math.round((completedCount / totalTasks) * 100)

  const startDate = new Date(plan.startedAt)
  const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const currentDay = Math.min(daysSinceStart + 1, 30)

  // Streak calculation
  const streak = plan.streak

  // Group tasks by phase using template's phase definitions
  const phases = useMemo(() =>
    template.phases.map(p => ({
      name: p.name,
      days: tasks.filter(t => t.day >= p.range[0] && t.day <= p.range[1]),
    })),
  [template, tasks])

  return (
    <div className="absolute inset-0 bg-bg flex flex-col z-40 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-5 pt-4 pb-3">
        <button onClick={onBack}
          className="text-ink-soft text-sm font-body cursor-pointer bg-transparent border-none flex items-center gap-1 mb-3">
          ← Back
        </button>

        {/* Plan hero */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${plan.ideaImage})` }} />
          <div className="flex-1">
            <div className="font-display text-xl font-normal tracking-tight">{plan.ideaName}</div>
            <div className="text-xs text-ink-mute mt-0.5">Day {currentDay} of 30</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] uppercase tracking-[0.1em] text-ink-mute mb-1.5">
            <span>{completedCount}/{totalTasks} tasks done</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-line rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent to-sage rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gold/10 border border-gold/20 rounded-lg mb-2">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-medium text-ink">{streak} day streak!</span>
            <span className="text-xs text-ink-mute">Keep going</span>
          </div>
        )}
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-5 pb-20 scrollbar-hide">
        {phases.map((phase, pi) => {
          if (phase.days.length === 0) return null
          return (
            <div key={pi} className="mb-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-accent font-medium mb-3">
                {phase.name}
              </div>
              {phase.days.map(task => {
                const planTask = plan.tasks.find(t => t.day === task.day)
                const isCompleted = planTask?.completed || false
                const isToday = task.day === currentDay
                const isLocked = task.day > currentDay + 1 // can do today + tomorrow

                return (
                  <div key={task.day}
                    onClick={() => !isCompleted && !isLocked && onComplete(task.day)}
                    className={`flex items-start gap-3 px-4 py-3.5 rounded-xl mb-2 transition-all
                      ${isToday ? 'bg-ink text-bg border border-ink shadow-md' :
                        isCompleted ? 'bg-card border border-line-soft opacity-70' :
                        isLocked ? 'bg-bg-deep border border-line-soft opacity-40' :
                        'bg-card border border-line-soft cursor-pointer hover:border-line'}
                    `}>
                    {/* Checkbox */}
                    <div className={`w-6 h-6 rounded-full border-[1.5px] shrink-0 mt-0.5
                      flex items-center justify-center transition-all
                      ${isCompleted ? 'bg-sage border-sage' :
                        isToday ? 'border-bg/40' :
                        'border-line'}`}>
                      {isCompleted && <span className="text-white text-xs font-bold">✓</span>}
                      {isLocked && !isCompleted && <span className="text-ink-mute text-[10px]">🔒</span>}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[10px] uppercase tracking-[0.08em] font-medium px-1.5 py-0.5 rounded
                          ${isToday ? 'bg-bg/20 text-bg/80' : CATEGORY_COLORS[task.category] || 'bg-line text-ink-mute'}`}>
                          Day {task.day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] uppercase tracking-[0.08em] font-bold text-gold">
                            Today
                          </span>
                        )}
                      </div>
                      <div className={`text-sm font-medium ${
                        isCompleted ? 'line-through text-ink-mute' :
                        isToday ? 'text-bg' : 'text-ink'
                      }`}>
                        {task.title}
                      </div>
                      <div className={`text-xs mt-0.5 leading-relaxed ${
                        isToday ? 'text-bg/70' : 'text-ink-mute'
                      }`}>
                        {task.description}
                      </div>
                      {task.estimatedMinutes > 0 && (
                        <div className={`text-[10px] mt-1 ${isToday ? 'text-bg/50' : 'text-ink-mute'}`}>
                          ~{task.estimatedMinutes} min
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

