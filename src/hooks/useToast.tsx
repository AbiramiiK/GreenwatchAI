import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '../utils/cn'

type ToastKind = 'success' | 'info' | 'warning'

interface ToastItem {
  id: number
  kind: ToastKind
  title: string
  message?: string
}

interface ToastContextValue {
  push: (toast: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const kindStyles: Record<ToastKind, { icon: typeof CheckCircle2; className: string }> = {
  success: { icon: CheckCircle2, className: 'border-emerald-200 bg-white text-emerald-700' },
  info: { icon: Info, className: 'border-navy-200 bg-white text-navy-700' },
  warning: { icon: AlertTriangle, className: 'border-amber-200 bg-white text-amber-700' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const push = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4200)
  }, [])

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-full max-w-sm flex-col gap-2.5">
        {toasts.map((t) => {
          const style = kindStyles[t.kind]
          const Icon = style.icon
          return (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lift animate-slide-in-right',
                style.className
              )}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">{t.title}</p>
                {t.message && <p className="mt-0.5 text-xs leading-snug text-navy-500">{t.message}</p>}
              </div>
              <button onClick={() => dismiss(t.id)} className="text-navy-400 hover:text-navy-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
