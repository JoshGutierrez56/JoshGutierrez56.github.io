import type { Project } from "./content";
import type { ProjectStory } from "./stories";

export const project: Project = {
  id: "garch-volatility", number: "16", title: "When bad news changes the risk", category: "Risk & underwriting", status: "Volatility-model mechanics",
  question: "Should equal positive and negative return shocks produce the same next-period risk estimate?",
  contribution: "A from-scratch volatility-modeling project spanning GARCH, GJR-GARCH, EGARCH and HAR-RV. This bounded exhibit develops the original news-impact comparison, isolating the symmetric GARCH and asymmetric GJR recursions at explicit parameters.",
  result: "The 41-scenario exhibit and four independent arithmetic checks show exactly how the GJR negative-shock term changes conditional variance. This is a mechanism demonstration, not an empirical model ranking.",
  limitation: "Parameters are illustrative, not estimated. Full-pipeline convergence, forecast comparison and VaR coverage require separate validation; no legacy performance ranking is presented as verified evidence.",
  methods: ["Conditional variance", "GARCH / GJR", "News-impact curves", "Model interpretation"],
  links: [
    { label: "Inspect the model project", href: "https://github.com/JoshGutierrez56/Garch-Volatility-Model" },
    { label: "Read the exhibit methodology", href: "https://github.com/JoshGutierrez56/Garch-Volatility-Model/blob/main/docs/NEWS_IMPACT.md" },
    { label: "Download exhibit data", href: "/assets/projects/garch-data.json", download: true },
  ],
};

export const story: ProjectStory = {
  subtitle: "Compare symmetric and asymmetric responses to the same return shock.",
  takeaway: "A model's assumptions determine how it interprets a shock. GARCH treats equal gains and losses symmetrically; GJR can assign more variance to a loss of the same size.",
  evidenceNote: "Illustrative parameters and hand-checked recursions. No fitted market result, strategy return, or validated forecast ranking.",
  context: "Risk often clusters, and negative equity returns can be followed by a different volatility response than equally large gains. A constant risk estimate misses clustering; a symmetric model cannot express this sign effect.",
  approach: "The original project implements Gaussian likelihood estimation and several conditional-volatility models. The exhibit isolates two news-impact equations, holds prior volatility and parameters fixed, and varies only the observed return innovation.",
  decision: "Separate explaining a model's mechanism from establishing its forecasting value. A plausible asymmetric curve still needs a fair held-out comparison against symmetric and simple volatility baselines.",
  learning: "Adding a negative-shock coefficient changes the next variance forecast mechanically. It does not establish that the coefficient is stable, that the model is correctly calibrated, or that a larger estimated risk improves an investment decision.",
  nextStep: "Validate full-pipeline estimation and forecast timing, align all models to the same realized-variance proxy and test dates, and evaluate VaR coverage separately from forecast loss.",
  walkthrough: "Start with the same 20% annualized prior volatility for both models. Move the shock slider from a gain to an equally large loss. The GARCH estimate stays the same because its innovation enters squared. The GJR estimate rises for the loss because its negative-shock term switches on. The underlying formulas and exact values are available in the source exhibit. This explains an assumption you would want to inspect in a risk model; it is not a backtest or a claim that one model forecasts markets better.",
  discussion: ["Why is volatility not a loss threshold?", "What does a positive GJR gamma change, holding other parameters fixed?", "Why must all forecast models use the same target and evaluation dates?"],
  steps: [
    { label: "Fix the starting state", description: "Use the same prior variance and explicit, illustrative model parameters." },
    { label: "Change one innovation", description: "Compare equal positive and negative shocks without refitting." },
    { label: "Separate mechanism from evidence", description: "Check the arithmetic, then require a separate empirical forecast comparison." },
  ],
};
