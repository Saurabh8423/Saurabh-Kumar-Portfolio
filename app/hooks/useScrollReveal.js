"use client";
import { useEffect } from "react";
import { gsap } from "@/app/lib/gsap";

export default function useScrollReveal(ref) {
  useEffect(() => {
    gsap.from(ref.current.children, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
    });
  }, []);
}
