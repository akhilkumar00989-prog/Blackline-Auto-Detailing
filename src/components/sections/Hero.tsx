/**
 * BLACKLINE AUTO DETAILING - Hero Section (Stage 1 Redesign)
 *
 * Visual Direction:
 *   - High-end cinematic automotive campaign (not a standard car-detailing site).
 *   - Oversized editorial typography: "YOUR CAR. / OUR OBSESSION." as the dominant visual.
 *   - Asymmetric composition: integrated vehicle presence, layered depth, intentional negative space.
 *   - Vehicle image blends seamlessly into the near-black canvas with multi-directional gradients
 *     (no rectangular card borders).
 *   - Editorial metadata: Austin, TX · Est. 2018 · Premium Auto Detailing.
 *   - Action pair: "BOOK YOUR DETAIL →" and "VIEW OUR WORK ↓".
 *   - Restrained, slow, expensive GSAP choreography and cursor parallax depth.
 *   - Full responsiveness with distinctive editorial character on both desktop and mobile.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

const HERO_IMAGE = '/images/hero-car.jpg'

export function Hero() {
  const heroRef     = useRef<HTMLElement>(null)
  const imgRef      = useRef<HTMLImageElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const metaRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // -- GSAP Entrance Timeline (Slow, Smooth, Cinematic) -----------------
      if (!reduced) {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.05,
        })

        // 1. Vehicle image reveal: subtle scale settle & exposure fade
        tl.fromTo(
          '.hero-car-img',
          { scale: 1.08, opacity: 0.2 },
          { scale: 1.0, opacity: 1, duration: 1.4, ease: 'power2.out', clearProps: 'opacity' },
          0
        )

        // 2. Editorial metadata bar slides in
        tl.from(
          '.hero-meta-item',
          { opacity: 0, y: -10, stagger: 0.06, duration: 0.6, ease: 'power3.out', clearProps: 'opacity,transform' },
          0.15
        )

        // 3. Gold accent rule expands
        tl.from(
          '.hero-gold-line',
          { scaleX: 0, transformOrigin: 'left center', duration: 0.7, ease: 'power3.inOut' },
          0.25
        )

        // 4. Headline lines slide up from masked overflow
        tl.from(
          '.hero-headline-row',
          {
            y: '105%',
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power4.out',
            clearProps: 'opacity,transform',
          },
          0.3
        )

        // 5. Narrative subtext fades up
        tl.from(
          '.hero-narrative',
          { opacity: 0, y: 12, duration: 0.65, ease: 'power3.out', clearProps: 'opacity,transform' },
          0.55
        )

        // 6. Action CTAs entrance
        tl.from(
          '.hero-cta-btn',
          { opacity: 0, y: 12, stagger: 0.08, duration: 0.6, ease: 'power3.out', clearProps: 'opacity,transform' },
          0.7
        )

        // 7. Bottom editorial strip
        tl.from(
          '.hero-footer-strip',
          { opacity: 0, duration: 0.6, ease: 'power2.out', clearProps: 'opacity' },
          0.85
        )
      }

      // -- Desktop Cursor Parallax (Pointer: fine only) ----------------------
      const isTouch = window.matchMedia('(pointer: coarse)').matches
      if (!reduced && !isTouch && imgRef.current && contentRef.current) {
        const imgX = gsap.quickTo(imgRef.current, 'x', { duration: 2.0, ease: 'power2.out' })
        const imgY = gsap.quickTo(imgRef.current, 'y', { duration: 2.0, ease: 'power2.out' })
        const textX = gsap.quickTo(contentRef.current, 'x', { duration: 2.4, ease: 'power2.out' })
        const textY = gsap.quickTo(contentRef.current, 'y', { duration: 2.4, ease: 'power2.out' })

        const heroEl = heroRef.current!
        const handleMove = (e: MouseEvent) => {
          const rect = heroEl.getBoundingClientRect()
          const nx = (e.clientX / rect.width - 0.5) * 2  // -1 to 1
          const ny = (e.clientY / rect.height - 0.5) * 2

          // Background car moves subtly opposite to cursor
          imgX(nx * -14)
          imgY(ny * -8)

          // Foreground typography moves gently with cursor
          textX(nx * 6)
          textY(ny * 4)
        }

        const handleLeave = () => {
          imgX(0)
          imgY(0)
          textX(0)
          textY(0)
        }

        heroEl.addEventListener('mousemove', handleMove, { passive: true })
        heroEl.addEventListener('mouseleave', handleLeave)

        return () => {
          heroEl.removeEventListener('mousemove', handleMove)
          heroEl.removeEventListener('mouseleave', handleLeave)
        }
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Blackline Auto Detailing - Hero"
      className="relative min-h-0 md:min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: 'var(--bl-bg, #08090A)' }}
    >
      {/* ── Background Automotive Vehicle Presence ────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      >
        {/* Desktop: positioned across right 64% with cinematic bleeds */}
        {/* Mobile: responsive top 52vh with tuned atmospheric gradient masks */}
        <div
          className="hero-car-wrapper absolute right-0 top-0 h-[52vh] sm:h-[56vh] md:h-full w-full md:w-[64vw] lg:w-[60vw] overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          <img
            ref={imgRef}
            src={HERO_IMAGE}
            alt="Black BMW M4 Competition - Blackline studio detail"
            loading="eager"
            decoding="sync"
            className="hero-car-img w-full h-full object-cover object-[center_28%] md:object-[35%_center]"
            style={{ willChange: 'transform' }}
          />

          {/* Deep multi-stop gradient masks -- blends vehicle seamlessly into black studio atmosphere */}
          {/* Left-to-right fade (desktop) */}
          <div
            className="hidden md:block absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #08090A 0%, #08090A 12%, rgba(8,9,10,0.85) 30%, rgba(8,9,10,0.25) 60%, transparent 100%)',
            }}
          />

          {/* Top fade (nav clearance) */}
          <div
            className="absolute inset-x-0 top-0 h-20 sm:h-24 md:h-36"
            style={{
              background:
                'linear-gradient(to bottom, #08090A 0%, rgba(8,9,10,0.7) 50%, transparent 100%)',
            }}
          />

          {/* Bottom fade (floor integration) */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 sm:h-36 md:h-52"
            style={{
              background:
                'linear-gradient(to top, #08090A 0%, rgba(8,9,10,0.85) 40%, transparent 100%)',
            }}
          />
        </div>

        {/* Ambient subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 85% 35%, rgba(200,169,110,0.04) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* -- Main Hero Composition (Asymmetric Editorial Layout) ------------- */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-5 sm:pb-6 md:pb-12 flex-1 flex flex-col justify-between">
        
        {/* TOP: Brand & Studio Metadata */}
        <div
          ref={metaRef}
          className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-[0.20em] md:tracking-[0.22em] text-[#8A8A8A]"
        >
          <div className="hero-meta-item flex items-center gap-2 text-[#F0ECE4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" aria-hidden="true" />
            <span className="font-semibold tracking-[0.18em]">BLACKLINE AUTO DETAILING</span>
          </div>

          <span className="hidden sm:inline-block text-[#3A3A3A]" aria-hidden="true">/</span>

          <span className="hero-meta-item">AUSTIN, TEXAS</span>

          <span className="hidden sm:inline-block text-[#3A3A3A]" aria-hidden="true">/</span>

          <span className="hero-meta-item">EST. 2018</span>

          <span className="hidden sm:inline-block text-[#3A3A3A]" aria-hidden="true">/</span>

          <span className="hero-meta-item text-[#C8A96E] font-medium">PREMIUM AUTO DETAILING</span>
        </div>

        {/* CENTER: Oversized Editorial Campaign Typography */}
        <div ref={contentRef} className="my-auto py-3 sm:py-6 md:py-10 max-w-[1100px]">
          
          {/* Subtle gold campaign accent rule */}
          <div
            className="hero-gold-line w-12 md:w-16 h-[2px] bg-[#C8A96E] mb-6 md:mb-8"
            aria-hidden="true"
          />

          <h1
            aria-label="Your car. Our obsession."
            className="font-display font-bold tracking-[-0.035em] text-[#F0ECE4] select-none"
            style={{
              fontSize: 'clamp(2.75rem, 8.8vw, 8.5rem)',
              lineHeight: 0.90,
            }}
          >
            {/* Row 1: YOUR CAR. */}
            <div className="overflow-hidden pb-1 md:pb-2">
              <span className="hero-headline-row inline-block">
                YOUR CAR.
              </span>
            </div>

            {/* Row 2: OUR OBSESSION. */}
            <div className="overflow-hidden pt-1 md:pt-2">
              <span className="hero-headline-row inline-block">
                OUR{' '}
                <span className="text-[#C8A96E] font-extrabold">
                  OBSESSION.
                </span>
              </span>
            </div>
          </h1>

          {/* Supporting Narrative Statement */}
          <p className="hero-narrative mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-[#8A8A8A] font-light max-w-[42ch] leading-relaxed">
            Paint correction, ceramic protection, and bespoke detailing for vehicles that demand perfection.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
            {/* Primary CTA */}
            <a
              href="#contact"
              className="hero-cta-btn group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#F0ECE4] text-[#08090A] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.14em] rounded-[2px] transition-all duration-300 hover:bg-[#FFFFFF] hover:shadow-[0_0_24px_rgba(200,169,110,0.30)] active:scale-[0.98]"
            >
              <span>BOOK YOUR DETAIL</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#work"
              className="hero-cta-btn group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-transparent border border-[rgba(255,255,255,0.15)] text-[#F0ECE4] font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] rounded-[2px] transition-all duration-300 hover:border-[#C8A96E] hover:text-[#C8A96E] active:scale-[0.98]"
            >
              <span>VIEW OUR WORK</span>
              <span
                aria-hidden="true"
                className="text-[#C8A96E] transition-transform duration-300 group-hover:translate-y-1"
              >
                ↓
              </span>
            </a>
          </div>
        </div>

        {/* BOTTOM: Editorial Coordinates & Scroll Cue */}
        <div className="hero-footer-strip pt-4 sm:pt-6 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-6 text-[10px] sm:text-xs font-mono tracking-[0.20em] uppercase text-[#5A5A5A]">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[#8A8A8A]">AUSTIN HQ</span>
            <span className="hidden sm:inline-block text-[#3A3A3A]" aria-hidden="true">/</span>
            <span>30°16′02″N 97°44′35″W</span>
          </div>

          <a
            href="#process"
            className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#C8A96E] transition-colors duration-300"
            aria-label="Scroll to process study"
          >
            <span>SCROLL</span>
            <span className="inline-block animate-bounce text-[#C8A96E]" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}
