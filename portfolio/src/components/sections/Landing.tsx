"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Landing() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

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
      {/* Subtle background texture lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Warm orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,106,61,0.08) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Index number */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--accent)",
            letterSpacing: "0.12em",
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          MEGH.DEV - FULL STACK DEVELOPER
        </motion.p>

        {/* Name — large editorial serif */}
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(52px, 9vw, 120px)",
            lineHeight: 1.0,
            fontWeight: 400,
            color: "var(--text)",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="mask-text-wrapper">
            <motion.span
              className="mask-text-line"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Megh Pandya
            </motion.span>
          </span>
        </h1>

        {/* Role */}
        <div style={{ marginBottom: "32px" }}>
          <span className="mask-text-wrapper">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(16px, 2.4vw, 22px)",
                color: "var(--text-sec)",
                fontWeight: 400,
                letterSpacing: "0.01em",
                margin: 0,
              }}
            >
              Full Stack Developer
            </motion.p>
          </span>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "1px",
            backgroundColor: "var(--border)",
            marginBottom: "32px",
            maxWidth: "560px",
          }}
        />

        {/* Mission statement */}
        <div style={{ marginBottom: "52px", maxWidth: "520px" }}>
          <span className="mask-text-wrapper" style={{ display: "block" }}>
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "var(--text-sec)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Building practical web systems — production dashboards, REST API
              integrations, and full stack features that work reliably under real
              traffic.
            </motion.p>
          </span>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton
            onClick={scrollToProjects}
            className="landing-cta"
            strength={0.25}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                backgroundColor: "var(--text)",
                color: "var(--bg)",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                border: "none",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "var(--text)")
              }
            >
              View Projects
              <ArrowRight size={16} />
            </span>
          </MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            bottom: "-80px",
            left: 0,
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>Scroll to explore</span>
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              backgroundColor: "var(--text-muted)",
            }}
          />
        </motion.p>
      </div>
    </section>
  );
}
