'use client'

import React from 'react'

interface BorderGlowProps {
  children: React.ReactNode
  className?: string
  color?: string
  radius?: number
  intensity?: number
  speed?: number
}

export function BorderGlow({
  children,
  className = '',
  color = '#9B59F5',
  radius = 20,
  intensity = 0.85,
  speed = 8,
}: BorderGlowProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius: radius,
        padding: 1,
        background: `conic-gradient(from var(--bg-angle, 0deg), transparent 0%, ${color} 25%, transparent 50%, ${color} 75%, transparent 100%)`,
        animation: `borderGlowSpin ${speed}s linear infinite`,
        opacity: intensity,
        isolation: 'isolate',
      }}
    >
      <div
        style={{
          borderRadius: radius - 1,
          background: 'rgba(15,15,22,0.92)',
          backdropFilter: 'blur(18px)',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
      <style jsx>{`
        @property --bg-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes borderGlowSpin {
          to { --bg-angle: 360deg; }
        }
      `}</style>
    </div>
  )
}
