import { SystemAlert, ActiveAgentTask, SystemResourceMetrics } from '../types';

export const INITIAL_SYSTEM_ALERTS: SystemAlert[] = [
  {
    id: 'ALT-101',
    title: 'Consensus Merkle Proof Sync Delayed',
    message: 'Validator node Validator-Gamma (APAC) experienced 18ms block signature delay under high load.',
    severity: 'warning',
    timestamp: '10:07:42',
    source: 'Decentralized Ledger Sync',
    acknowledged: false
  },
  {
    id: 'ALT-102',
    title: 'AST Code Safety Audit Cleared',
    message: 'All 12 active agents passed static vulnerability scan with zero memory corruption flags.',
    severity: 'info',
    timestamp: '10:05:10',
    source: 'Security Audit Engine',
    acknowledged: true
  },
  {
    id: 'ALT-103',
    title: 'WASM Memory Heap Pressure Normal',
    message: 'Edge WASM memory utilization stabilized at 480 MB / 1024 MB allocation.',
    severity: 'info',
    timestamp: '10:02:18',
    source: 'Edge Client Runtime',
    acknowledged: true
  },
  {
    id: 'ALT-104',
    title: 'Cloud Rate Limit Shield Active',
    message: 'Gemini 3.6 API proxy route operating within 98.4% capacity buffer.',
    severity: 'info',
    timestamp: '09:58:30',
    source: 'Express Proxy Rate Limiter',
    acknowledged: true
  }
];

export const INITIAL_ACTIVE_TASKS: ActiveAgentTask[] = [
  {
    id: 'TASK-01',
    agentId: 'patent-scout',
    agentName: 'Patent Scout Agent',
    icon: '🔬',
    currentTask: 'Comparing prior art against USPTO claim #11,842,910',
    progressPct: 78,
    status: 'running',
    cpuAllocationPct: 18,
    memoryAllocatedMB: 120,
    executionMode: 'edge'
  },
  {
    id: 'TASK-02',
    agentId: 'warren-buffett',
    agentName: 'Warren Buffett Agent',
    icon: '📈',
    currentTask: 'Computing DCF valuation & moat durability index',
    progressPct: 92,
    status: 'running',
    cpuAllocationPct: 24,
    memoryAllocatedMB: 180,
    executionMode: 'cloud'
  },
  {
    id: 'TASK-03',
    agentId: 'content-finder',
    agentName: 'Content Finder Agent',
    icon: '🔍',
    currentTask: 'Indexing local document embeddings into HNSW vector index',
    progressPct: 100,
    status: 'completed',
    cpuAllocationPct: 4,
    memoryAllocatedMB: 85,
    executionMode: 'edge'
  },
  {
    id: 'TASK-04',
    agentId: 'review-sentiment',
    agentName: 'Review Sentiment Agent',
    icon: '💬',
    currentTask: 'Synthesizing bug reports & feature requests from user feedback',
    progressPct: 45,
    status: 'running',
    cpuAllocationPct: 14,
    memoryAllocatedMB: 95,
    executionMode: 'cloud'
  }
];

export const TIME_SERIES_RESOURCE_METRICS: SystemResourceMetrics[] = [
  { timestamp: '10:00', cpuLoad: 12, memoryMB: 380, networkThroughputKB: 140, consensusLatencyMs: 14 },
  { timestamp: '10:02', cpuLoad: 18, memoryMB: 420, networkThroughputKB: 210, consensusLatencyMs: 12 },
  { timestamp: '10:04', cpuLoad: 28, memoryMB: 450, networkThroughputKB: 380, consensusLatencyMs: 15 },
  { timestamp: '10:06', cpuLoad: 22, memoryMB: 480, networkThroughputKB: 290, consensusLatencyMs: 11 },
  { timestamp: '10:08', cpuLoad: 16, memoryMB: 460, networkThroughputKB: 240, consensusLatencyMs: 10 },
  { timestamp: '10:10', cpuLoad: 24, memoryMB: 490, networkThroughputKB: 310, consensusLatencyMs: 12 }
];
