

// ─────────────────────────────────────────────────────────────────────────────
// Horizontal Divider
// ─────────────────────────────────────────────────────────────────────────────

interface DividerProps {
  /** 'default' → ultra-subtle | 'soft' → visible | 'accent' → amber short line */
  variant?: 'default' | 'soft' | 'accent'
  className?: string
}

/**
 * Divider — Thin horizontal separator.
 *
 * Use for: navigation separators, section editorial divisions,
 * metadata boundaries, gallery grid lines.
 *
 * Not a heavy border — always 1px, either faint or accent-coloured.
 *
 * Variants:
 *   default → rgba(255,255,255, 0.07)  — barely visible
 *   soft    → rgba(255,255,255, 0.12)  — gentle separator
 *   accent  → 2.5rem wide amber line   — editorial accent mark
 */
export function Divider({ variant = 'default', className = '' }: DividerProps) {
  const variantClass = {
    default: 'bl-divider',
    soft:    'bl-divider bl-divider-soft',
    accent:  'bl-divider-accent',
  }[variant]

  return (
    <hr
      role="separator"
      aria-hidden="true"
      className={[variantClass, className].filter(Boolean).join(' ')}
      style={{ border: 'none' }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Vertical Divider (inline)
// ─────────────────────────────────────────────────────────────────────────────

interface VerticalDividerProps {
  height?: string
  className?: string
}

/**
 * VerticalDivider — Thin 1px vertical line for inline metadata rows.
 *
 * Example: "Austin, TX · 2016 | CERAMIC | PAINT CORRECTION"
 * Use height to control the visual size.
 */
export function VerticalDivider({
  height = '0.85em',
  className = '',
}: VerticalDividerProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-block',
        width: '1px',
        height,
        background: 'var(--bl-border-soft)',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    />
  )
}
