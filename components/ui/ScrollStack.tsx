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
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  stackPositionStep?: number
  scaleEndPosition?: string
  baseScale?: number
  rotationAmount?: number
  blurAmount?: number
  releaseDistance?: number
  onStackComplete?: () => void
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  stackPositionStep = 0,
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
  const tickingRef = useRef(false)
  const stackCompletedRef = useRef(false)

  // Cached natural top positions (without any transform applied) — measured once on mount/resize
  const cardNaturalTopsRef = useRef<number[]>([])
  const endNaturalTopRef = useRef<number>(0)

  // Current smoothed values per card
  const smoothedRef = useRef(new Map<number, { scale: number; rotation: number; blur: number }>())
  // Last written values — skip DOM write if unchanged
  const lastWrittenRef = useRef(new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>())

  const parsePct = (value: string, containerHeight: number) => {
    if (value.includes('%')) return (parseFloat(value) / 100) * containerHeight
    return parseFloat(value)
  }

  const calcProgress = (scrollTop: number, start: number, end: number) => {
    if (scrollTop <= start) return 0
    if (scrollTop >= end) return 1
    return (scrollTop - start) / (end - start)
  }

  // Measure and cache natural (un-transformed) card positions
  const measureCards = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    // Temporarily strip transforms so we measure natural layout positions
    const savedTransforms = cards.map(c => c.style.transform)
    cards.forEach(c => { c.style.transform = 'none' })

    // Force a layout read
    cardNaturalTopsRef.current = cards.map(
      c => c.getBoundingClientRect().top + window.scrollY
    )
    endNaturalTopRef.current = endRef.current
      ? endRef.current.getBoundingClientRect().top + window.scrollY
      : 0

    // Restore transforms
    cards.forEach((c, i) => { c.style.transform = savedTransforms[i] })
  }, [])

  const update = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length || !cardNaturalTopsRef.current.length) return false

    const scrollTop = window.scrollY
    const viewportH = window.innerHeight
    const baseStackPx = parsePct(stackPosition, viewportH)
    const scaleEndPx = parsePct(scaleEndPosition, viewportH)
    const endTop = endNaturalTopRef.current - releaseDistance

    // LERP only for scale/blur/rotation — translateY is computed analytically
    const LERP = 0.14
    let stillAnimating = false

    // First pass: determine which card is currently "on top" (for blur)
    let topCardIndex = 0
    if (blurAmount) {
      for (let j = 0; j < cards.length; j++) {
        const jStackPx = baseStackPx - (j * stackPositionStep * viewportH) / 100
        const jPinStart = cardNaturalTopsRef.current[j] - jStackPx - itemStackDistance * j
        if (scrollTop >= jPinStart) topCardIndex = j
      }
    }

    cards.forEach((card, i) => {
      const cardNaturalTop = cardNaturalTopsRef.current[i]
      const stackPx = baseStackPx - (i * stackPositionStep * viewportH) / 100
      const pinStart = cardNaturalTop - stackPx - itemStackDistance * i
      const pinEnd = endTop - viewportH / 2

      // --- translateY: purely analytical, no LERP (tracks scroll exactly) ---
      let translateY = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardNaturalTop + stackPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardNaturalTop + stackPx + itemStackDistance * i
      }

      // --- scale: LERP for a soft ease-in feel ---
      const triggerStart = pinStart
      const triggerEnd = cardNaturalTop - scaleEndPx
      const scaleProgress = calcProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scaleTarget = 1 - scaleProgress * (1 - targetScale)

      // --- rotation ---
      const rotationTarget = rotationAmount ? i * rotationAmount * scaleProgress : 0

      // --- blur ---
      const blurTarget = blurAmount && i < topCardIndex
        ? Math.max(0, (topCardIndex - i) * blurAmount)
        : 0

      const prev = smoothedRef.current.get(i) ?? { scale: scaleTarget, rotation: rotationTarget, blur: blurTarget }
      const smoothed = {
        scale: prev.scale + (scaleTarget - prev.scale) * LERP,
        rotation: prev.rotation + (rotationTarget - prev.rotation) * LERP,
        blur: prev.blur + (blurTarget - prev.blur) * LERP,
      }

      if (
        Math.abs(smoothed.scale - scaleTarget) > 0.0003 ||
        Math.abs(smoothed.rotation - rotationTarget) > 0.02 ||
        Math.abs(smoothed.blur - blurTarget) > 0.05
      ) {
        stillAnimating = true
      }
      smoothedRef.current.set(i, smoothed)

      // Round to avoid sub-pixel thrashing
      const nextTranslateY = Math.round(translateY * 10) / 10
      const nextScale = Math.round(smoothed.scale * 10000) / 10000
      const nextRotation = Math.round(smoothed.rotation * 100) / 100
      const nextBlur = Math.round(smoothed.blur * 10) / 10

      const last = lastWrittenRef.current.get(i)
      const changed =
        !last ||
        last.translateY !== nextTranslateY ||
        Math.abs(last.scale - nextScale) > 0.0003 ||
        last.rotation !== nextRotation ||
        last.blur !== nextBlur

      if (changed) {
        card.style.transform = `translate3d(0, ${nextTranslateY}px, 0) scale(${nextScale})${nextRotation !== 0 ? ` rotate(${nextRotation}deg)` : ''}`
        card.style.filter = nextBlur > 0 ? `blur(${nextBlur}px)` : ''
        lastWrittenRef.current.set(i, { translateY: nextTranslateY, scale: nextScale, rotation: nextRotation, blur: nextBlur })
      }

      if (i === cards.length - 1) {
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
    stackPositionStep,
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
      container.querySelectorAll<HTMLElement>('.scroll-stack-card')
    )
    cardsRef.current = cards

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      // Promote to compositor layer immediately
      card.style.transform = 'translate3d(0,0,0)'
    })

    // Measure after a paint so layout is settled
    const measureTimer = setTimeout(() => {
      measureCards()
      update()
    }, 50)

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

    const handleResize = () => {
      measureCards()
      requestTick()
    }

    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    const smoothed = smoothedRef.current
    const lastWritten = lastWrittenRef.current
    return () => {
      clearTimeout(measureTimer)
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      tickingRef.current = false
      stackCompletedRef.current = false
      cardsRef.current = []
      smoothed.clear()
      lastWritten.clear()
      cardNaturalTopsRef.current = []
    }
  }, [update, measureCards, itemDistance])

  return (
    <div ref={containerRef} className={`scroll-stack-window ${className}`.trim()}>
      {children}
      <div
        ref={endRef}
        className="scroll-stack-end"
        style={{ width: '100%', height: releaseDistance > 0 ? releaseDistance + 1 : 1 }}
      />
    </div>
  )
}

export default ScrollStack
