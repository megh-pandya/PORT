"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear progress count-up for natural feel
      const increment = Math.max(1, Math.floor(Math.random() * 8));
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "";
        }, 600);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 24px",
            boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Subtle line layout */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "20%",
              width: "1px",
              background: "var(--border)",
              opacity: 0.15,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "80%",
              width: "1px",
              background: "var(--border)",
              opacity: 0.15,
            }}
          />

          {/* Top Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span>MEGH.DEV</span>
            <span>Est. 2026</span>
          </div>

          {/* Middle Row: Progress Counter */}
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(36px, 8vw, 84px)",
                lineHeight: 0.95,
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              Welcome to the
              <br />
              Portfolio of
              <br />
              <em style={{ color: "var(--accent)" }}>Megh Pandya.</em>
            </h1>

            {/* Progress line */}
            <div
              style={{
                width: "100%",
                maxWidth: "480px",
                height: "1px",
                background: "var(--border)",
                position: "relative",
                marginBottom: "16px",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  backgroundColor: "var(--accent)",
                  position: "absolute",
                  left: 0,
                  top: 0,
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>

            {/* Percentage counter */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "var(--text-sec)",
                letterSpacing: "0.1em",
              }}
            >
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          {/* Bottom Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            <span>Status: Booting Services...</span>
            <span>[Next.js Production Ready]</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
