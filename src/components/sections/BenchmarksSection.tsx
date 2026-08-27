import { Info } from 'lucide-react'
import Card from '../ui/Card'
import AiTag from '../ui/AiTag'
import BenchmarkBar from '../../charts/BenchmarkBar'
import type { Company } from '../../types'

export default function BenchmarksSection({ company }: { company: Company }) {
  const belowAverageCount = company.benchmarks.filter((b) =>
    b.goodDirection === 'higher' ? b.percentile < 50 : b.percentile > 50
  ).length

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Industry Benchmark</h2>
          <p className="text-sm text-navy-500">{company.name} vs. {company.sector} sector peers</p>
        </div>
        <AiTag label="AI Anomaly Detection" />
      </div>

      <Card className="space-y-6">
        {company.benchmarks.map((metric) => (
          <BenchmarkBar key={metric.key} metric={metric} />
        ))}
      </Card>

      {belowAverageCount >= 2 && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <p className="text-sm leading-relaxed text-amber-300">
            Company performance is below industry average in multiple sustainability indicators.
          </p>
        </div>
      )}
    </div>
  )
}
