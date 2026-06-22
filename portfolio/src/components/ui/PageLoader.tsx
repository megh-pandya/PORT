"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilmGrain } from "@/components/ui/FilmGrain";

const SESSION_KEY = "portfolio_intro_seen_v4";

export function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "complete" | "revealing" | "done">("loading");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem(SESSION_KEY);
      if (seen === "1") {
        setSkip(true);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
      }
    }
  }, []);

  // Prevent scroll during loader
  useEffect(() => {
    if (skip || !mounted || phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skip, mounted, phase]);

  // Loading sequence
  useEffect(() => {
    if (skip || !mounted) return;
    
    let current = 0;
    // Smoother, slightly longer progression for a premium feel
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("complete"), 200);
      }
      setProgress(current);
    }, 30);

    return () => clearInterval(interval);
  }, [mounted, skip]);

  // Transition out
  useEffect(() => {
    if (phase === "complete") {
      const timer = setTimeout(() => {
        setPhase("revealing");
      }, 1600); // Show name for 1.6s
      return () => clearTimeout(timer);
    }
    
    if (phase === "revealing") {
      const timer = setTimeout(() => {
        setPhase("done");
      }, 1200); // Wait for reveal animation to finish
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!mounted || skip) return null;

  // The expanding circle reveal logic:
  // We want the dark loader screen to *shrink* into a dot and disappear,
  // or use a mask to open a hole.
  // Using an expanding hole mask is very premium.
  const maskSize = phase === "revealing" ? "150vw" : "0px";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#0A0A0F", // Dark surface color
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            // Use CSS mask to animate an expanding transparent circle
            maskImage: `radial-gradient(circle at center, transparent ${maskSize}, black ${maskSize})`,
            WebkitMaskImage: `radial-gradient(circle at center, transparent ${maskSize}, black ${maskSize})`,
            transition: "mask-image 1.2s cubic-bezier(0.76, 0, 0.24, 1), -webkit-mask-image 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          <FilmGrain />

          {/* Corner Decals */}
          <div style={{ position: "absolute", top: 24, left: 24, fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-sec)", letterSpacing: "0.1em" }}>SYS.BOOT</div>
          <div style={{ position: "absolute", bottom: 24, right: 24, fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-sec)", letterSpacing: "0.1em" }}>V_0.1.0</div>

          {/* Content Container */}
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            <AnimatePresence mode="wait">
              {phase === "loading" ? (
                <motion.div
                  key="counter"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(64px, 12vw, 160px)",
                    fontWeight: 200,
                    color: "var(--text)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {progress.toString().padStart(3, "0")}
                  <span style={{ fontSize: "0.5em", verticalAlign: "top", color: "var(--accent)" }}>%</span>
                </motion.div>
              ) : (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
                >
                  <h1
                    className="font-serif"
                    style={{
                      fontSize: "clamp(42px, 8vw, 84px)",
                      color: "var(--text)",
                      margin: 0,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    Megh Pandya
                  </h1>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: "1px", backgroundColor: "var(--accent)" }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: "var(--text-sec)",
                      letterSpacing: "0.3em",
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    Creative Developer
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          
          {/* Circular Progress Indicator behind text */}
          <motion.svg
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              width: "clamp(200px, 40vw, 400px)",
              height: "clamp(200px, 40vw, 400px)",
              pointerEvents: "none",
              opacity: phase === "loading" ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="301.59" // 2 * pi * 48
              initial={{ strokeDashoffset: 301.59 }}
              animate={{ strokeDashoffset: 301.59 - (301.59 * progress) / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
