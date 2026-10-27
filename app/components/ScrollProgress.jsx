"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

export default function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bar.current, { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "max", scrub: .3 },
      });
    });
    return () => ctx.revert();
  }, []);
  return <div ref={bar} className="reading-progress" aria-hidden="true" />;
}
