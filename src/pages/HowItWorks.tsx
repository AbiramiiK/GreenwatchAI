import { Inbox, FileSearch2, ScanSearch, GitCompareArrows, Gauge, MessageCircle, ArrowDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const steps = [
  {
    n: '01',
    title: 'Ingest',
    icon: Inbox,
    body: 'Sustainability reports, claims, news and structured environmental data enter GreenWatch as the raw material for an investigation.',
  },
  {
    n: '02',
    title: 'Claim AI',
    icon: FileSearch2,
    body: 'Environmental and sustainability claims are extracted from the source material and separated from ordinary marketing language.',
  },
  {
    n: '03',
    title: 'Evidence AI',
    icon: ScanSearch,
    body: 'Supporting and contradicting evidence for each claim is identified across financial filings, emissions data, and certification records.',
  },
  {
    n: '04',
    title: 'Cross-Check AI',
    icon: GitCompareArrows,
    body: 'Claims are compared against emissions history, capital allocation, certifications, and industry benchmarks to surface agreement or contradiction.',
  },
  {
    n: '05',
    title: 'Truth Score AI',
    icon: Gauge,
    body: 'A weighted Greenwashing Risk Score is calculated from claim credibility, evidence strength, and how consistent the claim is with the evidence found.',
  },
  {
    n: '06',
    title: 'Explain',
    icon: MessageCircle,
    body: 'GreenWatch presents the full evidence trail — claim, source, evidence, verdict — alongside a recommended next action for review.',
  },
]

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      <PageHeader
        eyebrow="How It Works"
        title="From Claim To Verdict"
        subtitle="GreenWatch doesn't just detect suspicious words — it detects contradictions between what a company says and what the evidence shows."
      />

      <div className="space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <div key={step.n}>
              <Card className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-navy-500">STEP {step.n}</p>
                  <h2 className="text-base font-bold text-white">{step.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-navy-400">{step.body}</p>
                </div>
              </Card>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <ArrowDown className="h-4 w-4 text-navy-700" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Card className="mt-8 text-center">
        <p className="text-sm text-navy-400">Ready to see it in action?</p>
        <Button className="mt-3" size="lg" onClick={() => navigate('/investigate')}>
          Try a Truth Investigation
        </Button>
      </Card>
    </div>
  )
}
