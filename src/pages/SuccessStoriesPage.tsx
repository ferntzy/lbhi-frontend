import { useState } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

const stories = [
  {
    id: 1,
    title: "A Mother's Second Chance",
    dept: 'Maternal & Child Care',
    date: 'June 2025',
    quote:
      '"After everything we went through, the care we received gave our family hope. The doctors and nurses here treated us like family."',
    attribution: '— Maria Santos, Hilongos resident',
    excerpt:
      'When complications arose during her third delivery, Maria was rushed to Leyte Baptist Hospital in the early hours of the morning. The quick response of the nursing staff and attending physician proved decisive.',
    fullStory:
      "The night was difficult for the Santos family. Maria's blood pressure had spiked unexpectedly in the final weeks of her pregnancy, and her husband drove through the rain to the hospital. The emergency room team received them immediately, and the obstetrics department was alerted within minutes. After a safe delivery and three days of close monitoring, Maria was discharged with her newborn — healthy, grateful, and relieved. 'I didn't know what to expect,' she recalled. 'But from the moment we arrived, we felt that we were not alone.' Her story is one of many that remind us why this work matters.",
    image: 'https://images.unsplash.com/photo-1527822618093-743f3e57977c?w=800&h=600&fit=crop&auto=format',
    tags: ['Maternal Care', 'Emergency', 'Recovery'],
    consent: true,
  },
  {
    id: 2,
    title: 'Recovering Together as a Community',
    dept: 'Community Outreach',
    date: 'May 2025',
    quote:
      '"The medical mission came to us when we had no way to get to the hospital. For many in our community, it was the first time in years we had seen a doctor."',
    attribution: '— Barangay Health Worker, Hilongos',
    excerpt:
      'Following the annual flood season, many families in isolated barangays could not access healthcare. LBH organized a medical mission bringing essential services directly to the community.',
    fullStory:
      "The medical team traveled by boat to reach the more isolated parts of the municipality. They set up a temporary clinic in the barangay hall — examining over 200 patients in a single day. 'The children were the most in need,' noted one of the nurses. Many had not been seen by a physician in months. The team dispensed medicines, provided wound care, and made referrals for cases requiring hospital admission. It was an ordinary Saturday for the team. For the community, it was something much more.",
    image: 'https://images.unsplash.com/photo-1652148439208-3e73641d0725?w=800&h=600&fit=crop&auto=format',
    tags: ['Community', 'Medical Mission', 'Outreach'],
    consent: true,
  },
  {
    id: 3,
    title: 'Back on His Feet After Surgery',
    dept: 'Surgical Department',
    date: 'April 2025',
    quote:
      '"I was afraid of what would happen. But the surgeon explained everything clearly, and I trusted them. Now I\'m walking again."',
    attribution: '— Patient, 58 years old',
    excerpt:
      "After years of living with a condition that made walking painful, a patient from a nearby municipality finally sought care — and found his life changed by a procedure at Leyte Baptist Hospital.",
    fullStory:
      "The patient had put off surgery for years, partly from fear and partly from the logistical challenges of traveling to Cebu for treatment. When he learned the procedure was available at Leyte Baptist Hospital, he made an appointment. After a successful operation and a two-week recovery under the care of the nursing staff, he returned to his farm. 'I didn't think I'd be this comfortable walking at my age,' he said at his follow-up visit. His daughter, who accompanied him, cried when he demonstrated his improved mobility. Stories like this remind us that what we do here matters — even for patients who travel hours just to reach our doors.",
    image: 'https://images.unsplash.com/photo-1680759291470-9c10abc59668?w=800&h=600&fit=crop&auto=format',
    tags: ['Surgery', 'Recovery', 'Patient Care'],
    consent: true,
  },
]

export default function SuccessStoriesPage({ navigate }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div style={{ paddingTop: '64px' }}>
      <div style={{ backgroundColor: '#0d2240', padding: '72px 24px' }}>
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
            Patient Stories
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
            Stories That Inspire Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', lineHeight: 1.75, fontSize: '15px' }}>
            Behind every patient visit is a story of trust, resilience, and the quiet dedication of
            our medical team. These are a few of the moments that remind us why we do this work.
          </p>
        </div>
      </div>

      {/* Privacy notice */}
      <div style={{ backgroundColor: '#f5f7f9', borderBottom: '1px solid #e5e7eb', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span>🔒</span>
          <span>
            All patient stories are published with written consent from the patient or their legal
            representative. Names and identifying details may be changed or withheld upon request.
            No medical records or private clinical information are disclosed without explicit
            authorization.
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {stories.map((story, index) => (
            <article key={story.id}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '48px',
                  alignItems: 'center',
                  direction: index % 2 === 1 ? 'rtl' : 'ltr',
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#e5e7eb',
                    direction: 'ltr',
                  }}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: 'rgba(13,34,64,0.75)',
                          color: '#7fe3e0',
                          fontSize: '10px',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div style={{ direction: 'ltr' }}>
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
                    {story.dept} · {story.date}
                  </div>

                  <h2
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: 'clamp(22px, 3vw, 32px)',
                      color: '#0d2240',
                      margin: '0 0 20px',
                      lineHeight: 1.25,
                    }}
                  >
                    {story.title}
                  </h2>

                  {/* Pull quote */}
                  <div
                    style={{
                      borderLeft: '3px solid #1a7f7a',
                      paddingLeft: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    <blockquote
                      style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontSize: '17px',
                        color: '#0d2240',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        margin: '0 0 8px',
                      }}
                    >
                      {story.quote}
                    </blockquote>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>{story.attribution}</div>
                  </div>

                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.75, margin: '0 0 16px' }}>
                    {story.excerpt}
                  </p>

                  {expanded === story.id && (
                    <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.8, margin: '0 0 16px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                      {story.fullStory}
                    </p>
                  )}

                  <button
                    onClick={() => setExpanded(expanded === story.id ? null : story.id)}
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
                    {expanded === story.id ? 'Close Story ↑' : 'Read Full Story →'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '80px',
            backgroundColor: '#f5f7f9',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1a7f7a',
              marginBottom: '12px',
            }}
          >
            Share Your Story
          </div>
          <h3
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '26px',
              color: '#0d2240',
              marginBottom: '16px',
            }}
          >
            Has Leyte Baptist Hospital Made a Difference in Your Life?
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 24px' }}>
            If you would like to share your experience and story with us, we would be honoured to
            hear from you. All submissions are reviewed, and stories are only published with your
            explicit written consent.
          </p>
          <button
            onClick={() => navigate('contact')}
            style={{
              backgroundColor: '#1a7f7a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '12px 28px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d9490')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a7f7a')}
          >
            Contact Us to Share Your Story
          </button>
        </div>
      </div>
    </div>
  )
}
