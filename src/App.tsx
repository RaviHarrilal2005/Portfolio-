import { useEffect, useState } from 'react'
import { CommandPalette } from './components/CommandPalette'
import { Guestbook } from './components/guestbook'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import Projects from './components/projects/Projects'
import { Skills } from './components/skills'

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div id="top">
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <main className="mx-auto max-w-5xl px-6">
        <Hero />
        <Projects />
        <Skills />
        <Guestbook />
      </main>
      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </div>
  )
}
