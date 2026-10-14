import type { Project } from "./content";
import type { ProjectStory } from "./stories";

export const project: Project = {
  id: "deep-momentum",
  number: "10",
  title: "Learning positions, not price targets",
  category: "ML & deep learning",
  status: "Audited synthetic research prototype",
  question: "What changes when a recurrent network learns a trading position directly—and how do you check that the training objective survives execution?",
  contribution: "A PyTorch LSTM with 14 volatility-scaled features, a differentiable Sharpe-style objective, bounded position outputs, validation-based checkpoints, gradient clipping, and walk-forward evaluation with realized turnover costs.",
  result: "An archived seeded run completed nine synthetic walk-forward folds. The exhibit exposes every fold and the actual network architecture, including unstable outcomes that a single average would hide.",
  limitation: "Synthetic execution evidence only, not historical alpha. The training turnover proxy uses shuffled batches; the archived Sharpe field is CAGR divided by volatility. A chronological objective and real-market baseline study remain open.",
  methods: ["PyTorch / LSTM", "Custom differentiable loss", "Gradient clipping", "Walk-forward evaluation"],
  links: [
    { label: "Read method & audit", href: "/assets/projects/deep-momentum-method.md", download: true },
    { label: "Download audited source bundle", href: "/assets/projects/deep-momentum-source.zip", download: true },
    { label: "Download fold evidence", href: "/assets/projects/deep-momentum-folds.csv", download: true },
    { label: "Original research repository", href: "https://github.com/JoshGutierrez56/ETF-Deep-Momentum-Network" },
  ],
};

export const story: ProjectStory = {
  subtitle: "Trace a neural network from temporal features to a bounded decision.",
  takeaway: "The implementation is real. Market skill still needs to be demonstrated.",
  evidenceNote: "Archived audited source and seeded synthetic results are downloadable. The original public repository is a different, earlier version; its advertised market returns are not used here.",
  context: "A price forecast does not specify how large a position to take. This research implementation explores the Deep Momentum Network idea from Lim, Zohren, and Roberts: learn a bounded signal from a time sequence and optimize a risk-adjusted objective directly. The useful technical question is whether the network, loss, and execution accounting describe the same decision.",
  approach: "The saved compact run uses 63-day sequences of 14 engineered features, an eight-unit PyTorch LSTM, an eight-unit dense head with ReLU and dropout, and a tanh output. Adam, gradient clipping, validation-based checkpoint selection, and expanding training windows control optimization and evaluation. The signal is volatility-scaled, portfolio leverage is capped at three, and turnover costs of five basis points are deducted in the archived backtest. Nine folds evaluate deterministic simulated ETF-like data.",
  decision: "Keep network implementation separate from investment-performance claims. Retain every fold, inspect signal-to-return timing, and publish the archived code with its results. The loss penalizes differences between adjacent shuffled batch outputs, so it is not yet a faithful temporal transaction-cost objective. That distinction matters even when the backtest deducts actual portfolio turnover.",
  learning: "The pipeline executes, but the fold distribution is unstable: seven of nine synthetic folds have positive annualized returns, while two lose money. A small number of large annualized outcomes dominate averages. This is evidence of implemented recurrent modeling and diagnostic practice, not a successful real-market strategy or a comparison win over simpler momentum.",
  nextStep: "Make the turnover objective chronological within each asset, reconcile sequence-length configuration, retain past context at split boundaries, and use a conventional consistently defined Sharpe statistic. Then run a frozen, cost-aware market-data comparison against simple momentum and buy-and-hold, with ablations for the learned representation and objective. None of that market-performance validation is claimed complete.",
  walkthrough: "My Deep Momentum project connects recurrent learning to a portfolio decision rather than stopping at a price forecast. A PyTorch LSTM reads volatility-scaled return and technical features, then a tanh head emits a bounded signal. I can trace that signal through volatility sizing, leverage limits, and turnover costs, and inspect every walk-forward fold. The archived demonstration is synthetic, so I do not present its large annualized returns as market alpha. The interesting audit finding is that the training turnover penalty compares shuffled batch outputs, whereas the backtest charges chronological portfolio turnover. Aligning those is part of the next experiment. The project demonstrates recurrent-network implementation, custom loss design, and validation judgment; a credible strategy still requires market-data baselines and ablations.",
  discussion: [
    "Why is a turnover penalty on shuffled minibatch positions different from a chronological trading-cost objective?",
    "Which ablations would distinguish value from the LSTM representation, risk scaling, and choice of loss?",
  ],
  steps: [
    { label: "Represent the sequence", description: "Encode volatility-scaled features with an LSTM and emit a bounded position signal." },
    { label: "Align learning and execution", description: "Inspect how the objective, sizing, signal dates, and realized costs relate." },
    { label: "Inspect all outcomes", description: "Keep every synthetic test fold visible before designing a market-data baseline comparison." },
  ],
};
