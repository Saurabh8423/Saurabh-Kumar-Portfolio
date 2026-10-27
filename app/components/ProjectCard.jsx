"use client";

import { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { FiArrowUpRight, FiZap } from "react-icons/fi";
import { assets } from "@/assets/assets";
import TiltCard from "./TiltCard";

const skillIcons = {
  React: assets.react_icon,
  Node: assets.node_icon,
  Express: assets.express_icon,
  MongoDB: assets.mongodb,
  Machine: assets.ml_icon,
  FastAPI: assets.fastapi_icon,
  JavaScript: assets.javaScript_icon,
  TypeScript: assets.typeScript_icon,
  Python: assets.python_icon,
  HTML: assets.html_icon,
  CSS: assets.css_icon,
  Tailwind: assets.tailwind_icon,
  Next: assets.next_icon,
  Firebase: assets.firebase,
};

const skillLabels = {
  Machine: "Machine Learning",
  Next: "Next.js",
  Node: "Node.js",
  Express: "Express.js",
};

/** Gradient poster shown until a screenshot exists at project.image */
function Poster({ project, tall = false }) {
  return (
    <div
      className={`project-poster relative grid h-full w-full place-items-center overflow-hidden bg-page-soft px-6 py-10 text-center ${
        tall ? "min-h-56" : "min-h-44"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand/12 blur-2xl"
      />
      <div className="relative">
        <span aria-hidden="true" className="project-poster-mark"><FiZap /></span>
        <span className="block font-serif text-2xl font-semibold text-ink">
          {project.title}
        </span>
        {project.subtitle && (
          <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            {project.subtitle}
          </span>
        )}
        <p className="project-poster-domain">{project.liveLinks?.[0]?.url?.replace(/^https?:\/\//, "").replace(/\/$/, "") || "AUTOMATION & CONVERSATIONAL AI"}</p>
      </div>
    </div>
  );
}

function Workflow({ steps }) {
  if (!steps?.length) return null;
  return (
    <ol className="workflow-steps" aria-label="Project workflow">
      {steps.map((step, index) => (
        <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</li>
      ))}
    </ol>
  );
}

function StackRow({ project }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {project.skills?.map((skill) => {
        const icon = skillIcons[skill];
        const label = skillLabels[skill] ?? skill;

        if (!icon) {
          return (
            <span key={skill} className="chip">
              {label}
            </span>
          );
        }

        return (
          <span
            key={skill}
            title={label}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white transition-transform duration-300 hover:scale-110"
          >
            <span className="relative h-4.5 w-4.5">
              <Image
                src={icon}
                alt={label}
                fill
                sizes="18px"
                className="object-contain"
              />
            </span>
          </span>
        );
      })}

      {project.extraSkills?.map((skill) => (
        <span key={skill} className="chip">
          {skill}
        </span>
      ))}
    </div>
  );
}

function Links({ project, size = "sm" }) {
  if (!project.liveLinks?.length && !project.github) {
    return <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">Discuss this project <FiArrowUpRight aria-hidden="true" /></a>;
  }
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {project.liveLinks?.map(({ label, url }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 font-medium text-brand transition-opacity hover:opacity-70 ${
            size === "lg" ? "text-sm" : "text-[13px]"
          }`}
        >
          {label}
          <FiArrowUpRight aria-hidden="true" />
        </a>
      ))}

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft transition-colors hover:text-ink"
        >
          <FaGithub aria-hidden="true" /> GitHub
        </a>
      )}
    </div>
  );
}

export default function ProjectCard({ project, priority = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPoster = !project.image || imageFailed;

  const cover = showPoster ? (
    <Poster project={project} tall={project.featured} />
  ) : (
    <Image
      src={project.image}
      alt={`${project.title} screenshot`}
      fill
      sizes={
        project.featured
          ? "(max-width: 1024px) 100vw, 50vw"
          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      }
      priority={priority}
      onError={() => setImageFailed(true)}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );

  /* ---------- Featured: wide, split layout ---------- */
  if (project.featured) {
    return (
      <TiltCard
        as="article"
        max={3.5}
        lift={10}
        clip
        className="project-featured group grid sm:grid-cols-2"
      >
        <div className="relative min-h-56 overflow-hidden border-b border-line sm:min-h-full sm:border-b-0 sm:border-r">
          {cover}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-line bg-page/90 px-2.5 py-1 text-[11px] font-semibold text-brand backdrop-blur-sm">
            <FiZap aria-hidden="true" /> {project.workflow ? "Featured workflow" : "Flagship"}
          </span>
        </div>

        <div className="flex flex-col p-6 sm:p-7">
          <h3 className="font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              {project.subtitle}
            </p>
          )}

          <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
            {project.description}
          </p>

          <div className="mt-6">
            <Workflow steps={project.workflow} />
            <StackRow project={project} />
          </div>

          <div className="mt-6 border-t border-line pt-4">
            <Links project={project} size="lg" />
          </div>
        </div>
      </TiltCard>
    );
  }

  /* ---------- Standard: compact vertical card ---------- */
  return (
    <TiltCard
      as="article"
      max={6}
      clip
      sceneClassName="h-full"
      className="group flex h-full flex-col"
    >
      <div className="relative h-44 shrink-0 overflow-hidden border-b border-line">
        {cover}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold leading-snug text-ink">{project.title}</h3>
        {project.subtitle && (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {project.subtitle}
          </p>
        )}

        <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-soft">
          {project.description}
        </p>

        <div className="mt-5">
          <Workflow steps={project.workflow} />
          <StackRow project={project} />
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <Links project={project} />
        </div>
      </div>
    </TiltCard>
  );
}
