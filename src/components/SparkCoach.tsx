import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Idea } from '../types'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface Props {
  idea: Idea | null
  open: boolean
  onClose: () => void
}

const SUGGESTED_QUESTIONS = [
  "How do I start this business this weekend?",
  "What's the first thing I should buy?",
  "How much can I realistically make in month 1?",
  "Who's my ideal first customer?",
  "What mistakes do beginners make with this?",
  "How do I price my first batch?",
]

// System prompt sent to the edge function for context
export const COACH_SYSTEM_PROMPT = `You are Spark Coach, a friendly business mentor inside the Spark app. You help people who are about to start their first small business.

RULES:
- Be encouraging but honest. Don't oversell.
- Give specific, actionable advice. Not generic motivational talk.
- Keep answers short (2-4 paragraphs max). Mobile app, people don't read walls of text.
- Use real numbers when possible (costs, margins, timelines).
- Use contractions (you're, it's, don't).
- If you don't know something specific, say so and suggest where to find the answer.
- Never say "leverage", "synergy", "ecosystem", or any corporate buzzwords.
- Reference the specific business idea they're asking about.`

function buildContext(idea: Idea): string {
  const sections = idea.breakdown
  return `The user is exploring this business idea:
Name: ${idea.name}
Type: ${idea.deck}
Hook: ${idea.hook}
Starting capital: ${idea.capital}
Effort level: ${idea.effort === 1 ? 'Easy weekend project' : idea.effort === 2 ? 'Real commitment' : 'Full-time builder'}

Breakdown:
- Strategy: ${sections.strategy.body}
- Who buys: ${sections.value.body}
- Profit: ${sections.profit.body}
- Materials: ${sections.distributors.body}
- Pricing: ${sections.pricing.body}
- Where to sell: ${sections.sellingPrice.body}`
}

export function SparkCoach({ idea, open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset messages when idea changes
  useEffect(() => {
    if (idea) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Hey! I'm your Spark Coach. You're looking at **${idea.name}** — ${idea.hook.toLowerCase()}\n\nAsk me anything about starting this business. I'll give you real answers, not generic advice.`,
        timestamp: Date.now(),
      }])
    }
  }, [idea?.id])

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !idea || loading) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Build messages for API
      const apiMessages = messages
        .filter(m => m.id !== 'welcome')
        .concat(userMsg)
        .map(m => ({ role: m.role, content: m.content }))

      const context = buildContext(idea)

      // Call Claude via Supabase edge function or direct API
      const response = await callCoach(context, apiMessages)

      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }])
    } catch {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Try again in a moment.",
        timestamp: Date.now(),
      }])
    } finally {
      setLoading(false)
    }
  }, [idea, messages, loading])

  if (!open || !idea) return null

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-50 bg-bg flex flex-col"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-line-soft shrink-0">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-accent font-medium">Spark Coach</div>
            <div className="text-sm font-medium text-ink truncate max-w-[240px]">{idea.name}</div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-card border border-line-soft flex items-center justify-center
              text-ink-mute text-sm cursor-pointer hover:bg-line-soft transition-colors">
            x
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-hide">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user'
                  ? 'bg-ink text-bg rounded-br-md'
                  : 'bg-card border border-line-soft text-ink rounded-bl-md'
                }`}
              >
                <SimpleMarkdown text={msg.content} />
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="px-4 py-3 bg-card border border-line-soft rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-ink-mute"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Suggested questions (only show when few messages) */}
          {messages.length <= 1 && !loading && (
            <div className="pt-2">
              <div className="text-[10px] uppercase tracking-[0.1em] text-ink-mute font-medium mb-2">
                Try asking
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-2 bg-card border border-line-soft rounded-xl text-xs text-ink
                      cursor-pointer hover:border-line transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 px-4 pb-6 pt-3 border-t border-line-soft bg-bg">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask anything about this idea..."
              className="flex-1 px-4 py-3 bg-card border border-line-soft rounded-xl text-sm text-ink
                placeholder:text-ink-mute outline-none focus:border-accent transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="px-4 py-3 bg-ink text-bg rounded-xl text-sm font-medium cursor-pointer
                disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-deep transition-all
                active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Simple markdown renderer (bold only)
function SimpleMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
        }
        // Handle newlines
        return part.split('\n').map((line, j) => (
          <span key={`${i}-${j}`}>
            {j > 0 && <br />}
            {line}
          </span>
        ))
      })}
    </>
  )
}

// Coach API call — uses Supabase edge function or falls back to local
async function callCoach(context: string, messages: { role: string; content: string }[]): Promise<string> {
  // Try Supabase edge function first
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const resp = await fetch(`${supabaseUrl}/functions/v1/spark-coach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ context, messages }),
      })

      if (resp.ok) {
        const data = await resp.json()
        return data.response || data.content || "I couldn't generate a response. Try again."
      }
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback: return a helpful pre-written response based on the question
  return getFallbackResponse(messages[messages.length - 1]?.content || '')
}

function getFallbackResponse(question: string): string {
  const q = question.toLowerCase()

  if (q.includes('start') || q.includes('begin') || q.includes('first'))
    return "Here's my honest advice: start with the smallest possible version. Don't buy inventory until you've confirmed someone wants to pay.\n\n**This weekend:** Research your top 3 competitors on Etsy. See what they charge, read their reviews (especially the 3-star ones — that's where the gold is). Then make ONE prototype.\n\nThe goal isn't perfection. It's getting your first sale within 14 days."

  if (q.includes('price') || q.includes('charge') || q.includes('cost'))
    return "Pricing rule of thumb: your selling price should be at least 3x your total cost (materials + packaging + shipping). That gives you room for platform fees and still leaves profit.\n\n**Example:** If it costs you $8 to make and ship, price at $24-28. Don't undercut yourself trying to be the cheapest — compete on quality and story instead.\n\nCheck what the top 10 sellers on Etsy charge for similar products. Price in the middle of that range."

  if (q.includes('make') || q.includes('earn') || q.includes('money') || q.includes('profit'))
    return "Let's be real: month 1 is about learning, not earning. Most successful sellers make their first sale in week 2-3.\n\n**Realistic month 1:** $100-500 revenue from 5-15 orders. Your profit margin should be 50-70% after all costs.\n\n**Month 3 (if you stick with it):** $500-2,000/month is very achievable. The key is consistency — post new products weekly and respond to every customer message within hours."

  if (q.includes('customer') || q.includes('buyer') || q.includes('who'))
    return "Your first customers won't come from ads. They'll come from communities where people already talk about this stuff.\n\n**Find them here:**\n- Reddit subreddits related to your niche\n- Facebook groups for makers/crafters/your target audience\n- Instagram hashtags (search, engage genuinely, don't spam)\n- Local markets and craft fairs (if physical product)\n\nThe best first customers are people who already buy from your competitors but wish something was different."

  if (q.includes('mistake') || q.includes('avoid') || q.includes('wrong'))
    return "The 3 biggest mistakes I see with first-time sellers:\n\n**1. Over-investing before validating.** Don't buy $500 of inventory before you've made a single sale. Start with 5-10 units.\n\n**2. Copying the market leader.** You can't out-Amazon Amazon. Find a niche angle they're ignoring.\n\n**3. Ignoring packaging.** Your product arrives in a plain brown box? You just lost a repeat customer. The unboxing IS the marketing."

  return "Good question! Here's what I'd suggest: break it into the smallest possible next step. Don't try to figure out the whole business at once.\n\n**Your one action item:** Pick the single most important thing you don't know yet, and spend 30 minutes researching ONLY that. Then come back and ask me about what you found.\n\nWhat specific part are you most unsure about? I can give you a more targeted answer."
}
