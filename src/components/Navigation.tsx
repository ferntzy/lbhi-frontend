import { useState, useEffect, useRef } from 'react'
import type { Page } from '../../App'

interface Props {
  currentPage: Page
  navigate: (page: Page) => void
}

interface NavChild {
  label: string
  page: Page
}

interface NavGroup {
  label: string
  page?: Page       // clickable directly (e.g. Home) if no children
  children?: NavChild[]
}

// ---- EDIT THIS to change grouping ----
// Note: 'Contact' is rendered separately as the accent button — don't add it here.
const navGroups: NavGroup[] = [
  { label: 'Home', page: 'home' },
  {
    label: 'About',
    children: [
      { label: 'About Us', page: 'about' },
      { label: 'Our Faith', page: 'faith' },
      { label: 'Org Structure', page: 'org' },
      { label: 'Community', page: 'community' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Services', page: 'services' },
      { label: 'Doctors', page: 'doctors' },
      { label: 'Departments', page: 'departments' },
    ],
  },
  {
    label: 'News & Stories',
    children: [
      { label: 'News', page: 'news' },
      { label: 'Patient Stories', page: 'stories' },
    ],
  },
]
// ---------------------------------------

const INK = '#0d2240'
const INK_DEEP = '#081729'
const GOLD = '#c9a45c'
const TEAL = '#7fe3e0'
const SERIF = "'Source Serif Pro', 'Iowan Old Style', Georgia, serif"

// helper: is any child of this group the current page?
function groupIsActive(group: NavGroup, currentPage: Page) {
  if (group.page === currentPage) return true
  return group.children?.some((c) => c.page === currentPage) ?? false
}

// Minimal arrow accent — used on the Contact CTA only, both breakpoints.
function ArrowIcon({ size = 14, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function Navigation({ currentPage, navigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    setOpenDropdown(null)
    setOpenMobileGroup(null)
  }

  // slight delay before closing dropdown so moving the mouse from
  // the button down into the panel doesn't immediately close it
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
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
        transition: 'box-shadow 0.3s ease',
        boxShadow: solid ? '0 4px 28px rgba(0,0,0,0.22)' : 'none',
      }}
    >
      {/* ── Utility strip — letterhead line: contact info + emergency badge ── */}
      <div
        className="hidden-mobile"
        style={{
          backgroundColor: INK_DEEP,
          borderBottom: `1px solid rgba(201,164,92,0.18)`,
          height: solid ? '0px' : '34px',
          overflow: 'hidden',
          transition: 'height 0.25s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: '12.5px',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.01em',
            }}
          >
            Healthcare with Compassion. Service with Purpose.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a
              href="tel:+6353XXXXXXX"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (053) XXX-XXXX
            </a>
            <span
              style={{
                color: GOLD,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                paddingLeft: '18px',
                borderLeft: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              EMERGENCY · 24/7
            </span>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div
        style={{
          backgroundColor: solid ? INK : 'rgba(13,34,64,0.32)',
          backdropFilter: solid ? 'none' : 'blur(6px)',
          borderBottom: `1px solid ${solid ? 'rgba(201,164,92,0.22)' : 'rgba(255,255,255,0.08)'}`,
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
            <button
              onClick={() => handleNav('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <img
                src="/images/lbhi_logo.png"
                alt="LBHI Logo"
                style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0 }}
              />
              <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div>
                  <div
                    style={{
                      color: '#ffffff',
                      fontWeight: 500,
                      fontSize: '17px',
                      lineHeight: 1.15,
                      fontFamily: SERIF,
                      letterSpacing: '0.005em',
                    }}
                  >
                    Leyte Baptist Hospital
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginTop: '2px',
                    }}
                  >
                    Mission Hospital
                  </div>
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <div style={{ display: 'flex', alignItems: 'center' }} className="hidden-mobile">
              {navGroups.map((group, i) => {
                const active = groupIsActive(group, currentPage)
                const hasChildren = !!group.children?.length

                return (
                  <div key={group.label} style={{ display: 'flex', alignItems: 'center' }}>
                    {i > 0 && (
                      <span
                        style={{
                          width: '1px',
                          height: '14px',
                          backgroundColor: 'rgba(255,255,255,0.14)',
                          margin: '0 6px',
                        }}
                      />
                    )}
                    <div
                      style={{ position: 'relative' }}
                      onMouseEnter={() => {
                        if (hasChildren) {
                          cancelClose()
                          setOpenDropdown(group.label)
                        }
                      }}
                      onMouseLeave={() => hasChildren && scheduleClose()}
                    >
                      <button
                        onClick={() => group.page && handleNav(group.page)}
                        className="nav-link"
                        style={{
                          position: 'relative',
                          padding: '10px 14px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          letterSpacing: '0.03em',
                          textTransform: 'uppercase',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          color: active ? '#ffffff' : 'rgba(255,255,255,0.68)',
                        }}
                      >
                        {group.label}
                        {hasChildren && (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            style={{
                              transform: openDropdown === group.label ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.15s ease',
                            }}
                          >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        <span
                          className="nav-underline"
                          style={{
                            position: 'absolute',
                            left: '50%',
                            bottom: '4px',
                            height: '2px',
                            backgroundColor: active ? TEAL : GOLD,
                            width: active ? 'calc(100% - 28px)' : '0%',
                            transform: 'translateX(-50%)',
                            transition: 'width 0.2s ease',
                          }}
                        />
                      </button>

                      {hasChildren && openDropdown === group.label && (
                        <div
                          onMouseEnter={cancelClose}
                          onMouseLeave={scheduleClose}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 10,
                          }}
                        >
                          {/* connecting nub */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              left: '50%',
                              transform: 'translateX(-50%) rotate(45deg)',
                              width: '10px',
                              height: '10px',
                              backgroundColor: INK,
                              borderLeft: '1px solid rgba(201,164,92,0.25)',
                              borderTop: '1px solid rgba(201,164,92,0.25)',
                            }}
                          />
                          <div
                            style={{
                              backgroundColor: INK,
                              borderRadius: '10px',
                              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                              border: '1px solid rgba(201,164,92,0.25)',
                              minWidth: '200px',
                              padding: '8px',
                              position: 'relative',
                            }}
                          >
                            {group.children!.map((child) => {
                              const childActive = currentPage === child.page
                              return (
                                <button
                                  key={child.page}
                                  onClick={() => handleNav(child.page)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    background: childActive ? 'rgba(201,164,92,0.1)' : 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: childActive ? TEAL : 'rgba(255,255,255,0.85)',
                                    whiteSpace: 'nowrap',
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!childActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!childActive) e.currentTarget.style.background = 'none'
                                  }}
                                >
                                  {child.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Contact — angled, blade-cut edge instead of a rounded pill */}
              <button
                onClick={() => handleNav('contact')}
                className="contact-btn"
                style={{
                  marginLeft: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: currentPage === 'contact' ? '#1a7f7a' : 'transparent',
                  color: '#ffffff',
                  border: `1.5px solid ${currentPage === 'contact' ? '#1a7f7a' : 'rgba(255,255,255,0.35)'}`,
                  clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                  padding: '10px 20px 10px 24px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
              >
                Contact
                <ArrowIcon size={13} color={currentPage === 'contact' ? '#ffffff' : GOLD} />
              </button>
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
      </div>

      {/* Compact mobile menu */}
      {menuOpen && (
        <div className="mobile-overlay" style={{ position: 'fixed', inset: 0, zIndex: 60, backgroundColor: INK_DEEP, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(201,164,92,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <img src="/images/lbhi_logo.png" alt="LBHI Logo" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
              <div>
                <div style={{ color: '#ffffff', fontFamily: SERIF, fontSize: '13px', fontWeight: 500, lineHeight: 1.15 }}>Leyte Baptist Hospital</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>Mission Hospital</div>
              </div>
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

          {/* mobile emergency strip */}
          <div
            style={{
              margin: '16px 20px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '14px',
            }}
          >
            <span style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em' }}>
              EMERGENCY · 24/7
            </span>
            <a href="tel:+6353XXXXXXX" style={{ color: TEAL, fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              (053) XXX-XXXX
            </a>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 20px', overflowY: 'auto' }}>
            {navGroups.map((group) => {
              const active = groupIsActive(group, currentPage)
              const hasChildren = !!group.children?.length
              const expanded = openMobileGroup === group.label

              if (!hasChildren) {
                return (
                  <button
                    key={group.label}
                    onClick={() => group.page && handleNav(group.page)}
                    style={{
                      textAlign: 'left',
                      padding: '15px 2px 15px 14px',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      borderLeft: `2px solid ${active ? TEAL : 'transparent'}`,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.68)',
                    }}
                  >
                    {group.label}
                  </button>
                )
              }

              return (
                <div key={group.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <button
                    onClick={() => setOpenMobileGroup(expanded ? null : group.label)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      padding: '15px 2px 15px 14px',
                      borderLeft: `2px solid ${active ? TEAL : 'transparent'}`,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.68)',
                    }}
                  >
                    {group.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease',
                        flexShrink: 0,
                      }}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {expanded && (
                    <div style={{ paddingBottom: '8px', display: 'flex', flexDirection: 'column' }}>
                      {group.children!.map((child) => {
                        const childActive = currentPage === child.page
                        return (
                          <button
                            key={child.page}
                            onClick={() => handleNav(child.page)}
                            style={{
                              textAlign: 'left',
                              padding: '10px 2px 10px 28px',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: 500,
                              color: childActive ? TEAL : 'rgba(255,255,255,0.85)',
                            }}
                          >
                            {child.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Contact — accent button in mobile menu too */}
            <button
              onClick={() => handleNav('contact')}
              style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                backgroundColor: '#1a7f7a',
                color: '#ffffff',
                border: 'none',
                clipPath: 'polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: SERIF,
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Contact Us
              <ArrowIcon size={16} color="#ffffff" />
            </button>
          </nav>
        </div>
      )}

      <style>{`
        .contact-btn:hover {
          background-color: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.6) !important;
        }
        .nav-link:hover .nav-underline {
          width: calc(100% - 28px) !important;
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