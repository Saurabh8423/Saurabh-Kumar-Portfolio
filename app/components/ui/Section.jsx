import { Reveal, RevealWords } from "./Reveal";

export function Container({ className = "", ...props }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 ${className}`} {...props} />;
}

export function Section({ id, labelledBy, className = "", children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-20 sm:py-28 lg:py-32 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Eyebrow pill, word-by-word headline and lede, revealed on scroll. */
export function SectionHeading({ id, eyebrow, title, description, align = "left", className = "" }) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      <p className="glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-muted">
        <span className="size-1.5 animate-pulse-soft rounded-full bg-white" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl lg:leading-[1.08] lg:tracking-[-0.03em]"
      >
        {typeof title === "string" ? <RevealWords text={title} /> : title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
