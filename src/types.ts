export type AgentCategory = 'Starter Pack' | 'AI Models' | 'Productivity' | 'Marketing' | 'Analytics' | 'Support';

export type ExecutionMode = 'cloud' | 'edge';

export interface AgentBenefit {
  text: string;
}

export interface Agent {
  id: string;
  name: string;
  icon: string;
  category: AgentCategory;
  description: string;
  benefits: string[];
  avatarUrl: string;
  bannerGradient: string;
  isStarterPack: boolean;
  systemPrompt: string;
  rating?: number;
  runsCount?: number;
  author?: string;
  tags?: string[];
  suggestedPrompts?: string[];
}

export interface DocumentFile {
  id: string;
  filename: string;
  fileType: string;
  size: string;
  uploadDate: string;
  content: string;
  summary?: string;
}

export interface ExecutionOptions {
  mode: ExecutionMode;
  fileIds?: string[];
  urls?: string[];
  topic?: string;
  idea?: string;
  domain?: string;
  keywords?: string[];
  constraints?: Record<string, any>;
  temperature?: number;
  reviews?: string[];
}

export interface SourceCitation {
  filename?: string;
  url?: string;
  title?: string;
  snippet: string;
  relevanceScore?: number;
}

export interface NoveltyAnalysis {
  score: number;
  keyClaims: string[];
  priorArtMatches: { title: string; patentNumber: string; summary: string }[];
  distinctiveFeatures: string[];
  infringementRisks: string[];
  recommendations: string[];
}

export interface AEOResult {
  score: number;
  searchVisibility: string;
  topSearchQuestions: string[];
  optimizationPlan: { priority: 'High' | 'Medium' | 'Low'; task: string; impact: string }[];
  structuredDataGaps: string[];
}

export interface ReviewSentimentResult {
  sentimentDistribution: { positive: number; neutral: number; negative: number };
  topThemes: string[];
  criticalBugReports: string[];
  featureRequests: string[];
  actionableInsights: string[];
}

export interface AgentExecutionResult {
  executionId: string;
  agentId: string;
  agentName: string;
  timestamp: string;
  prompt: string;
  response: string;
  modeUsed: ExecutionMode;
  modelUsed: string;
  executionTimeMs: number;
  sources?: SourceCitation[];
  noveltyAnalysis?: NoveltyAnalysis;
  aeoResult?: AEOResult;
  reviewResult?: ReviewSentimentResult;
  proofHash: string;
  blockNumber: number;
  stateRoot: string;
}

export interface WorkflowStep {
  id: string;
  agentId: string;
  title: string;
  promptTemplate: string;
  dependsOn?: string[];
  outputKey: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  output?: string;
  executionTimeMs?: number;
  proofHash?: string;
}

export interface MultiAgentWorkflow {
  id: string;
  name: string;
  description: string;
  icon: string;
  steps: WorkflowStep[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  currentStepIndex: number;
  aggregateProofHash?: string;
  blockNumber?: number;
}

export interface VerificationRecord {
  blockNumber: number;
  proofHash: string;
  stateRoot: string;
  agentId: string;
  agentName: string;
  taskSummary: string;
  timestamp: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  nodeSignatures: string[];
}

export interface EdgeNodeStatus {
  status: 'online' | 'processing' | 'offline';
  modelName: string;
  memoryUsageMB: number;
  totalMemoryMB: number;
  cpuUsagePct: number;
  averageLatencyMs: number;
  isOfflineCapable: boolean;
  activeContextTokens: number;
}

// Skill Marketplace & Developer Types
export type SkillCategory = 'Code Analysis' | 'DeFi & Crypto' | 'Web & RAG' | 'Multimodal' | 'Reasoning' | 'APIs';

export interface SkillSecurityAudit {
  astPassed: boolean;
  signedHash: string;
  sandboxLevel: 'L3-Isolated' | 'L2-Container' | 'L1-Standard';
  vulnerabilityScore: number; // 0-100, where 100 is pristine
  verifiedBy: string;
}

export interface AgentSkill {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  version: string;
  description: string;
  author: string;
  rating: number;
  installCount: number;
  triggerCondition: string;
  inputSchema: string;
  outputSchema: string;
  audit: SkillSecurityAudit;
  isInstalled?: boolean;
  compatibleModes: ExecutionMode[];
  tags: string[];
  manifestCode?: string;
}

// System Monitoring & Dashboard Types
export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  source: string;
  acknowledged: boolean;
}

export interface ActiveAgentTask {
  id: string;
  agentId: string;
  agentName: string;
  icon: string;
  currentTask: string;
  progressPct: number;
  status: 'running' | 'idle' | 'warning' | 'completed';
  cpuAllocationPct: number;
  memoryAllocatedMB: number;
  executionMode: ExecutionMode;
}

export interface SystemResourceMetrics {
  timestamp: string;
  cpuLoad: number;
  memoryMB: number;
  networkThroughputKB: number;
  consensusLatencyMs: number;
}

// Enhanced Agent Communication Protocol Types
export type ProtocolType = 'contract-net' | 'pub-sub' | 'dag-consensus' | 'zk-state-sync';

export interface ProtocolMessageEnvelope {
  messageId: string;
  protocol: ProtocolType;
  senderAgent: string;
  receiverAgent: string;
  payloadSummary: string;
  nonce: number;
  stateProofHash: string;
  merkleRoot: string;
  nodeSignatures: string[];
  status: 'VERIFIED' | 'TRANSMITTING' | 'QUEUED';
  latencyMs: number;
  timestamp: string;
}

export interface ContractNetBid {
  agentId: string;
  agentName: string;
  bidPriceTokens: number;
  estimatedTimeMs: number;
  confidenceScore: number;
  status: 'accepted' | 'rejected' | 'evaluating';
}

