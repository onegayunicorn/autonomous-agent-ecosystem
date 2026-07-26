import React, { useState } from 'react';
import { Zap, Play, CheckCircle2, ArrowRight, Search, Shield, TrendingUp, PenTool, FileText, Lightbulb, ExternalLink } from 'lucide-react';
import { STARTER_PACK_AGENTS } from '../data/agentsData';
import { Agent } from '../types';

interface StarterPackViewProps {
  onSelectAgent: (agentId: string) => void;
}

export const StarterPackView: React.FC<StarterPackViewProps> = ({ onSelectAgent }) => {
  const [selectedAgentForModal, setSelectedAgentForModal] = useState<Agent | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 sm:p-8 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
          <Zap className="w-4 h-4" />
          AutoHive Core Fleet — Starter Pack
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          6 Core Autonomous Agents
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
          The official AutoHive Starter Pack provides instant, out-of-the-box intelligence for document search Q&A, strategic investment evaluation, patent prior art checking, research blogging, executive document summarization, and AI workflow ideation.
        </p>
      </div>

      {/* Grid of 6 Starter Pack Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STARTER_PACK_AGENTS.map((agent) => (
          <article
            key={agent.id}
            className="bg-[#0F1115] border border-slate-800 hover:border-blue-500/60 rounded-lg overflow-hidden shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            {/* Banner Image */}
            <div className="relative h-28 overflow-hidden bg-black/40">
              <img
                src={agent.avatarUrl}
                alt={agent.name}
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/50 to-transparent"></div>
              
              <div className="absolute top-3 left-3 bg-[#0F1115]/90 border border-slate-800 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-md uppercase font-mono">
                <span>{agent.icon}</span>
                <span>{agent.category}</span>
              </div>

              <div className="absolute top-3 right-3 bg-[#0F1115]/90 text-slate-200 text-xs font-mono font-bold px-2 py-0.5 rounded border border-slate-800">
                ★ {agent.rating}
              </div>
            </div>

            {/* Body Content */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner">
                    {agent.icon}
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-white group-hover:text-blue-400 transition">
                      {agent.name}
                    </h2>
                    <p className="text-[11px] text-slate-500 font-mono">By {agent.author} • {agent.runsCount?.toLocaleString()} Runs</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {agent.description}
                </p>

                {/* Key Benefits List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-wider font-mono">Key Benefits</h4>
                  <ul className="space-y-1">
                    {agent.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight text-[11px]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2">
                <button
                  onClick={() => onSelectAgent(agent.id)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Execute Agent
                </button>

                <button
                  onClick={() => setSelectedAgentForModal(agent)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium py-1.5 rounded text-xs flex items-center justify-center gap-1.5 border border-slate-800 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Prompts & Specs
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Agent Quick Spec Modal */}
      {selectedAgentForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedAgentForModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedAgentForModal.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white">{selectedAgentForModal.name}</h3>
                <p className="text-xs text-blue-400 font-mono">{selectedAgentForModal.category} • Starter Pack</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">System Instruction Persona</h4>
                <div className="bg-black/50 p-3 rounded text-xs text-slate-300 font-mono border border-slate-800 leading-relaxed">
                  {selectedAgentForModal.systemPrompt}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Suggested Test Prompts</h4>
                <div className="space-y-1.5">
                  {selectedAgentForModal.suggestedPrompts?.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const id = selectedAgentForModal.id;
                        setSelectedAgentForModal(null);
                        onSelectAgent(id);
                      }}
                      className="w-full text-left bg-slate-900 hover:bg-slate-850 text-xs text-slate-200 p-2.5 rounded border border-slate-800 transition flex items-center justify-between group font-mono"
                    >
                      <span>"{prompt}"</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const id = selectedAgentForModal.id;
                  setSelectedAgentForModal(null);
                  onSelectAgent(id);
                }}
                className="w-full bg-blue-600 text-white font-bold py-2 rounded text-xs hover:bg-blue-500 transition"
              >
                Launch Workbench with {selectedAgentForModal.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
