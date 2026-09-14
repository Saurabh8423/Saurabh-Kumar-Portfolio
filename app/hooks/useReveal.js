"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

/**
 * Scroll-reveals every `[data-reveal]` descendant of the returned ref.
 *
 * Attach the ref to a section wrapper and mark the children you want
 * staggered in. Cleans itself up with gsap.context() so React 19 strict
 * mode double-effects cannot leave elements stuck at opacity: 0.
 */
export default function useReveal({
  y = 34,
  stagger = 0.1,
  duration = 0.85,
  start = "top 84%",
} = {}) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const targets = gsap.utils.toArray(root.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [y, stagger, duration, start]);

  return scope;
}
