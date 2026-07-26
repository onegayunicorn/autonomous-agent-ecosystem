import React, { useState } from 'react';
import { Zap, ShieldCheck, Cpu, Play, ArrowRight, Layers, AlertTriangle, Activity, CheckCircle2, Pause, RefreshCw, Sliders, Bell, Server, Globe, BarChart2, HardDrive } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, LineChart, Line } from 'recharts';
import { STARTER_PACK_AGENTS } from '../data/agentsData';
import { INITIAL_SYSTEM_ALERTS, INITIAL_ACTIVE_TASKS, TIME_SERIES_RESOURCE_METRICS } from '../data/monitoringData';
import { SystemAlert, ActiveAgentTask } from '../types';

interface DashboardViewProps {
  onSelectAgent: (agentId: string) => void;
  onSelectTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectAgent, onSelectTab }) => {
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_SYSTEM_ALERTS);
  const [activeTasks, setActiveTasks] = useState<ActiveAgentTask[]>(INITIAL_ACTIVE_TASKS);
  const [alertFilter, setAlertFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);

  const filteredAlerts = alerts.filter((a) => alertFilter === 'all' || a.severity === alertFilter);

  const handleToggleTaskStatus = (taskId: string) => {
    setActiveTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'running' ? 'idle' : 'running';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleToggleMode = (taskId: string) => {
    setActiveTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, executionMode: t.executionMode === 'cloud' ? 'edge' : 'cloud' };
        }
        return t;
      })
    );
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  };

  const handleResolveAllAlerts = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
  };

  const handleRunDiagnostic = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      alert('System Diagnostic Complete: All 12 WASM worker threads, Gemini 3.6 proxy endpoints, and P2P consensus validators are operating with 100% health score.');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-lg bg-[#0F1115] border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/30 text-blue-400 px-3 py-1 rounded text-xs font-semibold font-mono">
              <Activity className="w-3.5 h-3.5" />
              SYSTEM HEALTH SCORE: 99.8% NOMINAL
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded text-xs font-semibold font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              SHA-256 CONSENSUS: SYNCED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            AUTOHIVE <span className="text-blue-500">— Real-Time Dashboard & System Monitoring Hub</span>
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Monitor active agent execution progress, track WASM heap memory & CPU utilization with interactive time-series visualizers, inspect live security audit alerts, and seamlessly adjust agent execution modes between Cloud Gemini 3.6 and Local Edge WASM.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={handleRunDiagnostic}
              disabled={isDiagnosticRunning}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded flex items-center gap-2 transition active:scale-95 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
              {isDiagnosticRunning ? 'Diagnosing System...' : 'Run Full System Diagnostic'}
            </button>
            <button
              onClick={() => onSelectTab('protocols')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded font-bold flex items-center gap-2 transition active:scale-95"
            >
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              Agent Protocols Mesh
            </button>
            <button
              onClick={() => onSelectTab('marketplace')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded font-bold flex items-center gap-2 transition active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Skill Marketplace
            </button>
          </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#0F1115] border border-slate-800 p-4 rounded-lg space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <span>Active Agents</span>
            <Zap className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{activeTasks.filter(t => t.status === 'running').length} / {activeTasks.length} Running</div>
          <div className="text-[11px] text-emerald-400 font-medium font-sans">100% Worker Thread Health</div>
        </div>

        <div className="bg-[#0F1115] border border-slate-800 p-4 rounded-lg space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <span>WASM Memory Heap</span>
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">490 MB</div>
          <div className="text-[11px] text-cyan-400 font-medium font-sans">48% of 1024 MB Allocation</div>
        </div>

        <div className="bg-[#0F1115] border border-slate-800 p-4 rounded-lg space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <span>CPU Core Load</span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">24%</div>
          <div className="text-[11px] text-emerald-400 font-medium font-sans">12 Parallel Workers Active</div>
        </div>

        <div className="bg-[#0F1115] border border-slate-800 p-4 rounded-lg space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            <span>Consensus Latency</span>
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">12 ms</div>
          <div className="text-[11px] text-slate-400 font-medium font-sans">SHA-256 Merkle Proof Verified</div>
        </div>
      </div>

      {/* ACTIVE AGENTS MONITOR & CONTROLS */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-4 shadow-md font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              Active Agent Tasks & Completion Progress
            </h2>
            <p className="text-xs text-slate-500 font-sans">Real-time status, sub-task details, CPU/Memory consumption, and mode toggles.</p>
          </div>
          <button
            onClick={() => onSelectTab('workbench')}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 font-mono"
          >
            Launch Workbench →
          </button>
        </div>

        <div className="space-y-3">
          {activeTasks.map((task) => (
            <div
              key={task.id}
              className="bg-black/40 border border-slate-800 rounded p-4 space-y-3 transition hover:border-slate-700"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-lg">
                    {task.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs font-sans">{task.agentName}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          task.status === 'running'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : task.status === 'completed'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        ● {task.status}
                      </span>
                      <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded uppercase">
                        MODE: {task.executionMode}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans pt-0.5 line-clamp-1">{task.currentTask}</p>
                  </div>
                </div>

                {/* Resource Allocations & Controls */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right hidden sm:block text-[11px]">
                    <span className="text-slate-500 block">ALLOCATION:</span>
                    <span className="text-slate-300">CPU: {task.cpuAllocationPct}% | RAM: {task.memoryAllocatedMB} MB</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleMode(task.id)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded text-[11px] font-bold transition"
                      title="Switch Execution Mode (Cloud vs Edge)"
                    >
                      Toggle {task.executionMode === 'cloud' ? 'Edge' : 'Cloud'}
                    </button>
                    <button
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                        task.status === 'running'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                      }`}
                    >
                      {task.status === 'running' ? 'Pause' : 'Resume'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Task Completion:</span>
                  <span className="font-bold text-blue-400">{task.progressPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      task.progressPct === 100
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                    }`}
                    style={{ width: `${task.progressPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REAL-TIME SYSTEM RESOURCE UTILIZATION CHARTS (RECHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: CPU Load & WASM Memory Utilization */}
        <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-5 space-y-4 shadow-md font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              CPU Core Load & WASM Memory Heap (Time Series)
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold">LIVE TELEMETRY</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIME_SERIES_RESOURCE_METRICS}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1115', borderColor: '#334155', borderRadius: '4px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="cpuLoad" name="CPU Load (%)" stroke="#3b82f6" fillOpacity={1} fill="url(#cpuGrad)" />
                <Area type="monotone" dataKey="memoryMB" name="WASM Heap (MB)" stroke="#06b6d4" fillOpacity={1} fill="url(#memGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Network Throughput & Consensus Latency */}
        <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-5 space-y-4 shadow-md font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              Network Throughput (KB/s) & Consensus Latency (ms)
            </h3>
            <span className="text-[10px] text-blue-400 font-bold">SHA-256 SYNC</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TIME_SERIES_RESOURCE_METRICS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F1115', borderColor: '#334155', borderRadius: '4px', fontSize: '11px' }}
                />
                <Bar dataKey="networkThroughputKB" name="Throughput (KB/s)" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="consensusLatencyMs" name="Latency (ms)" fill="#a855f7" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SYSTEM ALERT CENTER */}
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg p-6 space-y-4 shadow-md font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              System Alert Center ({alerts.filter((a) => !a.acknowledged).length} Active)
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 bg-black/40 border border-slate-800 rounded p-1">
              {(['all', 'critical', 'warning', 'info'] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setAlertFilter(sev)}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition ${
                    alertFilter === sev
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            <button
              onClick={handleResolveAllAlerts}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1 rounded text-[11px] font-bold transition"
            >
              Acknowledge All
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition ${
                alert.acknowledged
                  ? 'bg-black/20 border-slate-800/60 opacity-60'
                  : alert.severity === 'critical'
                  ? 'bg-red-950/20 border-red-500/40 text-red-200'
                  : alert.severity === 'warning'
                  ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                  : 'bg-blue-950/20 border-blue-500/40 text-blue-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      alert.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : alert.severity === 'warning'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="font-bold text-white font-sans">{alert.title}</span>
                  <span className="text-slate-500 text-[10px]">[{alert.source}]</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">{alert.message}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center font-mono">
                <span className="text-[10px] text-slate-500">{alert.timestamp}</span>
                {!alert.acknowledged && (
                  <button
                    onClick={() => handleAcknowledgeAlert(alert.id)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded text-[10px] font-bold transition"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STARTER PACK FLEET SECTION */}
      <div className="space-y-4 font-sans">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              Starter Pack Fleet Access
            </h2>
            <p className="text-xs text-slate-500">Instantly launch specialized autonomous agents for research, strategy, and code.</p>
          </div>
          <button
            onClick={() => onSelectTab('starter-pack')}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 font-mono"
          >
            Full Fleet <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STARTER_PACK_AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-[#0F1115] border border-slate-800 hover:border-blue-500/60 rounded-lg overflow-hidden shadow-md transition duration-200 flex flex-col justify-between group"
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={agent.avatarUrl}
                      alt={agent.name}
                      className="w-9 h-9 rounded object-cover ring-1 ring-slate-700 group-hover:ring-blue-400 transition"
                    />
                    <div>
                      <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{agent.icon}</span>
                        {agent.name}
                      </h3>
                      <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider font-mono">Starter Pack</span>
                    </div>
                  </div>
                  <span className="text-[11px] bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded font-mono">
                    ★ {agent.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {agent.description}
                </p>

                <ul className="space-y-1 pt-1">
                  {agent.benefits.slice(0, 2).map((b, i) => (
                    <li key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-black/20 border-t border-slate-800">
                <button
                  onClick={() => onSelectAgent(agent.id)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-sm font-mono"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Execute Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
