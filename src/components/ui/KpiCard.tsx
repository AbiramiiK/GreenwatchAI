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
  emerald: { icon: 'text-emerald-600', iconBg: 'bg-emerald-50' },
  amber: { icon: 'text-amber-600', iconBg: 'bg-amber-50' },
  red: { icon: 'text-red-600', iconBg: 'bg-red-50' },
  navy: { icon: 'text-navy-600', iconBg: 'bg-navy-50' },
}

export default function KpiCard({ label, value, icon: Icon, accent = 'emerald', trend }: KpiCardProps) {
  const style = accentStyles[accent]
  return (
    <Card hoverable className="animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy-900">{value}</p>
          {trend && <p className="mt-1.5 text-xs font-medium text-navy-400">{trend}</p>}
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.iconBg}`}>
          <Icon className={`h-5 w-5 ${style.icon}`} />
        </div>
      </div>
    </Card>
  )
}
