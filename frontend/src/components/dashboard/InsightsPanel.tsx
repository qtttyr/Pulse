import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, Brain, Sparkles } from "lucide-react"
import AIReport from "./AIReport"
import { useProjectStore } from "@/store/projectStore"

export function InsightsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const store = useProjectStore()
  const project = store.getActiveProject()
  const verdict = project?.verdict
  const hasVerdict = !!verdict

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col pointer-events-none">
      {/* ── Toggle Button — Neon Accent ── */}
      <div className="mx-auto mb-2 pointer-events-auto px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            group flex items-center gap-2 sm:gap-3 rounded-full px-4 py-2
            border backdrop-blur-xl transition-all duration-300
            shadow-[0_0_20px_rgba(0,0,0,0.4)]
            ${isOpen
              ? "border-slate-700 bg-slate-900/90 text-slate-400 hover:bg-slate-800/90"
              : hasVerdict
                ? "border-sky-500/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
                : "border-slate-700 bg-slate-900/80 text-slate-400 hover:bg-slate-800/80"
            }
          `}
        >
          {isOpen ? (
            <ChevronUp className="h-3.5 w-3.5 rotate-180 transition-transform" />
          ) : hasVerdict ? (
            <Sparkles className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
          ) : (
            <Brain className="h-3.5 w-3.5" />
          )}
          <span className="text-[0.55rem] sm:text-[0.6rem] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            {isOpen ? "Hide" : hasVerdict ? "AI Ready" : "AI Insights"}
          </span>
          {hasVerdict && !isOpen && (
            <span className="flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
          )}
        </button>
      </div>

      {/* ── Bottom Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="pointer-events-auto w-full overflow-y-auto border-t border-sky-500/20 bg-[#020617]/95 backdrop-blur-3xl shadow-[0_-10px_60px_rgba(56,189,248,0.08)]"
            style={{ maxHeight: "50vh" }}
          >
            {/* Top glow accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-500/50 to-transparent" />

            <div className="mx-auto max-w-6xl p-4 sm:p-6 custom-scrollbar">
              <AIReport />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
