import { useState } from 'react'
import type { Page } from '../../App'
import Icon from '../components/Icon'

interface Props {
  navigate: (page: Page) => void
}

const deptContacts = [
  { dept: 'Emergency Room', ext: 'Ext. 100 / Direct line', note: '24 hours' },
  { dept: 'Outpatient Department', ext: 'Ext. 101', note: 'Mon–Sat, 8AM–5PM' },
  { dept: 'Laboratory', ext: 'Ext. 102', note: 'Mon–Sat, 7AM–8PM' },
  { dept: 'Radiology', ext: 'Ext. 103', note: 'Mon–Sat, 8AM–5PM' },
  { dept: 'Pharmacy', ext: 'Ext. 104', note: 'Mon–Sat, 8AM–6PM' },
  { dept: 'Medical Records', ext: 'Ext. 105', note: 'Mon–Fri, 8AM–5PM' },
  { dept: 'Billing / Finance', ext: 'Ext. 106', note: 'Mon–Fri, 8AM–5PM' },
  { dept: 'Human Resources', ext: 'Ext. 107', note: 'Mon–Fri, 8AM–5PM' },
]

export default function ContactPage({ navigate }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Emergency bar */}
      <div
        style={{
          backgroundColor: '#0a1e35',
          borderBottom: '1px solid rgba(127,227,224,0.15)',
          padding: '12px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#4dd9d0',
                flexShrink: 0,
                animation: 'emergencyPulse 2s infinite',
              }}
            />
            <span style={{ color: '#7fe3e0', fontSize: '13px', fontWeight: 600 }}>Emergency Line:</span>
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px' }}>(053) XXX-XXXX</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
            Available 24 hours a day, 7 days a week
          </span>
        </div>
      </div>

      {/* Page header */}
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
            Get in Touch
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
            Contact Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '520px', lineHeight: 1.75, fontSize: '15px' }}>
            For general inquiries, appointment information, and hospital services. For medical
            emergencies, please call our emergency line directly — do not wait for a response to a
            web form.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Contact info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Address', value: 'Hilongos, Southern Leyte\nLeyte, Philippines', icon: 'map-pin', highlight: false },
                { label: 'Main Line', value: '(053) XXX-XXXX', sub: 'Mon–Sat, 8:00 AM – 5:00 PM', icon: 'phone', highlight: false },
                { label: 'Emergency', value: '(053) XXX-XXXX', sub: 'Available 24 hours, 7 days', icon: 'alert', highlight: true },
                { label: 'Email', value: 'info@leytebaptisthospital.ph', icon: 'mail', highlight: false },
              ].map((contact) => (
                <div
                  key={contact.label}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '18px',
                    backgroundColor: contact.highlight ? '#f0fafa' : '#f9fafb',
                    border: contact.highlight ? '1px solid #d1eeec' : '1px solid #f3f4f6',
                    borderRadius: '4px',
                  }}
                >
                  <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '1px', display: 'inline-flex' }}>
                    <Icon name={contact.icon as any} size={20} />
                  </span>
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
                      {contact.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        color: contact.highlight ? '#136260' : '#0d2240',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {contact.value}
                    </div>
                    {'sub' in contact && contact.sub && (
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{contact.sub}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontWeight: 600, color: '#0d2240', fontSize: '14px', marginBottom: '16px' }}>
              Department Contacts
            </h3>
            <div style={{ border: '1px solid #f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
              {deptContacts.map((d, i) => (
                <div
                  key={d.dept}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '11px 16px',
                    borderBottom: i < deptContacts.length - 1 ? '1px solid #f9fafb' : 'none',
                    backgroundColor: '#ffffff',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{d.dept}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{d.note}</div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#1a7f7a', fontWeight: 500, flexShrink: 0 }}>{d.ext}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form and map */}
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #f3f4f6',
                borderRadius: '4px',
                padding: '32px',
                marginBottom: '20px',
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      backgroundColor: '#d1eeec',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      fontSize: '22px',
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '24px',
                      color: '#0d2240',
                      marginBottom: '10px',
                    }}
                  >
                    Message Received
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 20px' }}>
                    Thank you for reaching out. A member of our team will respond to your inquiry
                    within 1–2 business days.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
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
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '22px',
                      color: '#0d2240',
                      marginBottom: '24px',
                    }}
                  >
                    Send a Message
                  </h2>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {[
                        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
                      ].map((field) => (
                        <div key={field.id}>
                          <label
                            style={{
                              display: 'block',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#6b7280',
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em',
                              marginBottom: '6px',
                            }}
                          >
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={form[field.id as 'name' | 'email']}
                            onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                            style={{
                              width: '100%',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              padding: '10px 14px',
                              fontSize: '14px',
                              color: '#1c2331',
                              outline: 'none',
                              transition: 'border-color 0.15s',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#1a7f7a')}
                            onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#6b7280',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '6px',
                        }}
                      >
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        style={{
                          width: '100%',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          padding: '10px 14px',
                          fontSize: '14px',
                          color: form.subject ? '#1c2331' : '#9ca3af',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                          transition: 'border-color 0.15s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#1a7f7a')}
                        onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                      >
                        <option value="">Select a subject</option>
                        <option>General Inquiry</option>
                        <option>Appointment Request</option>
                        <option>Medical Records Request</option>
                        <option>Billing Inquiry</option>
                        <option>Community Partnership</option>
                        <option>Patient Feedback</option>
                        <option>Staff Concern</option>
                        <option>Media / Press Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#6b7280',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '6px',
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Write your message here..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        style={{
                          width: '100%',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          padding: '10px 14px',
                          fontSize: '14px',
                          color: '#1c2331',
                          outline: 'none',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          transition: 'border-color 0.15s',
                          minHeight: '120px',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#1a7f7a')}
                        onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '4px' }}>
                      <button
                        type="submit"
                        disabled={submitting}
                        style={{
                          backgroundColor: submitting ? '#6b7280' : '#1a7f7a',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '12px 28px',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          transition: 'background 0.15s',
                        }}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>

                    <p style={{ fontSize: '11px', color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
                      This form is for general inquiries only. For medical emergencies, call our
                      emergency line immediately. Do not send patient medical records, diagnoses, or
                      personal health information through this form.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Map placeholder */}
            <div
              style={{
                backgroundColor: '#f5f7f9',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                height: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
                color: '#9ca3af',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '36px' }}>
                <Icon name={'map-pin'} size={36} />
              </div>
              <div style={{ fontWeight: 600, color: '#374151', fontSize: '14px' }}>Leyte Baptist Hospital</div>
              <div style={{ fontSize: '13px' }}>Hilongos, Southern Leyte, Philippines</div>
              <div style={{ fontSize: '11px', color: '#1a7f7a', marginTop: '8px' }}>
                Google Maps integration — connect in production
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes emergencyPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  )
}
