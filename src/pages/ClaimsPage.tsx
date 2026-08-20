import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import { ClaimStatusBadge } from '../components/ui/StatusBadge'
import ClaimDetailDrawer from '../components/sections/ClaimDetailDrawer'
import AiTag from '../components/ui/AiTag'
import { companies, getAllClaims } from '../data/companies'
import type { ClaimStatus } from '../types'

const statusOptions: { value: ClaimStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'contradicted', label: 'Contradicted' },
  { value: 'partially-supported', label: 'Partially Supported' },
  { value: 'supported', label: 'Supported' },
  { value: 'unverified', label: 'Unverified' },
]

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'emissions', label: 'Emissions' },
  { value: 'energy', label: 'Energy' },
  { value: 'supply-chain', label: 'Supply Chain' },
  { value: 'waste', label: 'Waste' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
]

export default function ClaimsPage() {
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [openClaimId, setOpenClaimId] = useState<string | null>(null)

  const allClaims = getAllClaims()

  const filtered = useMemo(() => {
    return allClaims.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false
      if (categoryFilter !== 'all' && c.category !== categoryFilter) return false
      if (companyFilter !== 'all' && c.companyId !== companyFilter) return false
      return true
    })
  }, [allClaims, statusFilter, categoryFilter, companyFilter])

  const openClaim = allClaims.find((c) => c.id === openClaimId) ?? null
  const openCompany = openClaim ? companies.find((c) => c.id === openClaim.companyId) ?? null : null

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Claim Intelligence"
        title="Claims"
        subtitle="Every sustainability claim GREENWATCH AI has extracted and verified across the portfolio."
        actions={<AiTag label="AI Claim Extraction" />}
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
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ClaimStatus | 'all')} className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400">
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700 outline-none focus:border-emerald-400">
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No claims match these filters" description="Try adjusting the filters above." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((claim) => {
            const company = companies.find((c) => c.id === claim.companyId)!
            return (
              <Card key={claim.id} hoverable className="cursor-pointer" onClick={() => setOpenClaimId(claim.id)}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide text-navy-400">{claim.code}</span>
                  <span className="text-xs font-medium text-navy-400">{company.name}</span>
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug text-navy-900">&ldquo;{claim.text}&rdquo;</p>
                <div className="mt-4">
                  <ClaimStatusBadge status={claim.status} />
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <ClaimDetailDrawer claim={openClaim} company={openCompany} onClose={() => setOpenClaimId(null)} />
    </div>
  )
}
