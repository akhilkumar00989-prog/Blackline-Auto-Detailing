/**
 * BLACKLINE AUTO DETAILING - Premium Footer Section (Stage 5F)
 *
 * Visual Direction:
 *   - Minimal, premium automotive-studio footer as the natural ending of the website.
 *   - Quiet, confident atmosphere after the high-energy Booking CTA.
 *   - Near-black canvas (#060709), thin hairline borders (border-white/[0.08]).
 *   - Prominent architectural BLACKLINE wordmark marque.
 *   - Semantic footer and navigation markup with keyboard accessibility.
 *   - Direct contact links: tel:, mailto:, and anchored navigation.
 *   - Zero em-dashes in code, text, or comments.
 */

import { ArrowRight, MapPin, Clock, Phone, Mail } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'HOME',     href: '#hero'     },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROCESS',  href: '#process'  },
  { label: 'WORK',     href: '#work'     },
  { label: 'ABOUT',    href: '#about'    },
  { label: 'CONTACT',  href: '#contact'  },
]

export function FooterSection() {
  const handleScrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer
      id="footer"
      aria-label="Blackline Auto Detailing Footer"
      className="site-footer relative w-full bg-[#060709] text-[#F0ECE4] border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background Architectural Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F0ECE4 1px, transparent 1px), linear-gradient(to bottom, #F0ECE4 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-8">

        {/* ── UPPER FOOTER: BRAND + NAVIGATION + DIRECT ACTION ──────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-16 pb-14 sm:pb-16 border-b border-white/[0.08]">

          {/* Brand Identity & Tagline */}
          <div className="flex flex-col items-start max-w-sm">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                handleScrollTo('#hero')
              }}
              className="group inline-flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase text-[#F0ECE4] group-hover:text-white transition-colors">
                BLACKLINE
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#C8A96E] uppercase tracking-[0.28em] font-medium mt-1">
                Auto Detailing
              </span>
            </a>

            <p className="font-mono text-xs text-[#8A8A8A] uppercase tracking-[0.16em] mt-4">
              Your Car. Our Obsession.
            </p>

            <div className="flex items-center gap-2 mt-4 font-mono text-[10px] text-white/40 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
              <span>Austin Studio // Est. 2018</span>
            </div>
          </div>

          {/* Semantic Site Navigation */}
          <nav aria-label="Footer Quick Navigation" className="flex flex-col justify-start">
            <span className="font-mono text-[10px] text-[#C8A96E] uppercase tracking-[0.24em] font-medium mb-4 block">
              Navigation
            </span>

            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollTo(item.href)
                    }}
                    className="font-mono text-xs text-[#8A8A8A] uppercase tracking-[0.16em] hover:text-[#F0ECE4] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Primary Footer Action */}
          <div className="flex flex-col items-start lg:items-end justify-between">
            <span className="font-mono text-[10px] text-[#C8A96E] uppercase tracking-[0.24em] font-medium mb-4 block lg:text-right">
              Commission Handover
            </span>

            <a
              href="mailto:hello@blacklineauto.com?subject=Booking%20Inquiry%20-%20Blackline%20Auto"
              className="group inline-flex items-center justify-between gap-4 px-6 py-4 bg-transparent border border-white/[0.14] text-[#F0ECE4] font-mono text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:border-[#C8A96E] hover:text-[#C8A96E] hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]"
            >
              <span>Book Your Detail</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-3 lg:text-right">
              Austin, Texas
            </span>
          </div>

        </div>

        {/* ── MIDDLE FOOTER: STUDIO CONTACT & OPERATIONS METADATA ──────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-10 sm:py-12 border-b border-white/[0.08]">

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="w-3.5 h-3.5 text-[#C8A96E] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                Studio Location
              </span>
              <p className="font-mono text-xs text-[#F0ECE4] uppercase tracking-wider mt-1">
                Austin, Texas
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3">
            <Clock className="w-3.5 h-3.5 text-[#C8A96E] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                Operating Hours
              </span>
              <p className="font-mono text-xs text-[#F0ECE4] uppercase tracking-wider mt-1">
                Mon-Sat / 8am-6pm
              </p>
            </div>
          </div>

          {/* Direct Line */}
          <div className="flex items-start gap-3">
            <Phone className="w-3.5 h-3.5 text-[#C8A96E] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                Direct Line
              </span>
              <a
                href="tel:5125550187"
                className="font-mono text-xs text-[#F0ECE4] uppercase tracking-wider mt-1 block hover:text-[#C8A96E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]"
              >
                (512) 555-0187
              </a>
            </div>
          </div>

          {/* Inquiries */}
          <div className="flex items-start gap-3">
            <Mail className="w-3.5 h-3.5 text-[#C8A96E] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">
                Studio Inquiries
              </span>
              <a
                href="mailto:hello@blacklineauto.com"
                className="font-mono text-xs text-[#F0ECE4] tracking-wider mt-1 block hover:text-[#C8A96E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96E]"
              >
                hello@blacklineauto.com
              </a>
            </div>
          </div>

        </div>

        {/* ── LOWER FOOTER: ARCHITECTURAL WORDMARK MARQUE ──────────────────── */}
        <div className="pt-8 sm:pt-10 overflow-hidden select-none pointer-events-none">
          <div
            aria-hidden="true"
            className="w-full text-center font-display font-black uppercase tracking-tight text-white/[0.035] leading-none text-[13.5vw] sm:text-[14vw] whitespace-nowrap"
          >
            BLACKLINE
          </div>
        </div>

        {/* ── BOTTOM LEGAL & METADATA BAR ────────────────────────────────────── */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] text-[#8A8A8A] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 border border-[#C8A96E]" />
            <span>&copy; 2026 Blackline Auto Detailing</span>
          </div>

          <div>
            <span>Austin, Texas</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
