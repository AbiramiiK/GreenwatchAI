import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import CompanySelect from '../components/CompanySelect'
import CertificationsSection from '../components/sections/CertificationsSection'
import { getCompanyById } from '../data/companies'

export default function CertificationsPage() {
  const [companyId, setCompanyId] = useState('eco-future-industries')
  const navigate = useNavigate()
  const company = getCompanyById(companyId)!

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Certification Verification"
        title="Certifications"
        subtitle="Verified against certification registries, with shadow-label detection for unverifiable eco-marks."
        actions={<CompanySelect value={companyId} onChange={setCompanyId} />}
      />
      <CertificationsSection company={company} />
      <button
        onClick={() => navigate(`/companies/${company.id}?tab=certifications`)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
      >
        Open full analysis for {company.name}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  )
}
