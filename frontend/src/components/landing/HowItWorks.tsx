import {
  GitBranch,
  Cpu,
  FileDown,
  Network,
  Gem,
  BarChart3,
} from "lucide-react"

const steps = [
  {
    number: "01",
    color: "sky",
    icon: GitBranch,
    title: "Paste a GitHub URL",
    description:
      "Drop any public repository link. Pulse clones it to memory, filters out lock-files, binaries and generated dumps automatically with Token Saver.",
    detail: "git clone → Token Saver → /src snapshot",
  },
  {
    number: "02",
    color: "violet",
    icon: Cpu,
    title: "AI X-ray runs",
    description:
      "dependency-cruiser extracts the import graph. OpenRouter's Qwen 3 Coder reads the structure and returns a strict JSON verdict: score, debt index, architecture type and the gold nugget.",
    detail: "dependency-cruiser → LLM → JSON verdict",
  },
  {
    number: "03",
    color: "emerald",
    icon: FileDown,
    title: "Judge-ready output",
    description:
      "An interactive graph with folder clusters you can zoom into, plus a one-click PDF report designed to be dropped straight into judging sheets.",
    detail: "React Flow clusters → PDF / QR export",
  },
]

const features = [
  {
    icon: Network,
    color: "sky",
    title: "Visual Architecture Map",
    description:
      "Folders become clusters. Click a cluster to zoom into its files and import edges. Judges see the skeleton first, then drill down.",
  },
  {
    icon: BarChart3,
    color: "violet",
    title: "Impact Score",
    description:
      "Cyclomatic complexity + architectural signals compressed into a single 1–100 score. Not line-count, real engineering signal.",
  },
  {
    icon: Gem,
    color: "amber",
    title: "Gold Nugget",
    description:
      "Automatic detection of the most elegant or novel piece of code. The hidden diamond the judge would never find on their own.",
  },
]

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string; dot: string }> = {
  sky: {
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
    text: "text-sky-300",
    badge: "bg-sky-500/15 text-sky-300",
    dot: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]",
  },
  violet: {
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    badge: "bg-violet-500/15 text-violet-300",
    dot: "bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]",
  },
  emerald: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    badge: "bg-emerald-500/15 text-emerald-300",
    dot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]",
  },
  amber: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    badge: "bg-amber-500/15 text-amber-300",
    dot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]",
  },
}

function HowItWorks() {
  return (
    <section className="border-t border-slate-800/60 py-12 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6">

        {/* ── Section header ── */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
            How it works
            <span className="h-px w-8 bg-linear-gradient-to-r from-slate-700 to-sky-500/70" />
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            From raw repo to full verdict{" "}
            <span className="bg-linear-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              in three steps.
            </span>
          </h2>
          <p className="max-w-xl text-sm text-slate-400 sm:text-base">
            No config files, no annotations. Paste the link and Pulse does the rest.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-linear-gradient-to-r from-transparent via-slate-700/60 to-transparent md:block" />

          {steps.map((step) => {
            const c = colorMap[step.color]
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`relative flex flex-col gap-4 rounded-2xl border ${c.border} bg-slate-950/60 p-6 backdrop-blur`}
              >
                {/* Number badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-widest ${c.badge}`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.bg}`}
                  >
                    <Icon className={`h-4 w-4 ${c.text}`} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-50">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                </div>

                {/* Pipeline tag */}
                <div className={`mt-auto rounded-lg border ${c.border} bg-slate-900/60 px-3 py-2 font-mono text-[0.65rem] ${c.text}`}>
                  {step.detail}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Features ── */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
              What you get
            </p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Three signals judges actually care about.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {features.map((f) => {
              const c = colorMap[f.color]
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className={`group relative overflow-hidden rounded-2xl border ${c.border} bg-slate-950/60 p-6 transition-all duration-200 hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] backdrop-blur`}
                >
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl ${c.bg} opacity-40 transition-opacity duration-300 group-hover:opacity-70`}
                  />
                  <div className="relative flex flex-col gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}
                    >
                      <Icon className={`h-5 w-5 ${c.text}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-slate-50">{f.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-400">{f.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Social proof strip ── */}
        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-slate-800/60 pt-12 text-xs text-slate-500">
          <span>Built on OpenRouter · Qwen 3 Coder · Llama 4 Scout</span>
          <span className="h-3 w-px bg-slate-700" />
          <span>FastAPI backend · PyGit2 · dependency-cruiser</span>
          <span className="h-3 w-px bg-slate-700" />
          <span>React Flow clusters · ReportLab PDF</span>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
