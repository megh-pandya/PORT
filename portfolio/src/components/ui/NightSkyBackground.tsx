"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

// --- Types ---
interface Star {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  twinkleSpeed: number; // For sine wave
  twinkleOffset: number;
  color: string;
  isBig: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number; // in radians
  opacity: number;
  active: boolean;
}

interface AuroraBlob {
  x: number;
  y: number;
  r: number;
  color: string;
  phase: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  speedY: number;
  opacity: number;
}

export function NightSkyBackground() {
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

    // --- 1. Init Realistic Static Stars ---
    const NUM_STARS = 250;
    const stars: Star[] = [];
    const colors = ["#ffffff", "#e0f2fe", "#fef08a", "#ffedd5"]; // white, pale blue, pale yellow, pale orange
    for (let i = 0; i < NUM_STARS; i++) {
      const isBig = Math.random() < 0.05; // 5% chance of being a big bright star
      const isColored = Math.random() < 0.3;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: isBig ? Math.random() * 1.5 + 1.5 : Math.random() * 0.8 + 0.2, // Big: 1.5-3px, Small: 0.2-1.0px
        baseOpacity: isBig ? Math.random() * 0.4 + 0.6 : Math.random() * 0.5 + 0.1, // Big stars are brighter
        twinkleSpeed: (Math.random() * 0.005) + (isBig ? 0.001 : 0.002),
        twinkleOffset: Math.random() * Math.PI * 2,
        color: isColored ? colors[Math.floor(Math.random() * colors.length)] : "#ffffff",
        isBig,
      });
    }

    // --- 2. Init Shooting Star System ---
    let shootingStar: ShootingStar = {
      x: 0, y: 0, length: 0, speed: 0, angle: 0, opacity: 0, active: false
    };
    let nextShootingStarTime = performance.now() + (Math.random() * 4000 + 4000); // 4-8s

    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * width * 0.8, // upper half, mostly left/center
        y: Math.random() * (height * 0.4), // start in top 40%
        length: Math.random() * 150 + 150, // 150 to 300px long
        speed: Math.random() * 15 + 15, // fast
        angle: (Math.PI / 180) * (Math.random() * 30 + 30), // 30 to 60 degrees down-right
        opacity: 1,
        active: true
      };
      nextShootingStarTime = performance.now() + (Math.random() * 4000 + 4000);
    };

    // --- 3. Init Nebula/Aurora Blobs ---
    const blobs: AuroraBlob[] = [
      { x: width * 0.2, y: height * 0.2, r: Math.max(width, height) * 0.4, color: theme === "light" ? "196, 106, 61" : "13, 13, 43", phase: Math.random() * Math.PI * 2, speed: 0.0005 },
      { x: width * 0.8, y: height * 0.8, r: Math.max(width, height) * 0.45, color: theme === "light" ? "212, 132, 90" : "26, 26, 78", phase: Math.random() * Math.PI * 2, speed: 0.0003 },
      { x: width * 0.9, y: height * 0.4, r: Math.max(width, height) * 0.35, color: theme === "light" ? "233, 230, 223" : "30, 5, 51", phase: Math.random() * Math.PI * 2, speed: 0.0004 },
    ];

    // --- 4. Init Floating Particles ---
    const NUM_PARTICLES = 25;
    const particles: Particle[] = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 0.25 + 0.5, // 1px to 1.5px diameter
        speedY: (Math.random() * 0.3 + 0.1) * -1, // upward slow
        opacity: Math.random() * 0.2 + 0.2, // 0.2 to 0.4
      });
    }

    // --- Animation Loop ---
    let rafId: number;
    const render = (time: number) => {
      // Clear with atmospheric background depending on theme
      ctx.fillStyle = theme === "light" ? "#F5F3EE" : "#020204"; 
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Nebula Blobs (Background)
      blobs.forEach(blob => {
        blob.phase += blob.speed;
        const scale = 1 + Math.sin(blob.phase) * 0.08; // breathe 1 -> 1.08
        const currentR = blob.r * scale;
        
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, currentR);
        // opacity 0.06 to 0.12 roughly
        gradient.addColorStop(0, `rgba(${blob.color}, 0.12)`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, currentR, 0, Math.PI * 2);
        ctx.fill();
      });

      // 1. Draw Static Stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        // Map sine from [-1, 1] to [0.2, 1] multiplier
        const alphaMulti = (twinkle + 1) / 2 * 0.8 + 0.2; 
        const currentOpacity = star.baseOpacity * alphaMulti;
        
        ctx.globalAlpha = theme === "light" ? currentOpacity * 0.4 : currentOpacity;
        ctx.fillStyle = theme === "light" ? "#A8A29E" : star.color;
        
        // Draw the star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        // If it's a big star, draw a glowing halo to make it look "real" and prominent
        if (star.isBig) {
          ctx.globalAlpha = currentOpacity * 0.3;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0; // reset

      // 4. Draw Floating Particles
      particles.forEach(p => {
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = theme === "light" ? `rgba(168,162,158,${p.opacity})` : `rgba(255,255,255,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Shooting Star
      if (!shootingStar.active && time > nextShootingStarTime) {
        spawnShootingStar();
      }

      if (shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0) {
          shootingStar.active = false;
        } else {
          // Draw trail
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;
          
          const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
          const rColor = theme === "light" ? "196, 106, 61" : "255, 255, 255";
          grad.addColorStop(0, `rgba(${rColor}, ${shootingStar.opacity})`);
          grad.addColorStop(1, `rgba(${rColor}, 0)`);
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Draw head glow
          ctx.fillStyle = theme === "light" ? `rgba(196, 106, 61, ${shootingStar.opacity})` : `rgba(255, 255, 255, ${shootingStar.opacity})`;
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
          ctx.fill();
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
        position: "fixed",
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
