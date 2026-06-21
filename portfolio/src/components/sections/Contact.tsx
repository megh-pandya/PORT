"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ContactProps {
  onResumeClick: () => void;
}

export function Contact({ onResumeClick }: ContactProps) {
  return (
    <section
      id="contact"
      style={{ padding: "120px 24px 180px", position: "relative" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 6vw, 64px)",
              fontWeight: 400,
              color: "var(--text)",
              marginBottom: "32px",
              lineHeight: 1.1,
              maxWidth: "700px",
            }}
          >
            Currently available for full-time roles and internships.
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "clamp(18px, 3vw, 24px)",
              color: "var(--text-sec)",
              lineHeight: 1.6,
            }}
          >
            <p style={{ margin: 0 }}>
              Reach out directly via{" "}
              <a
                href="mailto:meghpandya7788@gmail.com"
                style={{
                  color: "var(--text)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--accent)",
                  paddingBottom: "2px",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
              >
                email
              </a>
              .
            </p>
            
            <p style={{ margin: 0 }}>
              Or find me on{" "}
              <a
                href="https://www.linkedin.com/in/megh17/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                LinkedIn <ArrowUpRight size={18} style={{ color: "var(--text-muted)" }} />
              </a>
              {" "}and{" "}
              <a
                href="https://github.com/megh17"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                GitHub <ArrowUpRight size={18} style={{ color: "var(--text-muted)" }} />
              </a>
              .
            </p>

            <p style={{ margin: 0, marginTop: "24px" }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onResumeClick();
                }}
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid var(--border)",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Read full resume <ArrowUpRight size={14} />
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
