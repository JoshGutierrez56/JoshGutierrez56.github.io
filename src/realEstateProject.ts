import type { Project } from "./content";
import type { ProjectStory } from "./stories";

export const realEstateProject: Project = {
  id: "real-estate-risk",
  number: "08",
  title: "When smooth returns hide risk",
  category: "Portfolio construction",
  status: "Synthetic real-estate study",
  question: "How should appraisal-based private real estate be compared with publicly traded REITs?",
  contribution: "A REIT/private-real-estate allocation prototype with appraisal-return unsmoothing, covariance estimation, constrained allocation, and limits on changes to the private sleeve. This exhibit isolates the risk-measurement step.",
  result: "In the saved synthetic example, model-adjusted quarterly volatility is 8.22% versus 3.33% in the observed series: approximately 2.47 times as large.",
  limitation: "Synthetic data and a full-sample smoothing estimate. The adjustment is model-dependent, not recovered true returns, market evidence, or a validated allocation benefit.",
  methods: ["Real assets", "Geltner unsmoothing", "Risk estimation", "CVXPY", "Liquidity constraints"],
  links: [
    { label: "Read the risk exhibit", href: "/assets/projects/real-estate-method.md" },
    { label: "Explore the repository", href: "https://github.com/JoshGutierrez56/REIT-PERE-Allocation-Optimizer" },
    { label: "Download synthetic series", href: "/assets/projects/real-estate-series.csv", download: true },
  ],
};

export const realEstateStory: ProjectStory = {
  subtitle: "Check how risk is measured before deciding how much to allocate.",
  takeaway: "The same synthetic private-real-estate series looks 2.47× more volatile after a model-based adjustment for smoothing. An allocation is only as useful as its risk inputs.",
  evidenceNote: "Synthetic illustration. Quarterly volatility, not an annual return. The adjustment is an estimate, not ground truth.",
  context: "Public REITs trade daily, while private-property valuations adjust less frequently. Comparing the two without considering appraisal smoothing can make the private sleeve look unusually stable and exaggerate its diversification benefit.",
  approach: "The prototype connects a Geltner-style unsmoothing step to risk estimation and constrained allocation across public REITs, private property, and cash. It includes a limit on quarterly changes to the private sleeve. The visual here replays the original seeded synthetic example and isolates the measurement question before any portfolio-performance discussion.",
  decision: "Examine the risk input rather than lead with the synthetic backtest's performance. Show the observed and adjusted series on the same scale, distinguish quarterly from annualized volatility, and call the adjusted returns model estimates rather than true returns.",
  learning: "For 79 synthetic quarters, observed volatility was 3.33% and adjusted volatility was 8.22%. Lag-one correlation fell from 0.708 to 0.209. The exercise shows how much a measurement assumption can change a risk estimate; it does not establish the right allocation to private real estate.",
  nextStep: "Evaluate licensed real-world observations with smoothing parameters estimated using only information available at each decision date. Stress alternative smoothing assumptions and private-asset liquidity constraints before interpreting any allocation result.",
  walkthrough: "My project asks how to compare publicly traded REITs with appraisal-based private real estate. A smooth reported series can look low-risk, but some of that smoothness may come from the valuation process. I built an allocation prototype that includes unsmoothing, risk estimation, portfolio constraints, and limits on changes to the private sleeve. In this synthetic example, quarterly volatility changes from 3.33% to 8.22% after the model adjustment. I can toggle the two series to show exactly what changes. I would not call the adjusted series the truth: the smoothing parameter is estimated on the full demonstration sample, and the result depends on that model. The interview lesson is to challenge the risk measurement before trusting an optimized allocation. Real-world and point-in-time validation remain next steps.",
  discussion: [
    "How would you distinguish appraisal smoothing from genuine persistence in underlying property returns?",
    "How should illiquidity and uncertainty in the risk estimate constrain an allocation?",
  ],
  steps: [
    { label: "Compare the measurements", description: "Recognize that traded prices and periodic appraisals do not reveal risk in the same way." },
    { label: "Expose the assumption", description: "Apply the documented adjustment and compare both series on one scale." },
    { label: "Constrain the decision", description: "Carry model uncertainty and private-sleeve liquidity limits into allocation research." },
  ],
};
