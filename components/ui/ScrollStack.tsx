'use client'

import React, { useCallback, useEffect, useRef } from 'react'

export interface ScrollStackItemProps {
  children: React.ReactNode
  itemClassName?: string
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

interface ScrollStackProps {
  className?: string
  children: React.ReactNode
  /** Distance between cards (px) before they start stacking */
  itemDistance?: number
  /** Scale increment added per card index */
  itemScale?: number
  /** Vertical offset added per stacked card (px) */
  itemStackDistance?: number
  /** Where in the viewport cards pin (e.g. "20%") */
  stackPosition?: string
  /** Where the scale animation ends (e.g. "10%") */
  scaleEndPosition?: string
  /** Base scale for the first card */
  baseScale?: number
  /** Optional rotation per card (deg) */
  rotationAmount?: number
  /** Optional blur per stacked card (px) */
  blurAmount?: number
  /** Extra px below the last card before cards unpin (default 0) */
  releaseDistance?: number
  onStackComplete?: () => void
}

/**
 * Window-scroll variant of the React Bits ScrollStack.
 * Cards pin into a stacked deck as the page scrolls past them.
 */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  releaseDistance = 0,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const endRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const stackCompletedRef = useRef(false)
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>())
  const smoothedRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>())
  const tickingRef = useRef(false)

  const calcProgress = (scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }

  const parsePct = (value: string, containerHeight: number) => {
    if (value.includes('%')) return (parseFloat(value) / 100) * containerHeight
    return parseFloat(value)
  }

  const update = useCallback(() => {
    if (!cardsRef.current.length) return false

    const scrollTop = window.scrollY
    const viewportH = window.innerHeight
    const stackPx = parsePct(stackPosition, viewportH)
    const scaleEndPx = parsePct(scaleEndPosition, viewportH)

    const endTop = endRef.current
      ? endRef.current.getBoundingClientRect().top + window.scrollY - releaseDistance
      : 0

    // Smoothing factor — higher = snappier, lower = more glide.
    const LERP = 0.18
    let stillAnimating = false

    cardsRef.current.forEach((card, i) => {
      const cardTop = card.getBoundingClientRect().top + window.scrollY - (lastTransformsRef.current.get(i)?.translateY ?? 0)
      const triggerStart = cardTop - stackPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPx
      const pinStart = cardTop - stackPx - itemStackDistance * i
      const pinEnd = endTop - viewportH / 2

      const scaleProgress = calcProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jPin = cardsRef.current[j].getBoundingClientRect().top + window.scrollY - (lastTransformsRef.current.get(j)?.translateY ?? 0) - stackPx - itemStackDistance * j
          if (scrollTop >= jPin) topCardIndex = j
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount)
        }
      }

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i
      }

      const target = { translateY, scale, rotation, blur }
      const prev = smoothedRef.current.get(i) ?? target
      const smoothed = {
        translateY: prev.translateY + (target.translateY - prev.translateY) * LERP,
        scale: prev.scale + (target.scale - prev.scale) * LERP,
        rotation: prev.rotation + (target.rotation - prev.rotation) * LERP,
        blur: prev.blur + (target.blur - prev.blur) * LERP,
      }

      if (
        Math.abs(smoothed.translateY - target.translateY) > 0.05 ||
        Math.abs(smoothed.scale - target.scale) > 0.0005 ||
        Math.abs(smoothed.rotation - target.rotation) > 0.05 ||
        Math.abs(smoothed.blur - target.blur) > 0.05
      ) {
        stillAnimating = true
      }
      smoothedRef.current.set(i, smoothed)

      const next = {
        translateY: Math.round(smoothed.translateY * 100) / 100,
        scale: Math.round(smoothed.scale * 1000) / 1000,
        rotation: Math.round(smoothed.rotation * 100) / 100,
        blur: Math.round(smoothed.blur * 100) / 100,
      }

      const last = lastTransformsRef.current.get(i)
      const changed =
        !last ||
        Math.abs(last.translateY - next.translateY) > 0.05 ||
        Math.abs(last.scale - next.scale) > 0.0005 ||
        Math.abs(last.rotation - next.rotation) > 0.05 ||
        Math.abs(last.blur - next.blur) > 0.05

      if (changed) {
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale}) rotate(${next.rotation}deg)`
        card.style.filter = next.blur > 0 ? `blur(${next.blur}px)` : ''
        lastTransformsRef.current.set(i, next)
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })
    return stillAnimating
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    releaseDistance,
    onStackComplete,
  ])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(
      container.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[]

    cardsRef.current = cards

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translateZ(0)'
      card.style.perspective = '1000px'
    })

    const tick = () => {
      const stillAnimating = update()
      if (stillAnimating) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        tickingRef.current = false
        rafRef.current = null
      }
    }

    const requestTick = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      rafRef.current = requestAnimationFrame(tick)
    }

    update()
    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick, { passive: true })

    const transformsCache = lastTransformsRef.current
    const smoothedCache = smoothedRef.current

    return () => {
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      tickingRef.current = false
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
      smoothedCache.clear()
    }
  }, [update, itemDistance])

  return (
    <div ref={containerRef} className={`scroll-stack-window ${className}`.trim()}>
      {children}
      <div ref={endRef} className="scroll-stack-end" style={{ width: '100%', height: releaseDistance > 0 ? releaseDistance + 1 : 1 }} />
    </div>
  )
}

export default ScrollStack
