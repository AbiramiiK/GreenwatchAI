// Core domain types for GREENWATCH AI.
// Mock data conforms to these interfaces so mock services can later be
// swapped for real LLM / ESG / financial / certification APIs without
// touching UI code.

export type RiskLevel = 'genuine' | 'needs-audit' | 'high-risk'

export type ClaimStatus = 'contradicted' | 'partially-supported' | 'supported' | 'unverified'

export type Severity = 'critical' | 'warning' | 'info' | 'positive'

export interface ScoreDriver {
  key: string
  label: string
  value: number // 0-100, higher = worse contributor to risk
  description: string
}

export interface EvidenceRef {
  id: string
  label: string
  source: string
  page?: number
}

export interface Claim {
  id: string
  code: string // e.g. CLAIM 01
  companyId: string
  text: string
  category: 'emissions' | 'energy' | 'supply-chain' | 'waste' | 'social' | 'other'
  status: ClaimStatus
  aiInterpretation: string
  evidenceIds: string[]
  companyClaimValue: string
  evidenceValue: string
  verdictReason: string
  riskWeight: 'low' | 'medium' | 'high'
  dateAnalyzed: string
}

export interface Evidence {
  id: string // EV-0248
  companyId: string
  type: 'financial' | 'environmental' | 'certification' | 'benchmark' | 'media'
  source: string
  page?: number
  detectedValue: string
  relatedClaimId: string
  aiInterpretation: string
  riskWeight: 'low' | 'medium' | 'high'
}

export interface EmissionYear {
  year: number
  scope1: number
  scope2: number
  scope3: number
}

export interface EmissionsData {
  companyId: string
  unit: string
  history: EmissionYear[]
  totalCO2e: number
  yoyChangePct: number
  scope3ContributionPct: number
  note: string
}

export interface CapexAllocation {
  label: string
  value: number
  color: string
}

export interface FinancialAlignment {
  companyId: string
  claimSummary: string
  allocation: CapexAllocation[]
  discrepancyLevel: 'low' | 'moderate' | 'high'
  finding: string
}

export interface Certification {
  id: string
  companyId: string
  name: string
  verified: boolean
  source: string
  note?: string
  shadowLabel?: boolean
}

export interface BenchmarkMetric {
  key: string
  label: string
  percentile: number // company's percentile among peers
  goodDirection: 'higher' | 'lower' // whether higher percentile is good
}

export interface Alert {
  id: string
  companyId: string
  severity: Severity
  message: string
  relatedClaimId?: string
  date: string
  time: string
}

export interface RecommendedAction {
  id: string
  companyId: string
  text: string
  done: boolean
}

export interface Company {
  id: string
  name: string
  sector: string
  headquarters: string
  analysisPeriod: string
  riskScore: number
  riskLevel: RiskLevel
  aiConfidence: number
  lastAnalysis: string
  logoInitials: string
  summary: string
  scoreDrivers: ScoreDriver[]
  claims: Claim[]
  evidence: Evidence[]
  emissions: EmissionsData
  financials: FinancialAlignment
  certifications: Certification[]
  benchmarks: BenchmarkMetric[]
  alerts: Alert[]
  recommendedActions: RecommendedAction[]
}

export interface AnalysisStage {
  id: string
  label: string
}

export interface UploadSlot {
  id: string
  title: string
  formats: string
  kind: 'file' | 'url'
  fileName?: string
}
