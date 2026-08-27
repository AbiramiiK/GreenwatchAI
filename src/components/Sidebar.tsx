import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  ScanSearch,
  FileBarChart,
  Bell,
  GitCompare,
  Eye,
  BookOpen,
  Info,
  Leaf,
  X,
} from 'lucide-react'
import { cn } from '../utils/cn'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/investigate', label: 'Truth Investigation', icon: ScanSearch, emphasized: true },
  { to: '/companies', label: 'Companies', icon: Building2 },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/alerts', label: 'Risk Alerts', icon: Bell },
  { to: '/compare', label: 'Compare', icon: GitCompare },
  { to: '/watchlist', label: 'Watchlist', icon: Eye },
]

const secondaryItems = [
  { to: '/how-it-works', label: 'How It Works', icon: BookOpen },
  { to: '/about', label: 'About', icon: Info },
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.06] bg-navy-950 text-navy-100 transition-transform duration-300 lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-lift">
              <Leaf className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-tight text-white">GREENWATCH</p>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-400">AI</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-navy-300 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {navItems.map(({ to, label, icon: Icon, emphasized }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  emphasized && !isActive && 'border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-200',
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/25 to-emerald-500/5 text-white shadow-[inset_0_0_0_1px_rgba(16,185,129,0.4)]'
                    : !emphasized && 'text-navy-300 hover:bg-white/5 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'h-[18px] w-[18px] shrink-0 transition-colors',
                      isActive || emphasized ? 'text-emerald-400' : 'text-navy-400 group-hover:text-emerald-400'
                    )}
                  />
                  <span className={cn(emphasized && 'font-semibold')}>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="my-3 border-t border-white/[0.06]" />

          {secondaryItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-white/[0.06] text-white'
                    : 'text-navy-400 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0 text-navy-500 group-hover:text-emerald-400" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/[0.06] px-6 py-5">
          <p className="text-xs font-medium italic leading-snug text-navy-500">
            &ldquo;Don&apos;t just trust green. Verify it.&rdquo;
          </p>
        </div>
      </aside>
    </>
  )
}
