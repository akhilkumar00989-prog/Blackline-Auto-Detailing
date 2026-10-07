/**
 * BLACKLINE — Navigation
 *
 * Transparent on hero, transitions to dark + blur on scroll.
 * Mobile: fullscreen overlay with large type + staggered GSAP entrance.
 *
 * Scroll state: CSS class toggle via ScrollTrigger (no useState for scroll pos).
 * Mobile open/close: GSAP autoAlpha for enter/exit animation.
 * Keyboard: Escape closes menu. Body scroll locked when open.
 * Accessibility: aria-expanded, aria-label, focus management.
 */

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { Button } from '../ui'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const navRef     = useRef<HTMLElement>(null)
  const menuRef    = useRef<HTMLDivElement>(null)
  const menuTl     = useRef<ReturnType<typeof gsap.timeline> | null>(null)

  // ── Scroll detection via ScrollTrigger ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 72,
        onEnter:     () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
      })
    })
    return () => ctx.revert()
  }, [])

  // ── Nav entrance animation ───────────────────────────────────────────────
  useEffect(() => {
    if (!navRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.nav-brand',   { opacity: 0, y: -10, duration: 0.5 }, 0.1)
      tl.from('.nav-link',    { opacity: 0, y: -10, stagger: 0.06, duration: 0.45 }, 0.2)
      tl.from('.nav-cta',     { opacity: 0, y: -10, duration: 0.4 }, 0.42)
      tl.from('.nav-burger',  { opacity: 0, duration: 0.35 }, 0.3)
    }, navRef)

    return () => ctx.revert()
  }, [])

  // ── Initialize mobile menu as invisible ─────────────────────────────────
  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { autoAlpha: 0 })
    }
  }, [])

  // ── Mobile menu GSAP animation ──────────────────────────────────────────
  useEffect(() => {
    if (!menuRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (menuOpen) {
      if (menuTl.current) menuTl.current.kill()

      if (reduced) {
        gsap.set(menuRef.current, { autoAlpha: 1 })
      } else {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        menuTl.current = tl

        tl.set(menuRef.current, { autoAlpha: 1 })
        tl.from(menuRef.current, { opacity: 0, duration: 0.25 }, 0)
        tl.from('.mobile-nav-link', {
          x: -32, opacity: 0, stagger: 0.07, duration: 0.55,
        }, 0.05)
        tl.from('.mobile-nav-cta', { y: 20, opacity: 0, duration: 0.45 }, 0.32)
        tl.from('.mobile-nav-meta', { opacity: 0, duration: 0.4 }, 0.38)
      }
    } else {
      if (menuTl.current) menuTl.current.kill()

      if (reduced) {
        gsap.set(menuRef.current, { autoAlpha: 0 })
      } else {
        gsap.to(menuRef.current, {
          opacity: 0, duration: 0.25, ease: 'power2.in',
          onComplete: () => {
            if (menuRef.current) gsap.set(menuRef.current, { autoAlpha: 0 })
          },
        })
      }
    }
  }, [menuOpen])

  // ── Keyboard + body scroll lock ─────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Desktop + Mobile header bar ─────────────────────────── */}
      <header
        ref={navRef}
        className={`bl-nav${isScrolled ? ' is-scrolled' : ''}`}
        role="banner"
      >
        <div
          style={{
            maxWidth: 'var(--bl-content-full)',
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 5vw, 4rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Brand wordmark */}
          <a
            href="/"
            className="nav-brand"
            aria-label="Blackline Auto Detailing — home"
            style={{
              fontFamily: 'var(--bl-font-display)',
              fontSize: 'var(--bl-text-sm)',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--bl-text)',
              flexShrink: 0,
            }}
          >
            BLACKLINE
          </a>

          {/* Desktop nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-9"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link bl-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="nav-cta hidden md:block">
            <Button
              variant="secondary"
              size="sm"
              as="a"
              href="#contact"
            >
              Book Your Detail
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className={`nav-burger bl-hamburger md:hidden${menuOpen ? ' is-open' : ''}`}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ──────────────────────────────── */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="bl-mobile-menu md:hidden"
      >
        {/* Subtle image texture — hero car very faint in corner */}
        <img
          src="/images/hero-car.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '70%',
            height: '70%',
            objectFit: 'cover',
            objectPosition: 'left center',
            opacity: 0.06,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* Close button (top right) */}
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: '1px solid var(--bl-border-soft)',
            color: 'var(--bl-text)',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: '0.6875rem',
              fontFamily: 'var(--bl-font-mono)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--bl-accent)',
              marginBottom: '2rem',
            }}
            className="mobile-nav-link"
          >
            Navigation
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link bl-mobile-nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom: CTA + meta */}
        <div
          className="mobile-nav-cta"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Button
            variant="primary"
            size="lg"
            as="a"
            href="#contact"
            onClick={closeMenu}
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            Book Your Detail
          </Button>

          <div
            className="mobile-nav-meta"
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--bl-font-mono)',
                fontSize: '0.75rem',
                color: 'var(--bl-text-muted)',
                letterSpacing: '0.12em',
              }}
            >
              Austin, TX
            </span>
            <span
              style={{
                width: 1,
                height: '0.8em',
                background: 'var(--bl-border-soft)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--bl-font-mono)',
                fontSize: '0.75rem',
                color: 'var(--bl-text-muted)',
                letterSpacing: '0.12em',
              }}
            >
              Est. 2018
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
