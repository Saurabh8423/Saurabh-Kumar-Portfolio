"use client";

import { useState } from "react";
import { FiFolder } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import useReveal from "@/app/hooks/useReveal";
import { automationProjects, mlProjects, webProjects } from "./data/projectsData";

const tabs = [
  { id: "web", label: "Web Development", projects: webProjects },
  { id: "ai", label: "AI Automation", projects: automationProjects.filter((project) => !project.chatbot) },
  { id: "chatbots", label: "Chatbots", projects: automationProjects.filter((project) => project.chatbot) },
  { id: "saas", label: "SaaS Products", projects: webProjects.filter((project) => project.featured) },
  { id: "ml", label: "Machine Learning", projects: mlProjects },
];

export default function MyWork() {
  const scope = useReveal();
  const [active, setActive] = useState("web");

  const projects =
    tabs.find((tab) => tab.id === active)?.projects ?? webProjects;

  return (
    <section id="work" ref={scope} className="section">
      <div
        data-reveal
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-xl">
          <span className="eyebrow">
            <FiFolder aria-hidden="true" /> Portfolio
          </span>
          <h2 className="heading mt-4">Web apps. Automation. AI. SaaS.</h2>
        </div>
        <p className="lede max-w-xs text-sm">
          Full-stack web applications, n8n and Playwright automations, conversational chatbots and SaaS products.
        </p>
      </div>

      {/* Tabs */}
      <div
        data-reveal
        role="tablist"
        aria-label="Project categories"
        className="mt-10 flex flex-col flex-wrap gap-1 rounded-xl border border-line bg-surface p-1 backdrop-blur-xl sm:inline-flex sm:flex-row"
      >
        {tabs.map(({ id, label, projects: list }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={isActive}
              aria-controls={`panel-${id}`}
              onClick={() => setActive(id)}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "grad-brand shadow-[0_8px_20px_-10px_var(--btn-glow)]"
                  : "text-ink-soft hover:bg-page-soft hover:text-ink"
              }`}
            >
              {label}
              <span
                className={`rounded px-1.5 py-0.5 text-[11px] ${
                  isActive ? "bg-black/12" : "bg-line"
                }`}
              >
                {list.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        key={active}
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <div
            key={project.title}
            /* Flagship cards span the full row width */
            className={`h-full ${
              project.featured ? "sm:col-span-2 lg:col-span-3" : ""
            }`}
            style={{
              animation: `fadeUp .5s cubic-bezier(.2,.8,.2,1) ${
                index * 0.05
              }s both`,
            }}
          >
            <ProjectCard project={project} priority={index < 2} />
          </div>
        ))}
      </div>
    </section>
  );
}
