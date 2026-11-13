"use client";

import { LuArrowUpRight, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { Container } from "./ui/Section";
import { GlassIcon, Logo } from "./ui/Glass";
import { Reveal } from "./ui/Reveal";
import { navLinks } from "./Navbar";
import { services } from "./Services";
import { contact } from "./Contact";

const socials = [
  { label: "GitHub", href: "https://github.com/Saurabh8423" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saurabh-kumar-091741209/" },
  { label: "X", href: "https://x.com/Saurabh26393134" },
];

const linkClass =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-sm text-muted transition-[color,background-size] duration-300 hover:bg-[length:100%_1px] hover:text-fg";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-950">
      <div aria-hidden className="hairline-top absolute inset-x-0 top-0 h-px" />
      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Full-stack web development, AI automation, chatbots, SaaS products and mobile apps, from architecture to deployment.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-soft inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:text-fg"
                >
                  {s.label}
                  <LuArrowUpRight className="size-3" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="col-span-1 lg:col-span-2">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Navigate</h2>
          <ul className="mt-5 space-y-3">
            {[...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-1 lg:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.title}>
                <a href="#services" className={linkClass}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li>
              <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-3 break-all transition-colors hover:text-fg">
                <GlassIcon icon={LuMail} size="sm" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="group inline-flex items-center gap-3 transition-colors hover:text-fg">
                <GlassIcon icon={LuPhone} size="sm" />
                {contact.phone}
              </a>
            </li>
            <li className="group flex items-center gap-3">
              <GlassIcon icon={LuMapPin} size="sm" />
              {contact.location}
            </li>
          </ul>
        </div>
      </Container>

      <Container aria-hidden>
        <Reveal y={40}>
          <p className="text-gradient select-none text-center text-[clamp(3.5rem,16vw,14rem)] font-semibold leading-[0.8] tracking-[-0.06em] opacity-20">
            SAURABH
          </p>
        </Reveal>
      </Container>

      <Container>
        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Saurabh Kumar. Designed &amp; built with Next.js.</p>
          <a href="#home" className="transition-colors hover:text-fg">
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
