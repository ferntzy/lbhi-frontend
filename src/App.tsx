import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import DoctorsPage from './pages/DoctorsPage'
import DepartmentsPage from './pages/DepartmentsPage'
import CentersPage from './pages/CentersPage'
import OrgChartPage from './pages/OrgChartPage'
import NewsPage from './pages/NewsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import CommunityPage from './pages/CommunityPage'
import ContactPage from './pages/ContactPage'
import FaithPage from './pages/FaithPage'
import NotFoundPage from './pages/NotFoundPage'
import CookieConsent from './components/CookieConsent'
import LegalConsentModal from './components/LegalConsentModal'
export type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'doctors'
  | 'departments'
  | 'centers'
  | 'org'
  | 'news'
  | 'stories'
  | 'community'
  | 'contact'
  | 'faith'
  | 'not-found'

export default function App() {
  const pageFromPath = (): Page => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '')
    const routes: Record<string, Page> = {
      '': 'home',
      home: 'home',
      about: 'about',
      services: 'services',
      doctors: 'doctors',
      departments: 'departments',
      centers: 'centers',
      org: 'org',
      news: 'news',
      stories: 'stories',
      community: 'community',
      contact: 'contact',
      faith: 'faith',
    }
    return routes[path] ?? 'not-found'
  }

  const [currentPage, setCurrentPage] = useState<Page>(pageFromPath)
  const [openLegalDocument, setOpenLegalDocument] = useState<'privacy' | 'terms' | null>(null)

  const navigate = (page: Page, replace = false) => {
    setCurrentPage(page)
    const method = replace ? 'replaceState' : 'pushState'
    const paths: Partial<Record<Page, string>> = {
      home: '/',
    }
    window.history[method]({}, '', paths[page] ?? `/${page}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onPopState = () => setCurrentPage(pageFromPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />
      case 'about':
        return <AboutPage navigate={navigate} />
      case 'services':
        return <ServicesPage navigate={navigate} />
      case 'doctors':
        return <DoctorsPage navigate={navigate} />
      case 'departments':
        return <DepartmentsPage navigate={navigate} />
      case 'centers':
        return <CentersPage navigate={navigate} />
      case 'org':
        return <OrgChartPage navigate={navigate} />
      case 'news':
        return <NewsPage navigate={navigate} />
      case 'stories':
        return <SuccessStoriesPage navigate={navigate} />
      case 'community':
        return <CommunityPage navigate={navigate} />
      case 'contact':
        return <ContactPage navigate={navigate} />
      case 'faith':
        return <FaithPage navigate={navigate} />
      case 'not-found':
        return <NotFoundPage navigate={navigate} />
      default:
        return <NotFoundPage navigate={navigate} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Navigation currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} onOpenLegal={setOpenLegalDocument} />
      <CookieConsent navigate={navigate} onOpenLegal={setOpenLegalDocument} />
      {openLegalDocument && (
        <LegalConsentModal mode="view" initialDocument={openLegalDocument} onClose={() => setOpenLegalDocument(null)} />
      )}
    </div>
  )
}
