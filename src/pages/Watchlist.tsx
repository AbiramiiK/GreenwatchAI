import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import { RiskBadge } from '../components/ui/StatusBadge'
import { companies } from '../data/companies'
import { useWatchlist } from '../hooks/useWatchlist'

export default function Watchlist() {
  const navigate = useNavigate()
  const { ids, toggle } = useWatchlist()
  const watched = companies.filter((c) => ids.includes(c.id))

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Monitoring"
        title="Watchlist"
        subtitle="Companies you're tracking closely for new evidence, contradictions, or certification changes."
      />

      {watched.length === 0 ? (
        <EmptyState
          icon={Eye}
          title="Your watchlist is empty"
          description="Add companies from the Companies page or a company analysis screen to monitor them here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {watched.map((c) => (
            <Card key={c.id} hoverable className="relative">
              <button
                onClick={() => toggle(c.id)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-navy-500 hover:bg-navy-800 hover:text-red-400"
                aria-label="Remove from watchlist"
                title="Remove from watchlist"
              >
                <EyeOff className="h-4 w-4" />
              </button>
              <div onClick={() => navigate(`/companies/${c.id}`)} className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-bold text-emerald-400">
                    {c.logoInitials}
                  </span>
                  <div className="min-w-0 pr-6">
                    <p className="truncate font-bold text-white">{c.name}</p>
                    <p className="text-xs text-navy-500">{c.sector}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <RiskBadge level={c.riskLevel} />
                  <span className="text-lg font-extrabold text-white">
                    {c.riskScore}
                    <span className="text-xs font-medium text-navy-500">/100</span>
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
