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
      className="glass-card flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 min-w-[110px] sm:min-w-[130px] md:min-w-[140px]"
    >
      <span className="text-gradient-warm font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl leading-none tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-white/45 text-[10px] sm:text-xs mt-1.5 sm:mt-2 uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  )
}
