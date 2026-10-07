import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ContainerProps {
  size?: ContainerSize
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

// ─────────────────────────────────────────────────────────────────────────────
// Size map
// ─────────────────────────────────────────────────────────────────────────────

const sizeClass: Record<ContainerSize, string> = {
  sm:   'bl-container-sm',
  md:   'bl-container',       /* 768px constrained */
  lg:   'bl-container',       /* default — 1280px */
  xl:   'bl-container',
  full: 'bl-container-full',  /* 1440px */
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Container — Centered max-width wrapper with responsive horizontal padding.
 *
 * Sizes:
 *   sm   → max-w [640px]   — narrow editorial columns
 *   md   → max-w [768px]   — comfortable reading width
 *   lg   → max-w [1024px]  — mid-page content
 *   xl   → max-w [1280px]  — default page width
 *   full → max-w [1440px]  — full-bleed sections with padding
 *
 * Polymorphic — renders as any element (default: div).
 */
export function Container({
  size = 'xl',
  as: Tag = 'div',
  className = '',
  children,
}: ContainerProps) {
  return (
    <Tag className={[sizeClass[size], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────────────────────

interface SectionProps {
  size?: 'sm' | 'md' | 'lg'
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  id?: string
}

const sectionPaddingClass: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'bl-section-sm',
  md: 'bl-section',
  lg: 'bl-section-lg',
}

/**
 * Section — Full-width section wrapper with consistent vertical padding.
 *
 * Wraps children in a <section> (or custom element) with the vertical
 * spacing from the design token scale.
 */
export function Section({
  size = 'md',
  as: Tag = 'section',
  className = '',
  children,
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={[sectionPaddingClass[size], className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  )
}
