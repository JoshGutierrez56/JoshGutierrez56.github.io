import type { Project } from "./content";
import type { ProjectStory } from "./stories";

export const project: Project = {
  id: "liquidity",
  number: "07",
  title: "When a simpler forecast is enough",
  category: "Empirical research",
  status: "Completed forecasting study",
  question: "Can yesterday's trading activity help forecast tomorrow's liquidity—and does a more complex model earn its place?",
  contribution: "Compared eight frozen volume-forecasting methods on identical security-days, with training-only estimation, lagged inputs, coverage accounting, and dependence-aware uncertainty.",
  result: "Ridge reduced validation forecast MSE by 16.6% versus five-day persistence. Ordinary least squares captured essentially the same gain; fixed boosting did worse than both linear models.",
  limitation: "A restricted, current-vintage historical sample. The later 2022–2024 evaluation was previously exposed. Forecast accuracy is established within this study, not trading-cost savings or investment returns.",
  methods: ["WRDS / CRSP", "OLS / ridge", "Common-sample evaluation", "Block bootstrap"],
  links: [
    { label: "Read the evidence", href: "/assets/projects/liquidity-evidence.md", download: true },
    { label: "Download model comparison", href: "/assets/projects/liquidity-model-comparison.csv", download: true },
    { label: "View the original chart", href: "/assets/projects/liquidity.png" },
  ],
};

export const story: ProjectStory = {
  subtitle: "Forecast trading activity before adding portfolio complexity.",
  takeaway: "Simple linear models beat persistence. More complexity did not produce a meaningful further gain.",
  evidenceNote: "Completed forecast comparison; economic-value follow-up remains unfinished. Later historical data were previously exposed.",
  context: "A portfolio team needs to think about how much can be traded, not just what to buy. Daily dollar volume is one useful activity proxy. This project first asks whether a forecast improves on simply carrying recent activity forward, before trying to connect that forecast to an execution decision.",
  approach: "The target is next-session log dollar volume relative to its prior five-session log average. Eight methods were compared on the same eligible observations: five simple baselines, OLS, ridge, and fixed histogram boosting. Fitting and scaling used 2010–2018 training data. Validation covered 729,481 security-days in 2019–2021. Frozen models were then replayed on 742,278 previously exposed security-days in 2022–2024, without refitting or reselection.",
  decision: "Keep the easy-to-explain OLS model in the comparison, use identical samples, and retain every declared method. Otherwise, it is too easy to credit regularization or machine learning for gains that a simpler model already captures. Separate forecast error from economic value: a better volume forecast does not automatically mean cheaper execution.",
  learning: "Ridge reduced forecast MSE by 16.6% in validation and 18.4% in the exposed historical evaluation versus five-day persistence. OLS was effectively tied, and fixed boosting was worse than both. The gain over persistence remained positive across the declared years, liquidity groups, and activity regimes. These checks support a useful forecasting baseline within this sample, not a trading-performance claim.",
  nextStep: "Evaluate the frozen simple models in a genuinely future or broader-universe sample. Establish corporate-action and settlement handling before a separately specified execution-cost comparison; that practical-value study is not complete.",
  walkthrough: "My liquidity project asks whether recent trading activity can improve tomorrow's volume forecast, and whether extra model complexity helps. I compared eight methods on identical observations, with training-only fitting and lagged inputs. Ridge cut validation forecast error by about 16.6% relative to carrying forward the five-day average, but ordinary least squares captured almost exactly the same gain. A fixed boosting model did worse than both. The later historical replay also showed a gain, but that period had already been exposed, so I do not call it an untouched holdout. The interview lesson is to retain strong simple baselines and separate forecasting from the investment decision. Better forecast accuracy is useful evidence; whether it lowers execution costs remains a different, unfinished experiment.",
  discussion: [
    "Why might a lower log-volume forecast error fail to reduce execution costs?",
    "What does OLS matching ridge change about which model you would put into an analyst workflow?",
  ],
  steps: [
    { label: "Define the baseline", description: "Forecast activity relative to the prior five sessions, using only lagged information." },
    { label: "Compare fairly", description: "Score all eight frozen methods on the same security-days and retain simple alternatives." },
    { label: "Separate the decisions", description: "Choose a transparent forecasting baseline before testing economic value." },
  ],
};
