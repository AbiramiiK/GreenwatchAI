import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-soft hover:shadow-glow hover:from-emerald-500 hover:to-emerald-400',
  secondary: 'bg-navy-900 text-navy-100 border border-white/[0.1] hover:border-emerald-500/40 hover:bg-navy-800',
  ghost: 'text-navy-300 hover:bg-white/5 hover:text-white',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/15',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
