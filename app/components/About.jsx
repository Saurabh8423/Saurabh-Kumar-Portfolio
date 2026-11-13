import Image from "next/image";
import { LuBot, LuCodeXml, LuGauge, LuMessagesSquare, LuServerCog, LuSmartphone } from "react-icons/lu";
import { assets } from "@/assets/assets";
import { Section, SectionHeading } from "./ui/Section";
import { FlyIn, Reveal } from "./ui/Reveal";
import { GlassIcon, Spotlight } from "./ui/Glass";
import { Cycle } from "./ui/Motion";

const pillars = [
  { icon: LuCodeXml, title: "Full-stack engineering", description: "Responsive interfaces and reliable APIs with Next.js, TypeScript and Node.js." },
  { icon: LuBot, title: "AI automation", description: "n8n and Playwright workflows for content, SEO and personalised outreach." },
  { icon: LuMessagesSquare, title: "Chatbots", description: "WhatsApp chatbots and assistants that answer from uploaded PDFs." },
  { icon: LuSmartphone, title: "Mobile apps", description: "iOS and Android apps with Flutter, React Native and Capacitor." },
  { icon: LuServerCog, title: "Production DevOps", description: "Docker, Nginx, PM2 and GitHub Actions CI/CD on Linux VPS." },
  { icon: LuGauge, title: "SEO & performance", description: "Technical SEO, structured data and fast, accessible pages." },
];

// Each card arrives from its own side.
const entrances = [
  { x: -90, y: -40, rotate: -4 },
  { x: 90, y: -40, rotate: 4 },
  { x: -120, y: 0, rotate: -2 },
  { x: 120, y: 0, rotate: 2 },
  { x: -90, y: 50, rotate: 4 },
  { x: 90, y: 50, rotate: -4 },
];

const facts = [
  { label: "Role", value: "Founder & CEO, TooleraAI" },
  { label: "Currently", value: "Full Stack & AI Developer" },
  { label: "Degree", value: "B.Tech CS & IT" },
  { label: "Based in", value: "Saket, New Delhi" },
];

export default function About() {
  return (
    <Section id="about" labelledBy="about-title" className="border-y border-line bg-ink-900/40">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            id="about-title"
            eyebrow="About me"
            title="A builder’s mindset, from interface to infrastructure."
            description={
              <>
                I’m Saurabh Kumar, Founder &amp; CEO of{" "}
                <a href="https://tooleraai.com" target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                  TooleraAI
                </a>{" "}
                and a Full Stack &amp; AI Developer at ForestGate Global Advisors, where I architected and launched YogiAI.live
                and StudyMates.live: two live SaaS platforms, built end to end.
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
              Two years of professional company experience and over five years of development: React and Next.js
              interfaces, backend APIs, n8n and Playwright automations, WhatsApp and PDF chatbots, and SaaS products
              shipped from architecture to deployment.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <FlyIn as="li" key={p.title} from={entrances[i]} delay={Math.floor(i / 2) * 0.12 + (i % 2) * 0.06}>
                <Spotlight className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-900 p-5 shadow-card transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20">
                  <div className="relative flex items-start justify-between">
                    <GlassIcon icon={p.icon} />
                    <span className="font-mono text-[0.68rem] text-subtle transition-colors group-hover:text-fg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative mt-5 font-semibold tracking-tight text-fg">{p.title}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
                  <span
                    aria-hidden
                    className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-white/60 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                </Spotlight>
              </FlyIn>
            ))}
          </ul>
        </div>

        <Reveal className="relative min-w-0 lg:sticky lg:top-28 lg:self-start lg:pt-10" delay={0.1}>
          <div aria-hidden className="absolute inset-0 -z-10 translate-y-6 scale-90 rounded-full bg-white/[0.07] blur-3xl" />
          <Spotlight className="group relative overflow-hidden rounded-3xl border border-line-strong bg-ink-900/90 p-3 shadow-[var(--shadow-deep)]">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-850">
              <Image
                src={assets.user_image}
                alt="Saurabh Kumar"
                quality={90}
                className="aspect-[4/4.2] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 34rem"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="glass absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-fg">
                <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" />
                Available for new projects
              </span>
            </div>
            <div className="relative px-3 pb-2 pt-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-subtle">Saurabh Kumar</p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-fg">
                <Cycle items={["Full Stack Developer", "AI Automation Developer", "Chatbot Developer", "Mobile App Developer"]} interval={2200} />
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-2">
                {facts.map(({ label, value }) => (
                  <div key={label} className="glass-soft rounded-xl px-3 py-2.5">
                    <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-subtle">{label}</dt>
                    <dd className="mt-0.5 text-sm text-fg">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </Section>
  );
}
