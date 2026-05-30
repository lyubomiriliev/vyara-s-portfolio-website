import { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-2 ${className}`}
      style={{
        background: 'rgba(224,64,160,0.08)',
        border: '1px solid rgba(224,64,160,0.22)',
        color: '#E040A0',
      }}
    >
      {children}
    </span>
  )
}
