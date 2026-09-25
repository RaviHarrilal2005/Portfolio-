import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { navigation } from '../lib/constants'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return <AnimatePresence>{open && (
    <motion.div className="fixed inset-0 z-50 grid place-items-start bg-slate-950/70 p-6 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label="Command palette" className="w-full max-w-lg rounded-lg border border-cyan-400/30 bg-slate-900 p-3 shadow-2xl" initial={{ y: -12 }} animate={{ y: 0 }} exit={{ y: -12 }} onMouseDown={(event) => event.stopPropagation()}>
        <p className="px-3 py-2 text-sm text-slate-400">Go to</p>
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={onClose} className="block rounded px-3 py-2 text-slate-100 hover:bg-slate-800">{item.label}</a>)}
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}
