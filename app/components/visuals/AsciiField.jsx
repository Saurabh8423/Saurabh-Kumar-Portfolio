"use client";

import { useEffect, useRef } from "react";
import { THEME_EVENT } from "@/app/components/ui/ThemeToggle";

const CHARS = "0123456789#$%&@*+=";
const CELL_W = 12;
const CELL_H = 16;
const FPS = 14;

// Two clouds of characters that drift around opposite corners.
const blobs = [
  { x: 0.14, y: 0.22, r: 0.2, ax: 0.06, ay: 0.05, speed: 0.11, phase: 0 },
  { x: 0.88, y: 0.72, r: 0.18, ax: 0.05, ay: 0.06, speed: 0.09, phase: 2 },
];

/**
 * Decorative field of monospace digits that thickens inside slowly drifting
 * clouds and flickers like a live data feed. Pauses off screen and draws a
 * single still frame for reduced motion.
 */
export default function AsciiField({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let glyphs = [];
    let seeds = [];
    let raf = 0;
    let last = 0;
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL_W);
      rows = Math.ceil(height / CELL_H);
      glyphs = Array.from({ length: cols * rows }, () => CHARS[(Math.random() * CHARS.length) | 0]);
      seeds = Array.from({ length: cols * rows }, () => Math.random());
    }

    function draw(t) {
      const s = t / 1000;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = "500 11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "top";
      const aspect = width / Math.max(height, 1);
      // Follow the theme: the canvas inherits its text colour.
      const rgb = (getComputedStyle(canvas).color.match(/\d+/g) ?? ["255", "255", "255"]).slice(0, 3).join(",");

      const centres = blobs.map((b) => ({
        x: b.x + Math.sin(s * b.speed + b.phase) * b.ax,
        y: b.y + Math.cos(s * b.speed * 1.3 + b.phase) * b.ay,
        r: b.r,
      }));

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          const nx = col / cols;
          const ny = row / rows;
          let v = 0;
          for (const c of centres) {
            const dx = (nx - c.x) * aspect;
            const dy = ny - c.y;
            v += Math.exp(-(dx * dx + dy * dy) / (c.r * c.r));
          }
          v += Math.sin(col * 0.35 + s * 0.8) * Math.cos(row * 0.3 - s * 0.6) * 0.12;
          if (v + seeds[i] * 0.35 < 0.55) continue;

          if (!reduce && Math.random() < 0.02) glyphs[i] = CHARS[(Math.random() * CHARS.length) | 0];
          const bright = seeds[i] > 0.97;
          const alpha = Math.min(1, bright ? 0.95 : 0.12 + v * 0.45);
          ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
          ctx.fillText(glyphs[i], col * CELL_W, row * CELL_H);
        }
      }
    }

    function loop(t) {
      raf = requestAnimationFrame(loop);
      if (!visible || t - last < 1000 / FPS) return;
      last = t;
      draw(t);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const redraw = () => draw(performance.now());
    window.addEventListener(THEME_EVENT, redraw);

    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener(THEME_EVENT, redraw);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none size-full text-white ${className}`} />;
}
