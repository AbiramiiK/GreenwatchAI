import type { LucideIcon } from 'lucide-react'
import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
}

export default function EmptyState({ icon: Icon = SearchX, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 bg-white/60 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50">
        <Icon className="h-6 w-6 text-navy-300" />
      </div>
      <p className="mt-4 text-sm font-semibold text-navy-700">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-navy-400">{description}</p>}
    </div>
  )
}
