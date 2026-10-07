/**
 * BLACKLINE AUTO DETAILING - Selected Work Section (Stage 5A)
 *
 * Visual Direction:
 *   - Editorial luxury automotive photography spreads (no cards, no portfolio grids).
 *   - Section eyebrow: "03 / SELECTED WORK"
 *   - Section headline: "THE FINISH / SPEAKS."
 *   - Supporting copy: "A selection of vehicles refined, corrected, and protected to the BLACKLINE standard."
 *   - 3 Curated Vehicle Categories (Customer-Facing & Premium):
 *       01 SEDAN  / PAINT CORRECTION   / AUSTIN, TEXAS
 *       02 SUV    / CERAMIC COATING    / AUSTIN, TEXAS
 *       03 TRUCK  / SIGNATURE DETAIL   / AUSTIN, TEXAS
 *   - Visually distinct vehicle photography: premium sedan, luxury SUV, performance pickup truck.
 *   - Asymmetric image and typography composition: large dominant photography areas,
 *     metadata positioned around the image, generous negative space, thin separators.
 *   - Responsive: stacks cleanly on mobile without horizontal overflow or card aesthetics.
 */


interface ProjectItem {
  id: string
  number: string
  vehicle: string
  service: string
  location: string
  description: string
  metadata: string
  caption: string
  fig: string
  image: string
  imageAlt: string
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'sedan-paint-correction',
    number: '01',
    vehicle: 'SEDAN',
    service: 'PAINT CORRECTION',
    location: 'AUSTIN, TEXAS',
    description:
      'Restore depth, clarity and gloss with precision machine polishing designed to eliminate swirls, oxidation and surface imperfections.',
    metadata: 'PRECISION PAINT REFINEMENT // SWIRL REMOVAL',
    caption: 'PAINT CORRECTION / STUDIO FINISH',
    fig: 'FIG 03.1',
    image: '/images/work-sedan.jpg',
    imageAlt: 'Premium black sedan after precision paint correction in Austin studio',
  },
  {
    id: 'suv-ceramic-coating',
    number: '02',
    vehicle: 'SUV',
    service: 'CERAMIC COATING',
    location: 'AUSTIN, TEXAS',
    description:
      'Long-term protection with a deep gloss finish, extreme hydrophobicity and easier maintenance.',
    metadata: 'LONG-TERM PROTECTION // HIGH-GLOSS FINISH',
    caption: 'CERAMIC PROTECTION / HIGH-GLOSS FINISH',
    fig: 'FIG 03.2',
    image: '/images/work-suv.jpg',
    imageAlt: 'Luxury black SUV showcasing high-gloss ceramic coating protection in Austin studio',
  },
  {
    id: 'truck-signature-detail',
    number: '03',
    vehicle: 'TRUCK',
    service: 'SIGNATURE DETAIL',
    location: 'AUSTIN, TEXAS',
    description:
      'A complete exterior and interior detail designed to restore the vehicle\'s finish and presence.',
    metadata: 'COMPLETE RESTORATION // EXTERIOR + INTERIOR',
    caption: 'SIGNATURE DETAIL / COMPLETE RESTORATION',
    fig: 'FIG 03.3',
    image: '/images/work-truck.jpg',
    imageAlt: 'Performance black pickup truck fully detailed in Austin studio',
  },
]

export function WorkSection() {
  return (
    <section
      id="work"
      className="relative w-full overflow-x-clip bg-[#08090A] text-[#F0ECE4] pt-20 pb-28 sm:pt-28 sm:pb-36 md:pt-36 md:pb-44 lg:pt-40 lg:pb-52 border-t border-white/[0.08]"
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
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-6 sm:w-8 h-px bg-[#C8A96E]" />
            <span className="font-mono text-xs text-[#C8A96E] uppercase tracking-[0.22em] font-medium">
              03 / Selected Work
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
            <span className="hidden sm:inline">Austin Studio Archive</span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span>Vehicle Categories</span>
          </div>
        </div>

        {/* ── HEADLINE & NARRATIVE (Asymmetric Split) ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-10 sm:pt-16 pb-16 sm:pb-24 lg:pb-32 items-end">
          {/* Dominant Section Headline */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-bold uppercase tracking-tight text-[#F0ECE4] leading-[0.92]">
              <span className="block">THE FINISH</span>
              <span className="block text-white/90">SPEAKS.</span>
            </h2>
          </div>

          {/* Supporting Narrative Copy */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="w-10 sm:w-12 h-px bg-[#C8A96E]/60 mb-5 sm:mb-6" />
            <p className="font-body text-base sm:text-lg lg:text-xl text-[#F0ECE4] font-medium leading-snug mb-2 sm:mb-3">
              A selection of vehicles refined, corrected, and protected to the BLACKLINE standard.
            </p>
            <p className="font-body text-sm sm:text-base lg:text-lg text-[#8A8A8A] font-light leading-relaxed">
              Every category receives tailored surface preparation, precision paint refinement, and durable protective coatings.
            </p>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
              <span>Standard: Absolute Clarity</span>
              <span className="text-[#C8A96E]">Client Portfolio</span>
            </div>
          </div>
        </div>

        {/* ── EDITORIAL PHOTOGRAPHY SPREADS ──────────────────────────────────── */}
        <div className="divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">

          {/* ── SPREAD 01: SEDAN (Dominant Widescreen Spread) ────────────────── */}
          <article className="py-16 sm:py-24 lg:py-28 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">

              {/* Dominant Photography Portal */}
              <div className="lg:col-span-7 relative overflow-hidden bg-[#0E1013] border border-white/[0.08] aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] brightness-[0.92] contrast-[1.05]"
                />

                {/* Dark Vignette Gradients */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(8,9,10,0.7) 0%, transparent 20%, transparent 80%, rgba(8,9,10,0.85) 100%), linear-gradient(to right, rgba(8,9,10,0.5) 0%, transparent 15%, transparent 85%, rgba(8,9,10,0.5) 100%)',
                  }}
                />

                {/* Top Overlay HUD Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#F0ECE4]/90 uppercase">
                      Studio Detail
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
                    {PROJECTS[0].fig}
                  </span>
                </div>

                {/* Bottom Customer-Facing Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10">
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#F0ECE4] tracking-wide uppercase">
                      {PROJECTS[0].caption}
                    </span>
                    <span className="font-mono text-[9px] text-[#C8A96E] tracking-wider uppercase hidden sm:inline">
                      Austin, TX
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Typography & Metadata Column */}
              <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
                <div>
                  {/* Row Identifier & Location */}
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-white/[0.08] mb-6">
                    <span className="font-mono text-sm sm:text-base tracking-[0.2em] text-[#C8A96E] font-medium">
                      {PROJECTS[0].number}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#8A8A8A] uppercase">
                      {PROJECTS[0].location}
                    </span>
                  </div>

                  {/* Vehicle Heading */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F0ECE4] group-hover:text-white transition-colors duration-200 mb-2">
                    {PROJECTS[0].vehicle}
                  </h3>

                  {/* Service Badge */}
                  <div className="inline-block font-mono text-xs sm:text-sm tracking-wider uppercase text-[#C8A96E] mb-5 sm:mb-6">
                    {PROJECTS[0].service}
                  </div>

                  {/* Narrative Body */}
                  <p className="font-body text-xs sm:text-sm lg:text-base text-[#8A8A8A] leading-relaxed font-light mb-6 sm:mb-8">
                    {PROJECTS[0].description}
                  </p>
                </div>

                {/* Bottom Meta & Action Cue */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-white/50 uppercase">
                    {PROJECTS[0].metadata}
                  </span>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#C8A96E] uppercase tracking-wider hover:text-white transition-colors duration-200 shrink-0 group/link"
                    aria-label={`Inquire about ${PROJECTS[0].vehicle} detailing service`}
                  >
                    <span>INQUIRE</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>

            </div>
          </article>

          {/* ── SPREAD 02: SUV (Reversed Asymmetric Spread) ──────────────────── */}
          <article className="py-16 sm:py-24 lg:py-28 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">

              {/* Editorial Typography & Metadata Column (Desktop: Left) */}
              <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between self-stretch">
                <div>
                  {/* Row Identifier & Location */}
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-white/[0.08] mb-6">
                    <span className="font-mono text-sm sm:text-base tracking-[0.2em] text-[#C8A96E] font-medium">
                      {PROJECTS[1].number}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#8A8A8A] uppercase">
                      {PROJECTS[1].location}
                    </span>
                  </div>

                  {/* Vehicle Heading */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F0ECE4] group-hover:text-white transition-colors duration-200 mb-2">
                    {PROJECTS[1].vehicle}
                  </h3>

                  {/* Service Badge */}
                  <div className="inline-block font-mono text-xs sm:text-sm tracking-wider uppercase text-[#C8A96E] mb-5 sm:mb-6">
                    {PROJECTS[1].service}
                  </div>

                  {/* Narrative Body */}
                  <p className="font-body text-xs sm:text-sm lg:text-base text-[#8A8A8A] leading-relaxed font-light mb-6 sm:mb-8">
                    {PROJECTS[1].description}
                  </p>
                </div>

                {/* Bottom Meta & Action Cue */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-white/50 uppercase">
                    {PROJECTS[1].metadata}
                  </span>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#C8A96E] uppercase tracking-wider hover:text-white transition-colors duration-200 shrink-0 group/link"
                    aria-label={`Inquire about ${PROJECTS[1].vehicle} detailing service`}
                  >
                    <span>INQUIRE</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>

              {/* Dominant Photography Portal (Desktop: Right) */}
              <div className="order-1 lg:order-2 lg:col-span-7 relative overflow-hidden bg-[#0E1013] border border-white/[0.08] aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={PROJECTS[1].image}
                  alt={PROJECTS[1].imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] brightness-[0.92] contrast-[1.08]"
                />

                {/* Dark Vignette Gradients */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(8,9,10,0.7) 0%, transparent 20%, transparent 80%, rgba(8,9,10,0.85) 100%), linear-gradient(to right, rgba(8,9,10,0.5) 0%, transparent 15%, transparent 85%, rgba(8,9,10,0.5) 100%)',
                  }}
                />

                {/* Top Overlay HUD Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#F0ECE4]/90 uppercase">
                      Studio Detail
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
                    {PROJECTS[1].fig}
                  </span>
                </div>

                {/* Bottom Customer-Facing Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10">
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#F0ECE4] tracking-wide uppercase">
                      {PROJECTS[1].caption}
                    </span>
                    <span className="font-mono text-[9px] text-[#C8A96E] tracking-wider uppercase hidden sm:inline">
                      Austin, TX
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </article>

          {/* ── SPREAD 03: TRUCK (Panoramic Cinema Spread) ───────────────────── */}
          <article className="py-16 sm:py-24 lg:py-28 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">

              {/* Dominant Photography Portal */}
              <div className="lg:col-span-7 relative overflow-hidden bg-[#0E1013] border border-white/[0.08] aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={PROJECTS[2].image}
                  alt={PROJECTS[2].imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] brightness-[0.90] contrast-[1.05]"
                />

                {/* Dark Vignette Gradients */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(8,9,10,0.7) 0%, transparent 20%, transparent 80%, rgba(8,9,10,0.85) 100%), linear-gradient(to right, rgba(8,9,10,0.5) 0%, transparent 15%, transparent 85%, rgba(8,9,10,0.5) 100%)',
                  }}
                />

                {/* Top Overlay HUD Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#F0ECE4]/90 uppercase">
                      Studio Detail
                    </span>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
                    {PROJECTS[2].fig}
                  </span>
                </div>

                {/* Bottom Customer-Facing Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10">
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#F0ECE4] tracking-wide uppercase">
                      {PROJECTS[2].caption}
                    </span>
                    <span className="font-mono text-[9px] text-[#C8A96E] tracking-wider uppercase hidden sm:inline">
                      Austin, TX
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Typography & Metadata Column */}
              <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
                <div>
                  {/* Row Identifier & Location */}
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-white/[0.08] mb-6">
                    <span className="font-mono text-sm sm:text-base tracking-[0.2em] text-[#C8A96E] font-medium">
                      {PROJECTS[2].number}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#8A8A8A] uppercase">
                      {PROJECTS[2].location}
                    </span>
                  </div>

                  {/* Vehicle Heading */}
                  <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#F0ECE4] group-hover:text-white transition-colors duration-200 mb-2">
                    {PROJECTS[2].vehicle}
                  </h3>

                  {/* Service Badge */}
                  <div className="inline-block font-mono text-xs sm:text-sm tracking-wider uppercase text-[#C8A96E] mb-5 sm:mb-6">
                    {PROJECTS[2].service}
                  </div>

                  {/* Narrative Body */}
                  <p className="font-body text-xs sm:text-sm lg:text-base text-[#8A8A8A] leading-relaxed font-light mb-6 sm:mb-8">
                    {PROJECTS[2].description}
                  </p>
                </div>

                {/* Bottom Meta & Action Cue */}
                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-white/50 uppercase">
                    {PROJECTS[2].metadata}
                  </span>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#C8A96E] uppercase tracking-wider hover:text-white transition-colors duration-200 shrink-0 group/link"
                    aria-label={`Inquire about ${PROJECTS[2].vehicle} detailing service`}
                  >
                    <span>INQUIRE</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>

            </div>
          </article>

        </div>

        {/* ── BOTTOM EDITORIAL SIGNATURE STRIP ───────────────────────────────── */}
        <div className="mt-16 sm:mt-24 lg:mt-32 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-[#8A8A8A] uppercase tracking-wider">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-1.5 h-1.5 border border-[#C8A96E] shrink-0" />
            <span className="break-words">
              Austin Studio Archive: Every Vehicle Handcrafted to the Highest Standard
            </span>
          </div>
          <div>
            <span>30°16′02″N 97°44′35″W / Austin, Texas</span>
          </div>
        </div>

      </div>
    </section>
  )
}
