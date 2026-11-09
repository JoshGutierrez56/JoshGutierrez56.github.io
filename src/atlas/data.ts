import { projects } from "../content";

export const projectUrl = (id: string) => `/research/${id}/`;
export const sourceUrl = (href: string) =>
  href.startsWith("#project-")
    ? projectUrl(href.replace("#project-", ""))
    : href === "#tradeoffs"
      ? "/lab/"
      : href;
export const shortNames: Record<string, string> = {
  customization: "The cost of customization",
  "pure-news": "Pure News Intelligence",
  "sentiment-lab": "Sentiment, after costs",
  liquidity: "Forecasting liquidity",
  "black-litterman": "From conviction to allocation",
  optlab: "Optlab Research",
  "macro-regime": "When a macro signal stops working",
  "news-research": "Can news add predictive value?",
  "macro-hmm": "Regimes without hindsight",
  "risk-parity": "Equal capital ≠ equal risk",
  "housing-forest": "The baseline wins",
  "covenant-risk": "Risk along the loan’s path",
  "corporate-niche": "Mapping competitive crowding",
  "garch-volatility": "The shape of volatility",
  "deep-momentum": "Inside a trained LSTM",
  "trading-floor": "Trading Floor",
  "real-estate-risk": "Behind smooth property returns",
};
export const themeFor = (category: string) =>
  category === "Portfolio construction"
    ? "mint"
    : category === "Research tools"
      ? "blue"
      : category === "Risk & underwriting"
        ? "amber"
        : "violet";
export const collections = [
  {
    id: "investment",
    title: "Investment teams",
    subtitle: "Allocation, implementation, and risk.",
    ids: ["customization", "black-litterman", "risk-parity"],
  },
  {
    id: "research",
    title: "Research teams",
    subtitle: "Baselines, model behavior, and honest results.",
    ids: ["liquidity", "sentiment-lab", "deep-momentum"],
  },
  {
    id: "engineering",
    title: "Research platforms",
    subtitle: "From raw information to inspectable evidence.",
    ids: ["pure-news", "optlab", "corporate-niche"],
  },
];
export const career = [
  {
    period: "2015–2019",
    label: "Economic foundations",
    institution: "Hamilton College",
    role: "BA, Economics · May 2019",
    text: "The foundation for thinking about markets, incentives, and the assumptions behind an investment argument.",
    question: "What makes a useful investment question?",
    related: "macro-regime",
  },
  {
    period: "2019–2022",
    label: "Measure the portfolio",
    institution: "Prime Buchholz",
    role: "Performance Analyst · Aug 2019–Feb 2022",
    text: "Performance analysis put portfolio outcomes and their interpretation at the center of my professional work.",
    question: "What actually drove the result?",
    related: "customization",
  },
  {
    period: "2022–2024",
    label: "Explain the investment",
    institution: "Wellington Management / Loomis Sayles",
    role: "Fixed-income associate roles",
    text: "Fixed-income communication added another discipline: make the investment reasoning clear enough for someone else to examine. Wellington: Feb 2022–Jun 2023. Loomis Sayles: Nov 2023–Aug 2024.",
    question: "Can someone else follow the reasoning?",
    related: "pure-news",
  },
  {
    period: "2024–2026",
    label: "Connect context and analysis",
    institution: "AEW Capital Management",
    role: "Associate · Aug 2024–Sep 2026",
    text: "Institutional portfolio analytics and real-estate context sit alongside my independent work in allocation, measurement, and risk.",
    question: "What changes when the assumptions change?",
    related: "real-estate-risk",
  },
  {
    period: "2024–2026",
    label: "Build, challenge, explain",
    institution: "Northeastern University",
    role: "MBA + MS in Finance · awarded Aug 2026",
    text: "Graduate study in Investments and Mutual Fund Management, and service as Head of Equity Research for the 360 Huntington Fund through May 2026, connect investment judgment with research development.",
    question: "Would I still make the decision after challenging the model?",
    related: "black-litterman",
  },
];
export const labCases = [
  {
    id: "customization",
    title: "What is less trading worth?",
    subtitle: "Change the allocation and account size.",
    label: "01 / Allocation",
    question:
      "A lower-turnover portfolio saves money. Is the saving worth the additional tracking risk?",
  },
  {
    id: "housing-forest",
    title: "Does complexity earn its place?",
    subtitle: "Compare the model with its baseline.",
    label: "02 / Model selection",
    question:
      "A visually impressive fit is not enough. Compare errors on the same dates before promoting a model.",
  },
  {
    id: "pure-news",
    title: "Is a change really new information?",
    subtitle: "Walk from a disclosure to its source.",
    label: "03 / Evidence",
    question:
      "Trace the language to earlier disclosures before treating a change as a fresh investment catalyst.",
  },
  {
    id: "covenant-risk",
    title: "When does loan risk emerge?",
    subtitle: "Explore simulated covenant pressure.",
    label: "04 / Risk",
    question:
      "A terminal outcome can hide earlier stress. Inspect how a conditional scenario evolves along the path.",
  },
  {
    id: "trading-floor",
    title: "What changes the option payoff?",
    subtitle: "Move the expiry-price control.",
    label: "05 / Simulation",
    question:
      "An educational European-call example connects price, premium, payoff and profit. Synthetic, not live trading.",
  },
];
export const getProject = (id: string) => projects.find((p) => p.id === id)!;
export const pageTitles: Record<string, string> = {
  "/start-here/": "Start here | Josh Gutierrez",
  "/journey/": "Journey | Josh Gutierrez",
  "/visual-atlas/": "Visual atlas | Josh Gutierrez",
  "/research-notes/": "Research notes | Josh Gutierrez",
  "/code/": "Code & sources | Josh Gutierrez",
  "/turning-points/": "Turning points | Josh Gutierrez",
  "/": "Josh Gutierrez | Investment Research Atlas",
  "/research/": "Research library | Josh Gutierrez",
  "/lab/": "Decision Lab | Josh Gutierrez",
  "/methods/": "Methods & evidence | Josh Gutierrez",
  "/about/": "About & experience | Josh Gutierrez",
  "/compare/": "Compare research | Josh Gutierrez",
};
