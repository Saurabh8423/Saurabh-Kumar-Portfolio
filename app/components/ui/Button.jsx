import { LuArrowRight } from "react-icons/lu";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "overflow-hidden bg-white text-black shadow-[0_0_0_1px_rgb(var(--fg-rgb)/0.2),0_8px_24px_-8px_rgb(var(--fg-rgb)/0.35)] hover:bg-white/85 hover:shadow-glow before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:w-1/2 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent before:transition-[left] before:duration-700 hover:before:left-[150%]",
  secondary: "glass text-fg hover:bg-white/[0.1]",
  ghost: "text-muted hover:text-fg",
};

const sizes = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClasses(variant = "primary", size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

function Arrow() {
  return <LuArrowRight aria-hidden className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />;
}

/** Anchor styled as a button. */
export function ButtonLink({ variant = "primary", size = "md", arrow = false, className = "", children, ...props }) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

export function Button({ variant = "primary", size = "md", arrow = false, className = "", children, type = "button", ...props }) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
