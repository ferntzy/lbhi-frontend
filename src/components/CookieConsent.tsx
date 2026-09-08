import { useEffect, useState } from 'react'
import type { Page } from '../App'

interface Props {
  navigate: (page: Page) => void
  onOpenLegal?: (page: 'privacy' | 'terms') => void
}

const CONSENT_KEY = 'lbhi-cookie-consent'

export default function CookieConsent({ navigate, onOpenLegal }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(window.localStorage.getItem(CONSENT_KEY) === null)
  }, [])

  const saveChoice = (choice: 'accepted' | 'declined') => {
    window.localStorage.setItem(CONSENT_KEY, choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside aria-label="Cookie consent" style={{ backgroundColor: '#ffffff', border: '1px solid #d8e2e3', bottom: '20px', boxShadow: '0 12px 36px rgba(8,23,41,0.18)', left: '20px', maxWidth: '520px', padding: '22px', position: 'fixed', right: '20px', zIndex: 60 }}>
      <div style={{ alignItems: 'flex-start', display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#0d2240', fontSize: '17px', margin: '0 0 7px' }}>We use cookies</h2>
          <p style={{ color: '#5b6472', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>We use essential cookies to keep this site working and optional cookies to understand site usage. You can accept or decline optional cookies.</p>
        </div>
        <button aria-label="Decline cookies" onClick={() => saveChoice('declined')} style={{ background: 'none', border: 0, color: '#7a8491', cursor: 'pointer', fontSize: '22px', lineHeight: 1, padding: 0 }}>×</button>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
        <button onClick={() => saveChoice('accepted')} style={{ backgroundColor: '#1a7f7a', border: 0, color: '#ffffff', cursor: 'pointer', fontSize: '13px', fontWeight: 700, padding: '11px 16px' }}>Accept cookies</button>
        <button onClick={() => saveChoice('declined')} style={{ backgroundColor: '#eef6f6', border: 0, color: '#136260', cursor: 'pointer', fontSize: '13px', fontWeight: 700, padding: '11px 16px' }}>Decline optional</button>
        <button onClick={() => onOpenLegal?.('privacy')} style={{ background: 'none', border: 0, color: '#136260', cursor: 'pointer', fontSize: '13px', padding: 0, textDecoration: 'underline' }}>Privacy &amp; terms</button>
      </div>
    </aside>
  )
}