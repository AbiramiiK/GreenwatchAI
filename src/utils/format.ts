import type { ClaimStatus, Severity } from '../types'

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export const claimStatusMeta: Record<ClaimStatus, { label: string; emoji: string; badgeClass: string }> = {
  contradicted: { label: 'Contradicted', emoji: '🔴', badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30' },
  'partially-supported': { label: 'Partially Supported', emoji: '🟡', badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  supported: { label: 'Supported', emoji: '🟢', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  unverified: { label: 'Unverified', emoji: '⚪', badgeClass: 'bg-white/5 text-navy-300 border-white/10' },
}

export const severityMeta: Record<Severity, { label: string; emoji: string; badgeClass: string; dotClass: string }> = {
  critical: { label: 'Critical', emoji: '🔴', badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30', dotClass: 'bg-red-500' },
  warning: { label: 'Warning', emoji: '🟠', badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30', dotClass: 'bg-amber-500' },
  info: { label: 'Info', emoji: '🔵', badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30', dotClass: 'bg-sky-500' },
  positive: { label: 'Positive', emoji: '🟢', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', dotClass: 'bg-emerald-500' },
}
