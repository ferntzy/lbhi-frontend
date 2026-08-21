import { useState } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

const departments = [
  {
    id: 'admin',
    name: 'Administration',
    head: '[Hospital Administrator]',
    desc: 'Responsible for overall hospital operations, administrative coordination, strategic planning, and ensuring the effective delivery of services across all departments.',
    services: ['Administrative Services', 'Strategic Planning', 'Policy Development', 'Community Relations'],
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    location: 'Ground Floor, Administrative Wing',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'er',
    name: 'Emergency Room',
    head: '[ER Department Head]',
    desc: '24-hour emergency medical care for patients with acute, urgent, or life-threatening conditions. The ER is staffed at all times with trained emergency response personnel.',
    services: ['Acute Emergency Care', 'Trauma Assessment', 'Emergency Procedures', 'Patient Stabilization'],
    hours: '24 hours, 7 days a week',
    location: 'Ground Floor, ER Wing (Main Entrance)',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'opd',
    name: 'Outpatient Department',
    head: '[OPD Head]',
    desc: 'Scheduled consultations with resident and visiting physicians for general health concerns, preventive care, and follow-up management of ongoing conditions.',
    services: ['General Consultation', 'Specialty Clinics', 'Follow-up Consultations', 'Health Assessments'],
    hours: 'Mon–Sat, 8:00 AM – 5:00 PM',
    location: 'Ground Floor, OPD Wing',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'nursing',
    name: 'Nursing Department',
    head: '[Chief Nurse]',
    desc: 'Oversees all nursing care and operations across the hospital, maintaining high standards of patient care, nursing education, and staff supervision.',
    services: ['Inpatient Nursing Care', 'Nursing Supervision', 'Patient Education', 'Care Coordination'],
    hours: '24 hours — all wards',
    location: 'All Hospital Wards and Units',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'lab',
    name: 'Laboratory',
    head: '[Chief Medical Technologist]',
    desc: 'Clinical laboratory services providing accurate, timely diagnostic testing to support physician decision-making and patient care.',
    services: ['Clinical Chemistry', 'Hematology', 'Urinalysis', 'Fecalysis', 'Cross-matching', 'Microbiology'],
    hours: 'Mon–Sat, 7:00 AM – 8:00 PM',
    location: 'Ground Floor, Laboratory Wing',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'radiology',
    name: 'Radiology & Imaging',
    head: '[Radiologist]',
    desc: 'Diagnostic imaging services including conventional X-ray and ultrasound examinations to support clinical diagnosis and treatment planning.',
    services: ['Chest X-Ray', 'Plain Films (Extremities, Spine)', 'Abdominal Ultrasound', 'Obstetric Ultrasound'],
    hours: 'Mon–Sat, 8:00 AM – 5:00 PM',
    location: 'Ground Floor, Radiology Wing',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    head: '[Chief Pharmacist]',
    desc: 'In-house pharmacy providing prescription and over-the-counter medications dispensed by licensed pharmacists, with compliance to PhilHealth, senior citizen, and PWD discount protocols.',
    services: ['Prescription Dispensing', 'OTC Medications', 'Medication Counseling', 'Drug Information'],
    hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
    location: 'Ground Floor, Pharmacy',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'maternal',
    name: 'Maternal & Child Care',
    head: '[MCH Department Head]',
    desc: 'Comprehensive maternal and child health services covering prenatal care through delivery, postpartum recovery, and newborn care and screening.',
    services: ['Prenatal Consultations', 'Labor & Delivery', 'Postpartum Care', 'Newborn Screening', 'Well-Baby Clinic'],
    hours: '24 hours (Delivery Room) / Mon–Sat 8AM–5PM (Prenatal)',
    location: 'Maternity Wing',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'records',
    name: 'Medical Records',
    head: '[Medical Records Officer]',
    desc: 'Manages all patient medical records and documentation in accordance with hospital protocols, the Data Privacy Act, and DOH regulations.',
    services: ['Patient Records Management', 'Medical Certificates', 'Records Release', 'Clinical Summaries'],
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    location: 'Ground Floor, Records Office',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'finance',
    name: 'Finance & Billing',
    head: '[Finance Officer]',
    desc: 'Handles patient billing, payments, PhilHealth claims processing, and all financial operations of the hospital.',
    services: ['Patient Billing', 'PhilHealth Processing', 'Senior/PWD Discounts', 'Financial Assistance Referrals'],
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    location: 'Ground Floor, Finance Office',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'hr',
    name: 'Human Resources',
    head: '[HR Officer]',
    desc: 'Manages recruitment, employee relations, benefits, training and development, and personnel administration for all hospital staff.',
    services: ['Recruitment & Onboarding', 'Employee Relations', 'Training & Development', 'Payroll Administration'],
    hours: 'Mon–Fri, 8:00 AM – 5:00 PM',
    location: 'Administrative Wing',
    contact: '(053) XXX-XXXX',
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping & Sanitation',
    head: '[Housekeeping Supervisor]',
    desc: 'Ensures a clean, safe, and hygienic hospital environment across all areas, maintaining infection control and environmental cleanliness standards.',
    services: ['Environmental Cleaning', 'Waste Segregation', 'Linen Services', 'Infection Control Support'],
    hours: '24 hours',
    location: 'All Hospital Areas',
    contact: '(053) XXX-XXXX',
  },
]

export default function DepartmentsPage({ navigate }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

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
            Hospital Organization
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
            Our Departments
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', lineHeight: 1.75, fontSize: '15px' }}>
            Leyte Baptist Hospital is organized into departments that work together to deliver
            comprehensive, coordinated healthcare services to our patients and community.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {departments.map((dept) => (
            <div
              key={dept.id}
              style={{
                border: selected === dept.id ? '1px solid #1a7f7a' : '1px solid #f3f4f6',
                backgroundColor: selected === dept.id ? '#f0fafa' : '#ffffff',
                borderRadius: '2px',
                overflow: 'hidden',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <button
                onClick={() => setSelected(selected === dept.id ? null : dept.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 600, color: '#0d2240', fontSize: '15px', margin: 0 }}>
                    {dept.name}
                  </h3>
                  <span style={{ color: '#9ca3af', fontSize: '16px', marginLeft: '8px', flexShrink: 0 }}>
                    {selected === dept.id ? '−' : '+'}
                  </span>
                </div>
                <div style={{ color: '#1a7f7a', fontSize: '12px', fontWeight: 500, marginBottom: '8px' }}>
                  {dept.head}
                </div>
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '13px',
                    lineHeight: 1.65,
                    margin: 0,
                    display: selected === dept.id ? 'none' : '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {dept.desc}
                </p>
              </button>

              {selected === dept.id && (
                <div style={{ padding: '0 20px 20px' }}>
                  <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px' }}>
                    {dept.desc}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          marginBottom: '6px',
                        }}
                      >
                        Services
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {dept.services.map((s) => (
                          <li
                            key={s}
                            style={{
                              fontSize: '12px',
                              color: '#4b5563',
                              paddingBottom: '3px',
                              paddingLeft: '8px',
                              position: 'relative',
                            }}
                          >
                            <span style={{ position: 'absolute', left: 0, color: '#1a7f7a' }}>·</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          marginBottom: '6px',
                        }}
                      >
                        Hours
                      </div>
                      <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '12px' }}>{dept.hours}</div>
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          marginBottom: '6px',
                        }}
                      >
                        Location
                      </div>
                      <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '12px' }}>{dept.location}</div>
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          marginBottom: '6px',
                        }}
                      >
                        Contact
                      </div>
                      <div style={{ fontSize: '12px', color: '#1a7f7a', fontWeight: 500 }}>{dept.contact}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
