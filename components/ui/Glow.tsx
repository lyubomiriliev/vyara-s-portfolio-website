interface GlowProps {
  color?: 'pink' | 'orange'
  size?: number
  className?: string
}

export function Glow({ color = 'pink', size = 400, className = '' }: GlowProps) {
  const colors = {
    pink:   'rgba(255,65,157,0.18)',
    orange: 'rgba(255,183,108,0.18)',
  }
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse-glow ${className}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${colors[color]}, transparent 70%)` }}
    />
  )
}
