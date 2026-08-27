import type { Claim, Company } from '../types'

// ---------------------------------------------------------------------------
// Pure derivations over the existing Company data contract. Nothing here
// invents new facts — every number/label is computed from fields that
// already exist on `Company` (claims, evidence, emissions, financials,
// certifications), so it stays honest to what the demo dataset actually
// contains.
// ---------------------------------------------------------------------------

export interface EvidenceStrengthCounts {
  verified: number
  partial: number
  contradicting: number
  unverified: number
}

export function getEvidenceStrengthCounts(company: Company): EvidenceStrengthCounts {
  const counts: EvidenceStrengthCounts = { verified: 0, partial: 0, contradicting: 0, unverified: 0 }
  company.claims.forEach((c) => {
    if (c.status === 'supported') counts.verified++
    else if (c.status === 'partially-supported') counts.partial++
    else if (c.status === 'contradicted') counts.contradicting++
    else counts.unverified++
  })
  return counts
}

/** % of claims that are fully or partially evidence-backed. */
export function getEvidenceStrengthPct(company: Company): number {
  const total = company.claims.length || 1
  const { verified, partial } = getEvidenceStrengthCounts(company)
  return Math.round(((verified + partial * 0.5) / total) * 100)
}

/** % of claims with no contradiction found — how internally consistent the claim set is. */
export function getClaimConsistencyPct(company: Company): number {
  const total = company.claims.length || 1
  const consistent = company.claims.filter((c) => c.status !== 'contradicted').length
  return Math.round((consistent / total) * 100)
}

export function getDistinctSourceCount(company: Company): number {
  return new Set(company.evidence.map((e) => e.source)).size
}

export function getVerifiedCertCount(company: Company): { verified: number; total: number } {
  return {
    verified: company.certifications.filter((c) => c.verified).length,
    total: company.certifications.length,
  }
}

function riskWeightScore(w: Claim['riskWeight']): number {
  return w === 'high' ? 3 : w === 'medium' ? 2 : 1
}

export interface Pattern {
  id: string
  label: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  evidenceCount: number
  riskContribution: number
  claimCode: string
}

const CATEGORY_PATTERN: Record<Claim['category'], { contradicted: string; partial: string }> = {
  emissions: { contradicted: 'Inconsistent Environmental Data', partial: 'Emission Transparency Gap' },
  energy: { contradicted: 'Unsupported Future Promise', partial: 'Missing Interim Target' },
  'supply-chain': { contradicted: 'Selective Disclosure', partial: 'Scope 3 Gap' },
  waste: { contradicted: 'Inconsistent Environmental Data', partial: 'Selective Disclosure' },
  social: { contradicted: 'Vague Environmental Claim', partial: 'Unverified Certification' },
  other: { contradicted: 'Vague Environmental Claim', partial: 'Selective Disclosure' },
}

/** Maps contradicted / partially-supported claims to named greenwashing patterns. */
export function getPatterns(company: Company): Pattern[] {
  return company.claims
    .filter((c) => c.status === 'contradicted' || c.status === 'partially-supported')
    .map((c) => {
      const map = CATEGORY_PATTERN[c.category] ?? CATEGORY_PATTERN.other
      return {
        id: c.id,
        label: c.status === 'contradicted' ? map.contradicted : map.partial,
        description: c.verdictReason,
        severity: c.status === 'contradicted' ? (c.riskWeight === 'high' ? 'critical' : 'warning') : 'warning',
        evidenceCount: c.evidenceIds.length,
        riskContribution: c.riskWeight === 'high' ? 18 : c.riskWeight === 'medium' ? 10 : 4,
        claimCode: c.code,
      } as Pattern
    })
}

export function getTopContradictions(company: Company, n = 3): Claim[] {
  return [...company.claims]
    .filter((c) => c.status === 'contradicted' || c.status === 'partially-supported')
    .sort((a, b) => riskWeightScore(b.riskWeight) - riskWeightScore(a.riskWeight))
    .slice(0, n)
}

/** The single claim best suited for a "Claim vs Reality" side-by-side. */
export function getHeadlineClaim(company: Company): Claim | undefined {
  return getTopContradictions(company, 1)[0] ?? company.claims[0]
}

export interface ComparisonHighlights {
  bestTransparencyId: string
  highestRiskId: string
  strongestEvidenceId: string
}

export function getComparisonHighlights(selected: Company[]): ComparisonHighlights {
  let bestTransparency = selected[0]
  let highestRisk = selected[0]
  let strongestEvidence = selected[0]
  for (const c of selected) {
    if (c.riskScore < bestTransparency.riskScore) bestTransparency = c
    if (c.riskScore > highestRisk.riskScore) highestRisk = c
    if (getEvidenceStrengthPct(c) > getEvidenceStrengthPct(strongestEvidence)) strongestEvidence = c
  }
  return {
    bestTransparencyId: bestTransparency.id,
    highestRiskId: highestRisk.id,
    strongestEvidenceId: strongestEvidence.id,
  }
}
