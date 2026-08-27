import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './hooks/useToast'
import { WatchlistProvider } from './hooks/useWatchlist'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Companies from './pages/Companies'
import Watchlist from './pages/Watchlist'
import NewAnalysis from './pages/NewAnalysis'
import TruthInvestigation from './pages/TruthInvestigation'
import Compare from './pages/Compare'
import CompanyAnalysis from './pages/CompanyAnalysis'
import ClaimsPage from './pages/ClaimsPage'
import EvidencePage from './pages/EvidencePage'
import EmissionsPage from './pages/EmissionsPage'
import FinancialsPage from './pages/FinancialsPage'
import CertificationsPage from './pages/CertificationsPage'
import BenchmarksPage from './pages/BenchmarksPage'
import AlertsPage from './pages/AlertsPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ToastProvider>
      <WatchlistProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:companyId" element={<CompanyAnalysis />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/investigate" element={<TruthInvestigation />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/new-analysis" element={<NewAnalysis />} />
            <Route path="/claims" element={<ClaimsPage />} />
            <Route path="/evidence" element={<EvidencePage />} />
            <Route path="/emissions" element={<EmissionsPage />} />
            <Route path="/financials" element={<FinancialsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/benchmarks" element={<BenchmarksPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/:companyId" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </WatchlistProvider>
    </ToastProvider>
  )
}
