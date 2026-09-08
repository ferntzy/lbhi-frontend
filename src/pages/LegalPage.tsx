import type { Page } from "../../App"

export default function LegalPage({
  type,
  navigate,
}: {
  type: "privacy" | "terms"
  navigate: (page: Page) => void
}) {
  const privacy = type === "privacy"

  return (
    <article style={{ paddingTop: "64px" }}>
      <header style={{ backgroundColor: "#0d2240", padding: "72px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p
            style={{
              color: "#7fe3e0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              color: "#fff",
              fontSize: "clamp(34px, 6vw, 56px)",
              margin: "12px 0 0",
            }}
          >
            {privacy ? "Privacy Policy" : "Terms and Conditions"}
          </h1>
          <p style={{ color: "rgba(255,255,255,.7)", marginTop: "16px" }}>
            Effective date: September 8, 2026
          </p>
        </div>
      </header>
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "56px 24px 80px",
          color: "#374151",
          lineHeight: 1.8,
        }}
      >
        {privacy ? (
          <>
            <h2>Information we collect</h2>
            <p>
              We collect information you choose to provide through our contact
              form, such as your name, email address, subject, and message. We
              do not ask you to submit medical records or sensitive health
              information through this website.
            </p>
            <h2>How we use information</h2>
            <p>
              We use inquiries to respond to requests, improve our website,
              protect its security, and understand aggregate site usage when
              analytics consent is provided.
            </p>
            <h2>Cookies and analytics</h2>
            <p>
              We store your cookie preference in your browser. Optional
              analytics are only enabled after you consent through the cookie
              banner. You can clear this preference at any time by clearing site
              data.
            </p>
            <h2>Data sharing and retention</h2>
            <p>
              We do not sell personal information. We retain inquiry information
              only as long as needed to respond and meet applicable legal,
              safety, and operational requirements.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href="mailto:info@leytebaptisthospital.ph">
                info@leytebaptisthospital.ph
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <h2>Using this website</h2>
            <p>
              This website provides general information about Leyte Baptist
              Hospital. It is not medical advice and does not replace an
              examination or emergency care.
            </p>
            <h2>Emergency care</h2>
            <p>
              For a medical emergency, call the hospital emergency line or your
              local emergency service. Do not wait for a reply to a website
              form.
            </p>
            <h2>Content and availability</h2>
            <p>
              We work to keep information accurate and available, but services,
              schedules, and contact details may change. We may update or remove
              content without notice.
            </p>
            <h2>External links</h2>
            <p>
              Links to third-party websites are provided for convenience. We are
              not responsible for their content, privacy practices, or
              availability.
            </p>
            <h2>Contact</h2>
            <p>
              For questions about these terms, please{" "}
              <button
                onClick={() => navigate("contact")}
                style={{
                  color: "#136260",
                  background: "none",
                  border: 0,
                  padding: 0,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                contact us
              </button>
              .
            </p>
          </>
        )}
      </div>
    </article>
  )
}
