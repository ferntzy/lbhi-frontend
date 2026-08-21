import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

const centers = [
  {
    id: 'yakap',
    name: 'Yakap Clinics',
    desc: 'Community-based maternal and child health program',
    fullDesc:
      'Philhealth Yakap provides comprehensive maternal and child health services to vulnerable families. Our program focuses on prenatal care, safe delivery, postnatal care, and newborn health services to ensure healthy mothers and babies in our communities.',
    services: [
      'Prenatal checkups and counseling',
      'Safe delivery assistance',
      'Postnatal care for mothers',
      'Newborn screening and care',
      'Infant nutrition guidance',
      'Family planning services',
    ],
    schedule: 'Mon–Sat, 8:00 AM – 5:00 PM',
    contact: '(053) XXX-XXXX ext. 2410',
    eligibility: 'Pregnant women and new mothers in the community',
    philhealthLink: 'https://www.philhealth.gov.ph/partners/providers/facilities/accredited/YAKAP.pdf',
    heroImage: '/images/yakap_hero.png',
  },
  {
    id: 'gamot',
    name: 'GAMOT Package Providers',
    desc: 'Medicine-at-Home Program',
    fullDesc:
      'The Gamot (Medicine-at-Home) program brings essential medicines and health services directly to remote barangays. Our mobile teams conduct outreach missions to provide free consultations, medicines, and preventive health services to underserved communities.',
    services: [
      'Free medical consultations',
      'Free essential medicines distribution',
      'Health education programs',
      'Disease prevention campaigns',
      'Vaccination services',
      'Basic health screenings',
      'Referral to hospital services',
    ],
    schedule: 'By appointment (schedule varies by barangay)',
    contact: '(053) XXX-XXXX ext. 2500',
    eligibility: 'Remote and underserved communities in Leyte',
    philhealthLink: 'https://www.philhealth.gov.ph/partners/providers/facilities/accredited/GAMOT.pdf',
  },
  {
    id: 'animal-bites',
    name: 'Animal Bite Package Providers',
    desc: 'Rabies post-exposure prophylaxis (PEP) center',
    fullDesc:
      'Our Animal Bites Center provides immediate care and rabies prophylaxis for animal bite victims. We follow international protocols to prevent rabies transmission and ensure the safety of all patients who have been bitten by animals.',
    services: [
      'Wound care and cleaning',
      'Rabies post-exposure prophylaxis (PEP)',
      'Rabies immunoglobulin (RIG) administration',
      'Tetanus prophylaxis',
      'Follow-up vaccination schedule',
      '24-hour emergency response',
      'Patient counseling and monitoring',
    ],
    schedule: '24 hours daily, 7 days a week',
    contact: '(053) XXX-XXXX (Emergency)',
    eligibility: 'All animal bite victims (no referral needed)',
    philhealthLink: 'https://www.philhealth.gov.ph/partners/providers/facilities/accredited/ABPP_073126.pdf',
  },
]

const S = {
  section: (bg: string): React.CSSProperties => ({
    backgroundColor: bg,
    padding: '80px 24px',
  }),
  container: (): React.CSSProperties => ({
    maxWidth: '1280px',
    margin: '0 auto',
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
  h3: (): React.CSSProperties => ({
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: '24px',
    color: '#0d2240',
    marginBottom: '12px',
    margin: 0,
  }),
}

export default function CentersPage({ navigate }: Props) {
  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <section style={{ backgroundColor: '#0d2240', padding: '72px 24px' }}>
        <div style={S.container()}>
          <span style={S.eyebrow()}>Accredited Health Facilities</span>
          <h1 style={{ ...S.h2('#ffffff'), fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>
            PhilHealth Accredited Programs
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '620px', lineHeight: 1.75, fontSize: '16px', margin: 0 }}>
            Leyte Baptist Hospital is an accredited provider for multiple PhilHealth programs designed to serve
            vulnerable populations and address specific health needs across Leyte.
          </p>
        </div>
      </section>

      {/* YAKAP Hero Section */}
      <section style={{ backgroundColor: '#f9fafb', padding: '60px 24px' }}>
        <div style={S.container()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <span style={S.eyebrow()}>Featured Program</span>
              <h2 style={{ ...S.h2(), marginBottom: '16px' }}>Yakap Clinics</h2>
              <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '16px', marginBottom: '20px' }}>
                {centers[0].fullDesc}
              </p>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a7f7a', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Schedule
                  </div>
                  <div style={{ color: '#1c2331', fontSize: '15px' }}>{centers[0].schedule}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#1a7f7a', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Contact
                  </div>
                  <div style={{ color: '#1c2331', fontSize: '15px' }}>{centers[0].contact}</div>
                </div>
              </div>
              <a
                href={centers[0].philhealthLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1a7f7a',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d9490')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a7f7a')}
              >
                View on PhilHealth →
              </a>
            </div>
            <div>
              <img
                src={centers[0].heroImage}
                alt="PhilHealth Yakap"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  height: '400px',
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section style={S.section('#ffffff')}>
        <div style={S.container()}>
          <span style={S.eyebrow()}>Other Programs</span>
          <h2 style={{ ...S.h2(), marginBottom: '48px' }}>Our Other Accredited Centers</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              marginBottom: '64px',
            }}
          >
            {centers.slice(1).map((center) => (
              <div
                key={center.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '32px 24px',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.1)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <h3 style={S.h3()}>{center.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px', margin: 0, paddingTop: '8px' }}>
                  {center.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Info */}
      <section style={S.section('#f9fafb')}>
        <div style={S.container()}>
          <span style={S.eyebrow()}>Full Details</span>
          <h2 style={S.h2()}>Program Information</h2>

          <div style={{ marginTop: '48px', display: 'grid', gap: '56px' }}>
            {centers.slice(1).map((center) => (
              <div
                key={center.id}
                style={{
                  paddingBottom: '40px',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
                  <div>
                    <h3 style={S.h3()}>{center.name}</h3>
                    <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '15px', margin: '16px 0 0' }}>
                      {center.fullDesc}
                    </p>
                  </div>

                  <div>
                    <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                      <h4
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#1a7f7a',
                          marginBottom: '16px',
                          margin: 0,
                        }}
                      >
                        Services Offered
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0' }}>
                        {center.services.map((service, idx) => (
                          <li
                            key={idx}
                            style={{
                              padding: '8px 0',
                              color: '#4b5563',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                            }}
                          >
                            <span style={{ color: '#1a7f7a', fontWeight: 600, marginTop: '2px' }}>•</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>

                      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>
                            Schedule
                          </div>
                          <div style={{ fontSize: '14px', color: '#1c2331', marginTop: '4px' }}>{center.schedule}</div>
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>
                            Contact
                          </div>
                          <div style={{ fontSize: '14px', color: '#1c2331', marginTop: '4px' }}>{center.contact}</div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>
                            Eligibility
                          </div>
                          <div style={{ fontSize: '14px', color: '#1c2331', marginTop: '4px' }}>{center.eligibility}</div>
                        </div>
                        <a
                          href={center.philhealthLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#1a7f7a',
                            textDecoration: 'none',
                            transition: 'color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#1d9490')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#1a7f7a')}
                        >
                          View on PhilHealth »
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={S.section('#0d2240')}>
        <div style={S.container()}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ ...S.h2('#ffffff'), marginBottom: '16px' }}>Need Our Services?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.75, marginBottom: '24px' }}>
              Contact us today to learn more about our specialized centers and programs, or to schedule
              a consultation.
            </p>
            <button
              onClick={() => navigate('contact')}
              style={{
                backgroundColor: '#1a7f7a',
                color: '#ffffff',
                border: 'none',
                padding: '12px 32px',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d9490')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a7f7a')}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
