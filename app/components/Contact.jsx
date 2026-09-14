"use client";

import { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import useReveal from "@/app/hooks/useReveal";

const details = [
  {
    icon: FiMail,
    label: "Email",
    value: "saurabhch9369@gmail.com",
    href: "mailto:saurabhch9369@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 84236 26340",
    href: "tel:+918423626340",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Saket, New Delhi, India",
    href: null,
  },
];

const emptyForm = { name: "", email: "", message: "", company: "" };

export default function Contact() {
  const scope = useReveal();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
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

      setStatus({ type: "success", message: "Message sent — I’ll reply soon." });
      setForm(emptyForm);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={scope} className="section">
      <div data-reveal className="max-w-2xl">
        <span className="eyebrow">
          <FiSend aria-hidden="true" /> Connect with me
        </span>
        <h2 className="heading mt-4">Let’s build something great</h2>
        <p className="lede mt-4">
          Open to <span className="hl">full-time roles</span> and freelance
          product work.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[22rem_1fr]">
        {/* Details */}
        <div data-reveal className="card p-6 sm:p-7">
          <h3 className="text-lg font-semibold text-ink">Contact details</h3>
          <ul className="mt-6 space-y-5">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-brand-soft text-brand">
                  <Icon aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-0.5 block wrap-break-word text-sm font-medium text-ink transition-colors hover:text-brand"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-medium text-ink">
                      {value}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form
          data-reveal
          onSubmit={handleSubmit}
          className="card p-6 sm:p-8"
          noValidate={false}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Your name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={100}
                autoComplete="name"
                placeholder="Jane Doe"
                className="field"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-ink"
              >
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={200}
                autoComplete="email"
                placeholder="jane@company.com"
                className="field"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              maxLength={4000}
              placeholder="Tell me about your project, timeline and budget…"
              className="field resize-none"
            />
            <p className="mt-2 text-right text-xs text-ink-faint">
              {form.message.length}/4000
            </p>
          </div>

          {/* Honeypot — hidden from users, catches naive spam bots */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Sending…" : "Send message"}
              {!loading && <FiSend aria-hidden="true" />}
            </button>

            <div aria-live="polite" className="min-h-6">
              {status && (
                <p
                  className={`flex items-center gap-2 text-sm ${
                    status.type === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {status.type === "success" ? (
                    <FiCheckCircle aria-hidden="true" />
                  ) : (
                    <FiAlertCircle aria-hidden="true" />
                  )}
                  {status.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
