import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  eyebrow?: string
  children: ReactNode
}

export default function Drawer({ open, onClose, title, subtitle, eyebrow = 'Detail', children }: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-2xl animate-slide-in-right flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-navy-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{eyebrow}</p>
            <h2 className="mt-1 text-lg font-bold text-navy-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-navy-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  )
}
