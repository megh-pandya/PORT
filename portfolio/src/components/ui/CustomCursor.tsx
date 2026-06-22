"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverState, setHoverState] = useState<"normal" | "hover" | "view" | "magnetic">("normal");
  const [isVisible, setIsVisible] = useState(false);

  // Base cursor position (raw mouse)
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Magnetic offset — how much the cursor is pulled toward an element
  const magOffsetX = useMotionValue(0);
  const magOffsetY = useMotionValue(0);

  // Smooth spring for the cursor following mouse
  const springConfig = { damping: 35, stiffness: 380, mass: 0.35 };
  const cursorSpringX = useSpring(mouseX, springConfig);
  const cursorSpringY = useSpring(mouseY, springConfig);

  // Smooth spring for the magnetic pull
  const magSpringX = useSpring(magOffsetX, { damping: 20, stiffness: 200, mass: 0.5 });
  const magSpringY = useSpring(magOffsetY, { damping: 20, stiffness: 200, mass: 0.5 });

  const activeElementRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // If hovering a magnetic element, compute offset toward its center
      if (activeElementRef.current) {
        const rect = activeElementRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const strength = 0.35;
        magOffsetX.set(-dx * strength);
        magOffsetY.set(-dy * strength);
      } else {
        magOffsetX.set(0);
        magOffsetY.set(0);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Project card hover → VIEW state
      const isProject =
        target.closest("[id^='dossier-']") || target.closest(".project-card");
      if (isProject) {
        setHoverState("view");
        activeElementRef.current = null;
        return;
      }

      // Magnetic elements (buttons, links with data-magnetic, MagneticButton)
      const magneticEl =
        target.closest("[data-magnetic]") ||
        target.closest("button") ||
        target.closest("a");

      if (magneticEl) {
        activeElementRef.current = magneticEl as HTMLElement;
        setHoverState("magnetic");
        return;
      }

      // Reset
      activeElementRef.current = null;
      magOffsetX.set(0);
      magOffsetY.set(0);
      setHoverState("normal");
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY, magOffsetX, magOffsetY, isVisible]);

  if (!mounted) return null;

  const isFinePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;
  if (!isFinePointer) return null;

  const getCursorSize = () => {
    switch (hoverState) {
      case "view":
        return { width: 72, height: 72 };
      case "magnetic":
        return { width: 44, height: 44 };
      case "normal":
      default:
        return { width: 8, height: 8 };
    }
  };

  const getCursorStyle = () => {
    switch (hoverState) {
      case "view":
        return {
          backgroundColor: "var(--accent)",
          borderColor: "var(--accent)",
          borderRadius: "50%",
        };
      case "magnetic":
        return {
          backgroundColor: "transparent",
          borderColor: "var(--accent)",
          // Squash to pill shape slightly
          borderRadius: "40%",
        };
      case "normal":
      default:
        return {
          backgroundColor: "var(--text)",
          borderColor: "var(--text)",
          borderRadius: "50%",
        };
    }
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorSpringX,
        y: cursorSpringY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 100000,
        border: "1.5px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        willChange: "transform, width, height",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      animate={{
        ...getCursorSize(),
        ...getCursorStyle(),
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.15 }}
    >
      {hoverState === "view" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: "var(--bg)",
          }}
        >
          VIEW
        </motion.span>
      )}
    </motion.div>
  );
}
