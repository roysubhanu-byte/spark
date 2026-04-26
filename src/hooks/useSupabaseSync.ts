/**
 * Supabase sync layer — background sync for logged-in users.
 * localStorage remains the source of truth for instant UX.
 * Supabase syncs in the background for persistence across devices.
 */
import { useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { Store } from './useStore'

export function useSupabaseSync(user: User | null, store: Store) {
  // On login: pull remote data and merge with local
  useEffect(() => {
    if (!user) return

    async function pullFromSupabase() {
      // Pull saved ideas
      const { data: remoteSaves } = await supabase
        .from('saved_ideas')
        .select('idea_id')
        .eq('user_id', user!.id)

      if (remoteSaves && remoteSaves.length > 0) {
        const remoteIds = remoteSaves.map(s => s.idea_id)
        // Merge: keep local + add remote that local doesn't have
        remoteIds.forEach(id => store.saveIdea(id))
      }

      // Pull profile preferences
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

      if (profile?.onboarding_done) {
        if (profile.deck_pref) store.setQ2(profile.deck_pref as any)
        if (profile.channel_pref) store.setQ1(profile.channel_pref as any)
        if (profile.region) store.setRegion(profile.region as any)
      }
    }

    pullFromSupabase().catch(console.error)
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync saves to Supabase when they change
  const syncSave = useCallback(async (ideaId: string) => {
    if (!user) return
    await supabase.from('saved_ideas').upsert({
      user_id: user.id,
      idea_id: ideaId,
    }, { onConflict: 'user_id,idea_id' }).select()
  }, [user])

  // Sync plan start to Supabase
  const syncPlanStart = useCallback(async (ideaId: string, ideaName: string, ideaImage: string) => {
    if (!user) return
    await supabase.from('active_plans').upsert({
      user_id: user.id,
      idea_id: ideaId,
      idea_name: ideaName,
      idea_image: ideaImage,
    }, { onConflict: 'user_id,idea_id' }).select()
  }, [user])

  // Sync task completion to Supabase
  const syncTaskComplete = useCallback(async (ideaId: string, day: number) => {
    if (!user) return
    // Get the plan ID first
    const { data: plan } = await supabase
      .from('active_plans')
      .select('id')
      .eq('user_id', user.id)
      .eq('idea_id', ideaId)
      .single()

    if (plan) {
      await supabase.from('plan_tasks').upsert({
        plan_id: plan.id,
        user_id: user.id,
        day,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'plan_id,day' }).select()

      // Update streak
      await supabase.from('active_plans').update({
        last_active_date: new Date().toISOString().split('T')[0],
      }).eq('id', plan.id)
    }
  }, [user])

  // Sync profile on onboarding complete
  const syncProfile = useCallback(async () => {
    if (!user) return
    await supabase.from('profiles').update({
      deck_pref: store.q2 || 'all',
      channel_pref: store.q1 || 'both',
      interests: Array.from(store.interests),
      region: store.region,
      onboarding_done: true,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id)
  }, [user, store.q2, store.q1, store.interests, store.region])

  return { syncSave, syncPlanStart, syncTaskComplete, syncProfile }
}
