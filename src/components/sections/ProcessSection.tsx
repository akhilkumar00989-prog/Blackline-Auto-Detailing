/**
 * BLACKLINE AUTO DETAILING - Process Section (Stage 5B Continuous Cinematic Performance Fix)
 *
 * Performance Architecture:
 *   - Continuous Camera Motion: Main photograph continuously scales (1.03 -> 1.19) and drifts across 100% of scroll.
 *   - Zero Dead Zones: The underlying visual never stops moving while the user scrolls.
 *   - Zero React Re-Renders: Zero setState during scroll. GSAP coordinates transforms and opacities.
 *   - Immediate Scrub: scrub: true for direct 1:1 scroll responsiveness without catch-up lag.
 *   - Layout-Thrashing Free: Removed getBoundingClientRect and mousemove layout thrashing.
 *   - GPU Hardware Compositing: transform translate3d, backface-visibility hidden, force3D: true.
 *   - Zero em-dashes in code, strings, or comments.
 */

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

interface Stage {
  number: string
  title: string
  subtitle: string
  description: string
  metric: string
  telemetry: string
  spec: string
}

const STAGES: Stage[] = [
  {
    number: '01',
    title: 'CLEAN',
    subtitle: 'Decontamination & Surface Preparation',
    description:
      'Multi-stage touchless foam bath, iron deposit breakdown, and fine-grade clay treatment to eliminate bonded road grime down to the pores of the clear coat.',
    metric: 'PH-NEUTRAL PREP // ZERO RESIDUE',
    telemetry: 'STAGE 01 // DECONTAMINATION',
    spec: 'Austin Lab // Prep Protocol 01',
  },
  {
    number: '02',
    title: 'CORRECT',
    subtitle: 'Precision Machine Paint Polishing',
    description:
      'Precision machine compounding with high-intensity 5600K inspection lamps to eradicate swirl marks, oxidation, and micro-marring with surgical accuracy.',
    metric: 'OPTICAL CLARITY // SWIRL REMOVAL',
    telemetry: 'STAGE 02 // DEFECT LEVELING',
    spec: 'Rotary Refinement // 5600K CRI 98+',
  },
  {
    number: '03',
    title: 'PROTECT',
    subtitle: 'Ceramic Quartz Surface Protection',
    description:
      'Covalent chemical bonding of high-solids ceramic quartz coatings, providing extreme hydrophobicity, UV defense, and self-cleaning surface tension.',
    metric: 'CERAMIC MATRIX // DURABLE PROTECTION',
    telemetry: 'STAGE 03 // MOLECULAR SHIELD',
    spec: 'Quartz Matrix // 9H Hydrophobic Layer',
  },
  {
    number: '04',
    title: 'PERFECT',
    subtitle: 'Infrared Curing & Final Studio Inspection',
    description:
      'Even infrared heat bake to accelerate molecular cross-linking, followed by multi-angle optical luster verification before client handover.',
    metric: 'STUDIO SPECIFICATION // FINAL RELEASE',
    telemetry: 'STAGE 04 // OPTICAL LUSTER VERIFIED',
    spec: 'Infrared Bake // Showroom Delivery Spec',
  },
]

const DETAIL_IMAGE = '/images/process-detail.jpg'

export function ProcessSection() {
  const sectionRef       = useRef<HTMLElement>(null)
  const pinnedWrapperRef = useRef<HTMLDivElement>(null)
  const headerRef        = useRef<HTMLElement>(null)
  const photoPortalRef   = useRef<HTMLDivElement>(null)
  const footerRef        = useRef<HTMLElement>(null)
  const imgRef           = useRef<HTMLImageElement>(null)
  const sheenRef         = useRef<HTMLDivElement>(null)
  const progressBarRef   = useRef<HTMLDivElement>(null)

  // Master Pinned GSAP Scroll Choreography
  useEffect(() => {
    if (!sectionRef.current || !pinnedWrapperRef.current) return
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    const ctx = gsap.context(() => {
      const container   = sectionRef.current!
      const panels      = container.querySelectorAll<HTMLElement>('.process-stage-panel')
      const overlaysTop = container.querySelectorAll<HTMLElement>('.process-telemetry-top')
      const overlaysBot = container.querySelectorAll<HTMLElement>('.process-telemetry-bottom')
      const crumbs      = container.querySelectorAll<HTMLElement>('.process-breadcrumb-btn')
      const img         = imgRef.current
      const sheen       = sheenRef.current
      const bar         = progressBarRef.current

      // Initial visual setup (stages 02-04 hidden; stage 01 handled by introTl)
      panels.forEach((p, i) => {
        if (i > 0) {
          gsap.set(p, {
            autoAlpha: 0,
            y: 28,
            force3D: true,
          })
        }
      })

      overlaysTop.forEach((ov, i) => {
        if (i > 0) {
          gsap.set(ov, {
            autoAlpha: 0,
            force3D: true,
          })
        }
      })

      overlaysBot.forEach((ov, i) => {
        if (i > 0) {
          gsap.set(ov, {
            autoAlpha: 0,
            force3D: true,
          })
        }
      })

      if (img) {
        gsap.set(img, {
          scale: 1.03,
          x: 0,
          y: 0,
          force3D: true,
        })
      }

      if (sheen) {
        gsap.set(sheen, {
          xPercent: -80,
          opacity: 0.20,
          force3D: true,
        })
      }

      if (bar) {
        gsap.set(bar, { scaleX: 0.05, transformOrigin: 'left center', force3D: true })
      }

      // ── 0. INTRODUCTORY CLEAN ENTRANCE / CINEMATIC CONNECTION ────────────
      // Smoothly establishes 01 CLEAN and the photographic visual as the user
      // scrolls down from the Hero into the Process section (top 85% -> top top).
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'top top',
          scrub: true,
        },
      })

      if (headerRef.current) {
        introTl.fromTo(
          headerRef.current,
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, ease: 'none', force3D: true },
          0
        )
      }

      if (photoPortalRef.current) {
        introTl.fromTo(
          photoPortalRef.current,
          {
            opacity: 0.35,
            scale: 0.96,
            clipPath: 'inset(3% 3% 3% 3%)',
          },
          {
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            force3D: true,
          },
          0
        )
      }

      if (panels[0]) {
        introTl.fromTo(
          panels[0],
          { autoAlpha: 0, y: 38 },
          { autoAlpha: 1, y: 0, ease: 'none', force3D: true },
          0
        )
      }

      if (overlaysTop[0]) {
        introTl.fromTo(
          overlaysTop[0],
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: 'none', force3D: true },
          0.06
        )
      }

      if (overlaysBot[0]) {
        introTl.fromTo(
          overlaysBot[0],
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: 'none', force3D: true },
          0.06
        )
      }

      if (footerRef.current) {
        introTl.fromTo(
          footerRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, ease: 'none', force3D: true },
          0.06
        )
      }

      // Breadcrumb updater (Pure DOM style update: zero React setState, zero re-renders)
      let currentActiveCrumb = -1
      const updateBreadcrumbs = (activeIndex: number) => {
        if (activeIndex === currentActiveCrumb) return
        currentActiveCrumb = activeIndex
        crumbs.forEach((btn, idx) => {
          const dot = btn.querySelector<HTMLElement>('.process-crumb-dot')
          if (idx === activeIndex) {
            btn.style.borderColor = 'rgba(200, 169, 110, 0.9)'
            btn.style.backgroundColor = 'rgba(200, 169, 110, 0.1)'
            btn.style.color = '#F0ECE4'
            if (dot) dot.style.backgroundColor = '#C8A96E'
          } else {
            btn.style.borderColor = 'rgba(255, 255, 255, 0.08)'
            btn.style.backgroundColor = 'transparent'
            btn.style.color = 'rgba(240, 236, 228, 0.4)'
            if (dot) dot.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          }
        })
      }

      updateBreadcrumbs(0)

      // ── MASTER CONTINUOUS TIMELINE ──────────────────────────────────────────
      // Total duration = 4.0 units
      // Continuous camera motion runs from 0.0 to 4.0 without any pauses or dead zones.
      // Stage text cross-fades naturally across this underlying continuous motion.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: true, // Direct 1:1 scroll responsiveness (instant, zero catch-up lag)
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
            const stage = p < 0.25 ? 0 : p < 0.50 ? 1 : p < 0.75 ? 2 : 3
            updateBreadcrumbs(stage)
          },
        },
      })

      // 1. CONTINUOUS CAMERA SCALE & DRIFT (0.0 -> 4.0, zero dead zones)
      if (img) {
        tl.fromTo(
          img,
          {
            scale: 1.03,
            x: 0,
            y: 0,
            force3D: true,
          },
          {
            scale: 1.19,
            x: -14,
            y: 8,
            duration: 4.0,
            ease: 'none',
            force3D: true,
          },
          0
        )
      }

      // 2. CONTINUOUS SPECULAR SHEEN SWEEP (0.0 -> 4.0)
      if (sheen) {
        tl.fromTo(
          sheen,
          {
            xPercent: -80,
            opacity: 0.20,
            force3D: true,
          },
          {
            xPercent: 95,
            opacity: 0.88,
            duration: 4.0,
            ease: 'none',
            force3D: true,
          },
          0
        )
      }

      // 3. CONTINUOUS PROGRESS BAR FILL (0.0 -> 4.0)
      if (bar) {
        tl.fromTo(
          bar,
          { scaleX: 0.05, transformOrigin: 'left center', force3D: true },
          { scaleX: 1.0, duration: 4.0, ease: 'none', force3D: true },
          0
        )
      }

      // 4. STAGE TEXT CROSS-FADES (Overlaying the continuous camera motion)
      // Transition 1 -> 2: CLEAN exits (0.75 -> 1.05), CORRECT enters (0.90 -> 1.20)
      if (panels[0]) {
        tl.to(panels[0], { autoAlpha: 0, y: -28, duration: 0.30, ease: 'power1.inOut', force3D: true }, 0.75)
      }
      if (overlaysTop[0]) {
        tl.to(overlaysTop[0], { autoAlpha: 0, duration: 0.25, ease: 'power1.inOut', force3D: true }, 0.75)
      }
      if (overlaysBot[0]) {
        tl.to(overlaysBot[0], { autoAlpha: 0, duration: 0.25, ease: 'power1.inOut', force3D: true }, 0.75)
      }

      if (panels[1]) {
        tl.fromTo(
          panels[1],
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.30, ease: 'power1.out', force3D: true },
          0.90
        )
      }
      if (overlaysTop[1]) {
        tl.fromTo(
          overlaysTop[1],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: 'power1.out', force3D: true },
          0.90
        )
      }
      if (overlaysBot[1]) {
        tl.fromTo(
          overlaysBot[1],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: 'power1.out', force3D: true },
          0.90
        )
      }

      // Transition 2 -> 3: CORRECT exits (1.75 -> 2.05), PROTECT enters (1.90 -> 2.20)
      if (panels[1]) {
        tl.to(panels[1], { autoAlpha: 0, y: -28, duration: 0.30, ease: 'power1.inOut', force3D: true }, 1.75)
      }
      if (overlaysTop[1]) {
        tl.to(overlaysTop[1], { autoAlpha: 0, duration: 0.25, ease: 'power1.inOut', force3D: true }, 1.75)
      }
      if (overlaysBot[1]) {
        tl.to(overlaysBot[1], { autoAlpha: 0, duration: 0.25, ease: 'power1.inOut', force3D: true }, 1.75)
      }

      if (panels[2]) {
        tl.fromTo(
          panels[2],
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.30, ease: 'power1.out', force3D: true },
          1.90
        )
      }
      if (overlaysTop[2]) {
        tl.fromTo(
          overlaysTop[2],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: 'power1.out', force3D: true },
          1.90
        )
      }
      if (overlaysBot[2]) {
        tl.fromTo(
          overlaysBot[2],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: 'power1.out', force3D: true },
          1.90
        )
      }

      // Transition 3 -> 4: PROTECT exits (2.75 -> 3.05), PERFECT enters (2.90 -> 3.20)
      if (panels[2]) {
        tl.to(panels[2], { autoAlpha: 0, y: -28, duration: 0.30, ease: 'power1.inOut', force3D: true }, 2.75)
      }
      if (overlaysTop[2]) {
        tl.to(overlaysTop[2], { autoAlpha: 0, duration: 0.25, ease: 'power1.inOut', force3D: true }, 2.75)
      }
      if (overlaysBot[2]) {
        tl.to(overlaysBot[2], { autoAlpha: 0, duration: 0.25, ease: 'power1.inOut', force3D: true }, 2.75)
      }

      if (panels[3]) {
        tl.fromTo(
          panels[3],
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.30, ease: 'power1.out', force3D: true },
          2.90
        )
      }
      if (overlaysTop[3]) {
        tl.fromTo(
          overlaysTop[3],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: 'power1.out', force3D: true },
          2.90
        )
      }
      if (overlaysBot[3]) {
        tl.fromTo(
          overlaysBot[3],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: 'power1.out', force3D: true },
          2.90
        )
      }

      // Hold stage 4 comfortably before unpinning (3.20 -> 4.0)
      tl.to({}, { duration: 0.80 }, 3.20)

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smooth click jump to stage position
  const handleJumpToStage = (stageIdx: number) => {
    if (!sectionRef.current) return
    const triggers = ScrollTrigger.getAll()
    const pinTrigger = triggers.find((t) => t.trigger === sectionRef.current && (t.pin || t.vars.pin))

    if (pinTrigger) {
      const targetRatios = [0.05, 0.35, 0.65, 0.95]
      const targetRatio = targetRatios[stageIdx]
      const targetScroll = pinTrigger.start + targetRatio * (pinTrigger.end - pinTrigger.start)
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full bg-[#08090A] text-[#F0ECE4] border-t border-white/[0.08] overflow-x-clip"
    >
      {/* Architectural Grid Texture Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F0ECE4 1px, transparent 1px), linear-gradient(to bottom, #F0ECE4 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      {/* Desktop Pinned Viewport Container */}
      <div
        ref={pinnedWrapperRef}
        className="relative w-full min-h-screen lg:h-screen lg:max-h-[1080px] flex flex-col justify-between overflow-visible lg:overflow-hidden px-5 sm:px-8 lg:px-14 xl:px-20 pt-24 sm:pt-28 pb-6 sm:pb-8"
      >
        {/* 1. TOP METADATA & PROTOCOL BAR (Persistent Chrome) */}
        <header ref={headerRef} className="relative z-30 flex items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-6 sm:w-8 h-px bg-[#C8A96E]" />
            <span className="font-mono text-xs sm:text-[13px] text-[#C8A96E] uppercase tracking-[0.24em] font-semibold">
              01 / The Process
            </span>
            <span className="hidden md:inline font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest pl-2">
              // MORE THAN A DETAIL
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
            <span className="hidden sm:inline">Austin Studio Specification</span>
            <span className="text-[#C8A96E]/60">//</span>
            <span>Stages 01 - 04</span>
          </div>
        </header>

        {/* 2. MAIN EDITORIAL ARENA: TYPOGRAPHY (LEFT) + DOMINANT PHOTO (RIGHT) */}
        <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center my-4 sm:my-6">

          {/* Left Column (5 Cols): Staged Editorial Typography Panels */}
          <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex flex-col justify-center">

            {/* Statically rendered panels: GSAP controls visibility via autoAlpha */}
            <div className="relative w-full h-full min-h-[380px] flex items-center">
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.number}
                  className="process-stage-panel absolute inset-0 flex flex-col justify-center will-change-transform"
                  style={{
                    visibility: idx === 0 ? 'visible' : 'hidden',
                    opacity: idx === 0 ? 1 : 0,
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Eyebrow: Number + Active Metric */}
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="font-mono text-sm sm:text-base tracking-[0.22em] text-[#C8A96E] font-medium">
                      STAGE {stage.number}
                    </span>
                    <div className="w-5 h-px bg-white/20" />
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-white/50">
                      {stage.metric}
                    </span>
                  </div>

                  {/* Massive Stage Headline */}
                  <h2 className="font-display text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-[#F0ECE4] leading-[0.92]">
                    {stage.title}
                  </h2>

                  {/* Subtitle in Warm Gold */}
                  <div className="mt-3 sm:mt-4 flex items-center gap-3">
                    <div className="w-8 h-px bg-[#C8A96E]" />
                    <h3 className="font-display text-xs sm:text-sm lg:text-base tracking-wider uppercase text-[#C8A96E] font-medium">
                      {stage.subtitle}
                    </h3>
                  </div>

                  {/* Body Narrative */}
                  <p className="mt-4 sm:mt-5 font-body text-sm sm:text-base lg:text-[1.05rem] text-[#A0A4AB] font-light leading-relaxed max-w-lg">
                    {stage.description}
                  </p>

                  {/* Lower Technical Telemetry Line */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
                    <span>Standard: {stage.spec}</span>
                    <span className="text-[#C8A96E]">Est. Austin TX</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (7 Cols): Dominant Studio Photographic Visual Portal */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center">
            <div ref={photoPortalRef} className="relative w-full h-[45vh] sm:h-[52vh] lg:h-[62vh] xl:h-[68vh] max-h-[720px] bg-[#0E1013] border border-white/[0.09] overflow-hidden shadow-2xl">

              {/* Hardware Accelerated Image Frame */}
              <div
                className="w-full h-full relative overflow-hidden will-change-transform"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Primary High-Resolution Automotive Lacquer Photograph */}
                <img
                  ref={imgRef}
                  src={DETAIL_IMAGE}
                  alt="Blackline automotive clear coat optical inspection detail"
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover object-center will-change-transform select-none pointer-events-none"
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                />

                {/* Moving Specular Reflection Sheen Gradient */}
                <div
                  ref={sheenRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 will-change-transform"
                  style={{
                    background:
                      'linear-gradient(115deg, transparent 15%, rgba(200, 169, 110, 0.08) 38%, rgba(255, 255, 255, 0.28) 50%, rgba(200, 169, 110, 0.06) 62%, transparent 85%)',
                    mixBlendMode: 'screen',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                />
              </div>

              {/* Edge Vignette Masks: Seamless blend into dark surroundings */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(8,9,10,0.85) 0%, transparent 20%, transparent 80%, rgba(8,9,10,0.92) 100%), linear-gradient(to right, rgba(8,9,10,0.7) 0%, transparent 16%, transparent 84%, rgba(8,9,10,0.7) 100%)',
                }}
              />

              {/* Telemetry Overlays in Image Corners (4 static overlays, GSAP cross-fades autoAlpha) */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between pointer-events-none z-20">
                <div className="relative w-full">
                  {STAGES.map((stg, i) => (
                    <div
                      key={stg.number}
                      className="process-telemetry-top flex items-center justify-between w-full will-change-transform pointer-events-none"
                      style={{
                        visibility: i === 0 ? 'visible' : 'hidden',
                        opacity: i === 0 ? 1 : 0,
                        position: i === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#F0ECE4]/90 uppercase">
                          {stg.telemetry}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
                        FIG. 01.{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Technical Watermark inside Image (4 static overlays, GSAP cross-fades autoAlpha) */}
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 pointer-events-none z-20">
                <div className="pt-2.5 sm:pt-3 border-t border-white/20 relative w-full">
                  {STAGES.map((stg, i) => (
                    <div
                      key={stg.number}
                      className="process-telemetry-bottom flex flex-col sm:flex-row sm:items-center justify-between gap-1 will-change-transform pointer-events-none"
                      style={{
                        visibility: i === 0 ? 'visible' : 'hidden',
                        opacity: i === 0 ? 1 : 0,
                        position: i === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <span className="font-mono text-[10px] sm:text-[11px] text-[#F0ECE4] tracking-wide uppercase font-medium">
                        {stg.spec}
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider uppercase">
                        5600K Studio Reflection Study
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3. BOTTOM BREADCRUMBS & CHOREOGRAPHY TRACKER (Persistent Chrome) */}
        <footer ref={footerRef} className="relative z-30 pt-4 sm:pt-5 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Interactive Stage Breadcrumbs */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {STAGES.map((stg, idx) => (
                <button
                  key={stg.number}
                  type="button"
                  onClick={() => handleJumpToStage(idx)}
                  className={`process-breadcrumb-btn font-mono text-[10px] sm:text-[11px] tracking-wider uppercase px-2.5 sm:px-3 py-1.5 border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    idx === 0
                      ? 'border-[#C8A96E]/90 bg-[#C8A96E]/10 text-[#F0ECE4]'
                      : 'border-white/[0.08] hover:border-white/20 text-white/40 hover:text-white/70'
                  }`}
                >
                  <span
                    className={`process-crumb-dot w-1 h-1 rounded-full ${
                      idx === 0 ? 'bg-[#C8A96E]' : 'bg-white/30'
                    }`}
                  />
                  <span>{stg.number} {stg.title}</span>
                </button>
              ))}
            </div>

            {/* Protocol Signature & Progress Line */}
            <div className="flex items-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
              <span className="hidden md:inline">Blackline Protocol: Handcrafted Austin TX</span>

              {/* Progress hairline track */}
              <div className="w-24 sm:w-32 h-[2px] bg-white/[0.1] relative overflow-hidden rounded-full">
                <div
                  ref={progressBarRef}
                  className="absolute inset-y-0 left-0 bg-[#C8A96E] w-full will-change-transform"
                  style={{
                    transform: 'scaleX(0.05)',
                    transformOrigin: 'left center',
                  }}
                />
              </div>
            </div>

          </div>
        </footer>

      </div>
    </section>
  )
}
