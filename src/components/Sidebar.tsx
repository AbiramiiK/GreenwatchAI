import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  ScanSearch,
  Eye,
  FileText,
  FileSearch,
  Cloud,
  Wallet,
  BadgeCheck,
  BarChart3,
  Bell,
  FileBarChart,
  Settings,
  Leaf,
  X,
} from 'lucide-react'
import { cn } from '../utils/cn'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/companies', label: 'Companies', icon: Building2 },
  { to: '/new-analysis', label: 'New Analysis', icon: ScanSearch },
  { to: '/watchlist', label: 'Watchlist', icon: Eye },
  { to: '/claims', label: 'Claims', icon: FileText },
  { to: '/evidence', label: 'Evidence', icon: FileSearch },
  { to: '/emissions', label: 'Emissions', icon: Cloud },
  { to: '/financials', label: 'Financials', icon: Wallet },
  { to: '/certifications', label: 'Certifications', icon: BadgeCheck },
  { to: '/benchmarks', label: 'Benchmarks', icon: BarChart3 },
  { to: '/alerts', label: 'Alerts', icon: Bell },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/settings', label: 'Settings', icon: Settings },
]

interface SidebarProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy-950 text-navy-100 transition-transform duration-300 lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-forest-600 shadow-lift">
              <Leaf className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-tight text-white">GREENWATCH</p>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-400">AI</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-navy-300 hover:bg-navy-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-white shadow-[inset_0_0_0_1px_rgba(16,185,129,0.35)]'
                    : 'text-navy-300 hover:bg-navy-900 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'h-[18px] w-[18px] shrink-0 transition-colors',
                      isActive ? 'text-emerald-400' : 'text-navy-400 group-hover:text-emerald-400'
                    )}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-navy-800 px-6 py-5">
          <p className="text-xs font-medium italic leading-snug text-navy-400">
            &ldquo;Verify the Claim. Reveal the Reality.&rdquo;
          </p>
        </div>
      </aside>
    </>
  )
}
