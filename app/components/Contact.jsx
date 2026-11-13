"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuCircleAlert, LuCircleCheck, LuLoaderCircle, LuMail, LuMapPin, LuPhone, LuSend } from "react-icons/lu";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { GlassIcon } from "./ui/Glass";
import { Button } from "./ui/Button";

export const contact = {
  email: "saurabhch9369@gmail.com",
  phone: "+91 84236 26340",
  phoneHref: "tel:+918423626340",
  location: "Saket, New Delhi, India",
};

const nextSteps = [
  "I review your message and reply with any questions.",
  "A short call to understand your goals and constraints.",
  "You receive a clear plan with scope, timeline and budget.",
];

const emptyForm = { name: "", email: "", message: "", company: "" };
const inputBase =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 text-[0.95rem] text-fg placeholder:text-subtle transition-[border-color,background-color,box-shadow] duration-200 outline-none hover:border-line-strong focus:border-white/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgb(var(--fg-rgb)/0.06)]";

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Request failed");
      setStatus({ type: "success", message: "Message sent. I’ll reply soon." });
      setForm(emptyForm);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="contact" labelledBy="contact-title" className="overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[30rem] w-[min(60rem,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--fg-rgb)/0.07),transparent)]"
      />
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Let’s connect"
            title="Tell me what you want to build."
            description="Open to full-time roles and freelance product work. Share a few details about your idea: no commitment, just a conversation about what’s possible."
          />
          <Reveal delay={0.1}>
            <ol className="mt-10 space-y-5">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="glass grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs text-white">{i + 1}</span>
                  <p className="pt-0.5 text-sm leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-10 space-y-3 border-t border-line pt-8 text-sm text-muted">
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
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="glass relative rounded-3xl p-5 shadow-[var(--shadow-deep)] sm:p-8">
            <div aria-hidden className="hairline-top absolute inset-x-8 top-0 h-px" />
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Your name">
                  <input id="name" name="name" value={form.name} onChange={onChange} required maxLength={100} autoComplete="name" placeholder="Jane Doe" className={`${inputBase} h-12`} />
                </Field>
                <Field id="email" label="Your email">
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required maxLength={200} autoComplete="email" placeholder="jane@company.com" className={`${inputBase} h-12`} />
                </Field>
              </div>
              <Field id="message" label="Message">
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={6}
                  maxLength={4000}
                  placeholder="Tell me about your project, timeline and budget…"
                  className={`${inputBase} resize-y py-3 leading-relaxed`}
                />
                <p className="mt-1.5 text-right font-mono text-[0.7rem] text-subtle">{form.message.length}/4000</p>
              </Field>

              {/* Honeypot: hidden from people, catches naive spam bots */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" value={form.company} onChange={onChange} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-subtle">I usually reply within a day.</p>
                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                  {loading ? (
                    <>
                      <LuLoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <LuSend className="size-4" aria-hidden />
                    </>
                  )}
                </Button>
              </div>

              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  {status && (
                    <motion.div
                      key={status.type}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${
                        status.type === "success" ? "border-ok/30 bg-ok/10 text-ok" : "border-danger/30 bg-danger/10 text-danger"
                      }`}
                    >
                      {status.type === "success" ? <LuCircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden /> : <LuCircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />}
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
