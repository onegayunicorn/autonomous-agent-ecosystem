import React from 'react';
import { Cpu, ShieldCheck, Zap, Layers, Store, MessageSquare, Workflow, Terminal, UploadCloud, Network } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  documentCount: number;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  documentCount,
  onOpenUpload
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard & Monitor', icon: Layers },
    { id: 'starter-pack', label: 'Starter Pack (6)', icon: Zap },
    { id: 'marketplace', label: 'Skill Marketplace', icon: Store },
    { id: 'protocols', label: 'Agent Protocols', icon: Network },
    { id: 'workbench', label: 'Agent Workbench', icon: MessageSquare },
    { id: 'workflows', label: 'Multi-Agent DAG', icon: Workflow },
    { id: 'ledger', label: 'Blockchain Audit', icon: ShieldCheck },
    { id: 'edge', label: 'Edge LLM Sandbox', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F1115] border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black shadow-sm">
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-sans">AUTOHIVE</span>
                <span className="text-blue-500 text-xs font-mono opacity-80 font-bold">
                  v2.4.0-EDGE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Autonomous Agent Ecosystem & Verification Mesh</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="hidden xl:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 text-[11px]">BLOCKCHAIN: <span className="text-emerald-400 font-bold">SYNCED</span></span>
            </div>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-400 text-[11px]">EDGE NODE: <span className="text-white font-bold">0x7E2A...9F2</span></span>
            </div>
          </div>

          {/* Document Upload Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded text-xs font-bold transition shadow-sm active:scale-95"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Knowledge</span>
            <span className="bg-blue-950/60 text-blue-200 px-1.5 py-0.5 rounded text-[10px] font-extrabold">{documentCount}</span>
          </button>
        </div>

        {/* Tab Links */}
        <nav className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded transition ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 font-bold border-l-2 border-blue-500 bg-slate-800/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
