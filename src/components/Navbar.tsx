import { useAuth } from '../hooks/useAuth'
import { NAV_LINKS } from '../lib/constants'

interface NavbarProps {
  onOpenCommandPalette: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { loading, user, signInWithGitHub, signOut } = useAuth()

  return (
    <header className="border-b border-cyan-400/20 bg-slate-950/80 px-6 py-4 backdrop-blur">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <a href="#top" className="font-bold text-cyan-300">CS Portfolio</a>
        <div className="hidden gap-5 sm:flex">
          {NAV_LINKS.map((item) => <a key={item.href} href={item.href} className="text-slate-200 hover:text-cyan-300">{item.label}</a>)}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenCommandPalette} className="rounded border border-cyan-400/30 px-3 py-1 text-sm text-cyan-200" aria-label="Open command palette">⌘K</button>
          {!loading && (user ? <button onClick={() => void signOut()} className="rounded bg-slate-800 px-3 py-1 text-sm">Sign out</button> : <button onClick={() => void signInWithGitHub()} className="rounded bg-cyan-400 px-3 py-1 text-sm font-semibold text-slate-950">Sign in</button>)}
        </div>
      </nav>
    </header>
  )
}
