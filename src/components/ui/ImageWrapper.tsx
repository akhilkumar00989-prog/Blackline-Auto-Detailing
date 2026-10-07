

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ImageRatio =
  | 'cinema'   /* 16:9  — hero, wide feature */
  | 'wide'     /* 3:2   — standard editorial */
  | 'square'   /* 1:1   — gallery grid */
  | 'portrait' /* 3:4   — vehicle detail shots */
  | 'tall'     /* 2:3   — narrow editorial */
  | 'feature'  /* 21:9  — ultra-wide cinematic */
  | 'free'     /* no fixed ratio — height from parent */

export type ImageOverlay = 'none' | 'bottom' | 'scrim'

interface ImageWrapperProps {
  src: string
  alt: string
  ratio?: ImageRatio
  overlay?: ImageOverlay
  zoom?: boolean
  /** Prepared for GSAP parallax — adds data attribute for targeting */
  parallax?: boolean
  /** Prepared for clip-path reveal — adds class for GSAP targeting */
  reveal?: boolean
  className?: string
  imgClassName?: string
  loading?: 'lazy' | 'eager'
}

// ─────────────────────────────────────────────────────────────────────────────
// Ratio class map
// ─────────────────────────────────────────────────────────────────────────────

const ratioClass: Record<ImageRatio, string> = {
  cinema:  'bl-img-cinema',
  wide:    'bl-img-wide',
  square:  'bl-img-square',
  portrait:'bl-img-portrait',
  tall:    'bl-img-tall',
  feature: 'bl-img-feature',
  free:    '',
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ImageWrapper — Cinematic image container for the Blackline design system.
 *
 * All images use sharp crops (border-radius: 0) per the automotive precision
 * design spec. Supports the full image type vocabulary:
 *   - Full bleed
 *   - Editorial crop (various aspect ratios)
 *   - Portrait / tall (vehicle side profiles)
 *   - Feature / ultra-wide (hero backgrounds)
 *
 * Prepared for Stage 3 animation:
 *   - parallax prop → marks for useImageParallax()
 *   - reveal prop   → adds .bl-img-reveal for GSAP clip-path entrance
 *   - zoom prop     → CSS hover scale on the inner <img>
 *
 * overlay variants:
 *   none   → no overlay
 *   bottom → gradient fade to page bg at bottom (for text-over-image)
 *   scrim  → 45% dark scrim (for full-bleed hero images)
 */
export function ImageWrapper({
  src,
  alt,
  ratio = 'wide',
  overlay = 'none',
  zoom = false,
  parallax = false,
  reveal = false,
  className = '',
  imgClassName = '',
  loading = 'lazy',
}: ImageWrapperProps) {
  const overlayClass = {
    none:   '',
    bottom: 'bl-img-overlay',
    scrim:  'bl-img-scrim',
  }[overlay]

  const wrapperClasses = [
    'bl-img',
    ratioClass[ratio],
    overlayClass,
    zoom ? 'bl-img-zoom' : '',
    reveal ? 'bl-img-reveal' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={wrapperClasses}
      data-parallax={parallax ? 'true' : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={imgClassName}
      />
    </div>
  )
}
