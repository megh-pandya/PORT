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

interface SunParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function SunsetBackground() {
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
    const NUM_CLOUDS = 6;
    const clouds: Cloud[] = [];
    for (let i = 0; i < NUM_CLOUDS; i++) {
      clouds.push({
        x: Math.random() * width,
        y: (Math.random() * height * 0.5) + height * 0.2, // lower half mostly
        width: Math.random() * 200 + 100,
        speed: (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
        opacity: Math.random() * 0.15 + 0.05,
        scale: Math.random() * 0.5 + 0.5,
      });
    }

    // --- Init Birds ---
    const NUM_BIRDS = 4;
    const birds: Bird[] = [];
    for (let i = 0; i < NUM_BIRDS; i++) {
      birds.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.4 + 50,
        speedX: Math.random() * 0.5 + 0.2,
        speedY: (Math.random() - 0.5) * 0.1,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: Math.random() * 0.05 + 0.05,
        scale: Math.random() * 0.4 + 0.2,
      });
    }

    // --- Init Ambient Particles ---
    const particles: SunParticle[] = [];
    const createParticle = () => {
      particles.push({
        x: Math.random() * width,
        y: height + 10,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        life: 0,
        maxLife: Math.random() * 400 + 200,
      });
    };
    for (let i = 0; i < 30; i++) createParticle();

    // --- Animation Loop ---
    let rafId: number;
    let time = 0;

    const render = () => {
      time += 0.01;

      // 1. Draw Sunset Gradient Sky
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      // Premium dark sunset palette
      gradient.addColorStop(0, "#1a0b1c"); // deep dark purple
      gradient.addColorStop(0.4, "#3a1327"); // rich maroon/purple
      gradient.addColorStop(0.7, "#7d2935"); // warm dark red
      gradient.addColorStop(1, "#c44933");   // glowing orange/red at bottom

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw The Sun (Glowing Orb)
      const sunX = width * 0.5;
      const sunY = height * 0.75 + Math.sin(time) * 15; // slow bobbing
      const sunRadius = Math.min(width, height) * 0.25;

      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2.5);
      sunGlow.addColorStop(0, "rgba(255, 170, 80, 0.6)");
      sunGlow.addColorStop(0.3, "rgba(255, 100, 50, 0.3)");
      sunGlow.addColorStop(1, "rgba(200, 50, 50, 0)");

      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Core Sun
      ctx.fillStyle = "#ffcc80";
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Ambient Particles (rising heat/dust)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        // fade out near end of life
        let currentOpacity = p.opacity;
        if (p.life > p.maxLife * 0.8) {
          currentOpacity = p.opacity * (1 - (p.life - p.maxLife * 0.8) / (p.maxLife * 0.2));
        }

        ctx.fillStyle = `rgba(255, 200, 100, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10) {
          particles.splice(i, 1);
          createParticle();
        }
      }

      // 4. Draw Clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > width + cloud.width) cloud.x = -cloud.width;
        if (cloud.x < -cloud.width) cloud.x = width + cloud.width;

        ctx.save();
        ctx.translate(cloud.x, cloud.y);
        ctx.scale(cloud.scale, cloud.scale * 0.4); // flatten clouds

        const cloudGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, cloud.width);
        cloudGrad.addColorStop(0, `rgba(180, 50, 80, ${cloud.opacity})`);
        cloudGrad.addColorStop(1, `rgba(180, 50, 80, 0)`);

        ctx.fillStyle = cloudGrad;
        ctx.beginPath();
        ctx.arc(0, 0, cloud.width, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. Draw Birds
      ctx.fillStyle = "rgba(20, 5, 10, 0.85)"; // very dark silhouette
      birds.forEach((bird) => {
        bird.x += bird.speedX;
        bird.y += bird.speedY;
        bird.wingPhase += bird.wingSpeed;

        if (bird.x > width + 50) bird.x = -50;

        ctx.save();
        ctx.translate(bird.x, bird.y);
        ctx.scale(bird.scale, bird.scale);

        // Simple bird shape (V shape)
        const wingY = Math.sin(bird.wingPhase) * 15;
        
        ctx.beginPath();
        ctx.moveTo(0, 0); // beak
        ctx.quadraticCurveTo(-10, wingY, -20, wingY - 10); // left wing tip
        ctx.quadraticCurveTo(-15, 5, -5, 5); // left wing bottom
        ctx.lineTo(-25, 15); // tail
        ctx.lineTo(-5, 8); // tail right
        ctx.quadraticCurveTo(-15, 5, -20, wingY - 10); // right wing tip mirrored
        // wait, simple V is better
        ctx.restore();

        // Let's just draw a simple V stroke
        ctx.save();
        ctx.translate(bird.x, bird.y);
        ctx.scale(bird.scale, bird.scale);
        ctx.strokeStyle = "rgba(20, 5, 10, 0.6)";
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
