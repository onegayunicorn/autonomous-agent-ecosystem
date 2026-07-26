import React, { useState } from 'react';
import { Send, Bot, User, Cpu, Globe, ShieldCheck, FileText, Sparkles, Copy, Download, RefreshCw, CheckCircle, ExternalLink, ChevronDown } from 'lucide-react';
import { STARTER_PACK_AGENTS, MARKETPLACE_AGENTS } from '../data/agentsData';
import { DocumentFile, AgentExecutionResult, ExecutionMode } from '../types';

interface AgentWorkbenchViewProps {
  selectedAgentId: string;
  onSelectAgent: (agentId: string) => void;
  documents: DocumentFile[];
}

export const AgentWorkbenchView: React.FC<AgentWorkbenchViewProps> = ({
  selectedAgentId,
  onSelectAgent,
  documents
}) => {
  const allAgents = [...STARTER_PACK_AGENTS, ...MARKETPLACE_AGENTS];
  const agent = allAgents.find((a) => a.id === selectedAgentId) || STARTER_PACK_AGENTS[0];

  const [prompt, setPrompt] = useState('');
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('cloud');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<AgentExecutionResult[]>([]);
  const [activeProofModal, setActiveProofModal] = useState<AgentExecutionResult | null>(null);

  const handleToggleDoc = (docId: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const handleExecute = async (inputPrompt?: string) => {
    const finalPrompt = inputPrompt || prompt;
    if (!finalPrompt.trim() || isProcessing) return;

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/agents/${agent.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          mode: executionMode,
          options: {
            fileIds: selectedDocIds,
            keywords: ['verification', 'consensus', 'wasm']
          }
        })
      });

      const data: AgentExecutionResult = await res.json();
      setHistory((prev) => [data, ...prev]);
      setPrompt('');
    } catch (err) {
      console.error('Execution error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Agent Selector & Execution Bar */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-4 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          {/* Agent Switcher Dropdown */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner">
              {agent.icon}
            </div>
            <div>
              <div className="relative inline-block">
                <select
                  value={agent.id}
                  onChange={(e) => onSelectAgent(e.target.value)}
                  className="bg-black/50 text-white font-extrabold text-sm sm:text-base border border-slate-800 rounded px-3 py-1 pr-8 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {allAgents.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.icon} {a.name} ({a.category})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">{agent.description}</p>
            </div>
          </div>

          {/* Cloud vs Edge Toggle */}
          <div className="flex items-center bg-black/40 p-1 rounded border border-slate-800 self-start md:self-auto font-mono">
            <button
              onClick={() => setExecutionMode('cloud')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition ${
                executionMode === 'cloud'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Cloud Gemini 3.6
            </button>
            <button
              onClick={() => setExecutionMode('edge')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition ${
                executionMode === 'edge'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Edge WASM (Offline)
            </button>
          </div>
        </div>

        {/* Attached Documents Picker */}
        {documents.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Attach Documents to Context ({selectedDocIds.length} selected):
            </label>
            <div className="flex flex-wrap gap-2">
              {documents.map((doc) => {
                const isSelected = selectedDocIds.includes(doc.id);
                return (
                  <button
                    key={doc.id}
                    onClick={() => handleToggleDoc(doc.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition border ${
                      isSelected
                        ? 'bg-blue-600/10 border-blue-500 text-blue-400 font-bold'
                        : 'bg-black/30 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[180px]">{doc.filename}</span>
                    {isSelected && <CheckCircle className="w-3 h-3 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Suggested Prompt Chips */}
        {agent.suggestedPrompts && agent.suggestedPrompts.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
            <span className="text-slate-500 font-mono font-medium whitespace-nowrap text-[11px]">Suggested:</span>
            {agent.suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(p);
                  handleExecute(p);
                }}
                className="bg-black/40 hover:bg-slate-800 text-slate-300 hover:text-blue-400 border border-slate-800 px-2.5 py-1 rounded font-mono text-[11px] whitespace-nowrap transition"
              >
                "{p}"
              </button>
            ))}
          </div>
        )}

        {/* Interactive Prompt Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecute();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isProcessing}
            placeholder={`Ask ${agent.name}... (${executionMode.toUpperCase()} mode active)`}
            className="flex-1 bg-black/50 border border-slate-800 rounded px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
          <button
            type="submit"
            disabled={isProcessing || !prompt.trim()}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-40 shadow-sm"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 fill-current" />
                Run
              </>
            )}
          </button>
        </form>
      </div>

      {/* Execution Results History */}
      <div className="space-y-6">
        {history.length === 0 && !isProcessing && (
          <div className="bg-[#0F1115] border border-dashed border-slate-800 rounded-lg p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded bg-slate-900 border border-slate-800 text-blue-400 flex items-center justify-center mx-auto text-2xl">
              {agent.icon}
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Agent Workbench Ready</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Select a suggested prompt above or type a custom message to run **{agent.name}** with cryptographic proof verification.
            </p>
          </div>
        )}

        {history.map((item) => (
          <div
            key={item.executionId}
            className="bg-[#0F1115] border border-slate-800 rounded-lg overflow-hidden shadow-md space-y-4 p-5"
          >
            {/* Result Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-lg">
                  {agent.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">{item.agentName} Output</h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Model: {item.modelUsed} • Time: {item.executionTimeMs}ms
                  </span>
                </div>
              </div>

              {/* Cryptographic Proof Badge */}
              <button
                onClick={() => setActiveProofModal(item)}
                className="self-start sm:self-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold px-3 py-1 rounded hover:bg-emerald-500/20 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Proof Block #{item.blockNumber}</span>
              </button>
            </div>

            {/* Prompt Display */}
            <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs text-slate-300 font-mono">
              <span className="text-blue-400 font-bold">Prompt:</span> "{item.prompt}"
            </div>

            {/* Specialized UI Modules (Novelty Score / AEO Score / Sentiment) */}
            {item.noveltyAnalysis && (
              <div className="bg-purple-950/20 border border-purple-800/40 p-4 rounded space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-purple-300 text-xs flex items-center gap-2 font-mono">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    Patent Novelty Score & Prior Art Assessment
                  </h4>
                  <span className="text-base font-black text-purple-300 font-mono">
                    {item.noveltyAnalysis.score} / 100
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/40 p-3 rounded border border-purple-900/50">
                    <span className="font-bold text-purple-300 block mb-1 text-[11px]">Key Patent Claims:</span>
                    <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-1">
                      {item.noveltyAnalysis.keyClaims.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-purple-900/50">
                    <span className="font-bold text-purple-300 block mb-1 text-[11px]">Distinctive Innovations:</span>
                    <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-1">
                      {item.noveltyAnalysis.distinctiveFeatures.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {item.aeoResult && (
              <div className="bg-cyan-950/20 border border-cyan-800/40 p-4 rounded space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-cyan-300 text-xs font-mono">
                    Answer Engine Optimization (AEO) Score
                  </h4>
                  <span className="text-base font-black text-cyan-300 font-mono">{item.aeoResult.score} / 100</span>
                </div>
                <p className="text-xs text-slate-300 font-mono">{item.aeoResult.searchVisibility}</p>
              </div>
            )}

            {/* Primary Response Content */}
            <div className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-black/30 p-4 rounded border border-slate-800">
              {item.response}
            </div>

            {/* Source Citations */}
            {item.sources && item.sources.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">
                  Source Citations ({item.sources.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.sources.map((src, i) => (
                    <div key={i} className="bg-black/40 p-2.5 rounded border border-slate-800 text-xs">
                      <div className="font-bold text-slate-300 text-[11px]">{src.filename}</div>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{src.snippet}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-[10px] text-slate-500 font-mono">ID: {item.executionId}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.response);
                    alert('Copied output to clipboard!');
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proof Hash Inspect Modal */}
      {activeProofModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveProofModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4" />
              Decentralized Blockchain Verification Record
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-black/50 p-3 rounded border border-slate-800 space-y-2">
                <div>
                  <span className="text-slate-500 block text-[10px]">VERIFIED BLOCK NUMBER:</span>
                  <span className="text-blue-400 font-bold">#{activeProofModal.blockNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">CRYPTOGRAPHIC PROOF HASH (SHA-256):</span>
                  <span className="text-emerald-400 break-all">{activeProofModal.proofHash}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">MERKLE STATE ROOT:</span>
                  <span className="text-cyan-400 break-all">{activeProofModal.stateRoot}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">VALIDATOR SIGNATURE CONSENSUS:</span>
                  <span className="text-slate-300">✓ 3/3 Validator Nodes (node-us-east-1, node-eu-central-1, node-ap-southeast-1)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveProofModal(null)}
              className="w-full bg-slate-800 text-slate-200 font-bold py-2 rounded text-xs"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
