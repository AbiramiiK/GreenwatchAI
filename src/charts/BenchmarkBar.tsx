import { useEffect, useState } from 'react'
import type { BenchmarkMetric } from '../types'

function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export default function BenchmarkBar({ metric }: { metric: BenchmarkMetric }) {
  const [width, setWidth] = useState(0)
  const isGood = metric.goodDirection === 'higher' ? metric.percentile >= 50 : metric.percentile <= 50

  useEffect(() => {
    const raf = requestAnimationFrame(() => setWidth(metric.percentile))
    return () => cancelAnimationFrame(raf)
  }, [metric.percentile])

  const color = isGood ? '#059669' : metric.percentile < 30 || metric.percentile > 70 ? '#dc2626' : '#d97706'

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-navy-700">{metric.label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {ordinal(metric.percentile)} percentile
        </span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-navy-100">
        <div className="absolute inset-y-0 left-1/2 w-px bg-navy-300" />
        <div
          className="h-full rounded-full"
          style={{ width: `${width}%`, backgroundColor: color, transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </div>
    </div>
  )
}
