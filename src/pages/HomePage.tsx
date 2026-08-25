import { useState, useEffect } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

interface HeroMedia {
  type: 'image' | 'video'
  src: string
  poster?: string
}

const doctors = [
  {
    name: 'Dr. Maria Reyes',
    role: 'Attending Physician',
    specialty: 'Internal Medicine',
    detail: 'Medical Staff · Full-time',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Dr. James Cruz',
    role: 'Attending Physician',
    specialty: 'General Surgery',
    detail: 'Department Head · Surgery',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop&auto=format',
  },
  {
    name: 'Dr. Ana Lim',
    role: 'Resident Physician',
    specialty: 'Obstetrics & Gynecology',
    detail: 'Maternal & Child Care',
    photo: 'images/doctor.avif',
  },
  {
    name: 'Dr. Roberto Tan',
    role: 'Attending Physician',
    specialty: 'Pediatrics',
    detail: 'Full-time',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=800&fit=crop&auto=format',
  },
]

const heroMedia: HeroMedia[] = [
  { type: 'image', src: 'https://images.unsplash.com/photo-1550831106-2747f0d6a81c?w=1800&h=1100&fit=crop&auto=format' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1800&h=1100&fit=crop&auto=format' },
  {
    type: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1800&h=1100&fit=crop&auto=format',
  },
  { type: 'image', src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&h=1100&fit=crop&auto=format' },
  { type: 'image', src: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1800&h=1100&fit=crop&auto=format' },
]

const newsItems = [
  {
    id: 1,
    category: 'Community Outreach',
    date: 'July 28, 2025',
    title: 'Medical Mission Brings Free Healthcare to Barangay Imelda',
    excerpt:
      'Medical teams from Leyte Baptist Hospital provided free consultations, medicines, and laboratory services to over 350 residents of Barangay Imelda, Hilongos.',
  },
  {
    id: 2,
    category: 'Hospital Update',
    date: 'July 15, 2025',
    title: 'Laboratory Now Offers Extended Evening Hours',
    excerpt:
      'Starting August 1, our Laboratory Department operates until 8:00 PM on weekdays to better serve patients.',
  },
  {
    id: 3,
    category: 'Health Campaign',
    date: 'July 5, 2025',
    title: 'Dengue Awareness and Vaccination Campaign in August',
    excerpt:
      'In partnership with the local government, LBH will conduct free dengue awareness sessions and vaccine checks at Hilongos Municipal Hall.',
  },
]

const services = [
  { label: 'Emergency Room', desc: '24-hour emergency care' },
  { label: 'Laboratory', desc: 'Diagnostic testing' },
  { label: 'Outpatient', desc: 'Consultations & follow-up' },
  { label: 'Maternal Care', desc: 'Mother & child services' },
  { label: 'Pharmacy', desc: 'In-house dispensary' },
  { label: 'Radiology', desc: 'X-ray & ultrasound' },
]

const reasons = [
  {
    title: 'Care that feels personal',
    text: 'We treat every patient as a neighbor, not a number. From the front desk to the bedside, our staff takes time to listen.',
  },
  {
    title: 'Accessible when you need us',
    text: '24-hour emergency services and extended laboratory hours mean help is available beyond regular clinic times.',
  },
  {
    title: 'Rooted in the community',
    text: 'For generations we have served Hilongos and Southern Leyte — through hospital care and medical missions in the barangays.',
  },
]

const heroMediaLoop = [...heroMedia, heroMedia[0]]

export default function HomePage({ navigate }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselTransition, setCarouselTransition] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentSlide === heroMedia.length) {
      const timeout = setTimeout(() => {
        setCarouselTransition(false)
        setCurrentSlide(0)
      }, 1200)
      return () => clearTimeout(timeout)
    } else {
      setCarouselTransition(true)
    }
  }, [currentSlide])

  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingTop: '64px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#081729' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: carouselTransition
                ? 'transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)'
                : 'none',
            }}
          >
            {heroMediaLoop.map((media, i) =>
              media.type === 'video' ? (
                <video
                  key={i}
                  src={media.src}
                  poster={media.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    flexShrink: 0,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${media.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    flexShrink: 0,
                  }}
                />
              )
            )}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              zIndex: 3,
            }}
          >
            {heroMedia.map((_, i) => {
              const active = currentSlide % heroMedia.length === i
              return (
                <div
                  key={i}
                  style={{
                    width: active ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: active ? '#7fe3e0' : 'rgba(255,255,255,0.35)',
                    transition: 'all 0.3s ease',
                  }}
                />
              )
            })}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,23,41,0.52) 0%, rgba(8,23,41,0.35) 35%, rgba(8,23,41,0.88) 100%)',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px 96px',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <h1
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(42px, 6.5vw, 76px)',
                color: '#ffffff',
                lineHeight: 1.08,
                margin: '0 0 28px',
                letterSpacing: '-0.02em',
              }}
            >
              Healthcare With
              <br />
              Compassion.
              <br />
              <em style={{ color: '#7fe3e0', fontStyle: 'italic' }}>Service With Purpose.</em>
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '17px',
                lineHeight: 1.8,
                margin: '0 0 40px',
                maxWidth: '480px',
              }}
            >
              Leyte Baptist Hospital has served the communities of Leyte for generations —
              providing accessible, professional, and compassionate care to every patient.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
              <button
                onClick={() => navigate('services')}
                style={{
                  backgroundColor: '#1a7f7a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.01em',
                }}
              >
                Explore Our Services
              </button>
              <button
                onClick={() => navigate('about')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                About the hospital →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practical CTA — typographic ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 24px 64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '32px',
              paddingBottom: '40px',
              borderBottom: '1px solid #eef0f2',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#1a7f7a',
                  marginBottom: '12px',
                }}
              >
                Need care today?
              </div>
              <a
                href="tel:+6353XXXXXXX"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(36px, 5.5vw, 52px)',
                  color: '#0d2240',
                  textDecoration: 'none',
                  lineHeight: 1.1,
                  display: 'block',
                  letterSpacing: '-0.02em',
                }}
              >
                (053) XXX-XXXX
              </a>
              <p
                style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  margin: '10px 0 0',
                  lineHeight: 1.5,
                }}
              >
                Emergency · 24 hours &nbsp;&nbsp;·&nbsp;&nbsp; Outpatient · Mon–Sat 8:00 AM – 5:00 PM
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '28px',
                alignItems: 'center',
              }}
            >
              <a
                href="tel:+6353XXXXXXX"
                style={{
                  color: '#1a7f7a',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Call now →
              </a>
              <a
                href="https://maps.google.com/?q=Leyte+Baptist+Hospital"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#6b7280',
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Get directions
              </a>
              <button
                onClick={() => navigate('services')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Outpatient schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why patients choose us ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#0d2240',
              lineHeight: 1.15,
              margin: '0 0 56px',
              maxWidth: '520px',
            }}
          >
            Why patients choose us
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '48px 40px',
            }}
          >
            {reasons.map((reason, i) => (
              <div key={reason.title}>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: '48px',
                    color: '#d1eeec',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#0d2240',
                    margin: '0 0 12px',
                    lineHeight: 1.3,
                  }}
                >
                  {reason.title}
                </h3>
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '15px',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {reason.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News — typographic ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '0 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#0d2240',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              What’s happening
            </h2>
            <button
              onClick={() => navigate('news')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a7f7a',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              All updates →
            </button>
          </div>

          {/* Lead story */}
          <div
            style={{
              marginBottom: '56px',
              paddingBottom: '48px',
              borderBottom: '1px solid #eef0f2',
              cursor: 'pointer',
            }}
            onClick={() => navigate('news')}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#1a7f7a',
                }}
              >
                {newsItems[0].category}
              </span>
              <span style={{ color: '#d1d5db', fontSize: '12px' }}>·</span>
              <span style={{ color: '#9ca3af', fontSize: '13px' }}>{newsItems[0].date}</span>
            </div>

            <h3
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                color: '#0d2240',
                lineHeight: 1.25,
                margin: '0 0 16px',
                maxWidth: '820px',
              }}
            >
              {newsItems[0].title}
            </h3>

            <p
              style={{
                color: '#6b7280',
                fontSize: '16px',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: '640px',
              }}
            >
              {newsItems[0].excerpt}
            </p>
          </div>

          {/* Secondary list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {newsItems.slice(1).map((item, i) => (
              <div
                key={item.id}
                onClick={() => navigate('news')}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: '24px',
                  padding: '22px 0',
                  borderBottom: i < newsItems.length - 2 ? '1px solid #f3f4f6' : 'none',
                  cursor: 'pointer',
                  alignItems: 'baseline',
                }}
              >
                <div style={{ color: '#9ca3af', fontSize: '13px' }}>{item.date}</div>
                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1a7f7a',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    {item.category}
                  </span>
                  <h4
                    style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      color: '#1c2331',
                      lineHeight: 1.35,
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Patient story ── */}
      <section style={{ backgroundColor: '#f5f7f9', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '0',
            }}
          >
            <div style={{ position: 'relative', minHeight: '420px', backgroundColor: '#c7d2de' }}>
              <img
                src="https://images.unsplash.com/photo-1527822618093-743f3e57977c?w=900&h=700&fit=crop&auto=format"
                alt="Hospital care story"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13,34,64,0.5) 0%, transparent 55%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  color: '#7fe3e0',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Recovery Story
              </div>
            </div>

            <div
              style={{
                padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 56px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <blockquote
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  color: '#0d2240',
                  lineHeight: 1.4,
                  margin: '0 0 28px',
                  fontStyle: 'italic',
                }}
              >
                “After everything we went through, the care we received gave our family hope. The
                doctors and nurses here treated us like family.”
              </blockquote>

              <div style={{ color: '#374151', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                Maria Santos
              </div>
              <div style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '36px' }}>
                Maternal & Child Care · June 2025 · Hilongos
              </div>

              <button
                onClick={() => navigate('stories')}
                style={{
                  alignSelf: 'flex-start',
                  background: 'none',
                  border: 'none',
                  color: '#1a7f7a',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Read the full story →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Doctors — large portraits, no cards ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '56px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: '#0d2240',
                  lineHeight: 1.15,
                  margin: '0 0 8px',
                }}
              >
                Our doctors
              </h2>
              <p style={{ color: '#6b7280', fontSize: '15px', margin: 0, maxWidth: '420px' }}>
                The physicians who care for patients at Leyte Baptist Hospital.
              </p>
            </div>
            <button
              onClick={() => navigate('doctors')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a7f7a',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              View all doctors →
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '48px 32px',
            }}
          >
            {doctors.map((doc) => (
              <div
                key={doc.name}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('doctors')}
              >
                {/* Large portrait — the main visual weight */}
                <div
                  style={{
                    aspectRatio: '3/4',
                    overflow: 'hidden',
                    backgroundColor: '#e5e7eb',
                    marginBottom: '20px',
                  }}
                >
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                    loading="lazy"
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#1a7f7a',
                    marginBottom: '6px',
                  }}
                >
                  {doc.role}
                </div>

                <h3
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: '22px',
                    color: '#0d2240',
                    margin: '0 0 6px',
                    lineHeight: 1.25,
                  }}
                >
                  {doc.name}
                </h3>

                <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>
                  {doc.specialty}
                </div>

                {doc.detail && (
                  <div style={{ color: '#9ca3af', fontSize: '13px' }}>
                    {doc.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — typographic index ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: '#0d2240',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Our services
            </h2>
            <button
              onClick={() => navigate('services')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a7f7a',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              View all →
            </button>
          </div>

          <div style={{ borderTop: '1px solid #eef0f2' }}>
            {services.map((service) => (
              <button
                key={service.label}
                onClick={() => navigate('services')}
                className="service-row"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '28px 4px',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid #eef0f2',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: 'clamp(22px, 2.8vw, 28px)',
                      color: '#0d2240',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {service.label}
                  </span>
                  <span className="hide-narrow" style={{ color: '#9ca3af', fontSize: '14px' }}>
                    {service.desc}
                  </span>
                </div>
                <span
                  className="service-arrow"
                  style={{
                    color: '#1a7f7a',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                    fontSize: '18px',
                  }}
                >
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '0 0 112px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: '#0d2240',
                  lineHeight: 1.15,
                  margin: '0 0 20px',
                }}
              >
                Beyond our walls
              </h2>
              <p
                style={{
                  color: '#6b7280',
                  lineHeight: 1.75,
                  marginBottom: '28px',
                  fontSize: '15px',
                  maxWidth: '420px',
                }}
              >
                Through medical missions, outreach, and public health programs, we bring care to
                those who need it most — wherever they are in Southern Leyte.
              </p>
              <button
                onClick={() => navigate('community')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1a7f7a',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                See our community work →
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <div style={{ overflow: 'hidden', backgroundColor: '#e5e7eb', aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1653508311277-1ecf6ee52c5e?w=600&h=450&fit=crop&auto=format"
                  alt="Medical team"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s',
                  }}
                  loading="lazy"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div
                style={{
                  overflow: 'hidden',
                  backgroundColor: '#e5e7eb',
                  aspectRatio: '4/3',
                  marginTop: '40px',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1652148439208-3e73641d0725?w=600&h=450&fit=crop&auto=format"
                  alt="Community outreach"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s',
                  }}
                  loading="lazy"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .service-row:hover .service-arrow {
          transform: translateX(5px);
        }
        @media (max-width: 640px) {
          .hide-narrow {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}