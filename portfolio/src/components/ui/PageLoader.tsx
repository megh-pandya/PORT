"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { RainMountainsBackground } from "@/components/ui/RainMountainsBackground";

// --- Constants ---
const INTRO_TEXT = "Welcome to the portfolio of Megh Pandya.";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&";
const SESSION_KEY = "portfolio_intro_seen_v2";

type Phase = "scrambling" | "hold" | "shattering" | "done";

interface ScrambleChar {
  id: number;
  targetChar: string;
  isSpace: boolean;
  shatterTx: number;
  shatterTy: number;
  shatterRot: number;
}

export function PageLoader() {
  const [phase, setPhase] = useState<Phase>("scrambling");
  const [mounted, setMounted] = useState(false);
  const [skip, setSkip] = useState(false);
  
  const [displayedText, setDisplayedText] = useState<string[]>(Array(INTRO_TEXT.length).fill(""));
  const [cursorState, setCursorState] = useState<"blinking" | "solid" | "hidden">("hidden");
  const [showCorners, setShowCorners] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Pre-calculate target chars and shatter physics
  const charData = useRef<ScrambleChar[]>([]);
  
  useEffect(() => {
    charData.current = INTRO_TEXT.split("").map((char, i) => ({
      id: i,
      targetChar: char,
      isSpace: char === " ",
      shatterTx: (Math.random() - 0.5) * 800,
      shatterTy: (Math.random() - 0.5) * 800,
      shatterRot: (Math.random() - 0.5) * 360,
    }));
  }, []);

  // Check Session
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

  // Prevent scrolling during intro
  useEffect(() => {
    if (skip || !mounted || phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skip, mounted, phase]);

  // Phase 1: Scramble Reveal
  useEffect(() => {
    if (skip || !mounted) return;
    if (phase !== "scrambling") return;

    // Delay start slightly to allow video to start playing
    const timer = setTimeout(() => {
      let activeIndices = new Set<number>();
      let resolvedIndices = new Set<number>();
      
      const updateInterval = setInterval(() => {
        setDisplayedText(prev => {
          const next = [...prev];
          for (let i = 0; i < INTRO_TEXT.length; i++) {
            if (resolvedIndices.has(i)) continue;
            if (activeIndices.has(i)) {
              next[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }
          }
          return next;
        });
      }, 30);

      // Trigger letters stagger
      INTRO_TEXT.split("").forEach((char, i) => {
        setTimeout(() => {
          activeIndices.add(i);
          // Resolve after 120ms
          setTimeout(() => {
            activeIndices.delete(i);
            resolvedIndices.add(i);
            setDisplayedText(prev => {
              const next = [...prev];
              next[i] = char;
              return next;
            });

            // If last character resolved
            if (i === INTRO_TEXT.length - 1) {
              clearInterval(updateInterval);
              setCursorState("blinking");
              
              // Blinks 3 times then solid
              setTimeout(() => setCursorState("solid"), 1500);
              
              // Show corners
              setTimeout(() => setShowCorners(true), 400);

              // Transition to hold
              setTimeout(() => {
                setPhase("hold");
                setShowPrompt(true);
              }, 800);
            }
          }, 120);
        }, i * 40);
      });
      
    }, 300);

    return () => clearTimeout(timer);
  }, [phase, skip, mounted]);

  // Phase 2 -> 3: Keypress / Tap Listener
  useEffect(() => {
    if (phase !== "hold") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setPhase("shattering");
        setShowPrompt(false);
        setShowCorners(false);
        setCursorState("hidden");
        setTimeout(() => {
          setPhase("done");
        }, 900); // 300ms overlay fade + buffer
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase]);

  if (!mounted || skip || phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="landing-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "15vh",
          overflow: "hidden",
        }}
      >
        {/* Rain Mountains Background (Fades out when shattering) */}
        <motion.div
          animate={{ opacity: phase === "shattering" ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            position: "absolute", 
            inset: 0, 
            zIndex: 0,
            background: "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4))" // subtle dark overlay so text is readable
          }}
        >
          <RainMountainsBackground />
        </motion.div>

        {/* Corner Details */}
        <AnimatePresence>
          {showCorners && (
            <>
              {/* Top Left */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#fff",
                  letterSpacing: "0.1em",
                  zIndex: 2,
                }}
              >
                23.0225° N, 72.5714° E
              </motion.div>
              
              {/* Bottom Left */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#fff",
                  letterSpacing: "0.1em",
                  zIndex: 2,
                }}
              >
                EST. 2026
              </motion.div>

              {/* Bottom Right */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: "24px",
                  right: "24px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#fff",
                  letterSpacing: "0.1em",
                  zIndex: 2,
                }}
              >
                MEGH.DEV
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Text */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "clamp(24px, 4vw, 42px)",
            color: "#ffffff",
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "900px",
            padding: "0 24px",
            lineHeight: 1.4,
          }}
        >
          {charData.current.map((data, i) => {
            const isShattering = phase === "shattering";
            return (
              <motion.span
                key={data.id}
                animate={
                  isShattering
                    ? {
                        x: data.shatterTx,
                        y: data.shatterTy,
                        rotate: data.shatterRot,
                        opacity: 0,
                        scale: 0.2,
                      }
                    : { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }
                }
                transition={
                  isShattering
                    ? {
                        duration: 0.6,
                        ease: [0.19, 1, 0.22, 1], // fast out
                      }
                    : { duration: 0 }
                }
                style={{
                  display: "inline-block",
                  whiteSpace: data.isSpace ? "pre" : "normal",
                  minWidth: data.isSpace ? "0.3em" : "auto",
                }}
              >
                {displayedText[i]}
              </motion.span>
            );
          })}
          
          {/* Cursor */}
          {cursorState !== "hidden" && !dataIsShattering() && (
            <motion.span
              animate={cursorState === "blinking" ? { opacity: [1, 0, 1] } : { opacity: 1 }}
              transition={cursorState === "blinking" ? { duration: 0.5, repeat: Infinity } : {}}
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.1em",
                backgroundColor: "#fff",
                marginLeft: "4px",
                verticalAlign: "text-bottom",
              }}
            />
          )}
        </div>

        {/* Prompt */}
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                bottom: "15%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                zIndex: 2,
              }}
            >
              {/* Press Enter Prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ marginTop: "40px" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    color: "var(--text-sec)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                >
                  - press Enter to proceed -
                </p>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={16} color="#ffffff" opacity={0.5} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );

  function dataIsShattering() {
    return phase === "shattering";
  }
}
