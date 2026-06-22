"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, GitFork, ExternalLink, FileText } from "lucide-react";
import { ScrambledHeading } from "@/components/ui/ScrambledHeading";

/* ── Contact item ────────────────────────────────────────── */
function ContactItem({
  icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "22px 28px",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        background: "var(--surface)",
        textDecoration: "none",
        transition: "border-color 0.25s ease, background 0.25s ease, transform 0.2s ease",
        cursor: "pointer",
      }}
      whileHover={{
        borderColor: "var(--accent)",
        backgroundColor: "var(--surface-alt)",
        y: -2,
      }}
    >
      {/* Icon */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          background: "var(--bg)",
          color: "var(--accent)",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--text-muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: 0,
            marginBottom: "3px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text)",
            margin: 0,
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </p>
      </div>

      {/* Arrow */}
      <span
        style={{
          color: "var(--text-muted)",
          fontSize: "18px",
          flexShrink: 0,
          transition: "color 0.2s",
        }}
      >
        →
      </span>
    </motion.a>
  );
}

/* ── Contact section ─────────────────────────────────────── */
export function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "120px 24px 180px", position: "relative" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScrambledHeading
            text="Get in touch."
            className="font-serif"
            style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 400,
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          />

          <p
            style={{
              fontSize: "17px",
              color: "var(--text-sec)",
              marginBottom: "56px",
              maxWidth: "440px",
              lineHeight: 1.6,
            }}
          >
            Open to full-time roles and internships.
          </p>
        </motion.div>

        {/* Contact items grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <ContactItem
            icon={<Mail size={18} />}
            label="Email"
            value="meghpandya7788@gmail.com"
            href="mailto:meghpandya7788@gmail.com"
            delay={0.05}
          />
          <ContactItem
            icon={<Phone size={18} />}
            label="Phone"
            value="+91 9726396207"
            href="tel:+919726396207"
            delay={0.12}
          />
          <ContactItem
            icon={<GitFork size={18} />}
            label="GitHub"
            value="github.com/megh-pandya"
            href="https://github.com/megh-pandya"
            delay={0.19}
          />
          <ContactItem
            icon={<ExternalLink size={18} />}
            label="LinkedIn"
            value="linkedin.com/in/megh17"
            href="https://linkedin.com/in/megh17"
            delay={0.26}
          />
        </div>

        {/* Resume button — matches navbar resume style */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('open-resume'));
            }}
            id="contact-resume-btn"
            className="resume-btn"
            style={{
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "12px 24px",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              background: "var(--surface)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text)",
              letterSpacing: "0.01em",
              transition: "border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.15s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--accent)";
              el.style.color = "var(--accent)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--text)";
              el.style.transform = "translateY(0)";
            }}
          >
            <FileText size={15} />
            View Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
}
