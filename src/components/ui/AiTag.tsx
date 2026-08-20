import { Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'

/** Small badge used throughout the app to signal that a section is
 * powered by the (simulated) AI pipeline, e.g. "AI CLAIM EXTRACTION". */
export default function AiTag({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-forest-900 to-navy-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300',
        className
      )}
    >
      <Sparkles className="h-3 w-3" />
      {label}
    </span>
  )
}
