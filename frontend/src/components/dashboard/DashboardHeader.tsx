import { motion } from "framer-motion"
import { Plus, Search, Sparkles } from "lucide-react"
import { useState } from "react"
import { useGitHub } from "@/hooks/useGitHub"
import { usePulseAI } from "@/hooks/usePulseAI"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  const { url, setUrl, validate } = useGitHub()
  const { analyzeRepository, projectStore } = usePulseAI()
  const [isExpanded, setIsExpanded] = useState(false)

  const activeProject = projectStore.getActiveProject()
  const isLoading = activeProject?.status === "loading"

  const handleAnalyze = () => {
    if (validate()) {
      analyzeRepository(url)
      setUrl("")
      setIsExpanded(false)
    }
  }

  return (
    <div className="absolute left-4 top-4 z-50 flex items-start gap-3 pointer-events-none">
      <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-slate-800 bg-slate-950/60 p-2 backdrop-blur-xl pointer-events-auto flex items-center gap-3 shadow-2xl"
      >
          <div className="flex h-11 items-center gap-3 px-3">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                System Live
              </span>
          </div>

          <div className="h-7 w-px bg-slate-800/60" />

          {isExpanded ? (
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                className="flex items-center gap-3 pr-3"
            >
                <div className="relative w-80">
                    <Input
                        placeholder="Paste GitHub URL..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                        className="h-11 rounded-xl border-slate-800 bg-slate-900/60 pl-8 pr-2 text-sm text-slate-200 placeholder:text-sm placeholder:text-slate-600 focus:ring-sky-500/20"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
                </div>
                <Button 
                    onClick={handleAnalyze}
                    disabled={isLoading || !url}
                    className="h-11 rounded-xl bg-sky-500 text-slate-950 font-bold px-5 hover:bg-sky-400 transition-all text-sm"
                >
                    {isLoading ? <Sparkles className="h-4 w-4 animate-spin" /> : "Pulse It"}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(false)}
                    className="h-11 w-11 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-900"
                >
                    <Plus className="h-5 w-5 rotate-45" />
                </Button>
            </motion.div>
          ) : (
            <button
                onClick={() => setIsExpanded(true)}
                className="flex h-11 items-center gap-3 rounded-xl px-4 text-slate-400 hover:text-sky-400 hover:bg-sky-500/5 transition-all group"
            >
                <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                <span className="text-sm font-bold uppercase tracking-widest">New Analysis</span>
            </button>
          )}
      </motion.div>
    </div>
  )
}
