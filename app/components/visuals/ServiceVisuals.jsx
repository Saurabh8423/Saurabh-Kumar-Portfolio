import {
  LuBot,
  LuDatabase,
  LuFileText,
  LuInbox,
  LuMail,
  LuSearch,
  LuSend,
  LuSmartphone,
  LuTrendingUp,
  LuYoutube,
} from "react-icons/lu";
import { GlassIcon } from "@/app/components/ui/Glass";
import { Cycle } from "@/app/components/ui/Motion";

/* Small looping product scenes for the service cards. Decorative only. */

const d = (s, dur) => ({ animationDelay: `${s}s`, ...(dur ? { "--seq-dur": `${dur}s` } : {}) });

export function Frame({ children, className = "" }) {
  return (
    <div aria-hidden className={`relative h-44 overflow-hidden rounded-2xl border border-line bg-black/60 bg-dots ${className}`}>
      {children}
    </div>
  );
}

function Pulses({ paths, delays }) {
  return (
    <svg className="absolute inset-0 size-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
      {paths.map((p, i) => (
        <g key={p}>
          <path d={p} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path
            d={p}
            pathLength={100}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="14 200"
            vectorEffect="non-scaling-stroke"
            className="animate-pulse-line"
            style={{ animationDelay: `${delays?.[i] ?? i * 0.7}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

/** A page assembling itself block by block, then scoring 100. */
function WebsiteVisual() {
  const block = "animate-seq rounded-md";
  return (
    <Frame className="p-3">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-ink-900">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="size-1.5 rounded-full bg-white/30" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/10" />
          <span className="ml-2 rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[0.55rem] text-subtle">tooleraai.com</span>
          <span className="ml-auto animate-seq rounded-full bg-white px-1.5 py-0.5 font-mono text-[0.55rem] font-semibold text-black" style={d(1.4)}>
            100
          </span>
        </div>
        <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-2 p-3">
          <div className="flex flex-col gap-1.5">
            <div className={`${block} h-3 w-4/5 bg-white/25`} style={d(0)} />
            <div className={`${block} h-3 w-3/5 bg-white/25`} style={d(0.15)} />
            <div className={`${block} h-1.5 w-full bg-white/10`} style={d(0.35)} />
            <div className={`${block} h-1.5 w-11/12 bg-white/10`} style={d(0.45)} />
            <div className="mt-1 h-4 w-16 animate-seq rounded-full bg-white" style={d(0.65)} />
          </div>
          <div className={`${block} bg-gradient-to-br from-white/20 to-white/5`} style={d(0.25)} />
          <div className="col-span-2 grid grid-cols-3 gap-2">
            {[0.8, 0.95, 1.1].map((t) => (
              <div key={t} className={`${block} h-6 bg-white/10`} style={d(t)} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** Inbox → agent → outputs with pulses travelling along the wires and a cycling status. */
function AgentsVisual() {
  return (
    <Frame>
      <Pulses paths={["M20 45 L45 45", "M55 45 C 65 45, 68 25, 80 25", "M55 45 C 65 45, 68 65, 80 65"]} delays={[0, 0.9, 0.9]} />
      <div className="absolute left-[20%] top-[45%] -translate-x-1/2 -translate-y-1/2">
        <GlassIcon icon={LuInbox} size="sm" />
      </div>
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 -z-10 animate-pulse-soft rounded-full bg-white/25 blur-xl" />
        <GlassIcon icon={LuBot} />
      </div>
      <div className="absolute left-[80%] top-[25%] -translate-x-1/2 -translate-y-1/2">
        <GlassIcon icon={LuYoutube} size="sm" />
      </div>
      <div className="absolute left-[80%] top-[65%] -translate-x-1/2 -translate-y-1/2">
        <GlassIcon icon={LuMail} size="sm" />
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        <span className="glass-soft inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.6rem] text-fg/80">
          <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" />
          <Cycle items={["researching site…", "generating content…", "publishing posts…", "sending emails…", "done ✓"]} interval={1300} />
        </span>
      </div>
    </Frame>
  );
}

/** A question about a PDF, a typing indicator, then a cited answer. */
function ChatVisual() {
  return (
    <Frame className="flex flex-col justify-end gap-2 p-3">
      <span className="glass-soft absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[0.55rem] text-fg/80">
        <LuFileText className="size-3" /> handbook.pdf
      </span>
      <p className="max-w-[75%] animate-seq self-start rounded-2xl rounded-bl-sm bg-white/[0.08] px-3 py-1.5 text-[0.65rem] text-fg" style={d(0)}>
        What does the PDF say about refunds?
      </p>
      <p className="max-w-[80%] animate-seq self-end rounded-2xl rounded-br-sm bg-white px-3 py-1.5 text-[0.65rem] text-black" style={d(1.1)}>
        Refunds are issued within 7 days of a request.
      </p>
      <p className="animate-seq self-end font-mono text-[0.55rem] text-subtle" style={d(1.5)}>
        source · page 12
      </p>
      <span className="glass-soft inline-flex w-fit items-center gap-1 self-start rounded-full px-2.5 py-1.5">
        {[0, 0.15, 0.3].map((t) => (
          <span key={t} className="size-1 animate-typing rounded-full bg-white" style={{ animationDelay: `${t}s` }} />
        ))}
      </span>
    </Frame>
  );
}

const bars = [42, 64, 50, 78, 58, 88, 70, 96];

/** A live dashboard: metric ticking up, bars breathing. */
function SaasVisual() {
  return (
    <Frame className="p-3">
      <div className="flex h-full flex-col rounded-xl border border-line bg-ink-900 p-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-wider text-subtle">Active users</p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight text-fg">
              <Cycle items={["12,480", "12,512", "12,547", "12,603"]} interval={1800} />
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2 py-0.5 text-[0.55rem] text-fg">
            <LuTrendingUp className="size-3" /> sample
          </span>
        </div>
        <div className="mt-auto flex h-14 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 origin-bottom animate-bar rounded-t-sm bg-gradient-to-t from-white/15 to-white/80"
              style={{ height: `${h}%`, animationDelay: `${i * -0.3}s` }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

const points = [
  [8, 70], [16, 62], [24, 66], [32, 52], [40, 55], [48, 44], [56, 46], [64, 36], [72, 38], [80, 28], [88, 24],
];

/** Data points landing one by one, then the model's prediction line drawn through them. */
function MlVisual() {
  return (
    <Frame className="p-3">
      <div className="relative h-full rounded-xl border border-line bg-ink-900 p-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.55rem] uppercase tracking-wider text-subtle">AQI forecast</p>
          <span className="flex items-center gap-2 font-mono text-[0.5rem] text-subtle">
            <span className="inline-flex items-center gap-1"><span className="size-1.5 rounded-full bg-white/50" /> actual</span>
            <span className="inline-flex items-center gap-1"><span className="h-px w-3 bg-white" /> predicted</span>
          </span>
        </div>
        <svg className="absolute inset-x-3 bottom-3 top-8 text-white" viewBox="0 0 100 80" preserveAspectRatio="none" fill="none">
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.06" vectorEffect="non-scaling-stroke" />
          ))}
          <path
            d="M6 72 C 30 60, 45 50, 60 40 S 85 24, 94 20"
            pathLength={100}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="100"
            vectorEffect="non-scaling-stroke"
            className="animate-draw drop-shadow-[0_0_4px_rgb(var(--fg-rgb)/0.6)]"
            style={d(0.6)}
          />
        </svg>
        <div className="absolute inset-x-3 bottom-3 top-8">
          {points.map(([x, y], i) => (
            <span
              key={x}
              className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 animate-seq rounded-full bg-white/50"
              style={{ left: `${x}%`, top: `${(y / 80) * 100}%`, ...d(i * 0.06) }}
            />
          ))}
        </div>
        <span className="glass-soft absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[0.55rem] text-fg/80">
          <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" />
          <Cycle items={["training…", "validating…", "serving via FastAPI"]} interval={1500} />
        </span>
      </div>
    </Frame>
  );
}

/** Two phones whose screens build themselves, one iOS and one Android. */
function MobileVisual() {
  const block = "animate-seq rounded";
  return (
    <Frame className="flex items-end justify-center gap-4 px-3 pt-4">
      {[0, 1].map((p) => (
        <div
          key={p}
          className={`relative flex w-24 flex-col gap-1.5 rounded-t-[1.1rem] border border-b-0 border-line-strong bg-ink-900 px-2.5 pt-5 ${p ? "h-32" : "h-36"}`}
        >
          <span className="absolute left-1/2 top-1.5 h-1 w-7 -translate-x-1/2 rounded-full bg-white/15" />
          <div className={`${block} h-10 bg-gradient-to-br from-white/25 to-white/5`} style={d(p * 0.4)} />
          <div className={`${block} h-1.5 w-4/5 bg-white/25`} style={d(p * 0.4 + 0.2)} />
          <div className={`${block} h-1.5 w-3/5 bg-white/10`} style={d(p * 0.4 + 0.3)} />
          <div className={`${block} h-1.5 w-2/3 bg-white/10`} style={d(p * 0.4 + 0.4)} />
          <div className="mt-1 h-4 animate-seq rounded-full bg-white" style={d(p * 0.4 + 0.6)} />
        </div>
      ))}
      <span className="glass-soft absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[0.55rem] text-fg/80">
        <LuSmartphone className="size-3" />
        <Cycle items={["iOS", "Android", "Flutter", "React Native", "Capacitor"]} interval={1300} />
      </span>
    </Frame>
  );
}

const scores = [
  { label: "Perf", value: 98 },
  { label: "SEO", value: 100 },
  { label: "A11y", value: 96 },
];

/** A search result climbing to the top while audit rings fill. */
function SeoVisual() {
  return (
    <Frame className="grid grid-cols-[1.25fr_1fr] gap-3 p-3">
      <div className="flex flex-col gap-1.5 rounded-xl border border-line bg-ink-900 p-2.5">
        <span className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-1 font-mono text-[0.55rem] text-subtle">
          <LuSearch className="size-3" /> free pdf tools
        </span>
        <div className="mt-1 rounded-lg border border-white/25 bg-white/[0.06] p-1.5">
          <p className="flex items-center justify-between font-mono text-[0.5rem] text-fg">
            yoursite.com
            <span className="rounded-full bg-white px-1.5 font-semibold text-black">
              <Cycle items={["#4", "#3", "#2", "#1"]} interval={1100} />
            </span>
          </p>
          <span className="mt-1 block h-1 w-4/5 rounded bg-white/30" />
        </div>
        {[0, 1].map((r) => (
          <div key={r} className="px-1.5 py-1">
            <span className="block h-1 w-1/3 rounded bg-white/15" />
            <span className="mt-1 block h-1 w-4/5 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-2">
        {scores.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <svg className="size-8 -rotate-90 text-white" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="15.9" stroke="currentColor" strokeOpacity="0.1" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                pathLength={100}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="100"
                className="animate-ring"
                style={{ "--ring": 100 - s.value, ...d(i * 0.2) }}
              />
            </svg>
            <span>
              <span className="block text-xs font-semibold text-fg">{s.value}</span>
              <span className="block font-mono text-[0.5rem] uppercase tracking-wider text-subtle">{s.label}</span>
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const satellites = [
  { icon: LuInbox, x: 16, y: 26, label: "Webhook" },
  { icon: LuDatabase, x: 84, y: 26, label: "Database" },
  { icon: LuSend, x: 16, y: 74, label: "WhatsApp" },
  { icon: LuMail, x: 84, y: 74, label: "Email" },
];

/** Systems wired into one hub, data packets moving between them. */
export function ApiVisual() {
  return (
    <Frame>
      <Pulses paths={satellites.map((s) => `M${s.x} ${s.y} L50 50`)} />
      {satellites.map((s) => (
        <div key={s.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          <GlassIcon icon={s.icon} size="sm" />
          <span className="font-mono text-[0.5rem] text-subtle">{s.label}</span>
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 -z-10 animate-pulse-soft rounded-full bg-white/25 blur-xl" />
        <GlassIcon icon={LuBot} />
      </div>
    </Frame>
  );
}

export const serviceVisuals = {
  website: WebsiteVisual,
  agents: AgentsVisual,
  chat: ChatVisual,
  saas: SaasVisual,
  ml: MlVisual,
  mobile: MobileVisual,
  seo: SeoVisual,
  api: ApiVisual,
};
