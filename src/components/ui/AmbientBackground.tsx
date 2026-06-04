"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkle: number;
  speed: number;
  driftX: number;
  driftY: number;
  gold: boolean;
};

type Dust = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
};

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let time = 0;

    let stars: Star[] = [];
    let dust: Dust[] = [];

    const createScene = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      stars = [];
      dust = [];

      const starCount = width < 520 ? 95 : 140;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.4 + 0.35,
          opacity: Math.random() * 0.75 + 0.12,
          twinkle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.018 + 0.004,
          driftX: (Math.random() - 0.5) * 0.018,
          driftY: (Math.random() - 0.5) * 0.012,
          gold: Math.random() > 0.93,
        });
      }

      for (let i = 0; i < 34; i++) {
        dust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.8 + 0.8,
          opacity: Math.random() * 0.055 + 0.018,
          speedX: (Math.random() - 0.5) * 0.045,
          speedY: (Math.random() - 0.5) * 0.035,
        });
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createScene();
    };

    const render = () => {
      time += 0.008;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#111827");
      bg.addColorStop(0.42, "#090D18");
      bg.addColorStop(1, "#050816");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const glowPulse = 0.08 + Math.sin(time * 0.8) * 0.025;

      const goldGlow = ctx.createRadialGradient(
        width * (0.48 + Math.sin(time * 0.22) * 0.03),
        height * (0.08 + Math.cos(time * 0.18) * 0.03),
        0,
        width * 0.5,
        height * 0.08,
        width * 0.75,
      );

      goldGlow.addColorStop(0, `rgba(214,179,106,${glowPulse})`);
      goldGlow.addColorStop(0.38, "rgba(214,179,106,0.04)");
      goldGlow.addColorStop(1, "rgba(214,179,106,0)");

      ctx.fillStyle = goldGlow;
      ctx.fillRect(0, 0, width, height);

      const blueGlow = ctx.createRadialGradient(
        width * (0.08 + Math.sin(time * 0.16) * 0.04),
        height * (0.24 + Math.cos(time * 0.14) * 0.03),
        0,
        width * 0.08,
        height * 0.24,
        width * 0.75,
      );

      blueGlow.addColorStop(0, "rgba(88,111,255,0.075)");
      blueGlow.addColorStop(1, "rgba(88,111,255,0)");

      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.twinkle += star.speed;
        star.x += star.driftX;
        star.y += star.driftY;

        if (star.x < -5) star.x = width + 5;
        if (star.x > width + 5) star.x = -5;
        if (star.y < -5) star.y = height + 5;
        if (star.y > height + 5) star.y = -5;

        const alpha = star.opacity * (0.5 + Math.sin(star.twinkle) * 0.32);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        ctx.fillStyle = star.gold
          ? `rgba(214,179,106,${Math.max(alpha, 0.2)})`
          : `rgba(255,255,255,${Math.max(alpha, 0.1)})`;

        ctx.shadowBlur = star.gold ? 18 : 8;
        ctx.shadowColor = star.gold
          ? "rgba(214,179,106,0.55)"
          : "rgba(255,255,255,0.22)";

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      dust.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
