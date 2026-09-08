import { useEffect, useState } from "react"

import Navigation from "./components/Navigation"

import Footer from "./components/Footer"

import HomePage from "./pages/HomePage"

import AboutPage from "./pages/AboutPage"

import ServicesPage from "./pages/ServicesPage"

import DoctorsPage from "./pages/DoctorsPage"

import DepartmentsPage from "./pages/DepartmentsPage"

import OrgChartPage from "./pages/OrgChartPage"

import NewsPage from "./pages/NewsPage"

import SuccessStoriesPage from "./pages/SuccessStoriesPage"

import CommunityPage from "./pages/CommunityPage"

import ContactPage from "./pages/ContactPage"

import FaithPage from "./pages/FaithPage"

import LegalPage from "./pages/LegalPage"

import NotFoundPage from "./pages/NotFoundPage"

import CookieBanner from "./components/CookieBanner"

export type Page = "home" | "about" | "services" | "doctors" | "departments" | "org" | "news" | "stories" | "community" | "contact" | "faith" | "privacy" | "terms" | "not-found"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")

  const navigate = (page: Page) => {
    setCurrentPage(page)

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const metadata: Record<Page, { title: string description: string }> = {
      home: {
        title:
          "Leyte Baptist Hospital | Compassionate Healthcare in Southern Leyte",
        description:
          "Accessible, professional healthcare and 24-hour emergency services for Hilongos and Southern Leyte.",
      },

      about: {
        title: "About Us | Leyte Baptist Hospital",
        description:
          "Learn about Leyte Baptist Hospital, our history, mission, and commitment to compassionate care.",
      },

      services: {
        title: "Services | Leyte Baptist Hospital",
        description:
          "Explore hospital services, diagnostics, emergency care, and patient support at Leyte Baptist Hospital.",
      },

      doctors: {
        title: "Our Doctors | Leyte Baptist Hospital",
        description:
          "Meet the physicians and care teams serving patients at Leyte Baptist Hospital.",
      },

      departments: {
        title: "Departments | Leyte Baptist Hospital",
        description:
          "Find the hospital departments and services available to patients and families.",
      },

      org: {
        title: "Organizational Structure | Leyte Baptist Hospital",
        description:
          "Discover the leadership and organizational structure of Leyte Baptist Hospital.",
      },

      news: {
        title: "News & Updates | Leyte Baptist Hospital",
        description:
          "Read the latest hospital updates, health campaigns, and community news.",
      },

      stories: {
        title: "Patient Stories | Leyte Baptist Hospital",
        description:
          "Read stories from patients and families whose lives were touched by Leyte Baptist Hospital.",
      },

      community: {
        title: "Community Outreach | Leyte Baptist Hospital",
        description:
          "See how Leyte Baptist Hospital serves communities across Southern Leyte.",
      },

      contact: {
        title: "Contact Us | Leyte Baptist Hospital",
        description:
          "Contact Leyte Baptist Hospital for general inquiries, appointments, and hospital services.",
      },

      faith: {
        title: "Our Faith | Leyte Baptist Hospital",
        description:
          "Learn about the faith and values that guide Leyte Baptist Hospital.",
      },

      privacy: {
        title: "Privacy Policy | Leyte Baptist Hospital",
        description:
          "Read how Leyte Baptist Hospital collects, uses, and protects website information.",
      },

      terms: {
        title: "Terms and Conditions | Leyte Baptist Hospital",
        description:
          "Review the terms and conditions for using the Leyte Baptist Hospital website.",
      },

      "not-found": {
        title: "Page Not Found | Leyte Baptist Hospital",
        description: "The page you requested could not be found.",
      },
    }

    document.title = metadata[currentPage].title

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata[currentPage].description)

    if (localStorage.getItem("lbhi-cookie-consent") === "accepted") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "page_view", page: currentPage })
    }
  }, [currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} />

      case "about":
        return <AboutPage navigate={navigate} />

      case "services":
        return <ServicesPage navigate={navigate} />

      case "doctors":
        return <DoctorsPage navigate={navigate} />

      case "departments":
        return <DepartmentsPage navigate={navigate} />

      case "org":
        return <OrgChartPage navigate={navigate} />

      case "news":
        return <NewsPage navigate={navigate} />

      case "stories":
        return <SuccessStoriesPage navigate={navigate} />

      case "community":
        return <CommunityPage navigate={navigate} />

      case "contact":
        return <ContactPage navigate={navigate} />

      case "faith":
        return <FaithPage navigate={navigate} />

      case "privacy":
        return <LegalPage type="privacy" navigate={navigate} />

      case "terms":
        return <LegalPage type="terms" navigate={navigate} />

      case "not-found":
        return <NotFoundPage navigate={navigate} />

      default:
        return <HomePage navigate={navigate} />
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Navigation currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
      <CookieBanner />
    </div>
  )
}
