import { useMemo } from 'react'
import type { ActivePlan } from '../types'

interface Props {
  plan: ActivePlan
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

export function LaunchPlan({ plan, onComplete, onBack }: Props) {
  const tasks = getDefaultLaunchTasks(plan.ideaId)
  const completedCount = plan.tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const progress = Math.round((completedCount / totalTasks) * 100)

  const startDate = new Date(plan.startedAt)
  const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const currentDay = Math.min(daysSinceStart + 1, 30)

  // Streak calculation
  const streak = plan.streak

  // Group tasks by phase
  const phases = useMemo(() => [
    { name: 'Research & Decide', days: tasks.filter(t => t.day <= 3) },
    { name: 'Source & Sample', days: tasks.filter(t => t.day >= 4 && t.day <= 12) },
    { name: 'Build & Brand', days: tasks.filter(t => t.day >= 13 && t.day <= 18) },
    { name: 'List & Launch', days: tasks.filter(t => t.day >= 19 && t.day <= 24) },
    { name: 'First Sale Sprint', days: tasks.filter(t => t.day >= 25) },
  ], [tasks])

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

// Default 30-day plan template (will be customized per idea type later)
function getDefaultLaunchTasks(_ideaId: string) {
  return [
    { day: 1, title: 'Pick your exact product', description: 'Browse the macro variations. Pick ONE specific product type to start with.', category: 'research', estimatedMinutes: 10 },
    { day: 2, title: 'Research 5 competitors', description: 'Find 5 sellers on Etsy/Amazon selling this. Screenshot their prices, photos, reviews.', category: 'research', estimatedMinutes: 20 },
    { day: 3, title: 'Set your target price', description: 'Based on competitor research, pick your selling price. Use the profit calculator.', category: 'research', estimatedMinutes: 10 },
    { day: 4, title: 'Order your first sample', description: 'Go to AliExpress, find a supplier, order 5-10 units to test quality.', category: 'source', estimatedMinutes: 30 },
    { day: 5, title: 'Pick your brand name', description: 'Pick something simple, memorable, and available as an Instagram handle.', category: 'brand', estimatedMinutes: 15 },
    { day: 6, title: 'Create your logo', description: 'Use Canva (free). Pick a simple font + icon. Don\'t overthink this — you can change it later.', category: 'brand', estimatedMinutes: 20 },
    { day: 7, title: 'Set up Instagram', description: 'Create a business account with your brand name. Add bio, logo, and 1 post saying "coming soon."', category: 'brand', estimatedMinutes: 15 },
    { day: 8, title: 'Design your packaging', description: 'Simple label or sticker. Canva template. Include your brand name + Instagram handle.', category: 'brand', estimatedMinutes: 20 },
    { day: 9, title: 'Learn product photography', description: 'Watch one 10-min YouTube tutorial on product photography with a phone. Natural light, clean background.', category: 'create', estimatedMinutes: 15 },
    { day: 10, title: 'Practice with what you have', description: 'Take 10 practice photos of any object at home. Get comfortable with angles and lighting.', category: 'create', estimatedMinutes: 20 },
    { day: 11, title: 'Set up your seller account', description: 'Create an account on Etsy, eBay, or Meesho (depending on your market). Don\'t list anything yet.', category: 'list', estimatedMinutes: 20 },
    { day: 12, title: 'Check your sample status', description: 'Track your AliExpress order. If it\'s delayed, message the supplier.', category: 'source', estimatedMinutes: 5 },
    { day: 13, title: 'Unbox and test your sample', description: 'Check quality. Take notes on what\'s good and what needs improvement.', category: 'create', estimatedMinutes: 15 },
    { day: 14, title: 'Make your first 3 products', description: 'If it requires assembly/customization, do it now. If not, package 3 units.', category: 'create', estimatedMinutes: 30 },
    { day: 15, title: 'Photograph your products', description: 'Take 5-7 photos of each product. Include lifestyle shots (in use) and clean product shots.', category: 'create', estimatedMinutes: 30 },
    { day: 16, title: 'Write your listing title', description: 'Include keywords buyers search for. Look at competitor titles for inspiration.', category: 'list', estimatedMinutes: 15 },
    { day: 17, title: 'Write your listing description', description: 'Benefits first, features second. Include dimensions, materials, care instructions.', category: 'list', estimatedMinutes: 20 },
    { day: 18, title: 'Set your tags and categories', description: 'Use all available tags. Copy tags from top-selling competitors. Be specific.', category: 'list', estimatedMinutes: 15 },
    { day: 19, title: 'Publish your first listing', description: 'Upload photos, title, description, tags, price. Hit publish. You\'re live!', category: 'list', estimatedMinutes: 20 },
    { day: 20, title: 'Share on Instagram', description: 'Post your product photos. Add relevant hashtags. Share to your story.', category: 'sell', estimatedMinutes: 15 },
    { day: 21, title: 'Ask 5 friends to view your listing', description: 'Send the link. Ask them to favorite/save it. Early engagement boosts visibility.', category: 'sell', estimatedMinutes: 10 },
    { day: 22, title: 'List product #2', description: 'More listings = more visibility. Add a second product or variation.', category: 'list', estimatedMinutes: 20 },
    { day: 23, title: 'Join 3 relevant communities', description: 'Facebook groups, Reddit subs, or Discord servers in your niche. Don\'t sell — add value.', category: 'sell', estimatedMinutes: 15 },
    { day: 24, title: 'List product #3', description: 'Keep building inventory. Three listings is the minimum for credibility.', category: 'list', estimatedMinutes: 20 },
    { day: 25, title: 'Optimize based on views', description: 'Check your listing stats. If views are low, update your title and photos.', category: 'sell', estimatedMinutes: 15 },
    { day: 26, title: 'Post a "behind the scenes" reel', description: 'Show your workspace, your process, your packaging. People buy from people.', category: 'sell', estimatedMinutes: 20 },
    { day: 27, title: 'Offer a launch discount', description: '15% off first order. Share the code on Instagram stories. Creates urgency.', category: 'sell', estimatedMinutes: 10 },
    { day: 28, title: 'Message potential customers', description: 'Find people who liked competitor products. Send a friendly intro (not spam).', category: 'sell', estimatedMinutes: 20 },
    { day: 29, title: 'Review and adjust pricing', description: 'Compare your views/sales to competitors. Adjust if needed.', category: 'sell', estimatedMinutes: 10 },
    { day: 30, title: 'Your 30-day review', description: 'What worked? What didn\'t? Order your next batch if sales are coming. Celebrate how far you\'ve come!', category: 'sell', estimatedMinutes: 15 },
  ]
}
