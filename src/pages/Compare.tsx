import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Award, ShieldAlert, Sparkles } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import { RiskBadge } from '../components/ui/StatusBadge'
import { companies } from '../data/companies'
import { getClaimConsistencyPct, getComparisonHighlights, getEvidenceStrengthPct, getVerifiedCertCount } from '../utils/scoring'
import { cn } from '../utils/cn'

const MAX_COMPANIES = 4
const MIN_COMPANIES = 2

const discrepancyMeta: Record<'low' | 'moderate' | 'high', { label: string; className: string }> = {
  low: { label: 'Low', className: 'text-emerald-400' },
  moderate: { label: 'Moderate', className: 'text-amber-400' },
  high: { label: 'High', className: 'text-red-400' },
}

export default function Compare() {
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState<string[]>([companies[0].id, companies[1].id])

  const selected = useMemo(() => companies.filter((c) => selectedIds.includes(c.id)), [selectedIds])
  const highlights = useMemo(() => (selected.length >= MIN_COMPANIES ? getComparisonHighlights(selected) : null), [selected])

  function toggle(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_COMPANIES) return prev
      return [...prev, id]
    })
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Compare"
        title="Compare Companies"
        subtitle="Select 2–4 companies to compare Truth Score, evidence strength, and claim consistency side by side."
      />

      <Card className="mb-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-navy-500">Select Companies ({selected.length}/{MAX_COMPANIES})</p>
        <div className="flex flex-wrap gap-2">
          {companies.map((c) => {
            const active = selectedIds.includes(c.id)
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                disabled={!active && selectedIds.length >= MAX_COMPANIES}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40',
                  active
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                    : 'border-white/10 bg-navy-900 text-navy-400 hover:border-emerald-500/40 hover:text-emerald-400'
                )}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-[10px]">{c.logoInitials}</span>
                {c.name}
              </button>
            )
          })}
        </div>
      </Card>

      {selected.length < MIN_COMPANIES ? (
        <EmptyState icon={ShieldAlert} title="Select at least 2 companies" description="Choose two or more companies above to run a side-by-side comparison." />
      ) : (
        <>
          {highlights && (
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Award className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-navy-500">Best Transparency</p>
                  <p className="truncate text-sm font-bold text-white">{companies.find((c) => c.id === highlights.bestTransparencyId)?.name}</p>
                </div>
              </Card>
              <Card className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <ShieldAlert className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-navy-500">Highest Risk</p>
                  <p className="truncate text-sm font-bold text-white">{companies.find((c) => c.id === highlights.highestRiskId)?.name}</p>
                </div>
              </Card>
              <Card className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-navy-500">Strongest Evidence</p>
                  <p className="truncate text-sm font-bold text-white">{companies.find((c) => c.id === highlights.strongestEvidenceId)?.name}</p>
                </div>
              </Card>
            </div>
          )}

          <Card className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b border-white/10 px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-navy-500">Metric</th>
                  {selected.map((c) => (
                    <th key={c.id} className="border-b border-white/10 px-3 py-3 text-left">
                      <button onClick={() => navigate(`/companies/${c.id}`)} className="font-bold text-white hover:text-emerald-400">
                        {c.name}
                      </button>
                      <p className="mt-0.5 text-[11px] font-normal text-navy-500">{c.sector}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-white/[0.06] px-3 py-3 font-medium text-navy-300">Truth Score</td>
                  {selected.map((c) => (
                    <td key={c.id} className="border-b border-white/[0.06] px-3 py-3">
                      <span className="font-bold text-white">{c.riskScore}</span>
                      <span className="text-navy-500"> / 100</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border-b border-white/[0.06] px-3 py-3 font-medium text-navy-300">Risk Level</td>
                  {selected.map((c) => (
                    <td key={c.id} className="border-b border-white/[0.06] px-3 py-3">
                      <RiskBadge level={c.riskLevel} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border-b border-white/[0.06] px-3 py-3 font-medium text-navy-300">Evidence Strength</td>
                  {selected.map((c) => (
                    <td key={c.id} className="border-b border-white/[0.06] px-3 py-3 font-semibold text-navy-100">
                      {getEvidenceStrengthPct(c)}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border-b border-white/[0.06] px-3 py-3 font-medium text-navy-300">Scope 3 Contribution</td>
                  {selected.map((c) => (
                    <td key={c.id} className="border-b border-white/[0.06] px-3 py-3 font-semibold text-navy-100">
                      {c.emissions.scope3ContributionPct}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border-b border-white/[0.06] px-3 py-3 font-medium text-navy-300">Certification</td>
                  {selected.map((c) => {
                    const { verified, total } = getVerifiedCertCount(c)
                    return (
                      <td key={c.id} className="border-b border-white/[0.06] px-3 py-3 font-semibold text-navy-100">
                        {verified}/{total} verified
                      </td>
                    )
                  })}
                </tr>
                <tr>
                  <td className="border-b border-white/[0.06] px-3 py-3 font-medium text-navy-300">Financial Alignment</td>
                  {selected.map((c) => {
                    const meta = discrepancyMeta[c.financials.discrepancyLevel]
                    return (
                      <td key={c.id} className={cn('border-b border-white/[0.06] px-3 py-3 font-semibold', meta.className)}>
                        {meta.label} discrepancy
                      </td>
                    )
                  })}
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium text-navy-300">Claim Consistency</td>
                  {selected.map((c) => (
                    <td key={c.id} className="px-3 py-3 font-semibold text-navy-100">
                      {getClaimConsistencyPct(c)}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
  )
}
