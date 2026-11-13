"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

// Illustrative runs modelled on the kinds of automations in the Work section.
const runs = [
  {
    steps: [
      { event: "webhook.received", detail: "form/contact", tone: "text-signal" },
      { event: "agent.classify", detail: 'intent: "new project"', tone: "text-accent-soft" },
      { event: "crm.upsert", detail: "contact created", tone: "text-ok" },
      { event: "reply.draft", detail: "awaiting review", tone: "text-warn" },
      { event: "team.notify", detail: "whatsapp", tone: "text-ok" },
    ],
    output: "Qualified: web app project. Lead saved and a reply drafted for review.",
  },
  {
    steps: [
      { event: "schedule.tick", detail: "daily 09:00", tone: "text-signal" },
      { event: "ai.generate", detail: "video + 4 images", tone: "text-accent-soft" },
      { event: "youtube.upload", detail: "published", tone: "text-ok" },
      { event: "instagram.post", detail: "published", tone: "text-ok" },
      { event: "run.complete", detail: "3 channels", tone: "text-warn" },
    ],
    output: "Content generated once and published to YouTube, Facebook and Instagram.",
  },
  {
    steps: [
      { event: "pdf.uploaded", detail: "handbook.pdf", tone: "text-signal" },
      { event: "doc.index", detail: "42 pages", tone: "text-accent-soft" },
      { event: "chat.question", detail: '"leave policy?"', tone: "text-ok" },
      { event: "answer.cite", detail: "page 12", tone: "text-warn" },
      { event: "run.complete", detail: "answered", tone: "text-ok" },
    ],
    output: "Answered from the uploaded PDF, with the page it came from.",
  },
];

const MAX_LINES = 7;
const CHAR_MS = 24;
const START_SECONDS = 9 * 3600 + 41 * 60 + 2;

function clock(s) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
}

const firstLines = runs[0].steps.map((s, i) => ({ ...s, id: i, t: clock(START_SECONDS + Math.floor(i / 2)) }));

/**
 * Terminal-style run log: each event types itself out, finished lines scroll up
 * and fade, and the output is written once a run completes. Pauses off screen.
 */
export default function LiveRunLog() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();

  const [lines, setLines] = useState(firstLines);
  const [typed, setTyped] = useState(Infinity);
  const [output, setOutput] = useState(runs[0].output);
  const [writing, setWriting] = useState(false);
  const pos = useRef({ run: 1, step: 0, id: firstLines.length, seconds: START_SECONDS + 3 });

  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    const timers = new Set();
    const sleep = (ms) =>
      new Promise((resolve) => {
        const h = setTimeout(() => {
          timers.delete(h);
          resolve();
        }, ms);
        timers.add(h);
      });

    (async () => {
      await sleep(600);
      while (!cancelled) {
        const p = pos.current;
        const run = runs[p.run];

        for (; p.step < run.steps.length; p.step++) {
          const step = run.steps[p.step];
          p.seconds += p.step === 0 ? 3 : Math.random() < 0.5 ? 0 : 1;
          const line = { ...step, id: p.id++, t: clock(p.seconds) };
          setLines((prev) => [...prev, line].slice(-MAX_LINES));
          setTyped(0);
          const total = step.event.length + 1 + step.detail.length;
          for (let c = 1; c <= total; c++) {
            await sleep(CHAR_MS);
            if (cancelled) return;
            setTyped(c);
          }
          await sleep(420);
          if (cancelled) return;
        }

        setWriting(true);
        for (let c = 0; c <= run.output.length; c++) {
          setOutput(run.output.slice(0, c));
          await sleep(16);
          if (cancelled) return;
        }
        setWriting(false);
        await sleep(2400);
        p.run = (p.run + 1) % runs.length;
        p.step = 0;
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  const last = lines[lines.length - 1];

  return (
    <div ref={ref}>
      <div className="font-mono text-[0.7rem] leading-relaxed">
        <p className="mb-3 flex items-center justify-between text-subtle">
          <span>run log</span>
          <span className="inline-flex items-center gap-1.5 text-ok">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" />
            live
          </span>
        </p>
        <ol className="flex h-48 flex-col justify-end gap-2 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_30%)]">
          <AnimatePresence initial={false} mode="popLayout">
            {lines.map((l) => {
              const active = l === last && typed !== Infinity;
              const eventText = active ? l.event.slice(0, typed) : l.event;
              const detailText = active ? l.detail.slice(0, Math.max(0, typed - l.event.length - 1)) : l.detail;
              const done = !active || typed >= l.event.length + 1 + l.detail.length;
              return (
                <motion.li
                  key={l.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex min-w-0 shrink-0 gap-3"
                >
                  <span className="shrink-0 text-subtle/70">{l.t}</span>
                  <span className="min-w-0">
                    <span className={l.tone}>{eventText}</span> <span className="text-muted">{detailText}</span>
                    {active && !done && <Caret />}
                  </span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>
      <div className="mt-5 hidden rounded-lg border border-line bg-ink-900 p-3 lg:block">
        <p className="font-mono text-[0.65rem] uppercase tracking-wider text-subtle">agent output</p>
        <p className="mt-2 min-h-[3.75rem] text-xs leading-relaxed text-muted">
          “{output}
          {writing ? <Caret /> : "”"}
        </p>
      </div>
    </div>
  );
}

function Caret() {
  return <span className="ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.2em] animate-pulse-soft bg-white/80" />;
}
