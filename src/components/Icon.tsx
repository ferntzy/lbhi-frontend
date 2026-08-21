import React from 'react'

export type IconName =
  | 'ambulance'
  | 'beaker'
  | 'building'
  | 'user-group'
  | 'pill'
  | 'photo'
  | 'phone'
  | 'map-pin'
  | 'clock'
  | 'alert'
  | 'mail'
  | 'handshake'

export default function Icon({ name, className, size = 20 }: { name: IconName; className?: string; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', className }

  switch (name) {
    case 'ambulance':
      return (
        <svg {...props}>
          <rect x="1" y="3" width="18" height="13" rx="2" />
          <path d="M1 8h18" />
          <path d="M6 16v2" />
          <path d="M16 16v2" />
          <path d="M8 7v4" />
        </svg>
      )
    case 'beaker':
      return (
        <svg {...props}>
          <path d="M9 2v6l-3 6v5a1 1 0 001 1h10a1 1 0 001-1v-5l-3-6V2" />
          <path d="M9 8h6" />
        </svg>
      )
    case 'building':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="14" height="18" rx="2" />
          <path d="M7 7h.01" />
          <path d="M11 7h.01" />
          <path d="M15 7h.01" />
          <path d="M7 11h.01" />
          <path d="M11 11h.01" />
          <path d="M15 11h.01" />
        </svg>
      )
    case 'user-group':
      return (
        <svg {...props}>
          <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z" />
          <path d="M6 11c1.657 0 3-1.567 3-3.5S7.657 4 6 4 3 5.567 3 7.5 4.343 11 6 11z" />
          <path d="M2 20a6 6 0 0110 0" />
          <path d="M12 20a6 6 0 0110 0" />
        </svg>
      )
    case 'pill':
      return (
        <svg {...props}>
          <rect x="2" y="10" width="20" height="8" rx="4" transform="rotate(-45 12 14)" />
        </svg>
      )
    case 'photo':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="14" rx="2" />
          <path d="M3 17l5-5 4 4 5-7 2 3" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12 1.05.37 2.07.73 3.03a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.05-1.05a2 2 0 012.11-.45c.96.36 1.98.61 3.03.73A2 2 0 0122 16.92z" />
        </svg>
      )
    case 'map-pin':
      return (
        <svg {...props}>
          <path d="M12 21s8-5.5 8-10a8 8 0 10-16 0c0 4.5 8 10 8 10z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      )
    case 'alert':
      return (
        <svg {...props}>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )
    case 'handshake':
      return (
        <svg {...props}>
          <path d="M21 15l-5-5" />
          <path d="M3 11l5 5" />
          <path d="M8 13l8 8" />
        </svg>
      )
    default:
      return null
  }
}
