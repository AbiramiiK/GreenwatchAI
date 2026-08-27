import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as ReTooltip, Legend } from 'recharts'
import type { CapexAllocation } from '../types'

export default function CapexDonutChart({ allocation }: { allocation: CapexAllocation[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={allocation}
            dataKey="value"
            nameKey="label"
            innerRadius="55%"
            outerRadius="90%"
            paddingAngle={2}
            cornerRadius={4}
            animationDuration={900}
          >
            {allocation.map((entry) => (
              <Cell key={entry.label} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <ReTooltip
            contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: '#0b1120', fontSize: 12, color: '#e2e8f2' }}
            formatter={(value) => `${value}%`}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#9fb2cc' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
