import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SectionLabelProps {
  children: React.ReactNode
  /** Render the amber line marker before the text. Default: true */
  showLine?: boolean
  className?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SectionLabel — Small uppercase mono eyebrow label.
 *
 * Used SPARINGLY — max 1 per 3 sections per design-taste-frontend skill rules.
 * The amber line before the text is a Blackline signature mark.
 *
 * Example output: — CERAMIC COATING
 *
 * This component is intentionally NOT centered by default.
 * Place it left-aligned above section headlines.
 */
export function SectionLabel({
  children,
  showLine = true,
  className = '',
}: SectionLabelProps) {
  return (
    <span
      className={['bl-section-label', !showLine ? 'no-line' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={!showLine ? { '--no-line': '1' } as React.CSSProperties : undefined}
    >
      {children}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata row
// ─────────────────────────────────────────────────────────────────────────────

interface MetaProps {
  children: React.ReactNode
  color?: 'default' | 'muted' | 'accent'
  className?: string
}

/**
 * Meta — Mono small text for timestamps, codes, categories.
 *
 * Examples:
 *   <Meta>Austin, TX</Meta>
 *   <Meta color="accent">EST. 2018</Meta>
 */
export function Meta({ children, color = 'default', className = '' }: MetaProps) {
  const colorVar = {
    default: 'var(--bl-text-secondary)',
    muted:   'var(--bl-text-muted)',
    accent:  'var(--bl-accent)',
  }[color]

  return (
    <span
      className={['type-meta', className].filter(Boolean).join(' ')}
      style={{ color: colorVar }}
    >
      {children}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Label
// ─────────────────────────────────────────────────────────────────────────────

interface LabelProps {
  children: React.ReactNode
  color?: 'default' | 'muted' | 'accent'
  className?: string
}

/**
 * Label — Extremely small uppercase mono label.
 *
 * Smallest text in the system. Used for:
 *   - Service category tags
 *   - Form field labels
 *   - Navigation sub-labels
 *   - Status indicators
 */
export function Label({ children, color = 'muted', className = '' }: LabelProps) {
  const colorVar = {
    default: 'var(--bl-text-secondary)',
    muted:   'var(--bl-text-muted)',
    accent:  'var(--bl-accent)',
  }[color]

  return (
    <span
      className={['type-label', className].filter(Boolean).join(' ')}
      style={{ color: colorVar }}
    >
      {children}
    </span>
  )
}
