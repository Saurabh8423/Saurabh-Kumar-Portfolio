"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { LuArrowUpRight, LuBot, LuGithub, LuSparkles, LuZap } from "react-icons/lu";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { GlassIcon, Spotlight } from "./ui/Glass";
import { CardStack } from "./ui/Motion";
import { automationProjects, mlProjects, webProjects } from "./data/projectsData";

const flagship = webProjects.filter((p) => p.featured);

const tabs = [
  { id: "web", label: "Web apps", projects: webProjects.filter((p) => !p.featured) },
  { id: "ai", label: "AI automation", projects: automationProjects.filter((p) => !p.chatbot) },
  { id: "chatbots", label: "Chatbots", projects: automationProjects.filter((p) => p.chatbot) },
  { id: "ml", label: "Machine learning", projects: mlProjects },
];

const labels = { Machine: "Machine Learning", Next: "Next.js", Node: "Node.js", Express: "Express.js" };
const stackOf = (p) => [...(p.skills ?? []).map((s) => labels[s] ?? s), ...(p.extraSkills ?? [])];
const domainOf = (p) => p.liveLinks?.[0]?.url?.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
const pad = (n) => String(n).padStart(2, "0");

function Links({ project }) {
  if (!project.liveLinks?.length && !project.github) {
    return (
      <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-fg/80 transition-colors hover:text-fg">
        Discuss a similar build <LuArrowUpRight aria-hidden className="size-4" />
      </a>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {project.liveLinks?.map(({ label, url }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1 text-sm font-medium text-fg/85 transition-colors hover:text-fg"
        >
          {label}
          <LuArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      ))}
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
          <LuGithub aria-hidden className="size-4" /> Code
        </a>
      )}
    </div>
  );
}

function BrowserShot({ project, sizes, priority = false }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-ink-900 shadow-[var(--shadow-deep)]">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-1.5 rounded-full bg-white/30" />
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/10" />
        <span className="ml-2 truncate rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[0.6rem] text-subtle">
          {domainOf(project) ?? "localhost:3000"}
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  );
}

/** For projects without a screenshot: the project's workflow as connected glass nodes with travelling pulses. */
function WorkflowFrame({ project }) {
  const steps = (project.workflow ?? project.extraSkills ?? []).slice(0, 3);
  const icons = [LuZap, LuBot, LuSparkles];
  const xs = steps.length === 3 ? [17, 50, 83] : [30, 70];
  return (
    <div aria-hidden className="relative h-full min-h-44 overflow-hidden bg-dots">
      <svg className="absolute inset-0 size-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        {xs.slice(0, -1).map((x, i) => {
          const p = `M${x + 6} 42 L${xs[i + 1] - 6} 42`;
          return (
            <g key={p}>
              <path d={p} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path
                d={p}
                pathLength={100}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="14 200"
                vectorEffect="non-scaling-stroke"
                className="animate-pulse-line"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            </g>
          );
        })}
      </svg>
      {steps.map((step, i) => (
        <div key={step} className="absolute top-[42%] flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center" style={{ left: `${xs[i]}%` }}>
          <div className="relative">
            {i === 1 && <div className="absolute inset-0 -z-10 animate-pulse-soft rounded-full bg-white/25 blur-xl" />}
            <GlassIcon icon={icons[i]} size={i === 1 ? "md" : "sm"} />
          </div>
          <span className="font-mono text-[0.6rem] leading-tight text-muted">{step}</span>
        </div>
      ))}
      <span className="glass-soft absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6rem] text-fg/80">
        <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" />
        {project.chatbot ? "conversation live" : "workflow running"}
      </span>
    </div>
  );
}

function FlagshipCard({ project, index }) {
  return (
    <Spotlight className="group relative grid overflow-hidden rounded-3xl border border-line bg-ink-900 shadow-[var(--shadow-stack)] transition-[border-color] duration-500 hover:border-white/20 lg:grid-cols-2">
      <div className="relative overflow-hidden border-b border-line bg-ink-850 p-6 sm:p-10 lg:order-2 lg:flex lg:min-h-[28rem] lg:items-center lg:border-b-0 lg:border-l">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-rotate-1">
          <BrowserShot project={project} sizes="(max-width: 1024px) 100vw, 45vw" priority={index === 0} />
        </div>
      </div>
      <div className="relative flex flex-col p-6 sm:p-8 lg:justify-center lg:p-12">
        <p className="mb-6 font-mono text-xs text-subtle">
          <span className="text-fg">{pad(index + 1)}</span> / {pad(flagship.length)}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="glass-soft inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-fg/80">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" /> Live product
          </span>
          <span className="text-xs text-subtle">{project.subtitle}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {stackOf(project).map((s) => (
            <li key={s} className="rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[0.7rem] text-muted">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-7 border-t border-line pt-5">
          <Links project={project} />
        </div>
      </div>
    </Spotlight>
  );
}

function ProjectCard({ project }) {
  return (
    <Spotlight className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-900 p-3 shadow-card transition-[border-color,transform] duration-500 ease-out hover:-translate-y-1.5 hover:border-white/20">
      <div aria-hidden className="hairline-top absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-48 overflow-hidden rounded-2xl border border-line bg-black/60">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <WorkflowFrame project={project} />
        )}
      </div>
      <article className="relative flex flex-1 flex-col p-3 pt-5 sm:p-4 sm:pt-5">
        <h3 className="text-lg font-semibold tracking-tight text-fg">{project.title}</h3>
        {project.subtitle && <p className="mt-0.5 text-xs text-subtle">{project.subtitle}</p>}
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {stackOf(project).map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] text-muted transition-colors duration-300 group-hover:border-white/15 group-hover:text-fg/80">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-line pt-4">
          <Links project={project} />
        </div>
      </article>
    </Spotlight>
  );
}

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cell = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" }, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function MyWork() {
  const [active, setActive] = useState("web");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="Ideas made tangible."
        description="Live SaaS products, full-stack web apps, n8n and Playwright automations, chatbots and machine-learning projects."
      />

      <CardStack
        className="mt-14 lg:mt-16"
        items={flagship.map((p, i) => (
          <Reveal key={p.title}>
            <FlagshipCard project={p} index={i} />
          </Reveal>
        ))}
      />

      <Reveal className="mt-24 flex flex-col gap-6 sm:mt-32 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">More projects</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Explore by category.</h3>
        </div>
        <div role="tablist" aria-label="Project categories" className="glass-soft flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
          {tabs.map((t, i) => {
            const selected = t.id === active;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="work-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => {
                  const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                  if (!step) return;
                  e.preventDefault();
                  const next = tabs[(i + step + tabs.length) % tabs.length];
                  setActive(next.id);
                  document.getElementById(`tab-${next.id}`)?.focus();
                }}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${selected ? "text-black" : "text-muted hover:text-fg"}`}
              >
                {selected && (
                  <motion.span layoutId="work-tab" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">
                  {t.label} <span className={`font-mono text-[0.7rem] ${selected ? "text-black/60" : "text-subtle"}`}>{t.projects.length}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          variants={grid}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
        >
          {current.projects.map((p) => (
            <motion.li key={p.title} variants={cell} className={p.featured ? "sm:col-span-2" : ""}>
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </Section>
  );
}
