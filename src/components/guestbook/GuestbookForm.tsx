import { FormEvent, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import Button from '../shared/Button'

interface GuestbookFormProps {
  user: User | null
  submitting: boolean
  error?: string | null
  onSubmit: (message: string) => Promise<{ error: string | null }>
}

export default function GuestbookForm({ user, submitting, error, onSubmit }: GuestbookFormProps) {
  const [message, setMessage] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim()) {
      setValidationError('Please enter a message.')
      return
    }
    setValidationError(null)
    const result = await onSubmit(message)
    if (!result.error) setMessage('')
  }

  if (!user) return <p className="text-slate-300">Sign in with GitHub to sign the guestbook.</p>

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-3">
      <label htmlFor="guestbook-message" className="block text-sm text-slate-300">Leave a message</label>
      <textarea
        id="guestbook-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={3}
        maxLength={500}
        disabled={submitting}
        className="w-full rounded border border-cyan-400/30 bg-slate-950/70 p-3 text-slate-100 outline-none focus:border-cyan-300"
        placeholder="Say hello..."
      />
      {(validationError || error) && <p role="alert" className="text-sm text-red-300">{validationError || error}</p>}
      <Button type="submit" disabled={submitting}>{submitting ? 'Posting…' : 'Post message'}</Button>
    </form>
  )
}
