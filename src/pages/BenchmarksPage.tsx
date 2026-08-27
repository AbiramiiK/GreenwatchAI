import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import CompanySelect from '../components/CompanySelect'
import BenchmarksSection from '../components/sections/BenchmarksSection'
import { getCompanyById } from '../data/companies'

export default function BenchmarksPage() {
  const [companyId, setCompanyId] = useState('eco-future-industries')
  const navigate = useNavigate()
  const company = getCompanyById(companyId)!

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Peer Comparison"
        title="Industry Benchmarks"
        subtitle="Company performance percentile-ranked against sector peers on core ESG indicators."
        actions={<CompanySelect value={companyId} onChange={setCompanyId} />}
      />
      <BenchmarksSection company={company} />
      <button
        onClick={() => navigate(`/companies/${company.id}?tab=benchmarks`)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        Open full analysis for {company.name}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  )
}
