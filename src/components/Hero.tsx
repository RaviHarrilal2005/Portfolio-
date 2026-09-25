import { useState } from 'react'
import { Button, Card } from './index'
import { useAuth } from '../hooks/useAuth'

export function Hero() {
  const { loading, user, signInWithGitHub } = useAuth()
  const [signingIn, setSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setError(null)
    setSigningIn(true)
    try {
      await signInWithGitHub()
    } catch {
      setError('GitHub sign-in could not start. Please try again.')
      setSigningIn(false)
    }
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-24 md:grid-cols-[1.5fr_1fr] md:items-center">
      <div>
        <p className="mb-4 text-sm font-semibold text-blue-600 dark:text-blue-400">Welcome</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-gray-900 dark:text-white">Computer Science Student &amp; Builder</h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">I build thoughtful, reliable software and keep learning by shipping. Experienced with modern web technologies and full-stack development.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button onClick={() => { window.location.hash = 'projects' }}>View projects</Button>
          {!loading && !user && <Button variant="secondary" disabled={signingIn} onClick={() => void handleSignIn()}>{signingIn ? 'Connecting...' : 'Sign in with GitHub'}</Button>}
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
      <Card className="text-sm text-gray-600 dark:text-gray-300">
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">Currently working on</h3>
        <p>Portfolio projects, practical systems, and a stronger engineering toolkit. Focused on building scalable solutions.</p>
      </Card>
    </section>
  )
}
