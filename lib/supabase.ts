import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null | undefined

const fallbackUrl = 'https://vosdknhmznbjhplmvazk.supabase.co'
const fallbackPublishableKey = 'sb_publishable_mqM67ENMUeJDIpntvUqhbQ_sM5eghIw'

export function getSupabase() {
  if (client !== undefined) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || fallbackPublishableKey

  if (!url || !key) {
    client = null
    return client
  }

  client = createClient(url, key, {
    auth: { persistSession: false },
  })
  return client
}

export async function logAttempt(payload: {
  exerciseId: string
  category: string
  correct: boolean
  answer: string
}) {
  const supabase = getSupabase()
  if (!supabase) return

  await supabase.from('practice_attempts').insert({
    exercise_id: payload.exerciseId,
    category: payload.category,
    correct: payload.correct,
    answer_text: payload.answer,
  })
}
