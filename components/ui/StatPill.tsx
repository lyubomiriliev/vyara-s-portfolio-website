interface StatPillProps {
  value: string
  label: string
  className?: string
}

export function StatPill({ value, label, className = '' }: StatPillProps) {
  return (
    <div className={`glass-card px-5 py-3 inline-flex flex-col items-center ${className}`}>
      <span className="text-gradient font-display font-extrabold text-2xl leading-none">{value}</span>
      <span className="text-white/50 text-xs mt-1">{label}</span>
    </div>
  )
}
