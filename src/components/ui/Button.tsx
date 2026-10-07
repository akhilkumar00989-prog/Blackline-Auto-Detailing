import React from 'react'
import { ArrowRight } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  showArrow?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button'
    href?: never
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a'
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

// ─────────────────────────────────────────────────────────────────────────────
// Size maps
// ─────────────────────────────────────────────────────────────────────────────

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-[0.7rem]',
  md: 'px-7 py-3.5 text-[0.75rem]',
  lg: 'px-9 py-4 text-[0.8rem]',
}

const arrowSizes: Record<ButtonSize, number> = {
  sm: 12,
  md: 14,
  lg: 15,
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Button — Blackline primary interactive element.
 *
 * Two brand variants:
 *   primary   → white bg + dark text, amber on hover (main CTA)
 *   secondary → transparent + border, amber border on hover
 *   ghost     → no border, subtle text link
 *
 * Renders as <button> by default, or <a> when as="a" + href are set.
 *
 * Pre-flight checks:
 *   - Button text fits one line (enforced by white-space: nowrap)
 *   - Contrast: primary white-on-dark passes WCAG AA
 *   - No pill border-radius (2px — automotive precision)
 *   - Arrow moves on hover (CSS transition, no GSAP needed)
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    showArrow = true,
    className = '',
    children,
    ...rest
  } = props

  const variantClass = {
    primary: 'bl-btn-primary',
    secondary: 'bl-btn-secondary',
    ghost: 'bl-btn-ghost',
  }[variant]

  const combinedClass = [
    'bl-btn',
    variantClass,
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          size={arrowSizes[size]}
          strokeWidth={1.5}
          className="bl-btn-arrow"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (props.as === 'a') {
    const { as: _as, href, ...anchorRest } = rest as ButtonAsAnchor & { as: 'a' }
    return (
      <a
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={combinedClass}
        {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton & { as?: 'button' }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={combinedClass}
      {...(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'
