'use client'

import React, { useLayoutEffect, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div
    className={`scroll-stack-card relative w-full box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </div>
)

interface ScrollStackProps {
  className?: string
  children: ReactNode
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  rotationAmount?: number
  blurAmount?: number
  /** Max cards kept visible in the stack; deeper cards are hidden. 0 = no cap. */
  maxVisibleStack?: number
  /** Pin each card so it sits vertically centered in the viewport (overrides stackPosition for pinning). */
  centerStack?: boolean
  /** Extra scroll room (px) the last card stays pinned before the next section appears. */
  endSpacer?: number
  onStackComplete?: () => void
}

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
  maxVisibleStack = 0,
  centerStack = false,
  endSpacer = 0,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  // Natural (transform-free) document offsets — measured once, never read from
  // a transformed element during the scroll loop (that caused the feedback jitter).
  const cardTopsRef = useRef<number[]>([])
  const cardHeightsRef = useRef<number[]>([])
  const endTopRef = useRef<number>(0)
  const lastTransformsRef = useRef(
    new Map<number, { translateY: number; scale: number; rotation: number; blur: number; hidden: boolean }>()
  )

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value as string)
  }, [])

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0
      if (scrollTop > end) return 1
      return (scrollTop - start) / (end - start)
    },
    []
  )

  // Read true layout positions/heights with all transforms neutralized, then restore them.
  const measurePositions = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const saved = cards.map(c => c.style.transform)
    cards.forEach(c => {
      c.style.transform = 'none'
    })

    cardTopsRef.current = cards.map(c => c.getBoundingClientRect().top + window.scrollY)
    cardHeightsRef.current = cards.map(c => c.getBoundingClientRect().height)

    const endEl = document.querySelector('.scroll-stack-end') as HTMLElement | null
    endTopRef.current = endEl ? endEl.getBoundingClientRect().top + window.scrollY : 0

    cards.forEach((c, i) => {
      c.style.transform = saved[i]
    })
  }, [])

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current
    const cardTops = cardTopsRef.current
    if (!cards.length || !cardTops.length) return

    const scrollTop = window.scrollY
    const containerHeight = window.innerHeight
    const heights = cardHeightsRef.current
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)
    // Last card releases this far past where it pins, so it stays put while the
    // endSpacer scrolls by — opening a clear gap before the next section.
    const lastPinAt = cardTops[cards.length - 1] - (centerStack
      ? Math.max(0, (containerHeight - (heights[cards.length - 1] ?? 0)) / 2)
      : parsePercentage(stackPosition, containerHeight))
    const genericPinEnd = endTopRef.current - containerHeight / 2
    const pinEnd = endSpacer > 0 ? lastPinAt + endSpacer : genericPinEnd

    const basePinPx = parsePercentage(stackPosition, containerHeight)

    // Center pin (no fan): the offset that places a card vertically centered.
    const centerPin = (i: number) => {
      if (centerStack) {
        const h = heights[i] ?? 0
        return Math.max(0, (containerHeight - h) / 2)
      }
      return basePinPx
    }

    // Each card pins (reaches center) at this scroll position.
    const pinAt = (i: number) => cardTops[i] - centerPin(i)

    // Top-most pinned card, decided by the centered pin point.
    let topCardIndex = 0
    for (let j = 0; j < cards.length; j++) {
      if (scrollTop >= pinAt(j)) topCardIndex = j
    }

    // Continuous "how many cards are stacked above card i", ramping smoothly as the
    // next card travels toward its pin point — avoids a discrete jump when topCardIndex
    // steps up. The active card has depth ~0 (centered); buried cards fan upward.
    const stackedDepth = (i: number) => {
      let depth = 0
      for (let k = i + 1; k < cards.length; k++) {
        const start = pinAt(k - 1)
        const end = pinAt(k)
        depth += calculateProgress(scrollTop, start, end)
      }
      return depth
    }

    // Per-card pin offset: centered minus the fan-out for its (smooth) stacked depth.
    const pinOffset = (i: number) => centerPin(i) - itemStackDistance * stackedDepth(i)

    cards.forEach((card, i) => {
      const cardTop = cardTops[i]
      const stackPositionPx = pinOffset(i)
      // Pin/translate uses the fanned offset; scale uses the stable centered pin so
      // the shrink ramp isn't distorted by the fan-out moving the trigger window.
      const pinStart = cardTop - stackPositionPx
      const triggerStart = cardTop - centerPin(i)
      const triggerEnd = cardTop - scaleEndPositionPx

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0
      const blur = blurAmount ? Math.max(0, stackedDepth(i) * blurAmount) : 0

      // Ease the card into its pin: over the final `approachPx` before pinStart,
      // blend translateY from 0 toward the fully-pinned value so the snap is gone.
      const approachPx = 220
      const pinnedTranslateY = scrollTop - cardTop + stackPositionPx
      const fullyPinnedTranslateY = pinEnd - cardTop + stackPositionPx

      let translateY = 0
      if (scrollTop > pinEnd) {
        translateY = fullyPinnedTranslateY
      } else if (scrollTop >= pinStart) {
        translateY = pinnedTranslateY
      } else if (scrollTop >= pinStart - approachPx) {
        // Smooth cubic ease-in from 0 to pinnedTranslateY over the approach window.
        const t = (scrollTop - (pinStart - approachPx)) / approachPx
        const eased = t * t * (3 - 2 * t) // smoothstep
        translateY = eased * (pinStart - cardTop + stackPositionPx)
      }

      // Hide cards buried deeper than maxVisibleStack behind the current top card,
      // so the deep cards don't poke out below the active card in the viewport.
      const hidden = maxVisibleStack > 0 && topCardIndex - i >= maxVisibleStack

      const next = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
        hidden,
      }

      const last = lastTransformsRef.current.get(i)
      const hasChanged =
        !last ||
        Math.abs(last.translateY - next.translateY) > 0.1 ||
        Math.abs(last.scale - next.scale) > 0.001 ||
        Math.abs(last.rotation - next.rotation) > 0.1 ||
        Math.abs(last.blur - next.blur) > 0.1 ||
        last.hidden !== next.hidden

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale}) rotate(${next.rotation}deg)`
        card.style.filter = next.blur > 0 ? `blur(${next.blur}px)` : ''
        card.style.visibility = next.hidden ? 'hidden' : ''
        card.style.pointerEvents = next.hidden ? 'none' : ''
        lastTransformsRef.current.set(i, next)
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    maxVisibleStack,
    centerStack,
    endSpacer,
    onStackComplete,
    parsePercentage,
    calculateProgress,
  ])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('.scroll-stack-card')
    )
    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'transform, filter'
      // Center origin when centering so buried cards shrink symmetrically and stay centered.
      card.style.transformOrigin = centerStack ? 'center center' : 'top center'
      card.style.backfaceVisibility = 'hidden'
    })

    measurePositions()
    updateCardTransforms()

    // Lenis drives a smoothed scrollTop; we recompute transforms from cached
    // positions on every Lenis frame — no per-frame layout reads, no feedback.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    })
    lenisRef.current = lenis

    lenis.on('scroll', updateCardTransforms)

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    animationFrameRef.current = requestAnimationFrame(raf)

    const handleResize = () => {
      measurePositions()
      updateCardTransforms()
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Re-measure after late layout shifts (images/fonts settling).
    const settleTimer = window.setTimeout(() => {
      measurePositions()
      updateCardTransforms()
    }, 400)

    return () => {
      window.clearTimeout(settleTimer)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      lenis.destroy()
      lenisRef.current = null
      stackCompletedRef.current = false
      cardsRef.current = []
      cardTopsRef.current = []
      transformsCache.clear()
    }
  }, [measurePositions, updateCardTransforms, itemDistance, centerStack])

  return (
    <div ref={containerRef} className={`scroll-stack-window ${className}`.trim()}>
      {children}
      {/* Spacer: keeps the last card pinned/centered, then opens a gap before the next section */}
      <div
        className="scroll-stack-end w-full"
        style={{ height: endSpacer > 0 ? endSpacer : 1 }}
      />
    </div>
  )
}

export default ScrollStack
