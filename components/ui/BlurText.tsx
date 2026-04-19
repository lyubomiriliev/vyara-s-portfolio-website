'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  animate?: 'inView' | 'always'
  /** Optional CSS background to apply as a text gradient on each word. */
  gradient?: string
}

export function BlurText({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  as: Tag = 'span',
  animate = 'inView',
  gradient,
}: BlurTextProps) {
  const words = text.split(' ')
  const MotionTag = motion[Tag] as typeof motion.span

  const wordGradientStyle: React.CSSProperties | undefined = gradient
    ? {
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : undefined

  return (
    <MotionTag
      initial="hidden"
      whileInView={animate === 'inView' ? 'visible' : undefined}
      animate={animate === 'always' ? 'visible' : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            willChange: 'filter, transform',
            ...wordGradientStyle,
          }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}
