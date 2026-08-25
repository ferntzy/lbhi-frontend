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

const founder: FounderData = {
  name: 'Dr. Lincoln Nelson',
  title: 'Founding Physician',
  years: '1923 – 2012',
  photo: '/images/founder-portrait.jpg',
  quote:
    'Healing is a calling, not a transaction — every patient who walks through our doors deserves dignity and care.',
}

// Timeline as story beats — keep descriptions short
const timeline = [
  {
    year: '1975',
    label: '1975',
    title: 'Hospital Established',
    desc: 'Leyte Baptist Hospital opens its doors to bring affordable, compassionate care to Southern Leyte.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=600&fit=crop&auto=format',
  },
  {
    year: '1980s',
    label: 'Early Years',
    title: 'Building the Foundation',
    desc: 'Services expand and dedicated medical professionals join to serve a growing patient community.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&auto=format',
  },
  {
    year: '1990s',
    label: 'Growth',
    title: 'Expanding Facilities',
    desc: 'New departments — laboratory, radiology, and maternal care — strengthen what the hospital can offer.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop&auto=format',
  },
  {
    year: '2010s',
    label: 'Recent Years',
    title: 'Community Programs',
    desc: 'Medical missions, vaccination drives, and health education reach barangays across Southern Leyte.',
    image: 'https://images.unsplash.com/photo-1652148439208-3e73641d0725?w=600&h=600&fit=crop&auto=format',
  },
  {
    year: 'Today',
    label: 'Today',
    title: 'Continuing the Mission',
    desc: 'Thousands of patients each year. Patient-centered care. Accessible medicine for all.',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=600&fit=crop&auto=format',
  },
]

const values = [
  { title: 'Compassion', desc: 'We treat every patient with kindness, empathy, and genuine concern for their wellbeing — as individuals, not cases.' },
  { title: 'Integrity', desc: 'We uphold honesty, transparency, and ethical standards in all aspects of our clinical and administrative work.' },
  { title: 'Excellence', desc: 'We strive for the highest standards of medical care, patient safety, and professional development at every level.' },
  { title: 'Service', desc: 'We are called to serve — our patients, our community, our staff, and one another without condition.' },
  { title: 'Respect', desc: 'We honor the dignity of every person who entrusts their care to us, regardless of background or circumstance.' },
  { title: 'Community', desc: 'We are part of the communities we serve, and everything we do is grounded in that relationship.' },
]

const leadership = [
  { name: 'Dr. [Hospital Administrator]', title: 'Hospital Administrator', dept: 'Administration' },
  { name: 'Dr. [Medical Director]', title: 'Medical Director', dept: 'Medical Staff Office' },
  { name: '[Chief Nurse]', title: 'Chief Nurse', dept: 'Nursing Department' },
  { name: '[Finance Officer]', title: 'Finance Officer', dept: 'Finance & Administration' },
]

// Height (in px) of the main fixed nav bar above this page.
const STICKY_TOP = 64

// ── Shared type scale ──────────────────────────────────────────
// Every "eyebrow" label across the page uses this exact styling so
// labels read as one consistent system, not one-off treatments.
const eyebrowStyle = {
  fontSize: '11.5px',
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: '#1a7f7a',
}

export default function AboutPage({ navigate }: Props) {
  const [visible, setVisible] = useState(false)
  const [isNarrow, setIsNarrow] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1280)
  const [timelineIndex, setTimelineIndex] = useState(0)
  const [progress, setProgress] = useState(0) // 0..1 continuous scroll progress through the timeline section
  const founderRef = useRef<HTMLElement>(null)
  const timelineSectionRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const checkWidth = () => {
      setIsNarrow(window.innerWidth <= 720)
      setWindowWidth(window.innerWidth)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  // Scroll-driven horizontal filmstrip: maps vertical scroll position within
  // the pinned section to a continuous 0..1 progress value. The track itself
  // is translated horizontally by this progress, so cards continuously slide
  // in from outside the viewport rather than jumping between discrete states.
  useEffect(() => {
    const section = timelineSectionRef.current
    if (!section) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ticking = false

    const update = () => {
      ticking = false
      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight
      const pinnedH = viewportH - STICKY_TOP
      const scrollable = section.offsetHeight - pinnedH
      if (scrollable <= 0) return

      const scrolled = STICKY_TOP - rect.top
      const p = Math.min(1, Math.max(0, scrolled / scrollable))
      setProgress(p)
      const idx = Math.min(timeline.length - 1, Math.round(p * (timeline.length - 1)))
      setTimelineIndex(idx)
    }

    const onScroll = () => {
      if (prefersReducedMotion) {
        update()
        return
      }
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isNarrow])

  // Layout constants for the filmstrip — deterministic, no measuring needed
  const ITEM_WIDTH = isNarrow ? 230 : 380
  const GAP = isNarrow ? 40 : 110
  const EDGE_SPACER = isNarrow ? Math.round(windowWidth * 0.3) : Math.round(windowWidth * 0.32)
  const CIRCLE_SIZE = isNarrow ? 100 : 160
  const ROW_H = isNarrow ? 150 : 195
  const CIRCLE_WRAP_H = CIRCLE_SIZE + 28
  const CARD_H = ROW_H * 2 + CIRCLE_WRAP_H
  const LINE_TOP = ROW_H + CIRCLE_WRAP_H / 2

  const trackWidth =
    EDGE_SPACER * 2 + timeline.length * ITEM_WIDTH + (timeline.length - 1) * GAP
  const maxOffset = Math.max(0, trackWidth - windowWidth)
  const offset = progress * maxOffset
  const fillWidth = Math.min(trackWidth, offset + windowWidth / 2)

  const current = timeline[timelineIndex]

  return (
    <div>
      {/* ── Founder's Wall — full viewport height, full bleed under transparent nav ── */}
      <section
        ref={founderRef}
        style={{
          backgroundColor: '#0d2240',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: isNarrow ? '96px' : '64px',
          paddingBottom: isNarrow ? '64px' : '64px',
          paddingLeft: '24px',
          paddingRight: '24px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.85s ease, transform 0.85s ease',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <div
            style={{
              ...eyebrowStyle,
              color: '#c9a26b',
              marginBottom: isNarrow ? '40px' : '56px',
              textAlign: 'center',
            }}
          >
            In Honor Of
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: isNarrow ? '36px' : '48px',
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: isNarrow ? '180px' : '220px',
                  height: isNarrow ? '180px' : '220px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(201,162,107,0.45)',
                  backgroundColor: '#16305a',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
                }}
              >
                <img
                  src={founder.photo}
                  alt={founder.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            <div style={{ maxWidth: '560px' }}>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(34px, 5.5vw, 52px)',
                  fontWeight: 400,
                  color: '#ffffff',
                  margin: '0 0 10px',
                  lineHeight: 1.12,
                }}
              >
                {founder.name}
              </h2>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#7fe3e0',
                  marginBottom: '6px',
                }}
              >
                {founder.title}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '32px',
                }}
              >
                {founder.years}
              </div>
              <p
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: isNarrow ? '19px' : '21px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.75)',
                  margin: '0 auto',
                }}
              >
                “{founder.quote}”
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue — reinforces that there's more below the fold */}
        {/* <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.5,
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Scroll
          </div>
          <div
            style={{
              width: '1px',
              height: '28px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
            }}
          />
        </div> */}
      </section>

      {/* Intro copy — short */}
      <section style={{ padding: '72px 24px 48px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ ...eyebrowStyle, marginBottom: '16px' }}>Since 1975</div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(30px, 4vw, 40px)',
              fontWeight: 400,
              color: '#0d2240',
              margin: '0 0 20px',
              lineHeight: 1.15,
            }}
          >
            Our Story
          </h2>
          <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '17px', margin: 0, fontWeight: 400 }}>
            Leyte Baptist Hospital was founded on the conviction that quality healthcare should
            be accessible to all. From a modest beginning, we have grown into a trusted community
            hospital serving families across Hilongos and Southern Leyte.
          </p>
        </div>
      </section>

      {/* ── Continuous horizontal filmstrip timeline ── */}
      <section
        ref={timelineSectionRef}
        style={{
          backgroundColor: '#ffffff',
          position: 'relative',
          height: `${timeline.length * 85}vh`,
          borderTop: '1px solid #eef0f2',
          borderBottom: '1px solid #eef0f2',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: `${STICKY_TOP}px`,
            height: `calc(100vh - ${STICKY_TOP}px)`,
            minHeight: '640px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Floating "now viewing" label — fixed in place, updates with progress */}
          <div
            style={{
              position: 'absolute',
              top: isNarrow ? '28px' : '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            <div style={{ ...eyebrowStyle, marginBottom: '10px' }}>Our History</div>
            <div
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: isNarrow ? '24px' : '32px',
                fontWeight: 400,
                color: '#0d2240',
                lineHeight: 1.2,
                transition: 'opacity 0.3s ease',
              }}
            >
              {current.title}
            </div>
          </div>

          {/* Horizontally scrolling track */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: `${CARD_H}px`,
              overflow: 'visible',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: `${CARD_H}px`,
                width: `${trackWidth}px`,
                display: 'flex',
                alignItems: 'stretch',
                transform: `translateX(${-offset}px)`,
                willChange: 'transform',
              }}
            >
              {/* leading spacer so the first card enters from off-screen */}
              <div style={{ flex: `0 0 ${EDGE_SPACER}px` }} />

              {/* base connecting line, spans the whole track */}
              <div
                style={{
                  position: 'absolute',
                  top: `${LINE_TOP}px`,
                  left: 0,
                  width: `${trackWidth}px`,
                  height: '2px',
                  backgroundColor: '#e5e7eb',
                }}
              />
              {/* filled progress overlay on the line — flat color, no glow */}
              <div
                style={{
                  position: 'absolute',
                  top: `${LINE_TOP}px`,
                  left: 0,
                  width: `${fillWidth}px`,
                  height: '2px',
                  backgroundColor: '#1a7f7a',
                }}
              />

              {timeline.map((step, i) => {
                const contentBelow = i % 2 === 0
                const reached = i <= timelineIndex
                const active = i === timelineIndex
                return (
                  <div
                    key={step.label}
                    style={{
                      flex: `0 0 ${ITEM_WIDTH}px`,
                      marginRight: i < timeline.length - 1 ? `${GAP}px` : 0,
                      display: 'grid',
                      gridTemplateRows: `${ROW_H}px ${CIRCLE_WRAP_H}px ${ROW_H}px`,
                      position: 'relative',
                    }}
                  >
                    {/* top row */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingBottom: '24px',
                        opacity: contentBelow ? 0 : reached ? 1 : 0.4,
                        transition: 'opacity 0.4s ease',
                      }}
                    >
                      {!contentBelow && (
                        <>
                          <div
                            style={{
                              fontSize: '12.5px',
                              fontWeight: 700,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: active ? '#1a7f7a' : '#9ca3af',
                              marginBottom: '10px',
                              transition: 'color 0.35s ease',
                            }}
                          >
                            {step.label}
                          </div>
                          <h3
                            style={{
                              fontFamily: "'DM Serif Display', Georgia, serif",
                              fontSize: isNarrow ? '23px' : '29px',
                              fontWeight: 400,
                              color: '#0d2240',
                              margin: '0 0 12px',
                              lineHeight: 1.2,
                            }}
                          >
                            {step.title}
                          </h3>
                          <p
                            style={{
                              fontSize: isNarrow ? '14.5px' : '16px',
                              fontWeight: 400,
                              color: '#6b7280',
                              lineHeight: 1.65,
                              margin: 0,
                              maxWidth: `${ITEM_WIDTH - 10}px`,
                            }}
                          >
                            {step.desc}
                          </p>
                        </>
                      )}
                    </div>

                    {/* middle row: node + photo, sitting directly on the line */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: `${CIRCLE_SIZE}px`,
                          height: `${CIRCLE_SIZE}px`,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: active ? '3px solid #1a7f7a' : '3px solid #e5e7eb',
                          boxShadow: active
                            ? '0 0 0 8px rgba(26,127,122,0.10), 0 14px 34px rgba(13,34,64,0.14)'
                            : '0 8px 22px rgba(13,34,64,0.10)',
                          backgroundColor: '#e5e7eb',
                          transition: 'border 0.35s ease, box-shadow 0.35s ease',
                          filter: reached ? 'none' : 'grayscale(55%)',
                          opacity: reached ? 1 : 0.6,
                        }}
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>

                      {/* small node dot on the line */}
                      <div
                        style={{
                          position: 'absolute',
                          top: `calc(50% + ${CIRCLE_SIZE / 2 + 16}px)`,
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: active ? '14px' : '10px',
                          height: active ? '14px' : '10px',
                          borderRadius: '50%',
                          backgroundColor: reached ? '#1a7f7a' : '#ffffff',
                          border: '2px solid ' + (reached ? '#1a7f7a' : '#d1d5db'),
                          transition: 'all 0.35s ease',
                        }}
                      />
                    </div>

                    {/* bottom row */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingTop: '24px',
                        opacity: contentBelow ? (reached ? 1 : 0.4) : 0,
                        transition: 'opacity 0.4s ease',
                      }}
                    >
                      {contentBelow && (
                        <>
                          <div
                            style={{
                              fontSize: '12.5px',
                              fontWeight: 700,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: active ? '#1a7f7a' : '#9ca3af',
                              marginBottom: '10px',
                              transition: 'color 0.35s ease',
                            }}
                          >
                            {step.label}
                          </div>
                          <h3
                            style={{
                              fontFamily: "'DM Serif Display', Georgia, serif",
                              fontSize: isNarrow ? '23px' : '29px',
                              fontWeight: 400,
                              color: '#0d2240',
                              margin: '0 0 12px',
                              lineHeight: 1.2,
                            }}
                          >
                            {step.title}
                          </h3>
                          <p
                            style={{
                              fontSize: isNarrow ? '14.5px' : '16px',
                              fontWeight: 400,
                              color: '#6b7280',
                              lineHeight: 1.65,
                              margin: 0,
                              maxWidth: `${ITEM_WIDTH - 10}px`,
                            }}
                          >
                            {step.desc}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* trailing spacer so the last card exits toward off-screen too */}
              <div style={{ flex: `0 0 ${EDGE_SPACER}px` }} />
            </div>
          </div>

          {/* Overall progress bar — pinned to bottom of the section */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '3px',
              backgroundColor: '#f0f2f4',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress * 100}%`,
                backgroundColor: '#1a7f7a',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section style={{ padding: '88px 24px 100px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ marginBottom: '56px' }}>
            <div style={{ ...eyebrowStyle, marginBottom: '18px' }}>Mission</div>
            <p
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(23px, 3vw, 29px)',
                fontWeight: 400,
                color: '#0d2240',
                lineHeight: 1.4,
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              “[Mission statement placeholder — to be provided by hospital administration.]”
            </p>
          </div>

          <div
            style={{
              marginBottom: '80px',
              paddingBottom: '64px',
              borderBottom: '1px solid #eef0f2',
            }}
          >
            <div style={{ ...eyebrowStyle, marginBottom: '18px' }}>Vision</div>
            <p
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(23px, 3vw, 29px)',
                fontWeight: 400,
                color: '#0d2240',
                lineHeight: 1.4,
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              “[Vision statement placeholder — to be provided by hospital administration.]”
            </p>
          </div>

          <div style={{ ...eyebrowStyle, marginBottom: '16px' }}>What Guides Us</div>
          <h3
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(26px, 3.4vw, 32px)',
              fontWeight: 400,
              color: '#0d2240',
              margin: '0 0 44px',
              lineHeight: 1.2,
            }}
          >
            Core Values
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {values.map((value) => (
              <div
                key={value.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isNarrow ? '1fr' : '180px 1fr',
                  gap: isNarrow ? '6px' : '32px',
                  padding: '26px 0',
                  borderTop: '1px solid #eef0f2',
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontWeight: 400,
                    color: '#0d2240',
                    fontSize: '18px',
                    lineHeight: 1.4,
                  }}
                >
                  {value.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '15.5px', lineHeight: 1.75, fontWeight: 400 }}>
                  {value.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section style={{ padding: '88px 24px 100px', backgroundColor: '#f5f7f9' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ ...eyebrowStyle, marginBottom: '18px' }}>Our Team</div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(30px, 4vw, 40px)',
              fontWeight: 400,
              color: '#0d2240',
              margin: '0 0 20px',
              lineHeight: 1.15,
            }}
          >
            Hospital Leadership
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '60px', lineHeight: 1.8, fontSize: '16px', fontWeight: 400, maxWidth: '560px' }}>
            Our leadership team guides Leyte Baptist Hospital with a commitment to excellence,
            compassion, and service to the community of Southern Leyte.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {leadership.map((person) => (
              <div
                key={person.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isNarrow ? '1fr' : '1fr auto',
                  gap: isNarrow ? '6px' : '24px',
                  padding: '30px 0',
                  borderTop: '1px solid #e2e5e9',
                  alignItems: 'baseline',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontWeight: 400,
                      fontSize: '21px',
                      color: '#0d2240',
                      marginBottom: '6px',
                      lineHeight: 1.3,
                    }}
                  >
                    {person.name}
                  </div>
                  <div
                    style={{
                      color: '#1a7f7a',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {person.title}
                  </div>
                </div>
                <div
                  style={{
                    color: '#9ca3af',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textAlign: isNarrow ? 'left' : 'right',
                  }}
                >
                  {person.dept}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: '52px',
              fontSize: '13px',
              fontStyle: 'italic',
              color: '#b0b6bd',
              lineHeight: 1.6,
            }}
          >
            Leadership names and photographs will be updated by authorized administrators.
          </p>
        </div>
      </section>
    </div>
  )
}