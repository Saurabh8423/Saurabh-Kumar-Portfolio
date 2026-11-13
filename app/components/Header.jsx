import Image from "next/image";
import { LuBot, LuCheck, LuCodeXml, LuLayoutDashboard, LuMessagesSquare, LuSearch, LuSmartphone, LuBrainCircuit } from "react-icons/lu";
import { assets } from "@/assets/assets";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Section";
import { GlassIcon } from "./ui/Glass";
import { ScrollTilt } from "./ui/Motion";
import AsciiField from "./visuals/AsciiField";
import HeroVisual from "./visuals/HeroVisual";

const delay = (ms) => ({ "--d": `${ms}ms` });

const highlights = ["Based in New Delhi", "Founder & CEO of TooleraAI", "Open to full-time & freelance"];

// Headline split into words for the staggered blur-in; `accent` words get the silver sheen.
const headline = [
  [{ text: "I" }, { text: "Build" }, { text: "Digital" }, { text: "Products" }, { text: "That" }],
  [{ text: "Turn", accent: true }, { text: "Ideas", accent: true }, { text: "Into", accent: true }, { text: "Reality.", accent: true }],
];
const lineOffset = [0, headline[0].length];

const builds = [
  { title: "Full-stack web apps", icon: LuCodeXml },
  { title: "AI automation", icon: LuBot },
  { title: "AI chatbots", icon: LuMessagesSquare },
  { title: "SaaS products", icon: LuLayoutDashboard },
  { title: "iOS & Android apps", icon: LuSmartphone },
  { title: "Machine learning", icon: LuBrainCircuit },
  { title: "Technical SEO", icon: LuSearch },
];

function BuildStrip({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
      {builds.map((s) => (
        <li
          key={s.title}
          className="group flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-white/[0.03] py-3 pl-3 pr-5 text-sm text-muted transition-colors hover:text-fg"
        >
          <GlassIcon icon={s.icon} size="sm" />
          {s.title}
        </li>
      ))}
    </ul>
  );
}

// Entrance animations here are pure CSS so the hero is visible before hydration.
export default function Header() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-line bg-ink-900 pt-32 sm:rounded-[2.25rem] sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <AsciiField className="absolute inset-0 opacity-25 sm:opacity-100 [mask-image:radial-gradient(ellipse_42%_38%_at_50%_42%,transparent_55%,#000_100%)]" />
          <div className="absolute left-1/2 top-[-16rem] h-[34rem] w-[min(64rem,140vw)] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgb(var(--fg-rgb)/0.12),transparent)]" />
        </div>

        <Container className="flex flex-col items-center text-center">
          <p
            className="enter glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 text-[0.7rem] font-medium tracking-[0.14em] text-muted sm:text-xs"
            style={delay(0)}
          >
            <Image src={assets.profile_img} alt="" width={24} height={24} className="size-6 rounded-full object-cover" priority />
            <span className="size-1.5 animate-pulse-soft rounded-full bg-white shadow-[0_0_10px_2px_rgb(var(--fg-rgb)/0.7)]" />
            FULL STACK DEVELOPMENT &amp; AI SOLUTIONS
          </p>

          <p className="enter mt-6 text-sm font-medium text-muted sm:text-base" style={delay(40)}>
            Hi, I’m <span className="text-fg">Saurabh Kumar</span>
          </p>

          <h1
            id="hero-title"
            className="mt-3 max-w-5xl text-balance text-[clamp(2.3rem,8.4vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg"
          >
            {headline.map((line, i) => (
              <span key={i} className="block">
                {line.map((w, j) => (
                  <span key={w.text}>
                    <span className="word-in" style={delay(80 + (lineOffset[i] + j) * 70)}>
                      <span className={w.accent ? "text-gradient" : undefined}>{w.text}</span>
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="enter mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg" style={delay(650)}>
            Full-stack web apps, practical AI automation and chatbots, SaaS products and cross-platform mobile apps,
            taken from first idea to production.
          </p>

          <div className="enter mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row" style={delay(780)}>
            <ButtonLink href="#work" size="lg" arrow className="w-full sm:w-auto">
              Explore my work
            </ButtonLink>
            <ButtonLink href="/Saurabh-Kumar.pdf" download variant="secondary" size="lg" className="w-full sm:w-auto">
              Download résumé
            </ButtonLink>
          </div>

          <ul className="enter mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-subtle" style={delay(860)} aria-label="At a glance">
            {highlights.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5">
                <LuCheck className="size-3.5 text-accent-soft" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </Container>

        <div className="enter mt-16 pb-6 sm:mt-24" style={delay(980)}>
          <Container>
            <p className="flex items-center gap-4 text-xs text-subtle">
              <span className="hairline-top h-px flex-1" />
              What I build
              <span className="hairline-top h-px flex-1" />
            </p>
          </Container>
          <div className="mask-fade-x mt-5 overflow-hidden">
            <div className="flex w-max animate-marquee [animation-duration:60s] hover:[animation-play-state:paused]">
              <BuildStrip />
              <BuildStrip hidden />
            </div>
          </div>
        </div>
      </div>

      <Container className="enter relative mt-16 pb-8 sm:mt-20" style={delay(1100)}>
        <div className="mx-auto max-w-6xl">
          <ScrollTilt>
            <HeroVisual />
          </ScrollTilt>
        </div>
      </Container>
    </section>
  );
}
