"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function ScrollTracker() {
  const [activeSection, setActiveSection] = useState("about");
  const { scrollYProgress } = useScroll();
  const [percentVal, setPercentVal] = useState(0);

  useEffect(() => {
    // 1. Monitor active section via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section occupies the center of screen
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

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    // 2. Track scroll percent value for clean rendering
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercentVal(Math.round(latest * 100));
    });

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div
      style={{
        position: "fixed",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        zIndex: 40,
        pointerEvents: "none",
      }}
      className="hidden-mobile"
    >
      {/* Scroll Depth Counter */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
        }}
      >
        <span>{String(percentVal).padStart(2, "0")}</span>
        <span style={{ height: "16px", width: "1px", background: "var(--border)" }} />
        <span>100</span>
      </div>

      {/* Vertical Section Indicator */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <div
              key={sec.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
                width: "48px",
                height: "16px",
              }}
            >
              {/* Text label revealed on active */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? -12 : 0,
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  letterSpacing: "0.05em",
                  position: "absolute",
                  right: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {sec.label}
              </motion.span>

              {/* Indicator Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.4 : 1,
                  backgroundColor: isActive ? "var(--accent)" : "var(--border-alt)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Styled css media query container helper */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
