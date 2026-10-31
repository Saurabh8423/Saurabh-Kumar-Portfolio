"use client";

import {
  FiAward,
  FiBriefcase,
  FiFileText,
} from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi2";
import useReveal from "@/app/hooks/useReveal";
import ExperienceDeck from "./ExperienceDeck";

import {
  certificates,
  education,
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
        <h2 className="heading mt-4">A track record of shipping.</h2>
        <p className="lede mt-4">
          Building products as Founder &amp; CEO of TooleraAI and as an engineer, from first idea to <span className="hl">production</span>.
        </p>
      </div>

      <ExperienceDeck />

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
