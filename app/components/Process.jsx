import { LuArrowUpRight, LuCodeXml, LuCompass, LuPenTool, LuRocket } from "react-icons/lu";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { GlassIcon, Spotlight } from "./ui/Glass";
import { Converge } from "./ui/Motion";
import { ButtonLink } from "./ui/Button";

const steps = [
  {
    icon: LuCompass,
    title: "Discover",
    summary: "Understand the problem.",
    detail: "Start with your users, goals and constraints, then turn the idea into a focused scope and a clear product direction.",
    outcome: "Scope, milestones & estimate",
  },
  {
    icon: LuPenTool,
    title: "Design",
    summary: "Shape the experience.",
    detail: "Map the flows, structure the interface and choose an architecture that fits the product and its next steps.",
    outcome: "Approved flows & architecture",
  },
  {
    icon: LuCodeXml,
    title: "Build",
    summary: "Develop and connect.",
    detail: "Build the interface and APIs, connect AI or automation where it genuinely helps, and share working previews along the way.",
    outcome: "Working preview every sprint",
  },
  {
    icon: LuRocket,
    title: "Launch",
    summary: "Deploy and improve.",
    detail: "Test the key journeys, deploy with CI/CD and monitoring, then use real feedback to decide what comes next.",
    outcome: "Live product & full handover",
  },
];

export default function Process() {
  return (
    <>
      <Section id="process" labelledBy="process-title" className="overflow-hidden border-y border-line bg-ink-900/40">
        <SectionHeading
          id="process-title"
          eyebrow="The process"
          title="A clear path from idea to launch."
          description="Four focused phases, each with a visible outcome, with design and engineering working together throughout."
          align="center"
        />
        <Converge
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          items={steps.map((step, i) => (
            <Reveal key={step.title} className="h-full">
              <Spotlight className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-900 p-6 shadow-card transition-[border-color] duration-500 hover:border-white/20">
                <div className="relative flex items-start justify-between">
                  <GlassIcon icon={step.icon} size="lg" />
                  <span className="font-mono text-xs text-subtle">
                    <span className="text-fg">0{i + 1}</span> / 0{steps.length}
                  </span>
                </div>
                <h3 className="relative mt-8 text-xl font-semibold tracking-tight text-fg">{step.title}</h3>
                <p className="relative mt-1 text-sm font-medium text-fg/70">{step.summary}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
                <div className="relative mt-auto pt-6">
                  <p className="glass-soft flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-xs text-fg/80">
                    <span>
                      <span className="block font-mono text-[0.6rem] uppercase tracking-wider text-subtle">You get</span>
                      {step.outcome}
                    </span>
                    <LuArrowUpRight
                      className="size-3.5 shrink-0 text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      aria-hidden
                    />
                  </p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        />
      </Section>

      <section aria-labelledby="resume-title" className="relative overflow-hidden py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[min(56rem,120vw)] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(var(--fg-rgb)/0.08),transparent)]"
        />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-12 text-center shadow-[var(--shadow-deep)] sm:px-12 sm:py-16">
              <div aria-hidden className="hairline-top absolute inset-x-10 top-0 h-px" />
              <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-50" />
              <p className="relative font-mono text-xs uppercase tracking-wider text-subtle">Experience at a glance</p>
              <h2 id="resume-title" className="text-gradient relative mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl sm:tracking-[-0.03em]">
                From the first commit to production.
              </h2>
              <p className="relative mx-auto mt-5 max-w-2xl text-pretty text-muted sm:text-lg">
                Full-stack web development, AI automation, chatbots and SaaS products. My experience, education and skills in one place.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/Saurabh-Kumar.pdf" download size="lg" arrow>
                  Download my résumé
                </ButtonLink>
                <ButtonLink href="#contact" variant="secondary" size="lg">
                  Get in touch
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
