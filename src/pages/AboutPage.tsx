import { useEffect, useRef, useState } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

interface FounderData {
  name: string
  title: string
  years: string
  photo: string
  quote: string
}

// Founder's Wall — edit these fields to update the dedication section.
// Put the actual portrait at /public/images/founder-portrait.jpg (a square
// or portrait-oriented photo, closely cropped on the face, works best
// since it's displayed inside a circle).
const founder: FounderData = {
  name: 'Dr. Lincoln Nelson',
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  years: '1923 - 2012',
  photo: '/images/founder-portrait.jpg',
  quote:
    'Healing is a calling, not a transaction — every patient who walks through our doors deserves dignity and care.',
}

const timeline = [
  {
    period: '1975',
    title: 'Hospital Established',
    desc: 'Leyte Baptist Hospital was founded to provide affordable, compassionate healthcare to the communities of Southern Leyte, rooted in the Baptist tradition of service.',
  },
  {
    period: 'Early Years',
    title: 'Building the Foundation',
    desc: 'The hospital grew its range of services and welcomed dedicated medical professionals committed to serving a growing patient community across the region.',
  },
  {
    period: 'Growth Period',
    title: 'Expanding Facilities & Departments',
    desc: 'Significant expansions enabled the hospital to offer more specialized services, including laboratory, radiology, and dedicated maternal care departments.',
  },
  {
    period: 'Recent Years',
    title: 'Strengthening Community Programs',
    desc: 'LBH expanded its outreach through medical missions, vaccination drives, and community health education initiatives across Southern Leyte.',
  },
  {
    period: 'Today',
    title: 'Continuing the Mission',
    desc: "Leyte Baptist Hospital serves thousands of patients each year, with a renewed focus on community health, patient-centered care, and accessible medicine for all.",
  },
]

const values = [
  { title: 'Compassion', desc: 'We treat every patient with kindness, empathy, and genuine concern for their wellbeing — as individuals, not cases.' },
  { title: 'Integrity', desc: 'We uphold honesty, transparency, and ethical standards in all aspects of our clinical and administrative work.' },
  { title: 'Excellence', desc: 'We strive for the highest standards of medical care, patient safety, and professional development at every level.' },
  { title: 'Service', desc: 'We are called to serve — our patients, our community, our staff, and one another without condition.' },
  { title: 'Respect', desc: 'We honor the dignity of every person who entrusts their care to us, regardless of background or circumstance.' },
  { title: 'Community', desc: "We are part of the communities we serve, and everything we do is grounded in that relationship." },
]

const leadership = [
  { name: 'Dr. [Hospital Administrator]', title: 'Hospital Administrator', dept: 'Administration' },
  { name: 'Dr. [Medical Director]', title: 'Medical Director', dept: 'Medical Staff Office' },
  { name: '[Chief Nurse]', title: 'Chief Nurse', dept: 'Nursing Department' },
  { name: '[Finance Officer]', title: 'Finance Officer', dept: 'Finance & Administration' },
]

type Tab = 'story' | 'mission' | 'leadership'

export default function AboutPage({ navigate }: Props) {
  const [tab, setTab] = useState<Tab>('story')
  const [visible, setVisible] = useState(false)
  const [ringHover, setRingHover] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)
  const founderRef = useRef<HTMLElement>(null)

  // Fade + lift the Founder's Wall into view the first time it scrolls
  // into the viewport. Skips the animation for reduced-motion users.
  useEffect(() => {
    const el = founderRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stack the portrait above the text on narrow screens.
  useEffect(() => {
    const checkWidth = () => setIsNarrow(window.innerWidth <= 720)
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Founder's Wall — dedication to our founding father, shown on every tab */}
      <section
        ref={founderRef}
        style={{
          position: 'relative',
          backgroundImage:
            'linear-gradient(180deg, #0a1d38 0%, #0d2240 55%, #0f2747 100%), repeating-linear-gradient(115deg, rgba(184,146,90,0.05) 0px, rgba(184,146,90,0.05) 1px, transparent 1px, transparent 64px)',
          padding: isNarrow ? '64px 20px 72px' : '88px 24px 96px',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <div style={{ position: 'relative', maxWidth: '980px', margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#c9a26b',
              marginBottom: '40px',
            }}
          >
            {/* <span
              style={{
                display: 'inline-block',
                width: '28px',
                height: '1px',
                backgroundColor: '#c9a26b',
                verticalAlign: 'middle',
                marginRight: '14px',
                opacity: 0.6,
              }}
            /> */}
            In Honor Of
            {/* <span
              style={{
                display: 'inline-block',
                width: '28px',
                height: '1px',
                backgroundColor: '#c9a26b',
                verticalAlign: 'middle',
                marginLeft: '14px',
                opacity: 0.6,
              }}
            /> */}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: isNarrow ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: isNarrow ? 'center' : 'left',
              gap: isNarrow ? '28px' : '56px',
            }}
          >
            {/* Portrait medallion */}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
              <div
                onMouseEnter={() => setRingHover(true)}
                onMouseLeave={() => setRingHover(false)}
                style={{
                  position: 'relative',
                  width: '176px',
                  height: '176px',
                  borderRadius: '50%',
                  padding: '8px',
                  background: 'conic-gradient(from 0deg, #b8925a, #e9c98f, #b8925a, #8a6a3d, #b8925a)',
                  boxShadow: '0 0 0 1px rgba(201,162,107,0.35)',
                  transform: ringHover ? 'scale(1.035)' : 'scale(1)',
                  filter: ringHover ? 'brightness(1.12)' : 'brightness(1)',
                  transition: 'transform 0.5s ease, filter 0.5s ease',
                }}
              >
                <img
                  src={founder.photo}
                  alt={founder.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                    backgroundColor: '#16305a',
                    border: '3px solid #0d2240',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#0d2240',
                  background: 'linear-gradient(135deg, #e9c98f, #b8925a)',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 14px rgba(184,146,90,0.25)',
                }}
              >
                {founder.years}
              </div>
            </div>

            {/* Divider */}
            <div
              style={
                isNarrow
                  ? { width: '64px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,107,0.4), transparent)' }
                  : { width: '1px', minHeight: '120px', alignSelf: 'stretch', background: 'linear-gradient(180deg, transparent, rgba(201,162,107,0.4), transparent)' }
              }
            />

            {/* Content */}
            <div style={{ flex: '1 1 320px', minWidth: 0, maxWidth: isNarrow ? 'none' : '560px' }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  color: '#ffffff',
                  margin: '0 0 8px',
                  lineHeight: 1.2,
                }}
              >
                {founder.name}
              </h2>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#7fe3e0',
                  marginBottom: '20px',
                }}
              >
                {founder.title}
              </div>
              <p
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: '18px',
                  fontStyle: 'italic',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.72)',
                  margin: 0,
                }}
              >
                &ldquo;{founder.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Page header */}
      {/* <div style={{ backgroundColor: '#0d2240', padding: '72px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#7fe3e0',
              marginBottom: '12px',
            }}
          >
            Who We Are
          </div>
          <h1
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(32px, 5vw, 52px)',
              color: '#ffffff',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            About Leyte Baptist Hospital
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', lineHeight: 1.75, fontSize: '15px', margin: 0 }}>
            A community hospital dedicated to delivering accessible, professional, and compassionate
            healthcare to the people of Southern Leyte.
          </p>
        </div>
      </div> */}

      {/* Tab nav */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #f3f4f6',
          position: 'sticky',
          top: '64px',
          zIndex: 40,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex' }}>
          {([
            { id: 'story', label: 'Our Story' },
            { id: 'mission', label: 'Mission & Values' },
            { id: 'leadership', label: 'Leadership' },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '16px 20px',
                fontSize: '13px',
                fontWeight: 500,
                border: 'none',
                borderBottom: tab === t.id ? '2px solid #1a7f7a' : '2px solid transparent',
                background: 'none',
                cursor: 'pointer',
                color: tab === t.id ? '#1a7f7a' : '#6b7280',
                transition: 'color 0.15s, border-color 0.15s',
                marginBottom: '-1px',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Story */}
      {tab === 'story' && (
        <section style={{ padding: '72px 24px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '32px',
                color: '#0d2240',
                marginBottom: '24px',
              }}
            >
              Our Story
            </h2>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '16px', marginBottom: '16px' }}>
              Leyte Baptist Hospital has its roots in the conviction that quality healthcare should be
              accessible to all — regardless of economic status, location, or circumstance. From its
              founding, the hospital has been driven by a spirit of service that goes beyond clinical
              care.
            </p>
            <p style={{ color: '#4b5563', lineHeight: 1.8, marginBottom: '56px' }}>
              Over the decades, we have grown from a modest facility into a trusted community hospital,
              serving families across Hilongos and Southern Leyte. Through typhoons, public health
              emergencies, and the evolving needs of our community, we have remained committed to being
              present when our community needs us most.
            </p>

            <h3
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '24px',
                color: '#0d2240',
                marginBottom: '36px',
              }}
            >
              Hospital Timeline
            </h3>

            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '24px',
                  bottom: '24px',
                  width: '1px',
                  backgroundColor: '#d1eeec',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {timeline.map((item, i) => (
                  <div key={i} style={{ position: 'relative', paddingLeft: '56px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '4px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        border: '2px solid #d1eeec',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#1a7f7a',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#1a7f7a',
                        marginBottom: '6px',
                      }}
                    >
                      {item.period}
                    </div>
                    <h4
                      style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontSize: '20px',
                        color: '#0d2240',
                        margin: '0 0 8px',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Values */}
      {tab === 'mission' && (
        <section style={{ padding: '72px 24px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '64px',
              }}
            >
              {[
                {
                  label: 'Mission',
                  text: '[Mission statement placeholder — to be provided by hospital administration and updated through the CMS.]',
                },
                {
                  label: 'Vision',
                  text: '[Vision statement placeholder — to be provided by hospital administration and updated through the CMS.]',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: '36px',
                    backgroundColor: '#f5f7f9',
                    borderLeft: '3px solid #1a7f7a',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#1a7f7a',
                      marginBottom: '16px',
                    }}
                  >
                    {item.label}
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '20px',
                      color: '#0d2240',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      margin: 0,
                    }}
                  >
                    "{item.text}"
                  </p>
                </div>
              ))}
            </div>

            <h3
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '28px',
                color: '#0d2240',
                marginBottom: '32px',
              }}
            >
              Core Values
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {values.map((value) => (
                <div
                  key={value.title}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '20px',
                    border: '1px solid #f3f4f6',
                    borderRadius: '2px',
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      flexShrink: 0,
                      backgroundColor: '#1a7f7a',
                      borderRadius: '2px',
                      alignSelf: 'stretch',
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: '#0d2240', marginBottom: '6px', fontSize: '14px' }}>
                      {value.title}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.7 }}>{value.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership */}
      {tab === 'leadership' && (
        <section style={{ padding: '72px 24px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '32px',
                color: '#0d2240',
                marginBottom: '12px',
              }}
            >
              Hospital Leadership
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '48px', lineHeight: 1.75, fontSize: '15px' }}>
              Our leadership team guides Leyte Baptist Hospital with a commitment to excellence, compassion, and service to the community of Southern Leyte.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '32px',
              }}
            >
              {leadership.map((person) => (
                <div key={person.name} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '50%',
                      backgroundColor: '#f5f7f9',
                      border: '3px solid #ffffff',
                      boxShadow: '0 2px 12px rgba(13,34,64,0.1)',
                      margin: '0 auto 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ color: '#d1d5db' }}>
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ fontWeight: 600, color: '#0d2240', fontSize: '14px', marginBottom: '4px' }}>
                    {person.name}
                  </div>
                  <div style={{ color: '#1a7f7a', fontSize: '12px', fontWeight: 500, marginBottom: '4px' }}>
                    {person.title}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '12px' }}>{person.dept}</div>
                  <div style={{ color: '#d1d5db', fontSize: '11px', fontStyle: 'italic', marginTop: '6px' }}>
                    Placeholder — update via CMS
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '56px',
                padding: '24px',
                backgroundColor: '#f5f7f9',
                borderRadius: '2px',
                fontSize: '13px',
                color: '#9ca3af',
                lineHeight: 1.7,
              }}
            >
              Leadership profiles and photographs will be updated by authorized administrators through the hospital CMS. Contact the administration office to submit updated information.
            </div>
          </div>
        </section>
      )}
    </div>
  )
}