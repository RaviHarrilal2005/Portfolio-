import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { skillCategories } from '../data/skills'
import { useProjects } from '../hooks/useProjects'
import { NAV_LINKS, TERMINAL_COMMANDS } from '../lib/constants'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { projects, loading, error } = useProjects()

  useEffect(() => {
    if (!open) return
    setQuery('')
    inputRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const normalizedQuery = query.trim().toLowerCase()
  const matches = (value: string) => value.toLowerCase().includes(normalizedQuery)
  const filteredNavigation = NAV_LINKS.filter((item) => matches(item.label))
  const filteredCommands = Object.entries(TERMINAL_COMMANDS).filter(([name, description]) => matches(`${name} ${description}`))
  const filteredProjects = projects.filter((project) => matches(`${project.title} ${project.description}`))
  const filteredSkills = skillCategories.flatMap((category) =>
    category.skills.filter(matches).map((skill) => ({ category: category.name, skill })),
  )
  const hasResults = filteredNavigation.length > 0 || filteredCommands.length > 0 || filteredProjects.length > 0 || filteredSkills.length > 0

  return <AnimatePresence>{open && (
    <motion.div className="fixed inset-0 z-50 grid place-items-start bg-slate-950/70 p-6 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label="Command palette" className="w-full max-w-lg rounded-lg border border-cyan-400/30 bg-slate-900 p-3 shadow-2xl" initial={{ y: -12 }} animate={{ y: 0 }} exit={{ y: -12 }} onMouseDown={(event) => event.stopPropagation()}>
        <label htmlFor="command-palette-search" className="sr-only">Search navigation, projects, and skills</label>
        <input
          ref={inputRef}
          id="command-palette-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search navigation, projects, and skills"
          autoComplete="off"
          className="w-full rounded border border-cyan-400/30 bg-slate-950 px-3 py-2 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300"
        />

        <div className="mt-3 max-h-[60vh] overflow-y-auto">
          {filteredNavigation.length > 0 && <section aria-label="Navigation">
            <p className="px-3 py-2 text-sm text-slate-400">Navigation</p>
            {filteredNavigation.map((item) => <a key={item.href} href={item.href} onClick={onClose} className="block rounded px-3 py-2 text-slate-100 hover:bg-slate-800">{item.label}</a>)}
          </section>}

          {filteredCommands.length > 0 && <section aria-label="Commands" className="mt-2">
            <p className="px-3 py-2 text-sm text-slate-400">Commands</p>
            {/* ponytail: buttons just dismiss the palette; wire real handlers when the commands actually do something */}
            {filteredCommands.map(([name, description]) => <button key={name} type="button" onClick={onClose} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-800">
              <span className="block text-slate-100">{name}</span>
              <span className="block truncate text-sm text-slate-400">{description}</span>
            </button>)}
          </section>}

          {loading && <p role="status" className="px-3 py-4 text-sm text-slate-400">Loading projects…</p>}
          {!loading && error && <p role="status" className="px-3 py-4 text-sm text-amber-300">{error}</p>}

          {!loading && filteredProjects.length > 0 && <section aria-label="Projects" className="mt-2">
            <p className="px-3 py-2 text-sm text-slate-400">Projects</p>
            {filteredProjects.map((project) => <a key={project.id} href="#projects" onClick={onClose} className="block rounded px-3 py-2 hover:bg-slate-800">
              <span className="block text-slate-100">{project.title}</span>
              <span className="block truncate text-sm text-slate-400">{project.description}</span>
            </a>)}
          </section>}

          {filteredSkills.length > 0 && <section aria-label="Skills" className="mt-2">
            <p className="px-3 py-2 text-sm text-slate-400">Skills</p>
            {filteredSkills.map(({ category, skill }) => <a key={`${category}-${skill}`} href="#skills" onClick={onClose} className="block rounded px-3 py-2 text-slate-100 hover:bg-slate-800"><span>{skill}</span><span className="ml-2 text-sm text-slate-500">{category}</span></a>)}
          </section>}

          {!loading && !error && !hasResults && <p role="status" className="px-3 py-4 text-sm text-slate-400">No results found.</p>}
        </div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}
