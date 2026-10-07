/**
 * BLACKLINE AUTO DETAILING - App root
 *
 * GSAP plugins registered in lib/gsap.ts.
 */

import { useEffect }        from 'react'
import { Navigation }      from './components/layout/Navigation'
import { Hero }            from './components/sections/Hero'
import { ProcessSection }  from './components/sections/ProcessSection'
import { ServicesSection }     from './components/sections/ServicesSection'
import { WorkSection }         from './components/sections/WorkSection'
import { AboutSection }        from './components/sections/AboutSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { BookingCTASection }   from './components/sections/BookingCTASection'
import { FooterSection }       from './components/sections/FooterSection'
import { ScrollTrigger }       from './lib/gsap'

export default function App() {
  const isProcessOnly      = typeof window !== 'undefined' && window.location.search.includes('preview=process')
  const isServicesOnly     = typeof window !== 'undefined' && window.location.search.includes('preview=services')
  const isWorkOnly         = typeof window !== 'undefined' && window.location.search.includes('preview=work')
  const isAboutOnly        = typeof window !== 'undefined' && window.location.search.includes('preview=about')
  const isTestimonialsOnly = typeof window !== 'undefined' && window.location.search.includes('preview=testimonials')
  const isBookingOnly      = typeof window !== 'undefined' && window.location.search.includes('preview=booking')
  const isFooterOnly       = typeof window !== 'undefined' && window.location.search.includes('preview=footer')

  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' })
          ScrollTrigger.refresh()
        }, 150)
      }
    }
  }, [])

  if (isProcessOnly) {
    const isMobilePreview = window.location.search.includes('preview=process-mobile')
    return (
      <main className={isMobilePreview ? "max-w-[390px] mx-auto min-h-screen bg-[#08090A] border-x border-white/10" : ""}>
        <ProcessSection />
      </main>
    )
  }

  if (isServicesOnly) {
    const isMobilePreview = window.location.search.includes('preview=services-mobile')
    return (
      <main className={isMobilePreview ? "max-w-[390px] mx-auto min-h-screen bg-[#08090A] border-x border-white/10" : ""}>
        <ServicesSection />
      </main>
    )
  }

  if (isWorkOnly) {
    const isMobilePreview = window.location.search.includes('preview=work-mobile')
    return (
      <main className={isMobilePreview ? "max-w-[390px] mx-auto min-h-screen bg-[#08090A] border-x border-white/10" : ""}>
        <WorkSection />
      </main>
    )
  }

  if (isAboutOnly) {
    const isMobilePreview = window.location.search.includes('preview=about-mobile')
    return (
      <main className={isMobilePreview ? "max-w-[390px] mx-auto min-h-screen bg-[#08090A] border-x border-white/10" : ""}>
        <AboutSection />
      </main>
    )
  }

  if (isTestimonialsOnly) {
    const isMobilePreview = window.location.search.includes('preview=testimonials-mobile')
    return (
      <main className={isMobilePreview ? "max-w-[390px] mx-auto min-h-screen bg-[#08090A] border-x border-white/10" : ""}>
        <TestimonialsSection />
      </main>
    )
  }

  if (isBookingOnly) {
    const isMobilePreview = window.location.search.includes('preview=booking-mobile')
    return (
      <main className={isMobilePreview ? "max-w-[390px] mx-auto min-h-screen bg-[#08090A] border-x border-white/10" : ""}>
        <BookingCTASection />
      </main>
    )
  }

  if (isFooterOnly) {
    const isMobilePreview = window.location.search.includes('preview=footer-mobile')
    return (
      <div className={isMobilePreview ? "max-w-[390px] mx-auto min-h-screen bg-[#060709] border-x border-white/10" : ""}>
        <FooterSection />
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProcessSection />
        <ServicesSection />
        <WorkSection />
        <AboutSection />
        <TestimonialsSection />
        <BookingCTASection />
        <FooterSection />
      </main>
    </>
  )
}
