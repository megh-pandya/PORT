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
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);

  const [logoHovered, setLogoHovered] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
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
          display: "flex",
          justifyContent: "center",
          paddingTop: "24px",
        }}
      >
        <motion.header
          initial={false}
          animate={{
            backgroundColor: isScrolled ? "var(--overlay-bg)" : "rgba(0, 0, 0, 0)",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            borderColor: isScrolled ? "var(--border)" : "rgba(0, 0, 0, 0)",
            boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none",
            padding: isScrolled ? "0 20px" : "0 24px",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            height: "64px",
            border: "1px solid",
            borderRadius: "100px",
            width: "calc(100% - 48px)",
            maxWidth: "1100px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
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
              <img src="/MP-logo.png" alt="MP Logo" style={{ width: "28px", height: "auto", objectFit: "contain" }} />
              
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="hidden-mobile">
                <div style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, color: "var(--text)" }}>
                  {/* MEGH */}
                  <div style={{ display: "flex" }}>
                    {logoText.split("").map((char, i) => (
                      <motion.span
                        key={`m-${i}`}
                        animate={logoHovered ? { y: [0, -3, 0] } : { y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: "easeInOut" }}
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
                        transition={{ duration: 0.4, delay: (logoText.length + i) * 0.04, ease: "easeInOut" }}
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
                gap: "8px",
              }}
              className="hidden-mobile"
              onMouseLeave={() => setHoveredNavItem(null)}
            >
              {navItems.filter(item => item.label !== "Resume").map((item) => {
                const isActive = item.href === `#${activeSection}`;
                const isHovered = hoveredNavItem === item.href;
                return (
                  <div 
                    key={item.href} 
                    style={{ position: "relative" }}
                    onMouseEnter={() => setHoveredNavItem(item.href)}
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="navHover"
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "var(--accent-dim)",
                          borderRadius: "20px",
                          zIndex: 0,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <a
                      href={item.href}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: isActive ? "var(--text)" : "var(--text-sec)",
                        textDecoration: "none",
                        padding: "6px 14px",
                        display: "inline-block",
                        transition: "color 0.2s",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.label}
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
                className="resume-btn-modern"
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  backgroundColor: "var(--text)",
                  color: "var(--surface)",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "8px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                Resume
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
                  borderRadius: "100px",
                  border: "1px solid var(--border)",
                  background: "var(--surface-alt)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-sec)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                <Command size={12} />
                <span className="hidden-mobile">K</span>
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
              height: "2px",
              backgroundColor: "var(--accent)",
              width: progressBarWidth,
              transformOrigin: "left",
              boxShadow: "0 0 10px var(--accent)",
              zIndex: 10,
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
              background: "var(--surface)",
              borderLeft: "1px solid var(--border)",
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

        /* Resume Button Organic Fill */
        .resume-btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--accent-glow);
        }
        .resume-btn-modern:active {
          transform: scale(0.96);
        }

        /* CmdK Scanline */
        .cmd-btn:hover {
          border-color: var(--text-sec) !important;
          color: var(--text) !important;
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
