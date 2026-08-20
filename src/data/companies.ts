import type { Company } from '../types'

// ---------------------------------------------------------------------------
// Mock ESG intelligence dataset for GREENWATCH AI.
// In production this file is replaced by live calls into:
//   - Mock AI Service        -> real LLM / NLP claim extraction & scoring
//   - Mock Emission Data      -> real ESG / carbon database
//   - Mock Financial Data     -> real financial data API
//   - Mock Certification DB   -> real certification verification API
// The shape of `Company` in src/types/index.ts is the contract those
// integrations must satisfy.
// ---------------------------------------------------------------------------

export const companies: Company[] = [
  {
    id: 'eco-future-industries',
    name: 'Eco Future Industries Ltd.',
    sector: 'Energy',
    headquarters: 'New York, USA',
    analysisPeriod: 'FY 2025',
    riskScore: 72,
    riskLevel: 'high-risk',
    aiConfidence: 89,
    lastAnalysis: 'Today',
    logoInitials: 'EF',
    summary:
      'A diversified energy major marketing an aggressive clean-energy transition narrative while capital expenditure remains concentrated in fossil-fuel exploration.',
    scoreDrivers: [
      { key: 'claim-quality', label: 'Claim Quality', value: 45, description: 'Measures specificity and verifiability of sustainability language versus vague marketing terms.' },
      { key: 'emission-consistency', label: 'Emission Consistency', value: 20, description: 'Checks whether reported Scope 1/2/3 emissions trends align with stated environmental commitments.' },
      { key: 'financial-alignment', label: 'Financial Alignment', value: 25, description: 'Compares capital expenditure allocation against sustainability narrative.' },
      { key: 'scope3-disclosure', label: 'Scope 3 Disclosure', value: 40, description: 'Evaluates completeness and transparency of indirect supply-chain emissions reporting.' },
      { key: 'certification-validity', label: 'Certification Validity', value: 55, description: 'Verifies claimed certifications and eco-labels against authoritative registries.' },
      { key: 'industry-benchmark', label: 'Industry Benchmark', value: 70, description: 'Positions company performance against sector peers on core ESG indicators.' },
    ],
    claims: [
      {
        id: 'eco-claim-01',
        code: 'CLAIM 01',
        companyId: 'eco-future-industries',
        text: 'We will achieve 100% clean energy transition by 2030.',
        category: 'energy',
        status: 'contradicted',
        aiInterpretation:
          'The claim indicates a commitment to substantially transition energy consumption and production toward clean/renewable sources within a five-year horizon.',
        evidenceIds: ['eco-ev-0248', 'eco-ev-0249', 'eco-ev-0250'],
        companyClaimValue: '100% clean energy transition by 2030',
        evidenceValue: '92% of capital expenditure allocated to fossil-fuel exploration in FY2025',
        verdictReason:
          'Capital expenditure disclosed in the Annual Report is overwhelmingly directed toward fossil-fuel exploration and extraction, directly contradicting a stated full transition to clean energy within the decade.',
        riskWeight: 'high',
        dateAnalyzed: 'Today',
      },
      {
        id: 'eco-claim-02',
        code: 'CLAIM 02',
        companyId: 'eco-future-industries',
        text: 'Our operations are carbon neutral.',
        category: 'emissions',
        status: 'contradicted',
        aiInterpretation:
          'The claim asserts that net operational greenhouse gas emissions are effectively zero, implying either near-zero direct emissions or verified offsetting at scale.',
        evidenceIds: ['eco-ev-0251', 'eco-ev-0252'],
        companyClaimValue: 'Carbon neutral operations',
        evidenceValue: 'Scope 1 + Scope 2 emissions rose 6% YoY; no verified offset program disclosed',
        verdictReason:
          'Reported Scope 1 and Scope 2 emissions data does not support the stated carbon-neutral claim, and no third-party verified offset mechanism is disclosed in the sustainability report.',
        riskWeight: 'high',
        dateAnalyzed: 'Today',
      },
      {
        id: 'eco-claim-03',
        code: 'CLAIM 03',
        companyId: 'eco-future-industries',
        text: 'We operate a sustainable supply chain.',
        category: 'supply-chain',
        status: 'partially-supported',
        aiInterpretation:
          'The claim suggests supplier-level environmental and labor standards are actively enforced across the value chain.',
        evidenceIds: ['eco-ev-0253'],
        companyClaimValue: 'Sustainable supply chain across all tiers',
        evidenceValue: 'Tier-1 supplier audits disclosed; Tier-2/3 supply chain emissions undisclosed',
        verdictReason:
          'Evidence supports partial implementation at Tier-1 suppliers, but Scope 3 upstream data for deeper supply-chain tiers is incomplete, preventing full verification.',
        riskWeight: 'medium',
        dateAnalyzed: 'Today',
      },
      {
        id: 'eco-claim-04',
        code: 'CLAIM 04',
        companyId: 'eco-future-industries',
        text: 'Zero waste to landfill across all manufacturing sites.',
        category: 'waste',
        status: 'supported',
        aiInterpretation:
          'The claim asserts that solid waste from manufacturing operations is fully diverted from landfill via recycling, reuse, or recovery.',
        evidenceIds: ['eco-ev-0254'],
        companyClaimValue: 'Zero waste to landfill',
        evidenceValue: 'Third-party waste audit confirms 99.4% diversion rate across 12 manufacturing sites',
        verdictReason:
          'Independent waste-management audit data corroborates the claim within a reasonable tolerance and is consistent across reporting periods.',
        riskWeight: 'low',
        dateAnalyzed: 'Today',
      },
    ],
    evidence: [
      { id: 'eco-ev-0248', companyId: 'eco-future-industries', type: 'financial', source: 'Annual Report 2025', page: 45, detectedValue: '92% CapEx → Fossil Fuel Exploration', relatedClaimId: 'eco-claim-01', aiInterpretation: 'The financial allocation is inconsistent with the stated renewable-energy transition timeline.', riskWeight: 'high' },
      { id: 'eco-ev-0249', companyId: 'eco-future-industries', type: 'environmental', source: 'Sustainability Report 2025', page: 12, detectedValue: 'Renewable capacity additions: 3.2% of total generation portfolio', relatedClaimId: 'eco-claim-01', aiInterpretation: 'Renewable buildout rate is inconsistent with a 2030 full-transition target.', riskWeight: 'high' },
      { id: 'eco-ev-0250', companyId: 'eco-future-industries', type: 'benchmark', source: 'Industry Benchmark Database', detectedValue: 'Sector-median clean-energy CapEx share: 34%', relatedClaimId: 'eco-claim-01', aiInterpretation: 'Company trails sector median clean-energy investment share by a wide margin.', riskWeight: 'medium' },
      { id: 'eco-ev-0251', companyId: 'eco-future-industries', type: 'environmental', source: 'Emission Report 2025', page: 28, detectedValue: 'Scope 1: 4.8M tCO2e (+5% YoY), Scope 2: 1.1M tCO2e (+9% YoY)', relatedClaimId: 'eco-claim-02', aiInterpretation: 'Direct and energy-indirect emissions increased rather than trending toward net-zero.', riskWeight: 'high' },
      { id: 'eco-ev-0252', companyId: 'eco-future-industries', type: 'certification', source: 'Verified Certification Database', detectedValue: 'No registered verified carbon offset program found', relatedClaimId: 'eco-claim-02', aiInterpretation: 'Absence of a registered offset program undermines the carbon-neutral claim.', riskWeight: 'high' },
      { id: 'eco-ev-0253', companyId: 'eco-future-industries', type: 'environmental', source: 'ESG Report 2025', page: 61, detectedValue: 'Tier-2/3 supplier emissions coverage: 18% of supply base', relatedClaimId: 'eco-claim-03', aiInterpretation: 'Limited visibility into deep supply chain prevents full claim verification.', riskWeight: 'medium' },
      { id: 'eco-ev-0254', companyId: 'eco-future-industries', type: 'environmental', source: 'Independent Waste Audit 2025', page: 4, detectedValue: '99.4% landfill diversion rate, 12/12 sites audited', relatedClaimId: 'eco-claim-04', aiInterpretation: 'Independently verified data supports the waste-diversion claim.', riskWeight: 'low' },
    ],
    emissions: {
      companyId: 'eco-future-industries',
      unit: 'Million tCO2e',
      history: [
        { year: 2021, scope1: 4.1, scope2: 0.9, scope3: 11.2 },
        { year: 2022, scope1: 4.3, scope2: 0.95, scope3: 12.4 },
        { year: 2023, scope1: 4.4, scope2: 1.0, scope3: 13.6 },
        { year: 2024, scope1: 4.6, scope2: 1.05, scope3: 15.1 },
        { year: 2025, scope1: 4.8, scope2: 1.1, scope3: 17.8 },
      ],
      totalCO2e: 23.7,
      yoyChangePct: 8.4,
      scope3ContributionPct: 75,
      note: 'Scope 3 emissions increased significantly despite sustainability claims, driven by upstream fossil-fuel extraction partners.',
    },
    financials: {
      companyId: 'eco-future-industries',
      claimSummary: 'Rapid transition to renewable energy',
      allocation: [
        { label: 'Fossil Fuel Exploration', value: 92, color: '#dc2626' },
        { label: 'Renewable Energy', value: 8, color: '#10b981' },
      ],
      discrepancyLevel: 'high',
      finding: 'Sustainability narrative is not aligned with capital expenditure pattern. 92% of FY2025 CapEx was directed to fossil-fuel exploration and extraction, versus 8% to renewable energy projects.',
    },
    certifications: [
      { id: 'eco-cert-01', companyId: 'eco-future-industries', name: 'Green Standard Gold', verified: false, source: 'Verified Certification Database', note: 'No matching registration found in issuing body records.', shadowLabel: true },
      { id: 'eco-cert-02', companyId: 'eco-future-industries', name: 'ISO 14001 Environmental Management', verified: true, source: 'ISO Certification Registry' },
      { id: 'eco-cert-03', companyId: 'eco-future-industries', name: 'Carbon Trust Standard', verified: false, source: 'Carbon Trust Registry', note: 'Certification lapsed in 2023, still displayed in current marketing materials.', shadowLabel: true },
    ],
    benchmarks: [
      { key: 'emission-intensity', label: 'Emission Intensity', percentile: 78, goodDirection: 'lower' },
      { key: 'renewable-use', label: 'Renewable Energy Use', percentile: 22, goodDirection: 'higher' },
      { key: 'disclosure-quality', label: 'ESG Disclosure Quality', percentile: 28, goodDirection: 'higher' },
      { key: 'sustainability-investment', label: 'Sustainability Investment', percentile: 18, goodDirection: 'higher' },
    ],
    alerts: [
      { id: 'eco-alert-01', companyId: 'eco-future-industries', severity: 'critical', message: 'High-risk greenwashing detected in clean energy transition claim', relatedClaimId: 'eco-claim-01', date: '2026-08-20', time: '09:14' },
      { id: 'eco-alert-02', companyId: 'eco-future-industries', severity: 'warning', message: 'New contradictory evidence found for carbon neutral claim', relatedClaimId: 'eco-claim-02', date: '2026-08-20', time: '09:16' },
      { id: 'eco-alert-03', companyId: 'eco-future-industries', severity: 'warning', message: 'Certification "Green Standard Gold" could not be verified', relatedClaimId: 'eco-claim-01', date: '2026-08-19', time: '17:02' },
      { id: 'eco-alert-04', companyId: 'eco-future-industries', severity: 'critical', message: 'Scope 3 emissions increased 18% despite transition claims', relatedClaimId: 'eco-claim-01', date: '2026-08-19', time: '14:40' },
      { id: 'eco-alert-05', companyId: 'eco-future-industries', severity: 'positive', message: 'New evidence supports zero waste to landfill claim', relatedClaimId: 'eco-claim-04', date: '2026-08-18', time: '11:05' },
    ],
    recommendedActions: [
      { id: 'eco-act-01', companyId: 'eco-future-industries', text: 'Conduct a detailed independent audit of fossil-fuel investment plans', done: false },
      { id: 'eco-act-02', companyId: 'eco-future-industries', text: 'Improve Scope 3 emissions disclosure across deep supply-chain tiers', done: false },
      { id: 'eco-act-03', companyId: 'eco-future-industries', text: 'Remove or substantiate unsupported environmental claims in marketing', done: false },
      { id: 'eco-act-04', companyId: 'eco-future-industries', text: 'Verify all displayed sustainability certifications with issuing bodies', done: false },
      { id: 'eco-act-05', companyId: 'eco-future-industries', text: 'Publish a measurable, time-bound clean-energy transition roadmap', done: false },
      { id: 'eco-act-06', companyId: 'eco-future-industries', text: 'Provide third-party verified evidence for carbon-neutral claims', done: false },
    ],
  },

  {
    id: 'greenlife-consumer',
    name: 'GreenLife Consumer Products',
    sector: 'FMCG',
    headquarters: 'London, UK',
    analysisPeriod: 'FY 2025',
    riskScore: 38,
    riskLevel: 'needs-audit',
    aiConfidence: 81,
    lastAnalysis: 'Today',
    logoInitials: 'GL',
    summary:
      'A consumer packaged-goods company with credible packaging initiatives but inconsistent disclosure on upstream agricultural sourcing emissions.',
    scoreDrivers: [
      { key: 'claim-quality', label: 'Claim Quality', value: 35, description: 'Measures specificity and verifiability of sustainability language versus vague marketing terms.' },
      { key: 'emission-consistency', label: 'Emission Consistency', value: 42, description: 'Checks whether reported Scope 1/2/3 emissions trends align with stated environmental commitments.' },
      { key: 'financial-alignment', label: 'Financial Alignment', value: 30, description: 'Compares capital expenditure allocation against sustainability narrative.' },
      { key: 'scope3-disclosure', label: 'Scope 3 Disclosure', value: 58, description: 'Evaluates completeness and transparency of indirect supply-chain emissions reporting.' },
      { key: 'certification-validity', label: 'Certification Validity', value: 20, description: 'Verifies claimed certifications and eco-labels against authoritative registries.' },
      { key: 'industry-benchmark', label: 'Industry Benchmark', value: 40, description: 'Positions company performance against sector peers on core ESG indicators.' },
    ],
    claims: [
      {
        id: 'gl-claim-01',
        code: 'CLAIM 01',
        companyId: 'greenlife-consumer',
        text: '100% recyclable packaging across our product range by 2026.',
        category: 'waste',
        status: 'partially-supported',
        aiInterpretation: 'Commitment to transition all packaging materials to recyclable formats within a defined near-term deadline.',
        evidenceIds: ['gl-ev-0101', 'gl-ev-0102'],
        companyClaimValue: '100% recyclable packaging by 2026',
        evidenceValue: '73% of SKUs currently use recyclable packaging; multi-layer flexible pouches remain non-recyclable',
        verdictReason: 'Substantial progress is evidenced, but a meaningful share of the product range still uses composite materials that are not recyclable in most municipal systems.',
        riskWeight: 'medium',
        dateAnalyzed: 'Today',
      },
      {
        id: 'gl-claim-02',
        code: 'CLAIM 02',
        companyId: 'greenlife-consumer',
        text: 'We source 100% sustainably farmed palm oil.',
        category: 'supply-chain',
        status: 'contradicted',
        aiInterpretation: 'Claim that all palm oil inputs are certified sustainable at the point of origin.',
        evidenceIds: ['gl-ev-0103'],
        companyClaimValue: '100% sustainably farmed palm oil',
        evidenceValue: 'RSPO-certified supply covers 61% of total palm oil volume per FY2025 procurement records',
        verdictReason: 'Procurement records show a significant gap between the certified-sustainable share and the 100% claim made in consumer-facing marketing.',
        riskWeight: 'high',
        dateAnalyzed: 'Today',
      },
      {
        id: 'gl-claim-03',
        code: 'CLAIM 03',
        companyId: 'greenlife-consumer',
        text: 'Carbon footprint reduced by 15% since 2020.',
        category: 'emissions',
        status: 'supported',
        aiInterpretation: 'Quantified emissions-reduction claim relative to a fixed baseline year.',
        evidenceIds: ['gl-ev-0104'],
        companyClaimValue: '15% reduction since 2020',
        evidenceValue: 'Verified Scope 1+2 emissions down 16.2% since 2020 per third-party assured emissions report',
        verdictReason: 'Independently assured emissions data corroborates the claimed reduction within a reasonable margin.',
        riskWeight: 'low',
        dateAnalyzed: 'Today',
      },
    ],
    evidence: [
      { id: 'gl-ev-0101', companyId: 'greenlife-consumer', type: 'environmental', source: 'Sustainability Report 2025', page: 22, detectedValue: '73% of SKUs use recyclable packaging', relatedClaimId: 'gl-claim-01', aiInterpretation: 'Progress is real but incomplete relative to the 100% target.', riskWeight: 'medium' },
      { id: 'gl-ev-0102', companyId: 'greenlife-consumer', type: 'environmental', source: 'Packaging Audit 2025', page: 8, detectedValue: 'Flexible multi-layer pouches: non-recyclable in 89% of municipal systems', relatedClaimId: 'gl-claim-01', aiInterpretation: 'A material category central to the product line remains non-recyclable in practice.', riskWeight: 'medium' },
      { id: 'gl-ev-0103', companyId: 'greenlife-consumer', type: 'financial', source: 'Procurement Disclosure 2025', page: 14, detectedValue: 'RSPO-certified palm oil: 61% of total volume', relatedClaimId: 'gl-claim-02', aiInterpretation: 'Certified-sustainable share falls well short of the 100% claim.', riskWeight: 'high' },
      { id: 'gl-ev-0104', companyId: 'greenlife-consumer', type: 'environmental', source: 'Third-Party Assurance Statement', page: 2, detectedValue: 'Scope 1+2 emissions -16.2% vs 2020 baseline', relatedClaimId: 'gl-claim-03', aiInterpretation: 'Independently assured figures support the stated reduction.', riskWeight: 'low' },
    ],
    emissions: {
      companyId: 'greenlife-consumer',
      unit: 'Million tCO2e',
      history: [
        { year: 2021, scope1: 0.62, scope2: 0.31, scope3: 3.4 },
        { year: 2022, scope1: 0.58, scope2: 0.29, scope3: 3.6 },
        { year: 2023, scope1: 0.55, scope2: 0.25, scope3: 3.5 },
        { year: 2024, scope1: 0.52, scope2: 0.22, scope3: 3.7 },
        { year: 2025, scope1: 0.5, scope2: 0.2, scope3: 3.9 },
      ],
      totalCO2e: 4.6,
      yoyChangePct: 3.1,
      scope3ContributionPct: 84,
      note: 'Scope 1/2 emissions are trending down as claimed, but Scope 3 agricultural sourcing emissions continue to rise gradually.',
    },
    financials: {
      companyId: 'greenlife-consumer',
      claimSummary: 'Sustainable sourcing and packaging investment',
      allocation: [
        { label: 'Sustainable Packaging R&D', value: 46, color: '#10b981' },
        { label: 'Conventional Sourcing', value: 54, color: '#d97706' },
      ],
      discrepancyLevel: 'moderate',
      finding: 'Investment in sustainable packaging is meaningful but conventional (non-certified) sourcing still represents the majority of procurement spend.',
    },
    certifications: [
      { id: 'gl-cert-01', companyId: 'greenlife-consumer', name: 'RSPO Certified', verified: true, source: 'RSPO Registry' },
      { id: 'gl-cert-02', companyId: 'greenlife-consumer', name: 'B Corp Certification', verified: true, source: 'B Lab Registry' },
      { id: 'gl-cert-03', companyId: 'greenlife-consumer', name: 'EcoLeaf Trusted Mark', verified: false, source: 'Verified Certification Database', note: 'Logo resembles an official eco-label but is not a registered certification.', shadowLabel: true },
    ],
    benchmarks: [
      { key: 'emission-intensity', label: 'Emission Intensity', percentile: 55, goodDirection: 'lower' },
      { key: 'renewable-use', label: 'Renewable Energy Use', percentile: 48, goodDirection: 'higher' },
      { key: 'disclosure-quality', label: 'ESG Disclosure Quality', percentile: 61, goodDirection: 'higher' },
      { key: 'sustainability-investment', label: 'Sustainability Investment', percentile: 52, goodDirection: 'higher' },
    ],
    alerts: [
      { id: 'gl-alert-01', companyId: 'greenlife-consumer', severity: 'warning', message: 'Palm oil sourcing claim exceeds certified supply share', relatedClaimId: 'gl-claim-02', date: '2026-08-20', time: '08:02' },
      { id: 'gl-alert-02', companyId: 'greenlife-consumer', severity: 'positive', message: 'Verified emissions reduction supports carbon footprint claim', relatedClaimId: 'gl-claim-03', date: '2026-08-19', time: '10:30' },
      { id: 'gl-alert-03', companyId: 'greenlife-consumer', severity: 'warning', message: 'EcoLeaf Trusted Mark could not be verified', relatedClaimId: 'gl-claim-01', date: '2026-08-18', time: '15:12' },
    ],
    recommendedActions: [
      { id: 'gl-act-01', companyId: 'greenlife-consumer', text: 'Close the gap between RSPO-certified volume and public sourcing claims', done: false },
      { id: 'gl-act-02', companyId: 'greenlife-consumer', text: 'Redesign flexible pouch packaging for municipal recyclability', done: false },
      { id: 'gl-act-03', companyId: 'greenlife-consumer', text: 'Remove unverified EcoLeaf Trusted Mark from packaging', done: false },
      { id: 'gl-act-04', companyId: 'greenlife-consumer', text: 'Expand Scope 3 agricultural emissions disclosure', done: false },
    ],
  },

  {
    id: 'solarnova-energy',
    name: 'SolarNova Energy',
    sector: 'Renewable',
    headquarters: 'Austin, USA',
    analysisPeriod: 'FY 2025',
    riskScore: 18,
    riskLevel: 'genuine',
    aiConfidence: 94,
    lastAnalysis: 'Yesterday',
    logoInitials: 'SN',
    summary:
      'A pure-play solar developer whose disclosed capital expenditure, emissions trajectory, and certifications are consistently aligned with its public claims.',
    scoreDrivers: [
      { key: 'claim-quality', label: 'Claim Quality', value: 12, description: 'Measures specificity and verifiability of sustainability language versus vague marketing terms.' },
      { key: 'emission-consistency', label: 'Emission Consistency', value: 10, description: 'Checks whether reported Scope 1/2/3 emissions trends align with stated environmental commitments.' },
      { key: 'financial-alignment', label: 'Financial Alignment', value: 8, description: 'Compares capital expenditure allocation against sustainability narrative.' },
      { key: 'scope3-disclosure', label: 'Scope 3 Disclosure', value: 22, description: 'Evaluates completeness and transparency of indirect supply-chain emissions reporting.' },
      { key: 'certification-validity', label: 'Certification Validity', value: 6, description: 'Verifies claimed certifications and eco-labels against authoritative registries.' },
      { key: 'industry-benchmark', label: 'Industry Benchmark', value: 15, description: 'Positions company performance against sector peers on core ESG indicators.' },
    ],
    claims: [
      {
        id: 'sn-claim-01',
        code: 'CLAIM 01',
        companyId: 'solarnova-energy',
        text: '100% of generation capacity from solar photovoltaic sources.',
        category: 'energy',
        status: 'supported',
        aiInterpretation: 'Claim that the entire operational generation fleet is solar-based.',
        evidenceIds: ['sn-ev-0301'],
        companyClaimValue: '100% solar PV generation',
        evidenceValue: 'Grid interconnection filings confirm 100% of 2.4GW capacity is solar PV',
        verdictReason: 'Regulatory interconnection filings independently confirm the claimed generation mix.',
        riskWeight: 'low',
        dateAnalyzed: 'Yesterday',
      },
      {
        id: 'sn-claim-02',
        code: 'CLAIM 02',
        companyId: 'solarnova-energy',
        text: 'Panel recycling program covers end-of-life for all installed capacity.',
        category: 'waste',
        status: 'partially-supported',
        aiInterpretation: 'Commitment to a closed-loop recycling program for decommissioned solar panels.',
        evidenceIds: ['sn-ev-0302'],
        companyClaimValue: 'Full end-of-life recycling coverage',
        evidenceValue: 'Recycling partnerships confirmed for 84% of installed capacity; remaining legacy sites pending contract renewal',
        verdictReason: 'Program is substantively in place with high coverage, though not yet fully universal across legacy installations.',
        riskWeight: 'low',
        dateAnalyzed: 'Yesterday',
      },
    ],
    evidence: [
      { id: 'sn-ev-0301', companyId: 'solarnova-energy', type: 'certification', source: 'Grid Interconnection Filings', detectedValue: '2.4GW capacity, 100% solar PV', relatedClaimId: 'sn-claim-01', aiInterpretation: 'Regulatory filings confirm the claimed generation source mix.', riskWeight: 'low' },
      { id: 'sn-ev-0302', companyId: 'solarnova-energy', type: 'environmental', source: 'Recycling Partner Contracts', detectedValue: '84% of installed capacity under recycling contract', relatedClaimId: 'sn-claim-02', aiInterpretation: 'Strong but not yet complete coverage of end-of-life recycling commitments.', riskWeight: 'low' },
    ],
    emissions: {
      companyId: 'solarnova-energy',
      unit: 'Million tCO2e',
      history: [
        { year: 2021, scope1: 0.02, scope2: 0.04, scope3: 0.41 },
        { year: 2022, scope1: 0.02, scope2: 0.03, scope3: 0.38 },
        { year: 2023, scope1: 0.015, scope2: 0.03, scope3: 0.35 },
        { year: 2024, scope1: 0.015, scope2: 0.02, scope3: 0.33 },
        { year: 2025, scope1: 0.01, scope2: 0.02, scope3: 0.3 },
      ],
      totalCO2e: 0.33,
      yoyChangePct: -9.1,
      scope3ContributionPct: 91,
      note: 'Emissions are declining year over year, consistent with continued build-out of low-carbon generation and supply-chain efficiency gains.',
    },
    financials: {
      companyId: 'solarnova-energy',
      claimSummary: 'Full-scale solar capacity expansion',
      allocation: [
        { label: 'Solar Capacity Expansion', value: 88, color: '#10b981' },
        { label: 'Grid Infrastructure & Storage', value: 12, color: '#348f61' },
      ],
      discrepancyLevel: 'low',
      finding: 'Capital expenditure is concentrated in solar capacity and supporting grid/storage infrastructure, consistent with the company’s stated strategy.',
    },
    certifications: [
      { id: 'sn-cert-01', companyId: 'solarnova-energy', name: 'Green-e Energy Certified', verified: true, source: 'Green-e Registry' },
      { id: 'sn-cert-02', companyId: 'solarnova-energy', name: 'ISO 14001 Environmental Management', verified: true, source: 'ISO Certification Registry' },
    ],
    benchmarks: [
      { key: 'emission-intensity', label: 'Emission Intensity', percentile: 12, goodDirection: 'lower' },
      { key: 'renewable-use', label: 'Renewable Energy Use', percentile: 97, goodDirection: 'higher' },
      { key: 'disclosure-quality', label: 'ESG Disclosure Quality', percentile: 88, goodDirection: 'higher' },
      { key: 'sustainability-investment', label: 'Sustainability Investment', percentile: 91, goodDirection: 'higher' },
    ],
    alerts: [
      { id: 'sn-alert-01', companyId: 'solarnova-energy', severity: 'positive', message: 'Generation mix claim fully supported by regulatory filings', relatedClaimId: 'sn-claim-01', date: '2026-08-19', time: '13:20' },
      { id: 'sn-alert-02', companyId: 'solarnova-energy', severity: 'info', message: 'Recycling coverage nearing full completion', relatedClaimId: 'sn-claim-02', date: '2026-08-18', time: '09:45' },
    ],
    recommendedActions: [
      { id: 'sn-act-01', companyId: 'solarnova-energy', text: 'Extend recycling contracts to remaining legacy installations', done: false },
      { id: 'sn-act-02', companyId: 'solarnova-energy', text: 'Publish supplier-level Scope 3 breakdown for panel manufacturing', done: false },
    ],
  },

  {
    id: 'urbanearth-mobility',
    name: 'UrbanEarth Mobility',
    sector: 'Automotive',
    headquarters: 'Munich, Germany',
    analysisPeriod: 'FY 2025',
    riskScore: 64,
    riskLevel: 'high-risk',
    aiConfidence: 85,
    lastAnalysis: 'Yesterday',
    logoInitials: 'UE',
    summary:
      'An automotive manufacturer promoting an electric-vehicle-first identity while the majority of unit sales and R&D spend remain combustion-engine based.',
    scoreDrivers: [
      { key: 'claim-quality', label: 'Claim Quality', value: 52, description: 'Measures specificity and verifiability of sustainability language versus vague marketing terms.' },
      { key: 'emission-consistency', label: 'Emission Consistency', value: 38, description: 'Checks whether reported Scope 1/2/3 emissions trends align with stated environmental commitments.' },
      { key: 'financial-alignment', label: 'Financial Alignment', value: 33, description: 'Compares capital expenditure allocation against sustainability narrative.' },
      { key: 'scope3-disclosure', label: 'Scope 3 Disclosure', value: 35, description: 'Evaluates completeness and transparency of indirect supply-chain emissions reporting.' },
      { key: 'certification-validity', label: 'Certification Validity', value: 48, description: 'Verifies claimed certifications and eco-labels against authoritative registries.' },
      { key: 'industry-benchmark', label: 'Industry Benchmark', value: 60, description: 'Positions company performance against sector peers on core ESG indicators.' },
    ],
    claims: [
      {
        id: 'ue-claim-01',
        code: 'CLAIM 01',
        companyId: 'urbanearth-mobility',
        text: 'Electric mobility is at the core of everything we build.',
        category: 'emissions',
        status: 'contradicted',
        aiInterpretation: 'Claim positions electric vehicles as the primary focus of the company’s product strategy.',
        evidenceIds: ['ue-ev-0401', 'ue-ev-0402'],
        companyClaimValue: 'EV-first product strategy',
        evidenceValue: 'EVs represent 14% of FY2025 unit sales; 68% of R&D spend remains allocated to internal combustion platforms',
        verdictReason: 'Sales mix and R&D allocation data show combustion-engine vehicles remain the dominant business focus, contradicting the EV-first narrative.',
        riskWeight: 'high',
        dateAnalyzed: 'Yesterday',
      },
      {
        id: 'ue-claim-02',
        code: 'CLAIM 02',
        companyId: 'urbanearth-mobility',
        text: 'We are reducing fleet-average emissions year over year.',
        category: 'emissions',
        status: 'partially-supported',
        aiInterpretation: 'Claim that average tailpipe/fleet emissions intensity is on a declining trajectory.',
        evidenceIds: ['ue-ev-0403'],
        companyClaimValue: 'Declining fleet-average emissions',
        evidenceValue: 'Fleet-average emissions down 3% YoY, driven mainly by regulatory efficiency mandates rather than product mix shift',
        verdictReason: 'A modest decline is verifiable, but attribution to voluntary sustainability strategy versus regulatory compliance is unclear.',
        riskWeight: 'medium',
        dateAnalyzed: 'Yesterday',
      },
      {
        id: 'ue-claim-03',
        code: 'CLAIM 03',
        companyId: 'urbanearth-mobility',
        text: 'Manufacturing plants run on renewable electricity.',
        category: 'energy',
        status: 'supported',
        aiInterpretation: 'Claim that electricity consumed at manufacturing sites is sourced from renewable generation.',
        evidenceIds: ['ue-ev-0404'],
        companyClaimValue: '100% renewable electricity at plants',
        evidenceValue: 'Power purchase agreements confirm renewable electricity sourcing for 6 of 6 major plants',
        verdictReason: 'Signed power purchase agreements independently confirm the renewable electricity sourcing claim.',
        riskWeight: 'low',
        dateAnalyzed: 'Yesterday',
      },
    ],
    evidence: [
      { id: 'ue-ev-0401', companyId: 'urbanearth-mobility', type: 'financial', source: 'Annual Report 2025', page: 33, detectedValue: 'EV unit sales share: 14%', relatedClaimId: 'ue-claim-01', aiInterpretation: 'Sales mix does not reflect an EV-first business.', riskWeight: 'high' },
      { id: 'ue-ev-0402', companyId: 'urbanearth-mobility', type: 'financial', source: 'R&D Investment Disclosure 2025', page: 9, detectedValue: '68% of R&D budget → internal combustion platforms', relatedClaimId: 'ue-claim-01', aiInterpretation: 'R&D allocation contradicts the stated electric-first strategic focus.', riskWeight: 'high' },
      { id: 'ue-ev-0403', companyId: 'urbanearth-mobility', type: 'environmental', source: 'Emission Report 2025', page: 19, detectedValue: 'Fleet-average emissions -3% YoY', relatedClaimId: 'ue-claim-02', aiInterpretation: 'Decline is real but modest relative to marketing tone.', riskWeight: 'medium' },
      { id: 'ue-ev-0404', companyId: 'urbanearth-mobility', type: 'certification', source: 'Power Purchase Agreements', detectedValue: '6/6 major plants on renewable PPAs', relatedClaimId: 'ue-claim-03', aiInterpretation: 'Independently verifiable contracts support the plant-level renewable claim.', riskWeight: 'low' },
    ],
    emissions: {
      companyId: 'urbanearth-mobility',
      unit: 'Million tCO2e',
      history: [
        { year: 2021, scope1: 1.8, scope2: 0.6, scope3: 28.4 },
        { year: 2022, scope1: 1.75, scope2: 0.55, scope3: 29.1 },
        { year: 2023, scope1: 1.7, scope2: 0.5, scope3: 29.8 },
        { year: 2024, scope1: 1.65, scope2: 0.45, scope3: 31.2 },
        { year: 2025, scope1: 1.6, scope2: 0.4, scope3: 32.9 },
      ],
      totalCO2e: 34.9,
      yoyChangePct: 4.9,
      scope3ContributionPct: 94,
      note: 'Scope 3 use-of-sold-products emissions continue climbing as combustion vehicles still dominate the sales mix.',
    },
    financials: {
      companyId: 'urbanearth-mobility',
      claimSummary: 'Electric mobility as core strategic focus',
      allocation: [
        { label: 'Internal Combustion R&D', value: 68, color: '#dc2626' },
        { label: 'Electric Vehicle R&D', value: 32, color: '#10b981' },
      ],
      discrepancyLevel: 'high',
      finding: 'R&D investment remains combustion-weighted despite an EV-first brand narrative, indicating a strategic misalignment.',
    },
    certifications: [
      { id: 'ue-cert-01', companyId: 'urbanearth-mobility', name: 'ISO 14001 Environmental Management', verified: true, source: 'ISO Certification Registry' },
      { id: 'ue-cert-02', companyId: 'urbanearth-mobility', name: 'EcoDrive Certified', verified: false, source: 'Verified Certification Database', note: 'No issuing body found; likely a self-created marketing label.', shadowLabel: true },
    ],
    benchmarks: [
      { key: 'emission-intensity', label: 'Emission Intensity', percentile: 66, goodDirection: 'lower' },
      { key: 'renewable-use', label: 'Renewable Energy Use', percentile: 44, goodDirection: 'higher' },
      { key: 'disclosure-quality', label: 'ESG Disclosure Quality', percentile: 39, goodDirection: 'higher' },
      { key: 'sustainability-investment', label: 'Sustainability Investment', percentile: 35, goodDirection: 'higher' },
    ],
    alerts: [
      { id: 'ue-alert-01', companyId: 'urbanearth-mobility', severity: 'critical', message: 'EV-first claim contradicted by sales and R&D mix', relatedClaimId: 'ue-claim-01', date: '2026-08-19', time: '16:11' },
      { id: 'ue-alert-02', companyId: 'urbanearth-mobility', severity: 'warning', message: 'EcoDrive Certified label could not be verified', relatedClaimId: 'ue-claim-01', date: '2026-08-18', time: '12:00' },
      { id: 'ue-alert-03', companyId: 'urbanearth-mobility', severity: 'positive', message: 'Renewable electricity sourcing confirmed at all plants', relatedClaimId: 'ue-claim-03', date: '2026-08-17', time: '10:22' },
    ],
    recommendedActions: [
      { id: 'ue-act-01', companyId: 'urbanearth-mobility', text: 'Rebalance R&D investment to match EV-first public positioning', done: false },
      { id: 'ue-act-02', companyId: 'urbanearth-mobility', text: 'Disclose use-of-sold-products Scope 3 methodology in detail', done: false },
      { id: 'ue-act-03', companyId: 'urbanearth-mobility', text: 'Remove unverifiable EcoDrive Certified label from products', done: false },
    ],
  },

  {
    id: 'pureplanet-manufacturing',
    name: 'PurePlanet Manufacturing',
    sector: 'Manufacturing',
    headquarters: 'Singapore',
    analysisPeriod: 'FY 2025',
    riskScore: 45,
    riskLevel: 'needs-audit',
    aiConfidence: 83,
    lastAnalysis: '2 days ago',
    logoInitials: 'PP',
    summary:
      'An industrial manufacturer with genuine energy-efficiency gains at owned facilities, but limited transparency into contract-manufacturer emissions.',
    scoreDrivers: [
      { key: 'claim-quality', label: 'Claim Quality', value: 40, description: 'Measures specificity and verifiability of sustainability language versus vague marketing terms.' },
      { key: 'emission-consistency', label: 'Emission Consistency', value: 34, description: 'Checks whether reported Scope 1/2/3 emissions trends align with stated environmental commitments.' },
      { key: 'financial-alignment', label: 'Financial Alignment', value: 28, description: 'Compares capital expenditure allocation against sustainability narrative.' },
      { key: 'scope3-disclosure', label: 'Scope 3 Disclosure', value: 62, description: 'Evaluates completeness and transparency of indirect supply-chain emissions reporting.' },
      { key: 'certification-validity', label: 'Certification Validity', value: 30, description: 'Verifies claimed certifications and eco-labels against authoritative registries.' },
      { key: 'industry-benchmark', label: 'Industry Benchmark', value: 48, description: 'Positions company performance against sector peers on core ESG indicators.' },
    ],
    claims: [
      {
        id: 'pp-claim-01',
        code: 'CLAIM 01',
        companyId: 'pureplanet-manufacturing',
        text: 'Energy intensity reduced 20% since 2020 through efficiency upgrades.',
        category: 'energy',
        status: 'supported',
        aiInterpretation: 'Quantified operational efficiency claim tied to a fixed baseline year.',
        evidenceIds: ['pp-ev-0501'],
        companyClaimValue: '20% energy intensity reduction since 2020',
        evidenceValue: 'Facility energy audits confirm 21.4% reduction in kWh per unit produced since 2020',
        verdictReason: 'Independent facility audits corroborate the claimed efficiency improvement.',
        riskWeight: 'low',
        dateAnalyzed: '2 days ago',
      },
      {
        id: 'pp-claim-02',
        code: 'CLAIM 02',
        companyId: 'pureplanet-manufacturing',
        text: 'Our entire product ecosystem is manufactured responsibly.',
        category: 'supply-chain',
        status: 'unverified',
        aiInterpretation: 'Broad claim regarding responsible manufacturing practices across the full product ecosystem, including contract manufacturers.',
        evidenceIds: ['pp-ev-0502'],
        companyClaimValue: 'Entire product ecosystem manufactured responsibly',
        evidenceValue: 'No emissions or labor audit data disclosed for 40% of production volume run by third-party contract manufacturers',
        verdictReason: 'Insufficient evidence is available to verify or contradict the claim for a significant share of outsourced production; this is not automatically treated as greenwashing.',
        riskWeight: 'medium',
        dateAnalyzed: '2 days ago',
      },
      {
        id: 'pp-claim-03',
        code: 'CLAIM 03',
        companyId: 'pureplanet-manufacturing',
        text: 'Water usage reduced through closed-loop recycling systems.',
        category: 'other',
        status: 'partially-supported',
        aiInterpretation: 'Claim regarding water conservation via closed-loop recycling infrastructure.',
        evidenceIds: ['pp-ev-0503'],
        companyClaimValue: 'Closed-loop water recycling reduces usage',
        evidenceValue: 'Closed-loop systems installed at 5 of 11 facilities; remaining facilities use single-pass cooling',
        verdictReason: 'The technology and benefit are real where installed, but coverage across the facility network is under half.',
        riskWeight: 'medium',
        dateAnalyzed: '2 days ago',
      },
    ],
    evidence: [
      { id: 'pp-ev-0501', companyId: 'pureplanet-manufacturing', type: 'environmental', source: 'Facility Energy Audit 2025', page: 6, detectedValue: '-21.4% kWh per unit since 2020', relatedClaimId: 'pp-claim-01', aiInterpretation: 'Independent audit data supports the claimed efficiency gain.', riskWeight: 'low' },
      { id: 'pp-ev-0502', companyId: 'pureplanet-manufacturing', type: 'environmental', source: 'Supply Chain Disclosure 2025', page: 17, detectedValue: 'No audit data for 40% of contract-manufactured volume', relatedClaimId: 'pp-claim-02', aiInterpretation: 'A broad responsibility claim cannot be verified without contract-manufacturer data.', riskWeight: 'medium' },
      { id: 'pp-ev-0503', companyId: 'pureplanet-manufacturing', type: 'environmental', source: 'ESG Report 2025', page: 24, detectedValue: 'Closed-loop water systems at 5/11 facilities', relatedClaimId: 'pp-claim-03', aiInterpretation: 'Partial rollout supports a qualified version of the claim.', riskWeight: 'medium' },
    ],
    emissions: {
      companyId: 'pureplanet-manufacturing',
      unit: 'Million tCO2e',
      history: [
        { year: 2021, scope1: 1.1, scope2: 0.7, scope3: 4.9 },
        { year: 2022, scope1: 1.05, scope2: 0.65, scope3: 5.1 },
        { year: 2023, scope1: 0.98, scope2: 0.6, scope3: 5.3 },
        { year: 2024, scope1: 0.94, scope2: 0.55, scope3: 5.6 },
        { year: 2025, scope1: 0.9, scope2: 0.5, scope3: 5.9 },
      ],
      totalCO2e: 7.3,
      yoyChangePct: 2.6,
      scope3ContributionPct: 81,
      note: 'Owned-facility emissions are declining steadily, but Scope 3 from contract manufacturers is rising and under-disclosed.',
    },
    financials: {
      companyId: 'pureplanet-manufacturing',
      claimSummary: 'Responsible manufacturing investment',
      allocation: [
        { label: 'Facility Efficiency Upgrades', value: 58, color: '#10b981' },
        { label: 'Contract Manufacturing Expansion', value: 42, color: '#d97706' },
      ],
      discrepancyLevel: 'moderate',
      finding: 'Capital is genuinely flowing into efficiency upgrades at owned sites, but growing reliance on undisclosed contract manufacturing creates a transparency gap.',
    },
    certifications: [
      { id: 'pp-cert-01', companyId: 'pureplanet-manufacturing', name: 'ISO 50001 Energy Management', verified: true, source: 'ISO Certification Registry' },
      { id: 'pp-cert-02', companyId: 'pureplanet-manufacturing', name: 'Responsible Manufacturing Mark', verified: false, source: 'Verified Certification Database', note: 'Self-issued label with no third-party registry match.', shadowLabel: true },
    ],
    benchmarks: [
      { key: 'emission-intensity', label: 'Emission Intensity', percentile: 58, goodDirection: 'lower' },
      { key: 'renewable-use', label: 'Renewable Energy Use', percentile: 50, goodDirection: 'higher' },
      { key: 'disclosure-quality', label: 'ESG Disclosure Quality', percentile: 41, goodDirection: 'higher' },
      { key: 'sustainability-investment', label: 'Sustainability Investment', percentile: 47, goodDirection: 'higher' },
    ],
    alerts: [
      { id: 'pp-alert-01', companyId: 'pureplanet-manufacturing', severity: 'warning', message: 'Insufficient evidence to verify full-ecosystem manufacturing claim', relatedClaimId: 'pp-claim-02', date: '2026-08-18', time: '11:47' },
      { id: 'pp-alert-02', companyId: 'pureplanet-manufacturing', severity: 'positive', message: 'Energy intensity reduction claim independently verified', relatedClaimId: 'pp-claim-01', date: '2026-08-17', time: '09:05' },
      { id: 'pp-alert-03', companyId: 'pureplanet-manufacturing', severity: 'warning', message: 'Responsible Manufacturing Mark could not be verified', relatedClaimId: 'pp-claim-02', date: '2026-08-16', time: '14:33' },
    ],
    recommendedActions: [
      { id: 'pp-act-01', companyId: 'pureplanet-manufacturing', text: 'Require emissions and labor audit data from contract manufacturers', done: false },
      { id: 'pp-act-02', companyId: 'pureplanet-manufacturing', text: 'Expand closed-loop water recycling to remaining 6 facilities', done: false },
      { id: 'pp-act-03', companyId: 'pureplanet-manufacturing', text: 'Qualify the "entire product ecosystem" claim until data is available', done: false },
    ],
  },
]

export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id)
}

export function getAllClaims() {
  return companies.flatMap((c) => c.claims)
}

export function getAllEvidence() {
  return companies.flatMap((c) => c.evidence)
}

export function getAllAlerts() {
  return companies
    .flatMap((c) => c.alerts)
    .sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1))
}

export function getClaimById(id: string) {
  return getAllClaims().find((c) => c.id === id)
}

export function getEvidenceById(id: string) {
  return getAllEvidence().find((e) => e.id === id)
}
