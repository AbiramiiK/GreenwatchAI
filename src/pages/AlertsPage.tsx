import { useMemo, useState } from 'react'
import { SlidersHorizontal, Bell } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import { SeverityBadge } from '../components/ui/StatusBadge'
import ClaimDetailDrawer from '../components/sections/ClaimDetailDrawer'
import { companies, getAllAlerts } from '../data/companies'
import type { Severity } from '../types'

const severityOptions: { value: Severity | 'all'; label: string }[] = [
  { value: 'all', label: 'All Severities' },
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'positive', label: 'Positive' },
]

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [viewClaimId, setViewClaimId] = useState<string | null>(null)

  const allAlerts = getAllAlerts()

  const filtered = useMemo(() => {
    return allAlerts.filter((a) => {
      if (severityFilter !== 'all' && a.severity !== severityFilter) return false
      if (companyFilter !== 'all' && a.companyId !== companyFilter) return false
      return true
    })
  }, [allAlerts, severityFilter, companyFilter])

  const viewCompany = viewClaimId ? companies.find((c) => c.claims.some((cl) => cl.id === viewClaimId)) ?? null : null
  const viewClaim = viewCompany?.claims.find((c) => c.id === viewClaimId) ?? null

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Live Monitoring"
        title="Real-Time Alerts"
        subtitle="New evidence, contradictions, and certification issues as GREENWATCH AI detects them."
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </div>
          <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400">
            <option value="all">All Companies</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value as Severity | 'all')} className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400">
            {severityOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={Bell} title="No alerts match these filters" description="Try adjusting the filters above." />
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => {
            const company = companies.find((c) => c.id === alert.companyId)!
            return (
              <Card
                key={alert.id}
                hoverable
                className={alert.relatedClaimId ? 'cursor-pointer' : ''}
                onClick={() => alert.relatedClaimId && setViewClaimId(alert.relatedClaimId)}
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-3">
                    <SeverityBadge severity={alert.severity} />
                    <div>
                      <p className="text-sm font-semibold text-navy-800">{alert.message}</p>
                      <p className="mt-0.5 text-xs text-navy-400">{company.name}</p>
                    </div>
                  </div>
                  <p className="shrink-0 text-xs text-navy-400">{alert.date} &middot; {alert.time}</p>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <ClaimDetailDrawer claim={viewClaim} company={viewCompany ?? null} onClose={() => setViewClaimId(null)} />
    </div>
  )
}
