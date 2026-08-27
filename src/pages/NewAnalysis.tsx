import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText,
  FileSpreadsheet,
  ClipboardList,
  Database,
  Globe,
  Newspaper,
  Upload,
  Check,
  Loader2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import RiskGauge from '../components/ui/RiskGauge'
import { companies, getCompanyById } from '../data/companies'
import { industries, analysisStages } from '../data/platform'
import { runAnalysisPipeline } from '../services/mockAiService'
import { useToast } from '../hooks/useToast'
import { cn } from '../utils/cn'
import type { UploadSlot } from '../types'

type Stage = 'form' | 'processing' | 'complete'

const uploadSlots: Omit<UploadSlot, 'fileName'>[] = [
  { id: 'sustainability', title: 'Sustainability Report', formats: 'PDF / DOCX', kind: 'file' },
  { id: 'financial', title: 'Financial Report', formats: 'PDF / XLSX', kind: 'file' },
  { id: 'esg', title: 'ESG Report', formats: 'PDF / DOCX', kind: 'file' },
  { id: 'environmental', title: 'Environmental Data', formats: 'CSV / XLSX', kind: 'file' },
  { id: 'website', title: 'Company Website', formats: 'URL', kind: 'url' },
  { id: 'news', title: 'News / Social Media', formats: 'URL or text', kind: 'url' },
]

const slotIcons: Record<string, typeof FileText> = {
  sustainability: FileText,
  financial: FileSpreadsheet,
  esg: ClipboardList,
  environmental: Database,
  website: Globe,
  news: Newspaper,
}

export default function NewAnalysis() {
  const navigate = useNavigate()
  const { push } = useToast()
  const [stage, setStage] = useState<Stage>('form')
  const [companyId, setCompanyId] = useState(companies[0].id)
  const [industry, setIndustry] = useState(industries[0])
  const [period, setPeriod] = useState('FY 2025')
  const [files, setFiles] = useState<Record<string, string>>({})
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [activeStage, setActiveStage] = useState(-1)
  const cancelRef = useRef<(() => void) | null>(null)

  const selectedCompany = getCompanyById(companyId)

  useEffect(() => {
    return () => cancelRef.current?.()
  }, [])

  function handleFileSelect(slotId: string, kind: 'file' | 'url') {
    if (kind === 'file') {
      const fakeNames: Record<string, string> = {
        sustainability: 'sustainability-report-2025.pdf',
        financial: 'annual-financial-report-2025.pdf',
        esg: 'esg-disclosure-2025.pdf',
        environmental: 'emissions-data-2025.csv',
      }
      setFiles((prev) => ({ ...prev, [slotId]: fakeNames[slotId] ?? 'uploaded-file.pdf' }))
    } else {
      setFiles((prev) => ({ ...prev, [slotId]: 'https://example.com/company-source' }))
    }
  }

  function startAnalysis() {
    if (!selectedCompany) return
    setStage('processing')
    setCompletedStages([])
    setActiveStage(-1)
    cancelRef.current = runAnalysisPipeline(selectedCompany, {
      onStageStart: (i) => setActiveStage(i),
      onStageComplete: (i) => setCompletedStages((prev) => [...prev, i]),
      onComplete: () => {
        setStage('complete')
        push({ kind: 'success', title: 'Analysis complete', message: `${selectedCompany.name} has been fully analyzed.` })
      },
    })
  }

  if (stage === 'processing' || stage === 'complete') {
    return (
      <div className="mx-auto max-w-2xl animate-fade-in py-6">
        <div className="text-center">
          {stage === 'processing' ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lift animate-pulse-ring">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-white">GREENWATCH AI IS ANALYZING&hellip;</h1>
              <p className="mt-2 text-sm text-navy-500">
                Cross-referencing claims from {selectedCompany?.name} against financial, environmental, and certification evidence.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lift">
                <Check className="h-8 w-8 text-white" strokeWidth={3} />
              </div>
              <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-white">ANALYSIS COMPLETE</h1>
              <p className="mt-2 text-sm text-navy-500">GREENWATCH AI has finished verifying {selectedCompany?.name}</p>
            </>
          )}
        </div>

        <Card className="mt-8">
          <ul className="space-y-3.5">
            {analysisStages.map((s, i) => {
              const done = completedStages.includes(i)
              const active = activeStage === i && !done
              return (
                <li key={s.id} className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
                      done
                        ? 'border-emerald-500 bg-emerald-500'
                        : active
                        ? 'border-emerald-400 bg-navy-900'
                        : 'border-white/10 bg-navy-900'
                    )}
                  >
                    {done && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                    {active && <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-500" />}
                  </span>
                  <span
                    className={cn(
                      'text-sm transition-colors',
                      done ? 'font-medium text-navy-200' : active ? 'font-semibold text-white' : 'text-navy-500'
                    )}
                  >
                    {s.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </Card>

        {stage === 'complete' && selectedCompany && (
          <Card className="mt-6 flex flex-col items-center animate-scale-in">
            <RiskGauge score={selectedCompany.riskScore} size={200} />
            <p className="mt-2 text-sm text-navy-500">AI Confidence: <span className="font-bold text-navy-100">{selectedCompany.aiConfidence}%</span></p>
            <Button className="mt-6 w-full" size="lg" onClick={() => navigate(`/companies/${selectedCompany.id}`)}>
              VIEW FULL REPORT
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <PageHeader
        eyebrow="New Analysis"
        title="Start New Greenwashing Analysis"
        subtitle="Upload or provide sustainability information and let GREENWATCH AI verify the claims."
      />

      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-navy-500">Company Details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-500">Company Name</label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-900 px-3 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-500">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-900 px-3 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            >
              {industries.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-500">Analysis Period</label>
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-900 px-3 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            />
          </div>
        </div>
      </Card>

      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-navy-500">Evidence Sources</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {uploadSlots.map((slot) => {
          const Icon = slotIcons[slot.id]
          const fileName = files[slot.id]
          return (
            <Card
              key={slot.id}
              hoverable
              className={cn('cursor-pointer border-2 border-dashed', fileName ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-white/10')}
              onClick={() => handleFileSelect(slot.id, slot.kind)}
            >
              <div className="flex items-center gap-3.5">
                <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', fileName ? 'bg-emerald-500/15 text-emerald-400' : 'bg-navy-800 text-navy-500')}>
                  {fileName ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy-100">{slot.title}</p>
                  <p className="truncate text-xs text-navy-500">{fileName ?? slot.formats}</p>
                </div>
                {!fileName && <Upload className="h-4 w-4 shrink-0 text-navy-500" />}
              </div>
            </Card>
          )
        })}
      </div>

      <Button size="lg" className="mt-8 w-full" onClick={startAnalysis}>
        <Sparkles className="h-4 w-4" />
        START AI ANALYSIS
      </Button>
    </div>
  )
}
