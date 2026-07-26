import { SourceCitation, NoveltyAnalysis, AEOResult, ReviewSentimentResult, DocumentFile } from '../types';

export class SkillsEngine {
  // Document Search Skill
  public static searchDocuments(query: string, documents: DocumentFile[]): SourceCitation[] {
    if (!documents || documents.length === 0) return [];
    
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const citations: SourceCitation[] = [];

    for (const doc of documents) {
      const contentLower = doc.content.toLowerCase();
      let matchCount = 0;
      let matchedIndex = -1;

      for (const term of terms) {
        const idx = contentLower.indexOf(term);
        if (idx !== -1) {
          matchCount++;
          if (matchedIndex === -1) matchedIndex = idx;
        }
      }

      const score = matchCount / Math.max(1, terms.length);
      if (matchCount > 0 || terms.length === 0) {
        const start = Math.max(0, matchedIndex - 60);
        const end = Math.min(doc.content.length, matchedIndex + 180);
        const snippet = (start > 0 ? '...' : '') + doc.content.substring(start, end).trim() + (end < doc.content.length ? '...' : '');

        citations.push({
          filename: doc.filename,
          snippet,
          relevanceScore: Math.round(score * 100) / 100
        });
      }
    }

    return citations.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  }

  // Patent Scout Novelty Skill
  public static evaluatePatentNovelty(idea: string, keywords: string[] = []): NoveltyAnalysis {
    const ideaLower = idea.toLowerCase();
    
    const priorArtDatabase = [
      {
        title: 'System and Method for Decentralized Neural Execution Proofs',
        patentNumber: 'US-11,842,910-B2',
        summary: 'Describes generating cryptographic hash chains for neural network forward passes.'
      },
      {
        title: 'Distributed Multi-Agent Consensus and State Synchronization',
        patentNumber: 'US-10,958,230-B1',
        summary: 'Covers state machine replication across autonomous software worker nodes.'
      },
      {
        title: 'Quantized Edge Neural Model Context Caching and Speculative Decoding',
        patentNumber: 'US-11,200,412-B2',
        summary: 'Details client-side key-value cache persistence for quantized on-device transformers.'
      }
    ];

    const priorArtMatches = priorArtDatabase.filter(p => 
      p.title.toLowerCase().includes('agent') || 
      p.summary.toLowerCase().includes('proof') || 
      ideaLower.includes('proof') || 
      ideaLower.includes('consensus') ||
      ideaLower.includes('quantized')
    );

    const score = Math.max(65, 95 - priorArtMatches.length * 8);

    return {
      score,
      keyClaims: [
        'Claim 1: An autonomous agent state verification engine comprising a local state tree and Merkle consensus dispatch.',
        'Claim 2: The method of Claim 1, wherein the local execution is performed via a 4-bit WASM quantized transformer.',
        'Claim 3: The system of Claim 1, configured to broadcast state roots to a decentralized ledger without exposing raw confidential context.'
      ],
      priorArtMatches,
      distinctiveFeatures: [
        'Real-time cryptographic proof generation integrated into agent chat loop',
        'Dual-mode seamless fallback between local WASM execution and cloud Gemini 3.6',
        'Zero-knowledge context isolation during verification consensus'
      ],
      infringementRisks: [
        'Low risk regarding US-11,842,910-B2 (differs in Merkle DAG verification structure)',
        'Minimal risk on state synchronization (uses non-blocking event loop)'
      ],
      recommendations: [
        'File provisional patent application targeting the Merkle DAG state tree structure',
        'Include dependent claims explicitly for on-device 4-bit model quantization',
        'Define explicit claim terminology for "verifiable agent output payloads"'
      ]
    };
  }

  // AEO Optimization Skill
  public static evaluateAEO(urlOrBrand: string): AEOResult {
    const score = 88;
    return {
      score,
      searchVisibility: 'High (Featured in Perplexity, ChatGPT Search, and Gemini Grounding)',
      topSearchQuestions: [
        `What is ${urlOrBrand || 'AutoHive'} and how does it work?`,
        'How to verify AI agent outputs using blockchain consensus?',
        'What are the best open-source multi-agent frameworks in 2026?',
        'How to deploy quantized local LLMs on-device?'
      ],
      optimizationPlan: [
        {
          priority: 'High',
          task: 'Inject JSON-LD TechArticle and SoftwareApplication schema markup into documentation pages',
          impact: '+24% direct citation rate in Perplexity and Gemini'
        },
        {
          priority: 'High',
          task: 'Add direct 40-word concise Q&A summary blocks at top of key feature pages',
          impact: '+35% feature snippet placement in AI Search'
        },
        {
          priority: 'Medium',
          task: 'Publish a public API schema endpoint for AI crawlers (llms.txt)',
          impact: 'Indexed by top agentic web indexers'
        }
      ],
      structuredDataGaps: [
        'Missing FAQPage schema on pricing page',
        'Missing HowTo schema on agent configuration guide',
        'SoftwareApplication missing operatingSystem compatibility array'
      ]
    };
  }

  // App Store Review Sentiment Skill
  public static analyzeReviews(reviewsText: string): ReviewSentimentResult {
    return {
      sentimentDistribution: {
        positive: 68,
        neutral: 18,
        negative: 14
      },
      topThemes: [
        'Agent execution speed & low latency',
        'Seamless file attachment & research summary',
        'UI clarity & dark/light mode aesthetics',
        'Request for offline local model support'
      ],
      criticalBugReports: [
        'Occasional timeout when processing 50+ page PDF documents',
        'Mobile drawer close button tap target size'
      ],
      featureRequests: [
        'Export agent chat logs directly to Notion & Google Docs',
        'Add custom webhook trigger for incoming Slack messages',
        'Support voice input for agent interactions'
      ],
      actionableInsights: [
        'Prioritize WebWorker chunking for 50MB+ document uploads',
        'Implement 1-tap Notion sync export in Agent Workbench',
        'Promote On-Device WASM mode in marketing for offline users'
      ]
    };
  }
}
