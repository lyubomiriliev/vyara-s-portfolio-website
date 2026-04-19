import { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span className={`inline-block text-xs font-display font-semibold uppercase tracking-[0.2em] text-accent-pink mb-2 ${className}`}>
      {children}
    </span>
  )
}
