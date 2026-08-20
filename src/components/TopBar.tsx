import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, Bell, Sparkles } from 'lucide-react'
import { companies } from '../data/companies'
import { searchEntities } from '../services/mockAiService'
import { claimStatusMeta } from '../utils/format'
import { getAllAlerts } from '../data/companies'

interface TopBarProps {
  onOpenMobileMenu: () => void
}

export default function TopBar({ onOpenMobileMenu }: TopBarProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const unreadAlerts = getAllAlerts().filter((a) => a.severity === 'critical').length

  const results = searchEntities(query, companies)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-navy-100 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <button
        onClick={onOpenMobileMenu}
        className="rounded-lg p-2 text-navy-500 hover:bg-navy-50 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div ref={containerRef} className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => query && setOpen(true)}
          placeholder="Search company, sustainability claim or report..."
          className="w-full rounded-xl border border-navy-200 bg-navy-50/60 py-2.5 pl-10 pr-4 text-sm text-navy-800 placeholder:text-navy-400 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
        />
        {open && query && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-96 overflow-y-auto rounded-xl border border-navy-100 bg-white p-2 shadow-lift animate-scale-in scrollbar-thin">
            {results.companies.length === 0 && results.claims.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-navy-400">No matches found for &ldquo;{query}&rdquo;.</p>
            )}
            {results.companies.length > 0 && (
              <div className="mb-1">
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-navy-400">Companies</p>
                {results.companies.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigate(`/companies/${c.id}`)
                      setOpen(false)
                      setQuery('')
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-forest-50"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-xs font-bold text-forest-700">
                      {c.logoInitials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-navy-800">{c.name}</span>
                      <span className="block text-xs text-navy-400">{c.sector}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {results.claims.length > 0 && (
              <div>
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-navy-400">Claims</p>
                {results.claims.slice(0, 6).map(({ claim, company }) => (
                  <button
                    key={claim.id}
                    onClick={() => {
                      navigate(`/companies/${company.id}?tab=claims&claim=${claim.id}`)
                      setOpen(false)
                      setQuery('')
                    }}
                    className="flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-forest-50"
                  >
                    <span className="mt-0.5 text-sm">{claimStatusMeta[claim.status].emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-navy-800">{claim.text}</span>
                      <span className="block text-xs text-navy-400">{company.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
        <Sparkles className="h-3.5 w-3.5" />
        AI Engine Active
      </div>

      <button
        onClick={() => navigate('/alerts')}
        className="relative rounded-lg p-2 text-navy-500 hover:bg-navy-50"
        aria-label="Alerts"
      >
        <Bell className="h-5 w-5" />
        {unreadAlerts > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
        )}
      </button>

      <button
        onClick={() => navigate('/settings')}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest-600 to-navy-800 text-xs font-bold text-white"
      >
        AK
      </button>
    </header>
  )
}
