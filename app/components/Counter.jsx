"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a metric up when it scrolls into view.
 *
 * Accepts values like "400+", "1.5+", "49" — the numeric part animates and
 * any prefix/suffix is preserved. Decimals keep their precision.
 */
export default function Counter({ value, duration = 1400, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  const match = String(value).match(/^(\D*)([\d.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : null;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2]?.includes(".")
    ? match[2].split(".")[1].length
    : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target.toFixed(decimals));
      return;
    }

    let frame = 0;
    let start = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const step = (now) => {
          start ??= now;
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast start, long settle
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay((target * eased).toFixed(decimals));
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, decimals]);

  // Render the final value on the server and until observed, so the number is
  // never missing for crawlers or with JS disabled.
  const shown = display ?? target?.toFixed(decimals) ?? value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
