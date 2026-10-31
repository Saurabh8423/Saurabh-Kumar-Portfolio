"use client";

import Image from "next/image";
import { FiCode, FiCpu, FiServer, FiUser } from "react-icons/fi";
import { assets } from "@/assets/assets";
import useReveal from "@/app/hooks/useReveal";
import TiltCard from "./TiltCard";

const pillars = [
  {
    icon: FiCode,
    kicker: "01",
    title: "Full Stack",
    description: "Responsive interfaces and reliable APIs with Next.js, TypeScript and Node.js.",
  },
  {
    icon: FiCpu,
    kicker: "02",
    title: "Chatbots & Automation",
    description: "n8n and Playwright workflows, WhatsApp chatbots and PDF-based question answering.",
  },
  {
    icon: FiServer,
    kicker: "03",
    title: "Production DevOps",
    description: "Reliable deployments with Docker, Nginx, PM2 and automated CI/CD on Linux VPS.",
  },
];

const facts = [
  { label: "Role", value: "Founder & CEO" },
  { label: "Building", value: "TooleraAI" },
  { label: "Degree", value: "B.Tech CS & IT — 7.50 DGPA" },
  { label: "Based in", value: "Saket, New Delhi, India" },
];

const About = () => {
  const scope = useReveal();

  return (
    <section id="about" ref={scope} className="section">
      <div data-reveal className="max-w-2xl">
        <span className="eyebrow">
          <FiUser aria-hidden="true" /> Introduction
        </span>
        <h2 className="heading mt-4">Full-stack foundations. Products that deliver.</h2>
      </div>

      <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
        {/* Portrait + facts */}
        <div className="space-y-6">
          <div data-reveal className="scene">
            <div className="tilt relative overflow-hidden rounded-2xl border border-line">
              <Image
                src={assets.user_image}
                alt="Saurabh Kumar"
                quality={90}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 20rem"
              />
              <span
                aria-hidden="true"
                className="tilt-glare absolute inset-0"
              />
            </div>
          </div>

          <dl
            data-reveal
            className="divide-y divide-line overflow-hidden rounded-xl border border-line"
          >
            {facts.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 px-4 py-3"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                  {label}
                </dt>
                <dd className="text-right text-sm font-medium text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Copy + pillars */}
        <div className="min-w-0">
          <div data-reveal>
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">
              Thoughtful interfaces. Reliable systems. Software people can <span className="hl">use every day.</span>
            </p>
            <p className="lede mt-6">
              I’m Saurabh Kumar, founder of <a href="https://tooleraai.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">TooleraAI</a> and a Full Stack &amp; AI Developer at{" "}
              <span className="font-semibold text-ink">
                ForestGate Global Advisors
              </span>
              , where I architected and launched{" "}
              <span className="hl">YogiAI.live</span> and{" "}
              <span className="hl">StudyMates.live</span> — two live SaaS
              platforms, built end to end. With TooleraAI, I’m bringing that same approach to fast, accessible online utilities for everyday work.
            </p>
            <p className="lede mt-4">
              I bring 2 years of professional company experience and over 5 years of relevant development experience, building React and Next.js interfaces, backend APIs and complete web applications. I also create n8n and Playwright automations for content, SEO and outreach, develop WhatsApp and PDF chatbots, and ship SaaS products from architecture to deployment. I hold a B.Tech in Computer Science &amp; Information Technology from MJP Rohilkhand University.
            </p>
          </div>

          {/* Pillars — numbered, 3D, staggered heights */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, kicker, title, description }, i) => (
              <div
                key={title}
                data-reveal
                className={`h-full ${i === 1 ? "sm:mt-6" : ""}`}
              >
                <TiltCard
                  sceneClassName="h-full"
                  className="flex h-full flex-col p-5"
                >
                  <div className="depth-1 flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-brand-soft text-lg text-brand">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="font-serif text-2xl text-ink-faint/40">
                      {kicker}
                    </span>
                  </div>
                  <h3 className="depth-1 mt-5 font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {description}
                  </p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
