import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
} from 'recharts'
import type { ScoreDriver } from '../types'

interface GreenwashingRadarProps {
  drivers: ScoreDriver[]
}

interface TooltipPayloadItem {
  payload: ScoreDriver & { label: string; value: number }
}

function RadarTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="max-w-[220px] rounded-xl border border-white/10 bg-navy-950 px-3.5 py-3 text-xs shadow-lift">
      <p className="font-bold text-white">{d.label}</p>
      <p className="mt-1 font-semibold text-emerald-400">{d.value} / 100</p>
      <p className="mt-1 leading-relaxed text-navy-400">{d.description}</p>
    </div>
  )
}

/** Plots the six evidence-grounded score drivers as a radar — higher = worse contributor to risk. */
export default function GreenwashingRadar({ drivers }: GreenwashingRadarProps) {
  const data = drivers.map((d) => ({ ...d, label: d.label, value: d.value }))

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: 11, fill: '#9fb2cc' }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.22}
            strokeWidth={2}
            animationDuration={900}
          />
          <ReTooltip content={<RadarTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
