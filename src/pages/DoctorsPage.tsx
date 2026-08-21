import { useState } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

interface Doctor {
  id: number
  name: string
  specialty: string
  dept: string
  credentials: string
  schedule: string
  bio: string
  areas: string[]
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. [Resident Physician 1]',
    specialty: 'General Medicine',
    dept: 'Outpatient Department',
    credentials: 'MD, Philippine Board of Internal Medicine',
    schedule: 'Mon, Wed, Fri — 8:00 AM to 12:00 NN',
    bio: 'Doctor biography placeholder. This profile will be updated by hospital administration through the CMS. Please contact the OPD for appointment scheduling.',
    areas: ['General Consultation', 'Preventive Medicine', 'Chronic Disease Management'],
  },
  {
    id: 2,
    name: 'Dr. [Resident Physician 2]',
    specialty: 'Obstetrics & Gynecology',
    dept: 'Maternal & Child Care',
    credentials: 'MD, Philippine Board of Obstetrics & Gynecology',
    schedule: 'Tue, Thu — 8:00 AM to 5:00 PM',
    bio: 'Doctor biography placeholder. This profile will be updated by hospital administration through the CMS.',
    areas: ['Prenatal Care', 'Normal Delivery', 'Gynecological Consultation'],
  },
  {
    id: 3,
    name: 'Dr. [Resident Physician 3]',
    specialty: 'Pediatrics',
    dept: 'Outpatient Department',
    credentials: 'MD, Philippine Board of Pediatrics',
    schedule: 'Mon–Sat — 8:00 AM to 12:00 NN',
    bio: 'Doctor biography placeholder. This profile will be updated by hospital administration through the CMS.',
    areas: ["Newborn Care", 'Child Health', 'Immunizations', 'Growth & Development'],
  },
  {
    id: 4,
    name: 'Dr. [Resident Physician 4]',
    specialty: 'Internal Medicine',
    dept: 'Inpatient Department',
    credentials: 'MD, Philippine Board of Internal Medicine',
    schedule: 'Mon–Fri — 2:00 PM to 5:00 PM',
    bio: 'Doctor biography placeholder. This profile will be updated by hospital administration through the CMS.',
    areas: ['Adult Medicine', 'Hospitalized Patient Care', 'Complex Case Management'],
  },
  {
    id: 5,
    name: 'Dr. [Resident Physician 5]',
    specialty: 'General Surgery',
    dept: 'Surgical Department',
    credentials: 'MD, Philippine Board of Surgery',
    schedule: 'By appointment',
    bio: 'Doctor biography placeholder. This profile will be updated by hospital administration through the CMS.',
    areas: ['Elective Surgery', 'Minor Surgical Procedures', 'Pre/Post-operative Care'],
  },
  {
    id: 6,
    name: 'Dr. [Visiting Specialist]',
    specialty: 'Cardiology',
    dept: 'Specialty Clinics',
    credentials: 'MD, Philippine Society of Cardiology',
    schedule: 'Visiting — schedule to be confirmed',
    bio: 'Visiting specialist biography placeholder.',
    areas: ['Cardiovascular Disease', 'Hypertension Management', 'ECG Interpretation'],
  },
]

const specialties = ['All Specialties', ...Array.from(new Set(doctors.map((d) => d.specialty)))]

export default function DoctorsPage({ navigate }: Props) {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All Specialties')
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = doctors.filter(
    (d) =>
      (specialty === 'All Specialties' || d.specialty === specialty) &&
      (search === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()) ||
        d.dept.toLowerCase().includes(search.toLowerCase())),
  )

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
            Medical Staff
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
            Our Doctors
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', lineHeight: 1.75, fontSize: '15px' }}>
            Our medical staff is dedicated to providing professional, compassionate care to every
            patient who comes to Leyte Baptist Hospital.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Notice */}
        <div
          style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '4px',
            padding: '12px 16px',
            marginBottom: '28px',
            fontSize: '13px',
            color: '#92400e',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <span>⚠</span>
          <span>
            Doctor profiles below use placeholder names. Real physician information will be entered
            by hospital administrators. For the current schedule, please call{' '}
            <strong>(053) XXX-XXXX</strong>.
          </span>
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '36px',
            alignItems: 'center',
          }}
        >
          <input
            type="search"
            placeholder="Search doctors, specialties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: '1 1 240px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '10px 16px',
              fontSize: '14px',
              color: '#1c2331',
              outline: 'none',
            }}
          />
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '10px 16px',
              fontSize: '13px',
              color: '#374151',
              outline: 'none',
              backgroundColor: '#ffffff',
            }}
          >
            {specialties.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Doctor grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {filtered.map((doctor) => (
            <div
              key={doctor.id}
              style={{
                border: expanded === doctor.id ? '1px solid #1a7f7a' : '1px solid #f3f4f6',
                backgroundColor: expanded === doctor.id ? '#f0fafa' : '#ffffff',
                borderRadius: '2px',
                overflow: 'hidden',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#f5f7f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '2px solid #ffffff',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                    }}
                  >
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" style={{ color: '#d1d5db' }}>
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0d2240', fontSize: '14px', marginBottom: '3px' }}>
                      {doctor.name}
                    </div>
                    <div style={{ color: '#1a7f7a', fontSize: '12px', fontWeight: 500, marginBottom: '2px' }}>
                      {doctor.specialty}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '12px' }}>{doctor.dept}</div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    borderRadius: '4px',
                    padding: '10px 12px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>
                    Clinic Schedule
                  </div>
                  <div style={{ fontSize: '13px', color: '#374151' }}>{doctor.schedule}</div>
                </div>

                {expanded === doctor.id && (
                  <div>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                        Credentials
                      </div>
                      <div style={{ fontSize: '13px', color: '#4b5563' }}>{doctor.credentials}</div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                        Areas of Focus
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {doctor.areas.map((area) => (
                          <span
                            key={area}
                            style={{
                              backgroundColor: '#d1eeec',
                              color: '#136260',
                              fontSize: '11px',
                              fontWeight: 500,
                              padding: '3px 10px',
                              borderRadius: '12px',
                            }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                        Biography
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>{doctor.bio}</div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setExpanded(expanded === doctor.id ? null : doctor.id)}
                  style={{
                    color: '#1a7f7a',
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {expanded === doctor.id ? 'Close Profile ↑' : 'View Profile →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '56px 0', color: '#9ca3af', fontSize: '14px' }}>
            No doctors found matching your search.
          </div>
        )}

        <div
          style={{
            marginTop: '48px',
            padding: '24px',
            backgroundColor: '#f5f7f9',
            borderRadius: '2px',
            fontSize: '13px',
            color: '#6b7280',
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: '#374151' }}>For appointments and consultations:</strong> Please
          call <strong style={{ color: '#1a7f7a' }}>(053) XXX-XXXX</strong> to confirm physician
          availability and schedule. Walk-ins are welcome for the Emergency Room and General OPD.
        </div>
      </div>
    </div>
  )
}
