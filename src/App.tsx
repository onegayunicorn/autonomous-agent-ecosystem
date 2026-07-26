import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNavbar } from './components/BottomNavbar';
import { DashboardView } from './components/DashboardView';
import { StarterPackView } from './components/StarterPackView';
import { MarketplaceView } from './components/MarketplaceView';
import { AgentProtocolsView } from './components/AgentProtocolsView';
import { AgentWorkbenchView } from './components/AgentWorkbenchView';
import { MultiAgentWorkflowView } from './components/MultiAgentWorkflowView';
import { BlockchainAuditView } from './components/BlockchainAuditView';
import { EdgeLLMSandboxView } from './components/EdgeLLMSandboxView';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { DocumentFile } from './types';
import { INITIAL_DOCUMENTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedAgentId, setSelectedAgentId] = useState<string>('content-finder');
  const [documents, setDocuments] = useState<DocumentFile[]>([...INITIAL_DOCUMENTS]);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/documents')
      .then((res) => res.json())
      .then((data) => {
        if (data.documents && data.documents.length > 0) {
          setDocuments(data.documents);
        }
      })
      .catch((err) => console.error('Fetch docs error:', err));
  }, []);

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    setActiveTab('workbench');
  };

  const handleUploadSuccess = (newDoc: DocumentFile) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-slate-300 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documentCount={documents.length}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {activeTab === 'dashboard' && (
          <DashboardView
            onSelectAgent={handleSelectAgent}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'starter-pack' && (
          <StarterPackView onSelectAgent={handleSelectAgent} />
        )}

        {activeTab === 'marketplace' && (
          <MarketplaceView onSelectAgent={handleSelectAgent} />
        )}

        {activeTab === 'protocols' && <AgentProtocolsView />}

        {activeTab === 'workbench' && (
          <AgentWorkbenchView
            selectedAgentId={selectedAgentId}
            onSelectAgent={setSelectedAgentId}
            documents={documents}
          />
        )}

        {activeTab === 'workflows' && <MultiAgentWorkflowView />}

        {activeTab === 'ledger' && <BlockchainAuditView />}

        {activeTab === 'edge' && <EdgeLLMSandboxView />}
      </main>

      {/* Mobile Native Bottom Navigation Bar */}
      <BottomNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documentCount={documents.length}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Desktop Footer Status Bar */}
      <footer className="hidden md:flex sticky bottom-0 z-30 h-8 bg-[#0F1115] border-t border-slate-800 items-center px-4 justify-between text-[10px] font-mono text-slate-500">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>CPU: 12%</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>RAM: 6.4GB / 32GB</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>P2P NODES: 21</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span>ENCRYPTION: AES-256-GCM</span>
          <span className="text-slate-400 uppercase">Environment: Local-Edge-1</span>
        </div>
      </footer>

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
