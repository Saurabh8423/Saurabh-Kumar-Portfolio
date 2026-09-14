"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-tracking 3D tilt. Writes --rx / --ry / --mx / --my onto the element
 * so all the motion happens in CSS (see .tilt in globals.css).
 *
 * Skipped entirely on touch/coarse pointers and when the visitor prefers
 * reduced motion, so it never fights a tap or causes discomfort.
 */
export default function useTilt({ max = 7, lift = 14 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canTilt =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canTilt) return;

    let frame = 0;

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
        el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
      });
    };

    const onEnter = () => {
      el.classList.add("is-tilting");
      el.style.setProperty("--tz", `${lift}px`);
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.classList.remove("is-tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--tz", "0px");
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max, lift]);

  return ref;
}
