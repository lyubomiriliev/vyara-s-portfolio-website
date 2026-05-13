import { ReactNode } from 'react'

interface ButtonOutlineProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
}

export function ButtonOutline({ children, size = 'md', className = '', onClick }: ButtonOutlineProps) {
  const sizes = {
    sm: 'px-4 sm:px-5 py-2 text-xs sm:text-sm',
    md: 'px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-sm',
    lg: 'px-6 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base',
  }
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 font-display font-semibold rounded-pill whitespace-nowrap
        border border-white/40 bg-white/5 text-white
        hover:border-white/60 hover:bg-white/10
        transition-all duration-150 cursor-pointer
        ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
