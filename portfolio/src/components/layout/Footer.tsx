import React from "react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            margin: 0,
          }}
        >
          Megh Pandya © {year}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a
            href="https://github.com/megh-pandya"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            github.com/megh-pandya
          </a>
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              margin: 0,
            }}
          >
            Built with Next.js · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
