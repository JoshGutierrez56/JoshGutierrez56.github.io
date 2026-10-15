// Reader-first summaries of the existing linked evidence. These do not replace
// source results, methodology, or material scope labels in the project records.
export type Outcome = { kind: "Finding" | "Delivered capability"; finding: string; implication: string };

export const outcomes: Record<string, Outcome> = {
  customization: {
    kind: "Finding",
    finding: "Trading about 60% less saved only $110 a year per $1 million, while adding 27 basis points of tracking error in the historical no-gold account.",
    implication: "Compare the dollar savings with the extra departure from the investment policy before choosing a lower-turnover allocation.",
  },
  "pure-news": {
    kind: "Delivered capability",
    finding: "Trace 995 disclosure changes to their source passages, then inspect the evidence behind a research question.",
    implication: "An analyst can check what changed and what was already known before developing an investment thesis.",
  },
  "sentiment-lab": {
    kind: "Finding",
    finding: "The generic sentiment strategy's Sharpe fell from 1.14 before costs to approximately zero after modeled base costs.",
    implication: "The appealing gross result did not justify promoting the strategy. Text interpretation and investable value need separate tests.",
  },
  liquidity: {
    kind: "Finding",
    finding: "Ridge reduced validation forecast error by 16.6% versus persistence; ordinary least squares captured almost the same gain.",
    implication: "Keep the simpler linear model as the benchmark. More complex forecasting still has to demonstrate better execution decisions.",
  },
  "black-litterman": {
    kind: "Delivered capability",
    finding: "Turn analyst views and confidence assumptions into portfolio weights with explicit position, exposure and turnover limits.",
    implication: "Make the size of a proposed trade explainable—not just the conviction behind the recommendation.",
  },
  optlab: {
    kind: "Delivered capability",
    finding: "A reusable equity-research workbench connects ten registered signals and four universe presets to portfolio and cost reporting.",
    implication: "Inspect the universe, signal definition and accounting behind a result before interpreting its performance.",
  },
  "news-research": {
    kind: "Finding",
    finding: "Adding filing and news features did not establish incremental return-prediction value: the 95% interval for the IC change included zero.",
    implication: "The evidence did not justify the added complexity for return prediction. Disclosure review is a separate use case to evaluate.",
  },
  "macro-hmm": {
    kind: "Delivered capability",
    finding: "Compare a full-history regime description with states estimated sequentially, using only observations available to the model at each step.",
    implication: "See where hindsight changes the story before using a regime label in an allocation experiment.",
  },
  "risk-parity": {
    kind: "Finding",
    finding: "In the simulated ten-ETF portfolio, unequal capital weights balance modeled risk contributions at approximately 10% per asset.",
    implication: "Evaluate diversification in risk contributions as well as dollars invested.",
  },
  "housing-forest": {
    kind: "Finding",
    finding: "Using last month's housing index had roughly half the random forest's forecast error: RMSE 2.78 versus 5.58 index points.",
    implication: "The forest's high R² was not a reason to replace the simpler forecast in this historical comparison.",
  },
  "covenant-risk": {
    kind: "Finding",
    finding: "Under the simulated loan terms, 43.5% of paths breached a covenant by year one; 89.8% had breached by year five.",
    implication: "Review covenant headroom throughout the loan's life, not only at maturity. A breach is not the same as a default.",
  },
  "corporate-niche": {
    kind: "Finding",
    finding: "A six-dimensional business-model map recovered relative crowding with a 0.32 rank correlation in a synthetic benchmark.",
    implication: "The result supports a measurement pilot—not a stock-selection claim—before testing the map on real companies.",
  },
  "garch-volatility": {
    kind: "Finding",
    finding: "With the illustrated parameters, a −2% shock gives GJR 22.61% annualized volatility versus 20.26% after a +2% shock; GARCH treats both alike.",
    implication: "A risk model's treatment of negative shocks is an explicit choice you can inspect before comparing forecasts.",
  },
  "deep-momentum": {
    kind: "Delivered capability",
    finding: "A trained PyTorch LSTM maps 63-day feature sequences to bounded positions, with inspectable sizing and portfolio accounting.",
    implication: "The synthetic demonstration makes the signal-to-position pipeline inspectable; it does not establish market skill. Its training-cost alignment still needs repair.",
  },
  "trading-floor": {
    kind: "Delivered capability",
    finding: "Six playable market-practice modes pair decisions with explanations, feedback and repeatable scenarios.",
    implication: "Replay the same starting conditions to examine reasoning and risk management, rather than only the final score.",
  },
  "real-estate-risk": {
    kind: "Finding",
    finding: "Adjusting the synthetic property series for appraisal smoothing raised quarterly volatility from 3.33% to 8.22%—about 2.47×.",
    implication: "Challenge the risk measurement before trusting an allocation that makes private property look unusually stable.",
  },
};
