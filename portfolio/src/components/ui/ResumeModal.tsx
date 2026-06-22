"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, Download, FileText, Briefcase, GraduationCap } from "lucide-react";

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const motionScale = useMotionValue(80);
  const springScale = useSpring(motionScale, { damping: 25, stiffness: 100, mass: 0.8 });
  const [scaleVal, setScaleVal] = useState(80);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-resume", handleOpen);
    return () => window.removeEventListener("open-resume", handleOpen);
  }, []);

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
            onClick={() => setIsOpen(false)}
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
                    href="/resume.pdf"
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
                    onClick={() => setIsOpen(false)}
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
                      fontSize: "clamp(28px, 4vw, 36px)",
                      fontWeight: 700,
                      color: "var(--text)",
                      lineHeight: 1.1,
                      margin: "0 0 8px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                    }}
                  >
                    MEGH GOPALBHAI PANDYA
                  </h1>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--accent)",
                      margin: "0 0 16px 0",
                      fontWeight: 600,
                    }}
                  >
                    Full Stack Developer · Next.js · React.js · Node.js · PHP · PostgreSQL
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      fontSize: "12px",
                      color: "var(--text-sec)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span>+91 9726396207</span>
                    <span>·</span>
                    <span>meghpandya7788@gmail.com</span>
                    <span>·</span>
                    <a href="https://linkedin.com/in/megh17" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>linkedin.com/in/megh17</a>
                    <span>·</span>
                    <a href="https://github.com/megh-pandya" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>github.com/megh-pandya</a>
                    <span>·</span>
                    <a href="https://megh-portfolio-ten.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>megh-portfolio-ten.vercel.app</a>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Profile Summary */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      margin: "0 0 12px 0",
                      fontWeight: 600,
                    }}
                  >
                    Profile Summary
                  </h2>
                  <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.6, margin: 0 }}>
                    Full Stack Developer who shipped production modules for a live real estate SaaS platform serving active business clients — integrating 10+ REST APIs, cutting duplicate code by ~40%, and improving Core Web Vitals scores. Experienced across the full stack with Next.js, React.js, React Native, Node.js, PHP, and PostgreSQL, covering web and mobile development. Strong focus on clean architecture, reusable component design, and delivering measurable results.
                  </p>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Education */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      margin: "0 0 16px 0",
                      fontWeight: 600,
                    }}
                  >
                    Education
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "var(--text)" }}>
                          Master of Computer Application (MCA)
                        </h3>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                          2024 – 2026 (Expected)
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-sec)", margin: 0 }}>
                        ISTAR – CVM University | CGPA: 8.53
                      </p>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "var(--text)" }}>
                          Bachelor of Computer Application (BCA)
                        </h3>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                          2020 – 2023
                        </span>
                      </div>
                      <p style={{ fontSize: "14px", color: "var(--text-sec)", margin: 0 }}>
                        SEMCOM – CVM University | CGPA: 8.32
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Technical Skills */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      margin: "0 0 16px 0",
                      fontWeight: 600,
                    }}
                  >
                    Technical Skills
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "8px", fontSize: "13px" }}>
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Primary Stack</div>
                    <div style={{ color: "var(--text-sec)" }}>Next.js, React.js, React Native, Node.js, Express.js, PHP, PostgreSQL</div>
                    
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Proficient</div>
                    <div style={{ color: "var(--text-sec)" }}>JavaScript (ES6+)</div>
                    
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Familiar</div>
                    <div style={{ color: "var(--text-sec)" }}>Python, Java, C++</div>
                    
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Frontend</div>
                    <div style={{ color: "var(--text-sec)" }}>HTML5, CSS3, Tailwind CSS, Bootstrap, REST APIs, AJAX</div>
                    
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Databases</div>
                    <div style={{ color: "var(--text-sec)" }}>PostgreSQL, MongoDB, MySQL</div>
                    
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Tools</div>
                    <div style={{ color: "var(--text-sec)" }}>Git, GitHub, VS Code, Postman, phpMyAdmin, Vercel</div>
                    
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Concepts</div>
                    <div style={{ color: "var(--text-sec)" }}>OOP, DSA, MVC, Responsive Design, API Integration, Performance Optimisation</div>
                    
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Exploring</div>
                    <div style={{ color: "var(--text-sec)" }}>TypeScript, Docker, AWS basics</div>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Experience */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      margin: "0 0 16px 0",
                      fontWeight: 600,
                    }}
                  >
                    Experience
                  </h2>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "var(--text)" }}>
                        Full Stack Developer Intern | Seaneb Technologies
                      </h3>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                        Dec 2025 – Apr 2026
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", margin: "0 0 12px 0" }}>
                      Next.js · React.js · Tailwind CSS · REST APIs · MySQL · Git
                    </p>
                    <ul style={{ paddingLeft: "16px", margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", color: "var(--text-sec)", lineHeight: 1.6 }}>
                      <li>Built and shipped property listing, dashboard, and user-profile modules for a live Next.js platform serving active business clients.</li>
                      <li>Reduced perceived page-load time by implementing lazy loading, dynamic imports, and SSR strategies in Next.js — improving Core Web Vitals scores.</li>
                      <li>Integrated 10+ REST APIs for real-time property data, authentication, plan management, and analytics.</li>
                      <li>Refactored shared UI components into a reusable library, cutting duplicate code by ~40% and accelerating feature delivery across modules.</li>
                      <li>Resolved production bugs under live-traffic conditions using Git branching and structured code-review workflows.</li>
                      <li>Improved mobile responsiveness across all modules with Tailwind CSS, achieving consistent UX on all screen sizes.</li>
                    </ul>
                  </div>
                </div>

                <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

                {/* Section: Portfolio & Projects */}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      margin: "0 0 16px 0",
                      fontWeight: 600,
                    }}
                  >
                    Projects
                  </h2>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    
                    {/* Project: Seaneb */}
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 4px 0", color: "var(--text)" }}>
                        Seaneb Real Estate Platform
                      </h3>
                      <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", margin: "0 0 6px 0" }}>
                        Next.js · React.js · Tailwind CSS · REST APIs · MySQL
                      </p>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                        Live: <a href="https://seaneb.com" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>seaneb.com</a> | GitHub: <a href="https://github.com/megh-pandya/SEANEB-REAL-ESTATE-1" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>github.com/megh-pandya/SEANEB-REAL-ESTATE-1</a>
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500, margin: "0 0 8px 0" }}>
                        Live multi-role web platform for property search, listing management, and business operations
                      </p>
                      <ul style={{ paddingLeft: "16px", margin: 0, display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--text-sec)", lineHeight: 1.5 }}>
                        <li>Developed interactive dashboards with real-time data refresh and role-based access control for clients, agents, and admins.</li>
                        <li>Implemented optimised routing and rendering patterns that reduced navigation time and improved overall page performance.</li>
                        <li>Achieved consistent responsive layouts across all device sizes using Tailwind CSS utility-first approach.</li>
                      </ul>
                    </div>

                    {/* Project: Attendance */}
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 4px 0", color: "var(--text)" }}>
                        Attendance Management System
                      </h3>
                      <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", margin: "0 0 6px 0" }}>
                        PHP · MySQL · phpMyAdmin
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500, margin: "0 0 8px 0" }}>
                        Full-featured web application automating attendance tracking for Admin, Faculty, and Student roles
                      </p>
                      <ul style={{ paddingLeft: "16px", margin: 0, display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--text-sec)", lineHeight: 1.5 }}>
                        <li>Built secure role-based login and access control with separate dashboards for all three user types.</li>
                        <li>Developed report generation, student data management, and daily-use export modules consumed by faculty.</li>
                        <li>Optimised MySQL queries with proper indexing, reducing average query response time and ensuring data integrity.</li>
                      </ul>
                    </div>

                    {/* Project: UNO */}
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 4px 0", color: "var(--text)" }}>
                        UNO
                      </h3>
                      <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", margin: "0 0 6px 0" }}>
                        React Native · JavaScript · Android · iOS
                      </p>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                        GitHub: <a href="https://github.com/megh-pandya/UNO" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>github.com/megh-pandya/UNO</a>
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500, margin: "0 0 8px 0" }}>
                        Multiplayer UNO card game with AI opponent, real-time friend play, and full rule implementation
                      </p>
                      <ul style={{ paddingLeft: "16px", margin: 0, display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--text-sec)", lineHeight: 1.5 }}>
                        <li>Built a cross-platform UNO card game for Android and iOS using React Native, supporting multiplayer and AI opponent modes.</li>
                        <li>Implemented AI/computer opponent logic and real-time friend multiplayer, giving users flexible play options from a single app.</li>
                        <li>Designed complete game state management — card dealing, turn handling, special cards, and win conditions — with smooth, responsive UI.</li>
                        <li>Structured with modular component architecture using React Native hooks and navigation for clean, scalable code.</li>
                      </ul>
                    </div>

                    {/* Project: Portfolio */}
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 4px 0", color: "var(--text)" }}>
                        Personal Web Portfolio
                      </h3>
                      <p style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", margin: "0 0 6px 0" }}>
                        Next.js · React.js · Tailwind CSS · Framer Motion
                      </p>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
                        Live: <a href="https://megh-portfolio-ten.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>megh-portfolio-ten.vercel.app</a> | GitHub: <a href="https://github.com/megh-pandya/portfolio" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>github.com/megh-pandya/portfolio</a>
                      </div>
                      <p style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500, margin: "0 0 8px 0" }}>
                        Premium, highly animated, and interactive personal portfolio platform
                      </p>
                      <ul style={{ paddingLeft: "16px", margin: 0, display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--text-sec)", lineHeight: 1.5 }}>
                        <li>Built a standout digital presence using Next.js to demonstrate advanced frontend capabilities.</li>
                        <li>Engineered complex animations using Framer Motion, including a 3D folded-paper resume modal, floating digital constellations, and custom page loaders.</li>
                        <li>Developed highly performant, custom interactive canvas elements like dynamic night skies and cursor spotlight effects.</li>
                      </ul>
                    </div>
                    
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
