"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiPause, FiPlay } from "react-icons/fi";
import { gsap } from "@/app/lib/gsap";
import { experience } from "./data/experienceData";

export default function ExperienceDeck() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const root = useRef(null);
  const card = useRef(null);
  const busy = useRef(false);
  const direction = useRef(1);
  const swipeStart = useRef(null);
  const job = experience[active];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .3 });
    observer.observe(root.current);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  useLayoutEffect(() => {
    busy.current = false;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(card.current, { opacity: 0, y: 32, x: direction.current * 28, rotate: direction.current * 1.5, scale: .97 }, {
        opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, duration: .7, ease: "power3.out",
      });
      gsap.fromTo(".career-detail", { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: .055, duration: .5, delay: .15, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, [active, reduced]);

  const move = (next) => {
    const index = (next + experience.length) % experience.length;
    if (busy.current || index === active) return;
    direction.current = next < active ? -1 : 1;
    if (reduced) { setActive(index); return; }
    busy.current = true;
    gsap.to(card.current, {
      opacity: 0, y: -24, x: -direction.current * 35, rotate: -direction.current * 2,
      scale: .97, duration: .3, ease: "power2.in", overwrite: true,
      onComplete: () => setActive(index),
    });
  };

  useEffect(() => {
    if (paused || hovered || !visible || reduced) return;
    const timer = setTimeout(() => move(active + 1), 8000);
    return () => clearTimeout(timer);
  }, [active, paused, hovered, visible, reduced]);

  useEffect(() => {
    const node = card.current;
    return () => gsap.killTweensOf(node);
  }, []);

  return (
    <div ref={root} className="career-deck" role="region" aria-roledescription="carousel" aria-label="Professional experience"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(active - 1); }
      }}>
      <div className="career-picker" aria-label="Choose experience">
        {experience.map((item, index) => (
          <button key={item.company} type="button" aria-pressed={active === index} aria-controls="career-current" onClick={() => move(index)}>
            <span className="career-picker-number">0{index + 1}</span><span>{item.company}</span>
            {active === index && <span className="career-active-dot" aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="career-stack" onTouchStart={(event) => { swipeStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
        if (swipeStart.current === null) return;
        const distance = swipeStart.current - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 60) move(active + (distance > 0 ? 1 : -1));
        swipeStart.current = null;
      }}>
        <div className="career-back-card career-back-far" aria-hidden="true" />
        <div className="career-back-card career-back-near" aria-hidden="true" />
        <article ref={card} id="career-current" className="career-front-card" aria-roledescription="slide" aria-label={`${active + 1} of ${experience.length}: ${job.company}`}>
          <div className="career-card-top career-detail"><span>EXPERIENCE / 0{active + 1}</span><span className="career-employment">{job.current && <i aria-hidden="true" />}{job.type}</span></div>
          <header className="career-card-heading career-detail">
            <div><p className="career-company">{job.company}</p><h3>{job.role}</h3></div>
            <span className="career-period">{job.period}</span>
          </header>
          <p className="career-summary career-detail">{job.summary}</p>
          {job.metrics.length > 0 && <dl className="career-metrics career-detail">{job.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>}
          <ul className="career-points">{job.points.map((point) => <li key={point} className="career-detail"><FiCheck aria-hidden="true" /><span>{point}</span></li>)}</ul>
          <ul className="career-tech career-detail">{job.stack.map((tech) => <li key={tech} className="chip">{tech}</li>)}</ul>
        </article>
      </div>

      <div className="career-controls">
        <p aria-live={paused || hovered || reduced ? "polite" : "off"}><span>0{active + 1}</span> / 0{experience.length}<span className="career-control-caption">Career chapters</span></p>
        <div>
          <button type="button" className="career-control" onClick={() => setPaused(!paused)} aria-label={paused ? "Play experience slideshow" : "Pause experience slideshow"} aria-pressed={paused}>{paused ? <FiPlay /> : <FiPause />}</button>
          <button type="button" className="career-control" onClick={() => move(active - 1)} aria-label="Previous experience"><FiArrowLeft /></button>
          <button type="button" className="career-control" onClick={() => move(active + 1)} aria-label="Next experience"><FiArrowRight /></button>
        </div>
      </div>
      <div className="career-progress-track" aria-hidden="true">
        <span key={`${active}-${paused}-${hovered}-${visible}-${reduced}`} className={!(paused || hovered || !visible || reduced) ? "career-progress-running" : ""} />
      </div>
    </div>
  );
}
