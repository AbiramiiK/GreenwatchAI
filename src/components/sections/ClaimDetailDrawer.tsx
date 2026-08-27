import { FileStack, ArrowRight } from 'lucide-react'
import Drawer from '../ui/Drawer'
import { ClaimStatusBadge } from '../ui/StatusBadge'
import AiTag from '../ui/AiTag'
import type { Claim, Company } from '../../types'
import { useToast } from '../../hooks/useToast'

interface ClaimDetailDrawerProps {
  claim: Claim | null
  company: Company | null
  onClose: () => void
}

export default function ClaimDetailDrawer({ claim, company, onClose }: ClaimDetailDrawerProps) {
  const { push } = useToast()
  if (!claim || !company) return null

  const relatedEvidence = company.evidence.filter((e) => claim.evidenceIds.includes(e.id))

  return (
    <Drawer open={!!claim} onClose={onClose} eyebrow={`${claim.code} · Environmental Claim`} title={claim.text}>
      <div className="space-y-7">
        <div className="flex flex-wrap items-center gap-2">
          <ClaimStatusBadge status={claim.status} />
          <AiTag label="Explainable AI" />
          <span className="text-xs text-navy-500">Analyzed {claim.dateAnalyzed}</span>
        </div>

        <section>
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy-500">
            AI Interpretation
          </h3>
          <p className="rounded-xl bg-navy-800/70 p-4 text-sm leading-relaxed text-navy-200">{claim.aiInterpretation}</p>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-500">Evidence Found</h3>
          <ul className="space-y-2">
            {relatedEvidence.map((ev) => (
              <li key={ev.id} className="flex items-start gap-2.5 rounded-xl border border-white/10 p-3">
                <FileStack className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy-100">
                    {ev.source}
                    {ev.page && <span className="text-navy-500"> &middot; Page {ev.page}</span>}
                  </p>
                  <p className="text-xs text-navy-500">{ev.detectedValue}</p>
                </div>
              </li>
            ))}
            {relatedEvidence.length === 0 && (
              <li className="rounded-xl border border-dashed border-white/10 p-4 text-center text-sm text-navy-500">
                Insufficient evidence to verify this claim.
              </li>
            )}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-navy-500">AI Verdict</h3>
          <div className="rounded-xl border border-white/10 p-4">
            <ClaimStatusBadge status={claim.status} className="text-sm" />
            <p className="mt-3 text-sm leading-relaxed text-navy-500">{claim.verdictReason}</p>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-navy-500">Why? Claim vs Evidence</h3>
          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-xl border border-white/10 bg-navy-900 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-navy-500">Company Claim</p>
              <p className="mt-1.5 text-sm font-semibold text-navy-100">{claim.companyClaimValue}</p>
            </div>
            <div className="flex items-center justify-center">
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-navy-950">VS</span>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-red-400">Evidence</p>
              <p className="mt-1.5 text-sm font-semibold text-red-400">{claim.evidenceValue}</p>
            </div>
          </div>
        </section>

        <button
          onClick={() => push({ kind: 'success', title: 'Added to report', message: `${claim.code} was added to the active report draft.` })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-lift"
        >
          Add Claim to Report
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Drawer>
  )
}
