import React, { useState } from 'react';
import { Cpu, Zap, WifiOff, HardDrive, Gauge, Shield, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import { INITIAL_EDGE_STATUS } from '../data/mockData';

export const EdgeLLMSandboxView: React.FC = () => {
  const [testPrompt, setTestPrompt] = useState('Analyze local device privacy for zero-knowledge prompt execution.');
  const [quantization, setQuantization] = useState<'4-bit' | '8-bit'>('4-bit');
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [benchmarkResult, setBenchmarkResult] = useState<{
    edgeTimeMs: number;
    cloudTimeMs: number;
    tokensPerSec: number;
  } | null>(null);

  const handleRunEdgePrompt = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setOutput(null);

    const startTime = performance.now();
    await new Promise((r) => setTimeout(r, 115)); // Simulate WASM inference latency
    const endTime = performance.now();

    const edgeTimeMs = Math.round(endTime - startTime);

    setOutput(
      `[ON-DEVICE WASM ENGINE EXECUTED] (0 Network Calls Made)\n\nProcessed "${testPrompt}" using local ${quantization} quantized context cache.\n\nSummary: All tokens generated directly within client WebWorker memory space. Zero telemetry or prompt text sent to external servers.`
    );

    setBenchmarkResult({
      edgeTimeMs,
      cloudTimeMs: 380,
      tokensPerSec: 68.4
    });

    setIsExecuting(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
          <Cpu className="w-4 h-4" />
          Edge Computing & On-Device LLM Sandbox
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          On-Device Local Model Execution & Edge Privacy Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          AutoHive supports executing quantized 4-bit transformer models directly in WebAssembly (WASM) / WebGPU inside the client runtime. Experience zero-latency execution with 100% offline data sovereignty.
        </p>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 font-mono">
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">LOCAL MODEL STATUS</span>
            <span className="font-extrabold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Loaded (4-bit)
            </span>
          </div>
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">RAM FOOTPRINT</span>
            <span className="font-extrabold text-cyan-400 mt-0.5">480 MB / 16 GB</span>
          </div>
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">AVG EDGE LATENCY</span>
            <span className="font-extrabold text-blue-400 mt-0.5">115 ms</span>
          </div>
          <div className="bg-black/50 p-3 rounded border border-slate-800 text-xs">
            <span className="text-slate-500 block text-[10px]">OFFLINE CAPABLE</span>
            <span className="font-extrabold text-emerald-400 flex items-center gap-1 mt-0.5">
              <WifiOff className="w-3.5 h-3.5" /> 100% Offline
            </span>
          </div>
        </div>
      </div>

      {/* On-Device Execution Tester */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-wider font-mono">
            <Gauge className="w-4 h-4 text-blue-400" />
            Interactive Local Model Tester
          </h2>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500 font-medium">Quantization:</span>
            <button
              onClick={() => setQuantization('4-bit')}
              className={`px-3 py-1 rounded font-bold transition ${
                quantization === '4-bit'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-black/40 text-slate-400 border border-slate-800'
              }`}
            >
              4-bit (Fastest)
            </button>
            <button
              onClick={() => setQuantization('8-bit')}
              className={`px-3 py-1 rounded font-bold transition ${
                quantization === '8-bit'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-black/40 text-slate-400 border border-slate-800'
              }`}
            >
              8-bit (High Precision)
            </button>
          </div>
        </div>

        <div className="space-y-1.5 font-mono">
          <label className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
            Test Input Prompt for Local WASM Engine:
          </label>
          <input
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            disabled={isExecuting}
            className="w-full bg-black/50 border border-slate-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <button
          onClick={handleRunEdgePrompt}
          disabled={isExecuting}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50 shadow-sm"
        >
          {isExecuting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Processing Local WASM Inference...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Execute On-Device Prompt
            </>
          )}
        </button>

        {/* Output & Benchmark Results */}
        {output && (
          <div className="space-y-4 pt-2">
            <div className="bg-black/50 p-4 rounded border border-blue-500/30 text-xs text-slate-200 font-mono space-y-2">
              <div className="flex items-center justify-between text-blue-400 font-bold border-b border-slate-800 pb-1">
                <span>ON-DEVICE WASM OUTPUT</span>
                <span>Latency: {benchmarkResult?.edgeTimeMs}ms</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{output}</p>
            </div>

            {/* Benchmark Comparison Card */}
            {benchmarkResult && (
              <div className="bg-black/40 border border-slate-800 rounded p-4 space-y-3 font-mono">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  Latency Comparison: Edge WASM vs Cloud Gemini
                </h4>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Edge WASM (Local)</span>
                      <span className="text-cyan-400 font-bold">{benchmarkResult.edgeTimeMs} ms</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded" style={{ width: '30%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Cloud Gemini 3.6 (Server API)</span>
                      <span className="text-blue-400 font-bold">{benchmarkResult.cloudTimeMs} ms</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                      <div className="bg-blue-600 h-full rounded" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
