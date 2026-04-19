'use client'
import { useCountUp } from '@/lib/useCountUp'

interface AnimatedStatProps {
  value: number
  suffix?: string
  label: string
}

export function AnimatedStat({ value, suffix = '', label }: AnimatedStatProps) {
  const { count, ref } = useCountUp(value)
  return (
    <div
      ref={ref}
      className="glass-card flex flex-col items-center justify-center px-8 py-6 min-w-[140px]"
    >
      <span className="text-gradient-warm font-sans font-extrabold text-3xl md:text-4xl leading-none tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-white/45 text-xs mt-2 uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  )
}
