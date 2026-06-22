"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { navItems } from "@/data/portfolio";
import { Menu, X, Command } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const [logoHovered, setLogoHovered] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const ids = ["about", "projects", "stack", "experience", "contact"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const logoText = "MEGH";
  const logoText2 = "DEV";

  // Typewriter effect for subtitle
  const subtitle = "FULL STACK DEVELOPER";
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [showSubtitleCursor, setShowSubtitleCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedSubtitle(subtitle.substring(0, i + 1));
      i++;
      if (i === subtitle.length) {
        clearInterval(interval);
        setTimeout(() => setShowSubtitleCursor(false), 800);
      }
    }, 40); // Fast typewriter
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <motion.header
          initial={false}
          animate={{
            backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.55)" : "transparent",
            backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
            borderBottomColor: isScrolled ? "rgba(255,255,255,0.06)" : "transparent",
            boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            height: "70px",
            borderBottom: "1px solid",
            padding: "0 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <a
              href="#about"
              style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <img src="/MP-logo.png" alt="MP Logo" style={{ width: "32px", height: "auto", objectFit: "contain" }} />
              
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="hidden-mobile">
                <div style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>
                  {/* MEGH */}
                  <div style={{ display: "flex" }}>
                    {logoText.split("").map((char, i) => (
                      <motion.span
                        key={`m-${i}`}
                        animate={logoHovered ? { y: [0, -3, 0] } : { y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04, type: "spring", stiffness: 300 }}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>

                  {/* Dot */}
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      margin: "0 4px",
                      color: "var(--accent)",
                      display: "inline-block",
                      textShadow: "0 0 8px var(--accent)",
                    }}
                  >
                    ·
                  </motion.span>

                  {/* DEV */}
                  <div style={{ display: "flex" }}>
                    {logoText2.split("").map((char, i) => (
                      <motion.span
                        key={`d-${i}`}
                        animate={logoHovered ? { y: [0, -3, 0] } : { y: 0 }}
                        transition={{ duration: 0.3, delay: (logoText.length + i) * 0.04, type: "spring", stiffness: 300 }}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Subtitle */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: "var(--text-sec)",
                    letterSpacing: "0.1em",
                    marginTop: "2px",
                  }}
                >
                  {typedSubtitle}
                  {showSubtitleCursor && <span style={{ opacity: 0.7 }}>|</span>}
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
              }}
              className="hidden-mobile"
            >
              {navItems.filter(item => item.label !== "Resume").map((item) => {
                const isActive = item.href === `#${activeSection}`;
                return (
                  <div key={item.href} style={{ position: "relative" }}>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavDot"
                        style={{
                          position: "absolute",
                          top: "-12px",
                          left: "50%",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          backgroundColor: "var(--accent)",
                          boxShadow: "0 0 8px var(--accent)",
                          transform: "translateX(-50%)",
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    <a
                      href={item.href}
                      className="nav-link"
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                        position: "relative",
                        display: "inline-block",
                        padding: "4px 0",
                      }}
                    >
                      {item.label}
                      <span className="nav-underline" />
                    </a>
                  </div>
                );
              })}

              {/* Resume Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-resume'));
                }}
                rel="noopener noreferrer"
                className="resume-btn"
                style={{
                  padding: "8px 20px",
                  borderRadius: "20px",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-block",
                  letterSpacing: "0.02em",
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>Resume</span>
                <span className="resume-fill" />
              </button>
            </nav>

            {/* Right: Cmd Palette pill + Mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ThemeToggle />
              <button
                onClick={onOpenCommandPalette}
                className="cmd-btn"
                aria-label="Open command palette"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-sec)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Command size={12} />
                <span className="hidden-mobile">K</span>
                <span className="cmd-scanline" />
              </button>

              {/* Mobile menu toggle */}
              <button
                className="hidden-desktop"
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--text)",
                  position: "relative",
                  zIndex: 60,
                }}
              >
                <motion.div animate={isOpen ? { rotate: 90, opacity: 0 } : { rotate: 0, opacity: 1 }} style={{ position: "absolute" }}>
                  <Menu size={20} />
                </motion.div>
                <motion.div animate={isOpen ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }} style={{ position: "absolute" }}>
                  <X size={20} />
                </motion.div>
              </button>
            </div>
          </div>

          {/* Scroll Progress Bar */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "1.5px",
              backgroundColor: "var(--accent)",
              width: progressBarWidth,
              transformOrigin: "left",
              boxShadow: "0 0 10px var(--accent)",
            }}
          />
        </motion.header>
      </motion.div>

      {/* Mobile Nav Drawer - Slides from RIGHT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "75%",
              background: "rgba(10, 10, 15, 0.85)",
              backdropFilter: "blur(24px) saturate(180%)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              padding: "100px 32px 40px",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                onClick={(e) => {
                  if (item.label === "Resume") {
                    e.preventDefault();
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent('open-resume'));
                  } else {
                    setIsOpen(false);
                  }
                }}
                className="mobile-nav-link"
                style={{
                  display: "block",
                  fontSize: "18px",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontWeight: 500,
                  paddingLeft: "12px",
                  borderLeft: "2px solid transparent",
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .hidden-desktop { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .hidden-desktop { display: flex !important; }
        }

        /* Desktop Nav Link Hover */
        .nav-link {
          transition: color 0.3s ease, letter-spacing 0.3s ease;
        }
        .nav-link:hover {
          color: #fff !important;
          letter-spacing: 0.5px !important;
        }
        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: #fff;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover .nav-underline {
          transform: scaleX(1);
        }

        /* Resume Button Organic Fill */
        .resume-btn:hover {
          color: #000 !important;
          transform: translateY(-2px) scale(1.02);
          border-color: transparent !important;
          box-shadow: 0 0 0 2px var(--accent);
          transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .resume-btn:active {
          transform: scale(0.96);
        }
        .resume-fill {
          position: absolute;
          inset: 0;
          background-color: var(--accent);
          clip-path: polygon(0 100%, 0 100%, 100% 100%, 100% 100%);
          transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }
        .resume-btn:hover .resume-fill {
          clip-path: polygon(0 0, 100% -20%, 100% 100%, -20% 100%);
        }

        /* CmdK Scanline */
        .cmd-btn:hover {
          border-color: rgba(255,255,255,0.2) !important;
          color: #fff !important;
        }
        .cmd-scanline {
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
          transition: top 0.2s linear;
        }
        .cmd-btn:hover .cmd-scanline {
          top: 100%;
        }

        /* Mobile Nav Link Hover */
        .mobile-nav-link {
          transition: border-color 0.2s ease, padding-left 0.2s ease, color 0.2s ease;
        }
        .mobile-nav-link:hover {
          border-color: var(--accent) !important;
          padding-left: 16px !important;
          color: var(--accent) !important;
        }
      `}</style>
    </>
  );
}
