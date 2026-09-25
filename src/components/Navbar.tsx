import { useAuth } from '../hooks/useAuth'
import { NAV_LINKS } from '../lib/constants'

interface NavbarProps {
  onOpenCommandPalette: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { loading, user, signInWithGitHub, signOut } = useAuth()

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <a href="#top" className="text-xl font-bold text-blue-600 dark:text-blue-400">Portfolio</a>
        <div className="hidden gap-6 sm:flex">
          {NAV_LINKS.map((item) => <a key={item.href} href={item.href} className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">{item.label}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onOpenCommandPalette} className="rounded px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800" aria-label="Open command palette">⌘K</button>
          {!loading && (user ? <button onClick={() => void signOut()} className="rounded bg-gray-200 px-3 py-1 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white">Sign out</button> : <button onClick={() => void signInWithGitHub()} className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Sign in</button>)}
        </div>
      </nav>
    </header>
  )
}
