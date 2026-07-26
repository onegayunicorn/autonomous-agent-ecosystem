import { AgentSkill } from '../types';

export const INITIAL_SKILLS: AgentSkill[] = [
  {
    id: 'ast-vulnerability-scanner',
    name: 'AST Code Safety & Vulnerability Scanner',
    icon: '🛡️',
    category: 'Code Analysis',
    version: 'v2.1.0-edge',
    description: 'Performs deep Abstract Syntax Tree (AST) static analysis on agent code modules to detect unsafe memory pointers, prototype pollution, and arbitrary eval execution.',
    author: 'AutoHive Security Labs',
    rating: 4.95,
    installCount: 14200,
    triggerCondition: 'On-Code-Commit / Pre-Agent-Execution',
    inputSchema: '{"code": "string", "strictMode": "boolean"}',
    outputSchema: '{"isSafe": "boolean", "vulnerabilities": "array", "riskScore": "number"}',
    audit: {
      astPassed: true,
      signedHash: '0x8f3c...9a41b2',
      sandboxLevel: 'L3-Isolated',
      vulnerabilityScore: 100,
      verifiedBy: 'CertiK AI Auditor'
    },
    isInstalled: true,
    compatibleModes: ['cloud', 'edge'],
    tags: ['AST', 'Security', 'Static Analysis', 'Zero-Trust'],
    manifestCode: `export function scanAST(sourceCode: string) {
  // Parsing Abstract Syntax Tree
  const ast = parse(sourceCode);
  const hazards = findSecurityHazards(ast);
  return { isSafe: hazards.length === 0, hazards };
}`
  },
  {
    id: 'crypto-schnorr-signer',
    name: 'Schnorr & ECDSA Cryptographic State Signer',
    icon: '🔑',
    category: 'DeFi & Crypto',
    version: 'v1.4.2',
    description: 'Generates zero-knowledge Schnorr signatures and state merkle roots for agent outputs before broadcasting messages to the consensus ledger.',
    author: 'Chainlink Labs Core',
    rating: 4.91,
    installCount: 8900,
    triggerCondition: 'Post-Agent-Execution / Message-Broadcast',
    inputSchema: '{"stateData": "object", "privateKeyRef": "string"}',
    outputSchema: '{"proofHash": "string", "merkleRoot": "string", "signature": "string"}',
    audit: {
      astPassed: true,
      signedHash: '0x7e2d...1b8c94',
      sandboxLevel: 'L3-Isolated',
      vulnerabilityScore: 98,
      verifiedBy: 'OpenZeppelin Security'
    },
    isInstalled: true,
    compatibleModes: ['cloud', 'edge'],
    tags: ['Cryptography', 'Merkle Root', 'SHA-256', 'Schnorr'],
    manifestCode: `export function signStateProof(payload: object) {
  const hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  return { proofHash: '0x' + hash, timestamp: Date.now() };
}`
  },
  {
    id: 'rag-vector-indexer',
    name: 'HNSW RAG Vector Indexer & Search',
    icon: '⚡',
    category: 'Web & RAG',
    version: 'v3.0.1-wasm',
    description: 'High-performance Hierarchical Navigable Small World (HNSW) vector search engine optimized for client WASM memory. Index PDF & Markdown context on the fly.',
    author: 'Pinecone Community',
    rating: 4.88,
    installCount: 21500,
    triggerCondition: 'Context-Query / Document-Ingest',
    inputSchema: '{"queryVector": "number[]", "topK": "number"}',
    outputSchema: '{"matches": "array", "queryTimeMs": "number"}',
    audit: {
      astPassed: true,
      signedHash: '0x3a1f...8d7e6c',
      sandboxLevel: 'L2-Container',
      vulnerabilityScore: 96,
      verifiedBy: 'AutoHive Automated Audit'
    },
    isInstalled: false,
    compatibleModes: ['cloud', 'edge'],
    tags: ['Vector DB', 'HNSW', 'RAG', 'WASM'],
    manifestCode: `export function searchVectors(embedding: number[], topK = 5) {
  const neighbors = hnswIndex.searchKnn(embedding, topK);
  return { matches: neighbors };
}`
  },
  {
    id: 'multimodal-speech-synthesis',
    name: 'Neural On-Device Voice & Speech Synthesizer',
    icon: '🎙️',
    category: 'Multimodal',
    version: 'v1.1.0',
    description: 'Synthesizes natural, low-latency agent voice responses directly in WebAssembly without external streaming servers.',
    author: 'ElevenLabs Labs',
    rating: 4.79,
    installCount: 6400,
    triggerCondition: 'On-Agent-Response-Audio',
    inputSchema: '{"text": "string", "voiceId": "string"}',
    outputSchema: '{"audioBuffer": "ArrayBuffer", "sampleRate": "number"}',
    audit: {
      astPassed: true,
      signedHash: '0x9c4b...2a1f0d',
      sandboxLevel: 'L2-Container',
      vulnerabilityScore: 94,
      verifiedBy: 'Trail of Bits'
    },
    isInstalled: false,
    compatibleModes: ['edge'],
    tags: ['TTS', 'Audio', 'Speech', 'WASM'],
    manifestCode: `export async function synthesizeVoice(text: string) {
  const pcm = await wasmAudioEngine.generate(text);
  return { pcmBuffer: pcm };
}`
  },
  {
    id: 'causal-reasoning-tree',
    name: 'Causal Reasoning Tree & Monte Carlo Planner',
    icon: '🌲',
    category: 'Reasoning',
    version: 'v2.0.0',
    description: 'Implements Monte Carlo Tree Search (MCTS) reasoning paths to evaluate counterfactual scenarios before agent execution.',
    author: 'DeepMind Open-Source',
    rating: 4.97,
    installCount: 18200,
    triggerCondition: 'Pre-Agent-Decision-Node',
    inputSchema: '{"goal": "string", "depthLimit": "number"}',
    outputSchema: '{"bestPath": "array", "confidenceScore": "number"}',
    audit: {
      astPassed: true,
      signedHash: '0x5b2c...7d9e1f',
      sandboxLevel: 'L3-Isolated',
      vulnerabilityScore: 99,
      verifiedBy: 'AutoHive Security Labs'
    },
    isInstalled: true,
    compatibleModes: ['cloud', 'edge'],
    tags: ['MCTS', 'Reasoning', 'Tree Search', 'Planner'],
    manifestCode: `export function runMCTS(rootGoal: string) {
  const tree = buildReasoningTree(rootGoal);
  const bestNode = tree.getHighestUCTNode();
  return { chosenPath: bestNode.path };
}`
  },
  {
    id: 'rest-graphql-webhook-gateway',
    name: 'Universal REST & GraphQL Gateway Connector',
    icon: '🔌',
    category: 'APIs',
    version: 'v1.5.0',
    description: 'Secure proxy gateway that allows autonomous agents to safely query REST/GraphQL endpoints with token rate-limiting and encryption.',
    author: 'Postman Developer Team',
    rating: 4.82,
    installCount: 12900,
    triggerCondition: 'External-API-Fetch',
    inputSchema: '{"endpoint": "string", "method": "string", "body": "object"}',
    outputSchema: '{"status": "number", "responseData": "object"}',
    audit: {
      astPassed: true,
      signedHash: '0x1d4e...6f8a3c',
      sandboxLevel: 'L1-Standard',
      vulnerabilityScore: 92,
      verifiedBy: 'HackerOne AI Security'
    },
    isInstalled: false,
    compatibleModes: ['cloud'],
    tags: ['APIs', 'Gateway', 'GraphQL', 'REST'],
    manifestCode: `export async function callEndpoint(url: string, payload: any) {
  const response = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
  return await response.json();
}`
  }
];
