import type { Page } from "../../App"

export default function NotFoundPage({
  navigate,
}: {
  navigate: (page: Page) => void
}) {
  return (
    <section
      style={{
        minHeight: "60vh",
        padding: "160px 24px 100px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "#1a7f7a",
          fontWeight: 700,
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        Error 404
      </p>
      <h1
        style={{
          color: "#0d2240",
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(42px, 8vw, 72px)",
          margin: "12px 0",
        }}
      >
        Page not found
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "28px" }}>
        The page you requested does not exist or may have moved.
      </p>
      <button
        onClick={() => navigate("home")}
        style={{
          background: "#1a7f7a",
          color: "#fff",
          border: 0,
          borderRadius: 4,
          padding: "13px 24px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Return home
      </button>
    </section>
  )
}
