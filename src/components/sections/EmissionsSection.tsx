import { AlertTriangle, TrendingUp, TrendingDown, Layers } from 'lucide-react'
import Card from '../ui/Card'
import AiTag from '../ui/AiTag'
import EmissionsTrendChart from '../../charts/EmissionsTrendChart'
import type { Company } from '../../types'

export default function EmissionsSection({ company }: { company: Company }) {
  const { emissions } = company
  const positive = emissions.yoyChangePct <= 0

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Emissions Intelligence</h2>
          <p className="text-sm text-navy-400">Scope 1, 2 and 3 emissions trend for {company.name}</p>
        </div>
        <AiTag label="Anomaly Detection" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Total CO2e</p>
          <p className="mt-2 text-2xl font-extrabold text-navy-900">{emissions.totalCO2e} <span className="text-sm font-medium text-navy-400">{emissions.unit}</span></p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Year-over-Year Change</p>
          <p className={`mt-2 flex items-center gap-1.5 text-2xl font-extrabold ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
            {positive ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
            {positive ? '' : '+'}
            {emissions.yoyChangePct}%
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Scope 3 Contribution</p>
          <p className="mt-2 flex items-center gap-1.5 text-2xl font-extrabold text-navy-900">
            <Layers className="h-5 w-5 text-navy-400" />
            {emissions.scope3ContributionPct}%
          </p>
        </Card>
      </div>

      <Card className="mt-4">
        <h3 className="mb-1 text-sm font-bold text-navy-800">Emissions Trend (2021&ndash;2025)</h3>
        <p className="mb-2 text-xs text-navy-400">{emissions.unit}</p>
        <EmissionsTrendChart history={emissions.history} />
      </Card>

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-sm leading-relaxed text-amber-800">{emissions.note}</p>
      </div>
    </div>
  )
}
