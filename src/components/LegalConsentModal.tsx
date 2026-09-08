import { useEffect, useState } from 'react'

interface Props {
  onAccept?: () => void
  onClose?: () => void
  mode?: 'gate' | 'view'
  initialDocument?: 'privacy' | 'terms'
}

const policySections = [
  {
    title: 'Privacy Policy',
    body: 'Leyte Baptist Hospital, Inc. may collect information you submit through this website, such as your name, contact details, and message, to respond to inquiries and coordinate requested services. We may also collect basic technical information to keep the site secure and improve the experience. We limit access to staff and service providers who need it, and retain information only as long as reasonably necessary. You may request correction or removal of information by contacting info@leytebaptisthospital.ph.',
  },
  {
    title: 'Terms & Conditions',
    body: 'This website provides general information and is not a substitute for professional medical advice, diagnosis, or treatment. Do not use this website or its contact form for an emergency. Submitting an inquiry does not guarantee an appointment or create a patient-provider relationship. Website information, schedules, and services may change without notice. By continuing, you agree to use this website responsibly and in accordance with these terms.',
  },
]

export default function LegalConsentModal({ onAccept, onClose, mode = 'gate', initialDocument = 'privacy' }: Props) {
  const [accepted, setAccepted] = useState({ privacy: false, terms: false })
  const [activeDocument, setActiveDocument] = useState(initialDocument)
  const canContinue = accepted.privacy && accepted.terms

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div
      aria-labelledby="legal-consent-title"
      aria-modal="true"
      role="dialog"
      style={{
        alignItems: 'center',
        backgroundColor: 'rgba(8, 23, 41, 0.52)',
        display: 'flex',
        inset: 0,
        justifyContent: 'center',
        padding: '24px',
        position: 'fixed',
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.97)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          maxHeight: 'min(680px, calc(100vh - 48px))',
          maxWidth: '620px',
          overflowY: 'auto',
          padding: 'clamp(24px, 4vw, 38px)',
          width: '100%',
        }}
      >
        <div style={{ color: '#1a7f7a', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Before you continue
        </div>
        <h1 id="legal-consent-title" style={{ color: '#0d2240', fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, margin: '12px 0 14px' }}>
          Your privacy matters.
        </h1>
        <p style={{ color: '#5b6472', fontSize: '16px', lineHeight: 1.7, margin: '0 0 28px' }}>
          Please review and accept both documents before entering the Leyte Baptist Hospital website. Cookies help us keep the site working and understand how it is used.
        </p>

        {mode === 'view' && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {policySections.map((section, index) => {
              const documentName = index === 0 ? 'privacy' : 'terms'
              return (
                <button key={section.title} onClick={() => setActiveDocument(documentName)} style={{ backgroundColor: activeDocument === documentName ? '#0d2240' : '#eef6f6', border: 0, color: activeDocument === documentName ? '#ffffff' : '#136260', cursor: 'pointer', fontSize: '13px', fontWeight: 700, padding: '10px 14px' }}>
                  {index === 0 ? 'Privacy Policy' : 'Terms & Conditions'}
                </button>
              )
            })}
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {policySections.map((section, index) => {
            const field = index === 0 ? 'privacy' : 'terms'
            const isAccepted = accepted[field]
            if (mode === 'view' && activeDocument !== field) return null
            return (
              <section key={section.title} style={{ backgroundColor: '#f6faf9', border: `1px solid ${isAccepted ? '#1a7f7a' : '#d8e2e3'}`, padding: '20px', transition: 'border-color 0.2s' }}>
                <h2 style={{ color: '#0d2240', fontSize: '19px', margin: '0 0 8px' }}>{section.title}</h2>
                <p style={{ color: '#5b6472', fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px' }}>{section.body}</p>
                {mode === 'gate' && (
                  <label style={{ alignItems: 'flex-start', color: '#0d2240', cursor: 'pointer', display: 'flex', fontSize: '14px', fontWeight: 700, gap: '10px', lineHeight: 1.4 }}>
                    <input
                      checked={isAccepted}
                      onChange={(event) => setAccepted((current) => ({ ...current, [field]: event.target.checked }))}
                      type="checkbox"
                    />
                    <span>I have read and accept the {section.title.toLowerCase()}.</span>
                  </label>
                )}
              </section>
            )
          })}
        </div>

        {mode === 'gate' ? (
          <>
            <button
              disabled={!canContinue}
              onClick={onAccept}
              style={{ backgroundColor: canContinue ? '#1a7f7a' : '#b8c9c9', border: 0, color: '#ffffff', cursor: canContinue ? 'pointer' : 'not-allowed', fontSize: '15px', fontWeight: 700, marginTop: '28px', padding: '15px 22px', width: '100%' }}
            >
              Accept and enter website
            </button>
            <p style={{ color: '#7a8491', fontSize: '12px', lineHeight: 1.5, margin: '14px 0 0', textAlign: 'center' }}>
              You must accept both documents to continue.
            </p>
          </>
        ) : (
          <button onClick={onClose} style={{ backgroundColor: '#0d2240', border: 0, color: '#ffffff', cursor: 'pointer', fontSize: '14px', fontWeight: 700, marginTop: '12px', padding: '13px 20px', width: '100%' }}>
            Close
          </button>
        )}
      </div>
    </div>
  )
}
