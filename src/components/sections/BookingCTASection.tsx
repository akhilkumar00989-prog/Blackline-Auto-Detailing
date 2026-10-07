/**
 * BLACKLINE AUTO DETAILING - Final Primary Conversion Section (Stage 5E)
 *
 * Visual Direction:
 *   - Full-width cinematic final payoff of the website.
 *   - Eyebrow: "READY WHEN YOU ARE" with gold hairline indicator.
 *   - Dominant editorial heading: "YOUR CAR. / OUR OBSESSION."
 *   - Supporting copy: "Premium detailing, paint correction and ceramic protection for vehicles that deserve more than ordinary care."
 *   - Deliberate editorial action: "BOOK YOUR DETAIL ->"
 *   - Supporting studio metadata: Austin, Texas | Mon-Sat / 8am-6pm | (512) 555-0187 | hello@blacklineauto.com.
 *   - Integrated high-end automotive imagery with edge vignettes.
 *   - Subtle, independent GSAP entrance reveals.
 *   - Zero em-dashes in code, text, or comments.
 */

import { useEffect, useRef } from 'react'
import { ArrowRight, Phone, Mail, Clock, MapPin } from 'lucide-react'
import { gsap } from '../../lib/gsap'

const CTA_IMAGE = '/images/hero-car.jpg'

export function BookingCTASection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const headerRef     = useRef<HTMLDivElement>(null)
  const contentColRef = useRef<HTMLDivElement>(null)
  const visualColRef  = useRef<HTMLDivElement>(null)
  const footerRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) return

      // 1. Top Metadata Bar Reveal
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

      // 2. Editorial Typography Staggered Reveal
      if (contentColRef.current) {
        gsap.from('.cta-reveal-item', {
          scrollTrigger: {
            trigger: contentColRef.current,
            start: 'top 82%',
          },
          opacity: 0,
          y: 32,
          stagger: 0.12,
          duration: 1.0,
          ease: 'power3.out',
        })
      }

      // 3. Automotive Visual Portal Reveal
      if (visualColRef.current) {
        gsap.from(visualColRef.current, {
          scrollTrigger: {
            trigger: visualColRef.current,
            start: 'top 82%',
          },
          opacity: 0,
          y: 40,
          scale: 0.98,
          duration: 1.2,
          ease: 'power3.out',
        })
      }

      // 4. Bottom Footer Strip Reveal
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
      id="contact"
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
              Ready When You Are
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
            <span>Austin Studio</span>
            <span className="text-[#C8A96E]/60">//</span>
            <span>By Appointment Only</span>
          </div>
        </div>

        {/* ── ASYMMETRIC MAIN ARENA: DOMINANT TYPOGRAPHY (LEFT) + VISUAL & CONTACT (RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 xl:gap-20 pt-12 sm:pt-16 lg:pt-20 items-center">

          {/* Left Column (7 Cols): Dominant Editorial Call to Action */}
          <div ref={contentColRef} className="lg:col-span-7 flex flex-col justify-start">

            {/* Dominant Headline */}
            <div className="cta-reveal-item overflow-hidden">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-bold uppercase tracking-tight text-[#F0ECE4] leading-[0.92]">
                <span className="block">YOUR CAR.</span>
                <span className="block text-white/90">OUR OBSESSION.</span>
              </h2>
            </div>

            {/* Gold Accent Divider */}
            <div className="cta-reveal-item mt-6 sm:mt-8">
              <div className="w-12 h-px bg-[#C8A96E]" />
            </div>

            {/* Supporting Statement */}
            <div className="cta-reveal-item mt-6 sm:mt-8 max-w-xl">
              <p className="font-body text-base sm:text-lg lg:text-xl text-[#8A8A8A] font-light leading-relaxed">
                Premium detailing, paint correction and ceramic protection for vehicles that deserve more than ordinary care.
              </p>
            </div>

            {/* Deliberate Editorial CTA Button */}
            <div className="cta-reveal-item mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="mailto:hello@blacklineauto.com?subject=Detailing%20Inquiry%20-%20Blackline%20Auto"
                className="group relative inline-flex items-center justify-between gap-6 px-8 py-5 bg-[#F0ECE4] text-[#08090A] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[#C8A96E] hover:text-[#08090A] active:scale-[0.98] shadow-lg"
              >
                <span>Book Your Detail</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="tel:5125550187"
                className="inline-flex items-center justify-center gap-3 px-6 py-5 border border-white/[0.12] text-[#F0ECE4] font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[#C8A96E] hover:text-[#C8A96E]"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8A96E]" />
                <span>(512) 555-0187</span>
              </a>
            </div>

            {/* Commission Notice */}
            <div className="cta-reveal-item mt-6 flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
              <span>Current waitlist: 2 to 3 weeks for full paint correction</span>
            </div>

          </div>

          {/* Right Column (5 Cols): Integrated Automotive Portal & Supporting Metadata */}
          <div ref={visualColRef} className="lg:col-span-5 flex flex-col justify-start">

            {/* Cinematic Automotive Visual Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full bg-[#0E1013] border border-white/[0.09] overflow-hidden shadow-2xl">
              <img
                src={CTA_IMAGE}
                alt="Blackline automotive studio finish"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Seamless Edge Vignette Overlays */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(8,9,10,0.6) 0%, transparent 25%, transparent 75%, rgba(8,9,10,0.85) 100%), linear-gradient(to right, rgba(8,9,10,0.5) 0%, transparent 20%, transparent 80%, rgba(8,9,10,0.5) 100%)',
                }}
              />

              {/* Watermark Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                <span className="font-mono text-[9px] tracking-widest text-[#F0ECE4]/90 uppercase">
                  Studio Commission 2026
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#C8A96E] uppercase">
                  Austin // HQ
                </span>
              </div>
            </div>

            {/* Supporting Studio Metadata Grid */}
            <div className="mt-6 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Studio Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    Location
                  </span>
                  <p className="font-mono text-xs text-[#F0ECE4] uppercase tracking-wider mt-0.5">
                    Austin, Texas
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    Studio Hours
                  </span>
                  <p className="font-mono text-xs text-[#F0ECE4] uppercase tracking-wider mt-0.5">
                    Mon-Sat / 8am-6pm
                  </p>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    Direct Studio Line
                  </span>
                  <a
                    href="tel:5125550187"
                    className="font-mono text-xs text-[#F0ECE4] tracking-wider mt-0.5 block hover:text-[#C8A96E] transition-colors"
                  >
                    (512) 555-0187
                  </a>
                </div>
              </div>

              {/* Direct Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                    Inquiries
                  </span>
                  <a
                    href="mailto:hello@blacklineauto.com"
                    className="font-mono text-xs text-[#F0ECE4] tracking-wider mt-0.5 block hover:text-[#C8A96E] transition-colors"
                  >
                    hello@blacklineauto.com
                  </a>
                </div>
              </div>

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
            <span>Blackline Auto Detailing / Studio Final Commission</span>
          </div>
          <div>
            <span>Austin, Texas // Copyright 2026 Blackline</span>
          </div>
        </div>

      </div>
    </section>
  )
}
