import type { Project } from "./content";
import type { ProjectStory } from "./stories";

export const quantLibraryProjects: Project[] = [
  {
    id: "optlab", number: "13", title: "Optlab Research", category: "Research tools",
    status: "Research workbench",
    question: "Can a research decision be traced from its data universe to its signal, portfolio and costs?",
    contribution: "A Python, DuckDB and Polars workbench separating data access, ten registered signals, four universe presets, portfolio construction and reporting. Packaged defaults and accounting paths are checked in Windows and Linux CI.",
    result: "79 synthetic-fixture tests passed. The archived nine-signal cross-section exposes relationships worth investigating, not evidence of predictive returns.",
    limitation: "Real-data runs require a separately prepared, licensed data lake. Universe presets are approximations; costs compare target weights, not drifting holdings. Archived notebook outputs have not been rerun after accounting repairs.",
    methods: ["DuckDB", "Polars", "Signal registries", "Transaction-cost accounting"],
    links: [
      { label: "Explore the workbench", href: "https://github.com/JoshGutierrez56/Optlab-Research" },
      { label: "Read the source notebook", href: "https://github.com/JoshGutierrez56/Optlab-Research/blob/main/notebooks/examples/cross_section_summary.ipynb" },
    ],
  },
  {
    id: "risk-parity", number: "14", title: "Equal capital is not equal risk", category: "Portfolio construction",
    status: "Synthetic allocation study",
    question: "What changes when a portfolio balances contributions to risk instead of dollars invested?",
    contribution: "A ten-ETF allocation prototype connecting SciPy equal-risk-contribution optimization to DuckDB covariance estimates and drifting-holdings accounting, with inverse-volatility, equal-weight and 60/40 comparators.",
    result: "In the seeded demonstration, unequal capital weights target approximately 10% of portfolio variance per asset. Eighteen tests check optimization, timing, covariance and holdings accounting.",
    limitation: "The exhibit uses simulated prices. The model excludes trading costs, taxes, financing and leverage; it does not establish real-market outperformance.",
    methods: ["Equal risk contribution", "SciPy SLSQP", "Rolling covariance", "DuckDB SQL"],
    links: [
      { label: "Explore the research", href: "https://github.com/JoshGutierrez56/Risk-Parity-Model" },
      { label: "Read the methodology", href: "https://github.com/JoshGutierrez56/Risk-Parity-Model/blob/main/docs/METHODOLOGY.md" },
      { label: "Download exhibit data", href: "/assets/projects/risk-parity-data.json", download: true },
    ],
  },
  {
    id: "macro-hmm", number: "15", title: "Macro Regime HMM", category: "ML & deep learning",
    status: "Probabilistic modeling prototype",
    question: "How different is explaining a market regime after the fact from identifying it sequentially?",
    contribution: "An inspectable Gaussian hidden Markov model with Baum–Welch estimation, Viterbi decoding, smoothing and chronological filtering. Training-only scaling and a one-calendar-month allocation lag separate retrospective diagnostics from a factor-exposure experiment.",
    result: "45 tests passed, including exhaustive state-path calculations, future-perturbation checks and hand-calculated timing/cost examples. The 300-month synthetic demonstration produces 240 filtered states and 239 lagged proxy returns.",
    limitation: "This is a classical probabilistic model, not a neural network. Synthetic states are not NBER recessions; current-vintage online data are not point-in-time history. The allocation proxy is not a tradable portfolio or evidence of alpha.",
    methods: ["Gaussian HMM", "Forward filtering", "Baum–Welch EM", "Chronological evaluation"],
    links: [
      { label: "Explore the model", href: "https://github.com/JoshGutierrez56/Macro-Regime-HMM" },
      { label: "Inspect the timing contract", href: "https://github.com/JoshGutierrez56/Macro-Regime-HMM/blob/main/docs/METHODOLOGY.md" },
      { label: "Download exhibit data", href: "/assets/projects/macro-hmm-data.json", download: true },
    ],
  },
];

export const quantLibraryStories: Record<string, ProjectStory> = {
  optlab: {
    subtitle: "Make the research path inspectable, from universe to net return.",
    takeaway: "A reusable workbench is valuable when its assumptions stay visible. A signal correlation can challenge intuition without proving that either signal predicts returns.",
    evidenceNote: "Archived 2023-12-29 signal diagnostic; synthetic software checks. Not a validated investment record.",
    context: "An equity study can go wrong before its model runs: an inconsistent universe, unavailable fundamentals or a mischarged short trade can change the result. A research framework needs explicit contracts across those steps.",
    approach: "Separate universe SQL, a validated signal registry, cross-sectional calculations, portfolio construction and gross/net reporting. The public interfaces retain a caller-supplied universe, and accounting fixtures verify that both long and short transactions incur costs.",
    decision: "Keep unsupported integrations and uncalibrated impact models explicit instead of letting their presence imply completed functionality. Preserve archived diagnostics while distinguishing them from freshly rerun results.",
    learning: "The saved cross-section shows positive 0.14 rank correlation between momentum and reversal, despite an expectation of a negative relationship. Definitions, horizon and the sampled universe need inspection before interpreting a label.",
    nextStep: "Reconcile an end-to-end licensed-data run against an independent implementation, then test coverage, delisting treatment and cost sensitivity on matched samples.",
    walkthrough: "Start with a dated universe, calculate the registered signals, and inspect relationships before constructing portfolios. The exhibit redraws four pairs from the original nine-signal matrix. It makes disagreement with an expected relationship visible while keeping the archived data boundary intact.",
    discussion: ["Why is signal correlation not information coefficient?", "What does a fundamentals-availability gate establish—and what does it leave unresolved?", "Why must a short position's trading cost reduce, not increase, portfolio return?"],
    steps: [
      { label: "Define the research inputs", description: "Choose a dated universe and signal specification with explicit data requirements." },
      { label: "Inspect before combining", description: "Check distributions, coverage and cross-sectional relationships." },
      { label: "Reconcile the result", description: "Separate gross returns, costs and net returns; preserve the run configuration." },
    ],
  },
  "risk-parity": {
    subtitle: "Compare capital weights with each asset's contribution to risk.",
    takeaway: "Ten equal dollar allocations need not carry ten equal risks. Full covariance changes the allocation needed to balance those contributions.",
    evidenceNote: "Seeded ten-ETF simulation. The displayed date is a simulation label, not observed market performance.",
    context: "A high-volatility holding can dominate portfolio risk even at a modest capital weight. Correlations matter too: inverse volatility ignores how an asset moves with the rest of the portfolio.",
    approach: "Estimate trailing covariance, solve for equal contributions to portfolio variance, and compare the result with inverse-volatility and equal-weight allocations. SQL tracks holdings drift and applies targets only after their decision date.",
    decision: "Show capital and risk side by side, and retain simple comparators. The optimizer is only useful if the covariance inputs and subsequent holdings arithmetic are correct.",
    learning: "The synthetic snapshot makes the distinction tangible: the equal-risk allocation can look uneven in dollars while its modeled risk contributions are almost equal. That balance is an ex-ante property, not a promise about future losses.",
    nextStep: "Evaluate robust covariance choices and realistic implementation costs on permitted historical data, with point-in-time availability and matched baselines.",
    walkthrough: "Choose a portfolio and switch between capital weight and risk share. Both views use the same saved covariance snapshot. The equal-risk target is 10% per asset, but the capital needed to get there differs. Then inspect the accounting tests to see how targets become earned returns.",
    discussion: ["When do inverse volatility and equal risk contribution agree?", "How can correlations change risk shares without changing capital weights?", "Why should the return on the decision date not be earned by the newly computed target?"],
    steps: [
      { label: "Estimate covariance", description: "Measure trailing variation and co-movement on a complete price panel." },
      { label: "Allocate by risk", description: "Solve for equal variance contributions, then compare simple allocations." },
      { label: "Track actual holdings", description: "Let weights drift between rebalances and check the resulting NAV independently." },
    ],
  },
  "macro-hmm": {
    subtitle: "Separate hindsight from a state estimate made one month at a time.",
    takeaway: "A convincing retrospective regime chart is not a forecast. Filtering, training windows and execution timing determine what an allocation experiment can actually claim.",
    evidenceNote: "Synthetic 2000–2024 demonstration. State names describe fitted yield-curve ordering, not verified economic regimes.",
    context: "A model that sees the entire history can use future observations to label the past. That is useful for description, but it cannot justify allocating with information that was unavailable at the time.",
    approach: "Implement Gaussian emissions, forward–backward inference and Viterbi decoding, then keep a distinct chronological path. At each refit, fit scaling and parameters on prior months only; filter through the current month and use its state no earlier than the next month.",
    decision: "Label states by high, middle or low fitted yield-curve mean instead of treating them as established expansion or recession probabilities. Keep full-sample diagnostics out of the allocation inputs.",
    learning: "The source-based exhibit lets you compare the two paths directly. Differences can reflect future information, parameter refits and state-boundary changes; they are not automatically classification errors.",
    nextStep: "Validate release-time and revision assumptions with a true vintage dataset, compare multiple initializations and simpler state rules, and preregister a genuinely untouched evaluation.",
    walkthrough: "Choose a year and compare the full-history state with the sequentially filtered state for each month. The first five years train the model. The experiment begins only afterward, and allocations use the prior month's filtered state. Exact path-enumeration tests check the inference independently of the charts.",
    discussion: ["How do filtering, smoothing and Viterbi decoding differ?", "Why does a chronological split still fail to reconstruct revised macro data?", "What information belongs in the trade decision at month-end?"],
    steps: [
      { label: "Fit on prior observations", description: "Estimate the scaler and Gaussian HMM strictly before the classified month." },
      { label: "Filter the observed prefix", description: "Retain transition history without using future observations." },
      { label: "Apply a calendar lag", description: "The month-end state can first affect the next month's factor exposure." },
    ],
  },
};
