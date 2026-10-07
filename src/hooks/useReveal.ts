import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

interface RevealOptions {
  /** Vertical offset to animate from (px). Default: 32 */
  y?: number
  /** Horizontal offset for left/right reveals (px). Default: 0 */
  x?: number
  /** Starting opacity. Default: 0 */
  opacity?: number
  /** Animation duration (seconds). Default: 0.9 */
  duration?: number
  /** Delay before animation starts (seconds). Default: 0 */
  delay?: number
  /** ScrollTrigger start position. Default: 'top 88%' */
  start?: string
  /** Stagger for child elements (seconds). Default: 0 */
  stagger?: number
  /** CSS selector for child elements to stagger. If set, staggers children. */
  childSelector?: string
}

/**
 * useReveal — GSAP scroll-triggered reveal hook.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>({ y: 40, delay: 0.1 })
 *   return <div ref={ref}>...</div>
 *
 * Automatically:
 *   - Respects prefers-reduced-motion (skips animation)
 *   - Cleans up ScrollTrigger on unmount via gsap.context().revert()
 *   - Staggers children when childSelector is provided
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || !ref.current) return

    const {
      y = 32,
      x = 0,
      opacity = 0,
      duration = 0.9,
      delay = 0,
      start = 'top 88%',
      stagger = 0,
      childSelector,
    } = options

    const ctx = gsap.context(() => {
      const target = childSelector
        ? gsap.utils.toArray<HTMLElement>(childSelector, ref.current!)
        : ref.current!

      gsap.from(target, {
        y,
        x,
        opacity,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

/**
 * useRevealText — GSAP reveal specifically for headline text.
 * Clips from bottom (mask-style reveal). Pairs with .bl-reveal CSS class.
 *
 * Usage:
 *   const ref = useRevealText<HTMLHeadingElement>({ delay: 0.2 })
 *   return <h1 ref={ref} className="bl-reveal">BLACKLINE</h1>
 */
export function useRevealText<T extends HTMLElement = HTMLHeadingElement>(
  options: Pick<RevealOptions, 'duration' | 'delay' | 'start'> = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || !ref.current) return

    const { duration = 1.0, delay = 0, start = 'top 90%' } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

/**
 * useStagger — Reveal a list of child elements with staggered timing.
 *
 * Usage:
 *   const ref = useStagger<HTMLUListElement>('.item', { stagger: 0.08 })
 *   return (
 *     <ul ref={ref}>
 *       <li className="item">One</li>
 *       <li className="item">Two</li>
 *     </ul>
 *   )
 */
export function useStagger<T extends HTMLElement = HTMLElement>(
  childSelector: string,
  options: Pick<RevealOptions, 'y' | 'opacity' | 'duration' | 'delay' | 'start' | 'stagger'> = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion || !ref.current) return

    const {
      y = 24,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      start = 'top 88%',
      stagger = 0.07,
    } = options

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(childSelector, ref.current!)

      if (!items.length) return

      gsap.from(items, {
        y,
        opacity,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

// Named re-export for convenience
export { ScrollTrigger }
