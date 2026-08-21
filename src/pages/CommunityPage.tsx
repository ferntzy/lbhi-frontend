import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

const activities = [
  {
    id: 1,
    title: 'Medical Mission — Barangay Imelda, Hilongos',
    date: 'July 2025',
    location: 'Barangay Imelda, Hilongos, Leyte',
    type: 'Medical Mission',
    desc: 'A full-day medical mission brought general medicine, obstetrics, pediatric, and pharmacy services to Barangay Imelda. Over 350 patients were seen, with medicines provided free of charge from the hospital\'s community health allocation.',
    highlights: ['350+ patients served', 'Free medicines distributed', 'Laboratory tests on-site', 'Referrals for complex cases'],
    image: 'https://images.unsplash.com/photo-1652148439208-3e73641d0725?w=900&h=600&fit=crop&auto=format',
  },
  {
    id: 2,
    title: 'Dengue Awareness and Vaccination Drive',
    date: 'June 2025',
    location: 'Hilongos Municipal Hall and selected Barangays',
    type: 'Health Campaign',
    desc: 'In coordination with the Department of Health and the Hilongos Local Government Unit, LBH participated in a multi-day dengue awareness campaign. Residents received health education on prevention, early warning signs, and the importance of proper waste disposal and source reduction.',
    highlights: ['DOH and LGU partnership', 'Health education sessions', 'Free consultations', 'Community mobilization'],
    image: 'https://images.unsplash.com/photo-1653508311277-1ecf6ee52c5e?w=900&h=600&fit=crop&auto=format',
  },
  {
    id: 3,
    title: 'Community Health Education — Maternal & Child Health',
    date: 'May 2025',
    location: 'Multiple Barangays, Hilongos',
    type: 'Health Education',
    desc: 'Nurses and midwives from the Maternal & Child Care Department conducted health education sessions for mothers and caregivers across several barangays. Topics included proper nutrition during pregnancy, breastfeeding, child immunizations, and newborn care basics.',
    highlights: ['Mothers and caregivers reached', 'Nutrition guidance provided', 'Breastfeeding support', 'Immunization reminders'],
    image: 'https://images.unsplash.com/photo-1621353880594-70b5fd44ecb3?w=900&h=600&fit=crop&auto=format',
  },
]

const programs = [
  { title: 'Medical Missions', desc: 'Regular medical missions to underserved communities in Hilongos and nearby municipalities.' },
  { title: 'Vaccination Campaigns', desc: 'Participation in DOH and LGU-led vaccination drives for vaccine-preventable diseases.' },
  { title: 'Health Education', desc: 'Community sessions on disease prevention, nutrition, maternal health, and sanitation.' },
  { title: 'Disaster Response', desc: 'Medical support during and after natural disasters and community emergencies.' },
  { title: 'School Health Programs', desc: 'Coordination with local schools for health screenings, deworming, and health education.' },
  { title: 'Senior Citizen Services', desc: 'Health programs and priority services for senior citizens and persons with disabilities.' },
]

export default function CommunityPage({ navigate }: Props) {
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
            Beyond Our Walls
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
            Serving Our Community
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '600px', lineHeight: 1.75, fontSize: '15px' }}>
            Healthcare at Leyte Baptist Hospital extends beyond our facility. Through medical
            missions, outreach programs, and community health initiatives, we bring care directly to
            the people who need it most.
          </p>
        </div>
      </div>

      {/* Programs overview */}
      <section style={{ backgroundColor: '#f5f7f9', padding: '56px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '28px',
              color: '#0d2240',
              marginBottom: '32px',
            }}
          >
            Our Community Programs
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {programs.map((program) => (
              <div
                key={program.title}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f3f4f6',
                  padding: '20px',
                  borderRadius: '2px',
                }}
              >
                <div style={{ fontWeight: 600, color: '#0d2240', fontSize: '14px', marginBottom: '8px' }}>
                  {program.title}
                </div>
                <div style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.65 }}>{program.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity stories */}
      <section style={{ padding: '64px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '32px',
              color: '#0d2240',
              marginBottom: '48px',
            }}
          >
            Recent Activities
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '48px',
                  alignItems: 'center',
                }}
              >
                <div style={{ order: index % 2 === 1 ? 2 : 1 }}>
                  <div style={{ overflow: 'hidden', backgroundColor: '#e5e7eb', aspectRatio: '16/10' }}>
                    <img
                      src={activity.image}
                      alt={activity.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                      loading="lazy"
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                </div>

                <div style={{ order: index % 2 === 1 ? 1 : 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        backgroundColor: '#d1eeec',
                        color: '#136260',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '4px 12px',
                        borderRadius: '12px',
                      }}
                    >
                      {activity.type}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>{activity.date}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: 'clamp(20px, 2.5vw, 26px)',
                      color: '#0d2240',
                      margin: '0 0 10px',
                      lineHeight: 1.3,
                    }}
                  >
                    {activity.title}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#6b7280',
                      fontSize: '13px',
                      marginBottom: '16px',
                    }}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ color: '#1a7f7a', flexShrink: 0 }}>
                      <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {activity.location}
                  </div>

                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.75, marginBottom: '20px' }}>
                    {activity.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {activity.highlights.map((h) => (
                      <span
                        key={h}
                        style={{
                          backgroundColor: '#f5f7f9',
                          color: '#374151',
                          fontSize: '11px',
                          padding: '4px 10px',
                          borderRadius: '3px',
                          border: '1px solid #e5e7eb',
                        }}
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  <button
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
                    View Mission →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section style={{ backgroundColor: '#f5f7f9', padding: '72px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
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
            Collaborate With Us
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '32px',
              color: '#0d2240',
              marginBottom: '16px',
            }}
          >
            Partner With Leyte Baptist Hospital
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.75, marginBottom: '28px' }}>
            We welcome partnerships with barangay officials, local government units, schools, civic
            organizations, and NGOs interested in bringing health services to the community. Reach
            out to discuss a program or collaboration.
          </p>
          <button
            onClick={() => navigate('contact')}
            style={{
              backgroundColor: '#1a7f7a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '13px 32px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d9490')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a7f7a')}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  )
}
