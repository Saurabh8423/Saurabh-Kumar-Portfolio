"use client";

import { useEffect, useRef } from "react";

export default function BackgroundStars() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame, width, height, stars, previous = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: width < 640 ? 45 : 100 }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        radius: .4 + Math.random() * 1.1, speed: .08 + Math.random() * .22,
      }));
    };
    const draw = (time = 0) => {
      const delta = Math.min((time - previous) / 16.67 || 1, 2);
      previous = time;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = document.documentElement.classList.contains("dark") ? "#a8dce5" : "#366a7a";
      for (const star of stars) {
        if (!motion.matches) {
          star.x = (star.x + star.speed * delta) % width;
          star.y = (star.y + star.speed * .4 * delta) % height;
        }
        ctx.globalAlpha = .2 + star.radius * .2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const restart = () => { cancelAnimationFrame(frame); previous = 0; draw(); };
    const onResize = () => { resize(); restart(); };
    resize(); draw();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    const theme = new MutationObserver(restart);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
      theme.disconnect();
    };
  }, []);
  return <canvas ref={ref} className="background-stars" aria-hidden="true" />;
}
