import { LuBot, LuDatabase, LuFileText, LuMessageCircle, LuSend, LuWebhook } from "react-icons/lu";
import { GlassIcon } from "@/app/components/ui/Glass";
import LiveRunLog from "./LiveRunLog";

function FlowNode({ icon, label, meta, agent = false, className = "" }) {
  return (
    <div className={className}>
      <div
        className={`relative overflow-hidden rounded-2xl border bg-ink-850/95 p-3 shadow-card ${
          agent ? "border-white/30 shadow-[0_0_0_1px_rgb(var(--fg-rgb)/0.08),0_10px_40px_-10px_rgb(var(--fg-rgb)/0.3)]" : "border-line"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <GlassIcon icon={icon} size="sm" className={agent ? "" : "opacity-80"} />
          <div className="min-w-0">
            <p className="truncate text-[0.8rem] font-medium text-fg">{label}</p>
            <p className="truncate font-mono text-[0.68rem] text-subtle">{meta}</p>
          </div>
        </div>
        {agent && (
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-1/3 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-accent-soft to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}

const paths = ["M27 50 L38 50", "M62 50 C 68 50, 68 20, 74 20", "M62 50 L74 50", "M62 50 C 68 50, 68 80, 74 80"];

/** Illustrative workspace: an AI workflow routing an incoming lead, plus a live run log. Decorative only. */
export default function HeroVisual() {
  return (
    <div className="relative" aria-hidden>
      <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(var(--fg-rgb)/0.12),transparent_65%)] blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900/90 shadow-[var(--shadow-deep)] ring-1 ring-black/40">
        <div className="flex items-center gap-3 border-b border-line bg-ink-850/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <p className="min-w-0 truncate font-mono text-[0.7rem] text-subtle">
            saurabh / workflows / <span className="text-muted">lead-intake</span>
          </p>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ok/30 bg-ok/10 px-2 py-0.5 font-mono text-[0.65rem] text-ok">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-ok" />
            running
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px]">
          <div className="relative hidden aspect-[2/1] bg-dots md:block">
            <svg className="absolute inset-0 size-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="hero-flow" x1="0" x2="1">
                  <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {paths.map((d, i) => (
                <g key={d}>
                  <path d={d} stroke="currentColor" strokeOpacity="0.1" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <path
                    d={d}
                    stroke="url(#hero-flow)"
                    strokeWidth="1.5"
                    strokeDasharray="2 4"
                    strokeOpacity="0.35"
                    vectorEffect="non-scaling-stroke"
                    className="animate-dash"
                  />
                  <path
                    d={d}
                    pathLength={100}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="14 200"
                    vectorEffect="non-scaling-stroke"
                    className="animate-pulse-line drop-shadow-[0_0_4px_rgb(var(--fg-rgb)/0.9)]"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  />
                </g>
              ))}
            </svg>

            <FlowNode icon={LuWebhook} label="New inquiry" meta="trigger · webhook" className="absolute left-[3%] top-1/2 w-[24%] -translate-y-1/2" />
            <FlowNode icon={LuBot} label="AI agent" meta="qualify & route" agent className="absolute left-[38%] top-1/2 w-[24%] -translate-y-1/2" />
            <FlowNode icon={LuDatabase} label="Update CRM" meta="action" className="absolute left-[74%] top-[20%] w-[23%] -translate-y-1/2" />
            <FlowNode icon={LuFileText} label="Draft reply" meta="needs review" className="absolute left-[74%] top-1/2 w-[23%] -translate-y-1/2" />
            <FlowNode icon={LuSend} label="Notify on WhatsApp" meta="action" className="absolute left-[74%] top-[80%] w-[23%] -translate-y-1/2" />
          </div>

          <div className="bg-dots p-4 md:hidden">
            <FlowNode icon={LuWebhook} label="New inquiry" meta="trigger · webhook" />
            <div className="mx-auto h-5 w-px bg-gradient-to-b from-white/30 to-white/70" />
            <FlowNode icon={LuBot} label="AI agent" meta="qualify & route" agent />
            <div className="mx-auto h-5 w-px bg-gradient-to-b from-white/70 to-white/20" />
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: LuDatabase, label: "CRM" },
                { icon: LuFileText, label: "Reply" },
                { icon: LuMessageCircle, label: "Notify" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-ink-850 px-2 py-2.5">
                  <GlassIcon icon={icon} size="sm" />
                  <span className="text-[0.7rem] text-fg">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-line bg-ink-850/60 p-4 lg:border-l lg:border-t-0 lg:p-5">
            <LiveRunLog />
          </div>
        </div>
      </div>

      <div className="glass absolute -left-6 top-16 hidden animate-float rounded-xl px-3 py-2 xl:block">
        <p className="font-mono text-[0.65rem] text-subtle">deploy</p>
        <p className="text-xs text-fg">
          <span className="text-ok">●</span> main · production
        </p>
      </div>
      <div className="glass absolute -bottom-5 left-[42%] hidden animate-float rounded-xl px-3 py-2 [animation-delay:-3.5s] xl:block">
        <p className="font-mono text-[0.65rem] text-subtle">stack</p>
        <p className="text-xs text-fg">
          <span className="text-white">◆</span> n8n · Playwright · LLM APIs
        </p>
      </div>
    </div>
  );
}
