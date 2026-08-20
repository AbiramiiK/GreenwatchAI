import { companies } from '../data/companies'
import { ChevronDown } from 'lucide-react'

interface CompanySelectProps {
  value: string
  onChange: (companyId: string) => void
}

export default function CompanySelect({ value, onChange }: CompanySelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-navy-200 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-navy-800 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      >
        {companies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
    </div>
  )
}
