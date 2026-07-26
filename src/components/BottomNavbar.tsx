import React, { useState } from 'react';
import { Layers, Zap, Store, Network, MessageSquare, Workflow, ShieldCheck, Cpu, UploadCloud, X, MoreHorizontal } from 'lucide-react';

interface BottomNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  documentCount: number;
  onOpenUpload: () => void;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeTab,
  setActiveTab,
  documentCount,
  onOpenUpload
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryItems = [
    { id: 'dashboard', label: 'Monitor', icon: Layers },
    { id: 'starter-pack', label: 'Agents', icon: Zap },
    { id: 'marketplace', label: 'Skills', icon: Store },
    { id: 'protocols', label: 'Protocols', icon: Network },
    { id: 'workbench', label: 'Workbench', icon: MessageSquare }
  ];

  const secondaryItems = [
    { id: 'workflows', label: 'Multi-Agent DAG', icon: Workflow, desc: 'Visual task pipeline graph' },
    { id: 'ledger', label: 'Blockchain Audit', icon: ShieldCheck, desc: 'Immutable execution proofs' },
    { id: 'edge', label: 'Edge LLM Sandbox', icon: Cpu, desc: 'Client WASM model playground' }
  ];

  return (
    <>
      {/* Native App Slide-up Sheet for Secondary Items */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end md:hidden">
          <div
            className="bg-[#0F1115] border-t border-slate-800 rounded-t-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">AutoHive Navigation Hub</span>
              </div>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 font-mono text-xs">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMoreMenu(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border-blue-500'
                        : 'bg-black/40 text-slate-300 border-slate-800 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{item.label}</div>
                      <div className="text-[10px] text-slate-500 font-sans">{item.desc}</div>
                    </div>
                  </button>
                );
              })}

              {/* Action Upload Knowledge */}
              <button
                onClick={() => {
                  onOpenUpload();
                  setShowMoreMenu(false);
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Knowledge Payload</span>
                </div>
                <span className="bg-blue-950/60 text-blue-200 px-2 py-0.5 rounded text-[10px]">
                  {documentCount} Indexed
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Native Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1115]/95 backdrop-blur-md border-t border-slate-800 md:hidden px-2 py-1.5 shadow-2xl">
        <div className="grid grid-cols-6 items-center text-center font-mono">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setShowMoreMenu(false);
                }}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded transition min-h-[48px] ${
                  isActive ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className={`p-1 rounded-full transition ${isActive ? 'bg-blue-600/20' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] tracking-tight leading-none mt-1">{item.label}</span>
              </button>
            );
          })}

          {/* More Drawer Button */}
          <button
            onClick={() => setShowMoreMenu(true)}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded transition min-h-[48px] ${
              secondaryItems.some((i) => i.id === activeTab)
                ? 'text-blue-400 font-bold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <div className={`p-1 rounded-full transition ${secondaryItems.some((i) => i.id === activeTab) ? 'bg-blue-600/20' : ''}`}>
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight leading-none mt-1">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
