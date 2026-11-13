"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/** Makes every Motion animation respect the visitor's reduced-motion setting. */
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Thin bar along the top edge that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-white/40 via-white to-white/40"
      style={{ scaleX }}
    />
  );
}

/** True on large screens (1024px+). False during SSR and on phones and tablets. */
export function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

/**
 * Steps through `durations` (ms per step) forever while `ref` is on screen.
 * Holds `start` for reduced motion and before hydration.
 */
export function useLoop(ref, durations, start = 0) {
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(start);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => clearTimeout(t);
  }, [step, inView, reduce, durations]);

  return step;
}

/** Swaps between short labels with a soft blur cross-fade. */
export function Cycle({ items, interval = 1600, className = "" }) {
  const ref = useRef(null);
  const durations = useMemo(() => Array(items.length).fill(interval), [items.length, interval]);
  const step = useLoop(ref, durations, items.length - 1);
  return (
    <span ref={ref} className={`relative inline-grid ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={step}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.35 }}
        >
          {items[step]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Starts tilted back in 3D and settles flat as it scrolls toward the middle of the viewport. */
export function ScrollTilt({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, scale, transformOrigin: "center top" }}>{children}</motion.div>
    </div>
  );
}

/**
 * Cards pin one after another as you scroll; each earlier card eases back
 * (smaller and darker) as the next one slides over it. On phones and tablets
 * they simply follow one another.
 */
export function CardStack({ items, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stacked = useWide();
  return (
    <div ref={ref} className={`flex flex-col ${stacked ? "gap-[12vh]" : "gap-5"} ${className}`}>
      {items.map((item, i) => (
        <StackCard key={i} index={i} total={items.length} progress={scrollYProgress} stacked={stacked}>
          {item}
        </StackCard>
      ))}
    </div>
  );
}

function StackCard({ index, total, progress, stacked, children }) {
  const depth = total - index - 1;
  const scale = useTransform(progress, [index / total, 1], [1, 1 - Math.min(depth * 0.035, 0.12)]);
  // Dim with an overlay rather than opacity, so covered cards never show through the one in front.
  const shade = useTransform(progress, [index / total, 1], [0, Math.min(depth * 0.3, 0.6)]);
  return (
    <div className={stacked ? "sticky" : undefined} style={stacked ? { top: `calc(6.5rem + ${index * 1.25}rem)` } : undefined}>
      <motion.div className="relative" style={stacked ? { scale, transformOrigin: "center top" } : undefined}>
        {children}
        {stacked && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-black" style={{ opacity: shade }} />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Row of cards that starts fanned out and converges into a straight row as it
 * scrolls into view. Only on wide screens without reduced motion.
 */
export function Converge({ items, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const wide = useWide();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const active = wide && !reduce;
  return (
    <div ref={ref} className={className}>
      {items.map((item, i) => (
        <ConvergeItem key={i} index={i} total={items.length} progress={progress} active={active}>
          {item}
        </ConvergeItem>
      ))}
    </div>
  );
}

function ConvergeItem({ index, total, progress, active, children }) {
  const side = total > 1 ? (index / (total - 1)) * 2 - 1 : 0;
  const x = useTransform(progress, [0, 1], [`${side * 45}%`, "0%"]);
  const rotate = useTransform(progress, [0, 1], [side * 4, 0]);
  const y = useTransform(progress, [0, 1], [(1 - Math.abs(side)) * 60, 0]);
  const scale = useTransform(progress, [0, 1], [0.92, 1]);
  return (
    <motion.div className="h-full" style={active ? { x, rotate, y, scale } : undefined}>
      {children}
    </motion.div>
  );
}
