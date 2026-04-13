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
    <div className="absolute left-4 top-4 right-4 z-50 flex items-start gap-4 pointer-events-none lg:left-6 lg:top-6">
      <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-slate-800 bg-slate-950/60 p-1.5 backdrop-blur-xl pointer-events-auto flex items-center gap-2 shadow-2xl"
      >
          <div className="flex h-10 items-center gap-3 px-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-slate-400">
                System Live
              </span>
          </div>

          <div className="h-6 w-px bg-slate-800/60" />

          {isExpanded ? (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              className="flex items-center gap-2 pr-2"
            >
              <div className="relative w-48 sm:w-64">
                <Input
                  placeholder="GitHub URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="h-9 rounded-xl border-slate-800 bg-slate-900/60 pl-8 pr-2 text-xs text-slate-200 placeholder:text-slate-600 focus:ring-sky-500/20"
                />
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-600" />
              </div>
              <Button 
                size="sm"
                onClick={handleAnalyze}
                disabled={isLoading || !url}
                className="h-9 rounded-xl bg-sky-500 text-slate-950 font-bold px-3 sm:px-4 hover:bg-sky-400 transition-all text-xs"
              >
                {isLoading ? <Sparkles className="h-3.5 w-3.5 animate-spin" /> : "Pulse"}
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsExpanded(false)}
                className="h-9 w-9 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-900"
              >
                <Plus className="h-4 w-4 rotate-45" />
              </Button>
            </motion.div>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex h-10 items-center gap-2 rounded-xl px-3 sm:px-4 text-slate-400 hover:text-sky-400 hover:bg-sky-500/5 transition-all group"
            >
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">New Analysis</span>
              <span className="text-xs font-bold uppercase tracking-widest sm:hidden">New</span>
            </button>
          )}
      </motion.div>
    </div>
  )
}
