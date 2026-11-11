"use client";
import { FiArrowUpRight, FiCode, FiCompass, FiLayers, FiSend } from "react-icons/fi";
import useReveal from "@/app/hooks/useReveal";

const steps = [
  { icon: FiCompass, title: "Understand the problem", description: "Start with your users, the goal and the constraints. Turn the idea into a focused scope and a clear product direction." },
  { icon: FiLayers, title: "Shape the experience", description: "Map the flow, structure the interface and choose an architecture that fits the product and its next steps." },
  { icon: FiCode, title: "Build & connect", description: "Develop the interface and APIs, connect AI or automation where it helps, and review progress along the way." },
  { icon: FiSend, title: "Launch & improve", description: "Check responsive behavior, test the key journeys and deploy. Use real feedback to decide what comes next." },
];
export default function Process() {
  const scope = useReveal();
  return <section id="process" className="section process-section" ref={scope}>
    <div className="process-heading" data-reveal><div><span className="eyebrow">The process</span><h2 className="heading mt-4">A clear path.<br /><span className="text-ink-faint">From idea to launch.</span></h2></div><p className="lede max-w-sm">Thoughtful decisions at every step, with design and engineering working together.</p></div>
    <ol className="process-grid">{steps.map(({icon: Icon, title, description}, i) => <li data-reveal key={title}><div className="process-step-top"><span className="process-icon"><Icon /></span><span>0{i + 1}</span></div><h3>{title}</h3><p>{description}</p></li>)}</ol>
    <a href="#contact" className="process-link" data-reveal>Have an idea in mind? Let’s talk it through <FiArrowUpRight /></a>
  </section>;
}
