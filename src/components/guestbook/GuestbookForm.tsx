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

  if (!user) return <p className="text-gray-600 dark:text-gray-300">Sign in with GitHub to sign the guestbook.</p>

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
      <label htmlFor="guestbook-message" className="block text-sm font-medium text-gray-900 dark:text-white">Leave a message</label>
      <textarea
        id="guestbook-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={3}
        maxLength={500}
        disabled={submitting}
        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:disabled:bg-gray-700"
        placeholder="Share your thoughts..."
      />
      <div className="flex items-center justify-between">
        <div>
          {(validationError || error) && <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">{validationError || error}</p>}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{message.length}/500</span>
      </div>
      <Button type="submit" disabled={submitting}>{submitting ? 'Posting...' : 'Post message'}</Button>
    </form>
  )
}
