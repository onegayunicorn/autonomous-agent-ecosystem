import { ProtocolMessageEnvelope, ContractNetBid } from '../types';

export const INITIAL_PROTOCOL_MESSAGES: ProtocolMessageEnvelope[] = [
  {
    messageId: 'MSG-89012',
    protocol: 'contract-net',
    senderAgent: 'Warren Buffett Agent',
    receiverAgent: 'Patent Scout Agent',
    payloadSummary: 'TASK PROPOSAL: Evaluate patent portfolio claims for quantum computing hardware startup',
    nonce: 1042,
    stateProofHash: '0x8f3c4e1a2b5d6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    merkleRoot: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Beta (US)', 'Validator-Gamma (APAC)'],
    status: 'VERIFIED',
    latencyMs: 14,
    timestamp: '10:08:12'
  },
  {
    messageId: 'MSG-89013',
    protocol: 'pub-sub',
    senderAgent: 'Content Finder Agent',
    receiverAgent: 'BROADCAST_TOPIC [patent.prior_art.found]',
    payloadSummary: 'PUB/SUB EVENT: Discovered 3 prior art matches for USPTO #11,842,910 in public database',
    nonce: 1043,
    stateProofHash: '0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b',
    merkleRoot: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e',
    nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Beta (US)'],
    status: 'VERIFIED',
    latencyMs: 8,
    timestamp: '10:08:24'
  },
  {
    messageId: 'MSG-89014',
    protocol: 'dag-consensus',
    senderAgent: 'Research Blogger Agent',
    receiverAgent: 'Review Sentiment Agent',
    payloadSummary: 'DAG STATE SYNC: Block #1048291 verification output merged into parent state root',
    nonce: 1044,
    stateProofHash: '0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    merkleRoot: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
    nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Beta (US)', 'Validator-Gamma (APAC)'],
    status: 'VERIFIED',
    latencyMs: 11,
    timestamp: '10:08:45'
  },
  {
    messageId: 'MSG-89015',
    protocol: 'zk-state-sync',
    senderAgent: 'Edge WASM Node #0x7E2A',
    receiverAgent: 'Cloud Gemini Orchestrator',
    payloadSummary: 'ZK-SNARK STATE SYNC: Zero-knowledge succinct context vector proof compressed by 94.2%',
    nonce: 1045,
    stateProofHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    merkleRoot: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    nodeSignatures: ['Validator-Alpha (EU)', 'Validator-Gamma (APAC)'],
    status: 'VERIFIED',
    latencyMs: 4,
    timestamp: '10:09:02'
  }
];

export const INITIAL_CONTRACT_BIDS: ContractNetBid[] = [
  {
    agentId: 'patent-scout',
    agentName: 'Patent Scout Agent',
    bidPriceTokens: 12,
    estimatedTimeMs: 450,
    confidenceScore: 98,
    status: 'accepted'
  },
  {
    agentId: 'content-finder',
    agentName: 'Content Finder Agent',
    bidPriceTokens: 18,
    estimatedTimeMs: 320,
    confidenceScore: 89,
    status: 'rejected'
  },
  {
    agentId: 'warren-buffett',
    agentName: 'Warren Buffett Agent',
    bidPriceTokens: 25,
    estimatedTimeMs: 600,
    confidenceScore: 94,
    status: 'rejected'
  }
];
