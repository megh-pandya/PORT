"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

export function useTextScramble(originalText: string) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayText, setDisplayText] = useState(originalText);

  useEffect(() => {
    // Check for reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!isInView) return;

    let frameId: number;
    const duration = 800; // ms
    let startTime: number | null = null;

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // We resolve characters left to right based on progress
      const resolvedCount = Math.floor(progress * originalText.length);

      let newText = "";
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === " ") {
          newText += " ";
        } else if (i < resolvedCount) {
          newText += originalText[i];
        } else {
          newText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(newText);

      if (progress < 1) {
        frameId = requestAnimationFrame(render);
      } else {
        setDisplayText(originalText); // Ensure final state is exact
      }
    };

    frameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, originalText]);

  return { ref, displayText };
}
