import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type HeroProps = {
  onStartAudit?: () => void;
};

function Hero({ onStartAudit }: HeroProps) {
    return (
     <section className="flex flex-1 items-center pb-8 pt-4 sm:pt-10 lg:pt-16">
       <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-1.5 text-xs text-slate-300 shadow-[0_0_30px_rgba(15,23,42,0.9)] backdrop-blur">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-violet-500 text-[0.6rem] font-bold text-slate-950">
            AI
          </span>
          <span className="uppercase tracking-[0.18em] text-slate-300">
            Codebase X-ray · Built for hackathon judges
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-5 max-w-4xl">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl lg:text-7xl lg:leading-[1.05]">
            See any repository{" "}
            <span className="bg-linear-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              like a living system.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-base text-slate-300 sm:text-lg">
            Paste a GitHub link. Pulse scans the code, builds an interactive
            dependency map and delivers a hard AI verdict on architecture,
            complexity and hidden technical debt — in under 30 seconds.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            className="group h-12 rounded-full bg-linear-to-rrom-sky-500 via-cyan-400 to-violet-500 px-8 text-sm font-semibold text-slate-950 shadow-[0_0_50px_rgba(56,189,248,0.65)] hover:brightness-110 transition-all duration-200"
            onClick={onStartAudit}
          >
            Start code audit
            <ArrowRight className="ml-1 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-full border-slate-700 bg-slate-900/70 px-6 text-sm text-slate-100 hover:border-sky-500/60 hover:bg-slate-900/90 transition-all duration-200"
          >
            Watch interactive demo
          </Button>
        </div>

        {/* Stat strip */}
        <div className="flex flex-wrap justify-center gap-8 text-xs text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-8 overflow-hidden rounded-full bg-slate-700">
              <span className="absolute inset-y-0 left-0 w-3 animate-pulse rounded-full bg-emerald-400" />
            </span>
            <span>Audit in under 30 s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Any public Git repo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            <span>Zero config needed</span>
          </div>
        </div>

        {/* Preview card */}
        <div className="relative mt-4 w-full max-w-4xl">
          <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.3),transparent_55%)]" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/70 bg-linear-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 shadow-[0_0_100px_rgba(56,189,248,0.4)] backdrop-blur">
            {/* Terminal top bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-amber-400/70" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/70" />
              </div>
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
                Pulse · Live analysis
              </span>
              <div className="rounded-full border border-sky-500/40 bg-slate-950/60 px-3 py-1 text-[0.65rem] text-slate-300">
                OpenRouter · Qwen 3 Coder
              </div>
            </div>

            {/* Graph visualisation placeholder */}
            <div className="relative flex h-72 items-center justify-center overflow-hidden px-8 py-6 sm:h-80">
              {/* Glow center */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_65%)]" />

              {/* Animated nodes */}
              <div className="relative h-full w-full max-w-lg">
                {/* Center node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-8 w-8 rounded-full bg-linear-gradient-to-br from-sky-400 to-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.9)] animate-pulse" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border border-sky-500/30 animate-ping opacity-20" />
                </div>
                {/* Satellite nodes */}
                <div className="absolute left-[18%] top-[22%] h-5 w-5 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(167,139,250,0.9)]" />
                <div className="absolute right-[16%] top-[28%] h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
                <div className="absolute left-[12%] bottom-[28%] h-4 w-4 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.8)]" />
                <div className="absolute right-[20%] bottom-[25%] h-5 w-5 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.8)]" />
                <div className="absolute left-[44%] top-[12%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                <div className="absolute left-[40%] bottom-[12%] h-3 w-3 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.8)]" />

                {/* Lines */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2="18%"
                    y2="22%"
                    stroke="rgba(99,179,237,0.35)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="84%"
                    y2="28%"
                    stroke="rgba(167,139,250,0.35)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="12%"
                    y2="72%"
                    stroke="rgba(251,191,36,0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="80%"
                    y2="75%"
                    stroke="rgba(103,232,249,0.35)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="44%"
                    y2="12%"
                    stroke="rgba(52,211,153,0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="50%"
                    y1="50%"
                    x2="40%"
                    y2="88%"
                    stroke="rgba(244,114,182,0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Cluster labels */}
                <div className="absolute left-[5%] top-[15%] rounded-md border border-violet-500/30 bg-slate-900/80 px-2 py-1 text-[0.6rem] text-violet-300 backdrop-blur">
                  /auth · 5 files
                </div>
                <div className="absolute right-[4%] top-[20%] rounded-md border border-emerald-500/30 bg-slate-900/80 px-2 py-1 text-[0.6rem] text-emerald-300 backdrop-blur">
                  /api · 12 files
                </div>
                <div className="absolute left-[2%] bottom-[20%] rounded-md border border-amber-500/30 bg-slate-900/80 px-2 py-1 text-[0.6rem] text-amber-300 backdrop-blur">
                  /ui · 8 files
                </div>
                <div className="absolute right-[5%] bottom-[18%] rounded-md border border-sky-500/30 bg-slate-900/80 px-2 py-1 text-[0.6rem] text-sky-300 backdrop-blur">
                  /core · 3 files
                </div>
              </div>
            </div>

            {/* Metrics bar */}
            <div className="grid grid-cols-3 gap-px border-t border-slate-800/80 bg-slate-800/30">
              <div className="bg-slate-950/60 px-5 py-4">
                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
                  Pulse score
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-50">82</p>
                <p className="mt-0.5 text-[0.65rem] text-emerald-400">
                  Healthy · minor hotspots
                </p>
              </div>
              <div className="bg-slate-950/60 px-5 py-4">
                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
                  Tech Debt Index
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-50">27</p>
                <p className="mt-0.5 text-[0.65rem] text-amber-300">
                  Focus: data layer
                </p>
              </div>
              <div className="bg-slate-950/60 px-5 py-4">
                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
                  Architecture
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-50">
                  Modular
                </p>
                <p className="mt-0.5 text-[0.65rem] text-violet-300">
                  Custom async pipeline ✦
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
