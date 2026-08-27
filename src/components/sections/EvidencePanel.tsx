import { ExternalLink, FileSearch, PlusCircle } from 'lucide-react'
import Drawer from '../ui/Drawer'
import AiTag from '../ui/AiTag'
import { useToast } from '../../hooks/useToast'
import type { Claim, Evidence } from '../../types'

const riskWeightMeta: Record<Evidence['riskWeight'], string> = {
  high: 'bg-red-500/10 text-red-400 border-red-500/30',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

const typeLabel: Record<Evidence['type'], string> = {
  financial: 'Financial Evidence',
  environmental: 'Environmental Evidence',
  certification: 'Certification Evidence',
  benchmark: 'Benchmark Evidence',
  media: 'Media Evidence',
}

interface EvidencePanelProps {
  evidence: Evidence | null
  relatedClaim: Claim | null
  onClose: () => void
  onViewClaim?: (claimId: string) => void
}

export default function EvidencePanel({ evidence, relatedClaim, onClose, onViewClaim }: EvidencePanelProps) {
  const { push } = useToast()
  if (!evidence) return null

  return (
    <Drawer open={!!evidence} onClose={onClose} eyebrow={`Evidence #${evidence.id.toUpperCase()}`} title={typeLabel[evidence.type]}>
      <div className="space-y-6">
        <AiTag label="AI Evidence Matching" />

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Type</dt>
            <dd className="mt-1 font-medium text-navy-100">{typeLabel[evidence.type]}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Source</dt>
            <dd className="mt-1 font-medium text-navy-100">{evidence.source}</dd>
          </div>
          {evidence.page && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Page</dt>
              <dd className="mt-1 font-medium text-navy-100">{evidence.page}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-navy-500">Risk Weight</dt>
            <dd className="mt-1">
              <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${riskWeightMeta[evidence.riskWeight]}`}>
                {evidence.riskWeight.toUpperCase()}
              </span>
            </dd>
          </div>
        </dl>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Detected Value</p>
          <p className="mt-1.5 rounded-xl bg-navy-800/70 p-4 text-sm font-semibold text-navy-100">{evidence.detectedValue}</p>
        </div>

        {relatedClaim && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Related Claim</p>
            <p className="mt-1.5 rounded-xl border border-white/10 p-4 text-sm italic text-navy-200">&ldquo;{relatedClaim.text}&rdquo;</p>
          </div>
        )}

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">AI Interpretation</p>
          <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{evidence.aiInterpretation}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => push({ kind: 'info', title: 'Source opened', message: `${evidence.source} would open in a document viewer.` })}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-semibold text-navy-200 hover:bg-navy-800"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Source
          </button>
          {relatedClaim && (
            <button
              onClick={() => onViewClaim?.(relatedClaim.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-semibold text-navy-200 hover:bg-navy-800"
            >
              <FileSearch className="h-3.5 w-3.5" />
              View Related Claim
            </button>
          )}
          <button
            onClick={() => push({ kind: 'success', title: 'Added to report', message: `Evidence #${evidence.id.toUpperCase()} was added to the active report draft.` })}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-3.5 py-2 text-xs font-semibold text-white hover:shadow-soft"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add to Report
          </button>
        </div>
      </div>
    </Drawer>
  )
}
