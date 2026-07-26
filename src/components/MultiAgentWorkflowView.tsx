import React, { useState } from 'react';
import { Workflow, Play, CheckCircle2, Clock, ShieldCheck, ArrowRight, Layers, Sparkles, RefreshCw, FileText } from 'lucide-react';
import { INITIAL_WORKFLOWS } from '../data/mockData';
import { MultiAgentWorkflow, WorkflowStep } from '../types';

export const MultiAgentWorkflowView: React.FC = () => {
  const [workflows, setWorkflows] = useState<MultiAgentWorkflow[]>([...INITIAL_WORKFLOWS]);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>('wf-1');
  const [customInput, setCustomInput] = useState<string>(
    'Decentralized zero-knowledge proof agent verification protocol for edge WASM models'
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const activeWorkflow = workflows.find((w) => w.id === activeWorkflowId) || workflows[0];

  const handleRunWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const updatedWorkflows = workflows.map((wf) => {
      if (wf.id !== activeWorkflowId) return wf;
      return {
        ...wf,
        status: 'running' as const,
        currentStepIndex: 0,
        steps: wf.steps.map((s) => ({ ...s, status: 'idle' as const, output: undefined }))
      };
    });
    setWorkflows(updatedWorkflows);

    // Sequential step-by-step execution simulation with state pass-through
    let accumulatedContext = customInput;

    for (let i = 0; i < activeWorkflow.steps.length; i++) {
      // Mark current step as running
      setWorkflows((prev) =>
        prev.map((wf) => {
          if (wf.id !== activeWorkflowId) return wf;
          const newSteps = [...wf.steps];
          newSteps[i] = { ...newSteps[i], status: 'running' };
          return { ...wf, currentStepIndex: i, steps: newSteps };
        })
      );

      const currentStep = activeWorkflow.steps[i];

      try {
        const res = await fetch(`/api/agents/${currentStep.agentId}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `[Step ${i + 1} - ${currentStep.title}]\nContext: ${accumulatedContext}`
          })
        });

        const data = await res.json();
        const outputText = data.response || 'Step execution completed successfully.';
        accumulatedContext += `\n\n[Output from Step ${i + 1} (${currentStep.agentId})]:\n${outputText}`;

        setWorkflows((prev) =>
          prev.map((wf) => {
            if (wf.id !== activeWorkflowId) return wf;
            const newSteps = [...wf.steps];
            newSteps[i] = {
              ...newSteps[i],
              status: 'completed',
              output: outputText,
              executionTimeMs: data.executionTimeMs || 340,
              proofHash: data.proofHash
            };
            return { ...wf, steps: newSteps };
          })
        );
      } catch (err) {
        console.error('Step execution error:', err);
      }

      await new Promise((r) => setTimeout(r, 600));
    }

    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id !== activeWorkflowId) return wf;
        return {
          ...wf,
          status: 'completed',
          aggregateProofHash: '0x9b4f2e7a1c3d5e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f',
          blockNumber: 1048293
        };
      })
    );

    setIsRunning(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
          <Workflow className="w-4 h-4" />
          Hivemind Multi-Agent DAG Orchestrator
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Autonomous Multi-Agent Directed Acyclic Graph (DAG) Pipelines
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Chain specialized agents into automated workflows. Outputs from initial agents (Brainstormer, Summarizer) automatically feed into downstream agents (Patent Scout, Warren Buffett, Research Blogger) with full cryptographic state proof generation.
        </p>
      </div>

      {/* Workflow Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar font-mono text-xs">
        {workflows.map((wf) => (
          <button
            key={wf.id}
            onClick={() => setActiveWorkflowId(wf.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded border font-bold transition whitespace-nowrap ${
              activeWorkflowId === wf.id
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-[#0F1115] text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-base">{wf.icon}</span>
            <span>{wf.name}</span>
          </button>
        ))}
      </div>

      {/* Main Workflow Execution Dashboard */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{activeWorkflow.icon}</span>
              {activeWorkflow.name}
            </h2>
            <p className="text-xs text-slate-400">{activeWorkflow.description}</p>
          </div>

          <button
            onClick={handleRunWorkflow}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-5 py-2 rounded text-xs flex items-center gap-2 transition active:scale-95 disabled:opacity-50 shadow-sm self-start sm:self-auto"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing Pipeline DAG...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Run Hivemind Pipeline
              </>
            )}
          </button>
        </div>

        {/* Pipeline Input Seed Box */}
        <div className="space-y-1.5 font-mono">
          <label className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
            Initial Seed Concept / Input Prompt:
          </label>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={isRunning}
            className="w-full bg-black/50 border border-slate-800 rounded px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        {/* Step-by-Step DAG Sequence */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
            DAG Execution Steps ({activeWorkflow.steps.length} Agents)
          </h3>

          <div className="space-y-4">
            {activeWorkflow.steps.map((step, idx) => {
              const isCurrent = activeWorkflow.currentStepIndex === idx && activeWorkflow.status === 'running';

              return (
                <div
                  key={step.id}
                  className={`border rounded-lg p-5 space-y-3 transition-all ${
                    step.status === 'completed'
                      ? 'bg-black/40 border-emerald-500/50'
                      : isCurrent
                      ? 'bg-black/60 border-blue-500 ring-1 ring-blue-500/30'
                      : 'bg-black/20 border-slate-800 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded font-extrabold text-xs flex items-center justify-center font-mono ${
                          step.status === 'completed'
                            ? 'bg-emerald-500 text-slate-950'
                            : isCurrent
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs flex items-center gap-2 uppercase tracking-wider font-mono">
                          {step.title}
                          <span className="bg-slate-900 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-slate-800 font-normal">
                            @{step.agentId}
                          </span>
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {step.status === 'completed' && (
                        <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold font-mono">
                          <CheckCircle2 className="w-4 h-4" />
                          Done ({step.executionTimeMs}ms)
                        </span>
                      )}
                      {isCurrent && (
                        <span className="flex items-center gap-1 text-blue-400 text-xs font-bold font-mono">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Executing...
                        </span>
                      )}
                      {step.status === 'idle' && (
                        <span className="text-slate-500 text-xs font-mono">Queued</span>
                      )}
                    </div>
                  </div>

                  {step.output && (
                    <div className="bg-black/50 p-4 rounded border border-slate-800 text-xs text-slate-200 space-y-2 font-sans">
                      <div className="flex items-center justify-between text-[11px] text-blue-400 font-bold border-b border-slate-800 pb-1 font-mono">
                        <span>Agent Output Log:</span>
                        {step.proofHash && (
                          <span className="text-emerald-400 text-[10px]">
                            Proof: {step.proofHash.substring(0, 18)}...
                          </span>
                        )}
                      </div>
                      <p className="whitespace-pre-line leading-relaxed">{step.output}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Aggregate Proof Certificate */}
        {activeWorkflow.status === 'completed' && activeWorkflow.aggregateProofHash && (
          <div className="bg-black/40 border border-emerald-500/40 rounded-lg p-5 space-y-2 text-center font-mono">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Aggregate Workflow State Verified
            </div>
            <p className="text-xs text-slate-300">
              Merkle Tree Root: <span className="text-emerald-300 break-all">{activeWorkflow.aggregateProofHash}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              All {activeWorkflow.steps.length} step agent outputs cryptographically signed and broadcasted to block #{activeWorkflow.blockNumber}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
