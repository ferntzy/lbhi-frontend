import type { Page } from '../App'

interface Props {
  navigate: (page: Page) => void
}

const exploreLinks: { label: string; page: Page }[] = [
  { label: 'About Us', page: 'about' },
  { label: 'Our Services', page: 'services' },
  { label: 'Our Doctors', page: 'doctors' },
  { label: 'Departments', page: 'departments' },
  { label: 'Organizational Structure', page: 'org' },
]

const infoLinks: { label: string; page: Page }[] = [
  { label: 'News & Updates', page: 'news' },
  { label: 'Success Stories', page: 'stories' },
  { label: 'Community & Outreach', page: 'community' },
]

const legalLinks = ['Privacy Policy', 'Terms of Use', 'Website Information']

const INK_DEEP = '#081729'
const GOLD = '#c9a45c'
const TEAL = '#4dd9d0'

// Fixed verse
const VERSE = {
  text: 'And as you go, preach, saying, ‘The kingdom of heaven is at hand.’ Heal the sick, cleanse the lepers, raise the dead, cast out demons. Freely you have received, freely give.',
  reference: 'Matthew 10:7-8',
}

function NavColumn({
  title,
  links,
  navigate,
}: {
  title: string
  links: { label: string; page: Page }[]
  navigate: (page: Page) => void
}) {
  return (
    <div>
      <h4
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: GOLD,
          marginBottom: '18px',
        }}
      >
        {title}
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {links.map(({ label, page }) => (
          <li key={page}>
            <button
              onClick={() => navigate(page)}
              className="footer-link"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'rgba(255,255,255,0.55)',
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span className="footer-link-caret">›</span>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({ navigate }: Props) {
  return (
    <footer style={{ position: 'relative', backgroundColor: INK_DEEP, color: '#ffffff', overflow: 'hidden' }}>
      {/* ── Verse – seamless top of footer ── */}
      <div
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '72px 24px 48px',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* giant decorative quote */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 24,
            opacity: 0.06,
            fontSize: 'clamp(160px, 26vw, 260px)',
            fontFamily: "'DM Serif Display', Georgia, serif",
            color: '#ffffff',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          "
        </div>

        <p
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.45,
            margin: '0 0 24px',
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          “{VERSE.text}”
        </p>

        <div
          style={{
            fontSize: 'clamp(15px, 2.2vw, 18px)',
            fontWeight: 700,
            color: TEAL,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            position: 'relative',
            zIndex: 1,
          }}
        >
          — {VERSE.reference}
        </div>
      </div>

      {/* thin gold hairline under the verse */}
      {/* <div style={{ height: '1px', backgroundColor: `${GOLD}55`, maxWidth: '1280px', margin: '0 auto' }} /> */}

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 0', position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 1.3fr) repeat(3, 1fr)',
            gap: '48px',
            paddingBottom: '56px',
          }}
          className="footer-grid"
        >
          {/* Hospital identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <img
                src="/images/lbhi_logo.png"
                alt="Leyte Baptist Hospital logo"
                style={{ width: '40px', height: '40px', objectFit: 'contain', flexShrink: 0 }}
              />
              <div>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#ffffff',
                    lineHeight: 1.3,
                    fontFamily: "'Source Serif Pro', 'Iowan Old Style', Georgia, serif",
                  }}
                >
                  Leyte Baptist Hospital, Inc.
                </div>
                <div
                  style={{
                    fontSize: '10.5px',
                    color: GOLD,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Hilongos, Leyte
                </div>
              </div>
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '13.5px',
                lineHeight: 1.75,
                marginBottom: '28px',
                maxWidth: '320px',
              }}
            >
              Serving the people of Southern Leyte with compassionate, accessible, and professional healthcare
              since our founding.
            </p>

            {/* Emergency contact */}
            <div>
              <div
                style={{
                  fontSize: '10.5px',
                  color: GOLD,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                Emergency line · 24/7
              </div>
              <a
                href="tel:+63XXXXXXXXX"
                className="emergency-link"
                style={{
                  fontFamily: "'Source Serif Pro', 'Iowan Old Style', Georgia, serif",
                  fontSize: '26px',
                  fontWeight: 500,
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                (053) XXX-XXXX
              </a>
            </div>
          </div>

          <NavColumn title="Explore" links={exploreLinks} navigate={navigate} />
          <NavColumn title="Information" links={infoLinks} navigate={navigate} />

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: GOLD,
                marginBottom: '18px',
              }}
            >
              Contact
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={GOLD} strokeWidth="1.8" />
                  <circle cx="12" cy="10" r="3" stroke={GOLD} strokeWidth="1.8" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', lineHeight: 1.6 }}>
                  Hilongos, Southern Leyte
                  <br />
                  Leyte, Philippines
                </span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke={GOLD}
                    strokeWidth="1.8"
                  />
                </svg>
                <a
                  href="tel:+63XXXXXXXXX"
                  className="footer-link"
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', textDecoration: 'none' }}
                >
                  (053) XXX-XXXX
                </a>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16v16H4V4z" stroke={GOLD} strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M4 6l8 7 8-7" stroke={GOLD} strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                <a
                  href="mailto:info@leytebaptisthospital.ph"
                  className="footer-link"
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', textDecoration: 'none' }}
                >
                  info@leytebaptisthospital.ph
                </a>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="9" stroke={GOLD} strokeWidth="1.8" />
                  <path d="M12 7v5l3.5 2" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', lineHeight: 1.6 }}>
                  Mon–Sat: 8:00 AM – 5:00 PM
                  <br />
                  Emergency: 24 hours
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '22px 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', margin: 0 }}>
            © {new Date().getFullYear()} Leyte Baptist Hospital. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '28px' }}>
            {legalLinks.map((label) => (
              <button
                key={label}
                className="footer-link"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-link { transition: color 0.15s; }
        .footer-link:hover, .footer-link:focus-visible { color: #ffffff; }
        .footer-link:focus-visible { outline: 2px solid ${TEAL}; outline-offset: 3px; border-radius: 2px; }
        .footer-link-caret { color: ${TEAL}; opacity: 0; transform: translateX(-4px); transition: opacity 0.15s, transform 0.15s; }
        .footer-link:hover .footer-link-caret, .footer-link:focus-visible .footer-link-caret { opacity: 1; transform: translateX(0); }
        .emergency-link { transition: color 0.15s; border-bottom: 1px solid transparent; }
        .emergency-link:hover, .emergency-link:focus-visible {
          color: ${TEAL};
          border-bottom-color: ${TEAL}80;
        }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}