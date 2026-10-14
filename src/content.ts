import { project as liquidityProject } from "./liquidityProject";
import { project as covenantProject } from "./covenantProject";
import { realEstateProject } from "./realEstateProject";
import { project as deepMomentumProject } from "./deepMomentumProject";
import { project as sentimentProject } from "./sentimentProject";
import { project as housingForestProject } from "./housingForestProject";

export const categories = [
  "All work",
  "ML & deep learning",
  "Portfolio construction",
  "Empirical research",
  "Risk & underwriting",
  "Research tools",
  "Interactive learning",
] as const;
export type Category = (typeof categories)[number];

export type Project = {
  id: string;
  number: string;
  title: string;
  category: Exclude<Category, "All work">;
  status: string;
  question: string;
  contribution: string;
  result: string;
  limitation: string;
  methods: string[];
  links: { label: string; href: string; download?: boolean }[];
};

export const projects: Project[] = [
  {
    id: "customization",
    number: "01",
    title: "The cost of customization",
    category: "Portfolio construction",
    status: "Historical study",
    question:
      "What does a client restriction cost in tracking risk, and how much is avoiding a trade actually worth?",
    contribution:
      "Compared three allocation methods across ten account scenarios in a 2014 to 2025 walk-forward simulation, using actual CRSP returns, lagged risk estimates, drifting holdings, and account-funded trading costs.",
    result:
      "Minimum-risk allocation reduced realized net tracking error by a median 35.5% across nine constrained scenarios versus bounded proportional allocation.",
    limitation:
      "A retrospective, fixed eight-ETF study with current-vintage data and assumed costs. Not live client outcomes, tax-aware advice, or evidence of alpha.",
    methods: ["WRDS / CRSP", "CVXPY", "Ledoit-Wolf", "Walk-forward evaluation"],
    links: [
      { label: "Open the oversight lab", href: "https://joshgutierrez56.github.io/personalized-model-portfolios/" },
      { label: "View research & code", href: "https://github.com/JoshGutierrez56/personalized-model-portfolios" },
      { label: "Explore the scenario", href: "#tradeoffs" },
      { label: "Read the case study", href: "/assets/portfolio-case-study.md", download: true },
      { label: "Download aggregate data", href: "/assets/no-gold-summary.csv", download: true },
    ],
  },
  {
    id: "pure-news",
    number: "02",
    title: "Pure News Intelligence",
    category: "Research tools",
    status: "Frozen public prototype",
    question:
      "What changed in a corporate disclosure, and does the evidence support a useful research question?",
    contribution:
      "An evidence-linked workflow that compares disclosures, checks prior context, preserves source spans, and challenges unsupported narratives before presenting a hypothesis.",
    result:
      "995 evidence-backed disclosure changes. Eight bounded idea cases produced two hypotheses, six safe rejections, and zero actionable trade views.",
    limitation:
      "The demo serves frozen evidence packets, not live AI inference. Formal blinded human review and analyst-workflow validation remain pending.",
    methods: ["SEC filings", "Evidence retrieval", "Claim verification", "Skeptical review"],
    links: [
      {
        label: "Open interactive demo",
        href: "https://joshgutierrez56.github.io/pure-news-intelligence-demo/",
      },
      {
        label: "View source",
        href: "https://github.com/JoshGutierrez56/pure-news-intelligence-demo",
      },
      { label: "Why the research changed direction", href: "#project-news-research" },
    ],
  },
  {
    id: "news-research",
    number: "03",
    title: "When more information does not help",
    category: "Empirical research",
    status: "Completed null finding",
    question:
      "Do filing and news features add return-predictive information beyond simpler controls?",
    contribution:
      "A point-in-time research design with locked comparisons, explicit stopping gates, and retained negative findings. The result informed the narrower Pure News analyst-workflow prototype.",
    result:
      "Incremental information coefficient: -0.00227, with a 95% interval of [-0.00567, 0.00049]. The study did not validate incremental alpha.",
    limitation:
      "Public synthetic fixtures demonstrate pipeline behavior. Exact reproduction of the empirical estimates requires independently licensed data.",
    methods: ["Point-in-time inputs", "Locked comparisons", "Null results", "Reproducibility"],
    links: [
      {
        label: "Read the findings",
        href: "https://github.com/JoshGutierrez56/pure-news-research-public/blob/main/RESEARCH_FINDINGS.md",
      },
      {
        label: "View source",
        href: "https://github.com/JoshGutierrez56/pure-news-research-public",
      },
    ],
  },
  {
    id: "black-litterman",
    number: "04",
    title: "From analyst views to portfolio weights",
    category: "Portfolio construction",
    status: "Research prototype",
    question:
      "How can analyst conviction enter a portfolio without ignoring risk and implementation constraints?",
    contribution:
      "A Black-Litterman implementation for student-fund research, combining factor-based priors, conviction-weighted views, constrained optimization, and portfolio attribution.",
    result:
      "A reviewable implementation connecting investment views to constrained allocations. No improved-performance claim is made.",
    limitation:
      "A student-fund research prototype, not verified live deployment or evidence of improved investment performance.",
    methods: ["Black-Litterman", "Factor attribution", "CVXPY", "Portfolio constraints"],
    links: [
      {
        label: "Explore the repository",
        href: "https://github.com/JoshGutierrez56/360HF-BL-Optimizer",
      },
    ],
  },
  {
    id: "corporate-niche",
    number: "05",
    title: "Mapping competitive crowding",
    category: "Empirical research",
    status: "Synthetic benchmark",
    question:
      "Can a firm’s position in business-model space measure competitive crowding and strategic change?",
    contribution:
      "A six-dimensional representation with time-aware transformations and separate, preregistered tests of measurement, survival, and portfolio utility.",
    result:
      "The crowding measure recovered latent density with pooled Spearman correlation 0.3215 in the synthetic benchmark.",
    limitation:
      "No real-company validation. Return, general-survival, and stable-taxonomy claims were rejected; the result is measurement-only.",
    methods: ["Representation design", "Temporal validation", "Synthetic recovery", "Claim ledger"],
    links: [
      {
        label: "Read the research",
        href: "https://github.com/JoshGutierrez56/corporate-niche-dynamics",
      },
    ],
  },
  {
    id: "trading-floor",
    number: "06",
    title: "Trading Floor",
    category: "Interactive learning",
    status: "Pre-release UAT preview",
    question: "How can students practice markets, options, and decisions under pressure?",
    contribution:
      "A browser-based educational simulator with six practice modes, seeded scenarios, explanations, scoring, and replay. The focus is disciplined process, risk awareness, and communication.",
    result:
      "A playable practice environment covering market-making, execution, options, probability, catalysts, and mock interviews.",
    limitation:
      "Synthetic markets only. No live trading, hiring prediction, or established learning-efficacy claim.",
    methods: ["Interactive simulation", "Seeded scenarios", "Replay", "Local persistence"],
    links: [
      {
        label: "Try the simulator",
        href: "https://joshgutierrez56.github.io/trading-floor-interview-simulator-demo/",
      },
      {
        label: "View public preview",
        href: "https://github.com/JoshGutierrez56/trading-floor-interview-simulator-demo",
      },
    ],
  },
  liquidityProject,
  realEstateProject,
  covenantProject,
  deepMomentumProject,
  sentimentProject,
  housingForestProject,
];

export const scenarios = [
  {
    id: "proportional",
    name: "Proportional",
    short: "Proportional",
    te: 1.7483985426599649,
    turnover: 14.154101348160552,
    cost: 1.4154101348160553,
    description:
      "Redistributes policy weights within the account restrictions, without a covariance estimate.",
  },
  {
    id: "risk",
    name: "Minimum tracking risk",
    short: "Minimum risk",
    te: 1.369081354202466,
    turnover: 18.23098181024426,
    cost: 1.823098181024426,
    description: "Uses a lagged covariance estimate to minimize estimated active-return variance.",
  },
  {
    id: "turnover",
    name: "Lower turnover",
    short: "Lower turnover",
    te: 1.6389914509966248,
    turnover: 7.2452798263042215,
    cost: 0.7245279826304222,
    description:
      "Minimizes trading within a risk budget 25 basis points above minimum feasible estimated tracking error.",
  },
] as const;

export const github = "https://github.com/JoshGutierrez56";
