"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiGrid, FiSearch, FiSmartphone, FiX } from "react-icons/fi";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { TbBrowser } from "react-icons/tb";
import useReveal from "@/app/hooks/useReveal";
import TiltCard from "./TiltCard";

const services = [
  {
    icon: TbBrowser,
    index: "01",
    title: "Web Development",
    shortDesc: "Fast, responsive, SEO-ready web apps.",
    fullDesc:
      "I build scalable, high-performance web applications with React, Next.js and TypeScript. Clean UI, SEO, accessibility and maintainable modular code — backed by Node, Express or FastAPI APIs and deployed with Docker, Nginx and CI/CD.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "REST APIs"],
    tone: "brand",
  },
  {
    icon: HiOutlineCpuChip,
    index: "02",
    title: "AI & ML Solutions",
    shortDesc: "LLM features, automation and prediction models.",
    fullDesc:
      "I integrate OpenAI and other LLM APIs into real products — AI chat, prompt-engineered workflows, OCR and AI automation — plus classic ML prediction models and analytics dashboards served through FastAPI for production deployment.",
    tags: ["OpenAI APIs", "LLM Integration", "Scikit-learn", "FastAPI", "OCR"],
    tone: "accent",
  },
  {
    icon: FiSmartphone,
    index: "03",
    title: "Mobile Development",
    shortDesc: "Cross-platform mobile apps with React Native and Capacitor.",
    fullDesc:
      "I build Android and iOS experiences with React Native and bring web applications to mobile with Capacitor. From responsive screens and native device integrations to authentication and backend APIs, I focus on consistent experiences across devices and maintainable application code.",
    tags: ["React Native", "Capacitor", "Android", "iOS", "API Integration"],
    tone: "accent",
  },
  {
    icon: FiSearch,
    index: "04",
    title: "SEO & Optimization",
    shortDesc: "Search-friendly websites built for visibility and performance.",
    fullDesc:
      "I improve how websites are discovered, crawled and understood by search engines through technical SEO, structured data, metadata, XML sitemaps and internal linking. I also optimize page performance and use analytics to identify opportunities for a better user experience and organic growth.",
    tags: ["Technical SEO", "Structured Data", "Core Web Vitals", "Sitemaps", "Analytics"],
    tone: "brand",
  },
];

const tones = {
  brand: { chip: "chip chip-brand", icon: "bg-brand-soft text-brand" },
  accent: { chip: "chip chip-accent", icon: "bg-accent-soft text-accent" },
};

const Services = () => {
  const scope = useReveal();
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    if (!activeService) return;
    const onKey = (e) => e.key === "Escape" && setActiveService(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeService]);

  return (
    <>
      <section id="services" ref={scope} className="section">
        <div
          data-reveal
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <span className="eyebrow">
              <FiGrid aria-hidden="true" /> What I offer
            </span>
            <h2 className="heading mt-4">My services</h2>
          </div>
          <p className="lede max-w-xs text-sm">
            From web and mobile to AI and SEO, I help teams <span className="hl">build and grow</span>.
          </p>
        </div>

        {/* Equal-height cards. h-full on both the scene and the card so the
            shorter one stretches to match its neighbour. */}
        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            const tone = tones[service.tone];

            return (
              <div key={service.title} data-reveal className="h-full">
                <TiltCard
                  as="article"
                  max={5}
                  sceneClassName="h-full"
                  className="group flex h-full flex-col p-6 sm:p-8"
                >
                  <div className="depth-1 flex items-start justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-xl border border-line text-2xl ${tone.icon}`}
                    >
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="font-serif text-3xl leading-none text-ink-faint/35">
                      {service.index}
                    </span>
                  </div>

                  <h3 className="depth-1 mt-8 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {service.shortDesc}
                  </p>

                  {/* flex-1 pushes the CTA to the bottom of both cards alike */}
                  <ul className="mt-6 flex flex-1 flex-wrap content-start gap-1.5">
                    {service.tags.map((tag) => (
                      <li key={tag} className={tone.chip}>
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="mt-8 inline-flex items-center gap-2 self-start border-b border-transparent pb-0.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    Read more
                    <FiArrowRight
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal */}
      {activeService && (
        <div
          onClick={() => setActiveService(null)}
          className="fixed inset-0 z-70 grid place-items-center bg-black/55 p-4 backdrop-blur-sm"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="animate-scaleIn relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-page"
          >
            <div className="flex items-start gap-4 border-b border-line bg-page-soft/70 p-6 pr-16 sm:p-7 sm:pr-16">
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line text-2xl ${
                  tones[activeService.tone].icon
                }`}
              >
                <activeService.icon aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Service {activeService.index}
                </p>
                <h3
                  id="service-modal-title"
                  className="mt-1 font-serif text-xl font-semibold text-ink sm:text-2xl"
                >
                  {activeService.title}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveService(null)}
              aria-label="Close"
              autoFocus
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-line bg-page text-ink-soft transition-colors hover:border-brand hover:text-brand"
            >
              <FiX />
            </button>

            <div className="p-6 sm:p-7">
              <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                {activeService.fullDesc}
              </p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {activeService.tags.map((tag) => (
                  <li key={tag} className={tones[activeService.tone].chip}>
                    {tag}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setActiveService(null)}
                className="btn btn-primary mt-8 w-full"
              >
                Start a project <FiArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
