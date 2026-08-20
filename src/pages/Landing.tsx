import { useNavigate } from 'react-router-dom'
import { ArrowRight, Leaf, ShieldCheck, FileSearch, Sparkles, TrendingUp } from 'lucide-react'
import { platformKpis } from '../data/platform'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-forest-600">
            <Leaf className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-tight">GREENWATCH</p>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-400">AI</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Enter Platform
        </button>
      </header>

      <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 text-center sm:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[500px] max-w-4xl bg-emerald-500/10 blur-[120px]" />

        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Greenwashing Detection & Sustainability Truth Engine
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          GREENWATCH <span className="text-emerald-400">AI</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl font-semibold text-white/90 sm:text-2xl">
          Don&rsquo;t Just Trust Green. Verify It.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          AI-powered sustainability intelligence that detects contradictions between environmental claims and
          real-world evidence.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate('/new-analysis')}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-forest-600 px-7 py-3.5 text-sm font-bold text-white shadow-lift transition hover:from-emerald-400 hover:to-forest-500"
          >
            START ANALYSIS
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            EXPLORE DEMO
          </button>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: 'CLAIM', desc: 'What companies say.', icon: FileSearch },
            { title: 'EVIDENCE', desc: 'What the data shows.', icon: ShieldCheck },
            { title: 'TRUTH', desc: 'What AI discovers.', icon: TrendingUp },
          ].map(({ title, desc, icon: Icon }, i) => (
            <div key={title} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
              <Icon className="h-6 w-6 text-emerald-400" />
              <p className="mt-4 text-sm font-bold tracking-wide text-white">{title}</p>
              <p className="mt-1 text-sm text-white/50">{desc}</p>
              {i < 2 && (
                <ArrowRight className="absolute -right-6 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/20 sm:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:grid-cols-5">
          {[
            { label: 'Companies Analyzed', value: platformKpis.companiesAnalyzed },
            { label: 'Reports Processed', value: platformKpis.reportsProcessed },
            { label: 'Claims Extracted', value: platformKpis.claimsExtracted.toLocaleString() },
            { label: 'High-Risk Companies', value: platformKpis.highRiskCompanies },
            { label: 'Evidence Points', value: platformKpis.evidencePoints },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">From Green Claims to Green Truth</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          GREENWATCH AI connects sustainability claims with financial, environmental, certification and industry
          evidence to reveal whether the claim is actually supported &mdash; not merely whether it sounds green.
        </p>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center">
        <p className="text-sm font-bold text-white">GREENWATCH AI</p>
        <p className="mt-1 text-xs text-white/40">Verify the Claim. Reveal the Reality.</p>
        <p className="mt-4 text-[11px] text-white/30">© 2026 GREENWATCH AI &mdash; Prototype for Project Innovation Challenge</p>
      </footer>
    </div>
  )
}
