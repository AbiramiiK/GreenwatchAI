# GreenwatchAI Prototype: Code Architecture & Explanation

## Overview
GreenwatchAI is a **clickable prototype** for greenwashing detection built with React + TypeScript + Vite. It's designed to demonstrate how companies' sustainability claims connect to real evidence (financial, environmental, certification, and industry data).

**Key insight:** All data is mocked for demonstration. The architecture is built so the mock AI service can be swapped with a real LLM/NLP backend without changing the UI.

---

## Project Structure

```
src/
├── components/        # UI + feature sections
│   ├── ClaimsAnalyzer     # Sustainability claims display & analysis
│   ├── EvidenceMap        # Multi-source evidence visualization
│   ├── EmissionsChart     # Carbon data visualization
│   ├── FinancialMetrics   # ESG financial data
│   ├── CertificationBadge # Sustainability certifications
│   └── [other feature components]
│
├── pages/             # Route-level screens
│   ├── Dashboard      # Main analysis view
│   ├── ClaimsPage     # Detailed claims examination
│   ├── EvidencePage   # Evidence deep-dive
│   └── WatchlistPage  # Saved companies & claims
│
├── layouts/           # App shell
│   ├── Sidebar        # Navigation + company selector
│   └── TopBar         # Header + search
│
├── services/          # Business logic
│   └── mockAiService.ts    # **CRITICAL**: Simulated AI scoring pipeline
│
├── data/              # Mock datasets
│   ├── companies.ts         # Fake company data
│   ├── claims.ts            # Fake sustainability claims
│   ├── evidence.ts          # Fake evidence sources
│   ├── emissions.ts         # Fake carbon/ESG data
│   └── certifications.ts    # Fake cert data
│
├── types/             # TypeScript interfaces
│   ├── Company.ts
│   ├── Claim.ts
│   ├── Evidence.ts
│   └── AnalysisResult.ts
│
├── hooks/             # React custom hooks
│   ├── useToast        # Toast notifications
│   └── useWatchlist    # Watchlist state management
│
├── utils/             # Helpers
│   ├── formatting.ts   # Format numbers/dates
│   └── scoring.ts      # Greenwash scoring logic
│
└── charts/            # Recharts wrappers
    ├── GreenwashMeter  # Risk gauge visualization
    └── TimeSeriesChart # Trend visualization
```

---

## Core Architecture Patterns

### 1. **Mock AI Service (`mockAiService.ts`)**

This is the **heart** of the prototype. It simulates an AI/NLP pipeline that would normally be powered by Claude, OpenAI, or a custom ML model.

**What it does:**
```typescript
// Pseudocode structure
async function analyzeClaimWithEvidence(claim, company) {
  // Step 1: Parse the claim
  const parsedClaim = parseClaimText(claim.text);
  
  // Step 2: Search for supporting/contradicting evidence
  const relevantEvidence = findEvidenceForClaim(company, parsedClaim);
  
  // Step 3: Score credibility
  const score = calculateCredibility(
    evidence.strength,
    evidence.recency,
    evidence.consistency
  );
  
  // Step 4: Return structured result with justification
  return {
    claimId: claim.id,
    credibilityScore: 0-100,
    isGreenwashing: score < threshold,
    evidence: relevantEvidence,
    reasoning: "Why we think this is greenwashing..."
  };
}
```

**Why this matters:** The mock service uses **deterministic logic** (not real AI yet) so it's reproducible. When you replace it with a real LLM, the UI doesn't change—only the `mockAiService.ts` file gets swapped.

---

### 2. **Data Flow: UI ↔ Service ↔ Data**

**User clicks on a claim:**
```
ClaimsComponent (UI)
    ↓
    useEffect(() => {
      const result = await mockAiService.analyzeClaimWithEvidence(claim);
      setAnalysisResult(result);  // Update UI
    })
    ↓
mockAiService.ts (Business Logic)
    ↓
    • Queries data/evidence.ts
    • Queries data/emissions.ts
    • Runs scoring algorithm
    ↓
Returns: { credibilityScore, isGreenwashing, evidence, reasoning }
    ↓
Component re-renders with analysis
```

---

### 3. **Component Layers**

#### **Presentational Components** (dumb)
These only receive props and render. No business logic.

```typescript
// Example: CredibilityBadge.tsx
interface CredibilityBadgeProps {
  score: number;           // 0-100
  isGreenwashing: boolean;
}

export function CredibilityBadge({ score, isGreenwashing }: CredibilityBadgeProps) {
  const color = isGreenwashing ? "red" : "green";
  return <div className={`badge badge-${color}`}>{score}%</div>;
}
```

#### **Container Components** (smart)
These fetch data, call services, and pass down props.

```typescript
// Example: ClaimsAnalyzer.tsx
export function ClaimsAnalyzer({ companyId }: Props) {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeClaim = async (claim: Claim) => {
    setLoading(true);
    try {
      const result = await mockAiService.analyzeClaimWithEvidence(claim);
      setAnalysisResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ClaimsList claims={claims} onSelectClaim={handleAnalyzeClaim} />
      {analysisResult && <CredibilityBadge {...analysisResult} />}
      {analysisResult && <EvidenceDisplay evidence={analysisResult.evidence} />}
    </div>
  );
}
```

---

### 4. **State Management (Lightweight)**

Uses **React Context + Hooks** (not Redux, keeping it simple for a prototype):

```typescript
// useWatchlist.ts
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Claim[]>([]);
  
  const addToWatchlist = (claim: Claim) => {
    setWatchlist(prev => [...prev, claim]);
  };
  
  const removeFromWatchlist = (claimId: string) => {
    setWatchlist(prev => prev.filter(c => c.id !== claimId));
  };
  
  return { watchlist, addToWatchlist, removeFromWatchlist };
}
```

---

## Key Data Types

```typescript
// types/Company.ts
interface Company {
  id: string;
  name: string;
  industry: string;
  revenue: number;
  employees: number;
  sustainability_claims: Claim[];
  financials: FinancialMetrics;
  certifications: Certification[];
}

// types/Claim.ts
interface Claim {
  id: string;
  companyId: string;
  text: string;                    // "We reduced emissions by 50%"
  datePublished: Date;
  source: "press_release" | "esg_report" | "website";
  category: "emissions" | "renewable_energy" | "waste" | "water";
}

// types/AnalysisResult.ts
interface AnalysisResult {
  claimId: string;
  credibilityScore: number;        // 0-100 (100 = fully supported)
  isGreenwashing: boolean;
  supportingEvidence: Evidence[];
  contradictingEvidence: Evidence[];
  reasoning: string;               // Explanation from mock AI
}

// types/Evidence.ts
interface Evidence {
  id: string;
  type: "financial" | "environmental" | "certification" | "industry_report";
  title: string;
  summary: string;
  strength: "strong" | "moderate" | "weak";
  source: string;
  date: Date;
  alignsWithClaim: boolean;
}
```

---

## Feature Walkthrough: "Analyze a Claim"

### **Scenario:** User selects Nike's claim: "We reduced carbon emissions by 40% since 2015"

**Step-by-step execution:**

1. **UI Triggered**
   - User clicks claim card in `ClaimsAnalyzer` component
   - `handleAnalyzeClaim(claim)` fires

2. **Mock AI Service Called**
   ```typescript
   const result = await mockAiService.analyzeClaimWithEvidence(claim);
   ```

3. **Service Logic** (inside `mockAiService.ts`)
   - Parse claim: Extract keywords → ["carbon emissions", "40%", "2015"]
   - Search evidence:
     - ✅ Find matching emissions data in `emissions.ts`
     - ✅ Find financial reports in `data/financials.ts`
     - ✅ Find certifications in `data/certifications.ts`
   - Score credibility:
     - Emissions data supports claim: +30 points
     - Financial trend shows investment in renewables: +20 points
     - Third-party certification exists: +10 points
     - **Total: 60/100** → Moderately credible
   - Generate reasoning:
     ```
     "Nike's 40% emissions reduction claim is supported by verified 
     emissions data and third-party audits. However, the baseline year 
     calculation may be misleading (cherry-picked). Their Scope 3 
     emissions (supply chain) show smaller improvements."
     ```

4. **UI Updates**
   - `CredibilityBadge` shows 60/100 with yellow indicator
   - `EvidenceDisplay` shows supporting/contradicting evidence cards
   - `GreenwashMeter` needle moves to 60
   - `Toast` notification: "Analysis complete"

---

## Routing with React Router

```typescript
// App.tsx or main routing setup
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="company/:id" element={<CompanyDetail />} />
      <Route path="claims" element={<ClaimsPage />} />
      <Route path="evidence" element={<EvidencePage />} />
      <Route path="watchlist" element={<WatchlistPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

---

## Styling with Tailwind CSS

All components use **Tailwind utility classes** for consistency:

```tsx
// Example: EmissionsChart component
<div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-red-500">
  <h3 className="text-lg font-bold text-gray-800 mb-4">
    Emissions Trend
  </h3>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={emissionData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="emissions" stroke="#ef4444" />
    </LineChart>
  </ResponsiveContainer>
</div>
```

---

## How to Transition from Mock to Real Backend

The architecture is **backend-agnostic**. Here's how to plug in a real LLM:

### **Before (Mock)**
```typescript
// src/services/mockAiService.ts
export async function analyzeClaimWithEvidence(claim: Claim): Promise<AnalysisResult> {
  // ... deterministic scoring logic
  return { credibilityScore: 65, isGreenwashing: true, ... };
}
```

### **After (Real LLM)**
```typescript
// src/services/realAiService.ts (swap this file)
import Anthropic from "@anthropic-sdk/sdk";

const client = new Anthropic();

export async function analyzeClaimWithEvidence(claim: Claim): Promise<AnalysisResult> {
  // Fetch real evidence first (from your DB/API)
  const evidenceContext = await fetchEvidenceForClaim(claim);
  
  // Use Claude to analyze
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1000,
    system: `You are a greenwashing detection expert. Analyze sustainability 
             claims against evidence. Return JSON with credibilityScore (0-100), 
             isGreenwashing (boolean), and reasoning.`,
    messages: [
      {
        role: "user",
        content: `Claim: "${claim.text}"\n\nEvidence:\n${evidenceContext}`,
      }
    ]
  });
  
  // Parse response and return
  const result = JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '');
  return result;
}
```

**UI doesn't change.** The import in `ClaimsAnalyzer` just changes:
```typescript
// Old
import { analyzeClaimWithEvidence } from '../services/mockAiService';

// New
import { analyzeClaimWithEvidence } from '../services/realAiService';
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",           // Routing
    "recharts": "^2.x",                    // Charts (emissions, trends)
    "lucide-react": "^x.x",                // Icons
    "tailwindcss": "^3.x"                  // Styling
  },
  "devDependencies": {
    "vite": "^5.x",                        // Build tool (fast!)
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@typescript-eslint/eslint-plugin": "^x.x"
  }
}
```

---

## Testing Strategy (For Real Backend Swap)

When you move to a real LLM, you'll want to test:

```typescript
// __tests__/services/realAiService.test.ts

import { analyzeClaimWithEvidence } from '../../src/services/realAiService';

describe('Real AI Service', () => {
  it('should analyze a real sustainability claim', async () => {
    const claim: Claim = {
      id: '1',
      text: 'We reduced water usage by 30%',
      category: 'water',
      // ...
    };
    
    const result = await analyzeClaimWithEvidence(claim);
    
    expect(result.credibilityScore).toBeGreaterThanOrEqual(0);
    expect(result.credibilityScore).toBeLessThanOrEqual(100);
    expect(typeof result.isGreenwashing).toBe('boolean');
    expect(result.reasoning).toBeDefined();
  });
});
```

---

## Performance Considerations

1. **Async calls are lazy** — Only analyze when user clicks (don't pre-analyze all claims)
2. **Evidence data is paginated** — Don't load 10k evidence items upfront
3. **Charts re-render only on data change** — React.memo on chart components
4. **Tailwind CSS is tree-shaken** — Unused styles don't ship

---

## Deployment (Vercel)

The app is deployed on Vercel because:
- ✅ Zero-config Next.js/React deployment
- ✅ Edge functions (when real backend is added)
- ✅ Built-in CI/CD with GitHub integration
- ✅ Auto-preview on PRs

```bash
npm run build  # Vite builds to /dist
npm run preview  # Test production build locally
# Push to GitHub → Vercel auto-deploys
```

---

## Summary: The Prototype Advantage

| Aspect | Prototype Value |
|--------|-----------------|
| **Quick iteration** | Mock data = no backend setup needed |
| **Stakeholder feedback** | Clickable demo is concrete, not abstract |
| **Architecture clarity** | Mock → Real swap is obvious and clean |
| **Production-ready** | Stack (React/TS/Vite/Tailwind) is production-grade |
| **Learning tool** | Shows how to structure an AI app |

The genius is that this prototype **is not a throwaway**. It's a skeleton for the real product. Replace `mockAiService.ts`, swap the data sources, and you have a production greenwashing detector.
