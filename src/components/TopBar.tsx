import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, Bell, Sparkles, Settings, ChevronDown } from 'lucide-react'
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
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const unreadAlerts = getAllAlerts().filter((a) => a.severity === 'critical').length

  const results = searchEntities(query, companies)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.06] bg-navy-975/85 px-4 py-3 backdrop-blur-md sm:px-6">
      <button
        onClick={onOpenMobileMenu}
        className="rounded-lg p-2 text-navy-400 hover:bg-white/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div ref={containerRef} className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-500" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => query && setOpen(true)}
          placeholder="Search company, sustainability claim or report..."
          className="w-full rounded-xl border border-white/10 bg-navy-900/70 py-2.5 pl-10 pr-4 text-sm text-navy-100 placeholder:text-navy-500 outline-none transition focus:border-emerald-500/50 focus:bg-navy-900 focus:ring-4 focus:ring-emerald-500/10"
        />
        {open && query && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-navy-950 p-2 shadow-lift animate-scale-in scrollbar-thin">
            {results.companies.length === 0 && results.claims.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-navy-500">No matches found for &ldquo;{query}&rdquo;.</p>
            )}
            {results.companies.length > 0 && (
              <div className="mb-1">
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-navy-500">Companies</p>
                {results.companies.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigate(`/companies/${c.id}`)
                      setOpen(false)
                      setQuery('')
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400">
                      {c.logoInitials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-navy-100">{c.name}</span>
                      <span className="block text-xs text-navy-500">{c.sector}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {results.claims.length > 0 && (
              <div>
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-navy-500">Claims</p>
                {results.claims.slice(0, 6).map(({ claim, company }) => (
                  <button
                    key={claim.id}
                    onClick={() => {
                      navigate(`/companies/${company.id}?tab=claims&claim=${claim.id}`)
                      setOpen(false)
                      setQuery('')
                    }}
                    className="flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-white/5"
                  >
                    <span className="mt-0.5 text-sm">{claimStatusMeta[claim.status].emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-navy-100">{claim.text}</span>
                      <span className="block text-xs text-navy-500">{company.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 sm:flex">
        <Sparkles className="h-3.5 w-3.5" />
        AI Engine Active
      </div>

      <button
        onClick={() => navigate('/alerts')}
        className="relative rounded-lg p-2 text-navy-400 hover:bg-white/5 hover:text-white"
        aria-label="Risk alerts"
      >
        <Bell className="h-5 w-5" />
        {unreadAlerts > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
        )}
      </button>

      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 hover:bg-white/5"
          aria-label="Account menu"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-800 text-xs font-bold text-white">
            AK
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-navy-500 sm:block" />
        </button>
        {profileOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-xl border border-white/10 bg-navy-950 p-1.5 shadow-lift animate-scale-in">
            <button
              onClick={() => {
                navigate('/settings')
                setProfileOpen(false)
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-navy-200 hover:bg-white/5 hover:text-white"
            >
              <Settings className="h-4 w-4 text-navy-500" />
              Settings
            </button>
            <div className="mx-3 my-1 border-t border-white/[0.06]" />
            <p className="px-3 py-2 text-[11px] leading-snug text-navy-500">
              This is a Round 2 prototype. All companies and evidence are sample data for demonstration.
            </p>
          </div>
        )}
      </div>
    </header>
  )
}
