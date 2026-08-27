import { useMemo, useState } from 'react'
import { ArrowDown, FileText, ScrollText, ShieldAlert, ShieldCheck, Gauge } from 'lucide-react'
import Card from '../ui/Card'
import AiTag from '../ui/AiTag'
import EvidencePanel from './EvidencePanel'
import ClaimDetailDrawer from './ClaimDetailDrawer'
import type { Company, Evidence } from '../../types'
import { cn } from '../../utils/cn'

const typeIcon: Record<Evidence['type'], typeof FileText> = {
  financial: FileText,
  environmental: FileText,
  certification: ShieldCheck,
  benchmark: Gauge,
  media: FileText,
}

function Connector() {
  return (
    <div className="flex justify-center py-1">
      <ArrowDown className="h-5 w-5 text-navy-500" />
    </div>
  )
}

export default function EvidenceMapSection({ company }: { company: Company }) {
  const contradictedFirst = useMemo(
    () => [...company.claims].sort((a, b) => (a.status === 'contradicted' ? -1 : 1) - (b.status === 'contradicted' ? -1 : 1)),
    [company.claims]
  )
  const [selectedClaimId, setSelectedClaimId] = useState(contradictedFirst[0]?.id)
  const [openEvidenceId, setOpenEvidenceId] = useState<string | null>(null)
  const [viewClaimId, setViewClaimId] = useState<string | null>(null)

  const claim = company.claims.find((c) => c.id === selectedClaimId) ?? contradictedFirst[0]
  const evidenceItems = company.evidence.filter((e) => claim?.evidenceIds.includes(e.id))
  const documents = Array.from(new Set(evidenceItems.map((e) => e.source)))
  const openEvidence = company.evidence.find((e) => e.id === openEvidenceId) ?? null
  const viewClaim = company.claims.find((c) => c.id === viewClaimId) ?? null

  const isContradiction = claim?.status === 'contradicted' || claim?.status === 'partially-supported'

  if (!claim) return null

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Evidence Trail</h2>
          <p className="text-sm text-navy-500">Claim → source document → evidence → cross-check → verdict.</p>
        </div>
        <AiTag label="AI Evidence Matching" />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {company.claims.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClaimId(c.id)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition',
              c.id === selectedClaimId
                ? 'border-emerald-500 bg-emerald-500 text-navy-950 shadow-soft'
                : 'border-white/10 bg-navy-900 text-navy-500 hover:border-emerald-500/40 hover:text-emerald-400'
            )}
          >
            {c.code}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden bg-gradient-to-b from-navy-900/60 to-navy-950/60">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          {/* CLAIM */}
          <button
            onClick={() => setViewClaimId(claim.id)}
            className="w-full rounded-2xl border-2 border-emerald-500/40 bg-navy-950 p-4 text-left text-white shadow-glow transition hover:-translate-y-0.5"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Claim &middot; {claim.code}</p>
            <p className="mt-1 text-sm font-semibold leading-snug">&ldquo;{claim.text}&rdquo;</p>
          </button>

          <Connector />

          {/* DOCUMENTS */}
          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
            {documents.map((doc) => (
              <div key={doc} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-navy-900 p-3">
                <ScrollText className="h-4 w-4 shrink-0 text-navy-500" />
                <span className="text-xs font-medium text-navy-200">{doc}</span>
              </div>
            ))}
          </div>

          <Connector />

          {/* EVIDENCE */}
          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
            {evidenceItems.map((ev) => {
              const Icon = typeIcon[ev.type]
              return (
                <button
                  key={ev.id}
                  onClick={() => setOpenEvidenceId(ev.id)}
                  className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-left transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-emerald-300">EV-{ev.id.split('-').pop()}</p>
                    <p className="mt-0.5 truncate text-xs text-emerald-300/80">{ev.detectedValue}</p>
                  </div>
                </button>
              )
            })}
            {evidenceItems.length === 0 && (
              <div className="col-span-2 rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-navy-500">
                Insufficient evidence to verify this claim.
              </div>
            )}
          </div>

          {evidenceItems.length > 0 && (
            <>
              <Connector />

              {/* CONTRADICTION / SUPPORT */}
              <div
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl border p-4',
                  isContradiction ? 'border-red-500/40 bg-red-500/10' : 'border-emerald-500/40 bg-emerald-500/10'
                )}
              >
                {isContradiction ? (
                  <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
                ) : (
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
                )}
                <p className={cn('text-sm font-bold', isContradiction ? 'text-red-400' : 'text-emerald-400')}>
                  {isContradiction ? 'Contradiction Detected' : 'Evidence Supports Claim'}
                </p>
              </div>

              <Connector />

              {/* RISK SCORE */}
              <div className="flex w-full items-center gap-3 rounded-2xl border-2 border-white/15 bg-navy-950 p-4">
                <Gauge className="h-5 w-5 shrink-0 text-navy-200" />
                <div>
                  <p className="text-sm font-bold text-white">Risk Score Impact</p>
                  <p className="text-xs text-navy-500">
                    Weighted <span className="font-semibold uppercase">{claim.riskWeight}</span> contribution to overall {company.riskScore}/100 risk score
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      <EvidencePanel
        evidence={openEvidence}
        relatedClaim={openEvidence ? company.claims.find((c) => c.id === openEvidence.relatedClaimId) ?? null : null}
        onClose={() => setOpenEvidenceId(null)}
        onViewClaim={(claimId) => {
          setOpenEvidenceId(null)
          setViewClaimId(claimId)
        }}
      />

      <ClaimDetailDrawer claim={viewClaim} company={company} onClose={() => setViewClaimId(null)} />
    </div>
  )
}
