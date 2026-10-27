"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

const roles = ["Full Stack\nWeb Developer", "AI Automation\nDeveloper", "Chatbot\nDeveloper"];

export default function RotatingRole() {
  const title = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const node = title.current;
      const timeline = gsap.timeline({ repeat: -1 });
      roles.forEach((role) => {
        timeline
          .set(node, { textContent: role, autoAlpha: 0, y: 28, filter: "blur(6px)" })
          .to(node, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .65, ease: "power3.out" })
          .to(node, { autoAlpha: 0, y: -24, filter: "blur(6px)", duration: .45, ease: "power2.in" }, "+=2.4");
      });
      return () => { node.textContent = roles[0]; };
    });
    return () => media.revert();
  }, []);
  return (
    <span className="role-stage" style={{ display: "block", overflow: "hidden" }}>
      <span className="sr-only">Full Stack Web Developer, AI Automation Developer, Chatbot Developer</span>
      <span ref={title} aria-hidden="true" className="role-title" style={{ display: "block", whiteSpace: "pre-line" }}>{roles[0]}</span>
    </span>
  );
}
