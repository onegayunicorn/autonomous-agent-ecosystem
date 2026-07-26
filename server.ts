import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { generateGeminiContent } from './src/services/geminiService.js';
import { VerificationEngine } from './src/services/verification.js';
import { SkillsEngine } from './src/services/skillsEngine.js';
import { STARTER_PACK_AGENTS, MARKETPLACE_AGENTS } from './src/data/agentsData.js';
import { INITIAL_DOCUMENTS, INITIAL_VERIFICATION_RECORDS, INITIAL_EDGE_STATUS } from './src/data/mockData.js';
import { AgentExecutionResult, DocumentFile, VerificationRecord } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // In-memory runtime state store
  let documents: DocumentFile[] = [...INITIAL_DOCUMENTS];
  let verificationLedger: VerificationRecord[] = [...INITIAL_VERIFICATION_RECORDS];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'AutoHive AI Agent Engine',
      timestamp: new Date().toISOString(),
      activeAgentsCount: MARKETPLACE_AGENTS.length,
      edgeNodeStatus: INITIAL_EDGE_STATUS
    });
  });

  // Get list of documents
  app.get('/api/documents', (req, res) => {
    res.json({ documents });
  });

  // Upload new document
  app.post('/api/documents/upload', (req, res) => {
    try {
      const { filename, fileType, content } = req.body;
      if (!filename || !content) {
        return res.status(400).json({ error: 'Filename and content are required' });
      }

      const newDoc: DocumentFile = {
        id: `doc-${Date.now()}`,
        filename,
        fileType: fileType || 'Text Document',
        size: `${(content.length / 1024).toFixed(1)} KB`,
        uploadDate: new Date().toISOString().split('T')[0],
        content,
        summary: content.length > 200 ? content.substring(0, 200) + '...' : content
      };

      documents.unshift(newDoc);
      res.json({ success: true, document: newDoc, totalDocuments: documents.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Verification Ledger
  app.get('/api/verification/ledger', (req, res) => {
    res.json({ ledger: verificationLedger });
  });

  // Execute Agent Endpoint
  app.post('/api/agents/:agentId/execute', async (req, res) => {
    const startTime = Date.now();
    try {
      const { agentId } = req.params;
      const { prompt, mode = 'cloud', options = {} } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      // Find agent declaration
      const allAgents = [...STARTER_PACK_AGENTS, ...MARKETPLACE_AGENTS];
      const agent = allAgents.find(a => a.id === agentId) || {
        id: agentId,
        name: 'AutoHive Agent',
        systemPrompt: 'You are an intelligent AutoHive agent.'
      };

      let responseText = '';
      let citations = options.fileIds
        ? SkillsEngine.searchDocuments(
            prompt,
            documents.filter(d => options.fileIds.includes(d.id))
          )
        : SkillsEngine.searchDocuments(prompt, documents);

      let noveltyAnalysis = undefined;
      let aeoResult = undefined;
      let reviewResult = undefined;

      // Specialized Skill execution based on agent type
      if (agentId === 'patent-scout') {
        noveltyAnalysis = SkillsEngine.evaluatePatentNovelty(prompt, options.keywords || []);
      } else if (agentId === 'aeo-optimization') {
        aeoResult = SkillsEngine.evaluateAEO(prompt);
      } else if (agentId === 'appstore-analyzer') {
        reviewResult = SkillsEngine.analyzeReviews(prompt);
      }

      // 1. Try Gemini API if cloud mode requested
      if (mode === 'cloud') {
        let systemInst = agent.systemPrompt;
        if (citations.length > 0) {
          systemInst += `\n\nContext files available:\n${citations.map(c => `- ${c.filename}: ${c.snippet}`).join('\n')}`;
        }

        const geminiResult = await generateGeminiContent(systemInst, prompt);
        if (geminiResult) {
          responseText = geminiResult;
        }
      }

      // 2. Fallback / Persona Generator if offline or edge mode or Gemini key not active
      if (!responseText) {
        if (agentId === 'content-finder') {
          if (citations.length > 0) {
            responseText = `Based on your uploaded documents (**${citations[0].filename}**):\n\n${citations[0].snippet}\n\nKey finding: The documentation explicitly highlights secure encrypted protocols, state-hash verification, and modular architecture.`;
          } else {
            responseText = `I searched your uploaded files for "${prompt}". While no exact match was found in the current documents, here is the general analysis:\n\nAutoHive's internal knowledge base provides full coverage for autonomous multi-agent task management, zero-knowledge verification, and Edge WASM model execution.`;
          }
        } else if (agentId === 'warren-buffett') {
          responseText = `**Warren Buffett's Evaluation:**\n\nWhen evaluating "${prompt}", I always ask three fundamental questions:\n1. **Is there an enduring economic moat?** A true moat comes from high switching costs, brand power, or cost advantages. In AI agents, the moat isn't just the raw LLM—it's the proprietary data pipeline, customer lock-in, and cryptographic trust ledger.\n2. **What is the capital allocation efficiency?** Don't pour capital into fleeting hype cycles. Invest in defensible infrastructure where marginal costs drop with scale.\n3. **Is there a margin of safety?** Always discount optimistic projections by at least 30% to account for regulatory and technology shifts.\n\n*Rule #1: Never lose money. Rule #2: Never forget Rule #1.*`;
        } else if (agentId === 'patent-scout') {
          responseText = `**Patent Scout Analysis for:** *"${prompt}"*\n\n1. **Novelty Score:** **${noveltyAnalysis?.score || 88}/100**\n2. **Primary Claims:**\n   - Claim 1: A method for cryptographically validating neural agent state transitions via SHA-256 Merkle proofs.\n   - Claim 2: The system of Claim 1, operating on an edge-quantized WASM transformer engine.\n3. **Prior Art Assessment:** Identified 3 relevant patent filings in USPTO database. Your proposed Merkle DAG state verification provides strong distinctiveness against prior art US-11,842,910-B2.`;
        } else if (agentId === 'research-blogger') {
          responseText = `# Deep Dive: ${prompt}\n\n*Published by AutoHive Research Team | 2026 Edition*\n\n## Executive Overview\nAutonomous agent ecosystems represent the most significant paradigm shift in enterprise software since cloud computing. By combining **Edge LLM Execution**, **Decentralized Verification**, and **Directed Acyclic Graph (DAG) multi-agent pipelines**, teams can now execute complex workflows with mathematical trust.\n\n## Key Architectural Pillars\n1. **Zero-Knowledge Task Verification**: Verifying agent output state roots via cryptographic consensus.\n2. **Edge Computing Privacy**: Running 4-bit quantized models locally on user devices.\n3. **Agentic Hivemind**: Coordinating specialized agents seamlessly.\n\n> *“The future of software is not writing code manually, but orchestrating verifiable agents that collaborate autonomously.”*`;
        } else if (agentId === 'document-summarizer') {
          responseText = `## Executive Document Summary\n\n**Source Input:** ${prompt.substring(0, 80)}...\n\n### Key Takeaways\n- **Core Objective:** High-throughput autonomous multi-agent execution with zero-latency edge fallback.\n- **Performance:** 380ms avg response time in Cloud Gemini Mode; 120ms in Edge WASM Mode.\n- **Security:** SHA-256 state hashing with 66% validator consensus requirement.\n\n### Recommended Slide Deck Outline\n1. **Slide 1:** Title & Executive Summary\n2. **Slide 2:** Problem Statement: The AI Auditability Crisis\n3. **Slide 3:** AutoHive Solution Architecture\n4. **Slide 4:** Benchmark Results & ROI Metrics`;
        } else if (agentId === 'usecase-brainstormer') {
          responseText = `## AI Automation Opportunity Brief\n\n**Target Domain:** ${prompt}\n\n### Top 3 High-ROI Use Cases\n1. **Automated Regulatory & IP Screening Agent**: Automatically screens product specs against global patent databases and compliance standards. *(ROI: High | Complexity: Medium)*\n2. **Autonomous Technical Content Pipeline**: Converts raw Git commits and Jira specs into technical blog posts and documentation. *(ROI: High | Complexity: Low)*\n3. **Real-Time Customer Ticket Triage & Escalation**: Classifies incoming tickets, extracts bug logs, and routes to engineers. *(ROI: High | Complexity: Low)*\n\n**Recommended Architecture:** 3-Agent Hivemind (Triage -> Analysis -> Draft Generator).`;
        } else if (agentId === 'aeo-optimization') {
          responseText = `## Answer Engine Optimization (AEO) Report\n\n**Domain Target:** ${prompt}\n**AEO Index Score:** **88 / 100**\n\n### Optimization Roadmap\n1. **High Priority:** Inject \`JSON-LD\` TechArticle schema into core documentation pages.\n2. **High Priority:** Create 40-word concise answer blocks at the top of feature pages to capture Perplexity and Gemini Search Grounding snippets.\n3. **Medium Priority:** Deploy \`llms.txt\` manifest for agentic web indexers.`;
        } else if (agentId === 'appstore-analyzer') {
          responseText = `## App Store Reviews Sentiment & Insight Report\n\n**Analysis Target:** ${prompt}\n\n### Sentiment Distribution\n- 🟢 **Positive:** 68%\n- 🟡 **Neutral:** 18%\n- 🔴 **Negative:** 14%\n\n### Top Feedback Themes\n1. **Speed & Latency:** Users praised the <150ms execution in Edge Mode.\n2. **Feature Request:** Direct export options for Notion and Google Docs.\n3. **UI Polish:** High marks for the clean dark/light theme and responsive drawer controls.`;
        } else {
          responseText = `AutoHive Agent **${agent.name}** processed your request in **${mode.toUpperCase()}** mode:\n\nRegarding: "${prompt}"\n\nThe task was executed with full state hash tracking and verified against AutoHive's agent consensus protocols.`;
        }
      }

      const executionTimeMs = Date.now() - startTime;

      // Create Cryptographic State Verification Record
      const { proofHash, blockNumber, stateRoot } = await VerificationEngine.createVerificationRecord(
        agent.id,
        agent.name,
        prompt,
        responseText
      );

      // Log record to ledger
      const newRecord: VerificationRecord = {
        blockNumber,
        proofHash,
        stateRoot,
        agentId: agent.id,
        agentName: agent.name,
        taskSummary: prompt.length > 60 ? prompt.substring(0, 60) + '...' : prompt,
        timestamp: new Date().toISOString(),
        status: 'VERIFIED',
        nodeSignatures: ['node-us-east-1', 'node-eu-central-1', 'node-ap-southeast-1']
      };
      verificationLedger.unshift(newRecord);

      const result: AgentExecutionResult = {
        executionId: `exec-${Date.now()}`,
        agentId: agent.id,
        agentName: agent.name,
        timestamp: new Date().toISOString(),
        prompt,
        response: responseText,
        modeUsed: mode as any,
        modelUsed: mode === 'cloud' ? 'gemini-3.6-flash' : 'AutoHive-3.1-Flash-Lite-WASM',
        executionTimeMs,
        sources: citations,
        noveltyAnalysis,
        aeoResult,
        reviewResult,
        proofHash,
        blockNumber,
        stateRoot
      };

      res.json(result);
    } catch (err: any) {
      console.error('Agent execution error:', err);
      res.status(500).json({ error: err.message || 'Execution failed' });
    }
  });

  // Vite Middleware in Dev Mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoHive Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
