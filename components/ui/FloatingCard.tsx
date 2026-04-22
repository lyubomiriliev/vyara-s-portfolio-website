'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function FloatingCard({
  icon,
  label,
  value,
  detail,
  accent,
  delay,
  floatDir = 'down',
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
  accent: string
  delay: number
  floatDir?: 'up' | 'down'
  href: string
}) {
  const yKeyframes = floatDir === 'up' ? [0, 10, 0] : [0, -12, 0]
  return (
    <Link href={href} className="block group/card">
      <div className="relative">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}
          style={{
            background: `radial-gradient(ellipse, ${accent}50 0%, transparent 70%)`,
            filter: 'blur(24px)',
            transform: 'scale(1.7)',
          }}
        />
        <motion.div
          animate={{ y: yKeyframes }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay }}
          className="relative px-5 py-4 rounded-2xl min-w-[180px]"
          style={{
            background: 'linear-gradient(160deg, rgba(22,22,34,0.88), rgba(10,10,16,0.94))',
            backdropFilter: 'blur(24px) saturate(180%)',
            border: `1px solid ${accent}35`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.45), 0 0 28px ${accent}20, inset 0 1px 0 rgba(255,255,255,0.07)`,
            transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          }}
        >
          <div className="flex items-center gap-2 text-white/50 text-[11px] mb-2 uppercase tracking-wider">
            <span style={{ color: accent }}>{icon}</span>
            {label}
          </div>
          <div className="font-display font-bold text-xl mb-1" style={{ color: accent }}>
            {value}
          </div>
          <div className="text-white/35 text-[11px] flex items-center gap-1">
            {detail}
            <ArrowUpRight
              size={10}
              className="opacity-0 group-hover/card:opacity-60 transition-opacity"
              style={{ color: accent }}
            />
          </div>
          <div
            aria-hidden
            className="absolute bottom-0 left-4 right-4 h-px opacity-40 group-hover/card:opacity-80 transition-opacity"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />
        </motion.div>
      </div>
    </Link>
  )
}
