import type { ClaimStatus, Severity } from '../types'

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export const claimStatusMeta: Record<ClaimStatus, { label: string; emoji: string; badgeClass: string }> = {
  contradicted: { label: 'Contradicted', emoji: '🔴', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
  'partially-supported': { label: 'Partially Supported', emoji: '🟡', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
  supported: { label: 'Supported', emoji: '🟢', badgeClass: 'bg-green-50 text-green-700 border-green-200' },
  unverified: { label: 'Unverified', emoji: '⚪', badgeClass: 'bg-slate-100 text-slate-600 border-slate-200' },
}

export const severityMeta: Record<Severity, { label: string; emoji: string; badgeClass: string; dotClass: string }> = {
  critical: { label: 'Critical', emoji: '🔴', badgeClass: 'bg-red-50 text-red-700 border-red-200', dotClass: 'bg-red-500' },
  warning: { label: 'Warning', emoji: '🟠', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200', dotClass: 'bg-amber-500' },
  info: { label: 'Info', emoji: '🔵', badgeClass: 'bg-sky-50 text-sky-700 border-sky-200', dotClass: 'bg-sky-500' },
  positive: { label: 'Positive', emoji: '🟢', badgeClass: 'bg-green-50 text-green-700 border-green-200', dotClass: 'bg-green-500' },
}
