/**
 * BLACKLINE AUTO DETAILING - Services Section (Stage 4)
 *
 * Visual Direction:
 *   - Editorial luxury service catalogue (no cards, no SaaS tables, no rounded boxes).
 *   - Section headline: "SERVICES" with eyebrow "02 / THE BLACKLINE STANDARD".
 *   - 4 Progressive Editorial Rows:
 *       01 SIGNATURE DETAIL       $149
 *       02 PAINT CORRECTION       FROM $299
 *       03 CERAMIC COATING        FROM $499
 *       04 INTERIOR RESTORATION   FROM $199
 *   - Asymmetric composition: Editorial rows with large typography, generous negative space,
 *     thin hairlines, and small technical metadata.
 *   - Restrained hover physics: title glide, gold accent expansion, price shift, and subtle
 *     automotive visual preview vignette.
 *   - GSAP ScrollTrigger progressive entrance animations with reduced-motion fallback.
 */

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

interface ServiceItem {
  id: string
  number: string
  name: string
  price: string
  pricePrefix?: string
  subtitle: string
  description: string
  timeframe: string
  deliverable: string
  image: string
}

const SERVICES: ServiceItem[] = [
  {
    id: 'signature-detail',
    number: '01',
    name: 'SIGNATURE DETAIL',
    price: '$149',
    subtitle: 'Complete Surface Rejuvenation',
    description:
      "A complete exterior and interior detail designed to restore the vehicle's finish and presence.",
    timeframe: '4 - 6 Hours',
    deliverable: 'PH-Neutral Prep // Hand Carnauba Finish',
    image: '/images/SIGNATURE DETAIL.jpg',
  },
  {
    id: 'paint-correction',
    number: '02',
    name: 'PAINT CORRECTION',
    price: '$299',
    pricePrefix: 'FROM',
    subtitle: 'Optical Defect Eradication',
    description:
      'Machine polishing and paint refinement to remove swirls, oxidation and surface imperfections.',
    timeframe: '8 - 16 Hours',
    deliverable: 'Multi-Stage Rotary // Sub-Micron Leveling',
    image: '/images/PAINT CORRECTION.jpg',
  },
  {
    id: 'ceramic-coating',
    number: '03',
    name: 'CERAMIC COATING',
    price: '$499',
    pricePrefix: 'FROM',
    subtitle: 'Molecular Quartz Shield',
    description:
      'High-performance ceramic protection for long-term gloss, hydrophobicity and paint preservation.',
    timeframe: '2 - 3 Days',
    deliverable: '9H Hardness // Multi-Layer Quartz Matrix',
    image: '/images/CERAMIC COATING.jpg',
  },
  {
    id: 'interior-restoration',
    number: '04',
    name: 'INTERIOR RESTORATION',
    price: '$199',
    pricePrefix: 'FROM',
    subtitle: 'Bespoke Cabin Reconditioning',
    description:
      'Deep interior cleaning and restoration focused on leather, textiles, plastics and high-touch surfaces.',
    timeframe: '5 - 8 Hours',
    deliverable: 'Steam Extraction // Matte UV Preservation',
    image: '/images/INTERIOR RESTORATION.jpg',
  },
]

export function ServicesSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const headerRef     = useRef<HTMLDivElement>(null)
  const titleRef      = useRef<HTMLHeadingElement>(null)
  const narrativeRef  = useRef<HTMLDivElement>(null)
  const rowsContainer = useRef<HTMLDivElement>(null)

  const [activeService, setActiveService] = useState<number>(0)
  const [isHovered, setIsHovered]         = useState<boolean>(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) return

      // ── 1. Top Metadata Bar Reveal ──────────────────────────────────────────
      gsap.from('.services-eyebrow-item', {
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

      // ── 2. Headline Reveal ──────────────────────────────────────────────────
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          y: 40,
          duration: 1.1,
          ease: 'power4.out',
        })
      }

      // ── 3. Narrative Copy Reveal ────────────────────────────────────────────
      if (narrativeRef.current) {
        gsap.from(narrativeRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 82%',
          },
          opacity: 0,
          y: 24,
          duration: 1.0,
          ease: 'power3.out',
          delay: 0.15,
        })
      }

      // ── 4. Progressive Services Rows Entrance ───────────────────────────────
      gsap.from('.service-editorial-row', {
        scrollTrigger: {
          trigger: rowsContainer.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 45,
        stagger: 0.14,
        duration: 0.95,
        ease: 'power3.out',
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-[#08090A] text-[#F0ECE4] pt-14 pb-20 sm:pt-24 sm:pb-32 md:pt-36 md:pb-44 lg:pt-40 lg:pb-52 border-t border-white/[0.08]"
    >
      {/* Background Architectural Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
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
          className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-8 border-b border-white/[0.08]"
        >
          <div className="services-eyebrow-item flex items-center gap-3">
            <div className="w-6 sm:w-8 h-px bg-[#C8A96E]" />
            <span className="font-mono text-xs text-[#C8A96E] uppercase tracking-[0.22em] font-medium">
              02 / The Blackline Standard
            </span>
          </div>

          <div className="services-eyebrow-item flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
            <span className="hidden sm:inline">Austin Facility Specification</span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span>Four Core Protocols</span>
          </div>
        </div>

        {/* ── HEADLINE & NARRATIVE (Asymmetric Split) ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 pt-7 sm:pt-12 lg:pt-16 pb-6 sm:pb-14 lg:pb-28 items-end">
          {/* Dominant Section Headline */}
          <div className="lg:col-span-7">
            <h2
              ref={titleRef}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-bold uppercase tracking-tight text-[#F0ECE4] leading-[0.92]"
            >
              SERVICES.
            </h2>
          </div>

          {/* Supporting Narrative Copy */}
          <div ref={narrativeRef} className="lg:col-span-5 flex flex-col justify-end">
            <div className="w-10 sm:w-12 h-px bg-[#C8A96E]/60 mb-4 sm:mb-6" />
            <p className="font-body text-base sm:text-lg lg:text-xl text-[#F0ECE4] font-medium leading-snug mb-2 sm:mb-3">
              Precision protocols engineered for collectors and performance vehicles.
            </p>
            <p className="font-body text-sm sm:text-base lg:text-lg text-[#8A8A8A] font-light leading-relaxed">
              Every package is executed with hospital-grade demineralization, calibrated high-CRI lighting, and surgical paint leveling.
            </p>

            <div className="mt-5 sm:mt-8 pt-4 sm:pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
              <span>Inspection Standard: 5600K High-CRI</span>
              <span className="text-[#C8A96E]">Bookings By Appointment</span>
            </div>
          </div>
        </div>

        {/* ── EDITORIAL SERVICES ROWS ────────────────────────────────────────── */}
        <div
          ref={rowsContainer}
          className="border-t border-white/[0.08] divide-y divide-white/[0.08]"
          onMouseLeave={() => setIsHovered(false)}
        >
          {SERVICES.map((service, index) => {
            const isCurrent = activeService === index

            return (
              <div
                key={service.id}
                onMouseEnter={() => {
                  setActiveService(index)
                  setIsHovered(true)
                }}
                className="service-editorial-row group relative py-6 sm:py-10 lg:py-14 transition-all duration-300 hover:bg-white/[0.015]"
              >
                {/* Horizontal hover guide line accent */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px bg-[#C8A96E] transition-all duration-500 ease-out w-0 group-hover:w-20 lg:group-hover:w-32 opacity-0 group-hover:opacity-100"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-baseline">

                  {/* 1. Identification: Number + Primary Service Name */}
                  <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-7">
                    <span className="font-mono text-sm sm:text-base tracking-[0.2em] text-[#C8A96E] font-medium shrink-0">
                      {service.number}
                    </span>

                    <div>
                      <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F0ECE4] transition-all duration-300 group-hover:text-white group-hover:translate-x-2">
                        {service.name}
                      </h3>
                      <p className="font-display text-xs sm:text-sm tracking-wider uppercase text-white/50 mt-1 sm:mt-1.5 transition-colors duration-300 group-hover:text-[#C8A96E]">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* 2. Editorial Description & Technical Specification */}
                  <div className="lg:col-span-4 pl-8 sm:pl-12 lg:pl-0">
                    <p className="font-body text-xs sm:text-sm lg:text-base text-[#8A8A8A] leading-relaxed font-light mb-3 sm:mb-4 max-w-md transition-colors duration-200 group-hover:text-white/80">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider">
                      <span>{service.timeframe}</span>
                      <span className="text-white/20">/</span>
                      <span className="text-[#C8A96E]/80">{service.deliverable}</span>
                    </div>
                  </div>

                  {/* 3. Price & Action Indicator */}
                  <div className="lg:col-span-3 flex items-baseline justify-between lg:justify-end gap-6 pl-8 sm:pl-12 lg:pl-0">
                    <div className="text-left lg:text-right">
                      {service.pricePrefix && (
                        <span className="block font-mono text-[9px] sm:text-[10px] tracking-widest text-[#8A8A8A] uppercase mb-0.5">
                          {service.pricePrefix}
                        </span>
                      )}
                      <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F0ECE4] group-hover:text-white transition-all duration-200 group-hover:-translate-x-1 inline-block">
                        {service.price}
                      </span>
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-none border border-white/10 text-white/60 group-hover:text-[#C8A96E] group-hover:border-[#C8A96E]/50 group-hover:bg-[#C8A96E]/5 transition-all duration-300 shrink-0"
                      aria-label={`Book ${service.name}`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                </div>

                {/* Subtle Desktop Preview Vignette on Row Hover */}
                {isCurrent && isHovered && (
                  <div
                    aria-hidden="true"
                    className="hidden xl:block pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 w-48 h-28 z-20 overflow-hidden border border-white/10 shadow-2xl transition-opacity duration-300"
                  >
                    <img
                      src={service.image}
                      alt=""
                      className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between font-mono text-[8px] text-white/70 uppercase tracking-widest">
                      <span>FIG 02.{service.number}</span>
                      <span className="text-[#C8A96E]">STUDIO ARCHIVE</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── BOTTOM EDITORIAL SIGNATURE STRIP ───────────────────────────────── */}
        <div className="mt-16 sm:mt-24 lg:mt-32 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-[#8A8A8A] uppercase tracking-wider">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-1.5 h-1.5 border border-[#C8A96E] shrink-0" />
            <span className="break-words">
              Custom Commissions: Bespoke multi-stage correction available for private collections
            </span>
          </div>
          <div>
            <span>Austin Studio / By Appointment Only</span>
          </div>
        </div>

      </div>
    </section>
  )
}
