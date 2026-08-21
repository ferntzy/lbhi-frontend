import { useState } from 'react'
import type { Page } from '../../App'

interface Props {
  navigate: (page: Page) => void
}

const posts = [
  {
    id: 1,
    category: 'Community Outreach',
    date: 'July 28, 2025',
    title: 'Medical Mission Brings Free Healthcare to Barangay Imelda',
    excerpt:
      'Medical teams from Leyte Baptist Hospital provided free consultations, medicines, and basic laboratory services to over 350 residents of Barangay Imelda, Hilongos.',
    body: 'Teams from the hospital\'s medical, nursing, laboratory, and pharmacy departments participated in a full-day medical mission, seeing patients for general medicine, OB-GYN, pediatrics, and providing free medicines from the hospital\'s community pharmacy allotment.',
    image: 'https://images.unsplash.com/photo-1652148439208-3e73641d0725?w=1000&h=600&fit=crop&auto=format',
    author: 'LBH Communications',
    dept: 'Community Health',
    featured: true,
  },
  {
    id: 2,
    category: 'Hospital Update',
    date: 'July 15, 2025',
    title: 'Laboratory Department Now Offers Extended Operating Hours',
    excerpt:
      "Starting August 1, our Laboratory Department will operate until 8:00 PM on weekdays to better serve patients.",
    body: 'The extended hours are intended to reduce patient congestion during morning peak hours and to accommodate working patients who cannot visit during standard daytime hours.',
    image: 'https://images.unsplash.com/photo-1680759291470-9c10abc59668?w=700&h=440&fit=crop&auto=format',
    author: 'LBH Administration',
    dept: 'Laboratory',
    featured: false,
  },
  {
    id: 3,
    category: 'Health Campaign',
    date: 'July 5, 2025',
    title: 'Free Dengue Awareness and Vaccination Campaign This August',
    excerpt:
      'In partnership with the local government, LBH will conduct free dengue awareness sessions and vaccine availability checks at Hilongos Municipal Hall.',
    body: 'The campaign is part of the hospital\'s contribution to the ongoing DOH nationwide dengue prevention program, scheduled during the rainy season.',
    image: 'https://images.unsplash.com/photo-1653508311277-1ecf6ee52c5e?w=700&h=440&fit=crop&auto=format',
    author: 'LBH Community Health',
    dept: 'Community Health',
    featured: false,
  },
  {
    id: 4,
    category: 'Announcement',
    date: 'June 20, 2025',
    title: 'Emergency Room Staffing Upgrade Effective July 2025',
    excerpt:
      'As part of our commitment to improving emergency response times, LBH has enhanced staffing protocols and added a dedicated triage nurse for all ER shifts.',
    body: 'The upgrade was made possible through a comprehensive review of patient volume data and an investment in additional nursing staff dedicated to the Emergency Room.',
    image: 'https://images.unsplash.com/photo-1550831106-2747f0d6a81c?w=700&h=440&fit=crop&auto=format',
    author: 'LBH Administration',
    dept: 'Emergency Room',
    featured: false,
  },
  {
    id: 5,
    category: 'Event',
    date: 'June 10, 2025',
    title: 'Annual Hospital Family Day — A Celebration of Our Team',
    excerpt:
      "LBH staff, their families, and hospital volunteers came together for the hospital's annual Family Day, held at the hospital grounds.",
    body: 'The event celebrated the dedication and hard work of the hospital\'s employees and volunteers, with activities for families and recognition awards for outstanding staff.',
    image: 'https://images.unsplash.com/photo-1621353880594-70b5fd44ecb3?w=700&h=440&fit=crop&auto=format',
    author: 'Human Resources',
    dept: 'Administration',
    featured: false,
  },
]

const categories = ['All', 'Community Outreach', 'Hospital Update', 'Health Campaign', 'Announcement', 'Event']

export default function NewsPage({ navigate }: Props) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = posts.filter(
    (p) =>
      (activeCategory === 'All' || p.category === activeCategory) &&
      (search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())),
  )

  const featured = filtered.find((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

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
            Hospital News
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
            News & Updates
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', lineHeight: 1.75, fontSize: '15px', marginBottom: '24px' }}>
            Stay informed about what's happening at Leyte Baptist Hospital — medical missions,
            community programs, hospital announcements, and more.
          </p>
          <input
            type="search"
            placeholder="Search news and updates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              maxWidth: '400px',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              padding: '11px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 16px',
                fontSize: '12px',
                fontWeight: 500,
                border: '1px solid',
                borderColor: activeCategory === cat ? '#0d2240' : '#e5e7eb',
                borderRadius: '20px',
                backgroundColor: activeCategory === cat ? '#0d2240' : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              border: '1px solid #f3f4f6',
              marginBottom: '40px',
              overflow: 'hidden',
            }}
          >
            <div style={{ backgroundColor: '#e5e7eb', minHeight: '320px' }}>
              <img
                src={featured.image}
                alt={featured.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '320px' }}
                loading="lazy"
              />
            </div>
            <div style={{ padding: 'clamp(24px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
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
                  {featured.category}
                </span>
                <span style={{ color: '#d1d5db', fontSize: '12px' }}>Featured</span>
              </div>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  color: '#0d2240',
                  margin: '0 0 16px',
                  lineHeight: 1.3,
                }}
              >
                {featured.title}
              </h2>
              <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: 1.75, margin: '0 0 12px' }}>{featured.excerpt}</p>
              {expanded === featured.id && (
                <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.75, margin: '0 0 12px' }}>{featured.body}</p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {featured.date} · {featured.author} · {featured.dept}
                </div>
                <button
                  onClick={() => setExpanded(expanded === featured.id ? null : featured.id)}
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
                  {expanded === featured.id ? 'Show Less ↑' : 'Read Story →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Post grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {rest.map((post) => (
            <article
              key={post.id}
              style={{
                border: '1px solid #f3f4f6',
                borderRadius: '2px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#d1eeec')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#f3f4f6')}
            >
              <div style={{ backgroundColor: '#e5e7eb', height: '200px', overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                  loading="lazy"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span
                    style={{
                      color: '#1a7f7a',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.category}
                  </span>
                  <span style={{ color: '#e5e7eb' }}>·</span>
                  <span style={{ color: '#9ca3af', fontSize: '11px' }}>{post.date}</span>
                </div>
                <h3
                  style={{
                    fontWeight: 600,
                    color: '#0d2240',
                    fontSize: '15px',
                    lineHeight: 1.4,
                    margin: '0 0 10px',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '13px',
                    lineHeight: 1.7,
                    margin: '0 0 8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.excerpt}
                </p>
                {expanded === post.id && (
                  <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.7, margin: '0 0 8px' }}>{post.body}</p>
                )}
                <button
                  onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                  style={{
                    color: '#1a7f7a',
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    marginTop: '6px',
                  }}
                >
                  {expanded === post.id ? 'Show Less ↑' : 'Read More →'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📰</div>
            <div style={{ fontSize: '14px' }}>No posts found matching your search.</div>
          </div>
        )}
      </div>
    </div>
  )
}
