import type { AnalysisStage } from '../types'

export const platformKpis = {
  companiesAnalyzed: 128,
  reportsProcessed: 312,
  claimsExtracted: 1842,
  highRiskCompanies: 27,
  evidencePoints: '4.2M',
}

export const globalRiskOverview = [
  { name: 'Genuine', value: 46, color: '#16a34a' },
  { name: 'Needs Audit', value: 55, color: '#d97706' },
  { name: 'High Risk', value: 27, color: '#dc2626' },
]

export const analysisStages: AnalysisStage[] = [
  { id: 'collect', label: 'Collecting documents' },
  { id: 'ocr', label: 'Extracting text using OCR' },
  { id: 'claims', label: 'Identifying sustainability claims' },
  { id: 'vagueness', label: 'Detecting vague environmental language' },
  { id: 'scopes', label: 'Analyzing Scope 1, 2 and 3 emissions' },
  { id: 'financial', label: 'Cross-checking financial data' },
  { id: 'certs', label: 'Verifying certifications' },
  { id: 'benchmark', label: 'Comparing industry benchmarks' },
  { id: 'contradictions', label: 'Detecting contradictions' },
  { id: 'scoring', label: 'Calculating Greenwashing Risk Score' },
]

export const industries = [
  'Energy',
  'FMCG',
  'Renewable',
  'Automotive',
  'Manufacturing',
  'Technology',
  'Finance',
  'Retail',
]
