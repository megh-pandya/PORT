"use client";

import React, { useEffect, useRef, useState } from "react";

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);

    const checkMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", checkMobile);

    return () => mq.removeEventListener("change", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    let rafId: number;
    let frameCount = 0;

    const render = () => {
      // Regenerate every 2 frames for a classic analog film feel
      if (frameCount % 2 === 0) {
        // Draw noise
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          // Monochrome noise
          const val = Math.random() * 255;
          data[i] = val;     // red
          data[i + 1] = val; // green
          data[i + 2] = val; // blue
          data[i + 3] = 255; // alpha (opaque here, canvas is transparent)
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      frameCount++;
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.035,
        mixBlendMode: "screen", // gives it a nice light grain look over dark bg
      }}
      aria-hidden="true"
    />
  );
}
