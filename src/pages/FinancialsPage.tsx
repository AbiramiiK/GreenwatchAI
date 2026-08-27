import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import CompanySelect from '../components/CompanySelect'
import FinancialsSection from '../components/sections/FinancialsSection'
import { getCompanyById } from '../data/companies'

export default function FinancialsPage() {
  const [companyId, setCompanyId] = useState('eco-future-industries')
  const navigate = useNavigate()
  const company = getCompanyById(companyId)!

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Financial Alignment"
        title="Financials"
        subtitle="Capital expenditure allocation compared against public sustainability narratives."
        actions={<CompanySelect value={companyId} onChange={setCompanyId} />}
      />
      <FinancialsSection company={company} />
      <button
        onClick={() => navigate(`/companies/${company.id}?tab=financials`)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        Open full analysis for {company.name}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  )
}
