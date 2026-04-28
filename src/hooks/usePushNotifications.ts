import { useState, useEffect, useCallback } from 'react'

interface PushState {
  supported: boolean
  permission: NotificationPermission | 'unsupported'
  enabled: boolean
}

// Daily notification messages tied to 30-day plan stages
const PLAN_NOTIFICATIONS = [
  { day: 1, title: "Day 1: Let's go!", body: "Your first task is waiting. Open Spark to see what to do today." },
  { day: 2, title: "Day 2: Research time", body: "Quick 15-minute task today. Check what your competitors charge." },
  { day: 3, title: "Day 3: Source materials", body: "Time to find your first supplier. We've got links ready for you." },
  { day: 5, title: "Day 5: Make your first one", body: "You've got everything. Time to make your first product." },
  { day: 7, title: "1 week in!", body: "You've made it 7 days. That's further than 90% of people who 'want to start a business'." },
  { day: 10, title: "Day 10: Take photos", body: "Your product needs photos. 5 shots, natural light, white background. 15 minutes." },
  { day: 14, title: "2 weeks!", body: "Halfway there. Time to create your first listing." },
  { day: 21, title: "3 weeks in", body: "Your listing is live. Now let's get your first customer." },
  { day: 30, title: "You did it!", body: "30 days. You went from 'I don't know what to start' to having a real business." },
]

// Generic engagement notifications (for users without active plans)
const ENGAGEMENT_NOTIFICATIONS = [
  { title: "New ideas added", body: "We've added fresh business ideas this week. Come swipe." },
  { title: "Saved ideas waiting", body: "You saved some ideas but haven't started any. Pick one and go." },
  { title: "Quick win", body: "Most Spark users make their first sale within 14 days of starting. Your turn?" },
  { title: "Weekend project?", body: "Saturday morning + a business idea from Spark = your side hustle starts today." },
]

export function usePushNotifications() {
  const [state, setState] = useState<PushState>({
    supported: false,
    permission: 'unsupported',
    enabled: false,
  })

  useEffect(() => {
    const supported = 'serviceWorker' in navigator && 'Notification' in window && 'PushManager' in window
    const permission = supported ? Notification.permission : 'unsupported'
    const enabled = permission === 'granted'

    setState({ supported, permission, enabled })

    // Register service worker
    if (supported) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // SW registration failed, non-critical
      })
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!state.supported) return false

    try {
      const permission = await Notification.requestPermission()
      const enabled = permission === 'granted'
      setState(prev => ({ ...prev, permission, enabled }))

      if (enabled) {
        // Schedule a welcome notification after 5 seconds
        scheduleLocalNotification(
          "Notifications enabled!",
          "We'll send you daily reminders when you start a 30-day plan.",
          5000
        )
      }

      return enabled
    } catch {
      return false
    }
  }, [state.supported])

  const scheduleDaily = useCallback((planDay: number, ideaName: string) => {
    if (!state.enabled) return

    // Find the matching plan notification
    const notification = PLAN_NOTIFICATIONS.find(n => n.day === planDay)
    if (notification) {
      // Schedule for tomorrow at 9 AM local time
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(9, 0, 0, 0)
      const delay = tomorrow.getTime() - Date.now()

      scheduleLocalNotification(
        notification.title,
        notification.body.replace('your', `your ${ideaName}`),
        Math.max(delay, 5000) // at least 5s from now
      )
    }
  }, [state.enabled])

  return {
    ...state,
    requestPermission,
    scheduleDaily,
  }
}

function scheduleLocalNotification(title: string, body: string, delay: number) {
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, {
          body,
          icon: '/favicon.svg',
          tag: 'spark-reminder',
          requireInteraction: false,
        })
      }).catch(() => {
        // Fallback: use Notification API directly
        new Notification(title, { body, icon: '/favicon.svg' })
      })
    }
  }, delay)
}

// Export notification content for use in Coach/Plan
export { PLAN_NOTIFICATIONS, ENGAGEMENT_NOTIFICATIONS }
