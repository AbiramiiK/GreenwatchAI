import { AlertOctagon, CheckCircle2 } from 'lucide-react'
import Card from '../ui/Card'
import AiTag from '../ui/AiTag'
import CapexDonutChart from '../../charts/CapexDonutChart'
import type { Company } from '../../types'

const discrepancyMeta = {
  low: { label: 'LOW DISCREPANCY', className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400', icon: CheckCircle2 },
  moderate: { label: 'MODERATE DISCREPANCY', className: 'border-amber-500/30 bg-amber-500/10 text-amber-400', icon: AlertOctagon },
  high: { label: 'HIGH DISCREPANCY', className: 'border-red-500/30 bg-red-500/10 text-red-400', icon: AlertOctagon },
}

export default function FinancialsSection({ company }: { company: Company }) {
  const { financials } = company
  const meta = discrepancyMeta[financials.discrepancyLevel]
  const Icon = meta.icon

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Sustainability Investment Analysis</h2>
          <p className="text-sm text-navy-500">Claim: &ldquo;{financials.claimSummary}&rdquo;</p>
        </div>
        <AiTag label="AI Evidence Matching" />
      </div>

      <Card>
        <h3 className="mb-1 text-sm font-bold text-navy-100">Capital Allocation vs. Sustainability Claims</h3>
        <p className="mb-2 text-xs text-navy-500">Share of disclosed capital expenditure by category</p>
        <CapexDonutChart allocation={financials.allocation} />
      </Card>

      <div className={`mt-4 flex items-start gap-3 rounded-2xl border p-4 ${meta.className}`}>
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide">{meta.label}</p>
          <p className="mt-1 text-sm leading-relaxed">{financials.finding}</p>
        </div>
      </div>
    </div>
  )
}
