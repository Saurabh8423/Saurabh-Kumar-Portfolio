"use client";

import { motion } from "motion/react";

const EASE = [0.21, 0.47, 0.32, 0.98];

/**
 * Shared viewport for every scroll reveal: animations replay each time an element
 * comes into view, scrolling down or up, and reset only once fully off screen.
 */
const VIEWPORT = { amount: "some", margin: "0px 0px -8% 0px" };

/** Fades, lifts and un-blurs content whenever it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 18 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const words = { hidden: {}, show: { transition: { staggerChildren: 0.045 } } };
const word = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transitionEnd: { filter: "none" },
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Reveals plain-text headings word by word with a soft blur-in. */
export function RevealWords({ text, className }) {
  return (
    <motion.span className={className} variants={words} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block whitespace-pre">
          {w}{" "}
        </motion.span>
      ))}
    </motion.span>
  );
}

const group = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transitionEnd: { filter: "none" },
    transition: { duration: 0.6, ease: EASE },
  },
};

const tags = { div: motion.div, ul: motion.ul, ol: motion.ol, li: motion.li };

/** Container whose direct `StaggerItem` children reveal one after another. */
export function Stagger({ children, className, as = "div", stagger }) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      variants={stagger ? { hidden: {}, show: { transition: { staggerChildren: stagger } } } : group}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = "div" }) {
  const Component = tags[as];
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}

/** Flies in from a given direction with a soft spring whenever it scrolls into view. */
export function FlyIn({ children, className, as = "div", from, delay = 0 }) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, x: from.x ?? 0, y: from.y ?? 0, rotate: from.rotate ?? 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={VIEWPORT}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 18,
        mass: 0.9,
        delay,
        opacity: { duration: 0.5, delay },
        filter: { duration: 0.6, delay },
      }}
    >
      {children}
    </Component>
  );
}
