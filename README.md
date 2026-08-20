# GREENWATCH AI

**Don't Just Trust Green. Verify It.**

AI-powered greenwashing detection and sustainability verification platform. A clickable prototype built for a Project Innovation Challenge demonstration.

GREENWATCH AI connects sustainability claims with financial, environmental, certification and industry evidence to reveal whether a claim is actually supported — not merely whether it sounds green.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/   # shared UI + feature sections (claims, evidence map, emissions, ...)
├── pages/        # route-level screens
├── layouts/       # app shell (sidebar + topbar)
├── data/         # mock company/platform data
├── services/     # simulated AI scoring & analysis pipeline
├── types/        # shared TypeScript interfaces
├── hooks/        # toast + watchlist state
├── utils/        # formatting helpers
└── charts/       # recharts wrappers
```

## Prototype Notice

All company data, sustainability claims, evidence, and AI analysis in this application are simulated using mock data for demonstration purposes. They do not represent real findings about the named companies. The mock AI service (`src/services/mockAiService.ts`) is structured so its scoring and pipeline logic can be replaced by a real LLM/NLP backend without changing the UI layer, and each mock data domain (emissions, financials, certifications) is designed to be swapped for a real data API independently.
