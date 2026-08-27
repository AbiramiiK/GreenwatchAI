import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Leaf, Search, FileUp, ChevronRight } from 'lucide-react'
import { platformKpis } from '../data/platform'

const pipeline = ['CLAIM', 'EVIDENCE', 'CROSS-CHECK', 'TRUTH SCORE', 'ACTION']

export default function Landing() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleInvestigate(e: React.FormEvent) {
    e.preventDefault()
    navigate(query.trim() ? `/investigate?q=${encodeURIComponent(query.trim())}` : '/investigate')
  }

  return (
    <div className="min-h-screen bg-navy-975 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700">
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

      <section className="relative mx-auto max-w-4xl px-6 pb-20 pt-14 text-center sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[500px] max-w-4xl bg-emerald-500/10 blur-[120px]" />

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Can You Trust What A Company Says <span className="text-emerald-400">About Sustainability?</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60">
          GreenWatch AI investigates sustainability claims by connecting them to environmental, financial and
          certification evidence — then shows you exactly where the claim and the evidence disagree.
        </p>

        <form onSubmit={handleInvestigate} className="mx-auto mt-9 max-w-xl">
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-2 backdrop-blur-sm">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search a company, claim or report — e.g. "We will achieve carbon neutrality by 2030"'
                className="w-full rounded-xl bg-transparent py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/35 outline-none"
              />
            </div>
          </div>
          <div className="mt-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-lift transition hover:shadow-glow sm:w-auto"
            >
              INVESTIGATE CLAIM
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/new-analysis')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
            >
              <FileUp className="h-4 w-4" />
              UPLOAD REPORT
            </button>
          </div>
        </form>

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-4">
          {pipeline.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className="animate-fade-in rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold tracking-wide text-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {step}
              </div>
              {i < pipeline.length - 1 && <ChevronRight className="h-4 w-4 shrink-0 text-emerald-500/50" />}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] py-10">
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

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Our Philosophy</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          We don&rsquo;t just detect suspicious words — we detect contradictions between claims and evidence.
        </p>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center">
        <p className="text-sm font-bold text-white">GREENWATCH AI</p>
        <p className="mt-1 text-xs text-white/40">Don&rsquo;t Just Trust Green. Verify It.</p>
        <p className="mt-4 text-[11px] text-white/30">© 2026 GREENWATCH AI &mdash; Round 2 Prototype for Innovista 2.0</p>
      </footer>
    </div>
  )
}
