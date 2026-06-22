"use client";

import React, { useEffect, useRef } from "react";

interface Cloud {
  x: number;
  y: number;
  width: number;
  speed: number;
  opacity: number;
  scale: number;
}

interface Bird {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  wingPhase: number;
  wingSpeed: number;
  scale: number;
}

export function SunriseBackground() {
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

    // --- Init Clouds ---
    const NUM_CLOUDS = 8;
    const clouds: Cloud[] = [];
    for (let i = 0; i < NUM_CLOUDS; i++) {
      clouds.push({
        x: Math.random() * width,
        y: (Math.random() * height * 0.4) + height * 0.1, // upper half mostly
        width: Math.random() * 200 + 150,
        speed: (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
        opacity: Math.random() * 0.15 + 0.05,
        scale: Math.random() * 0.5 + 0.5,
      });
    }

    // --- Init Birds ---
    const NUM_BIRDS = 6;
    const birds: Bird[] = [];
    for (let i = 0; i < NUM_BIRDS; i++) {
      birds.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.3 + 50,
        speedX: Math.random() * 0.8 + 0.3,
        speedY: (Math.random() - 0.5) * 0.15,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: Math.random() * 0.08 + 0.06,
        scale: Math.random() * 0.4 + 0.2,
      });
    }

    // --- Animation Loop ---
    let rafId: number;
    let time = 0;

    const render = () => {
      time += 0.005; // animation speed

      // 1. Draw Sunrise Gradient Sky
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      // Beautiful warm sunrise palette
      gradient.addColorStop(0, "#2c1b4d"); // deep purple at top
      gradient.addColorStop(0.3, "#722d65"); // magenta/pink
      gradient.addColorStop(0.6, "#b64b59"); // warm coral
      gradient.addColorStop(1, "#f49d4f");   // bright sunrise orange/gold at bottom

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw The Rising Sun (Glowing Orb)
      const sunX = width * 0.5;
      // Sun starts below the screen and rises to 40% height over time
      const targetSunY = height * 0.4;
      const startSunY = height + 200;
      // smooth rise
      const sunProgress = Math.min(time * 0.5, 1); 
      // easing out quint
      const easeOut = 1 - Math.pow(1 - sunProgress, 5);
      const sunY = startSunY - (startSunY - targetSunY) * easeOut + Math.sin(time * 2) * 5; 
      
      const sunRadius = Math.min(width, height) * 0.35;

      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2.5);
      sunGlow.addColorStop(0, "rgba(255, 230, 150, 0.7)");
      sunGlow.addColorStop(0.3, "rgba(255, 180, 80, 0.3)");
      sunGlow.addColorStop(1, "rgba(255, 100, 50, 0)");

      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Core Sun
      ctx.fillStyle = "#fff4d4";
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > width + cloud.width) cloud.x = -cloud.width;
        if (cloud.x < -cloud.width) cloud.x = width + cloud.width;

        ctx.save();
        ctx.translate(cloud.x, cloud.y);
        ctx.scale(cloud.scale, cloud.scale * 0.4); // flatten clouds

        const cloudGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, cloud.width);
        // Pinkish clouds catching the sunrise light
        cloudGrad.addColorStop(0, `rgba(255, 150, 150, ${cloud.opacity})`);
        cloudGrad.addColorStop(1, `rgba(255, 150, 150, 0)`);

        ctx.fillStyle = cloudGrad;
        ctx.beginPath();
        ctx.arc(0, 0, cloud.width, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Draw Birds
      ctx.fillStyle = "rgba(40, 15, 30, 0.85)"; // dark silhouette against bright sun
      birds.forEach((bird) => {
        bird.x += bird.speedX;
        bird.y += bird.speedY;
        bird.wingPhase += bird.wingSpeed;

        if (bird.x > width + 50) bird.x = -50;

        ctx.save();
        ctx.translate(bird.x, bird.y);
        ctx.scale(bird.scale, bird.scale);

        const wingY = Math.sin(bird.wingPhase) * 15;
        
        ctx.strokeStyle = "rgba(40, 15, 30, 0.7)";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(-15, wingY - 10);
        ctx.quadraticCurveTo(-5, 0, 0, 5); // center body
        ctx.quadraticCurveTo(5, 0, 15, wingY - 10);
        ctx.stroke();

        ctx.restore();
      });

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
