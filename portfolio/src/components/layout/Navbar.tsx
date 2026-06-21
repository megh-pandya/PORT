"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { navItems } from "@/data/portfolio";
import { Menu, X, Command } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
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

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          paddingTop: "24px",
          pointerEvents: "none",
        }}
      >
        <motion.header
          initial={false}
          animate={{
            width: isScrolled ? "100%" : "calc(100% - 48px)",
            maxWidth: isScrolled ? "100%" : "900px",
            y: isScrolled ? -24 : 0,
            borderRadius: isScrolled ? "0px" : "16px",
            backgroundColor: isScrolled ? "var(--bg)" : "var(--surface)",
            borderColor: isScrolled ? "transparent" : "var(--border)",
            borderBottomColor: isScrolled ? "var(--border)" : "var(--border)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            height: "60px",
            border: "1px solid",
            padding: "0 24px",
            boxShadow: isScrolled
              ? "0 4px 20px rgba(0,0,0,0.03)"
              : "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <a
              href="#about"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text)",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
              onClick={() => setIsOpen(false)}
            >
              megh
              <span style={{ color: "var(--accent)" }}>.</span>
            </a>

            {/* Desktop Nav */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              aria-label="Main navigation"
              className="hidden-mobile"
            >
              {navItems.map((item) => {
                const isActive = item.href === `#${activeSection}`;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "5px",
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--accent)" : "var(--text-sec)",
                      background: isActive ? "var(--accent-dim)" : "transparent",
                      textDecoration: "none",
                      transition: "all 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
                      letterSpacing: "0.01em",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "var(--text)";
                        (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-sec)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Right: Theme, Cmd Palette pill + Mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ThemeToggle />

              <button
                onClick={onOpenCommandPalette}
                id="cmd-palette-trigger"
                aria-label="Open command palette"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "1px solid var(--border)",
                  background: "var(--surface-alt)",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-sec)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-sec)";
                }}
              >
                <Command size={11} />
                <span className="hidden-mobile">K</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                className="hidden-desktop"
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
                  borderRadius: "5px",
                  border: "1px solid var(--border)",
                  background: "var(--surface-alt)",
                  cursor: "pointer",
                  color: "var(--text)",
                }}
              >
                {isOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </motion.header>
      </motion.div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
              right: 0,
              background: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              padding: "12px 24px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              zIndex: 40,
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "15px",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontWeight: 400,
                }}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 640px) {
          .hidden-mobile { display: flex !important; }
          .hidden-desktop { display: none !important; }
        }
        @media (max-width: 639px) {
          .hidden-mobile { display: none !important; }
          .hidden-desktop { display: flex !important; }
        }
      `}</style>
    </>
  );
}
