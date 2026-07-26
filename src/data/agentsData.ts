import { Agent } from '../types';

export const STARTER_PACK_AGENTS: Agent[] = [
  {
    id: 'content-finder',
    name: 'Content Finder',
    icon: '🔍',
    category: 'Starter Pack',
    description: 'Answers your complex questions by intelligently searching through your uploaded files and internal knowledge base.',
    benefits: [
      'Instantly surface findings from uploaded research docs, specs, and reports',
      'Ask natural-language questions across your entire document library',
      'Synthesise insights across multiple files simultaneously with exact source citations'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    isStarterPack: true,
    systemPrompt: `You are AutoHive Content Finder Agent. You answer user queries by searching across uploaded files and knowledge sources. Always cite document names and relevant excerpts. Be thorough, precise, and objective.`,
    rating: 4.9,
    runsCount: 14200,
    author: 'AutoHive Core',
    tags: ['RAG', 'Document Search', 'File Indexer', 'Q&A'],
    suggestedPrompts: [
      'What are the core technical specifications in my uploaded research paper?',
      'Find all references to security compliance and encryption in my documents.',
      'Compare key performance benchmarks across all attached project reports.'
    ]
  },
  {
    id: 'warren-buffett',
    name: 'Warren Buffett',
    icon: '📈',
    category: 'Starter Pack',
    description: 'Receive strategic business, value investing, and economic moat analysis from an AI Warren Buffett persona.',
    benefits: [
      'Stress-test R&D investment decisions against proven value-creation frameworks',
      'Evaluate long-term defensibility, pricing power, and competitive moat',
      'Get candid risk assessment and capital allocation advice on new ventures'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-amber-600 via-orange-600 to-yellow-500',
    isStarterPack: true,
    systemPrompt: `You are Warren Buffett, the Oracle of Omaha. Focus on long-term value creation, competitive moats, margin of safety, capital allocation, pricing power, and simple understandable businesses. Speak candidly, warmly, with practical analogies and sage business wisdom.`,
    rating: 4.95,
    runsCount: 28900,
    author: 'AutoHive Core',
    tags: ['Strategy', 'Finance', 'Moat Analysis', 'Investment'],
    suggestedPrompts: [
      'Evaluate the economic moat and pricing power of our enterprise SaaS platform.',
      'What are the major risks in allocating 30% of R&D budget to autonomous agents?',
      'How should we structure our capital allocation strategy for maximum 10-year ROI?'
    ]
  },
  {
    id: 'patent-scout',
    name: 'Patent Scout',
    icon: '🛡️',
    category: 'Starter Pack',
    description: 'A specialized IP research assistant that checks your idea\'s uniqueness, maps prior art, and flags patent hurdles.',
    benefits: [
      'Validate the novelty of new inventions and algorithm claims in minutes',
      'Uncover prior art and competing patent filings from global IP registries',
      'Pinpoint what makes your implementation distinct and strengthen claim coverage'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-purple-600 via-violet-600 to-indigo-600',
    isStarterPack: true,
    systemPrompt: `You are AutoHive Patent Scout Agent. Analyze user technical inventions for novelty, claims structure, prior art overlap, infringement risks, and defensive IP strategies. Provide structured claim breakdowns and novelty scores.`,
    rating: 4.88,
    runsCount: 11300,
    author: 'AutoHive Core',
    tags: ['IP Law', 'Patent Search', 'Novelty Assessment', 'Prior Art'],
    suggestedPrompts: [
      'Evaluate the patentability of a zero-knowledge decentralized agent verification protocol.',
      'Check prior art for an on-device quantized LLM context cache optimization.',
      'How can we structure defensive claims for our multi-agent consensus algorithm?'
    ]
  },
  {
    id: 'research-blogger',
    name: 'Research Blogger',
    icon: '✍️',
    category: 'Starter Pack',
    description: 'Generate original, research-backed blog posts and technical thought leadership from any set of web links or technical papers.',
    benefits: [
      'Transform technical R&D breakthroughs into polished, authoritative thought leadership',
      'Synthesise multiple source URLs and whitepapers into cohesive articles',
      'Deliver publication-ready content in Markdown, HTML, and structured executive briefs'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-emerald-600 via-teal-600 to-green-500',
    isStarterPack: true,
    systemPrompt: `You are AutoHive Research Blogger Agent. Craft deep, engaging, research-backed technical blog posts from provided links and topic prompts. Use clean headings, code snippets where applicable, insightful commentary, and clear citations.`,
    rating: 4.92,
    runsCount: 18500,
    author: 'AutoHive Core',
    tags: ['Content', 'Blogging', 'Research Synthesis', 'Technical Writing'],
    suggestedPrompts: [
      'Write a 1500-word deep-dive blog post on Decentralized Multi-Agent Verification.',
      'Synthesize recent research on Edge LLM quantization into an executive thought piece.',
      'Draft a developer-facing tutorial on building autonomous task coordination pipelines.'
    ]
  },
  {
    id: 'document-summarizer',
    name: 'Document Summarizer',
    icon: '📄',
    category: 'Starter Pack',
    description: 'Summarizes academic, financial, and technical documents, extracts key findings, and generates slide deck outlines.',
    benefits: [
      'Extract key findings and numerical benchmarks from massive documents in seconds',
      'Convert dense technical specifications into crisp executive summaries',
      'Generate slide deck outlines and executive reports automatically from R&D files'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-rose-600 via-pink-600 to-red-500',
    isStarterPack: true,
    systemPrompt: `You are AutoHive Document Summarizer Agent. Provide executive summaries, bulleted key findings, structured technical reports, and slide deck outlines from user documents or text inputs.`,
    rating: 4.87,
    runsCount: 31200,
    author: 'AutoHive Core',
    tags: ['Summarization', 'Executive Reports', 'Slide Generator', 'Data Extraction'],
    suggestedPrompts: [
      'Summarize this technical specification paper into a 1-page executive brief with bullet points.',
      'Extract all key financial metrics, risks, and milestones from this Q3 report.',
      'Generate an 8-slide presentation outline based on our project documentation.'
    ]
  },
  {
    id: 'usecase-brainstormer',
    name: 'Use Case Brainstormer',
    icon: '💡',
    category: 'Starter Pack',
    description: 'Discovers high-impact AI automation opportunities and generates a comprehensive architecture brief for custom agents.',
    benefits: [
      'Map team workflows to pinpoint high-ROI AI automation opportunities',
      'Generate fully scoped project briefs and system architectures for custom agents',
      'Determine optimal agent layout (single agent vs multi-agent hivemind)'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-yellow-500 via-amber-500 to-orange-500',
    isStarterPack: true,
    systemPrompt: `You are AutoHive Use Case Brainstormer Agent. Help users discover AI automation opportunities, design agent architectures, specify skill requirements, and compile comprehensive project briefs for autonomous agent deployment.`,
    rating: 4.91,
    runsCount: 16700,
    author: 'AutoHive Core',
    tags: ['Ideation', 'Workflow Mapping', 'Architecture', 'AI Strategy'],
    suggestedPrompts: [
      'Brainstorm 5 high-ROI AI agent use cases for a Fintech Compliance department.',
      'Design a multi-agent workflow brief for automated customer support triage and escalation.',
      'Map out the optimal agent skills and integrations for an R&D knowledge management pipeline.'
    ]
  }
];

export const MARKETPLACE_AGENTS: Agent[] = [
  ...STARTER_PACK_AGENTS,
  {
    id: 'gemini',
    name: 'Gemini 3.6',
    icon: '🧠',
    category: 'AI Models',
    description: 'Performs advanced reasoning, multimodal research, coding, and creative generation using Google\'s flagship AI model.',
    benefits: [
      'State-of-the-art multimodal reasoning and long-context processing',
      'High-speed code synthesis, debugging, and system architecture planning',
      'Integrated web search grounding and structured JSON schemas'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-blue-500 via-indigo-600 to-purple-600',
    isStarterPack: false,
    systemPrompt: `You are Gemini 3.6, Google's flagship AI model. You excel at complex reasoning, coding, multimodal synthesis, and precise technical answers.`,
    rating: 4.98,
    runsCount: 95400,
    author: 'Google DeepMind',
    tags: ['Flagship LLM', 'Multimodal', 'Reasoning', 'Coding'],
    suggestedPrompts: [
      'Refactor this Express TypeScript API endpoint for high-throughput async processing.',
      'Explain the mathematical foundation of Merkle Tree proof verification in plain terms.',
      'Draft a comprehensive architecture diagram and code structure for an autonomous multi-agent task runner.'
    ]
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    icon: '🧬',
    category: 'AI Models',
    description: 'Delivers intelligent, safety-focused assistance for complex problem-solving, code architecture, and nuanced knowledge synthesis.',
    benefits: [
      'Industry-leading code generation, refactoring, and logical reasoning',
      'Nuanced writing style with deep focus on clarity and edge-case detection',
      'High safety alignment and detailed architectural evaluations'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-orange-500 via-amber-600 to-yellow-600',
    isStarterPack: false,
    systemPrompt: `You are Claude 3.5 Sonnet persona inside AutoHive. Provide thoughtful, highly structured, logical, and safety-focused reasoning and code.`,
    rating: 4.97,
    runsCount: 88200,
    author: 'Anthropic',
    tags: ['Reasoning', 'Code Master', 'Safety', 'Analysis'],
    suggestedPrompts: [
      'Audit this smart contract for reentrancy vulnerabilities and state manipulation risks.',
      'Draft a clear, empathetic explanation of our technical post-mortem incident report.',
      'Compare standard REST vs gRPC for internal agent-to-agent RPC communications.'
    ]
  },
  {
    id: 'prompt-writer',
    name: 'Prompt Writer',
    icon: '✏️',
    category: 'Productivity',
    description: 'Writes expert system instructions and prompt engineering frameworks for your custom agents by discovering tools and workflows.',
    benefits: [
      'Generate robust, production-ready system prompts with XML tags and guardrails',
      'Automatically map required tool declarations and parameter schemas',
      'Optimize prompts for lower token usage and higher instruction-following fidelity'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-purple-500 via-pink-500 to-rose-500',
    isStarterPack: false,
    systemPrompt: `You are AutoHive Prompt Writer Agent. You craft highly effective system prompts, instruction files, and agent definitions complete with XML section tags, role definition, guidelines, constraints, and tool usage patterns.`,
    rating: 4.91,
    runsCount: 22100,
    author: 'AutoHive Community',
    tags: ['Prompt Engineering', 'System Instructions', 'Agent Creator'],
    suggestedPrompts: [
      'Write a system prompt for an AI Code Reviewer agent that checks PRs for security and performance.',
      'Create a system instruction file for an automated customer support escalation agent.',
      'Generate a prompt engineering framework for an AI data extraction pipeline.'
    ]
  },
  {
    id: 'aeo-optimization',
    name: 'AEO Optimization',
    icon: '📊',
    category: 'Marketing',
    description: 'Analyzes and scores your website\'s Answer Engine Optimization (AEO), delivering actionable plans for AI Search (Perplexity, ChatGPT, Gemini).',
    benefits: [
      'Score your site\'s visibility across AI answer engines and conversational search',
      'Identify structured data JSON-LD gaps and direct question-answering formatting',
      'Get a prioritized step-by-step roadmap to dominate AI snippet citations'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    isStarterPack: false,
    systemPrompt: `You are AutoHive AEO (Answer Engine Optimization) Agent. Evaluate website URLs, brand queries, and content structures for AI Search visibility (Perplexity, ChatGPT, Gemini Search Grounding). Provide a 0-100 score, key schema gaps, top question targets, and an actionable optimization roadmap.`,
    rating: 4.89,
    runsCount: 14800,
    author: 'SEO Hive',
    tags: ['AEO', 'AI Search', 'Schema Markup', 'Visibility Score'],
    suggestedPrompts: [
      'Analyze AEO visibility for https://autohive.ai and suggest JSON-LD improvements.',
      'How can we optimize our product landing page to get cited in Gemini and Perplexity research mode?',
      'Generate top 10 targeted Q&A content blocks for our autonomous agent platform.'
    ]
  },
  {
    id: 'ask-autohive',
    name: 'Ask Autohive',
    icon: '❓',
    category: 'Support',
    description: 'Quickly find accurate answers about Autohive features, SDKs, agent creation, and edge deployment options.',
    benefits: [
      'Instant expert answers on Autohive platform APIs, SDKs, and workflows',
      'Step-by-step guidance for deploying custom agents and setting up verification',
      'Troubleshoot integrations with Slack, Notion, looker, and custom REST hooks'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-indigo-500 via-blue-600 to-sky-500',
    isStarterPack: false,
    systemPrompt: `You are Ask Autohive, the official AI support assistant for the AutoHive Platform. Help users navigate AutoHive features, Starter Pack agents, Marketplace publishing, Edge LLM execution, and Blockchain Verification APIs.`,
    rating: 4.96,
    runsCount: 42000,
    author: 'AutoHive Team',
    tags: ['Support', 'Platform Docs', 'SDK Help', 'Onboarding'],
    suggestedPrompts: [
      'How do I set up a custom multi-agent workflow in AutoHive?',
      'Explain how the Decentralized Blockchain Verification protocol verifies agent outputs.',
      'How can I switch an agent to run in Edge / On-Device LLM mode for privacy?'
    ]
  },
  {
    id: 'appstore-analyzer',
    name: 'App Store Reviews Analyzer',
    icon: '⭐',
    category: 'Analytics',
    description: 'Turn Apple App Store & Google Play reviews into actionable product insights, sentiment trends, and feature roadmaps.',
    benefits: [
      'Automatically categorize thousands of user reviews into key product themes',
      'Detect emerging bug spikes, UI pain points, and top requested features',
      'Calculate sentiment breakdown and receive prioritized developer action items'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    bannerGradient: 'from-amber-500 via-rose-500 to-purple-600',
    isStarterPack: false,
    systemPrompt: `You are AutoHive App Store Reviews Analyzer. Analyze user app reviews for sentiment distribution, bug reports, feature requests, UI friction points, and output prioritized product recommendations.`,
    rating: 4.86,
    runsCount: 9300,
    author: 'AppMetrics',
    tags: ['Reviews', 'Sentiment', 'App Store', 'Product Roadmap'],
    suggestedPrompts: [
      'Analyze sample reviews for a fitness tracker app and highlight top 3 bug complaint categories.',
      'Convert these user feedback comments into a prioritized product backlog.',
      'What are the main reasons users cite for 1-star ratings in this review batch?'
    ]
  }
];
