import { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-2 ${className}`}
      style={{ color: '#E040A0' }}
    >
      {children}
    </span>
  )
}
