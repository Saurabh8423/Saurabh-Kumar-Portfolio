"use client";

import {
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi2";
import useReveal from "@/app/hooks/useReveal";
import TiltCard from "./TiltCard";
import Counter from "./Counter";
import {
  certificates,
  education,
  experience,
  recognition,
} from "./data/experienceData";

export default function Experience() {
  const scope = useReveal({ stagger: 0.12 });

  return (
    <section id="experience" ref={scope} className="section">
      <div data-reveal className="max-w-2xl">
        <span className="eyebrow">
          <FiBriefcase aria-hidden="true" /> Career
        </span>
        <h2 className="heading mt-4">Experience</h2>
        <p className="lede mt-4">
          Building products as a founder and engineer, from first idea to <span className="hl">production</span>.
        </p>
      </div>

      {/* Timeline */}
      <ol className="relative mt-12 sm:mt-16">
        <span
          aria-hidden="true"
          className="absolute left-1.75 top-3 bottom-3 w-px bg-linear-to-b from-brand via-line-strong to-transparent sm:left-2"
        />

        {experience.map((job, index) => (
          <li
            key={`${job.company}-${job.period}`}
            data-reveal
            className={`relative pl-8 sm:pl-12 ${index > 0 ? "mt-6" : ""}`}
          >
            {/* Node */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-6 grid h-4 w-4 place-items-center rounded-full border border-line bg-page"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  job.current ? "animate-pulse bg-brand" : "bg-ink-faint"
                }`}
              />
            </span>

            <TiltCard as="article" max={4} lift={8} className="p-5 sm:p-7">
              <header className="depth-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {job.company}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink sm:text-2xl">
                    {job.role}
                  </h3>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <span className={job.current ? "chip chip-brand" : "chip"}>
                    {job.period}
                  </span>
                  <span className="chip">{job.type}</span>
                </div>
              </header>

              <p className="mt-4 border-l-2 border-brand pl-4 text-sm leading-relaxed text-ink-soft">
                {job.summary}
              </p>

              {/* Impact metrics — the part a recruiter should see first */}
              {job.metrics.length > 0 && <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
                {job.metrics.map(({ value, label }) => (
                  <div key={label} className="bg-page px-4 py-3.5">
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <Counter
                        value={value}
                        className="metric block text-2xl text-brand"
                      />
                      <span className="mt-1 block text-[11px] text-ink-faint">
                        {label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>}

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <FiCheckCircle
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-brand"
                    />
                    <span className="text-[13px] leading-relaxed text-ink-soft">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </li>
        ))}
      </ol>

      {/* Education + recognition — deliberately different card treatments */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Education: numbered spec-sheet layout */}
        <article
          data-reveal
          className="card overflow-hidden p-0"
        >
          <div className="flex items-center gap-3 border-b border-line bg-page-soft/60 px-5 py-4 sm:px-7">
            <HiAcademicCap aria-hidden="true" className="text-xl text-brand" />
            <h3 className="font-semibold text-ink">Education</h3>
          </div>

          <div className="px-5 py-6 sm:px-7">
            <h4 className="font-serif text-lg leading-snug text-ink">
              {education.degree}
            </h4>
            <p className="mt-2 text-sm text-ink-soft">{education.institute}</p>

            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
              <div className="bg-page px-4 py-3">
                <p className="text-[11px] uppercase tracking-wider text-ink-faint">
                  Duration
                </p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {education.period}
                </p>
              </div>
              <div className="bg-page px-4 py-3">
                <p className="text-[11px] uppercase tracking-wider text-ink-faint">
                  Score
                </p>
                <p className="mt-1 text-sm font-medium text-brand">
                  {education.score}
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              Relevant coursework
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {education.coursework.map((course) => (
                <li key={course} className="chip">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Recognition: two inset panels, each led by its headline figure */}
        <article data-reveal className="card overflow-hidden p-0">
          <div className="flex items-center gap-3 border-b border-line bg-page-soft/60 px-5 py-4 sm:px-7">
            <FiAward aria-hidden="true" className="text-xl text-accent" />
            <h3 className="font-semibold text-ink">Recognition</h3>
          </div>

          <div className="flex flex-col gap-4 px-5 py-6 sm:px-7">
            {recognition.map(({ metric, title, detail }) => (
              <div
                key={metric}
                className="rounded-xl border border-line bg-page-soft/50 p-5"
              >
                <p className="metric text-2xl text-accent sm:text-[1.75rem]">
                  {metric}
                </p>
                <p className="mt-2.5 text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {detail}
                </p>
              </div>
            ))}

            {/* Hidden until a verifiable certificate exists */}
            {certificates.length > 0 && (
              <div className="border-t border-line pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                  Certificates
                </p>
                <ul className="mt-3 space-y-2">
                  {certificates.map(({ name, url }) => (
                    <li key={name}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2.5 text-sm text-ink-soft transition-colors hover:text-brand"
                      >
                        <FiFileText
                          aria-hidden="true"
                          className="mt-0.5 shrink-0"
                        />
                        <span>{name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
