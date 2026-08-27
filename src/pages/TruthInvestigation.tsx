import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Search,
  ScanSearch,
  FileUp,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  ShieldAlert,
  FileBarChart,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import AiTag from '../components/ui/AiTag'
import RiskGauge from '../components/ui/RiskGauge'
import ScoreBar from '../components/ui/ScoreBar'
import EmptyState from '../components/ui/EmptyState'
import GreenwashingRadar from '../charts/GreenwashingRadar'
import ClaimsSection from '../components/sections/ClaimsSection'
import ClaimVsRealitySection from '../components/sections/ClaimVsRealitySection'
import EvidenceMapSection from '../components/sections/EvidenceMapSection'
import RecommendedActionsSection from '../components/sections/RecommendedActionsSection'
import AskGreenwatch from '../components/AskGreenwatch'
import { companies } from '../data/companies'
import { searchEntities } from '../services/mockAiService'
import type { Company } from '../types'
import {
  getDistinctSourceCount,
  getEvidenceStrengthCounts,
  getHeadlineClaim,
  getPatterns,
  getTopContradictions,
} from '../utils/scoring'
import { cn } from '../utils/cn'

type Stage = 'input' | 'analyzing' | 'results' | 'not-found'

const WOW_STEPS = [
  'ANALYZING CLAIMS…',
  'SEARCHING EVIDENCE…',
  'CROSS-CHECKING DATA…',
  'IDENTIFYING CONTRADICTIONS…',
  'CALCULATING RISK…',
]

function matchCompany(query: string): Company | undefined {
  const q = query.trim().toLowerCase()
  if (!q) return undefined
  const exact = companies.find((c) => c.id === q || c.name.toLowerCase() === q)
  if (exact) return exact
  const results = searchEntities(query, companies)
  return results.companies[0] ?? results.claims[0]?.company
}

export default function TruthInvestigation() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [stage, setStage] = useState<Stage>('input')
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [stepIndex, setStepIndex] = useState(0)
  const [company, setCompany] = useState<Company | null>(null)
  const [whyOpen, setWhyOpen] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const initial = searchParams.get('q')
    if (initial) runInvestigation(initial)
    return () => timers.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function runInvestigation(rawQuery: string) {
    const match = matchCompany(rawQuery)
    timers.current.forEach(clearTimeout)
    timers.current = []
    setWhyOpen(false)

    if (!match) {
      setCompany(null)
      setStage('not-found')
      return
    }

    setStage('analyzing')
    setStepIndex(0)
    const stepDuration = 480
    WOW_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStepIndex(i), i * stepDuration)
      timers.current.push(t)
    })
    const finish = setTimeout(() => {
      setCompany(match)
      setStage('results')
    }, WOW_STEPS.length * stepDuration + 300)
    timers.current.push(finish)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    runInvestigation(query)
  }

  if (stage === 'analyzing') {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center animate-fade-in">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-glow animate-pulse-ring">
          <ScanSearch className="h-8 w-8 text-white" />
        </div>
        <h1 className="mt-6 text-xl font-extrabold tracking-tight text-white">INVESTIGATING&hellip;</h1>
        <div className="mt-6 space-y-3">
          {WOW_STEPS.map((step, i) => (
            <p
              key={step}
              className={cn(
                'font-mono text-sm tracking-wide transition-all duration-300',
                i < stepIndex ? 'text-navy-600 line-through' : i === stepIndex ? 'font-bold text-emerald-400' : 'text-navy-700'
              )}
            >
              {step}
            </p>
          ))}
        </div>
      </div>
    )
  }

  if (stage === 'results' && company) {
    const headlineClaim = getHeadlineClaim(company)
    const headlineEvidence = headlineClaim ? company.evidence.filter((e) => headlineClaim.evidenceIds.includes(e.id)) : []
    const patterns = getPatterns(company)
    const strength = getEvidenceStrengthCounts(company)
    const topContradictions = getTopContradictions(company, 3)
    const sourceCount = getDistinctSourceCount(company)

    return (
      <div className="animate-fade-in">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Investigation Result</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{company.name}</h1>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-500">
              <span>{company.sector}</span>
              <span>&middot; Investigated {company.lastAnalysis}</span>
              <span>&middot; {sourceCount} sources analyzed</span>
              <span>&middot; {company.claims.length} claims analyzed</span>
              <span>&middot; {company.evidence.length} evidence items</span>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" onClick={() => setStage('input')}>
              <Search className="h-4 w-4" />
              New Investigation
            </Button>
            <Button onClick={() => navigate(`/reports/${company.id}`)}>
              <FileBarChart className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* TRUTH SCORE */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center lg:col-span-1">
            <AiTag label="Greenwashing Risk" className="mb-3" />
            <RiskGauge score={company.riskScore} />
          </Card>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Score Breakdown</h2>
                <button
                  onClick={() => setWhyOpen((v) => !v)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Why this score?
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', whyOpen && 'rotate-180')} />
                </button>
              </div>
              <div className="space-y-4">
                {company.scoreDrivers.map((d) => (
                  <ScoreBar key={d.key} label={d.label} value={d.value} description={d.description} />
                ))}
              </div>
              {whyOpen && (
                <div className="mt-5 space-y-2.5 rounded-xl border border-white/10 bg-navy-950 p-4 animate-fade-in">
                  <p className="text-xs font-bold uppercase tracking-wide text-navy-500">How this score was calculated</p>
                  {[...company.scoreDrivers]
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3)
                    .map((d) => (
                      <p key={d.key} className="text-sm leading-relaxed text-navy-300">
                        <span className="font-semibold text-navy-100">{d.label} ({d.value}/100):</span> {d.description}
                      </p>
                    ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* CLAIMS INVESTIGATED */}
        <div className="mt-6">
          <ClaimsSection company={company} />
        </div>

        {/* CLAIM VS REALITY */}
        {headlineClaim && (
          <div className="mt-6">
            <ClaimVsRealitySection claim={headlineClaim} evidence={headlineEvidence} />
          </div>
        )}

        {/* EVIDENCE TRAIL */}
        <div className="mt-6">
          <EvidenceMapSection company={company} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* PATTERNS DETECTED */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Patterns Detected</h2>
              <AiTag label="Pattern Recognition" />
            </div>
            {patterns.length === 0 ? (
              <EmptyState icon={CheckCircle2} title="No greenwashing patterns detected" description="Every analyzed claim is currently supported by available evidence." />
            ) : (
              <ul className="space-y-3">
                {patterns.map((p) => (
                  <li key={p.id} className="flex items-start gap-3 rounded-xl border border-white/10 p-3.5">
                    {p.severity === 'critical' ? (
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn('text-sm font-bold', p.severity === 'critical' ? 'text-red-400' : 'text-amber-400')}>{p.label}</span>
                        <span className="text-[11px] text-navy-500">{p.claimCode}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-navy-400">{p.description}</p>
                      <div className="mt-1.5 flex gap-3 text-[11px] text-navy-500">
                        <span>{p.evidenceCount} evidence item{p.evidenceCount === 1 ? '' : 's'}</span>
                        <span>+{p.riskContribution} risk contribution</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* GREENWASHING RADAR */}
          <Card>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Greenwashing Radar</h2>
              <AiTag label="AI Risk Scoring" />
            </div>
            <p className="mb-1 text-xs text-navy-500">Hover a dimension for detail.</p>
            <GreenwashingRadar drivers={company.scoreDrivers} />
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* EVIDENCE STRENGTH */}
          <Card className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Evidence Strength</h2>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-navy-400">Verified claims</dt>
                <dd className="font-bold text-emerald-400">{strength.verified}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-navy-400">Partial evidence</dt>
                <dd className="font-bold text-amber-400">{strength.partial}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-navy-400">Contradicting evidence</dt>
                <dd className="font-bold text-red-400">{strength.contradicting}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-navy-400">Unverified claims</dt>
                <dd className="font-bold text-navy-300">{strength.unverified}</dd>
              </div>
            </dl>
          </Card>

          {/* WHY WAS THIS FLAGGED */}
          <Card className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Why Was This Flagged?</h2>
              <AiTag label="Explainable AI" />
            </div>
            {topContradictions.length === 0 ? (
              <p className="text-sm leading-relaxed text-navy-300">
                GreenWatch found no unresolved contradictions between {company.name}&rsquo;s claims and the available evidence in this investigation.
              </p>
            ) : (
              <>
                <p className="text-sm leading-relaxed text-navy-300">GreenWatch identified {topContradictions.length} major risk indicator{topContradictions.length === 1 ? '' : 's'}:</p>
                <ol className="mt-3 space-y-2.5">
                  {topContradictions.map((c, i) => (
                    <li key={c.id} className="flex gap-2.5 text-sm leading-relaxed text-navy-200">
                      <span className="shrink-0 font-bold text-emerald-400">{i + 1}.</span>
                      <span>{c.verdictReason}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-white/[0.06] pt-3 text-sm font-semibold text-white">
                  Conclusion: this investigation should be treated as {company.riskLevel === 'high-risk' ? 'high-risk' : 'requiring review'} and warrants further audit.
                </p>
              </>
            )}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-navy-500">
              <span>Sources analyzed: {sourceCount}</span>
              <span>Claims analyzed: {company.claims.length}</span>
              <span>Evidence items: {company.evidence.length}</span>
            </div>
          </Card>
        </div>

        {/* RECOMMENDED ACTION + ASK GREENWATCH */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecommendedActionsSection company={company} />
          <AskGreenwatch company={company} />
        </div>
      </div>
    )
  }

  // input / not-found
  return (
    <div className="mx-auto max-w-2xl animate-fade-in py-6">
      <PageHeader
        eyebrow="Truth Investigation"
        title="Turn Sustainability Claims Into Evidence-Backed Findings"
        subtitle="Enter a company, claim, or report. GreenWatch AI connects the claim to evidence, cross-checks it, and produces an explainable risk score."
      />

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Company, claim or report — e.g. "We will achieve carbon neutrality by 2030"'
              className="w-full rounded-xl border border-white/10 bg-navy-900 py-3 pl-10 pr-4 text-sm text-navy-100 placeholder:text-navy-500 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
          <Button type="submit" size="lg">
            INVESTIGATE
            <ChevronRight className="h-4 w-4" />
          </Button>
        </form>
        <button
          onClick={() => navigate('/new-analysis')}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400 hover:text-emerald-400"
        >
          <FileUp className="h-3.5 w-3.5" />
          Or upload a report for structured intake
        </button>
      </Card>

      {stage === 'not-found' && (
        <div className="mt-6 animate-fade-in">
          <EmptyState
            icon={ShieldAlert}
            title="Insufficient evidence available for this query"
            description="GreenWatch can't establish a reliable verdict outside the companies currently covered by this investigation index. Try one of the demo investigations below."
          />
        </div>
      )}

      <div className="mt-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-navy-500">Demo Investigations</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {companies.map((c) => (
            <button
              key={c.id}
              onClick={() => runInvestigation(c.name)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-900 p-3.5 text-left transition hover:border-emerald-500/40 hover:bg-navy-800"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400">
                {c.logoInitials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-navy-100">{c.name}</span>
                <span className="block text-xs text-navy-500">{c.sector}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-navy-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
