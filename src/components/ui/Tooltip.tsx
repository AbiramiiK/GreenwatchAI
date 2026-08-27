import { useState, type ReactNode } from 'react'
import { Info } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Tooltip({ text, children }: { text: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        tabIndex={0}
        className="text-navy-400 hover:text-emerald-400"
        aria-label={text}
      >
        {children ?? <Info className="h-3.5 w-3.5" />}
      </button>
      <span
        className={cn(
          'pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-50 w-56 -translate-x-1/2 rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-xs leading-snug text-navy-100 shadow-lift transition-all duration-150',
          open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        )}
      >
        {text}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-navy-950" />
      </span>
    </span>
  )
}
