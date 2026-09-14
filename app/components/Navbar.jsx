"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import useDarkMode from "@/app/hooks/useDarkMode";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { toggleTheme } = useDarkMode();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Solidify the bar once the hero scrolls away
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock scroll + close on Escape while the mobile sheet is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-page/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12"
        >
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-ink sm:text-2xl"
          >
            Saurabh<span className="text-brand">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 rounded-xl border border-line bg-surface p-1 backdrop-blur-xl xl:flex">
            {links.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={`block rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "bg-brand-soft text-brand"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-ink-soft transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {/* Driven by the .dark class so it is correct on first paint */}
              <FiSun className="text-lg dark:hidden" />
              <FiMoon className="hidden text-lg dark:block" />
            </button>

            <a href="#contact" className="btn btn-primary hidden py-2.5! text-sm sm:inline-flex">
              Let’s talk
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-ink xl:hidden"
            >
              <FiMenu className="text-lg" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-60 xl:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[min(20rem,82vw)] flex-col gap-2 border-l border-line bg-page px-6 py-6 shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-ink">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-ink"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                active === href.slice(1)
                  ? "bg-brand-soft text-brand"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="btn btn-primary mt-4"
          >
            Let’s talk
          </a>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
