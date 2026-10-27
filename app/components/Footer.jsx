"use client";

import { FiArrowUp, FiMail } from "react-icons/fi";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Saurabh8423",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saurabh-kumar-091741209/",
  },
  {
    icon: FaXTwitter,
    label: "X",
    href: "https://x.com/Saurabh26393134",
  },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-page-soft">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_auto]">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-semibold text-ink">
              Saurabh<span className="text-brand">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
              Full-stack web development, AI automation, chatbots and SaaS products. From architecture to deployment.
            </p>
            <a
              href="mailto:saurabhch9369@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
            >
              <FiMail aria-hidden="true" /> saurabhch9369@gmail.com
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Elsewhere
            </p>
            <ul className="mt-4 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-icon"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-center text-sm text-ink-faint sm:text-left">
            © {new Date().getFullYear()} Saurabh Kumar. Designed &amp; built with
            Next.js.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-brand"
          >
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
