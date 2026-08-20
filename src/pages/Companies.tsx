import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import { RiskBadge } from '../components/ui/StatusBadge'
import EmptyState from '../components/ui/EmptyState'
import { companies } from '../data/companies'
import { industries } from '../data/platform'
import type { RiskLevel } from '../types'

const riskOptions: { value: RiskLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'All Risk Levels' },
  { value: 'genuine', label: 'Genuine' },
  { value: 'needs-audit', label: 'Needs Audit' },
  { value: 'high-risk', label: 'High Risk' },
]

const claimCategories = [
  { value: 'all', label: 'All Claim Types' },
  { value: 'emissions', label: 'Emissions' },
  { value: 'energy', label: 'Energy' },
  { value: 'supply-chain', label: 'Supply Chain' },
  { value: 'waste', label: 'Waste' },
  { value: 'social', label: 'Social' },
]

const dateOptions = ['All Time', 'Today', 'Yesterday', 'This Week']

export default function Companies() {
  const navigate = useNavigate()
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [claimFilter, setClaimFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('All Time')

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (riskFilter !== 'all' && c.riskLevel !== riskFilter) return false
      if (industryFilter !== 'all' && c.sector !== industryFilter) return false
      if (claimFilter !== 'all' && !c.claims.some((claim) => claim.category === claimFilter)) return false
      if (dateFilter !== 'All Time' && c.lastAnalysis !== dateFilter) return false
      return true
    })
  }, [riskFilter, industryFilter, claimFilter, dateFilter])

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Portfolio"
        title="Companies"
        subtitle="Browse every company GREENWATCH AI has analyzed and drill into full evidence-backed risk reports."
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as RiskLevel | 'all')}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400"
          >
            {riskOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400"
          >
            <option value="all">All Industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <select
            value={claimFilter}
            onChange={(e) => setClaimFilter(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400"
          >
            {claimCategories.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400"
          >
            {dateOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {(riskFilter !== 'all' || industryFilter !== 'all' || claimFilter !== 'all' || dateFilter !== 'All Time') && (
            <button
              onClick={() => {
                setRiskFilter('all')
                setIndustryFilter('all')
                setClaimFilter('all')
                setDateFilter('All Time')
              }}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Clear filters
            </button>
          )}
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No companies match these filters" description="Try adjusting or clearing your filters to see more results." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Card key={c.id} hoverable className="cursor-pointer" onClick={() => navigate(`/companies/${c.id}`)}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-100 text-sm font-bold text-forest-700">
                  {c.logoInitials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-navy-900">{c.name}</p>
                  <p className="text-xs text-navy-400">{c.sector} · {c.headquarters}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-navy-500">{c.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <RiskBadge level={c.riskLevel} />
                <span className="text-lg font-extrabold text-navy-900">{c.riskScore}<span className="text-xs font-medium text-navy-400">/100</span></span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
