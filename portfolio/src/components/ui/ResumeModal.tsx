"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, Download, FileText, Briefcase, GraduationCap } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const motionScale = useMotionValue(80);
  const springScale = useSpring(motionScale, { damping: 25, stiffness: 100, mass: 0.8 });
  const [scaleVal, setScaleVal] = useState(80);

  useEffect(() => {
    if (isOpen) {
      // Trigger uncrumpling to flat state
      motionScale.set(0);
    } else {
      // Re-crumple
      motionScale.set(80);
    }
  }, [isOpen, motionScale]);

  useEffect(() => {
    return springScale.on("change", (latest) => {
      setScaleVal(latest);
    });
  }, [springScale]);

  // Disable scrolling on background body when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* SVG Displacement Shader definition */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
        <defs>
          <filter id="paper-uncrumple">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scaleVal}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999, // Render just below CustomCursor (100000)
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--overlay-bg)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "24px",
              perspective: "1200px", // Enables 3D perspective depth
            }}
            onClick={onClose}
          >
            {/* Folded Paper Unfolding Card */}
            <motion.div
              initial={{
                scale: 0.15,
                rotateX: 75,
                rotateY: -15,
                skewY: 8,
                opacity: 0,
                borderRadius: "150px",
              }}
              animate={{
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                skewY: 0,
                opacity: 1,
                borderRadius: "12px",
              }}
              exit={{
                scale: 0.15,
                rotateX: 75,
                rotateY: 15,
                skewY: -8,
                opacity: 0,
                borderRadius: "150px",
              }}
              transition={{
                type: "spring",
                damping: 22,
                stiffness: 85,
                mass: 0.8,
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "760px",
                height: "90vh",
                maxHeight: "900px",
                backgroundColor: "var(--surface)", // Dynamic surface background (ivory in light, charcoal in dark)
                color: "var(--text)", // Dynamic text color
                boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                // Apply the SVG displacement filter when unfolding/uncrumpling
                filter: scaleVal > 0.8 ? "url(#paper-uncrumple)" : "none",
                willChange: "transform, filter, border-radius",
                border: "1px solid var(--border)",
                transformOrigin: "center top",
              }}
            >
              {/* Paper Top bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 32px",
                  borderBottom: "1px dashed var(--border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <FileText size={13} style={{ color: "var(--accent)" }} />
                  <span>MEGH PANDYA(RESUME)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", pointerEvents: "auto" }}>
                  <a
                    href="/Megh_Pandya_Resume.pdf"
                    download
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "var(--text)",
                      textDecoration: "none",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      border: "1px solid transparent",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--surface-alt)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={onClose}
                    style={{
                      border: "none",
                      background: "none",
                      color: "var(--text)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "4px",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--surface-alt)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Scrollable Paper Content */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "48px 48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "36px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {/* Header info */}
                <div>
                  <h1
                    className="font-serif"
                    style={{
                      fontSize: "clamp(32px, 5vw, 44px)",
                      fontWeight: 400,
                      color: "var(--text)",
                      lineHeight: 1.1,
                      margin: "0 0 8px 0",
                    }}
                  >
                    Megh Pandya
                  </h1>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--accent)",
                      margin: "0 0 16px 0",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Full Stack Developer
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "16px",
                      fontSize: "13px",
                      color: "var(--text-sec)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span>meghpandya7788@gmail.com</span>
                    <span>·</span>
                    <a href="https://linkedin.com/in/megh17" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
                      linkedin.com/in/megh17
                    </a>
                    <span>·</span>
                    <a href="https://github.com/megh17" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>
                      github.com/megh17
                    </a>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Work Experience */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "0 0 20px 0",
                    }}
                  >
                    <Briefcase size={12} style={{ color: "var(--accent)" }} />
                    Professional Experience
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "var(--text)" }}>
                          Full Stack Developer Intern
                        </h3>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                          Dec 2025 – Apr 2026
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--accent)", fontWeight: 500, margin: "0 0 12px 0", fontFamily: "var(--font-mono)" }}>
                        Seaneb Technologies
                      </p>
                      <ul style={{ paddingLeft: "16px", margin: 0, display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", color: "var(--text-sec)", lineHeight: 1.5 }}>
                        <li>Built property listing, dashboard, and user profile modules for a live property platform.</li>
                        <li>Integrated 10+ REST APIs covering authentication, analytics, subscription plans, and property data.</li>
                        <li>Optimized Core Web Vitals via lazy loading, dynamic imports, and Next.js SSR strategies.</li>
                        <li>Refactored shared UI components, reducing code duplication across dashboards by ~40%.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Education */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin: "0 0 20px 0",
                    }}
                  >
                    <GraduationCap size={12} style={{ color: "var(--accent)" }} />
                    Education
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Postgraduate */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "var(--text)" }}>
                          Master of Computer Application (MCA)
                        </h3>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                          2024 – 2026
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-sec)", margin: "0 0 8px 0" }}>
                        ISTAR — CVM University
                      </p>
                      <p style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--accent)", margin: 0 }}>
                        CGPA: 8.53 (SEM-1: 7.50 · SEM-2: 8.40 · SEM-3: 8.70)
                      </p>
                    </div>

                    {/* Undergraduate */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "var(--text)" }}>
                          Bachelor of Computer Application (BCA)
                        </h3>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                          2020 – 2023
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-sec)", margin: "0 0 8px 0" }}>
                        SEMCOM — CVM University
                      </p>
                      <p style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--accent)", margin: 0 }}>
                        CGPA: 8.32
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Technical Stack */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      margin: "0 0 16px 0",
                    }}
                  >
                    Skills Ecosystem
                  </h2>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["Next.js", "React.js", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "PHP", "MySQL", "PostgreSQL", "REST APIs", "Git", "Docker"].map((skill) => (
                      <span
                        key={skill}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "4px",
                          border: "1px solid var(--border)",
                          background: "var(--surface-alt)",
                          fontSize: "12px",
                          color: "var(--text)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
