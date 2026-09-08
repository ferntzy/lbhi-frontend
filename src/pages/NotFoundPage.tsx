import type { Page } from '../App'

interface Props {
  navigate: (page: Page) => void
}

export default function NotFoundPage({ navigate }: Props) {
  return (
    <section style={{ alignItems: 'center', background: 'linear-gradient(135deg, #f5fbfb 0%, #ffffff 60%)', display: 'flex', minHeight: '70vh', padding: '120px 24px 80px' }}>
      <div style={{ margin: '0 auto', maxWidth: '760px', textAlign: 'center' }}>
        <div style={{ color: '#1a7f7a', fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em', marginBottom: '16px' }}>ERROR 404</div>
        <h1 style={{ color: '#0d2240', fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(48px, 9vw, 92px)', lineHeight: 1, margin: '0 0 22px' }}>Page not found.</h1>
        <p style={{ color: '#5b6472', fontSize: '18px', lineHeight: 1.7, margin: '0 auto 32px', maxWidth: '520px' }}>The page you are looking for may have moved. Let us help you get back to the care and information you need.</p>
        <button onClick={() => navigate('home')} style={{ backgroundColor: '#0d2240', border: 0, color: '#ffffff', cursor: 'pointer', fontSize: '14px', fontWeight: 700, padding: '15px 24px' }}>Return home</button>
      </div>
    </section>
  )
}