"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  LuArrowRight,
  LuBot,
  LuBrainCircuit,
  LuCodeXml,
  LuLayoutDashboard,
  LuMessagesSquare,
  LuSearch,
  LuSmartphone,
  LuX,
} from "react-icons/lu";
import { Section, SectionHeading } from "./ui/Section";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { GlassIcon, Spotlight } from "./ui/Glass";
import { ButtonLink } from "./ui/Button";
import { serviceVisuals } from "./visuals/ServiceVisuals";

export const services = [
  {
    icon: LuCodeXml,
    title: "Web Development",
    shortDesc: "Fast, responsive, SEO-ready web apps with clean, maintainable code.",
    fullDesc:
      "I build scalable, high-performance web applications with React, Next.js and TypeScript. Clean UI, SEO, accessibility and maintainable modular code, backed by Node, Express or FastAPI APIs and deployed with Docker, Nginx and CI/CD.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "REST APIs"],
    visual: "website",
  },
  {
    icon: LuBot,
    title: "AI Automation",
    shortDesc: "n8n and Playwright workflows for content, SEO and personalised outreach.",
    fullDesc:
      "I build connected workflows that generate and publish videos and images to YouTube, Facebook and Instagram, create and publish blog posts, automate SEO tasks, and research websites to draft and send personalised emails. My automation toolkit includes n8n and Playwright.",
    tags: ["n8n", "Playwright", "Content Publishing", "SEO Automation", "Email Workflows"],
    visual: "agents",
  },
  {
    icon: LuMessagesSquare,
    title: "AI Chatbot Development",
    shortDesc: "WhatsApp chatbots and assistants that answer questions about uploaded PDFs.",
    fullDesc:
      "I build WhatsApp chatbot workflows and document-based assistants where users upload a PDF and ask questions about its content. My broader conversational AI work includes YogiAI chat and WebRTC voice, backed by full-stack application development.",
    tags: ["WhatsApp Chatbot", "PDF Q&A", "LLM APIs", "Prompt Engineering"],
    visual: "chat",
  },
  {
    icon: LuLayoutDashboard,
    title: "SaaS Product Development",
    shortDesc: "Complete SaaS products, from interface and APIs to billing and deployment.",
    fullDesc:
      "I build full-stack SaaS products with authentication, subscriptions, admin interfaces and AI integrations. My work includes TooleraAI, YogiAI.live and StudyMates.live, taken from architecture to production deployment.",
    tags: ["Next.js", "Authentication", "Subscriptions", "AI Integration", "Deployment"],
    visual: "saas",
  },
  {
    icon: LuBrainCircuit,
    title: "AI & ML Solutions",
    shortDesc: "LLM features, OCR and prediction models served through FastAPI.",
    fullDesc:
      "I integrate OpenAI and other LLM APIs into real products (AI chat, prompt-engineered workflows, OCR and automation) plus classic ML prediction models and analytics dashboards served through FastAPI for production deployment.",
    tags: ["OpenAI APIs", "LLM Integration", "Scikit-learn", "FastAPI", "OCR"],
    visual: "ml",
  },
  {
    icon: LuSmartphone,
    title: "Mobile Development",
    shortDesc: "Cross-platform iOS and Android apps with Flutter, React Native and Capacitor.",
    fullDesc:
      "I build Android and iOS experiences with Flutter and React Native, and bring web applications to mobile with Capacitor. From responsive screens and native device integrations to authentication and backend APIs, I focus on consistent experiences across devices.",
    tags: ["Flutter", "React Native", "Capacitor", "Android", "iOS"],
    visual: "mobile",
  },
  {
    icon: LuSearch,
    title: "SEO & Optimization",
    shortDesc: "Search-friendly websites built for visibility and performance.",
    fullDesc:
      "I improve how websites are discovered, crawled and understood by search engines through technical SEO, structured data, metadata, XML sitemaps and internal linking, and I optimise page performance using analytics to find opportunities for organic growth.",
    tags: ["Technical SEO", "Structured Data", "Core Web Vitals", "Sitemaps"],
    visual: "seo",
  },
];

// Bento on large screens: 2+1 / 1+2 / 1+1+1.
const wide = new Set([0, 3]);

function ServiceCard({ service, index, onOpen }) {
  const Visual = serviceVisuals[service.visual];
  return (
    <Spotlight className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-900 p-3 shadow-card transition-[border-color,transform] duration-500 ease-out hover:-translate-y-1.5 hover:border-white/20">
      <div aria-hidden className="hairline-top absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <Visual />
      </div>
      <article className="relative flex flex-1 flex-col p-3 pt-5 sm:p-4 sm:pt-6">
        <div className="flex items-center gap-3">
          <GlassIcon icon={service.icon} size="sm" />
          <h3 className="text-lg font-semibold tracking-tight text-fg">{service.title}</h3>
          <span className="ml-auto font-mono text-xs text-subtle transition-colors duration-300 group-hover:text-fg">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{service.shortDesc}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {service.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] text-muted transition-colors duration-300 group-hover:border-white/15 group-hover:text-fg/80"
            >
              {t}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onOpen(index)}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-fg/80 transition-colors hover:text-fg"
          aria-haspopup="dialog"
        >
          Read more
          <LuArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </article>
    </Spotlight>
  );
}

function ServiceDialog({ index, onClose }) {
  const service = services[index];
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const Visual = serviceVisuals[service.visual];
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-line-strong bg-ink-900 p-3 shadow-[var(--shadow-deep)]"
        initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div aria-hidden className="hairline-top absolute inset-x-8 top-0 h-px" />
        <Visual />
        <div className="p-3 pt-6 sm:p-5">
          <div className="flex items-center gap-3">
            <GlassIcon icon={service.icon} />
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-subtle">Service {String(index + 1).padStart(2, "0")}</p>
              <h3 id="service-dialog-title" className="text-xl font-semibold tracking-tight text-fg">
                {service.title}
              </h3>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{service.fullDesc}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {service.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] text-fg/80">
                {t}
              </li>
            ))}
          </ul>
          <ButtonLink href="#contact" size="lg" arrow onClick={onClose} className="mt-7 w-full">
            Start a project
          </ButtonLink>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="glass absolute right-5 top-5 grid size-9 place-items-center rounded-full text-fg transition-transform hover:scale-105 active:scale-95"
        >
          <LuX className="size-4" aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Section id="services" labelledBy="services-title" className="border-y border-line bg-ink-900/40">
      <SectionHeading
        id="services-title"
        eyebrow="Services"
        title="Everything you need to build, automate and launch."
        description="One developer for interface, backend and AI, so your product stays consistent from the first pixel to the last API call."
      />
      <Stagger as="ul" stagger={0.14} className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
        {services.map((service, i) => (
          <StaggerItem as="li" key={service.title} className={`${wide.has(i) ? "lg:col-span-2" : ""} ${i === services.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <ServiceCard service={service} index={i} onOpen={setOpen} />
          </StaggerItem>
        ))}
      </Stagger>
      <AnimatePresence>{open !== null && <ServiceDialog key="dialog" index={open} onClose={close} />}</AnimatePresence>
    </Section>
  );
}
