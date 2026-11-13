"use client";

/** Card wrapper whose `spotlight` background follows the pointer. */
export function Spotlight({ className = "", children, ...props }) {
  function onPointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }
  return (
    <div onPointerMove={onPointerMove} className={className} {...props}>
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}
