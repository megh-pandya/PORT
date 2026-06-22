"use client";

import React from "react";
import { useTextScramble } from "@/hooks/useTextScramble";

interface ScrambledHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function ScrambledHeading({ text, className, style, as: Component = "h2" }: ScrambledHeadingProps) {
  const { ref, displayText } = useTextScramble(text);

  return (
    <Component
      ref={ref as any}
      className={className}
      style={style}
    >
      {displayText}
    </Component>
  );
}
