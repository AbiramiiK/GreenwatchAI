import { useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, FileBarChart, MapPin, Calendar } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { RiskBadge } from '../components/ui/StatusBadge'
import RiskGauge from '../components/ui/RiskGauge'
import AiTag from '../components/ui/AiTag'
import ScoreDriversSection from '../components/sections/ScoreDriversSection'
import ClaimsSection from '../components/sections/ClaimsSection'
import EvidenceMapSection from '../components/sections/EvidenceMapSection'
import EmissionsSection from '../components/sections/EmissionsSection'
import FinancialsSection from '../components/sections/FinancialsSection'
import CertificationsSection from '../components/sections/CertificationsSection'
import BenchmarksSection from '../components/sections/BenchmarksSection'
import RecommendedActionsSection from '../components/sections/RecommendedActionsSection'
import { getCompanyById } from '../data/companies'
import { useWatchlist } from '../hooks/useWatchlist'
import { cn } from '../utils/cn'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'claims', label: 'Claims' },
  { id: 'evidence', label: 'Evidence Map' },
  { id: 'emissions', label: 'Emissions' },
  { id: 'financials', label: 'Financials' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'benchmarks', label: 'Benchmarks' },
]

export default function CompanyAnalysis() {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const company = companyId ? getCompanyById(companyId) : undefined
  const { isWatched, toggle } = useWatchlist()

  const activeTab = searchParams.get('tab') ?? 'overview'
  const claimParam = searchParams.get('claim')
  const [localTab, setLocalTab] = useState(activeTab)

  if (!company) return <Navigate to="/companies" replace />

  const currentTab = searchParams.get('tab') ? activeTab : localTab

  function setTab(tab: string) {
    setLocalTab(tab)
    setSearchParams(tab === 'overview' ? {} : { tab })
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest-100 text-lg font-extrabold text-forest-700">
            {company.logoInitials}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{company.sector}</p>
            <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">{company.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-400">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{company.headquarters}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{company.analysisPeriod}</span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="secondary" onClick={() => toggle(company.id)}>
            {isWatched(company.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isWatched(company.id) ? 'Watching' : 'Add to Watchlist'}
          </Button>
          <Button onClick={() => navigate(`/reports/${company.id}`)}>
            <FileBarChart className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center lg:col-span-1">
          <AiTag label="AI Risk Scoring" className="mb-3" />
          <RiskGauge score={company.riskScore} />
          <div className="mt-4 flex w-full items-center justify-between border-t border-navy-100 pt-4 text-sm">
            <span className="text-navy-500">AI Confidence</span>
            <span className="font-bold text-navy-900">{company.aiConfidence}%</span>
          </div>
          <div className="mt-3 grid w-full grid-cols-3 gap-1.5 text-center text-[11px]">
            <div className="rounded-lg bg-emerald-50 py-1.5 font-semibold text-emerald-700">0&ndash;30 Genuine</div>
            <div className="rounded-lg bg-amber-50 py-1.5 font-semibold text-amber-700">31&ndash;60 Audit</div>
            <div className="rounded-lg bg-red-50 py-1.5 font-semibold text-red-700">61&ndash;100 High Risk</div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <p className="text-sm leading-relaxed text-navy-600">{company.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <RiskBadge level={company.riskLevel} />
              <span className="rounded-full border border-navy-200 px-2.5 py-1 text-xs font-semibold text-navy-500">
                {company.claims.length} Claims Analyzed
              </span>
              <span className="rounded-full border border-navy-200 px-2.5 py-1 text-xs font-semibold text-navy-500">
                {company.evidence.length} Evidence Points
              </span>
              <span className="rounded-full border border-navy-200 px-2.5 py-1 text-xs font-semibold text-navy-500">
                Last Analyzed {company.lastAnalysis}
              </span>
            </div>
          </Card>
        </div>
      </div>

      <div className="scrollbar-thin sticky top-[65px] z-20 -mx-4 mt-6 overflow-x-auto bg-forest-50/90 px-4 py-2 backdrop-blur-sm sm:mx-0 sm:rounded-2xl sm:px-2">
        <div className="flex w-max gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={cn(
                'whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition',
                currentTab === tab.id ? 'bg-navy-900 text-white shadow-soft' : 'text-navy-500 hover:bg-white hover:text-navy-800'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {currentTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ScoreDriversSection company={company} />
              <ClaimsSection company={company} initialClaimId={claimParam} />
            </div>
            <div className="space-y-6">
              <RecommendedActionsSection company={company} />
            </div>
          </div>
        )}
        {currentTab === 'claims' && <ClaimsSection company={company} initialClaimId={claimParam} />}
        {currentTab === 'evidence' && <EvidenceMapSection company={company} />}
        {currentTab === 'emissions' && <EmissionsSection company={company} />}
        {currentTab === 'financials' && <FinancialsSection company={company} />}
        {currentTab === 'certifications' && <CertificationsSection company={company} />}
        {currentTab === 'benchmarks' && <BenchmarksSection company={company} />}
      </div>
    </div>
  )
}
