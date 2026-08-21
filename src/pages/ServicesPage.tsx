import { useState } from 'react'
import Icon from '../components/Icon'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

const categories = [
  {
    id: 'emergency',
    name: 'Emergency Services',
    icon: 'ambulance',
    services: [
      {
        name: 'Emergency Room',
        desc: '24-hour emergency medical care for acute illnesses and injuries. Our ER team is trained to respond quickly to life-threatening and urgent medical conditions.',
        schedule: '24 hours daily, 7 days a week',
        contact: '(053) XXX-XXXX',
        requirements: 'No prior appointment needed.',
      },
    ],
  },
  {
    id: 'outpatient',
    name: 'Outpatient Services',
    icon: 'building',
    services: [
      {
        name: 'General Outpatient Consultation',
        desc: 'Scheduled consultations with resident physicians for general medical concerns, follow-up care, and preventive health checkups.',
        schedule: 'Mon–Sat, 8:00 AM – 5:00 PM',
        contact: '(053) XXX-XXXX',
        requirements: 'Bring a valid ID and PhilHealth card if applicable.',
      },
      {
        name: 'Specialty Consultations',
        desc: 'Consultations with visiting specialist physicians for specific medical conditions. Please inquire about the current visiting specialist schedule.',
        schedule: 'By appointment — schedule varies',
        contact: '(053) XXX-XXXX',
        requirements: 'Referral from primary physician may be required.',
      },
    ],
  },
  {
    id: 'inpatient',
    name: 'Inpatient Services',
    icon: 'building',
    services: [
      {
        name: 'General Ward',
        desc: 'Inpatient care for patients requiring extended observation, medical treatment, or post-procedure recovery.',
        schedule: 'Available upon physician admission',
        contact: '(053) XXX-XXXX',
        requirements: 'Physician admission order required.',
      },
      {
        name: 'Private & Semi-Private Rooms',
        desc: 'Private and semi-private room accommodations offering more comfort and privacy for patients and accompanying family members.',
        schedule: 'Subject to room availability',
        contact: '(053) XXX-XXXX',
        requirements: 'Physician admission order required.',
      },
    ],
  },
  {
    id: 'laboratory',
    name: 'Laboratory',
    icon: 'beaker',
    services: [
      {
        name: 'Clinical Laboratory Services',
        desc: 'Comprehensive diagnostic laboratory testing including CBC, blood chemistry, urinalysis, fecalysis, and other routine and specialized tests to support accurate diagnosis.',
        schedule: 'Mon–Sat, 7:00 AM – 8:00 PM',
        contact: '(053) XXX-XXXX',
        requirements: 'Laboratory request from attending physician.',
      },
    ],
  },
  {
    id: 'radiology',
    name: 'Diagnostic Imaging',
    icon: 'photo',
    services: [
      {
        name: 'X-Ray Services',
        desc: 'Conventional radiographic examinations for chest, extremities, spine, and other body regions to support physician diagnosis.',
        schedule: 'Mon–Sat, 8:00 AM – 5:00 PM',
        contact: '(053) XXX-XXXX',
        requirements: 'Radiologic request from physician.',
      },
      {
        name: 'Ultrasound',
        desc: 'Ultrasound imaging for abdominal organs, obstetric monitoring, and other diagnostic purposes performed by trained sonographers.',
        schedule: 'Mon–Sat, 8:00 AM – 5:00 PM',
        contact: '(053) XXX-XXXX',
        requirements: 'Ultrasound request from physician. Some exams require fasting.',
      },
    ],
  },
  {
    id: 'maternal',
    name: 'Maternal & Child Care',
    icon: 'user-group',
    services: [
      {
        name: 'Prenatal Care',
        desc: 'Comprehensive prenatal consultations, fetal monitoring, and health education for expectant mothers throughout their pregnancy.',
        schedule: 'Mon–Sat, 8:00 AM – 5:00 PM',
        contact: '(053) XXX-XXXX',
        requirements: 'Bring previous prenatal records on follow-up visits.',
      },
      {
        name: 'Labor & Delivery',
        desc: 'Labor room monitoring, normal spontaneous delivery, and postpartum care with dedicated maternal health nursing staff.',
        schedule: '24 hours daily',
        contact: '(053) XXX-XXXX',
        requirements: 'Prenatal records and hospital admission required.',
      },
      {
        name: 'Newborn Screening',
        desc: 'Mandatory newborn screening services as required by Republic Act 9288, performed within 24–72 hours of birth.',
        schedule: 'By hospital protocol',
        contact: '(053) XXX-XXXX',
        requirements: 'Required for all livebirths.',
      },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    icon: 'pill',
    services: [
      {
        name: 'In-House Pharmacy',
        desc: 'Prescription and over-the-counter medications dispensed by licensed pharmacists. Senior Citizens and PWD discounts are honored.',
        schedule: 'Mon–Sat, 8:00 AM – 6:00 PM',
        contact: '(053) XXX-XXXX',
        requirements: 'Valid prescription required for Rx medications.',
      },
    ],
  },
  {
    id: 'community',
    name: 'Community Health',
    icon: 'handshake',
    services: [
      {
        name: 'Medical Missions',
        desc: 'Regular community medical missions providing free consultations, basic medicines, and preventive health services to underserved communities across Southern Leyte.',
        schedule: 'Scheduled periodically — see announcements',
        contact: '(053) XXX-XXXX',
        requirements: 'Open to the public. No appointment needed.',
      },
      {
        name: 'Vaccination Programs',
        desc: 'Vaccination drives conducted in partnership with the Department of Health and local government units for various vaccine-preventable diseases.',
        schedule: 'Per LGU-DOH schedule',
        contact: '(053) XXX-XXXX',
        requirements: 'Bring immunization records if available.',
      },
    ],
  },
]

export default function ServicesPage({ navigate }: Props) {
  const [activeId, setActiveId] = useState('emergency')
  const [search, setSearch] = useState('')

  const activeCategory = categories.find((c) => c.id === activeId)

  const searchResults = search.trim()
    ? categories.flatMap((cat) =>
        cat.services
          .filter(
            (s) =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.desc.toLowerCase().includes(search.toLowerCase()),
          )
          .map((s) => ({ ...s, category: cat.name })),
      )
    : null

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
            What We Offer
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
            Our Services
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', lineHeight: 1.75, fontSize: '15px', marginBottom: '28px' }}>
            Leyte Baptist Hospital provides a comprehensive range of medical services to meet the
            healthcare needs of our community and the surrounding region.
          </p>
          <input
            type="search"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              maxWidth: '420px',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              padding: '12px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {search.trim() ? (
          <div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: '22px',
                color: '#0d2240',
                marginBottom: '24px',
              }}
            >
              Results for "{search}"
            </h2>
            {searchResults && searchResults.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {searchResults.map((service) => (
                  <ServiceCard key={service.name} service={service} category={service.category} />
                ))}
              </div>
            ) : (
              <p style={{ color: '#6b7280', fontSize: '14px' }}>No services found matching your search.</p>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '40px' }}>
            {/* Sidebar */}
            <div style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#9ca3af',
                  marginBottom: '12px',
                  paddingLeft: '16px',
                }}
              >
                Categories
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveId(cat.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        fontSize: '13px',
                        fontWeight: activeId === cat.id ? 600 : 400,
                        border: 'none',
                        borderLeft: activeId === cat.id ? '2px solid #1a7f7a' : '2px solid transparent',
                        backgroundColor: activeId === cat.id ? '#f0fafa' : 'transparent',
                        color: activeId === cat.id ? '#136260' : '#4b5563',
                        cursor: 'pointer',
                        borderRadius: '0 4px 4px 0',
                        transition: 'background 0.15s, color 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Icon name={cat.icon as any} size={18} />
                      </span>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service content */}
            {activeCategory && (
              <div>
                <h2
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: '28px',
                    color: '#0d2240',
                    marginBottom: '28px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
                    <Icon name={activeCategory.icon as any} size={20} />
                  </span>
                  {activeCategory.name}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activeCategory.services.map((service) => (
                    <ServiceCard key={service.name} service={service} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ServiceCard({
  service,
  category,
}: {
  service: { name: string; desc: string; schedule: string; contact: string; requirements: string }
  category?: string
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        border: '1px solid #f3f4f6',
        borderRadius: '2px',
        padding: '24px',
        backgroundColor: '#ffffff',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#d1eeec')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#f3f4f6')}
    >
      {category && (
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#1a7f7a',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          {category}
        </div>
      )}
      <h3 style={{ fontWeight: 600, color: '#0d2240', fontSize: '16px', margin: '0 0 10px' }}>
        {service.name}
      </h3>
      <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px' }}>
        {service.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: expanded ? '20px' : '0' }}>
        <div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#9ca3af',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            Schedule
          </div>
          <div style={{ fontSize: '13px', color: '#374151' }}>{service.schedule}</div>
        </div>
        <div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#9ca3af',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            Contact
          </div>
          <div style={{ fontSize: '13px', color: '#1a7f7a', fontWeight: 500 }}>{service.contact}</div>
        </div>
      </div>

      {expanded && (
        <div
          style={{
            paddingTop: '16px',
            borderTop: '1px solid #f9fafb',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#9ca3af',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            Requirements / Notes
          </div>
          <div style={{ fontSize: '13px', color: '#4b5563' }}>{service.requirements}</div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: '16px',
          color: '#1a7f7a',
          background: 'none',
          border: 'none',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {expanded ? 'Show Less ↑' : 'More Details →'}
      </button>
    </div>
  )
}
