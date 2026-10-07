/**
 * BLACKLINE AUTO DETAILING - About / Brand Story Section (Stage 5C)
 *
 * Visual Direction:
 *   - Editorial luxury brand-story spread (not a generic "About Us" card).
 *   - Eyebrow: "THE BLACKLINE STANDARD" with Austin metadata.
 *   - Dominant headline: "MORE THAN A DETAIL." with warm ivory typography.
 *   - Supporting statement + narrative copy exploring the studio philosophy.
 *   - Full-width architectural foundation: 01 CLEAN / 02 CORRECT / 03 PROTECT / 04 PERFECT.
 *   - Asymmetric composition: Dominant editorial storytelling + high-end studio photography.
 *   - Smooth, independent GSAP scroll entrance reveals with reduced-motion fallback.
 *   - Zero em-dashes in code, text, or comments.
 */

import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

interface BrandPrinciple {
  num: string
  title: string
  desc: string
}

const PRINCIPLES: BrandPrinciple[] = [
  {
    num: '01',
    title: 'CLEAN',
    desc: 'Touchless Decontamination',
  },
  {
    num: '02',
    title: 'CORRECT',
    desc: 'Sub-Micron Paint Leveling',
  },
  {
    num: '03',
    title: 'PROTECT',
    desc: 'Covalent Quartz Shield',
  },
  {
    num: '04',
    title: 'PERFECT',
    desc: '5600K Optical Handover',
  },
]

const ABOUT_IMAGE = '/images/about-studio.jpg'

export function AboutSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const headerRef     = useRef<HTMLDivElement>(null)
  const textColRef    = useRef<HTMLDivElement>(null)
  const imageFrameRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

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

      // 2. Editorial Typography Staggered Reveal
      if (textColRef.current) {
        gsap.from('.about-reveal-item', {
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 82%',
          },
          opacity: 0,
          y: 32,
          stagger: 0.12,
          duration: 1.0,
          ease: 'power3.out',
        })
      }

      // 3. Independent Photographic Portal Entrance
      if (imageFrameRef.current) {
        gsap.from(imageFrameRef.current, {
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: 'top 82%',
          },
          opacity: 0,
          y: 40,
          scale: 0.97,
          duration: 1.2,
          ease: 'power3.out',
        })
      }

      // 4. Brand Principles Reveal
      if (principlesRef.current) {
        gsap.from('.about-principle-item', {
          scrollTrigger: {
            trigger: principlesRef.current,
            start: 'top 88%',
          },
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#08090A] text-[#F0ECE4] pt-24 pb-28 sm:pt-32 sm:pb-36 md:pt-40 md:pb-44 lg:pt-44 lg:pb-52 border-t border-white/[0.08] overflow-x-clip"
    >
      {/* Background Architectural Grid Overlay */}
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
          className="flex flex-wrap items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-white/[0.08]"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 sm:w-8 h-px bg-[#C8A96E]" />
            <span className="font-mono text-xs text-[#C8A96E] uppercase tracking-[0.24em] font-medium">
              The Blackline Standard
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
            <span>Austin, Texas</span>
            <span className="text-[#C8A96E]/60">//</span>
            <span>Est. 2018</span>
          </div>
        </div>

        {/* ── ASYMMETRIC MAIN ARENA: TYPOGRAPHY (LEFT) + STUDIO IMAGE (RIGHT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 pt-12 sm:pt-16 lg:pt-20 items-center">

          {/* Left Column (7 Cols): Dominant Editorial Brand Narrative */}
          <div ref={textColRef} className="lg:col-span-7 flex flex-col justify-start">

            {/* Main Headline */}
            <div className="about-reveal-item overflow-hidden">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-bold uppercase tracking-tight text-[#F0ECE4] leading-[0.93]">
                <span className="block">MORE THAN</span>
                <span className="block text-white/90">A DETAIL.</span>
              </h2>
            </div>

            {/* Gold Accent Divider */}
            <div className="about-reveal-item mt-6 sm:mt-8">
              <div className="w-12 h-px bg-[#C8A96E]" />
            </div>

            {/* Supporting Statement */}
            <div className="about-reveal-item mt-6 sm:mt-8 max-w-xl">
              <p className="font-body text-lg sm:text-xl lg:text-2xl text-[#F0ECE4] font-medium leading-relaxed">
                We restore the character, clarity and presence of every vehicle that enters the BLACKLINE studio.
              </p>
            </div>

            {/* Body Copy */}
            <div className="about-reveal-item mt-5 sm:mt-6 max-w-xl">
              <p className="font-body text-sm sm:text-base lg:text-[1.05rem] text-[#8A8A8A] font-light leading-relaxed">
                From meticulous preparation to paint refinement and long-term protection, every detail is performed with precision, patience and an obsession with the finished surface.
              </p>
            </div>

            {/* Studio Specification Tag */}
            <div className="about-reveal-item mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                <span>Dedicated Studio Facility</span>
              </div>
              <span className="text-[#C8A96E]">Private Client Handover</span>
            </div>

          </div>

          {/* Right Column (5 Cols): High-End Studio Photographic Visual */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div
              ref={imageFrameRef}
              className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full bg-[#0E1013] border border-white/[0.09] overflow-hidden shadow-2xl"
            >
              {/* Primary Photographic Visual */}
              <img
                src={ABOUT_IMAGE}
                alt="Blackline automotive studio paint refinement in progress"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Edge Vignette Overlays: Seamless architectural framing */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(8,9,10,0.75) 0%, transparent 22%, transparent 78%, rgba(8,9,10,0.85) 100%), linear-gradient(to right, rgba(8,9,10,0.6) 0%, transparent 18%, transparent 82%, rgba(8,9,10,0.6) 100%)',
                }}
              />

              {/* Top Photographic Watermark */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between pointer-events-none z-20">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#F0ECE4]/90 uppercase">
                    Austin Facility // Studio Craft
                  </span>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
                  Arch. 04
                </span>
              </div>

              {/* Bottom Technical Watermark */}
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 pointer-events-none z-20">
                <div className="pt-2.5 sm:pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] text-[#F0ECE4] tracking-wide uppercase font-medium">
                    Handcrafted Refinement
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider uppercase">
                    Est. 2018
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-image Editorial Caption */}
            <div className="mt-3.5 flex items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider px-1">
              <span>Meticulous Paint Refinement</span>
              <span className="text-[#C8A96E]">5600K Inspection</span>
            </div>
          </div>

        </div>

        {/* ── FULL-WIDTH BRAND PRINCIPLES FOUNDATION ──────────────────────── */}
        <div ref={principlesRef} className="mt-16 sm:mt-20 lg:mt-24 pt-8 sm:pt-10 border-t border-white/[0.08]">
          <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-xs text-[#C8A96E] uppercase tracking-[0.22em] font-semibold">
              Core Brand Principles
            </span>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
              Protocol 01 - 04
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.num}
                className="about-principle-item flex flex-col gap-1.5 border-l border-white/[0.12] pl-3.5 sm:pl-4 transition-colors duration-300 hover:border-[#C8A96E]"
              >
                <span className="font-mono text-xs tracking-wider text-[#C8A96E] font-medium">
                  {principle.num}
                </span>
                <h3 className="font-display text-sm sm:text-base tracking-wider uppercase text-[#F0ECE4] font-semibold">
                  {principle.title}
                </h3>
                <p className="font-mono text-[9px] sm:text-[10px] text-[#8A8A8A] uppercase tracking-wider leading-snug">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM EDITORIAL SIGNATURE STRIP ───────────────────────────────── */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] sm:text-xs text-[#8A8A8A] uppercase tracking-wider">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 border border-[#C8A96E]" />
            <span>Blackline Auto Detailing / Studio Brand Story</span>
          </div>
          <div>
            <span>Austin, Texas // By Appointment Only</span>
          </div>
        </div>

      </div>
    </section>
  )
}
