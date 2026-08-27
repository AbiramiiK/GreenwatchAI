import { useMemo, useState } from 'react'
import { SlidersHorizontal, FileText, ShieldCheck, Gauge, Newspaper } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import EvidencePanel from '../components/sections/EvidencePanel'
import ClaimDetailDrawer from '../components/sections/ClaimDetailDrawer'
import AiTag from '../components/ui/AiTag'
import { companies, getAllEvidence } from '../data/companies'
import type { Evidence } from '../types'

const typeOptions: { value: Evidence['type'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'financial', label: 'Financial' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'certification', label: 'Certification' },
  { value: 'benchmark', label: 'Benchmark' },
  { value: 'media', label: 'Media' },
]

const typeIcon: Record<Evidence['type'], typeof FileText> = {
  financial: FileText,
  environmental: FileText,
  certification: ShieldCheck,
  benchmark: Gauge,
  media: Newspaper,
}

export default function EvidencePage() {
  const [typeFilter, setTypeFilter] = useState<Evidence['type'] | 'all'>('all')
  const [companyFilter, setCompanyFilter] = useState('all')
  const [openEvidenceId, setOpenEvidenceId] = useState<string | null>(null)
  const [viewClaimId, setViewClaimId] = useState<string | null>(null)

  const allEvidence = getAllEvidence()

  const filtered = useMemo(() => {
    return allEvidence.filter((e) => {
      if (typeFilter !== 'all' && e.type !== typeFilter) return false
      if (companyFilter !== 'all' && e.companyId !== companyFilter) return false
      return true
    })
  }, [allEvidence, typeFilter, companyFilter])

  const openEvidence = allEvidence.find((e) => e.id === openEvidenceId) ?? null
  const openCompany = openEvidence ? companies.find((c) => c.id === openEvidence.companyId) : undefined
  const relatedClaim = openEvidence && openCompany ? openCompany.claims.find((c) => c.id === openEvidence.relatedClaimId) ?? null : null

  const viewCompany = viewClaimId ? companies.find((c) => c.claims.some((cl) => cl.id === viewClaimId)) ?? null : null
  const viewClaim = viewCompany?.claims.find((c) => c.id === viewClaimId) ?? null

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Evidence Intelligence"
        title="Evidence"
        subtitle="Every financial, environmental, and certification data point GREENWATCH AI has matched to a claim."
        actions={<AiTag label="AI Evidence Matching" />}
      />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-500">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </div>
          <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} className="rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-navy-200 outline-none focus:border-emerald-400">
            <option value="all">All Companies</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as Evidence['type'] | 'all')} className="rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-navy-200 outline-none focus:border-emerald-400">
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No evidence found" description="Try adjusting the filters above." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ev) => {
            const company = companies.find((c) => c.id === ev.companyId)!
            const Icon = typeIcon[ev.type]
            return (
              <Card key={ev.id} hoverable className="cursor-pointer" onClick={() => setOpenEvidenceId(ev.id)}>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-navy-500">EV-{ev.id.split('-').pop()} &middot; {company.name}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-navy-100">{ev.detectedValue}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-navy-500">{ev.source}{ev.page ? ` · Page ${ev.page}` : ''}</p>
              </Card>
            )
          })}
        </div>
      )}

      <EvidencePanel
        evidence={openEvidence}
        relatedClaim={relatedClaim}
        onClose={() => setOpenEvidenceId(null)}
        onViewClaim={(claimId) => {
          setOpenEvidenceId(null)
          setViewClaimId(claimId)
        }}
      />
      <ClaimDetailDrawer claim={viewClaim} company={viewCompany ?? null} onClose={() => setViewClaimId(null)} />
    </div>
  )
}
