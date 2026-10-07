/**
 * BLACKLINE — GSAP central registration
 *
 * Import GSAP exclusively from this file throughout the project.
 * Prevents duplicate plugin registration and ensures a single
 * gsap instance across the app.
 *
 * ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once — safe to call multiple times, GSAP deduplicates
gsap.registerPlugin(ScrollTrigger)

// Global GSAP defaults for consistent motion feel
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

// ScrollTrigger global defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  start: 'top 88%',
})

export { gsap, ScrollTrigger }
