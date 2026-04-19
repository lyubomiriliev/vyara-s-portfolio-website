'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface LaserFlowProps {
  className?: string
  color?: string
  intensity?: number
}

export function LaserFlow({
  className = '',
  color = '#E040A0',
  intensity = 0.6,
}: LaserFlowProps) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '120%', opacity: [0, intensity, 0] }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: `${20 + i * 25}%`,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
            boxShadow: `0 0 24px ${color}, 0 0 48px ${color}80`,
            transform: 'skewY(-2deg)',
          }}
        />
      ))}
    </div>
  )
}
