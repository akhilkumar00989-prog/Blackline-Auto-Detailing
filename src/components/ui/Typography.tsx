import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type TypographyVariant =
  | 'display-xl'
  | 'display-lg'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body-lg'
  | 'body'
  | 'sm'
  | 'meta'
  | 'label'

export type TypographyColor = 'default' | 'secondary' | 'muted' | 'accent'

interface TypographyProps {
  variant?: TypographyVariant
  color?: TypographyColor
  /** Rendered element — inferred from variant when not set */
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  id?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant config
// ─────────────────────────────────────────────────────────────────────────────

const variantConfig: Record<
  TypographyVariant,
  { className: string; defaultTag: React.ElementType }
> = {
  'display-xl': { className: 'type-display-xl', defaultTag: 'h1' },
  'display-lg': { className: 'type-display-lg', defaultTag: 'h2' },
  'h1':         { className: 'type-h1',         defaultTag: 'h1' },
  'h2':         { className: 'type-h2',         defaultTag: 'h2' },
  'h3':         { className: 'type-h3',         defaultTag: 'h3' },
  'body-lg':    { className: 'type-body-lg',    defaultTag: 'p'  },
  'body':       { className: 'type-body',       defaultTag: 'p'  },
  'sm':         { className: 'type-sm',         defaultTag: 'p'  },
  'meta':       { className: 'type-meta',       defaultTag: 'span' },
  'label':      { className: 'type-label',      defaultTag: 'span' },
}

const colorVar: Record<TypographyColor, string> = {
  default:   'var(--bl-text)',
  secondary: 'var(--bl-text-secondary)',
  muted:     'var(--bl-text-muted)',
  accent:    'var(--bl-accent)',
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Typography — Unified text rendering for the Blackline design system.
 *
 * Applies the correct font family, size, weight, line-height, and
 * letter-spacing from design tokens. Polymorphic — uses a sensible
 * default element per variant, overridable via `as`.
 *
 * Display tokens use Space Grotesk Variable (display font).
 * Body/sm tokens use DM Sans Variable.
 * Meta/label tokens use system mono stack.
 *
 * Strong contrast exists between display-xl and label variants
 * by design — this is intentional visual hierarchy.
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    { variant = 'body', color = 'default', as, className = '', children, id },
    ref
  ) {
    const config = variantConfig[variant]
    const Tag = as ?? config.defaultTag

    return (
      <Tag
        ref={ref}
        id={id}
        className={[config.className, className].filter(Boolean).join(' ')}
        style={{ color: colorVar[color] }}
      >
        {children}
      </Tag>
    )
  }
)

Typography.displayName = 'Typography'

// ─────────────────────────────────────────────────────────────────────────────
// Shorthand exports for common variants
// ─────────────────────────────────────────────────────────────────────────────

type ShorthandProps = Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>

/** Display XL — "BLACKLINE" hero mark, 72–144px fluid */
export const DisplayXL = (props: ShorthandProps) => (
  <Typography variant="display-xl" {...props} />
)

/** Display LG — large section headers, 52–104px fluid */
export const DisplayLG = (props: ShorthandProps) => (
  <Typography variant="display-lg" {...props} />
)

/** H1 — primary page heading, 40–72px fluid */
export const H1 = (props: ShorthandProps) => (
  <Typography variant="h1" {...props} />
)

/** H2 — section heading, 32–48px fluid */
export const H2 = (props: ShorthandProps) => (
  <Typography variant="h2" {...props} />
)

/** H3 — card / list heading, 22–30px fluid */
export const H3 = (props: ShorthandProps) => (
  <Typography variant="h3" {...props} />
)

/** Body LG — intro paragraphs, 18px, light weight */
export const BodyLG = (props: ShorthandProps) => (
  <Typography variant="body-lg" {...props} />
)

/** Body — standard paragraphs, 16px, light weight */
export const Body = (props: ShorthandProps) => (
  <Typography variant="body" {...props} />
)

/** Small — captions, fine print, 14px */
export const Small = (props: ShorthandProps) => (
  <Typography variant="sm" {...props} />
)
