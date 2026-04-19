'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

// headStart: ms before the card's reveal animation ends to begin counting
export function useCountUp(target: number, duration = 2200, headStart = 500) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    // Begin counting `headStart` ms into the future duration so when the card
    // becomes visible the number is already partway through its animation.
    const startTime = Date.now() - headStart
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(easeOutQuart(progress) * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration, headStart])

  return { count, ref }
}
