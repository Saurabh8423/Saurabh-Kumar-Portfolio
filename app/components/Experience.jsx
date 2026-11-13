import { LuAward, LuBriefcase, LuCheck, LuFileText, LuGraduationCap } from "react-icons/lu";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { GlassIcon, Spotlight } from "./ui/Glass";
import { CardStack } from "./ui/Motion";
import { certificates, education, experience, recognition } from "./data/experienceData";

const pad = (n) => String(n).padStart(2, "0");

function JobCard({ job, index }) {
  return (
    <Spotlight className="group relative grid overflow-hidden rounded-3xl border border-line bg-ink-900 shadow-[var(--shadow-stack)] transition-[border-color] duration-500 hover:border-white/20 lg:grid-cols-[1.35fr_1fr]">
      <article className="relative flex flex-col p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="glass-soft inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-fg/80">
            {job.current && <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" />}
            {job.type}
          </span>
          <span className="font-mono text-xs text-subtle">{job.period}</span>
        </div>
        <p className="mt-5 text-sm text-muted">{job.company}</p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{job.role}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">{job.summary}</p>
        <ul className="mt-6 space-y-2.5">
          {job.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-fg/85">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/[0.07]">
                <LuCheck className="size-3" aria-hidden />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </article>

      <div className="relative flex flex-col gap-6 overflow-hidden border-t border-line bg-ink-850 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/3 size-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative flex items-start justify-between">
          <GlassIcon icon={LuBriefcase} size="lg" />
          <p className="font-mono text-xs text-subtle">
            <span className="text-fg">{pad(index + 1)}</span> / {pad(experience.length)}
          </p>
        </div>
        <p aria-hidden className="text-gradient relative select-none text-6xl font-semibold leading-none tracking-[-0.05em] opacity-30 sm:text-7xl">
          {job.period.match(/\d{4}/)?.[0]}
        </p>
        {job.metrics.length > 0 && (
          <dl className="relative grid grid-cols-2 gap-2">
            {job.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl px-4 py-3">
                <dd className="text-2xl font-semibold tracking-tight text-fg">{m.value}</dd>
                <dt className="mt-0.5 text-[0.72rem] text-subtle">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}
        <ul className="relative mt-auto flex flex-wrap gap-1.5" aria-label="Technologies">
          {job.stack.map((s) => (
            <li key={s} className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[0.7rem] text-muted">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Spotlight>
  );
}

export default function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        eyebrow="Career"
        title="Real experience, products in the real world."
        description="Building products as Founder & CEO of TooleraAI and as an engineer, from the first commit to production."
      />

      <CardStack
        className="mt-14 lg:mt-16"
        items={experience.map((job, i) => (
          <Reveal key={job.company}>
            <JobCard job={job} index={i} />
          </Reveal>
        ))}
      />

      <Stagger className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-5">
        <StaggerItem className="h-full">
          <Spotlight className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-900 p-6 shadow-card transition-[border-color] duration-500 hover:border-white/20 sm:p-8">
            <div className="relative flex items-center gap-3">
              <GlassIcon icon={LuGraduationCap} />
              <h3 className="text-lg font-semibold tracking-tight text-fg">Education</h3>
            </div>
            <p className="relative mt-6 text-xl font-semibold tracking-tight text-fg">{education.degree}</p>
            <p className="relative mt-1 text-sm text-muted">{education.institute}</p>
            <dl className="relative mt-5 grid grid-cols-2 gap-2">
              {[
                ["Duration", education.period],
                ["Score", education.score],
              ].map(([label, value]) => (
                <div key={label} className="glass-soft rounded-xl px-4 py-3">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-subtle">{label}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-fg">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="relative mt-6 font-mono text-[0.65rem] uppercase tracking-wider text-subtle">Relevant coursework</p>
            <ul className="relative mt-3 flex flex-wrap gap-1.5">
              {education.coursework.map((c) => (
                <li key={c} className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </Spotlight>
        </StaggerItem>

        <StaggerItem className="h-full">
          <Spotlight className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-900 p-6 shadow-card transition-[border-color] duration-500 hover:border-white/20 sm:p-8">
            <div className="relative flex items-center gap-3">
              <GlassIcon icon={LuAward} />
              <h3 className="text-lg font-semibold tracking-tight text-fg">Recognition</h3>
            </div>
            <div className="relative mt-6 grid gap-3">
              {recognition.map(({ metric, title, detail }) => (
                <div key={metric} className="glass-soft rounded-2xl p-5">
                  <p className="text-gradient text-2xl font-semibold tracking-tight sm:text-3xl">{metric}</p>
                  <p className="mt-2 text-sm font-medium text-fg">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{detail}</p>
                </div>
              ))}
            </div>
            {certificates.length > 0 && (
              <ul className="relative mt-5 space-y-2 border-t border-line pt-5">
                {certificates.map(({ name, url }) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-sm text-muted transition-colors hover:text-fg">
                      <LuFileText aria-hidden className="mt-0.5 shrink-0" />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Spotlight>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
