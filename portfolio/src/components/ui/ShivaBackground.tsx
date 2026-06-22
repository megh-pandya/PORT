"use client";

import React, { useEffect, useRef } from "react";

interface AshParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  life: number;
  maxLife: number;
  wobble: number;
  wobbleSpeed: number;
}

export function ShivaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // --- Load Shiva Landscape Image ---
    const img = new Image();
    img.src = "/shiva_landscape.png";
    let imageLoaded = false;
    img.onload = () => {
      imageLoaded = true;
    };

    // --- Init Ash Particles (Bhasma) ---
    const particles: AshParticle[] = [];
    const createParticle = () => {
      particles.push({
        x: Math.random() * width,
        y: height + 10,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 1.0 + 0.5), // drifting up
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        life: 0,
        maxLife: Math.random() * 300 + 150,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
      });
    };
    for (let i = 0; i < 60; i++) {
      createParticle();
      particles[i].y = Math.random() * height; // scatter initially
    }

    // --- Animation Loop ---
    let rafId: number;
    let time = 0;

    const render = () => {
      time += 0.02;

      // 1. Clear Background
      ctx.fillStyle = "#020204"; // pure dark void
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // 2. Draw Full Screen Shiva Landscape Image
      if (imageLoaded) {
        // Calculate size to cover the entire screen (object-fit: cover)
        const scale = Math.max(width / img.width, height / img.height);
        // Make it slightly larger than needed so we can pan/hover it
        const finalScale = scale * 1.05; 
        
        const targetWidth = img.width * finalScale;
        const targetHeight = img.height * finalScale;
        
        // Center the image
        const drawX = centerX - targetWidth * 0.5;
        const drawY = centerY - targetHeight * 0.5;

        // Subtle camera pan/breathing effect
        const hoverX = Math.cos(time * 0.2) * (targetWidth * 0.02);
        const hoverY = Math.sin(time * 0.3) * (targetHeight * 0.02);

        ctx.drawImage(img, drawX + hoverX, drawY + hoverY, targetWidth, targetHeight);

        // Subtle vignette to darken the edges to ensure text legibility
        const vignetteGrad = ctx.createRadialGradient(
          centerX, centerY, Math.max(width, height) * 0.3, 
          centerX, centerY, Math.max(width, height) * 0.7
        );
        vignetteGrad.addColorStop(0, "rgba(2, 2, 4, 0)");
        vignetteGrad.addColorStop(1, "rgba(2, 2, 4, 0.6)"); // Darken edges

        ctx.fillStyle = vignetteGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Draw Floating Ash Particles (Bhasma)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.5; // slight horizontal wave
        p.y += p.speedY;
        p.life++;

        // fade out near end of life
        let currentOpacity = p.opacity;
        if (p.life > p.maxLife * 0.7) {
          currentOpacity = p.opacity * (1 - (p.life - p.maxLife * 0.7) / (p.maxLife * 0.3));
        }

        // Draw glowing ash
        const ashGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        // A magical teal/purple mix for the ash to match the landscape
        ashGrad.addColorStop(0, `rgba(167, 139, 250, ${currentOpacity})`); // pale purple center
        ashGrad.addColorStop(1, `rgba(45, 212, 191, 0)`); // teal edges

        ctx.fillStyle = ashGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -50) {
          particles.splice(i, 1);
          createParticle();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

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
