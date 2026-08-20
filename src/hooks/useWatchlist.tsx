import { createContext, useContext, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'greenwatch-watchlist'

function loadInitial(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore malformed storage
  }
  return ['eco-future-industries', 'urbanearth-mobility']
}

interface WatchlistContextValue {
  ids: string[]
  isWatched: (id: string) => boolean
  toggle: (id: string) => void
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(loadInitial)

  const toggle = (id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore storage errors
      }
      return next
    })
  }

  return (
    <WatchlistContext.Provider value={{ ids, isWatched: (id) => ids.includes(id), toggle }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider')
  return ctx
}
