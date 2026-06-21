"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FocusSectionProps {
  children: React.ReactNode;
}

export function FocusSection({ children }: FocusSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Breathing layout: content scales down slightly and fades when far from center viewport
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        willChange: "transform, opacity",
      }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
}
