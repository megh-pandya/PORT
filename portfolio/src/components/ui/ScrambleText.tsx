"use client";

import React, { useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>/\\|[]{}";

interface ScrambleTextProps {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export function ScrambleText({
  text,
  as: Tag = "span",
  className,
  style,
  duration = 800,
  delay = 0,
  once = true,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [hasPlayed, setHasPlayed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasPlayed) return;
            timeoutRef.current = setTimeout(() => runScramble(), delay);
            if (once) observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
      clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, once, hasPlayed]);

  const runScramble = () => {
    setHasPlayed(true);
    const chars = text.split("");
    const total = chars.length;
    const startTime = performance.now();
    const charDuration = duration / total;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const resolved = Math.min(total, Math.floor(elapsed / charDuration));

      const result = chars.map((char, i) => {
        if (char === " ") return " ";
        if (i < resolved) return char;
        return CHARSET[Math.floor(Math.random() * CHARSET.length)];
      });

      setDisplayed(result.join(""));

      if (resolved < total) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  const DynTag = Tag as React.ElementType;

  return (
    <DynTag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={className}
      style={{ ...style, fontVariantNumeric: "tabular-nums" }}
    >
      {displayed}
    </DynTag>
  );
}
