"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

// ── CTA Button ────────────────────────────────────────────
function CtaButton({
  onClick,
  href,
  children,
  variant = "primary",
}: {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "13px 26px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.02em",
    cursor: "pointer",
    border: "1px solid",
    textDecoration: "none",
    transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s",
    whiteSpace: "nowrap",
  };
  const primary: React.CSSProperties = {
    ...base,
    backgroundColor: "var(--text)",
    color: "var(--surface)",
    borderColor: "var(--text)",
  };
  const secondary: React.CSSProperties = {
    ...base,
    backgroundColor: "transparent",
    color: "var(--text)",
    borderColor: "var(--border)",
  };
  const style = variant === "primary" ? primary : secondary;

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === "primary") {
      el.style.backgroundColor = "var(--accent)";
      el.style.borderColor = "var(--accent)";
      el.style.color = "#fff";
    } else {
      el.style.borderColor = "var(--accent)";
      el.style.color = "var(--accent)";
    }
    el.style.transform = "translateY(-1px)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === "primary") {
      el.style.backgroundColor = "var(--text)";
      el.style.borderColor = "var(--text)";
      el.style.color = "var(--surface)";
    } else {
      el.style.borderColor = "var(--border)";
      el.style.color = "var(--text)";
    }
    el.style.transform = "translateY(0)";
  };

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
        rel="noopener noreferrer"
        style={style}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <button style={style} onClick={onClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </button>
  );
}

// ── Landing section ───────────────────────────────────────
export function Landing() {
  const [introSeen, setIntroSeen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("portfolio_intro_seen_v2");
      setIntroSeen(!!seen);
    }
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  // Content appears after intro shatter OR immediately if session already seen
  // Wait longer if the intro hasn't been seen yet
  const baseDelay = introSeen ? 0.2 : 0.8;

  const name = "Megh Pandya";

  return (
    <section
      id="about"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--accent)",
            letterSpacing: "0.14em",
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          MEGH.DEV · FULL STACK DEVELOPER
        </motion.p>

        {/* Name (Stagger in letters from bottom) */}
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(52px, 9vw, 118px)",
            lineHeight: 1.0,
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "18px",
            letterSpacing: "-0.025em",
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
          }}
        >
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: baseDelay + index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Role (Fades in after name completes) */}
        <div style={{ marginBottom: "20px", overflow: "hidden" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: baseDelay + (name.length * 0.05) + 0.2, ease: "easeOut" }}
            style={{
              fontSize: "clamp(17px, 2.6vw, 24px)",
              color: "var(--text-sec)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            Full Stack Developer
          </motion.p>
        </div>

        {/* Description (Slides up after role) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay + (name.length * 0.05) + 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "48px", maxWidth: "500px" }}
        >
          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "var(--border)",
              marginBottom: "24px",
              maxWidth: "440px",
            }}
          />
          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "var(--text-sec)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Building production-grade web and mobile systems.
          </p>
        </motion.div>

        {/* CTAs (Scale in with spring bounce) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: baseDelay + (name.length * 0.05) + 0.8
          }}
          style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}
        >
          <CtaButton onClick={scrollToProjects} variant="primary">
            View Projects <ArrowRight size={16} />
          </CtaButton>
          <CtaButton
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-resume'));
            }}
            variant="secondary"
          >
            Download Resume <Download size={15} />
          </CtaButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: baseDelay + 2.0, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "-90px",
            left: 0,
            fontSize: "10px",
            color: "var(--text-muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>Scroll to explore</span>
          <span
            style={{ display: "block", width: "28px", height: "1px", backgroundColor: "var(--text-muted)" }}
          />
        </motion.p>
      </div>
    </section>
  );
}
