import type { Company, RiskLevel, ScoreDriver } from '../types'
import { analysisStages } from '../data/platform'

// ---------------------------------------------------------------------------
// MOCK AI SERVICE
//
// This module simulates the GREENWATCH AI analysis pipeline. It does NOT
// call a real LLM or ML model — all "AI analysis" here is deterministic
// mock logic operating on pre-authored mock data, so the prototype behaves
// consistently for demo purposes.
//
// To connect a real backend: replace the bodies of `runAnalysisPipeline`,
// `computeGreenwashingScore`, and `classifyRisk` with calls to an actual
// LLM / NLP claim-extraction service, an ESG/carbon database, a financial
// data API, and a certification verification API. The function signatures
// and return shapes are designed to remain stable across that swap.
// ---------------------------------------------------------------------------

/** Weighted greenwashing risk scoring engine.
 * Financial and emission contradictions carry more weight than vague
 * marketing language, per the product's detection philosophy.
 */
const DRIVER_WEIGHTS: Record<string, number> = {
  'claim-quality': 0.15,
  'emission-consistency': 0.22,
  'financial-alignment': 0.22,
  'scope3-disclosure': 0.13,
  'certification-validity': 0.13,
  'industry-benchmark': 0.15,
}

export function computeGreenwashingScore(drivers: ScoreDriver[]): number {
  const total = drivers.reduce((sum, d) => {
    const weight = DRIVER_WEIGHTS[d.key] ?? 1 / drivers.length
    return sum + d.value * weight
  }, 0)
  return Math.round(total)
}

export function classifyRisk(score: number): RiskLevel {
  if (score <= 30) return 'genuine'
  if (score <= 60) return 'needs-audit'
  return 'high-risk'
}

export const riskLevelMeta: Record<RiskLevel, { label: string; color: string; badgeClass: string }> = {
  genuine: { label: 'Genuine', color: '#22c55e', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  'needs-audit': { label: 'Needs Audit', color: '#f59e0b', badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  'high-risk': { label: 'High Risk', color: '#ef4444', badgeClass: 'bg-red-500/10 text-red-400 border-red-500/30' },
}

export interface PipelineCallbacks {
  onStageStart?: (stageIndex: number) => void
  onStageComplete?: (stageIndex: number) => void
  onComplete?: (company: Company) => void
}

/** Simulates the sequential AI analysis pipeline with realistic timing. */
export function runAnalysisPipeline(company: Company, callbacks: PipelineCallbacks = {}): () => void {
  let cancelled = false
  const stageDuration = 650

  analysisStages.forEach((_, index) => {
    const startDelay = index * stageDuration
    const completeDelay = startDelay + stageDuration - 120

    setTimeout(() => {
      if (!cancelled) callbacks.onStageStart?.(index)
    }, startDelay)

    setTimeout(() => {
      if (!cancelled) callbacks.onStageComplete?.(index)
    }, completeDelay)
  })

  const totalDuration = analysisStages.length * stageDuration + 300
  setTimeout(() => {
    if (!cancelled) callbacks.onComplete?.(company)
  }, totalDuration)

  return () => {
    cancelled = true
  }
}

export function searchEntities(query: string, companies: Company[]) {
  const q = query.trim().toLowerCase()
  if (!q) return { companies: [], claims: [] }

  const matchedCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q) ||
      c.headquarters.toLowerCase().includes(q)
  )

  const matchedClaims = companies.flatMap((c) =>
    c.claims
      .filter((claim) => claim.text.toLowerCase().includes(q))
      .map((claim) => ({ claim, company: c }))
  )

  return { companies: matchedCompanies, claims: matchedClaims }
}
