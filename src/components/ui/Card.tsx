import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hoverable?: boolean
}

export default function Card({ children, className, hoverable, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-navy-900/70 p-5 shadow-card backdrop-blur-sm transition-all duration-200',
        hoverable && 'hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-glow',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
