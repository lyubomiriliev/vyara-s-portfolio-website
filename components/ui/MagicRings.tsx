'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface MagicRingsProps {
  className?: string
  size?: number
  rings?: number
  colors?: string[]
}

export function MagicRings({
  className = '',
  size = 600,
  rings = 4,
  colors = ['#E040A0', '#9B59F5', '#4A9EFF', '#FFB76C'],
}: MagicRingsProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {Array.from({ length: rings }).map((_, i) => {
        const scale = 1 - i * (0.18 / rings)
        const color = colors[i % colors.length]
        return (
          <motion.div
            key={i}
            initial={{ rotate: 0, scale }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 28 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `1px solid ${color}`,
              opacity: 0.18 - i * 0.025,
              transform: `scale(${scale})`,
              boxShadow: `0 0 80px ${color}30, inset 0 0 60px ${color}20`,
            }}
          />
        )
      })}
      {/* Pulsing core */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: size * 0.25,
          height: size * 0.25,
          marginLeft: -size * 0.125,
          marginTop: -size * 0.125,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors[0]}50 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}
