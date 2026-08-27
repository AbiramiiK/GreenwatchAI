import { Leaf, ShieldCheck, FlaskConical, Info } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'

export default function About() {
  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      <PageHeader eyebrow="About" title="GreenWatch AI" subtitle="Don't just trust green. Verify it." />

      <Card className="mb-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <Leaf className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-white">What GreenWatch AI Is</h2>
        <p className="mt-2 text-sm leading-relaxed text-navy-300">
          GreenWatch AI is an evidence-first investigation engine for sustainability claims. It doesn&rsquo;t just scan text for
          suspicious words — it connects each claim to supporting and contradicting evidence, cross-checks it against
          environmental and financial data, and produces an explainable Greenwashing Risk Score.
        </p>
      </Card>

      <Card className="mb-6">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-white">Our Philosophy</h2>
        <p className="mt-2 text-sm leading-relaxed text-navy-300">
          Claim → Evidence → Cross-Check → Contradiction → Risk → Action. Every score GreenWatch produces is traceable back to
          the specific evidence that shaped it — nothing is presented as a verified fact unless the evidence supports it.
          Findings are framed as <span className="font-semibold text-navy-100">Requires Review</span>,{' '}
          <span className="font-semibold text-navy-100">Contradiction Detected</span>, or{' '}
          <span className="font-semibold text-navy-100">Insufficient Evidence</span> — never as a legal accusation.
        </p>
      </Card>

      <Card className="border-amber-500/20 bg-amber-500/[0.04]">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
          <FlaskConical className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-white">About This Prototype</h2>
        <p className="mt-2 text-sm leading-relaxed text-navy-300">
          This build is a Round 2 competition prototype for Innovista 2.0. The five companies, claims, evidence, and scores in
          this app are sample data authored for demonstration — GreenWatch AI does not currently connect to a live LLM, ESG
          database, financial data provider, or certification registry. The investigation workflow, scoring logic, and evidence
          trail shown here reflect the intended product behavior once connected to real data sources.
        </p>
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs text-navy-400">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>Actions like report export and account settings are UI-complete but not wired to real backends in this prototype.</span>
        </div>
      </Card>
    </div>
  )
}
