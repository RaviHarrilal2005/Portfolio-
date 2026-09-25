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
    <section className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-[1.5fr_1fr] md:items-center">
      <div>
        <p className="mb-3 font-mono text-sm text-cyber-cyan">Hello, I’m a</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Computer Science Student & Builder</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">I build thoughtful, reliable software and keep learning by shipping.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => { window.location.hash = 'projects' }}>View projects</Button>
          {!loading && !user && <Button variant="secondary" disabled={signingIn} onClick={() => void handleSignIn()}>{signingIn ? 'Connecting…' : 'Sign in with GitHub'}</Button>}
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
      </div>
      <Card className="font-mono text-sm text-slate-300">
        <p className="text-cyber-green">// currently building</p>
        <p className="mt-3">Portfolio projects, practical systems, and a stronger engineering toolkit.</p>
      </Card>
    </section>
  )
}
