import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface ParallaxOptions {
  /**
   * Parallax movement amount in px (negative = moves up as user scrolls down).
   * Default: -80
   */
  yOffset?: number
  /**
   * ScrollTrigger scrub value. true = tied to scroll, number = lerp lag.
   * Default: 1.5 (smooth lag for cinematic feel)
   */
  scrub?: number | boolean
  /**
   * When the pin/parallax starts. Default: 'top bottom' (when element top
   * hits viewport bottom)
   */
  start?: string
  /**
   * When the parallax ends. Default: 'bottom top'
   */
  end?: string
}

/**
 * useParallax — GSAP ScrollTrigger scrub-based parallax.
 *
 * Attach to a container element. The element itself (or an inner
 * element targeted by gsap.to) translates vertically as the user scrolls.
 *
 * Usage:
 *   const ref = useParallax<HTMLDivElement>({ yOffset: -60 })
 *   return (
 *     <div ref={ref} className="bl-img bl-img-cinema">
 *       <img src="..." alt="..." />
 *     </div>
 *   )
 *
 * Note: Skipped entirely when prefers-reduced-motion is active.
 * Uses gsap.context() for strict cleanup on unmount.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || !ref.current) return

    const {
      yOffset = -80,
      scrub = 1.5,
      start = 'top bottom',
      end = 'bottom top',
    } = options

    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        y: yOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

/**
 * useImageParallax — Parallax specifically for .bl-img containers.
 *
 * Targets the <img> child directly, allowing the container to clip
 * the overflow while the image moves at a different rate.
 * The container should have overflow:hidden.
 *
 * Usage:
 *   const ref = useImageParallax<HTMLDivElement>()
 *   return (
 *     <div ref={ref} className="bl-img bl-img-cinema overflow-hidden">
 *       <img src="..." alt="..." />
 *     </div>
 *   )
 */
export function useImageParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || !ref.current) return

    const img = ref.current.querySelector('img')
    if (!img) return

    const {
      yOffset = -60,
      scrub = 1.5,
      start = 'top bottom',
      end = 'bottom top',
    } = options

    const ctx = gsap.context(() => {
      // Scale img slightly to prevent gap at edges during parallax
      gsap.set(img, { scale: 1.12 })

      gsap.to(img, {
        y: yOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

// Named re-export
export { ScrollTrigger }
