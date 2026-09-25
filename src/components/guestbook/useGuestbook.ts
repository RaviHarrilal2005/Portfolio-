import { useCallback, useEffect, useState } from 'react'
import type { GuestbookMessage } from '../../lib/types'
import type { Database } from '../../lib/database.types'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

const friendlyError = (error: unknown, fallback: string) => {
  const message = error instanceof Error ? error.message : ''
  if (message.toLowerCase().includes('row-level security')) return 'You are not allowed to post this message.'
  if (message.toLowerCase().includes('network') || message.toLowerCase().includes('fetch')) return 'We could not connect to the guestbook. Please try again.'
  return fallback
}

export function useGuestbook() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<GuestbookMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(friendlyError(fetchError, 'We could not load the guestbook. Please try again.'))
    } else {
      setMessages((data ?? []) as GuestbookMessage[])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void fetchMessages()
  }, [fetchMessages])

  const submitMessage = useCallback(async (message: string) => {
    const trimmed = message.trim()
    if (!user) return { error: 'Sign in with GitHub before posting a message.' }
    if (!trimmed) return { error: 'Please enter a message.' }

    const metadata = user.user_metadata as Record<string, unknown>
    const handle = String(metadata.user_name ?? metadata.preferred_username ?? user.email?.split('@')[0] ?? 'github-user')
    const avatar = typeof metadata.avatar_url === 'string' ? metadata.avatar_url : undefined

    setSubmitting(true)
    setError(null)
    const payload: Database['public']['Tables']['guestbook']['Insert'] = { user_id: user.id, user_github_handle: handle, avatar_url: avatar, message: trimmed }
    const { data, error: submitError } = await supabase
      .from('guestbook')
      .insert(payload as never)
      .select()
      .single()

    if (submitError) {
      const messageError = friendlyError(submitError, 'Your message could not be posted. Please try again.')
      setError(messageError)
      setSubmitting(false)
      return { error: messageError }
    }

    setMessages((current) => [data as GuestbookMessage, ...current])
    setSubmitting(false)
    return { error: null }
  }, [user])

  return { messages, loading, submitting, error, user, fetchMessages, submitMessage }
}
