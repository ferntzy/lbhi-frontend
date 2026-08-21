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
          color: '#7fe3e0',
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
    <footer style={{ position: 'relative', backgroundColor: '#0a1c36', color: '#ffffff', overflow: 'hidden' }}>
      {/* subtle top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #4dd9d0, transparent)',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 0', position: 'relative' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                  padding: '6px',
                }}
              >
                <img
                  src="/images/lbhi_logo.png"
                  alt="Leyte Baptist Hospital logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#ffffff', lineHeight: 1.3 }}>
                  Leyte Baptist Hospital
                </div>
                <div style={{ fontSize: '11px', color: '#7fe3e0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Hilongos, Leyte
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13.5px', lineHeight: 1.75, marginBottom: '24px', maxWidth: '320px' }}>
              Serving the people of Southern Leyte with compassionate, accessible, and professional healthcare since our founding.
            </p>

            {/* Emergency callout — the signature element */}
            <a
              href="tel:+63XXXXXXXXX"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(77,217,208,0.08)',
                border: '1px solid rgba(77,217,208,0.25)',
                textDecoration: 'none',
                maxWidth: '280px',
                transition: 'background-color 0.15s, border-color 0.15s',
              }}
              className="emergency-card"
            >
              <span
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(77,217,208,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px solid #4dd9d0',
                    animation: 'footerPulseRing 2.2s ease-out infinite',
                  }}
                />
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke="#4dd9d0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <div style={{ fontSize: '10.5px', color: '#7fe3e0', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Emergency line · 24/7
                </div>
                <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>(053) XXX-XXXX</div>
              </div>
            </a>
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
                color: '#7fe3e0',
                marginBottom: '18px',
              }}
            >
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#7fe3e0" strokeWidth="1.8" />
                  <circle cx="12" cy="10" r="3" stroke="#7fe3e0" strokeWidth="1.8" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', lineHeight: 1.6 }}>
                  Hilongos, Southern Leyte<br />Leyte, Philippines
                </span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke="#7fe3e0"
                    strokeWidth="1.8"
                  />
                </svg>
                <a href="tel:+63XXXXXXXXX" className="footer-link" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', textDecoration: 'none' }}>
                  (053) XXX-XXXX
                </a>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16v16H4V4z" stroke="#7fe3e0" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M4 6l8 7 8-7" stroke="#7fe3e0" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                <a href="mailto:info@leytebaptisthospital.ph" className="footer-link" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', textDecoration: 'none' }}>
                  info@leytebaptisthospital.ph
                </a>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="9" stroke="#7fe3e0" strokeWidth="1.8" />
                  <path d="M12 7v5l3.5 2" stroke="#7fe3e0" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', lineHeight: 1.6 }}>
                  Mon–Sat: 8:00 AM – 5:00 PM<br />Emergency: 24 hours
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
        @keyframes footerPulseRing {
          0% { transform: scale(0.9); opacity: 0.8; }
          80%, 100% { transform: scale(1.5); opacity: 0; }
        }
        .footer-link { transition: color 0.15s; }
        .footer-link:hover, .footer-link:focus-visible { color: #ffffff; }
        .footer-link:focus-visible { outline: 2px solid #4dd9d0; outline-offset: 3px; border-radius: 2px; }
        .footer-link-caret { color: #4dd9d0; opacity: 0; transform: translateX(-4px); transition: opacity 0.15s, transform 0.15s; }
        .footer-link:hover .footer-link-caret, .footer-link:focus-visible .footer-link-caret { opacity: 1; transform: translateX(0); }
        .emergency-card:hover, .emergency-card:focus-visible {
          background-color: rgba(77,217,208,0.14);
          border-color: rgba(77,217,208,0.45);
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