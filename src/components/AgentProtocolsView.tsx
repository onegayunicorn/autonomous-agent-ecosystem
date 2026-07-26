import React, { useState } from 'react';
import { Workflow, Network, Radio, ShieldCheck, Zap, RefreshCw, Cpu, CheckCircle2, Sliders, ArrowRight, Activity, Database, Lock } from 'lucide-react';
import { INITIAL_PROTOCOL_MESSAGES, INITIAL_CONTRACT_BIDS } from '../data/protocolData';
import { ProtocolType, ProtocolMessageEnvelope, ContractNetBid } from '../types';

export const AgentProtocolsView: React.FC = () => {
  const [activeProtocol, setActiveProtocol] = useState<ProtocolType>('contract-net');
  const [messages, setMessages] = useState<ProtocolMessageEnvelope[]>(INITIAL_PROTOCOL_MESSAGES);
  const [bids, setBids] = useState<ContractNetBid[]>(INITIAL_CONTRACT_BIDS);
  const [selectedEnvelope, setSelectedEnvelope] = useState<ProtocolMessageEnvelope | null>(null);

  // Network condition sliders state
  const [edgeLatencyMs, setEdgeLatencyMs] = useState(8);
  const [packetLossPct, setPacketLossPct] = useState(0.1);
  const [bandwidthMode, setBandwidthMode] = useState<'cloud-mesh' | 'edge-wasm'>('cloud-mesh');
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);

      if (activeProtocol === 'contract-net') {
        const newMsg: ProtocolMessageEnvelope = {
          messageId: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
          protocol: 'contract-net',
          senderAgent: 'Patent Scout Agent',
          receiverAgent: 'Warren Buffett Agent',
          payloadSummary: `RFP CONTRACT AWARDED: Completed prior art valuation bid for 12 tokens`,
          nonce: Math.floor(1000 + Math.random() * 9000),
          stateProofHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
          merkleRoot: `0x${Math.random().toString(16).substring(2, 10)}`,
          nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Beta (US)', 'Validator-Gamma (APAC)'],
          status: 'VERIFIED',
          latencyMs: edgeLatencyMs + Math.floor(Math.random() * 5),
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages([newMsg, ...messages]);
      } else if (activeProtocol === 'pub-sub') {
        const newMsg: ProtocolMessageEnvelope = {
          messageId: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
          protocol: 'pub-sub',
          senderAgent: 'Review Sentiment Agent',
          receiverAgent: 'BROADCAST_TOPIC [customer.sentiment.spike]',
          payloadSummary: `PUB/SUB TOPIC EVENT: Positive sentiment index crossed 92.4% threshold across 1,400 reviews`,
          nonce: Math.floor(1000 + Math.random() * 9000),
          stateProofHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
          merkleRoot: `0x${Math.random().toString(16).substring(2, 10)}`,
          nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Beta (US)'],
          status: 'VERIFIED',
          latencyMs: edgeLatencyMs,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages([newMsg, ...messages]);
      } else if (activeProtocol === 'dag-consensus') {
        const newMsg: ProtocolMessageEnvelope = {
          messageId: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
          protocol: 'dag-consensus',
          senderAgent: 'Multi-Agent DAG Node #3',
          receiverAgent: 'Global Merkle Root Ledger',
          payloadSummary: `DAG NODE MERGED: Cryptographic state hash committed to Block #${1048293 + messages.length}`,
          nonce: Math.floor(1000 + Math.random() * 9000),
          stateProofHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
          merkleRoot: `0x${Math.random().toString(16).substring(2, 10)}`,
          nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Beta (US)', 'Validator-Gamma (APAC)'],
          status: 'VERIFIED',
          latencyMs: edgeLatencyMs + 2,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages([newMsg, ...messages]);
      } else {
        const newMsg: ProtocolMessageEnvelope = {
          messageId: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
          protocol: 'zk-state-sync',
          senderAgent: 'Edge WASM Node #0x3B9D',
          receiverAgent: 'Cloud Gemini Node',
          payloadSummary: `ZK-SNARK STATE SYNC: Compressed 16k context window into 128-byte proof payload`,
          nonce: Math.floor(1000 + Math.random() * 9000),
          stateProofHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
          merkleRoot: `0x${Math.random().toString(16).substring(2, 10)}`,
          nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Gamma (APAC)'],
          status: 'VERIFIED',
          latencyMs: Math.max(2, edgeLatencyMs - 4),
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages([newMsg, ...messages]);
      }
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Banner */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-4 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Network className="w-4 h-4" />
              AUTOHIVE Inter-Agent Communication & Consensus Protocols
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Dynamic Multi-Agent Coordination & Blockchain State Proofs
            </h1>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              AutoHive agents communicate through advanced decentralized protocols beyond simple text messages. Agents issue Task RFPs with federated bidding, broadcast topic events across Pub/Sub meshes, synchronize DAG states, and compress contexts with zero-knowledge proofs.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/40 border border-slate-800 p-3 rounded font-mono text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">CONSENSUS MODE:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> SHA-256 Merkle Sync
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
        <button
          onClick={() => setActiveProtocol('contract-net')}
          className={`p-4 rounded-lg border text-left transition space-y-1.5 ${
            activeProtocol === 'contract-net'
              ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm'
              : 'bg-[#0F1115] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Workflow className="w-4 h-4" /> Contract Net
            </span>
            <span className="text-[10px] bg-blue-950/60 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800/40">Bidding</span>
          </div>
          <p className="text-[11px] font-sans text-slate-400">
            Federated task allocation. Initiators request RFPs; candidate agents bid with cost/latency estimates.
          </p>
        </button>

        <button
          onClick={() => setActiveProtocol('pub-sub')}
          className={`p-4 rounded-lg border text-left transition space-y-1.5 ${
            activeProtocol === 'pub-sub'
              ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm'
              : 'bg-[#0F1115] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Radio className="w-4 h-4" /> Pub/Sub Event Mesh
            </span>
            <span className="text-[10px] bg-cyan-950/60 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800/40">Topics</span>
          </div>
          <p className="text-[11px] font-sans text-slate-400">
            Decentralized topic broadcasting for instant event notifications without central event brokers.
          </p>
        </button>

        <button
          onClick={() => setActiveProtocol('dag-consensus')}
          className={`p-4 rounded-lg border text-left transition space-y-1.5 ${
            activeProtocol === 'dag-consensus'
              ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm'
              : 'bg-[#0F1115] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Database className="w-4 h-4" /> DAG Verification
            </span>
            <span className="text-[10px] bg-emerald-950/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800/40">Merkle</span>
          </div>
          <p className="text-[11px] font-sans text-slate-400">
            Directed Acyclic Graph workflow validation. Child task outputs link cryptographically to parent roots.
          </p>
        </button>

        <button
          onClick={() => setActiveProtocol('zk-state-sync')}
          className={`p-4 rounded-lg border text-left transition space-y-1.5 ${
            activeProtocol === 'zk-state-sync'
              ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm'
              : 'bg-[#0F1115] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> ZK State Sync
            </span>
            <span className="text-[10px] bg-purple-950/60 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800/40">ZK-SNARK</span>
          </div>
          <p className="text-[11px] font-sans text-slate-400">
            Context vector compression via succinct zero-knowledge proofs for edge P2P mesh channels.
          </p>
        </button>
      </div>

      {/* Network Condition Controls & Live Simulation Section */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
            <Sliders className="w-4 h-4 text-blue-400" />
            Dynamic Context & Network Adaptive Parameters
          </h2>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50 shadow-sm font-mono self-start sm:self-auto"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Simulating {activeProtocol.toUpperCase()} Transmission...
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                Transmit {activeProtocol.toUpperCase()} Packet
              </>
            )}
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Slider 1: Latency */}
          <div className="bg-black/40 p-4 rounded border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-[11px]">
              <span>Edge P2P Latency:</span>
              <span className="text-blue-400 font-bold">{edgeLatencyMs} ms</span>
            </div>
            <input
              type="range"
              min="2"
              max="150"
              value={edgeLatencyMs}
              onChange={(e) => setEdgeLatencyMs(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-[10px] text-slate-500 block">
              {edgeLatencyMs < 20 ? '● Ultra-Fast WASM Edge' : '● Standard Cloud Routing'}
            </span>
          </div>

          {/* Slider 2: Packet Loss */}
          <div className="bg-black/40 p-4 rounded border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-[11px]">
              <span>Simulated Packet Loss:</span>
              <span className="text-cyan-400 font-bold">{packetLossPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={packetLossPct}
              onChange={(e) => setPacketLossPct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <span className="text-[10px] text-slate-500 block">
              {packetLossPct === 0 ? '● Perfect Channel' : '● Adaptive Retry Protocol Active'}
            </span>
          </div>

          {/* Bandwidth Mode Toggle */}
          <div className="bg-black/40 p-4 rounded border border-slate-800 space-y-2">
            <div className="text-slate-400 text-[11px] font-bold">Network Bandwidth Mode:</div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setBandwidthMode('cloud-mesh')}
                className={`py-1.5 rounded text-[11px] font-bold transition border ${
                  bandwidthMode === 'cloud-mesh'
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Cloud (10 Gbps)
              </button>
              <button
                onClick={() => setBandwidthMode('edge-wasm')}
                className={`py-1.5 rounded text-[11px] font-bold transition border ${
                  bandwidthMode === 'edge-wasm'
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                WASM Edge (P2P)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Net Bidding Matrix (If Contract Net Active) */}
      {activeProtocol === 'contract-net' && (
        <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-5 space-y-4 shadow-md font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Workflow className="w-4 h-4 text-blue-400" />
              Active Task RFP: Federated Contract Net Bids
            </h3>
            <span className="text-[11px] text-slate-500">Initiator: Warren Buffett Agent</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                  <th className="pb-2">CANDIDATE AGENT</th>
                  <th className="pb-2">BID PRICE</th>
                  <th className="pb-2">EST. TIME</th>
                  <th className="pb-2">CONFIDENCE</th>
                  <th className="pb-2">CONTRACT STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {bids.map((bid) => (
                  <tr key={bid.agentId} className="hover:bg-black/30">
                    <td className="py-2.5 font-bold text-white">{bid.agentName}</td>
                    <td className="py-2.5 text-blue-400 font-bold">{bid.bidPriceTokens} Tokens</td>
                    <td className="py-2.5 text-slate-400">{bid.estimatedTimeMs} ms</td>
                    <td className="py-2.5 text-emerald-400 font-bold">{bid.confidenceScore}%</td>
                    <td className="py-2.5">
                      {bid.status === 'accepted' ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                          ✓ AWARDED CONTRACT
                        </span>
                      ) : (
                        <span className="bg-slate-900 text-slate-500 px-2 py-0.5 rounded text-[10px]">
                          REJECTED
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Verified Message Envelopes Table */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-4 shadow-md font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Cryptographic Message Envelopes ({messages.length})
          </h2>
          <span className="text-[11px] text-slate-500">SHA-256 Verified Envelopes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                <th className="pb-3 font-semibold">MSG ID</th>
                <th className="pb-3 font-semibold">PROTOCOL</th>
                <th className="pb-3 font-semibold">SENDER</th>
                <th className="pb-3 font-semibold">RECEIVER</th>
                <th className="pb-3 font-semibold">STATE PROOF HASH</th>
                <th className="pb-3 font-semibold">LATENCY</th>
                <th className="pb-3 font-semibold">INSPECT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {messages.map((msg) => (
                <tr key={msg.messageId} className="hover:bg-black/30 transition">
                  <td className="py-3 font-bold text-blue-400">{msg.messageId}</td>
                  <td className="py-3">
                    <span className="bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded text-[10px] uppercase">
                      {msg.protocol}
                    </span>
                  </td>
                  <td className="py-3 text-white font-sans font-bold">{msg.senderAgent}</td>
                  <td className="py-3 text-slate-400 font-sans">{msg.receiverAgent}</td>
                  <td className="py-3 text-emerald-400 font-mono truncate max-w-[150px]">{msg.stateProofHash}</td>
                  <td className="py-3 text-slate-400">{msg.latencyMs} ms</td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelectedEnvelope(msg)}
                      className="text-blue-400 hover:text-blue-300 font-bold hover:underline text-[11px]"
                    >
                      Inspect Envelope →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRYPTOGRAPHIC ENVELOPE INSPECTOR MODAL */}
      {selectedEnvelope && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedEnvelope(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Cryptographic Message Envelope Inspector
            </div>

            <div className="space-y-3 text-xs bg-black/50 p-4 rounded border border-slate-800">
              <div>
                <span className="text-slate-500 block text-[10px]">MESSAGE ID / NONCE:</span>
                <span className="text-white font-bold">{selectedEnvelope.messageId} (Nonce: #{selectedEnvelope.nonce})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">PROTOCOL:</span>
                <span className="text-blue-400 font-bold uppercase">{selectedEnvelope.protocol}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">PAYLOAD SUMMARY:</span>
                <span className="text-slate-200 font-sans block pt-0.5">{selectedEnvelope.payloadSummary}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">SHA-256 STATE PROOF HASH:</span>
                <span className="text-emerald-400 break-all">{selectedEnvelope.stateProofHash}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">MERKLE ROOT COMMITMENT:</span>
                <span className="text-slate-300 break-all">{selectedEnvelope.merkleRoot}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">VALIDATOR NODE SIGNATURES:</span>
                <div className="space-y-1 pt-1 text-[11px]">
                  {selectedEnvelope.nodeSignatures.map((sig) => (
                    <div key={sig} className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedEnvelope(null)}
              className="w-full bg-slate-800 text-slate-200 font-bold py-2 rounded text-xs"
            >
              Close Envelope
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
