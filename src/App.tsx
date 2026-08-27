import { useState } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import DoctorsPage from './pages/DoctorsPage'
import DepartmentsPage from './pages/DepartmentsPage'
import OrgChartPage from './pages/OrgChartPage'
import NewsPage from './pages/NewsPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import CommunityPage from './pages/CommunityPage'
import ContactPage from './pages/ContactPage'
import FaithPage from './pages/FaithPage'
export type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'doctors'
  | 'departments'
  | 'org'
  | 'news'
  | 'stories'
  | 'community'
  | 'contact'
  | 'faith'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
      default:
        return <HomePage navigate={navigate} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Navigation currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  )
}
