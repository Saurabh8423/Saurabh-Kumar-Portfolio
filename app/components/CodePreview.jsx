"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

const code = [
  "export async function processLead(input: LeadInput) {",
  "  const lead = normalizeLead(input);",
  "  const intent = await ai.classify(lead.message);",
  "  const context = await kb.search(lead.message);",
  "  const contact = await crm.upsert(lead);",
  "  const reply = await ai.draftReply(lead, context);",
  '  if (intent.priority === "high") {',
  "    await notify.team({ contact, intent });",
  "  }",
  "  if (reply.needsReview) {",
  "    await review.queue({ contact, reply });",
  "  }",
  "  await audit.log({ contact, intent });",
  '  return { status: "processed", reply };',
  "}",
  "",
  "function normalizeLead(input: LeadInput): Lead {",
  "  const email = input.email.trim().toLowerCase();",
  "  return { ...input, email };",
  "}",
];

const MAX_LINES = 18;
const CHAR_MS = 22;
const firstLines = code.slice(0, MAX_LINES).map((text, index) => ({ id: index, number: index + 1, text }));
const keywords = new Set(["export", "async", "function", "const", "await", "if", "return"]);

function HighlightedCode({ text }) {
  const parts = text.split(/(export|async|function|const|await|if|return|"[^"]*")/g);
  return parts.map((part, index) => {
    if (keywords.has(part)) return <span className="code-keyword" key={index}>{part}</span>;
    if (/^"/.test(part)) return <span className="code-string" key={index}>{part}</span>;
    return part;
  });
}

export default function CodePreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [lines, setLines] = useState(firstLines);
  const [typed, setTyped] = useState(Infinity);
  const position = useRef({ line: MAX_LINES, id: firstLines.length });

  useEffect(() => {
    if (!inView || reduce) return;
    let cancelled = false;
    const timers = new Set();
    const sleep = (ms) => new Promise((resolve) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        resolve();
      }, ms);
      timers.add(timer);
    });

    (async () => {
      await sleep(700);
      while (!cancelled) {
        const cursor = position.current;
        const sourceLine = code[cursor.line % code.length];
        const line = {
          id: cursor.id++,
          number: (cursor.line % code.length) + 1,
          text: sourceLine,
        };
        cursor.line = (cursor.line + 1) % code.length;
        setLines((previous) => [...previous, line].slice(-MAX_LINES));
        setTyped(0);

        for (let character = 1; character <= sourceLine.length; character++) {
          await sleep(CHAR_MS);
          if (cancelled) return;
          setTyped(character);
        }

        await sleep(420);
        if (cancelled) return;
        setTyped(Infinity);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  const last = lines[lines.length - 1];

  return (
    <ol ref={ref} className="code-run-list" aria-label="Animated code preview">
      <AnimatePresence initial={false} mode="popLayout">
        {lines.map((line) => {
          const active = line.id === last?.id && typed !== Infinity;
          const visibleText = active ? line.text.slice(0, typed) : line.text;
          const done = !active || typed >= line.text.length;
          return (
            <motion.li
              key={line.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="code-run-line"
            >
              <span className="code-line-number">{line.number}</span>
              <code><HighlightedCode text={visibleText} />{active && !done && <span className="code-caret" />}</code>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ol>
  );
}
