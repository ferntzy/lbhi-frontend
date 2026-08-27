import { useState } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

const INK = '#0d2240'
const INK_DEEP = '#081729'
const GOLD = '#c9a45c'
const TEAL = '#7fe3e0'
const SERIF = "'DM Serif Display', Georgia, serif"

const verses = [
  {
    text: 'He heals the brokenhearted and binds up their wounds.',
    ref: 'Psalm 147:3',
  },
  {
    text: 'Beloved, I wish above all things that thou mayest prosper and be in health.',
    ref: '3 John 1:2',
  },
  {
    text: 'I was sick, and ye visited me.',
    ref: 'Matthew 25:36',
  },
]

const values = [
  {
    title: 'Compassion',
    text: 'We see Christ in every patient. Care is given not because it is owed, but because it is a calling.',
  },
  {
    title: 'Integrity',
    text: 'Honest diagnosis, honest counsel, honest billing. We treat patients the way we would want our own families treated.',
  },
  {
    title: 'Service',
    text: 'The hospital exists for the community, not the other way around — from the wards to the barangays we visit.',
  },
  {
    title: 'Stewardship',
    text: 'We treat our staff, our resources, and the trust placed in us as things to be cared for, not spent.',
  },
]

export default function FaithPage({ navigate }: Props) {
  const [verseIndex, setVerseIndex] = useState(0)

  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '62vh',
          display: 'flex',
          alignItems: 'flex-end',
          paddingTop: '64px',
          overflow: 'hidden',
          backgroundColor: INK_DEEP,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1800&h=1000&fit=crop&auto=format)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,23,41,0.72) 0%, rgba(8,23,41,0.55) 40%, rgba(8,23,41,0.94) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px 88px',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: '20px',
            }}
          >
            Our Faith
          </div>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(38px, 6vw, 68px)',
              color: '#ffffff',
              lineHeight: 1.1,
              margin: '0 0 24px',
              maxWidth: '760px',
              letterSpacing: '-0.02em',
            }}
          >
            A hospital built on a
            <br />
            <em style={{ color: TEAL, fontStyle: 'italic' }}>calling, not a business plan.</em>
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.68)',
              fontSize: '17px',
              lineHeight: 1.8,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            Leyte Baptist Hospital was founded to bring healing in the name of Christ. That
            purpose still shapes how we care for every patient who walks through our doors.
          </p>
        </div>
      </section>

      {/* ── Mission statement ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '56px' }}>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#1a7f7a',
                  marginBottom: '16px',
                }}
              >
                Our Mission
              </div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(26px, 3.2vw, 36px)',
                  color: INK,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                To provide healthcare of the highest quality, delivered in the spirit of
                Christ's love, to every person who comes to us — regardless of faith, status,
                or ability to pay.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.85, margin: '0 0 20px' }}>
                We are a mission hospital in the fullest sense — not a hospital that happens to
                have a chapel, but a ministry that happens to practice medicine. Every
                consultation, surgery, and late-night emergency is an act of service we
                understand to be sacred.
              </p>
              <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
                This conviction shapes how our staff are trained, how patients are treated, and
                how we show up in the barangays we serve beyond our walls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Word of God — rotating verse ── */}
      <section style={{ backgroundColor: INK, padding: '96px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: '32px',
            }}
          >
            Word of God
          </div>

          <blockquote
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(24px, 3.6vw, 38px)',
              color: '#ffffff',
              lineHeight: 1.5,
              margin: '0 0 24px',
              fontStyle: 'italic',
              minHeight: '140px',
            }}
          >
            "{verses[verseIndex].text}"
          </blockquote>

          <div style={{ color: TEAL, fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '40px' }}>
            {verses[verseIndex].ref}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {verses.map((_, i) => (
              <button
                key={i}
                onClick={() => setVerseIndex(i)}
                aria-label={`Show verse ${i + 1}`}
                style={{
                  width: i === verseIndex ? '22px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: i === verseIndex ? TEAL : 'rgba(255,255,255,0.28)',
                  transition: 'all 0.25s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our story ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div style={{ overflow: 'hidden', backgroundColor: '#e5e7eb', aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1576765607924-3f7b0c8f4a5f?w=900&h=675&fit=crop&auto=format"
                alt="Hospital chapel or founding history"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  color: INK,
                  lineHeight: 1.15,
                  margin: '0 0 24px',
                }}
              >
                Why a "Baptist" hospital
              </h2>
              <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.85, margin: '0 0 20px' }}>
                Leyte Baptist Hospital was established by Baptist missionaries and local church
                partners who believed that healing the body and caring for the soul could not be
                separated. What began as a small clinic serving Hilongos and the surrounding
                barangays has grown into a full hospital — but the founding conviction hasn't
                changed.
              </p>
              <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
                We welcome and treat patients of every faith and background. Our identity as a
                mission hospital is not a requirement placed on those we serve — it's a promise
                about how we will serve them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ backgroundColor: '#f5f7f9', padding: '96px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: INK,
              lineHeight: 1.15,
              margin: '0 0 56px',
              maxWidth: '520px',
            }}
          >
            What this looks like in practice
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
            {values.map((v) => (
              <div key={v.title}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: INK, margin: '0 0 12px' }}>
                  {v.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chaplaincy / prayer CTA ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '96px 24px 112px' }}>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '64px 32px',
            backgroundColor: INK,
            borderRadius: '12px',
          }}
        >
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(24px, 3.2vw, 32px)',
              color: '#ffffff',
              lineHeight: 1.3,
              margin: '0 0 16px',
            }}
          >
            Would you like someone to pray with you?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.7, margin: '0 0 32px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Our chaplaincy team is available to patients and families of any faith, any hour of
            the day.
          </p>
          <button
            onClick={() => navigate('contact')}
            style={{
              backgroundColor: '#1a7f7a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '14px 30px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            Request chaplaincy visit
          </button>
        </div>
      </section>
    </div>
  )
}