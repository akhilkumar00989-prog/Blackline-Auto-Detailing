/**
 * BLACKLINE AUTO DETAILING - Testimonials / Client Proof Section (Stage 5D)
 *
 * Visual Direction:
 *   - Editorial luxury brand-proof spread (not a generic review card carousel).
 *   - Eyebrow: "CLIENT NOTES" with Austin client archive metadata.
 *   - Asymmetric hierarchy: Testimonial 01 dominant, 02 and 03 secondary.
 *   - Large architectural quotation typography integrated into negative space.
 *   - Thin hairline borders (border-white/[0.08]), dark BLACKLINE canvas (#08090A).
 *   - Subtle warm-gold accents (#C8A96E) and muted typography (#8A8A8A).
 *   - GSAP scroll entrance reveals with prefers-reduced-motion fallback.
 *   - Zero em-dashes in code, text, or comments.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

interface SecondaryTestimonial {
  index: string
  quote: string
  author: string
  role: string
}

const PRIMARY_TESTIMONIAL = {
  index: '01',
  quote: 'Blackline completely transformed my M4. The paint looked better than when I bought it.',
  author: 'MARCUS R.',
  role: 'BMW M4 OWNER',
  spec: 'FULL SURFACE CORRECTION // CERAMIC QUARTZ',
}

const SECONDARY_TESTIMONIALS: SecondaryTestimonial[] = [
  {
    index: '02',
    quote: 'Professional from start to finish. The ceramic coating looks incredible.',
    author: 'DANIEL T.',
    role: 'CERAMIC COATING CLIENT',
  },
  {
    index: '03',
    quote: "Best detail I've had in Austin.",
    author: 'JASON T.',
    role: 'SIGNATURE DETAIL CLIENT',
  },
]

export function TestimonialsSection() {
  const sectionRef      = useRef<HTMLElement>(null)
  const headerRef       = useRef<HTMLDivElement>(null)
  const primaryRef      = useRef<HTMLDivElement>(null)
  const secondaryColRef = useRef<HTMLDivElement>(null)
  const footerRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) return

      // 1. Top Metadata Bar Entrance
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 88%',
          },
          opacity: 0,
          y: -12,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      // 2. Primary Testimonial Reveal
      if (primaryRef.current) {
        gsap.from(primaryRef.current, {
          scrollTrigger: {
            trigger: primaryRef.current,
            start: 'top 84%',
          },
          opacity: 0,
          y: 32,
          duration: 1.0,
          ease: 'power3.out',
        })
      }

      // 3. Secondary Testimonials Staggered Reveal
      if (secondaryColRef.current) {
        gsap.from('.testimonial-secondary-item', {
          scrollTrigger: {
            trigger: secondaryColRef.current,
            start: 'top 84%',
          },
          opacity: 0,
          y: 28,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
        })
      }

      // 4. Footer Strip Reveal
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
          },
          opacity: 0,
          y: 12,
          duration: 0.7,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full bg-[#08090A] text-[#F0ECE4] pt-24 pb-28 sm:pt-32 sm:pb-36 md:pt-40 md:pb-44 lg:pt-44 lg:pb-48 border-t border-white/[0.08] overflow-x-clip"
    >
      {/* Background Architectural Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F0ECE4 1px, transparent 1px), linear-gradient(to bottom, #F0ECE4 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">

        {/* ── TOP EDITORIAL METADATA BAR ────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-wrap items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-white/[0.08]"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 sm:w-8 h-px bg-[#C8A96E]" />
            <span className="font-mono text-xs text-[#C8A96E] uppercase tracking-[0.24em] font-medium">
              Client Notes
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
            <span>Austin, Texas</span>
            <span className="text-[#C8A96E]/60">//</span>
            <span>Blackline Clients</span>
          </div>
        </div>

        {/* ── ASYMMETRIC TESTIMONIAL LAYOUT: DOMINANT (LEFT) + SECONDARY (RIGHT) ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 xl:gap-20 pt-12 sm:pt-16 lg:pt-20 items-stretch">

          {/* Left Column (7 Cols): Visually Dominant Primary Testimonial */}
          <div
            ref={primaryRef}
            className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-12 lg:pb-0 lg:pr-12 xl:pr-16"
          >
            <div>
              {/* Index & Architecture Marker */}
              <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
                <div className="flex items-center gap-2.5 font-mono text-xs tracking-wider text-[#C8A96E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                  <span>COMMISSION {PRIMARY_TESTIMONIAL.index}</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest">
                  Principal Feedback
                </span>
              </div>

              {/* Dominant Typographic Quote Composition */}
              <div className="relative">
                {/* Architectural Large Decorative Quote Glyph */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 -left-6 sm:-top-14 sm:-left-8 font-display text-7xl sm:text-8xl lg:text-9xl text-white/[0.04] select-none leading-none"
                >
                  &ldquo;
                </span>

                <blockquote className="relative z-10">
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3rem] font-medium text-[#F0ECE4] leading-[1.18] sm:leading-[1.16] tracking-tight">
                    &ldquo;{PRIMARY_TESTIMONIAL.quote}&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Primary Client Credit & Technical Note */}
            <div className="mt-10 sm:mt-12 lg:mt-14 pt-6 sm:pt-8 border-t border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div>
                  <h3 className="font-display text-base sm:text-lg text-[#F0ECE4] font-semibold tracking-wider uppercase">
                    {PRIMARY_TESTIMONIAL.author}
                  </h3>
                  <p className="font-mono text-xs text-[#C8A96E] uppercase tracking-[0.18em] mt-1">
                    {PRIMARY_TESTIMONIAL.role}
                  </p>
                </div>

                <div className="font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
                  <span>{PRIMARY_TESTIMONIAL.spec}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Secondary Testimonials (Quiet & Structured) */}
          <div
            ref={secondaryColRef}
            className="lg:col-span-5 flex flex-col justify-between gap-10 sm:gap-12 lg:gap-14"
          >
            {SECONDARY_TESTIMONIALS.map((item, idx) => (
              <div
                key={item.index}
                className={`testimonial-secondary-item flex flex-col justify-between ${
                  idx > 0 ? 'pt-8 sm:pt-10 border-t border-white/[0.08]' : ''
                }`}
              >
                <div>
                  {/* Secondary Header */}
                  <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                    <span className="font-mono text-xs text-[#C8A96E] tracking-wider font-medium">
                      {item.index}
                    </span>
                    <span className="font-mono text-[10px] text-white/35 uppercase tracking-widest">
                      Studio Client
                    </span>
                  </div>

                  {/* Secondary Quote */}
                  <blockquote className="relative">
                    <p className="font-body text-base sm:text-lg lg:text-xl text-[#F0ECE4]/90 font-light leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* Secondary Author */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-baseline justify-between gap-2">
                  <span className="font-display text-sm font-semibold tracking-wider uppercase text-[#F0ECE4]">
                    {item.author}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
                    {item.role}
                  </span>
                </div>
              </div>
            ))}

            {/* Verification Marker */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-[10px] text-white/40 uppercase tracking-wider">
              <span>All Commissions Verified</span>
              <span className="text-[#C8A96E]">Private Client Roster</span>
            </div>
          </div>

        </div>

        {/* ── BOTTOM EDITORIAL SIGNATURE STRIP ───────────────────────────────── */}
        <div
          ref={footerRef}
          className="mt-16 sm:mt-20 lg:mt-24 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] sm:text-xs text-[#8A8A8A] uppercase tracking-wider"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 border border-[#C8A96E]" />
            <span>Blackline Auto Detailing / Verified Client Archive</span>
          </div>
          <div>
            <span>Austin, Texas // By Appointment Only</span>
          </div>
        </div>

      </div>
    </section>
  )
}
