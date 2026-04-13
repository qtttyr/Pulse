import { useEffect, useMemo, useCallback, useState } from "react"
import { 
  ReactFlow,
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState, 
  ConnectionLineType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useProjectStore } from "@/store/projectStore"
import { FileNode, FolderNode } from "./graph/FlowNodes"
import { ProjectsSidebar } from "./ProjectsSidebar"
import { FolderTree } from "./graph/FolderTree"
import { GraphLegend, GraphStatsBar } from "./graph/GraphUIComponents"
import { useGraphElements } from "./graph/useGraphElements"
import { CustomEdge } from "./graph/CustomEdge"
import { motion } from "framer-motion"
import { FileCode2, LayoutDashboard, Menu, X } from "lucide-react"

const nodeTypes = {
  file: FileNode,
  folder: FolderNode,
}

const edgeTypes = {
  custom: CustomEdge,
}

function CodeGraphFlow() {
  const store = useProjectStore()
  const project = store.getActiveProject()
  const graph = project?.graph
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const collapsed = useMemo(() => {
    const list = project?.collapsedFolders || []
    return new Set(Array.isArray(list) ? list : [])
  }, [project?.collapsedFolders])

  const expandedFolders = useMemo(() => {
    if (!graph) return new Set<string>()
    const expanded = new Set<string>()
    for (const node of graph.nodes) {
      if ((node.type === "group" || node.type === "folder") && !collapsed.has(node.id)) {
        expanded.add(node.id)
      }
    }
    return expanded
  }, [graph, collapsed])

  const toggleFolder = useCallback((id: string) => {
    if (!project) return
    store.toggleFolder(project.id, id)
  }, [project, store])

  const layouted = useGraphElements(graph, expandedFolders, toggleFolder)

  const [nodes, setNodes, onNodesChange] = useNodesState(layouted.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layouted.edges)

  useEffect(() => {
    setNodes(layouted.nodes)
    setEdges(layouted.edges)
  }, [layouted, setNodes, setEdges])

  const stats = {
    nodes: nodes.filter(n => n.type === "file").length,
    edges: edges.length,
    folders: nodes.filter(n => n.type === "folder").length
  }

  const handleCloseSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#020617] selection:bg-sky-500/30">
      <div className="hidden lg:block">
        <ProjectsSidebar />
      </div>

      <aside className={`
        relative z-40 flex w-72 shrink-0 flex-col border-r border-slate-800/40 bg-[#020617]/95 backdrop-blur-3xl shadow-2xl
        fixed lg:relative inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-1 flex-col p-6 overflow-hidden">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-sky-500" />
              <h3 className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-slate-100">
                Radar Explorer
              </h3>
            </div>
            <button 
              onClick={handleCloseSidebar}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden custom-scrollbar">
            {graph && (
              <FolderTree
                nodes={graph.nodes}
                collapsed={new Set(
                  graph.nodes
                    .filter(n => (n.type === 'group' || n.type === 'folder') && !expandedFolders.has(n.id))
                    .map(n => n.id)
                )}
                onToggle={toggleFolder} 
                onFocus={() => undefined}
              />
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/40">
            <GraphLegend />
          </div>
        </div>
      </aside>

      <button 
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed left-4 bottom-4 z-50 p-3 rounded-full bg-sky-500 text-slate-950 shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </button>

      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="relative flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionLineType={ConnectionLineType.Bezier}
          fitView
          colorMode="dark"
          minZoom={0.05}
          maxZoom={1.5}
        >
          <Background color="#1e293b" gap={60} size={1} />
          <Controls className="bg-slate-950! border-slate-800! fill-slate-400! [&_button]:border-slate-800! hover:[&_button]:bg-slate-900! rounded-xl!" />
        </ReactFlow>

        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)]" />

        {nodes.length > 0 && (
          <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 pointer-events-none">
            <div className="pointer-events-auto">
              <GraphStatsBar
                nodeCount={stats.nodes}
                edgeCount={stats.edges}
                folderCount={stats.folders}
              />
            </div>
          </div>
        )}

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-10 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/20 p-12 backdrop-blur-xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-slate-900/40 text-sky-500/30 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <FileCode2 className="h-10 w-10" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-100 mb-2 leading-none">
                Awaiting Architecture
              </h2>
              <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-500 italic opacity-80">
                Synchronizing with Remote Repository Pulse
              </p>
            </motion.div>
          </div>
        )}

        <div className="absolute top-6 right-6 z-30 pointer-events-auto hidden sm:block">
          <div className="flex h-10 items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/80 px-4 backdrop-blur-xl shadow-xl">
            <div className="flex h-2 w-2 items-center justify-center">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            </div>
            <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">
              ELK Layered Engine Active
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CodeGraphFlow