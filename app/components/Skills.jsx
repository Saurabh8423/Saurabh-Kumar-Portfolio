"use client";

import { FiLayers } from "react-icons/fi";
import useReveal from "@/app/hooks/useReveal";
import Counter from "./Counter";
import TiltCard from "./TiltCard";
import { coreStack, skillGroups, techCount } from "./data/skillsData";

/** Large pill for the scrolling ribbon */
function Logo({ name, Icon, color }) {
  return (
    <span className="skill-pill">
      <span className="skill-pill-icon" style={{ "--pill-color": color }}>
        <Icon aria-hidden="true" />
      </span>
      {name}
    </span>
  );
}

/** Compact chip for the category cards — same treatment, smaller */
function TechChip({ name, Icon, color }) {
  return (
    <li className="chip chip-tech">
      <span className="chip-tech-icon" style={{ "--chip-icon": color }}>
        <Icon aria-hidden="true" />
      </span>
      {name}
    </li>
  );
}

export default function Skills() {
  const scope = useReveal({ stagger: 0.1 });

  const stats = [
    { value: String(techCount), label: "Technologies" },
    { value: String(skillGroups.length), label: "Domains" },
    { value: "400+", label: "DSA problems" },
  ];

  return (
    <section id="skills" ref={scope} className="section">
      {/* Heading + stats */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-end lg:gap-16">
        <div data-reveal>
          <span className="eyebrow">
            <FiLayers aria-hidden="true" /> Toolkit
          </span>
          <h2 className="heading mt-4">Skills &amp; stack</h2>
        </div>

        <dl
          data-reveal
          className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-page px-4 py-4">
              <dt className="sr-only">{label}</dt>
              <dd>
                <Counter
                  value={value}
                  className="metric block text-2xl sm:text-3xl"
                />
                <span className="mt-1.5 block text-[11px] text-ink-faint">
                  {label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Core stack — one ribbon, brand colours always on */}
      <div data-reveal className="mt-14">
        <div className="mb-4 flex items-center gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Core stack
          </span>
          <span className="rule flex-1" aria-hidden="true" />
        </div>

        <div className="marquee">
          <div className="marquee-track">
            <span className="flex gap-3">
              {coreStack.map((tech) => (
                <Logo key={tech.name} {...tech} />
              ))}
            </span>
            {/* Duplicate keeps the loop seamless; hidden from screen readers */}
            <span className="flex gap-3" aria-hidden="true">
              {coreStack.map((tech) => (
                <Logo key={`${tech.name}-dup`} {...tech} />
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Everything else, by domain */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {skillGroups.map(({ index, title, items }) => (
          <div key={title} data-reveal className="h-full">
            <TiltCard
              max={3}
              lift={8}
              sceneClassName="h-full"
              className="h-full p-6 sm:p-7"
            >
              <div className="depth-1 flex items-start justify-between gap-4">
                <span className="font-serif text-3xl leading-none text-ink-faint/35">
                  {index}
                </span>
                <span className="chip">{items.length}</span>
              </div>

              <h3 className="depth-1 mt-5 font-semibold text-ink">{title}</h3>

              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <TechChip key={item.name} {...item} />
                ))}
              </ul>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}
