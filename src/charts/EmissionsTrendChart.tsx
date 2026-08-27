import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { EmissionYear } from '../types'

export default function EmissionsTrendChart({ history }: { history: EmissionYear[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={history} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
          <defs>
            <linearGradient id="scope1Fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="scope2Fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a5177" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3a5177" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="scope3Fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6f89ae' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#6f89ae' }} axisLine={false} tickLine={false} />
          <ReTooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: '#0b1120', fontSize: 12, color: '#e2e8f2' }} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#9fb2cc' }} />
          <Area type="monotone" dataKey="scope1" name="Scope 1" stroke="#059669" strokeWidth={2} fill="url(#scope1Fill)" animationDuration={900} />
          <Area type="monotone" dataKey="scope2" name="Scope 2" stroke="#3a5177" strokeWidth={2} fill="url(#scope2Fill)" animationDuration={900} />
          <Area type="monotone" dataKey="scope3" name="Scope 3" stroke="#dc2626" strokeWidth={2} fill="url(#scope3Fill)" animationDuration={900} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
