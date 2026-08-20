import type { ClaimStatus, RiskLevel, Severity } from '../../types'
import { claimStatusMeta, severityMeta } from '../../utils/format'
import { riskLevelMeta } from '../../services/mockAiService'
import { cn } from '../../utils/cn'

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const meta = riskLevelMeta[level]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        meta.badgeClass,
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  )
}

export function ClaimStatusBadge({ status, className }: { status: ClaimStatus; className?: string }) {
  const meta = claimStatusMeta[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        meta.badgeClass,
        className
      )}
    >
      <span>{meta.emoji}</span>
      {meta.label}
    </span>
  )
}

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const meta = severityMeta[severity]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        meta.badgeClass,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClass)} />
      {meta.label}
    </span>
  )
}
