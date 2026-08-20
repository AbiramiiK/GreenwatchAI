import { useEffect, useState } from 'react'
import Tooltip from './Tooltip'
import { cn } from '../../utils/cn'

interface ScoreBarProps {
  label: string
  value: number
  description?: string
  invert?: boolean // true when a higher value is actually better (rendered green)
}

function colorFor(value: number, invert?: boolean) {
  const effective = invert ? 100 - value : value
  if (effective <= 30) return '#16a34a'
  if (effective <= 60) return '#d97706'
  return '#dc2626'
}

export default function ScoreBar({ label, value, description, invert }: ScoreBarProps) {
  const [width, setWidth] = useState(0)
  const color = colorFor(value, invert)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setWidth(value))
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-navy-700">{label}</span>
          {description && <Tooltip text={description} />}
        </div>
        <span className="text-sm font-bold text-navy-900">{value} / 100</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-navy-100">
        <div
          className={cn('h-full rounded-full')}
          style={{
            width: `${width}%`,
            backgroundColor: color,
            transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  )
}
