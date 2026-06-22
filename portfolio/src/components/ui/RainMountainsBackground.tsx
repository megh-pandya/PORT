"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speedY: number;
  speedX: number;
  opacity: number;
  thickness: number;
}

export function RainMountainsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
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

    // --- Load Mountains Image ---
    const img = new Image();
    img.src = "/mountains.png";
    let imageLoaded = false;
    img.onload = () => {
      imageLoaded = true;
    };

    // --- Init Rain Particles ---
    const NUM_RAINDROPS = 250;
    const raindrops: RainDrop[] = [];
    const createRaindrop = (initY = false) => {
      return {
        x: Math.random() * width * 1.5 - width * 0.25, // allow starting off screen to account for wind
        y: initY ? Math.random() * height : -50,
        length: Math.random() * 25 + 15, // 15-40px long
        speedY: Math.random() * 15 + 20, // fast falling
        speedX: Math.random() * 3 + 2, // wind blowing to the right
        opacity: Math.random() * 0.3 + 0.1,
        thickness: Math.random() * 1.5 + 0.5,
      };
    };

    for (let i = 0; i < NUM_RAINDROPS; i++) {
      raindrops.push(createRaindrop(true));
    }

    // --- Animation Loop ---
    let rafId: number;
    let time = 0;

    const render = () => {
      time += 0.02;

      // 1. Clear Background
      ctx.fillStyle = theme === "light" ? "#E9E6DF" : "#05070a"; // stormy day/night
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // 2. Draw Mountains Image
      if (imageLoaded) {
        const scale = Math.max(width / img.width, height / img.height);
        const finalScale = scale * 1.05; 
        
        const targetWidth = img.width * finalScale;
        const targetHeight = img.height * finalScale;
        
        const drawX = centerX - targetWidth * 0.5;
        const drawY = centerY - targetHeight * 0.5;

        // Subtle pan/breathe
        const hoverX = Math.cos(time * 0.3) * (targetWidth * 0.015);
        const hoverY = Math.sin(time * 0.2) * (targetHeight * 0.015);

        ctx.drawImage(img, drawX + hoverX, drawY + hoverY, targetWidth, targetHeight);

        // Moody Vignette
        const vignetteGrad = ctx.createRadialGradient(
          centerX, centerY, Math.max(width, height) * 0.2, 
          centerX, centerY, Math.max(width, height) * 0.7
        );
        const rColor = theme === "light" ? "233, 230, 223" : "5, 7, 10"; // Match surface-alt
        vignetteGrad.addColorStop(0, `rgba(${rColor}, 0)`);
        vignetteGrad.addColorStop(1, `rgba(${rColor}, 0.7)`);

        ctx.fillStyle = vignetteGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Lightning Flashes (Random)
      if (Math.random() < 0.005) {
        ctx.fillStyle = theme === "light" ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Draw Raindrops
      ctx.lineCap = "round";
      for (let i = raindrops.length - 1; i >= 0; i--) {
        const drop = raindrops[i];
        
        drop.x += drop.speedX;
        drop.y += drop.speedY;

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.speedX * 0.5, drop.y - drop.length);
        
        ctx.strokeStyle = theme === "light" ? `rgba(100, 120, 150, ${drop.opacity})` : `rgba(200, 220, 255, ${drop.opacity})`;
        ctx.lineWidth = drop.thickness;
        ctx.stroke();

        // Reset drop if it hits bottom
        if (drop.y > height + drop.length) {
          raindrops[i] = createRaindrop(false);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
