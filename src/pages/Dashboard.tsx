import { useNavigate } from 'react-router-dom'
import { Building2, FileText, ScrollText, ShieldAlert, Database, ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import KpiCard from '../components/ui/KpiCard'
import Card from '../components/ui/Card'
import { RiskBadge } from '../components/ui/StatusBadge'
import RiskDonutChart from '../charts/RiskDonutChart'
import { companies } from '../data/companies'
import { platformKpis, globalRiskOverview } from '../data/platform'
import { searchEntities } from '../services/mockAiService'
import AiTag from '../components/ui/AiTag'

export default function Dashboard() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const visibleCompanies = query
    ? searchEntities(query, companies).companies
    : [...companies].sort((a, b) => b.riskScore - a.riskScore)

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Executive Dashboard"
        title="GREENWATCH AI"
        subtitle="AI-Powered Greenwashing Detection & Sustainability Truth Engine"
        actions={<AiTag label="Live AI Engine" />}
      />

      <div className="relative mb-6 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search company, sustainability claim or report..."
          className="w-full rounded-2xl border border-white/10 bg-navy-900 py-3.5 pl-11 pr-4 text-sm shadow-soft outline-none transition placeholder:text-navy-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard label="Companies Analyzed" value={platformKpis.companiesAnalyzed} icon={Building2} accent="emerald" />
        <KpiCard label="Reports Processed" value={platformKpis.reportsProcessed} icon={FileText} accent="navy" />
        <KpiCard label="Claims Extracted" value={platformKpis.claimsExtracted.toLocaleString()} icon={ScrollText} accent="emerald" />
        <KpiCard label="High-Risk Companies" value={platformKpis.highRiskCompanies} icon={ShieldAlert} accent="red" />
        <KpiCard label="Evidence Points" value={platformKpis.evidencePoints} icon={Database} accent="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h2 className="text-base font-bold text-white">Global Greenwashing Risk Overview</h2>
          <p className="mt-1 text-xs text-navy-500">Portfolio-wide classification across all analyzed companies</p>
          <RiskDonutChart data={globalRiskOverview} />
          <div className="mt-2 space-y-2">
            {globalRiskOverview.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-navy-500">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Recently Analyzed Companies</h2>
              <p className="mt-1 text-xs text-navy-500">Click a company to open its full risk analysis</p>
            </div>
            <button
              onClick={() => navigate('/companies')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="scrollbar-thin -mx-2 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-navy-500">
                  <th className="px-2 pb-3">Company</th>
                  <th className="px-2 pb-3">Sector</th>
                  <th className="px-2 pb-3 text-right">Risk Score</th>
                  <th className="px-2 pb-3">Status</th>
                  <th className="px-2 pb-3">Last Analysis</th>
                </tr>
              </thead>
              <tbody>
                {visibleCompanies.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/companies/${c.id}`)}
                    className="cursor-pointer border-t border-white/[0.06] transition hover:bg-emerald-500/10"
                  >
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-xs font-bold text-emerald-400">
                          {c.logoInitials}
                        </span>
                        <span className="font-medium text-navy-100">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-navy-500">{c.sector}</td>
                    <td className="px-2 py-3 text-right font-bold text-white">{c.riskScore}</td>
                    <td className="px-2 py-3">
                      <RiskBadge level={c.riskLevel} />
                    </td>
                    <td className="px-2 py-3 text-navy-500">{c.lastAnalysis}</td>
                  </tr>
                ))}
                {visibleCompanies.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-2 py-10 text-center text-sm text-navy-500">
                      No companies match &ldquo;{query}&rdquo;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
