'use client'

import React from 'react'

interface SectionBackgroundProps {
  src: string
  position?: string
  size?: string
  opacity?: number
  blendMode?: React.CSSProperties['mixBlendMode']
  vignette?: boolean
  vignetteIntensity?: number
  blur?: number
}

export function SectionBackground({
  src,
  position = 'center',
  size = 'cover',
  opacity = 0.4,
  blendMode,
  vignette = true,
  vignetteIntensity = 0.85,
  blur = 0,
}: SectionBackgroundProps) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: size,
          backgroundPosition: position,
          backgroundRepeat: 'no-repeat',
          opacity,
          mixBlendMode: blendMode,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
        }}
      />
      {vignette && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 90% 60% at 50% 50%, rgba(10,10,15,0.15) 0%, rgba(10,10,15,${vignetteIntensity * 0.7}) 60%, rgba(10,10,15,${vignetteIntensity}) 100%)`,
          }}
        />
      )}
    </>
  )
}
