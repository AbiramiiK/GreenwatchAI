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
        'rounded-2xl border border-navy-100 bg-white p-5 shadow-soft transition-all duration-200',
        hoverable && 'hover:-translate-y-0.5 hover:shadow-lift hover:border-emerald-200',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
