import { useState } from 'react'
import { MessageSquare, Send, Sparkles } from 'lucide-react'
import Card from './ui/Card'
import type { Company } from '../types'
import { getDistinctSourceCount, getTopContradictions } from '../utils/scoring'
import { cn } from '../utils/cn'

interface AskGreenwatchProps {
  company: Company
}

const SUGGESTED_QUESTIONS = [
  { id: 'flagged', label: 'Why was this claim flagged?', keywords: ['flag', 'why'] },
  { id: 'contradicts', label: 'Which evidence contradicts the claim?', keywords: ['contradict', 'against'] },
  { id: 'missing', label: 'What evidence is missing?', keywords: ['missing', 'gap', 'lack'] },
  { id: 'peers', label: 'How does this company compare with peers?', keywords: ['peer', 'compar', 'benchmark', 'industry'] },
  { id: 'highest', label: 'Which claim has the highest risk?', keywords: ['highest', 'worst', 'biggest'] },
  { id: 'next', label: 'What should an auditor investigate next?', keywords: ['auditor', 'next', 'investigate'] },
] as const

function answerFor(id: string, company: Company): string {
  switch (id) {
    case 'flagged': {
      const top = getTopContradictions(company, 1)[0]
      if (!top) return `No claims from ${company.name} currently show a contradiction against the available evidence.`
      return `${top.code} ("${top.text}") was flagged because ${top.verdictReason.charAt(0).toLowerCase()}${top.verdictReason.slice(1)}`
    }
    case 'contradicts': {
      const top = getTopContradictions(company, 1)[0]
      if (!top) return `No linked evidence currently contradicts an active claim for ${company.name}.`
      const items = company.evidence.filter((e) => top.evidenceIds.includes(e.id) && e.riskWeight === 'high')
      const list = items.length ? items : company.evidence.filter((e) => top.evidenceIds.includes(e.id))
      if (!list.length) return `${top.code} has no linked evidence on file.`
      return `Against ${top.code}, the strongest contradicting evidence is: ${list.map((e) => `${e.source} — "${e.detectedValue}"`).join('; ')}.`
    }
    case 'missing': {
      const gap = company.claims.find((c) => c.status === 'partially-supported') ?? company.claims.find((c) => c.status === 'unverified')
      if (!gap) return `Evidence coverage across ${company.name}'s analyzed claims is currently complete.`
      return `For ${gap.code} ("${gap.text}"), the evidence gap is: ${gap.evidenceValue}`
    }
    case 'peers': {
      const sorted = [...company.benchmarks].sort((a, b) => a.percentile - b.percentile)
      const worst = sorted[0]
      const best = sorted[sorted.length - 1]
      if (!worst || !best) return `No industry benchmark data is available for ${company.name} yet.`
      return `${company.name} ranks in the ${worst.percentile}th percentile on ${worst.label} (below peers) and the ${best.percentile}th percentile on ${best.label} (above peers), among sector benchmarks.`
    }
    case 'highest': {
      const top = getTopContradictions(company, 1)[0]
      if (!top) return `No claim currently carries a high risk weight for ${company.name}.`
      return `${top.code} — "${top.text}" — carries the highest risk weight (${top.riskWeight.toUpperCase()}), contributing most to the overall ${company.riskScore}/100 score.`
    }
    case 'next': {
      const action = company.recommendedActions[0]
      if (!action) return `No recommended actions are on file for ${company.name} yet.`
      return `An auditor should start with: ${action.text}`
    }
    default:
      return `I can currently answer questions about the investigation in view — try one of the suggested questions above.`
  }
}

function matchQuestion(input: string): (typeof SUGGESTED_QUESTIONS)[number] | null {
  const q = input.toLowerCase()
  return SUGGESTED_QUESTIONS.find((sq) => sq.keywords.some((k) => q.includes(k))) ?? null
}

interface ConversationEntry {
  question: string
  answer: string
}

export default function AskGreenwatch({ company }: AskGreenwatchProps) {
  const [entries, setEntries] = useState<ConversationEntry[]>([])
  const [input, setInput] = useState('')

  function ask(questionLabel: string, id: string | null) {
    const answer = id ? answerFor(id, company) : `I can currently answer questions about the investigation in view — try one of the suggested questions above.`
    setEntries((prev) => [...prev, { question: questionLabel, answer }])
    setInput('')
  }

  return (
    <Card>
      <div className="mb-1 flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-emerald-400" />
        <h2 className="text-lg font-bold text-white">Ask GreenWatch</h2>
      </div>
      <p className="mb-4 text-xs text-navy-500">Evidence-grounded investigation assistant &mdash; answers only from {company.name}&rsquo;s analyzed claims and evidence.</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((sq) => (
          <button
            key={sq.id}
            onClick={() => ask(sq.label, sq.id)}
            className="rounded-full border border-white/10 bg-navy-900 px-3 py-1.5 text-xs font-medium text-navy-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
          >
            {sq.label}
          </button>
        ))}
      </div>

      {entries.length > 0 && (
        <div className="scrollbar-thin mb-4 max-h-80 space-y-4 overflow-y-auto pr-1">
          {entries.map((entry, i) => (
            <div key={i} className="space-y-2">
              <p className="text-sm font-semibold text-navy-100">{entry.question}</p>
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-sm leading-relaxed text-navy-200">{entry.answer}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!input.trim()) return
          const match = matchQuestion(input)
          ask(input.trim(), match?.id ?? null)
        }}
        className="flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this investigation..."
          className={cn(
            'flex-1 rounded-xl border border-white/10 bg-navy-900 px-3.5 py-2.5 text-sm text-navy-100 placeholder:text-navy-500 outline-none',
            'focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10'
          )}
        />
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white transition hover:shadow-glow"
          aria-label="Ask"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-white/[0.06] pt-3 text-[11px] text-navy-500">
        <span>Sources used: {getDistinctSourceCount(company)}</span>
        <span>Claims analyzed: {company.claims.length}</span>
        <span>Evidence used: {company.evidence.length}</span>
        <span>Confidence: {company.aiConfidence}%</span>
      </div>
    </Card>
  )
}
