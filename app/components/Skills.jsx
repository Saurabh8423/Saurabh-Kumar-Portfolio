import Counter from "./Counter";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { GlassTile, Spotlight } from "./ui/Glass";
import { skillGroups, techCount } from "./data/skillsData";

const roles = ["Frontend", "Backend & data", "AI & automation", "DevOps & tools"];
const tag = (group, i) => group.items.map((t) => ({ ...t, role: roles[i] }));
const rows = [
  [...tag(skillGroups[0], 0), ...tag(skillGroups[2], 2)],
  [...tag(skillGroups[1], 1), ...tag(skillGroups[3], 3)],
];

/** Monochrome glass icon that picks up the technology's brand colour on hover. */
function TechIcon({ Icon, color, size = "md" }) {
  return (
    <GlassTile size={size} style={{ "--brand": color ?? "var(--color-fg)" }}>
      <Icon className={`${size === "sm" ? "size-3.5" : "size-5"} transition-colors duration-300 group-hover:text-[var(--brand)]`} />
    </GlassTile>
  );
}

function TechList({ items, hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
      {items.map((t) => (
        <li key={t.name} className="glass group flex w-60 shrink-0 items-center gap-3.5 rounded-2xl px-4 py-4 transition-transform duration-500 hover:-translate-y-1">
          <TechIcon {...t} />
          <span className="min-w-0">
            <span className="block truncate font-medium text-fg">{t.name}</span>
            <span className="block truncate text-[0.72rem] text-subtle transition-colors group-hover:text-fg/80">{t.role}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Row({ items, reverse = false, label }) {
  return (
    <div>
      <h3 className="sr-only">{label}</h3>
      <div
        className={`flex w-max hover:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: "70s" }}
      >
        <TechList items={items} />
        <TechList items={items} hidden />
      </div>
    </div>
  );
}

const stats = [
  { value: String(techCount), label: "Technologies" },
  { value: String(skillGroups.length), label: "Domains" },
  { value: "400+", label: "DSA problems solved" },
  { value: "5+", label: "Years building" },
];

export default function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title" className="overflow-hidden">
      <SectionHeading
        id="skills-title"
        eyebrow="Toolkit"
        title="The right tools, connected by experience."
        description="The stack I build with every day, chosen for performance, developer experience and long-term maintainability."
        align="center"
      />

      <Stagger as="ul" className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <StaggerItem as="li" key={label} className="glass rounded-2xl px-4 py-5 text-center">
            <Counter value={value} className="block text-3xl font-semibold tracking-tight text-fg sm:text-4xl" />
            <span className="mt-1.5 block text-xs text-subtle">{label}</span>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mask-fade-x mt-12 space-y-3 overflow-hidden py-2">
        <Row items={rows[0]} label="Frontend, AI and automation" />
        <Row items={rows[1]} reverse label="Backend, data, DevOps and tools" />
      </Reveal>

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
        {skillGroups.map(({ index, title, items }) => (
          <StaggerItem key={title} className="h-full">
            <Spotlight className="group relative h-full overflow-hidden rounded-3xl border border-line bg-ink-900 p-6 shadow-card transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20 sm:p-7">
              <div aria-hidden className="hairline-top absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-fg">{title}</h3>
                <span className="font-mono text-xs text-subtle">
                  <span className="text-fg">{index}</span> · {items.length} tools
                </span>
              </div>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {items.map((t) => (
                  <li
                    key={t.name}
                    style={{ "--brand": t.color ?? "var(--color-fg)" }}
                    className="group/chip inline-flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 text-[0.78rem] text-muted transition-colors duration-300 hover:border-white/20 hover:text-fg"
                  >
                    <span className="grid size-6 place-items-center rounded-full bg-white/[0.06]">
                      <t.Icon className="size-3.5 transition-colors duration-300 group-hover/chip:text-[var(--brand)]" aria-hidden />
                    </span>
                    {t.name}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
