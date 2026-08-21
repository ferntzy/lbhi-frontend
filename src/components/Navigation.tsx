import { useState, useEffect } from 'react'
import type { Page } from '../../App'

interface Props {
  currentPage: Page
  navigate: (page: Page) => void
}

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Doctors', page: 'doctors' },
  // { label: 'Departments', page: 'departments' },
  { label: 'Org Structure', page: 'org' },
  // { label: 'Centers', page: 'centers' },
  { label: 'News', page: 'news' },
  { label: 'Stories', page: 'stories' },
  { label: 'Community', page: 'community' },
  { label: 'Contact', page: 'contact' },
]

export default function Navigation({ currentPage, navigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (page: Page) => {
    navigate(page)
    setMenuOpen(false)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#0d2240',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.18)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img
              src="public/images/lbhi_logo.png"
              alt="LBHI Logo"
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '13px', lineHeight: 1.2, letterSpacing: '0.02em' }}>
                Leyte Baptist Hospital, Inc.
              </div>
              <div style={{ color: '#7fe3e0', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Hilongos, Leyte
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
            className="hidden-mobile"
          >
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                style={{
                  padding: '6px 10px',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                  backgroundColor: currentPage === page ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: currentPage === page ? '#7fe3e0' : 'rgba(255,255,255,0.78)',
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = '#ffffff'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== page) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.78)'
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* <button
              onClick={() => handleNav('contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1a7f7a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d9490')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a7f7a')}
              className="emergency-btn"
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#7fe3e0',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }}
              />
              Emergency
            </button> */}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.8)',
              }}
              aria-label="Toggle menu"
              className="hamburger-btn"
            >
              {menuOpen ? (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: '#081729',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px 16px' }}>
            {navLinks.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '2px',
                  backgroundColor: currentPage === page ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: currentPage === page ? '#7fe3e0' : 'rgba(255,255,255,0.75)',
                  transition: 'background 0.15s',
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                width: '100%',
                backgroundColor: '#1a7f7a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '13px 16px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#7fe3e0',
                  flexShrink: 0,
                }}
              />
              Emergency / Contact
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (min-width: 1100px) {
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 1099px) {
          .hidden-mobile { display: none !important; }
          .emergency-btn { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
