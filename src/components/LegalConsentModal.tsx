import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  onAccept?: () => void
  onClose?: () => void
  mode?: 'gate' | 'view'
  initialDocument?: 'privacy' | 'terms'
}

type DocumentId = 'privacy' | 'terms'

interface Clause {
  heading: string
  body: string[]
}

interface PolicyDocument {
  id: DocumentId
  title: string
  reference: string
  effectiveDate: string
  clauses: Clause[]
}

const privacyDocument: PolicyDocument = {
  id: 'privacy',
  title: 'Privacy Policy',
  reference: 'Use of this website and the personal information you share with us',
  effectiveDate: 'September 8, 2026',
  clauses: [
    {
      heading: 'Introduction',
      body: [
        'Leyte Baptist Hospital, Inc. ("the Hospital," "we," "us," or "our") operates this website to inform the public about our services, facilities, and staff, and to provide a convenient way to reach us. This Privacy Policy explains what personal information we collect through the website, why we collect it, how we use and protect it, and the choices and rights available to you.',
        'This Policy applies only to information collected through this website. It does not cover information collected in person at the Hospital, such as clinical records created during a consultation or admission, which are governed by our separate patient health information practices and by the confidentiality obligations that apply to medical records.',
      ],
    },
    {
      heading: 'Information We Collect',
      body: [
        'When you browse this website without submitting a form, we do not require you to identify yourself. If you choose to contact us through a form on this site, we may collect the information you provide, which typically includes your name, a phone number or email address, and the content of your message or inquiry, including any details you share about the reason for your visit.',
        'We also collect limited technical information automatically as part of operating the website, such as the type of browser and device used to access the site, the pages viewed, and general, non-precise location information inferred from your internet connection. This technical information helps us keep the website secure, understand how it is used, and identify and correct technical problems.',
      ],
    },
    {
      heading: 'How We Use Your Information',
      body: [
        'We use the information you submit to respond to your inquiry, to coordinate a requested appointment or service with the relevant department, and to follow up with you where appropriate. We use technical information to maintain the security, stability, and performance of the website, and to understand which content is useful to visitors so that we can improve it over time.',
        'We do not use information submitted through this website for advertising, and we do not build marketing profiles from it.',
      ],
    },
    {
      heading: 'Legal Basis for Processing',
      body: [
        'We process your personal information in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173), its Implementing Rules and Regulations, and the issuances of the National Privacy Commission. We rely on your consent when you voluntarily submit information through a form on this website, and on our legitimate interest in operating a functioning, secure website when we collect technical information automatically.',
        'Where you submit information in connection with a request for hospital services, we also process that information as necessary to take steps at your request prior to coordinating those services with you.',
      ],
    },
    {
      heading: 'Sharing and Disclosure',
      body: [
        'We limit access to information submitted through this website to Hospital staff and, where necessary, service providers who assist us in operating the site or coordinating the service you have requested, such as the relevant clinical department or scheduling staff. These parties are only given access to the extent needed to carry out their role, and are expected to handle your information with the same care we apply ourselves.',
        'We do not sell personal information collected through this website, and we do not share it with third parties for their own independent marketing purposes. We may disclose information where required by law, by a valid order of a court or government authority, or where necessary to protect the safety of a patient or the public.',
      ],
    },
    {
      heading: 'Retention',
      body: [
        'We retain information submitted through this website only for as long as reasonably necessary to respond to your inquiry, coordinate the service requested, and meet any applicable legal, administrative, or recordkeeping requirement. Once these purposes have been fulfilled and no further retention is required by law, the information is deleted or securely disposed of.',
      ],
    },
    {
      heading: 'Security Measures',
      body: [
        'We apply reasonable organizational and technical safeguards appropriate to the nature of the information we hold, including restricting access to authorized personnel, maintaining the website on a secure hosting platform, and reviewing our practices periodically. No method of transmission over the internet or method of electronic storage is entirely secure, and while we work to protect your information, we cannot guarantee its absolute security.',
      ],
    },
    {
      heading: 'Your Rights as a Data Subject',
      body: [
        'Under the Data Privacy Act of 2012, you have the right to be informed of how your personal information is processed, to reasonable access to the information we hold about you, to object to certain processing, to request the correction of inaccurate or outdated information, and to request the erasure or blocking of information that is no longer necessary for the purpose for which it was collected, subject to any legal or regulatory retention requirement.',
        'You may exercise any of these rights, or ask a question about how your information has been handled, by writing to us using the contact details at the end of this Policy. We will respond within a reasonable period and in accordance with applicable law.',
      ],
    },
    {
      heading: 'Cookies and Analytics',
      body: [
        'This website may use a small number of cookies or similar technologies to keep the site functioning correctly and to gather general, aggregated statistics about how the site is used. These technologies do not, on their own, identify you personally. You may configure your browser to limit or block cookies, though doing so may affect how parts of the site display or function.',
      ],
    },
    {
      heading: "Children's Information",
      body: [
        'This website is not directed at children, and we do not knowingly collect personal information from a child through this site without the involvement of a parent or guardian. If you believe a child has submitted personal information to us through this website, please contact us so that we can address it appropriately.',
      ],
    },
    {
      heading: 'Changes to this Policy',
      body: [
        'We may update this Policy from time to time to reflect changes in our practices or in applicable law. The effective date at the top of this document indicates when it was last revised. We encourage you to review this Policy periodically.',
      ],
    },
    {
      heading: 'Contact Us',
      body: [
        'If you have a question or concern about this Policy, or would like to exercise any of the rights described above, please write to us at info@leytebaptisthospital.ph, or send correspondence to Leyte Baptist Hospital, Inc., Hilongos, Southern Leyte.',
      ],
    },
  ],
}

const termsDocument: PolicyDocument = {
  id: 'terms',
  title: 'Terms & Conditions',
  reference: 'The conditions under which this website may be used',
  effectiveDate: 'September 8, 2026',
  clauses: [
    {
      heading: 'Acceptance of these Terms',
      body: [
        'By accessing or using this website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please discontinue use of the website.',
      ],
    },
    {
      heading: 'Purpose of this Website',
      body: [
        'This website provides general information about Leyte Baptist Hospital, Inc., including our services, facilities, and staff, and offers a way for visitors to reach us with general inquiries. The content on this site is provided for informational purposes and reflects our services and schedules at the time of publication, which may change without prior notice.',
      ],
    },
    {
      heading: 'Not a Substitute for Medical Advice',
      body: [
        'Nothing on this website constitutes medical advice, diagnosis, or treatment, and it is not a substitute for an in-person consultation with a qualified healthcare professional. Any general health information presented on this site is provided for education only and should not be relied upon as a basis for medical decisions. Always seek the advice of a physician or other qualified health provider regarding a medical condition.',
      ],
    },
    {
      heading: 'Emergencies',
      body: [
        'This website and its contact or inquiry forms are not monitored continuously and must not be used to report a medical emergency. If you or someone near you needs urgent medical attention, please go directly to the nearest emergency room or contact local emergency services immediately.',
      ],
    },
    {
      heading: 'Appointments and Inquiries',
      body: [
        'Submitting an inquiry or appointment request through this website does not, by itself, guarantee an appointment, confirm the availability of a particular physician or service, or create a patient-provider relationship. A patient-provider relationship is established only once you have been seen by, or have entered into a direct professional arrangement with, one of our healthcare providers.',
        'Our staff will follow up with you to confirm the details, availability, and scheduling of any request submitted through this website.',
      ],
    },
    {
      heading: 'Accuracy of Website Information',
      body: [
        'We take reasonable care to keep the information on this website current and accurate, including our list of services, physicians, and operating schedules. However, we do not warrant that all content is complete, accurate, or up to date at all times, and we recommend confirming time-sensitive details, such as a physician\u2019s clinic schedule, directly with the Hospital before visiting.',
      ],
    },
    {
      heading: 'Intellectual Property',
      body: [
        'The content of this website, including its text, layout, graphics, and logo, is the property of Leyte Baptist Hospital, Inc. or is used with permission, and is protected by applicable intellectual property law. You may view and print pages from this site for your own personal, non-commercial reference, but you may not reproduce, distribute, or otherwise use this content for any other purpose without our prior written consent.',
      ],
    },
    {
      heading: 'Links to Other Websites',
      body: [
        'This website may contain links to websites operated by third parties. We provide these links for convenience and do not control, and are not responsible for, the content, accuracy, or privacy practices of those external sites. Visiting a linked website is at your own discretion and risk, and is governed by that website\u2019s own terms and policies.',
      ],
    },
    {
      heading: 'Limitation of Liability',
      body: [
        'To the extent permitted by applicable law, Leyte Baptist Hospital, Inc. shall not be liable for any loss or damage arising from your use of, or inability to use, this website, or from any reliance placed on its content, including any decision made on the basis of general information presented on this site.',
      ],
    },
    {
      heading: 'Your Responsibilities',
      body: [
        'You agree to use this website responsibly and lawfully, and not to attempt to interfere with its normal operation, gain unauthorized access to any part of it, or submit false, misleading, or harmful content through any form on this site.',
      ],
    },
    {
      heading: 'Governing Law',
      body: [
        'These Terms & Conditions are governed by the laws of the Republic of the Philippines. Any dispute arising from your use of this website shall be subject to the exclusive jurisdiction of the appropriate courts of Southern Leyte.',
      ],
    },
    {
      heading: 'Changes to these Terms',
      body: [
        'We may revise these Terms & Conditions from time to time. The effective date at the top of this document indicates when it was last revised, and your continued use of the website after any revision constitutes your acceptance of the updated terms.',
      ],
    },
    {
      heading: 'Contact Us',
      body: [
        'Questions about these Terms & Conditions may be sent to info@leytebaptisthospital.ph, or by mail to Leyte Baptist Hospital, Inc., Hilongos, Southern Leyte.',
      ],
    },
  ],
}

const ink = '#1e2a38'
const inkSoft = '#5b6472'
const rule = '#d9d4c6'
const paper = '#f7f6f1'
const accent = '#7c2431'

const serif = "'Source Serif 4', 'Iowan Old Style', Georgia, 'Times New Roman', serif"
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

export default function LegalConsentModal({ onAccept, onClose, mode = 'gate', initialDocument = 'privacy' }: Props) {
  const documents = useMemo(() => [privacyDocument, termsDocument], [])
  const [activeDoc, setActiveDoc] = useState<DocumentId>(initialDocument)
  const [accepted, setAccepted] = useState({ privacy: false, terms: false })
  const [reachedEnd, setReachedEnd] = useState({ privacy: false, terms: false })
  const canContinue = accepted.privacy && accepted.terms
  const current = documents.find((doc) => doc.id === activeDoc) ?? documents[0]
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTo({ top: 0 })
    if (node.scrollHeight <= node.clientHeight) {
      setReachedEnd((state) => ({ ...state, [activeDoc]: true }))
    }
  }, [activeDoc])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    if (scrollTop + clientHeight >= scrollHeight - 8) {
      setReachedEnd((state) => ({ ...state, [activeDoc]: true }))
    }
  }

  return (
    <div
      aria-labelledby="legal-consent-title"
      aria-modal="true"
      role="dialog"
      style={{
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 32, 0.55)',
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
          backgroundColor: paper,
          border: `1px solid ${rule}`,
          boxShadow: '0 18px 48px rgba(15, 23, 32, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'min(760px, calc(100vh - 48px))',
          maxWidth: '620px',
          width: '100%',
        }}
      >
        <div style={{ padding: 'clamp(24px, 4vw, 40px) clamp(24px, 4vw, 40px) 0' }}>
          <div style={{ alignItems: 'flex-start', display: 'flex', gap: '14px' }}>
            <img alt="Leyte Baptist Hospital logo" src="/images/lbhi_logo.png" style={{ height: '40px', objectFit: 'contain', width: '40px' }} />
            <div>
              <div style={{ color: ink, fontFamily: sans, fontSize: '14px', fontWeight: 600 }}>Leyte Baptist Hospital, Inc.</div>
              <div style={{ color: inkSoft, fontFamily: sans, fontSize: '12.5px', marginTop: '2px' }}>Hilongos, Southern Leyte</div>
            </div>
            <div style={{ color: inkSoft, fontFamily: sans, fontSize: '12px', marginLeft: 'auto', textAlign: 'right' }}>
              <div>{current.title}</div>
              <div style={{ marginTop: '2px' }}>Effective {current.effectiveDate}</div>
            </div>
          </div>

          <div style={{ backgroundColor: rule, height: '1px', margin: '20px 0 18px' }} />

          {mode === 'gate' ? (
            <>
              <h1
                id="legal-consent-title"
                style={{ color: ink, fontFamily: serif, fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 500, lineHeight: 1.2, margin: '0 0 8px' }}
              >
                Your privacy and the terms of use
              </h1>
              <p style={{ color: inkSoft, fontFamily: sans, fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px' }}>
                Please read both documents below. Each must be accepted before you can continue to the website.
              </p>

              <div style={{ display: 'flex', gap: '22px' }}>
                {documents.map((doc) => {
                  const isActive = doc.id === activeDoc
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDoc(doc.id)}
                      style={{
                        background: 'none',
                        border: 0,
                        borderBottom: `2px solid ${isActive ? accent : 'transparent'}`,
                        color: isActive ? ink : inkSoft,
                        cursor: 'pointer',
                        fontFamily: sans,
                        fontSize: '13.5px',
                        fontWeight: isActive ? 600 : 500,
                        padding: '0 0 10px',
                      }}
                    >
                      {accepted[doc.id] ? '\u2713 ' : ''}
                      {doc.title}
                    </button>
                  )
                })}
              </div>
              <div style={{ backgroundColor: rule, height: '1px' }} />
            </>
          ) : (
            <>
              <div style={{ color: inkSoft, fontFamily: sans, fontSize: '12.5px', marginBottom: '4px' }}>Re: {current.reference}</div>
              <h1
                id="legal-consent-title"
                style={{ color: ink, fontFamily: serif, fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: 500, lineHeight: 1.2, margin: '0 0 18px' }}
              >
                {current.title}
              </h1>
              <div style={{ backgroundColor: rule, height: '1px' }} />
            </>
          )}
        </div>

        <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', padding: '20px clamp(24px, 4vw, 40px)' }}>
          {current.clauses.map((clause, index) => (
            <section key={clause.heading} style={{ marginBottom: '20px' }}>
              <h2 style={{ color: ink, fontFamily: serif, fontSize: '16.5px', fontWeight: 600, margin: '0 0 6px' }}>
                {index + 1}. {clause.heading}
              </h2>
              {clause.body.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  style={{ color: ink, fontFamily: serif, fontSize: '15px', lineHeight: 1.75, margin: paragraphIndex === 0 ? 0 : '10px 0 0' }}
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${rule}`, padding: 'clamp(18px, 3vw, 28px) clamp(24px, 4vw, 40px)' }}>
          {mode === 'gate' ? (
            <>
              <label
                style={{
                  alignItems: 'flex-start',
                  color: reachedEnd[current.id] ? ink : inkSoft,
                  cursor: reachedEnd[current.id] ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  fontFamily: sans,
                  fontSize: '13.5px',
                  gap: '10px',
                  lineHeight: 1.5,
                  marginBottom: '10px',
                }}
              >
                <input
                  checked={accepted[current.id]}
                  disabled={!reachedEnd[current.id]}
                  onChange={(event) => setAccepted((state) => ({ ...state, [current.id]: event.target.checked }))}
                  style={{ marginTop: '2px' }}
                  type="checkbox"
                />
                <span>I have read and accept the {current.title.toLowerCase()}.</span>
              </label>
              {!reachedEnd[current.id] && (
                <p style={{ color: inkSoft, fontFamily: sans, fontSize: '12.5px', margin: '0 0 18px' }}>
                  Scroll to the end of this document to continue.
                </p>
              )}
              {reachedEnd[current.id] && <div style={{ marginBottom: '18px' }} />}
              <div style={{ alignItems: 'center', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <span style={{ color: inkSoft, fontFamily: sans, fontSize: '12.5px' }}>
                  {canContinue ? 'Both documents accepted.' : 'Accept both documents to continue.'}
                </span>
                <button
                  disabled={!canContinue}
                  onClick={onAccept}
                  style={{
                    backgroundColor: canContinue ? ink : '#b7bfc7',
                    border: 0,
                    color: '#ffffff',
                    cursor: canContinue ? 'pointer' : 'not-allowed',
                    fontFamily: sans,
                    fontSize: '13.5px',
                    fontWeight: 600,
                    padding: '12px 22px',
                  }}
                >
                  Accept and enter website
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={onClose}
                style={{ backgroundColor: ink, border: 0, color: '#ffffff', cursor: 'pointer', fontFamily: sans, fontSize: '13.5px', fontWeight: 600, padding: '12px 22px' }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}