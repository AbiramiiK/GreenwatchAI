import { Check, X, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'
import AiTag from '../ui/AiTag'
import { cn } from '../../utils/cn'
import type { Claim, Evidence } from '../../types'

interface ClaimVsRealitySectionProps {
  claim: Claim
  evidence: Evidence[]
}

const rowMeta: Record<Evidence['riskWeight'], { icon: typeof Check; label: string; className: string }> = {
  low: { icon: Check, label: 'Supported', className: 'text-emerald-400' },
  medium: { icon: AlertTriangle, label: 'Unverified', className: 'text-amber-400' },
  high: { icon: X, label: 'Missing / Contradicts', className: 'text-red-400' },
}

/** The signature "what they say vs what the evidence shows" comparison. */
export default function ClaimVsRealitySection({ claim, evidence }: ClaimVsRealitySectionProps) {
  const isMismatch = claim.status === 'contradicted' || claim.status === 'partially-supported'

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Claim vs Reality</h2>
        <AiTag label="AI Cross-Check" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-navy-950 p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-navy-500">What They Say</p>
          <p className="mt-3 text-base font-semibold leading-snug text-white">&ldquo;{claim.text}&rdquo;</p>
          <p className="mt-3 text-xs text-navy-500">{claim.code} &middot; Analyzed {claim.dateAnalyzed}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-navy-950 p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-navy-500">What The Evidence Shows</p>
          <ul className="mt-3 space-y-2.5">
            {evidence.map((ev) => {
              const meta = rowMeta[ev.riskWeight]
              const Icon = meta.icon
              return (
                <li key={ev.id} className="flex items-start gap-2.5 text-sm">
                  <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', meta.className)} />
                  <div className="min-w-0">
                    <span className={cn('font-semibold', meta.className)}>{meta.label}</span>
                    <span className="text-navy-300"> &middot; {ev.detectedValue}</span>
                  </div>
                </li>
              )
            })}
            {evidence.length === 0 && (
              <li className="text-sm italic text-navy-500">Insufficient evidence available for this claim.</li>
            )}
          </ul>
        </div>
      </div>

      <div
        className={cn(
          'mt-4 flex items-center justify-center rounded-xl border py-3 text-sm font-black uppercase tracking-widest',
          isMismatch ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
        )}
      >
        {isMismatch ? 'Claim ≠ Reality' : 'Claim Confirmed By Evidence'}
      </div>
    </Card>
  )
}
