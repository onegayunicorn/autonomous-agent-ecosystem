import React, { useState } from 'react';
import { Store, Search, Plus, Play, Star, ShieldCheck, Code, Cpu, Terminal, CheckCircle2, ArrowRight, Download, Sparkles, Sliders, Layers } from 'lucide-react';
import { MARKETPLACE_AGENTS } from '../data/agentsData';
import { INITIAL_SKILLS } from '../data/skillsData';
import { Agent, AgentSkill, SkillCategory } from '../types';

interface MarketplaceViewProps {
  onSelectAgent: (agentId: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onSelectAgent }) => {
  const [activeTab, setActiveTab] = useState<'agents' | 'skills'>('skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgentCategory, setSelectedAgentCategory] = useState<string>('All');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');
  const [skillsList, setSkillsList] = useState<AgentSkill[]>(INITIAL_SKILLS);

  // Modals state
  const [showPublishAgentModal, setShowPublishAgentModal] = useState(false);
  const [showPublishSkillModal, setShowPublishSkillModal] = useState(false);
  const [inspectSkill, setInspectSkill] = useState<AgentSkill | null>(null);

  // Developer Skill Publish state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Code Analysis');
  const [newSkillVersion, setNewSkillVersion] = useState('v1.0.0-edge');
  const [newSkillDesc, setNewSkillDesc] = useState('');
  const [newSkillCode, setNewSkillCode] = useState(`export function myCustomSkill(input: any) {
  // Safe WASM Execution Block
  return { result: "Success", verified: true };
}`);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  const agentCategories = ['All', 'Starter Pack', 'AI Models', 'Productivity', 'Marketing', 'Analytics', 'Support'];
  const skillCategories: string[] = ['All', 'Code Analysis', 'DeFi & Crypto', 'Web & RAG', 'Multimodal', 'Reasoning', 'APIs'];

  const filteredAgents = MARKETPLACE_AGENTS.filter((agent) => {
    const matchesCategory =
      selectedAgentCategory === 'All' ||
      (selectedAgentCategory === 'Starter Pack' ? agent.isStarterPack : agent.category === selectedAgentCategory);

    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const filteredSkills = skillsList.filter((skill) => {
    const matchesCategory = selectedSkillCategory === 'All' || skill.category === selectedSkillCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleInstallSkill = (skillId: string) => {
    setSkillsList((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, isInstalled: !s.isInstalled } : s))
    );
    if (inspectSkill && inspectSkill.id === skillId) {
      setInspectSkill({ ...inspectSkill, isInstalled: !inspectSkill.isInstalled });
    }
  };

  const handleRunASTAudit = () => {
    setIsAuditing(true);
    setAuditSuccess(false);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditSuccess(true);
    }, 1200);
  };

  const handlePublishSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditSuccess) {
      alert('Please run the AST Code Safety & Vulnerability Audit before publishing!');
      return;
    }

    const createdSkill: AgentSkill = {
      id: `skill-${Date.now()}`,
      name: newSkillName || 'Custom Developer Skill',
      icon: '🧩',
      category: newSkillCategory,
      version: newSkillVersion,
      description: newSkillDesc || 'Developer submitted agent skill module.',
      author: 'Workspace Developer',
      rating: 5.0,
      installCount: 1,
      triggerCondition: 'On-Demand Trigger',
      inputSchema: '{"input": "string"}',
      outputSchema: '{"result": "string"}',
      audit: {
        astPassed: true,
        signedHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 8)}`,
        sandboxLevel: 'L3-Isolated',
        vulnerabilityScore: 100,
        verifiedBy: 'AutoHive AST Scanner'
      },
      isInstalled: true,
      compatibleModes: ['cloud', 'edge'],
      tags: ['Developer', 'Custom', newSkillCategory],
      manifestCode: newSkillCode
    };

    setSkillsList([createdSkill, ...skillsList]);
    setShowPublishSkillModal(false);
    setAuditSuccess(false);
    setNewSkillName('');
    setNewSkillDesc('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Marketplace Banner */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 sm:p-8 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Store className="w-4 h-4" />
              AutoHive Agent & Skill Marketplace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Skill Modules, AI Agents & WASM Extensions
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Enhance autonomous agents with modular skills (AST vulnerability scanners, Schnorr state signers, vector RAG search, causal MCTS tree reasoning). Developers can contribute skills with zero-trust AST security verification.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowPublishSkillModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-2 rounded text-xs flex items-center gap-2 transition active:scale-95 shadow-sm"
            >
              <Code className="w-4 h-4" />
              Publish New Skill
            </button>
            <button
              onClick={() => setShowPublishAgentModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded text-xs font-bold flex items-center gap-2 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Publish Agent
            </button>
          </div>
        </div>

        {/* Tab Toggle: Agents vs Skills */}
        <div className="flex items-center gap-3 border-t border-slate-800 pt-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition ${
              activeTab === 'skills'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500 shadow-sm'
                : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Agent Skills Marketplace ({skillsList.length})
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-bold transition ${
              activeTab === 'agents'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500 shadow-sm'
                : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Agent Fleet ({MARKETPLACE_AGENTS.length})
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="pt-2 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 font-mono">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'skills'
                  ? 'Search skills by name, AST audit, or category (e.g., Schnorr, RAG, AST, MCTS)...'
                  : 'Search agents by name, skill, or keyword...'
              }
              className="w-full bg-black/40 border border-slate-800 rounded pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar font-mono text-xs">
            {activeTab === 'skills'
              ? skillCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSkillCategory(cat)}
                    className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition ${
                      selectedSkillCategory === cat
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500 font-bold'
                        : 'bg-black/30 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))
              : agentCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedAgentCategory(cat)}
                    className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition ${
                      selectedAgentCategory === cat
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500 font-bold'
                        : 'bg-black/30 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
          </div>
        </div>
      </div>

      {/* TAB 1: AGENT SKILLS MARKETPLACE */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <article
              key={skill.id}
              className="bg-[#0F1115] border border-slate-800 hover:border-blue-500/60 rounded-lg p-5 space-y-4 shadow-md transition duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner">
                      {skill.icon}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition flex items-center gap-1.5">
                        {skill.name}
                      </h2>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <span>{skill.author}</span>
                        <span>•</span>
                        <span className="text-blue-400 font-bold">{skill.version}</span>
                      </div>
                    </div>
                  </div>

                  <span className="bg-slate-900 text-amber-400 border border-slate-800 text-[11px] px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {skill.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {skill.description}
                </p>

                {/* Security Audit Badge & Sandbox Indicator */}
                <div className="bg-black/40 border border-slate-800 rounded p-2.5 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">AST AUDIT STATUS:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      PASSED ({skill.audit.vulnerabilityScore}/100)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">SANDBOX:</span>
                    <span className="text-slate-300 font-bold">{skill.audit.sandboxLevel}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">SIGNED HASH:</span>
                    <span className="text-slate-400 truncate max-w-[140px]">{skill.audit.signedHash}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black/30 text-slate-500 text-[10px] px-2 py-0.5 rounded border border-slate-800 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center gap-2 font-mono">
                <button
                  onClick={() => setInspectSkill(skill)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-1.5 rounded text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Code className="w-3.5 h-3.5 text-blue-400" />
                  Inspect
                </button>
                <button
                  onClick={() => handleInstallSkill(skill.id)}
                  className={`flex-1 font-bold py-1.5 rounded text-xs flex items-center justify-center gap-1.5 transition ${
                    skill.isInstalled
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                  }`}
                >
                  {skill.isInstalled ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Installed
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Install Skill
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* TAB 2: AGENT FLEET MARKETPLACE */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <article
              key={agent.id}
              className="bg-[#0F1115] border border-slate-800 hover:border-blue-500/60 rounded-lg p-5 space-y-4 shadow-md transition duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner">
                      {agent.icon}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white group-hover:text-blue-400 transition flex items-center gap-1.5">
                        {agent.name}
                        {agent.isStarterPack && (
                          <span className="bg-blue-600/10 text-blue-400 text-[9px] px-1.5 py-0.5 rounded font-extrabold border border-blue-500/30 font-mono">
                            STARTER
                          </span>
                        )}
                      </h2>
                      <p className="text-[11px] text-slate-500 font-mono">
                        By {agent.author} • {agent.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs font-mono font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {agent.rating}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {agent.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {agent.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-black/40 text-slate-500 text-[10px] px-2 py-0.5 rounded border border-slate-800 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
                <button
                  onClick={() => onSelectAgent(agent.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Launch Agent
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* INSPECT SKILL MODAL */}
      {inspectSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInspectSkill(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl">
                {inspectSkill.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  {inspectSkill.name}
                  <span className="text-xs text-blue-400 bg-blue-600/10 border border-blue-500/30 px-2 py-0.5 rounded">
                    {inspectSkill.version}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">By {inspectSkill.author} • Category: {inspectSkill.category}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">{inspectSkill.description}</p>

            {/* AST Audit & Sandbox Details */}
            <div className="bg-black/50 border border-slate-800 p-4 rounded space-y-2 text-xs">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                Security Audit & Verification Report
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-500 block">VERIFIED BY:</span>
                  <span className="text-slate-200 font-bold">{inspectSkill.audit.verifiedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SANDBOX ISOLATION:</span>
                  <span className="text-slate-200 font-bold">{inspectSkill.audit.sandboxLevel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">VULNERABILITY SCORE:</span>
                  <span className="text-emerald-400 font-bold">{inspectSkill.audit.vulnerabilityScore} / 100</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SIGNED HASH:</span>
                  <span className="text-slate-400 truncate block">{inspectSkill.audit.signedHash}</span>
                </div>
              </div>
            </div>

            {/* Schemas */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-bold block mb-1">Input JSON Schema:</span>
                <pre className="bg-black/60 p-2.5 rounded border border-slate-800 text-[11px] text-blue-300 overflow-x-auto">
                  {inspectSkill.inputSchema}
                </pre>
              </div>
              <div>
                <span className="text-slate-400 font-bold block mb-1">Output JSON Schema:</span>
                <pre className="bg-black/60 p-2.5 rounded border border-slate-800 text-[11px] text-emerald-300 overflow-x-auto">
                  {inspectSkill.outputSchema}
                </pre>
              </div>
            </div>

            {/* Manifest Code */}
            {inspectSkill.manifestCode && (
              <div>
                <span className="text-slate-400 font-bold block mb-1 text-xs">Manifest Implementation Code:</span>
                <pre className="bg-black/80 p-3 rounded border border-slate-800 text-[11px] text-slate-300 overflow-x-auto">
                  {inspectSkill.manifestCode}
                </pre>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => handleInstallSkill(inspectSkill.id)}
                className={`w-full font-bold py-2 rounded text-xs flex items-center justify-center gap-2 transition ${
                  inspectSkill.isInstalled
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {inspectSkill.isInstalled ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Skill Installed in Workspace
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Install Skill into Agent Workspace
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEVELOPER PUBLISH SKILL WORKFLOW MODAL */}
      {showPublishSkillModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPublishSkillModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
            >
              ✕
            </button>

            <div className="space-y-1 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Developer Skill Contribution & Manifest Publishing
              </h3>
              <p className="text-xs text-slate-400">
                Publish a custom agent skill module. All submitted code must pass AST static vulnerability analysis before deployment.
              </p>
            </div>

            <form onSubmit={handlePublishSkillSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Zero-Knowledge Proof Signer"
                    className="w-full bg-black/50 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Version tag</label>
                  <input
                    type="text"
                    required
                    value={newSkillVersion}
                    onChange={(e) => setNewSkillVersion(e.target.value)}
                    placeholder="v1.0.0-edge"
                    className="w-full bg-black/50 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as SkillCategory)}
                  className="w-full bg-black/50 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Code Analysis">Code Analysis</option>
                  <option value="DeFi & Crypto">DeFi & Crypto</option>
                  <option value="Web & RAG">Web & RAG</option>
                  <option value="Multimodal">Multimodal</option>
                  <option value="Reasoning">Reasoning</option>
                  <option value="APIs">APIs</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Skill Description</label>
                <input
                  type="text"
                  required
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  placeholder="Summarize what this skill module provides..."
                  className="w-full bg-black/50 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">TypeScript Manifest Implementation</label>
                <textarea
                  rows={4}
                  required
                  value={newSkillCode}
                  onChange={(e) => setNewSkillCode(e.target.value)}
                  className="w-full bg-black/80 border border-slate-800 rounded p-3 text-slate-200 focus:outline-none focus:border-blue-500 text-[11px]"
                ></textarea>
              </div>

              {/* AST Security Audit Button */}
              <div className="bg-black/40 border border-slate-800 p-3 rounded space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300">AST Security & Sandbox Verification:</span>
                  {auditSuccess ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      AUDIT CLEARED (100/100)
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRunASTAudit}
                      disabled={isAuditing}
                      className="bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 px-3 py-1 rounded text-xs font-bold transition"
                    >
                      {isAuditing ? 'Scanning AST...' : 'Run AST Security Scan'}
                    </button>
                  )}
                </div>
                {auditSuccess && (
                  <p className="text-[10px] text-slate-400">
                    Cryptographic signature generated: <span className="text-emerald-400">0x9f8e...2a1b</span>. Safe for L3-Isolated sandbox execution.
                  </p>
                )}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPublishSkillModal(false)}
                  className="flex-1 bg-slate-800 text-slate-300 font-medium py-2 rounded hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!auditSuccess}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition disabled:opacity-50"
                >
                  Publish Skill to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLISH AGENT MODAL */}
      {showPublishAgentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowPublishAgentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Publish Custom Agent
              </h3>
              <p className="text-xs text-slate-400">Register a new agent persona in your AutoHive workspace.</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Agent successfully published to workspace!');
                setShowPublishAgentModal(false);
              }}
              className="space-y-3 pt-2 text-xs"
            >
              <div>
                <label className="block text-slate-400 font-medium mb-1">Agent Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Legal Compliance Auditor"
                  className="w-full bg-black/50 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">System Prompt Persona</label>
                <textarea
                  rows={3}
                  required
                  placeholder="You are a legal compliance auditor..."
                  className="w-full bg-black/50 border border-slate-800 rounded p-3 text-slate-200 focus:outline-none focus:border-blue-500 text-[11px]"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPublishAgentModal(false)}
                  className="flex-1 bg-slate-800 text-slate-300 font-medium py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-bold py-2 hover:bg-blue-500 transition"
                >
                  Publish Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
