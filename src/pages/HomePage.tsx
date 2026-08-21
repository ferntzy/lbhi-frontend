import { useState, useEffect } from 'react'
import type { Page } from '../../App'
import Icon from '../components/Icon'

interface Props {
  navigate: (page: Page) => void
}

interface Verse {
  reference: string
  text: string
}

// Replace these with real hospital photos when ready
const heroImages = [
  'https://images.unsplash.com/photo-1550831106-2747f0d6a81c?w=1800&h=1100&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1800&h=1100&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1800&h=1100&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&h=1100&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1800&h=1100&fit=crop&auto=format',
]

const newsItems = [
  {
    id: 1,
    category: 'Community Outreach',
    date: 'July 28, 2025',
    title: 'Medical Mission Brings Free Healthcare to Barangay Imelda',
    excerpt:
      'Medical teams from Leyte Baptist Hospital provided free consultations, medicines, and laboratory services to over 350 residents of Barangay Imelda, Hilongos.',
    image:
      'https://images.unsplash.com/photo-1652148439208-3e73641d0725?w=900&h=560&fit=crop&auto=format',
    featured: true,
  },
  {
    id: 2,
    category: 'Hospital Update',
    date: 'July 15, 2025',
    title: 'Laboratory Now Offers Extended Evening Hours',
    excerpt:
      "Starting August 1, our Laboratory Department operates until 8:00 PM on weekdays to better serve patients.",
    image:
      'https://images.unsplash.com/photo-1680759291470-9c10abc59668?w=600&h=380&fit=crop&auto=format',
    featured: false,
  },
  {
    id: 3,
    category: 'Health Campaign',
    date: 'July 5, 2025',
    title: 'Dengue Awareness and Vaccination Campaign in August',
    excerpt:
      'In partnership with the local government, LBH will conduct free dengue awareness sessions and vaccine checks at Hilongos Municipal Hall.',
    image:
      'https://images.unsplash.com/photo-1653508311277-1ecf6ee52c5e?w=600&h=380&fit=crop&auto=format',
    featured: false,
  },
]

const services = [
  { icon: 'ambulance', label: 'Emergency Room', desc: '24-hour emergency care' },
  { icon: 'beaker', label: 'Laboratory', desc: 'Diagnostic testing' },
  { icon: 'building', label: 'Outpatient', desc: 'Consultations & follow-up' },
  { icon: 'user-group', label: 'Maternal Care', desc: 'Mother & child services' },
  { icon: 'pill', label: 'Pharmacy', desc: 'In-house dispensary' },
  { icon: 'photo', label: 'Radiology', desc: 'X-ray & ultrasound' },
]

const S = {
  section: (bg: string): React.CSSProperties => ({
    backgroundColor: bg,
    padding: '80px 0',
  }),
  container: (): React.CSSProperties => ({
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  }),
  eyebrow: (): React.CSSProperties => ({
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#1a7f7a',
    marginBottom: '12px',
    display: 'block',
  }),
  h2: (color = '#0d2240'): React.CSSProperties => ({
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 'clamp(28px, 4vw, 40px)',
    color,
    lineHeight: 1.2,
    margin: 0,
  }),
}

// Duplicate the first image at the end so the slide can advance seamlessly
// past the "last" image without visibly snapping back to the start.
const heroImagesLoop = [...heroImages, heroImages[0]]

export default function HomePage({ navigate }: Props) {
  const [verse, setVerse] = useState<Verse | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [carouselTransition, setCarouselTransition] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchVerse = async () => {
      try {
        const response = await fetch('https://bible-api.com/?rande')
        if (!response.ok) throw new Error('Failed to fetch verse')

        const data = await response.json()

        if (isMounted) {
          setVerse({
            reference: data.reference,
            text: data.text.trim(),
          })
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching verse:', error)
        // Fallback verse in case the API is down or unreachable
        if (isMounted) {
          setVerse({
            reference: 'Matthew 10:7-8 (NKJV)',
            text: 'And as you go, preach, saying, \'The kingdom of heaven is at hand.\' Heal the sick, cleanse the lepers, raise the dead, cast out demons. Freely you have received, freely give.',
          })
          setLoading(false)
        }
      }
    }

    fetchVerse()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  // When we land on the duplicated last slide, wait for the slide
  // transition to finish, then silently snap back to slide 0 with no
  // transition so the loop feels continuous instead of jumping backward.
  useEffect(() => {
    if (currentSlide === heroImages.length) {
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
        {/* Carousel background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            backgroundColor: '#081729',
          }}
        >
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
            {heroImagesLoop.map((img, i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Dots indicator */}
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
            {heroImages.map((_, i) => {
              const activeDot = currentSlide % heroImages.length === i
              return (
                <div
                  key={i}
                  style={{
                    width: activeDot ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: activeDot ? '#7fe3e0' : 'rgba(255,255,255,0.35)',
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
            padding: '0 24px',
            paddingBottom: '96px',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }} />

            <h1
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(40px, 6vw, 72px)',
                color: '#ffffff',
                lineHeight: 1.1,
                margin: '0 0 24px',
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
                color: 'rgba(255,255,255,0.68)',
                fontSize: '17px',
                lineHeight: 1.75,
                margin: '0 0 40px',
                maxWidth: '520px',
              }}
            >
              Leyte Baptist Hospital has been serving the communities of Leyte for
              generations — providing accessible, professional, and compassionate medical care to
              every patient who walks through our doors.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={() => navigate('services')}
                style={{
                  backgroundColor: '#1a7f7a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '14px 32px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d9490')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a7f7a')}
              >
                Explore Our Services
              </button>
              <button
                onClick={() => navigate('about')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.38)',
                  borderRadius: '6px',
                  padding: '14px 32px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)')}
              >
                Learn About Our Hospital
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section style={{ backgroundColor: '#0d2240', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              { label: 'Emergency', value: '(053) XXX-XXXX', sub: 'Available 24 hours', icon: 'alert' },
              { label: 'Hospital Line', value: '(053) XXX-XXXX', sub: 'Mon–Sat, 8AM–5PM', icon: 'phone' },
              { label: 'Location', value: 'Hilongos, Leyte', sub: 'Southern Philippines', icon: 'map-pin' },
              { label: 'OPD Hours', value: '8:00 AM – 5:00 PM', sub: 'Monday to Saturday', icon: 'clock' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '20px 24px',
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>
                  <Icon name={item.icon as any} size={18} />
                </span>
                <div>
                  <div
                    style={{
                      color: '#7fe3e0',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>
                    {item.value}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verse of the Day ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a7f7a 0%, #0d2240 100%)',
          padding: '80px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            opacity: 0.05,
            fontSize: '240px',
            fontFamily: "'DM Serif Display', Georgia, serif",
            color: '#ffffff',
            lineHeight: 1,
          }}
        >
          "
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            {loading ? (
              <div style={{ color: '#ffffff', fontSize: '16px' }}>Loading verse...</div>
            ) : verse ? (
              <>
                <p
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    color: '#ffffff',
                    lineHeight: 1.6,
                    margin: '0 0 24px',
                    fontStyle: 'italic',
                  }}
                >
                  "{verse.text}"
                </p>

                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#7fe3e0',
                    letterSpacing: '0.05em',
                  }}
                >
                  — {verse.reference}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── News ── */}
      <section style={S.section('#ffffff')}>
        <div style={S.container()}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <span style={S.eyebrow()}>Latest Updates</span>
              <h2 style={S.h2()}>
                What's Happening at
                <br />
                Leyte Baptist Hospital
              </h2>
            </div>
            <button
              onClick={() => navigate('news')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#1a7f7a',
                background: 'none',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              View All Updates
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Featured */}
            <div
              style={{ gridColumn: 'span 1' }}
              className="news-featured"
              onClick={() => navigate('news')}
            >
              <div
                style={{
                  overflow: 'hidden',
                  backgroundColor: '#e5e7eb',
                  aspectRatio: '16/10',
                  marginBottom: '20px',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={newsItems[0].image}
                  alt={newsItems[0].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                  loading="lazy"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span
                  style={{
                    color: '#1a7f7a',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {newsItems[0].category}
                </span>
                <span style={{ color: '#d1d5db' }}>·</span>
                <span style={{ color: '#9ca3af', fontSize: '12px' }}>{newsItems[0].date}</span>
              </div>
              <h3
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: '22px',
                  color: '#0d2240',
                  lineHeight: 1.3,
                  margin: '0 0 12px',
                  cursor: 'pointer',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1a7f7a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#0d2240')}
              >
                {newsItems[0].title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px' }}>
                {newsItems[0].excerpt}
              </p>
              <button
                onClick={() => navigate('news')}
                style={{
                  color: '#1a7f7a',
                  background: 'none',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Read Story →
              </button>
            </div>

            {/* Secondary posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {newsItems.slice(1).map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('news')}
                >
                  <div
                    style={{
                      width: '96px',
                      height: '72px',
                      flexShrink: 0,
                      overflow: 'hidden',
                      backgroundColor: '#e5e7eb',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', display: 'block' }}
                      loading="lazy"
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        color: '#1a7f7a',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      {item.category}
                    </span>
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#1c2331',
                        lineHeight: 1.4,
                        margin: '0 0 6px',
                        transition: 'color 0.15s',
                      }}
                    >
                      {item.title}
                    </h4>
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>{item.date}</span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => navigate('news')}
                style={{
                  width: '100%',
                  padding: '13px',
                  border: '1px solid #d1eeec',
                  borderRadius: '6px',
                  color: '#1a7f7a',
                  background: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                  marginTop: '4px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1a7f7a')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d1eeec')}
              >
                View All Updates →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Success Story ── */}
      <section style={S.section('#f5f7f9')}>
        <div style={S.container()}>
          <span style={S.eyebrow()}>Patient Stories</span>
          <h2 style={{ ...S.h2(), marginBottom: '40px' }}>Stories That Inspire Us</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 16px rgba(13,34,64,0.07)',
            }}
          >
            <div style={{ position: 'relative', minHeight: '360px', backgroundColor: '#c7d2de' }}>
              <img
                src="https://images.unsplash.com/photo-1527822618093-743f3e57977c?w=900&h=700&fit=crop&auto=format"
                alt="Hospital care story"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13,34,64,0.55) 0%, transparent 60%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                <span
                  style={{
                    backgroundColor: '#1a7f7a',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: '20px',
                  }}
                >
                  Recovery Story
                </span>
              </div>
            </div>

            <div
              style={{
                padding: 'clamp(32px, 5vw, 56px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <svg
                width="32"
                height="22"
                viewBox="0 0 32 24"
                fill="none"
                style={{ color: '#d1eeec', marginBottom: '24px', flexShrink: 0 }}
              >
                <path
                  d="M0 24V14.4C0 6.4 4 1.6 12 0l2 3.2C9.333 4.267 7.333 6.4 7 9.6H12V24H0zm18 0V14.4C18 6.4 22 1.6 30 0l2 3.2c-4.667 1.067-6.667 3.2-7 6.4H30V24H18z"
                  fill="currentColor"
                />
              </svg>

              <blockquote
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  color: '#0d2240',
                  lineHeight: 1.55,
                  margin: '0 0 20px',
                  fontStyle: 'italic',
                }}
              >
                "After everything we went through, the care we received gave our family hope. The
                doctors and nurses here treated us like family."
              </blockquote>

              <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>
                — Maria Santos, Hilongos resident
              </div>
              <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '32px' }}>
                Maternal & Child Care Department · June 2025
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('stories')}
                  style={{
                    color: '#1a7f7a',
                    background: 'none',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Read Full Story →
                </button>
                <button
                  onClick={() => navigate('stories')}
                  style={{
                    color: '#9ca3af',
                    background: 'none',
                    border: 'none',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  More Stories
                </button>
              </div>

              <p
                style={{
                  marginTop: '24px',
                  fontSize: '11px',
                  color: '#d1d5db',
                  lineHeight: 1.6,
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '16px',
                }}
              >
                Patient stories are published with written consent and a privacy review. Personal
                information is only shared with explicit permission from the patient and their
                family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services overview ── */}
      <section style={S.section('#ffffff')}>
        <div style={S.container()}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <span style={S.eyebrow()}>What We Offer</span>
              <h2 style={S.h2()}>Our Services</h2>
            </div>
            <button
              onClick={() => navigate('services')}
              style={{
                color: '#1a7f7a',
                background: 'none',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              View All Services →
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              border: '1px solid #f3f4f6',
              borderRight: 'none',
              borderBottom: 'none',
            }}
          >
            {services.map((service) => (
              <button
                key={service.label}
                onClick={() => navigate('services')}
                style={{
                  padding: '28px 20px',
                  textAlign: 'left',
                  background: '#ffffff',
                  border: 'none',
                  borderRight: '1px solid #f3f4f6',
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f7f9')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
              >
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                  <Icon name={service.icon as any} size={24} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#0d2240', marginBottom: '4px' }}>
                  {service.label}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '12px' }}>{service.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section style={{ ...S.section('#0d2240'), color: '#ffffff' }}>
        <div style={S.container()}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#7fe3e0',
                  marginBottom: '12px',
                  display: 'block',
                }}
              >
                About Our Hospital
              </span>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(28px, 4vw, 46px)',
                  color: '#ffffff',
                  lineHeight: 1.15,
                  margin: '0 0 24px',
                }}
              >
                Decades of Service
                <br />
                to Leyte
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.75, marginBottom: '16px', fontSize: '15px' }}>
                Leyte Baptist Hospital has served the communities of Leyte for
                generations. Founded on the principles of compassionate care and community
                service, we have grown from a modest clinic into a full-service hospital trusted
                by thousands of families.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.58)', lineHeight: 1.75, marginBottom: '32px', fontSize: '15px' }}>
                Our mission is rooted in service — not just medical care, but genuine concern for
                the people we serve, the families who trust us, and the communities we are
                privileged to be part of.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('about')}
                  style={{
                    backgroundColor: '#1a7f7a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 24px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d9490')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a7f7a')}
                >
                  Our Story
                </button>
                <button
                  onClick={() => navigate('departments')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.28)',
                    borderRadius: '6px',
                    padding: '12px 24px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)')}
                >
                  Our Departments
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {[
                { label: 'Years of Service', value: 'Est. [Year]' },
                { label: 'Medical Staff', value: 'Dedicated Team' },
                { label: 'Community Missions', value: 'Regular Outreach' },
                { label: 'Full-Service', value: 'Departments' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: '32px',
                    borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '28px',
                      color: '#7fe3e0',
                      marginBottom: '8px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Community teaser ── */}
      <section style={S.section('#ffffff')}>
        <div style={S.container()}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={S.eyebrow()}>Beyond Our Walls</span>
              <h2 style={{ ...S.h2(), marginBottom: '20px' }}>Serving Our Community</h2>
              <p style={{ color: '#6b7280', lineHeight: 1.75, marginBottom: '24px', fontSize: '14px' }}>
                Our commitment to health extends beyond the hospital. Through medical missions,
                community outreach, and public health programs, we bring care to those who need it
                most — wherever they are in Southern Leyte.
              </p>
              <button
                onClick={() => navigate('community')}
                style={{
                  color: '#1a7f7a',
                  background: 'none',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                View Our Community Work →
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <div
                style={{
                  overflow: 'hidden',
                  backgroundColor: '#e5e7eb',
                  aspectRatio: '4/3',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1653508311277-1ecf6ee52c5e?w=600&h=450&fit=crop&auto=format"
                  alt="Medical team"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                  loading="lazy"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div
                style={{
                  overflow: 'hidden',
                  backgroundColor: '#e5e7eb',
                  aspectRatio: '4/3',
                  marginTop: '32px',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1652148439208-3e73641d0725?w=600&h=450&fit=crop&auto=format"
                  alt="Community health outreach"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                  loading="lazy"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}