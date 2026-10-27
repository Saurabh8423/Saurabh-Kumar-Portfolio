"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiArrowDown, FiDownload, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { gsap } from "@/app/lib/gsap";
import { assets } from "@/assets/assets";
import useTilt from "@/app/hooks/useTilt";
import Counter from "./Counter";
import RotatingRole from "./RotatingRole";

const stats = [
  { value: "2", label: "Years in companies" },
  { value: "5+", label: "Years developing" },
  { value: "3", label: "Flagship products" },
];

const Header = () => {
  const scope = useRef(null);
  const portraitRef = useTilt({ max: 12, lift: 26 });

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-portrait", {
        opacity: 0,
        scale: 0.82,
        rotateY: -18,
        duration: 1.1,
        // Without this GSAP leaves an inline transform behind, which outranks
        // .tilt's CSS transform and the cursor tilt silently stops working.
        clearProps: "transform,opacity",
      })
        .from(
          ".hero-text",
          {
            y: 34,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            clearProps: "transform,opacity",
          },
          "-=0.7"
        )
        .from(
          ".hero-stat",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            clearProps: "transform,opacity",
          },
          "-=0.4"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={scope}
      className="hero-section mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-12 lg:pb-16 lg:pt-28"
    >
      <div className="hero-contours" aria-hidden="true" />
      {/* ---------- Copy ---------- */}
      <div className="order-2 text-center lg:order-1 lg:text-left">
        <div className="hero-text eyebrow">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          Full Stack Developer &amp; Product Builder
        </div>

        <h1 className="hero-text hero-title mt-6 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
          <span className="hero-intro">Hi, I’m Saurabh Kumar</span>
          <RotatingRole />
        </h1>

        <p className="hero-text lede mx-auto mt-4 max-w-lg text-base sm:text-lg lg:mx-0">
          I’m <span className="font-semibold text-ink">Saurabh Kumar</span>. I
          build full-stack web applications, AI automations, conversational chatbots and SaaS products. From React and Next.js to n8n and Playwright, I take ideas to{" "}
          <span className="hl">production</span>.
        </p>

        <div className="hero-text mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-faint lg:justify-start">
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin aria-hidden="true" /> Saket, New Delhi
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
          <a
            href="mailto:saurabhch9369@gmail.com"
            className="link-hover transition-colors hover:text-brand"
          >
            saurabhch9369@gmail.com
          </a>
        </div>

        <div className="hero-text mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
          <a href="#work" className="btn btn-primary w-full sm:w-auto">
            Explore my work <FiArrowDown aria-hidden="true" />
          </a>
          <a
            href="/Saurabh-Kumar.pdf"
            download
            className="btn btn-ghost w-full sm:w-auto"
          >
            Résumé <FiDownload aria-hidden="true" />
          </a>
          <div className="flex items-center gap-2.5 sm:ml-1">
            <a
              href="https://github.com/Saurabh8423"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="social-icon"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/saurabh-kumar-091741209/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="social-icon"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Stats */}
        <dl className="hero-stats mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="hero-stat bg-page px-3 py-4 text-center sm:px-5 lg:text-left"
            >
              <dt className="sr-only">{label}</dt>
              <dd>
                <Counter
                  value={value}
                  className="metric block text-2xl sm:text-3xl"
                />
                <span className="mt-1.5 block text-[11px] leading-snug text-ink-faint sm:text-xs">
                  {label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- Portrait ---------- */}
      <div className="hero-portrait-scene scene order-1 mx-auto w-full max-w-[15rem] sm:max-w-[19rem] lg:order-2 lg:max-w-sm">
        <div ref={portraitRef} className="hero-portrait tilt portrait">
          <span className="portrait-glow" aria-hidden="true" />
          <span className="portrait-orbit" aria-hidden="true" />
          <span className="portrait-ring" aria-hidden="true" />

          <div
            className="portrait-photo"
            onMouseEnter={(event) => {
              if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
              gsap.fromTo(event.currentTarget, { rotationY: 0 }, {
                rotationY: 360,
                duration: 1.4,
                ease: "power2.inOut",
                overwrite: true,
              });
            }}
          >
            <Image
              src={assets.profile_img}
              alt="Saurabh Kumar"
              width={1254}
              height={1254}
              quality={90}
              priority
              sizes="(max-width: 640px) 15rem, (max-width: 1024px) 19rem, 24rem"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="portrait-label portrait-label-top"><span /> Building TooleraAI</span>
        </div>
      </div>
    </section>
  );
};

export default Header;
