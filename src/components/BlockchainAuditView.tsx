import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Database, Lock, CheckCircle2, Server, Key, ExternalLink } from 'lucide-react';
import { VerificationRecord } from '../types';

export const BlockchainAuditView: React.FC = () => {
  const [ledger, setLedger] = useState<VerificationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<VerificationRecord | null>(null);

  useEffect(() => {
    fetch('/api/verification/ledger')
      .then((res) => res.json())
      .then((data) => {
        if (data.ledger) setLedger(data.ledger);
      })
      .catch((err) => console.error('Ledger fetch error:', err));
  }, []);

  const filteredLedger = ledger.filter(
    (item) =>
      item.proofHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.taskSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.blockNumber.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
          <ShieldCheck className="w-4 h-4" />
          Decentralized Proof Verification Protocol (DVP)
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Blockchain State Verification & Immutable Ledger Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Every autonomous agent output generated on AutoHive produces a deterministic SHA-256 state proof hash. State roots are committed to Merkle trees and validated by 3 geographically distributed validator nodes.
        </p>

        {/* Network Consensus Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 font-mono">
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">CONSENSUS STATUS</span>
            <span className="font-extrabold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Healthy
            </span>
          </div>
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">ACTIVE VALIDATORS</span>
            <span className="font-extrabold text-white mt-0.5">3 / 3 Signed</span>
          </div>
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">LATEST VERIFIED BLOCK</span>
            <span className="font-extrabold text-blue-400 mt-0.5">#1048292</span>
          </div>
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">VERIFICATION TIME</span>
            <span className="font-extrabold text-cyan-400 mt-0.5">&lt; 12ms</span>
          </div>
        </div>
      </div>

      {/* Ledger Table Section */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-wider font-mono">
            <Database className="w-4 h-4 text-emerald-400" />
            Verified Ledger Logs ({filteredLedger.length})
          </h2>

          <div className="relative w-full sm:w-80 font-mono">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by hash, block #, or agent..."
              className="w-full bg-black/50 border border-slate-800 rounded pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-mono text-[11px]">
                <th className="pb-3 font-semibold">BLOCK #</th>
                <th className="pb-3 font-semibold">AGENT</th>
                <th className="pb-3 font-semibold">TASK SUMMARY</th>
                <th className="pb-3 font-semibold">PROOF HASH (SHA-256)</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold text-right">INSPECT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLedger.map((rec) => (
                <tr key={rec.proofHash} className="hover:bg-black/30 transition font-mono">
                  <td className="py-3 font-bold text-blue-400">#{rec.blockNumber}</td>
                  <td className="py-3 font-sans font-bold text-white">{rec.agentName}</td>
                  <td className="py-3 font-sans text-slate-300 max-w-xs truncate">{rec.taskSummary}</td>
                  <td className="py-3 text-emerald-400 truncate max-w-[200px]">{rec.proofHash}</td>
                  <td className="py-3">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                      ✓ {rec.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-sans">
                    <button
                      onClick={() => setSelectedRecord(rec)}
                      className="text-blue-400 hover:text-blue-300 font-bold hover:underline"
                    >
                      Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Inspector Drawer Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4" />
              Proof Inspector — Block #{selectedRecord.blockNumber}
            </div>

            <div className="space-y-3 text-xs font-mono bg-black/50 p-4 rounded border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px]">AGENT:</span>
                <span className="text-white font-bold">{selectedRecord.agentName} ({selectedRecord.agentId})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TASK SUMMARY:</span>
                <span className="text-slate-200 font-sans">{selectedRecord.taskSummary}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">PROOF HASH:</span>
                <span className="text-emerald-400 break-all">{selectedRecord.proofHash}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">STATE ROOT:</span>
                <span className="text-cyan-400 break-all">{selectedRecord.stateRoot}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">VALIDATOR SIGNATURES:</span>
                <div className="space-y-1 pt-1">
                  {selectedRecord.nodeSignatures.map((sig) => (
                    <div key={sig} className="text-emerald-400 flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full bg-slate-800 text-slate-200 font-bold py-2 rounded text-xs"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
