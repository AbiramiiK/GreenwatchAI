import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as ReTooltip } from 'recharts'

interface RiskDonutChartProps {
  data: { name: string; value: number; color: string }[]
}

export default function RiskDonutChart({ data }: RiskDonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="relative h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="68%"
            outerRadius="95%"
            paddingAngle={3}
            cornerRadius={6}
            startAngle={90}
            endAngle={-270}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <ReTooltip
            contentStyle={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: '#0b1120', fontSize: 12, color: '#e2e8f2' }}
            formatter={(value, name) => [`${value} companies`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-white">{total}</span>
        <span className="text-xs font-medium text-navy-500">Companies</span>
      </div>
    </div>
  )
}
