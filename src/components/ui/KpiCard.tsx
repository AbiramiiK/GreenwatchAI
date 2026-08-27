import type { LucideIcon } from 'lucide-react'
import Card from './Card'

interface KpiCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  accent?: 'emerald' | 'amber' | 'red' | 'navy'
  trend?: string
}

const accentStyles: Record<NonNullable<KpiCardProps['accent']>, { icon: string; iconBg: string }> = {
  emerald: { icon: 'text-emerald-400', iconBg: 'bg-emerald-500/10' },
  amber: { icon: 'text-amber-400', iconBg: 'bg-amber-500/10' },
  red: { icon: 'text-red-400', iconBg: 'bg-red-500/10' },
  navy: { icon: 'text-navy-300', iconBg: 'bg-white/5' },
}

export default function KpiCard({ label, value, icon: Icon, accent = 'emerald', trend }: KpiCardProps) {
  const style = accentStyles[accent]
  return (
    <Card hoverable className="animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">{value}</p>
          {trend && <p className="mt-1.5 text-xs font-medium text-navy-500">{trend}</p>}
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.iconBg}`}>
          <Icon className={`h-5 w-5 ${style.icon}`} />
        </div>
      </div>
    </Card>
  )
}
