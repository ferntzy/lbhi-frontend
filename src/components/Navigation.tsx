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
  { label: 'Org Structure', page: 'org' },
  { label: 'News', page: 'news' },
  { label: 'Stories', page: 'stories' },
  { label: 'Community', page: 'community' },
  { label: 'Contact', page: 'contact' },
]

const INK = '#0d2240'
const INK_DEEP = '#081729'
const GOLD = '#c9a45c'
const TEAL = '#7fe3e0'
const SERIF = "'Source Serif Pro', 'Iowan Old Style', Georgia, serif"

export default function Navigation({ currentPage, navigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNav = (page: Page) => {
    navigate(page)
    setMenuOpen(false)
  }

  const solid = scrolled || menuOpen

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: solid ? INK : 'transparent',
        boxShadow: solid ? '0 4px 28px rgba(0,0,0,0.22)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <button
            onClick={() => handleNav('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img
              src="/images/lbhi_logo.png"
              alt="LBHI Logo"
              style={{ width: '34px', height: '34px', objectFit: 'contain', flexShrink: 0 }}
            />
            <div
              style={{
                color: '#ffffff',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: 1.15,
                fontFamily: SERIF,
                letterSpacing: '0.005em',
                textAlign: 'left',
              }}
            >
              Leyte Baptist Hospital, Inc.
            </div>
          </button>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
            {navLinks.map(({ label, page }) => {
              const active = currentPage === page
              return (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className="nav-link"
                  style={{
                    position: 'relative',
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.72)',
                  }}
                >
                  {label}
                  <span
                    className="nav-underline"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '2px',
                      height: '1.5px',
                      backgroundColor: active ? TEAL : GOLD,
                      width: active ? 'calc(100% - 24px)' : '0%',
                      transform: 'translateX(-50%)',
                      transition: 'width 0.2s ease',
                    }}
                  />
                </button>
              )
            })}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.9)' }}
            aria-label="Open menu"
            className="hamburger-btn"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Compact mobile menu */}
      {menuOpen && (
        <div className="mobile-overlay" style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: INK_DEEP, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <img src="/images/lbhi_logo.png" alt="LBHI Logo" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
              <span style={{ color: '#ffffff', fontFamily: SERIF, fontSize: '13px' }}>Leyte Baptist Hospital</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.85)' }}
              aria-label="Close menu"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 20px', overflowY: 'auto' }}>
            {navLinks.map(({ label, page }) => {
              const active = currentPage === page
              return (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  style={{
                    textAlign: 'left',
                    padding: '13px 2px',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    background: 'none',
                    border: 'none',
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    fontFamily: SERIF,
                    fontSize: '19px',
                    fontWeight: 500,
                    color: active ? TEAL : '#ffffff',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </nav>
        </div>
      )}

      <style>{`
        .nav-link:hover .nav-underline {
          width: calc(100% - 24px) !important;
          background-color: ${TEAL} !important;
        }
        .mobile-overlay { animation: overlayFadeIn 0.16s ease-out; }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (min-width: 1100px) {
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 1099px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}