"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { LuMenu, LuX } from "react-icons/lu";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Section";
import { Logo } from "./ui/Glass";
import { ThemeToggle } from "./ui/ThemeToggle";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(null);
  const toggleRef = useRef(null);
  const { scrollY } = useScroll();

  // Tuck the bar away while scrolling down; bring it back on any scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
    const prev = scrollY.getPrevious() ?? 0;
    if (y > 240 && y > prev + 2) setHidden(true);
    else if (y < prev - 2) setHidden(false);
  });

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close on Escape, lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const pill = hovered ?? active;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden && !open ? "-130%" : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      onFocusCapture={() => setHidden(false)}
    >
      <Container className={`transition-[padding] duration-500 ${solid ? "pt-3" : "pt-4"}`}>
        <div
          className={`flex h-16 items-center justify-between gap-6 rounded-full transition-[background-color,box-shadow,padding] duration-500 ${
            solid ? "glass px-3 pl-5" : "px-3 pl-5"
          }`}
        >
          <a href="#home" className="rounded-md" aria-label="Saurabh Kumar — back to top" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  {pill === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="glass-soft absolute inset-0 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <a
                    href={link.href}
                    aria-current={active === link.href ? "true" : undefined}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors hover:text-fg ${
                      active === link.href ? "text-fg" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <ButtonLink href="#contact" size="md" arrow>
                Let’s talk
              </ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="glass grid size-11 place-items-center rounded-full text-fg transition-transform active:scale-95 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <LuX className="size-5" aria-hidden /> : <LuMenu className="size-5" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="absolute inset-x-0 top-[5rem] h-[calc(100dvh-5rem)] overflow-y-auto bg-ink-950/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Container className="flex flex-col gap-8 py-8">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {[...navLinks, { label: "Contact", href: "#contact" }].map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight text-fg"
                      >
                        {link.label}
                        <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <ButtonLink href="#contact" size="lg" arrow onClick={() => setOpen(false)} className="w-full">
                Let’s talk
              </ButtonLink>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
