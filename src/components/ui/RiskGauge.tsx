import { useEffect, useState } from 'react'
import { riskLevelMeta } from '../../services/mockAiService'
import { classifyRisk } from '../../services/mockAiService'

interface RiskGaugeProps {
  score: number
  size?: number
}

/** Semi-circular 0-100 risk gauge with an animated sweep. */
export default function RiskGauge({ score, size = 260 }: RiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const level = classifyRisk(score)
  const meta = riskLevelMeta[level]

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimatedScore(score))
    return () => cancelAnimationFrame(raf)
  }, [score])

  const radius = size / 2 - 18
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  const cx = size / 2
  const cy = size / 2

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 24} viewBox={`0 0 ${size} ${size / 2 + 24}`}>
        <path
          d={`M 18 ${cy} A ${radius} ${radius} 0 0 1 ${size - 18} ${cy}`}
          fill="none"
          stroke="#e8eef5"
          strokeWidth={18}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <path
          d={`M 18 ${cy} A ${radius} ${radius} 0 0 1 ${size - 18} ${cy}`}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={18}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <text x={cx} y={cy - 18} textAnchor="middle" className="fill-navy-900" style={{ fontSize: size * 0.16, fontWeight: 800 }}>
          {Math.round(animatedScore)}
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" className="fill-navy-400" style={{ fontSize: size * 0.045, fontWeight: 600 }}>
          / 100
        </text>
      </svg>
      <div
        className="mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold"
        style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
      >
        {level === 'high-risk' && 'HIGH RISK OF GREENWASHING'}
        {level === 'needs-audit' && 'INCONSISTENT / NEEDS AUDIT'}
        {level === 'genuine' && 'TRANSPARENT / GENUINE'}
      </div>
    </div>
  )
}
