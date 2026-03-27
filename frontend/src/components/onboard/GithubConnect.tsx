import { motion } from "framer-motion"
import { ArrowLeft, GitBranch, ShieldCheck, Sparkles } from "lucide-react"

import { useGitHub } from "@/hooks/useGitHub"
import { usePulseAI } from "@/hooks/usePulseAI"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import React from "react"

type GithubConnectProps = {
  onBackToLanding?: () => void
  onAnalysisComplete?: () => void
}

function GithubConnect({ onBackToLanding, onAnalysisComplete }: GithubConnectProps) {
  const { url, setUrl, error, validate, parsed } = useGitHub()
  const { projectStore, analyzeRepository } = usePulseAI()

  React.useEffect(() => {
    const active = projectStore.getActiveProject()
    if (active?.status === "success" && onAnalysisComplete) {
      onAnalysisComplete()
    }
  }, [projectStore, onAnalysisComplete])

  const activeProject = projectStore.getActiveProject()
  const isLoading = activeProject?.status === "loading"

  return (
    <section className="flex flex-1 items-center justify-center pb-16 pt-8 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            onClick={onBackToLanding}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            <span className="h-px w-8 bg-slate-800" />
            Project Audit
            <span className="h-px w-8 bg-slate-800" />
          </div>
        </div>

        <Card className="overflow-hidden border-slate-800/60 bg-slate-950/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <CardContent className="p-8 sm:p-12">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-semibold tracking-tight text-slate-50">
                Connect your repository
              </h2>
              <p className="text-sm text-slate-400">
                Pulse will scan the architecture and dependencies. <br />
                No code secrets or .env files are ever read.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                 <Input
                   placeholder="https://github.com/org/project"
                   value={url}
                   onChange={(event) => setUrl(event.target.value)}
                   disabled={isLoading}
                   className="h-11 pl-5 pr-36 rounded-2xl border-slate-800 bg-slate-900/50 text-base text-slate-100 placeholder:text-slate-600 focus:ring-sky-500/20 transition-all duration-300 group-hover:border-slate-700"
                 />
                 <div className="absolute right-2 top-2">
                   <Button
                     className="h-11 rounded-xl bg-linear-to-r from-sky-500 to-violet-500 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 hover:brightness-110 active:scale-95 transition-all duration-200"
                     disabled={isLoading || !url}
                     onClick={() => {
                       const isValid = validate()
                       if (isValid) analyzeRepository(url)
                     }}
                   >
                     {isLoading ? (
                       <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                       >
                         <Sparkles className="h-4 w-4" />
                       </motion.div>
                     ) : (
                       "Analyze"
                     )}
                   </Button>
                 </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-2 text-xs text-rose-400 font-medium"
                >
                  {error}
                </motion.p>
              )}

              {parsed && (
                <div className="flex items-center gap-2 px-2 text-xs text-slate-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Targeting <span className="text-slate-300 font-medium">{parsed.owner}/{parsed.name}</span>
                </div>
              )}
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-900">
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <GitBranch className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Structure</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Map files & folder hierarchy.</p>
              </div>
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Privacy</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Token Saver filters secrets.</p>
              </div>
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Verdict</h3>
                <p className="text-xs text-slate-500 leading-relaxed">LLM architecture signals.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 space-y-4"
          >
            <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-widest text-slate-500 px-2 font-bold italic">
              <Sparkles className="h-3 w-3 text-sky-400 animate-pulse mr-2" />
              <span className="flex-1">{activeProject?.analysisMessage}</span>
              <span className="animate-pulse text-sky-500 ml-2">Active</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-900">
              <motion.div 
                className="h-full bg-linear-to-r from-sky-500 via-violet-500 to-sky-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 100%" }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default GithubConnect
