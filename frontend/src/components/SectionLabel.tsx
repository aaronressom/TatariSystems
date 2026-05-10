import React from 'react'

interface SectionLabelProps {
  /** Deprecated: numeric prefix is no longer rendered. Kept for backward compatibility. */
  number?: string
  /** Section title displayed in uppercase */
  title: string
  /** Optional extra className on the wrapper */
  className?: string
  /** If true, label appears highlighted for active section */
  active?: boolean
}

/**
 * Uppercase section label header. Previously rendered "01 —— SECTION NAME"
 * but the numeric prefix has been removed per design update.
 */
const SectionLabel: React.FC<SectionLabelProps> = ({
  title,
  className = '',
  active = false,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--inst-font-sans, 'Inter', sans-serif)",
          fontSize: 12,
          fontWeight: 500,
          color: active
            ? 'var(--inst-text-80, rgba(255,255,255,0.8))'
            : 'var(--inst-text-50, rgba(255,255,255,0.5))',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          margin: 0,
          transition: 'color 0.4s ease-in-out',
        }}
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionLabel
