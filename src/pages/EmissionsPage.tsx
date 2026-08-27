import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import CompanySelect from '../components/CompanySelect'
import EmissionsSection from '../components/sections/EmissionsSection'
import { getCompanyById } from '../data/companies'

export default function EmissionsPage() {
  const [companyId, setCompanyId] = useState('eco-future-industries')
  const navigate = useNavigate()
  const company = getCompanyById(companyId)!

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Emissions Intelligence"
        title="Emissions"
        subtitle="Scope 1, 2 and 3 emissions trends cross-checked against sustainability claims."
        actions={<CompanySelect value={companyId} onChange={setCompanyId} />}
      />
      <EmissionsSection company={company} />
      <button
        onClick={() => navigate(`/companies/${company.id}?tab=emissions`)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        Open full analysis for {company.name}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  )
}
