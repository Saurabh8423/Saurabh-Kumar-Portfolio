const sizes = {
  sm: { tile: "size-8 rounded-[0.6rem]", icon: "size-4" },
  md: { tile: "size-11 rounded-[0.85rem]", icon: "size-5" },
  lg: { tile: "size-14 rounded-[1.05rem]", icon: "size-6" },
};

/**
 * Liquid-glass tile: frosted squircle, specular top highlight, refracted lower rim
 * and a sheen that sweeps across on hover of any `group` parent.
 */
export function GlassTile({ size = "md", className = "", style, children }) {
  return (
    <span
      aria-hidden
      style={style}
      className={`glass relative isolate grid shrink-0 place-items-center overflow-hidden text-white transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.08] ${sizes[size].tile} ${className}`}
    >
      <span className="pointer-events-none absolute inset-x-[12%] top-[6%] -z-10 h-[45%] rounded-[50%] bg-gradient-to-b from-snow/35 to-transparent blur-[1px]" />
      <span className="pointer-events-none absolute inset-x-[18%] bottom-0 -z-10 h-[30%] rounded-[50%] bg-snow/15 blur-md" />
      <span className="pointer-events-none absolute inset-y-0 -left-full -z-10 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-snow/40 to-transparent transition-[left] duration-700 ease-out group-hover:left-[150%]" />
      {children}
    </span>
  );
}

export function GlassIcon({ icon: Icon, size = "md", className = "", iconClassName = "", style }) {
  return (
    <GlassTile size={size} className={className} style={style}>
      <Icon className={`${sizes[size].icon} drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)] ${iconClassName}`} />
    </GlassTile>
  );
}

export { Spotlight } from "./Spotlight";

/** Text-based brand mark. */
export function Logo({ className = "" }) {
  return (
    <span className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="glass relative grid size-8 place-items-center overflow-hidden rounded-[0.6rem] transition-transform duration-500 group-hover:rotate-[8deg]"
      >
        <span className="absolute inset-x-1 top-0.5 h-1/2 rounded-[50%] bg-gradient-to-b from-snow/40 to-transparent" />
        <span className="relative block size-2.5 rotate-45 rounded-[3px] bg-white shadow-[0_0_8px_rgb(var(--fg-rgb)/0.7)]" />
      </span>
      <span className="text-[0.95rem] font-semibold tracking-[0.22em] text-fg">SAURABH</span>
    </span>
  );
}
