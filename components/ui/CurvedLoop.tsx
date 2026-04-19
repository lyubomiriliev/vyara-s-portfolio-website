'use client'

import React from 'react'

interface CurvedLoopProps {
  text: string
  className?: string
  speed?: number
  fontSize?: number
  color?: string
}

export function CurvedLoop({
  text,
  className = '',
  speed = 30,
  fontSize = 48,
  color = 'rgba(255,255,255,0.7)',
}: CurvedLoopProps) {
  const repeated = `${text}  •  ${text}  •  ${text}  •  `
  const id = React.useId()

  return (
    <div className={`w-full ${className}`} aria-hidden>
      <svg viewBox="0 0 1200 200" className="w-full h-auto" preserveAspectRatio="none">
        <defs>
          <path id={id} d="M 0 130 Q 300 30 600 130 T 1200 130" fill="none" />
        </defs>
        <text fill={color} fontSize={fontSize} fontFamily="var(--font-display)" fontWeight={700}>
          <textPath href={`#${id}`} startOffset="0">
            {repeated}
            <animate
              attributeName="startOffset"
              from="0%"
              to="-50%"
              dur={`${speed}s`}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  )
}
