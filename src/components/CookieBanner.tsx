import { useState } from "react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(
    () => localStorage.getItem("lbhi-cookie-consent") === null,
  )

  if (!visible) return null

  const choose = (analytics: boolean) => {
    localStorage.setItem(
      "lbhi-cookie-consent",
      analytics ? "accepted" : "declined",
    )

    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({ event: "cookie_consent", analytics })

    setVisible(false)
  }

  return (
    <aside
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        zIndex: 100,
        left: 16,
        right: 16,
        bottom: 16,
        maxWidth: 620,
        padding: "18px 20px",
        background: "#081729",
        color: "#fff",
        boxShadow: "0 8px 30px rgba(0,0,0,.25)",
        borderRadius: 6,
      }}
    >
      <strong style={{ display: "block", marginBottom: 6 }}>
        Your privacy matters
      </strong>
      <p
        style={{
          margin: "0 0 14px",
          color: "rgba(255,255,255,.78)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        We use essential storage to remember this choice. Optional analytics
        help us improve the website and are only enabled with your consent.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => choose(true)}
          style={{
            background: "#4dd9d0",
            color: "#081729",
            border: 0,
            padding: "9px 16px",
            borderRadius: 4,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Accept analytics
        </button>
        <button
          onClick={() => choose(false)}
          style={{
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,.5)",
            padding: "9px 16px",
            borderRadius: 4,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Essential only
        </button>
      </div>
    </aside>
  )
}
