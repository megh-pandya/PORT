"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [isMobile, setIsMobile] = useState(true); // default true to prevent hydration mismatch

  // Cursor state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring values for the ring
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  // Hover state for interactive elements
  const [isHovered, setIsHovered] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);

    const checkMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", checkMobile);

    return () => mq.removeEventListener("change", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.cursor = "auto";
      return;
    }

    document.body.style.cursor = "none"; // Hide default cursor globally

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find closest interactive element
      const interactive = target.closest("a, button, [role='button'], input, select, textarea, .project-card");
      if (interactive) {
        setIsHovered(true);
        setTargetRect(interactive.getBoundingClientRect());
      } else {
        setIsHovered(false);
        setTargetRect(null);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    // Track scroll to update target rect if hovering
    const onScroll = () => {
      if (isHovered) {
        // Simple way: just remove hover state on scroll to avoid complex rect recalculations
        setIsHovered(false);
        setTargetRect(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobile, mouseX, mouseY, isHovered]);

  if (isMobile) return null;

  return (
    <>
      {/* The Dot (Instant) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: isHovered ? "var(--accent)" : "#ffffff",
          pointerEvents: "none",
          zIndex: 999999,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference", // Ensures visibility on light backgrounds if any
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* The Ring (Spring) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 999998,
          // If hovered, snap to rect. If not, follow ringX/ringY springs.
          x: isHovered && targetRect ? targetRect.left : ringX,
          y: isHovered && targetRect ? targetRect.top : ringY,
          width: isHovered && targetRect ? targetRect.width : 40,
          height: isHovered && targetRect ? targetRect.height : 40,
          borderRadius: isHovered && targetRect ? 8 : "50%",
          border: `1.5px solid ${isHovered ? "var(--accent)" : "rgba(255, 255, 255, 0.15)"}`,
          backgroundColor: isHovered ? "rgba(196,106,61,0.05)" : "transparent",
          // When not hovered, center the ring on the cursor
          translateX: isHovered ? 0 : "-50%",
          translateY: isHovered ? 0 : "-50%",
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
      
      <style>{`
        /* Hide cursor on all elements when magnetic cursor is active */
        @media (min-width: 769px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
