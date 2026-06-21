"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverState, setHoverState] = useState<"normal" | "hover" | "view">("normal");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Event Delegation to detect hover types
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // 1. Check if hovering inside a project dossier block
      const isProject = target.closest("[id^='dossier-']") || target.closest(".project-card");
      if (isProject) {
        setHoverState("view");
        return;
      }

      // 2. Check if hovering generic interactive controls
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[role='button']") ||
        target.closest("#cmd-palette-trigger");

      if (isInteractive) {
        setHoverState("hover");
      } else {
        setHoverState("normal");
      }
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
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  // Only render on devices with fine pointer (mouse/trackpad)
  const isFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  if (!isFinePointer) return null;

  const getCursorVariants = () => {
    switch (hoverState) {
      case "view":
        return {
          width: 72,
          height: 72,
          backgroundColor: "var(--accent)",
          borderColor: "var(--accent)",
          color: "var(--bg)",
        };
      case "hover":
        return {
          width: 38,
          height: 38,
          backgroundColor: "transparent",
          borderColor: "var(--accent)",
          color: "transparent",
        };
      case "normal":
      default:
        return {
          width: 8,
          height: 8,
          backgroundColor: "var(--text)",
          borderColor: "var(--text)",
          color: "transparent",
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
        borderRadius: "50%",
        border: "1px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        mixBlendMode: "normal",
        willChange: "transform, width, height",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      animate={getCursorVariants()}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.2 }}
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
