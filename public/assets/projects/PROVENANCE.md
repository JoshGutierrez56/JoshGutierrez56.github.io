# Project visuals

Improved on October 14, 2026. Existing project visuals and interfaces are the foundation; the portfolio adds responsive source-based charts, focused explanations, and interactive comparisons. Original research figures and artwork remain unaltered behind the full-size reference links. Decorative artwork details may be cropped; empirical charts are not cropped to remove source notes. No invented performance series are used.

The original six-project artwork and five-slide research brief were finalized October 7, 2026. The following public references explain the underlying projects and findings.

| Site asset | Source | Interpretation |
| --- | --- | --- |
| `customization.png` | Slide 3 of the original five-slide *Cost of Customization* research brief. [Public research repository](https://github.com/JoshGutierrez56/personalized-model-portfolios). | Original 1920 × 1080 no-gold, three-method exhibit. Gross tracking risk, annual one-way turnover, and modeled costs. Historical hypothetical-account results, not live performance. |
| `pure-news.png` | Screenshot of [the existing public prototype](https://joshgutierrez56.github.io/pure-news-intelligence-demo/), ranked disclosure changes screen; captured October 14, 2026 at 1440 × 900. | Existing frozen evidence workflow, not live inference. |
| `news-research.png` | Original October 7 *When more information does not help* project cover. [Public research findings](https://github.com/JoshGutierrez56/pure-news-research-public/blob/main/RESEARCH_FINDINGS.md). | Original 1200 × 630 project cover. Editorial artwork, not a research figure. |
| `black-litterman.png` | Original October 7 *From analyst views to portfolio weights* project cover. [Public project repository](https://github.com/JoshGutierrez56/360HF-BL-Optimizer). | Original 1200 × 630 project cover. Editorial artwork, not a performance chart. |
| `corporate-niche.png` | [Original public repository figure](https://raw.githubusercontent.com/JoshGutierrez56/corporate-niche-dynamics/main/figures/11_three_axis_projection_static.png) | 889 × 759 three-axis projection of the six-dimensional synthetic state, colored by fiscal year. No real-company validation. |
| `trading-floor.png` | Screenshot of [the existing public simulator](https://joshgutierrez56.github.io/trading-floor-interview-simulator-demo/), Options Desk after dismissing onboarding; captured October 14, 2026 at 1440 × 900. | Existing synthetic educational interface, not live trading. |

`corporate-niche-cover.png` preserves the original October 7 project cover as an unused alternative; the website displays the actual research figure instead.

## Source-based improvements

- **Customization:** the selectable scatterplot reads the same three scenario records used by the portfolio explorer, reconciled to [the public aggregate CSV](../no-gold-summary.csv). The axes are gross annualized tracking error and annual modeled trading cost in basis points of NAV. They are three discrete methods, not an estimated efficient frontier. The dollar readout multiplies cost in basis points by a constant $1 million reference NAV and divides by 10,000. Comparisons use the minimum-risk method as their reference. Approximately $110 less annual cost and 27 basis points more realized tracking risk refer specifically to the lower-turnover choice; they are not forecasts or observed execution savings.
- **News research:** the original cover art supplies the decorative detail. The new interval chart displays the reported incremental IC estimate −0.00227 and 95% interval [−0.00567, 0.00049] from the public findings. Zero is explicitly marked. No additional research result is inferred.
- **Black–Litterman:** the original cover art supplies the decorative detail. The readable three-stage diagram summarizes the documented factor-prior, conviction-weighted view blending, and constrained-allocation workflow. It is conceptual, not a return series or a live allocation.
- **Corporate niche:** the original published projection is retained without editing. The reported pooled Spearman recovery correlation 0.3215 is a **separate synthetic benchmark result**, not the relationship plotted in the fiscal-year-colored three-axis projection. Dimension captions explain that the display projects three of the model's six dimensions.
- **Pure News:** the two-step wording/context preview uses the existing [KHC evidence packet](https://joshgutierrez56.github.io/pure-news-intelligence-demo/demo/evidence_packets/02_KHC.html) and record `8f5336b55618ffe68e8a` in the public demo's `changes.json`. Abbreviated quotations retain the original 2022/2023 filing wording; the context includes the earlier July 11, 2022 8-K. This is a frozen record, not live inference.
- **Trading Floor:** the payoff preview adapts the existing simulator's European Black–Scholes baseline: spot 100, strike 105, volatility 28%, 45/365 years, and rate 4%, using the original normal-CDF approximation. Premium is `S × N(d1) − K × exp(−rT) × N(d2) = 2.1587511712`; initial delta is approximately 0.345702912. The slider changes expiry spot and displays long-call P&L per share, `max(expirySpot − 105, 0) − premium`. Fees and funding are excluded. This is an educational payoff model, not an observed trade or an efficacy result.

The original captured product screens remain available through their reference links.

## Additional project exhibits — October 14 expansion

- **Liquidity forecasting:** `liquidity.png` preserves the original eight-model comparison. The interactive exhibit redraws four key methods with readable labels and a fixed mean-squared-error scale; the full eight-method table remains available. The period toggle selects saved validation or previously exposed historical results, not a new forecast. [Method, chronology, and limitations](liquidity-evidence.md) · [16 aggregate comparison rows](liquidity-model-comparison.csv). No security-level licensed observations are published.
- **Real-estate risk measurement:** `real-estate-risk.png` preserves the original synthetic unsmoothing figure. The new plot reproduces its seeded series, fixes the labels and mixed-unit presentation, distinguishes observed from model-adjusted returns, and shows both on one fixed scale. [Method and boundaries](real-estate-method.md) · [Synthetic series](real-estate-series.csv) · [Minimal replay](real-estate-replay.py). This is a full-sample synthetic measurement illustration, not a real-estate performance result.
- **Debt-covenant simulation:** `covenant-risk.png` preserves the original seeded-run chart. The interactive redraw selects a year in the same 200,000-path result, displaying cumulative breaches and the applicable quarter-end covenant floors. [Assumptions and interpretation](covenant-risk-method.md) · [20 quarterly aggregate observations](covenant-risk.csv). Covenant breach is distinct from default; no property records or private loan documents are published.

Original chart SHA-256 values:

```text
liquidity.png          b7567b0183499068fe4b9388ebd12127942aa382a9f6c9ee189812573671f6df
real-estate-risk.png   55d4c5cf8656a82c0c9049c7a8cee4809316adbf291e886e9e9bf7d0dc94521b
covenant-risk.png      4ffccfd66cb26caa104850442bb08b40b9699b7377944bd006ae721aa7b5168f
```

## Machine learning and deep-learning exhibits — October 14

- **Deep Momentum:** the fold visual redraws the archived original chart using all nine saved synthetic fold records. Metric and fold controls inspect existing results, not fresh training or inference. Architecture text follows the executed compact-run code, including the actual 63-day input length. The downloadable audited source snapshot is distinct from the earlier original public repository. Synthetic evidence, nonstandard source Sharpe definition, and training/evaluation limitations are detailed in [the method note](deep-momentum-method.md).
- **Sentiment Lab:** the cost-scenario comparison uses the public news-research evidence, separating pretrained transformer inference from model training. See [the evidence note](sentiment-evidence.md) for pinned sources, sample/split details and metric definitions. No restricted article text is republished.
- **Housing random forest:** the interactive level/error comparison redraws the original archived evaluation chart from 61 unchanged prediction rows. It adds matched persistence comparison and month inspection; it does not create new forecasts. Metrics were independently recalculated. [Method and source lineage](housing-forest-method.md) · [Exact hashes](housing-forest-provenance.json) · [Evaluated source archive](housing-forest-source.zip). The original public notebook repository is not represented as containing the separate audited evaluation bundle.

These are three distinct evidence categories: trained-network synthetic diagnostics, pretrained-model applied research, and historical tabular-ML evaluation. They do not establish profitable trading, production model ownership, or generalized deep-learning mastery.

## Research library additions — October 14

- **Optlab:** `optlab.png` preserves the public repository's archived `notebooks/examples/cross_section_correlations.png`. The interactive view redraws four pairs at the original chart's two-decimal precision: book-to-market/gross profitability −0.52; momentum_12_2/short_term_reversal +0.14; short_term_reversal/beta_60m +0.56; size/beta_60m −0.22. These are saved `liquid_500` signal-rank relationships from 2023-12-29, not a rerun, information coefficients, or return forecasts. The original notebook calculates Pearson correlation of its saved signal-rank columns; pairwise missingness can make this differ from recomputing Spearman ranks within each pair. No underlying licensed security-level observations are added.
- **Risk Parity:** `risk-parity.png` preserves the repository's explicitly synthetic risk-contribution chart. `risk-parity-data.json` contains all 40 aggregate strategy/asset rows from `risk_contribution_diagnostic` at 2024-06-26 after `--synthetic --start 2023-01-01 --end 2024-06-30 --scorecard`, seed 42, commit `dafce31fc393848c1643af79dc0f5c5960aa6a19`. The interactive view compares ERC, inverse volatility and equal capital weights at this one covariance snapshot. The fourth 60/40 comparator remains in the downloadable data. Capital and variance contributions are separate measures; neither establishes future realized risk.
- **Macro HMM:** `macro-hmm.png` is the full-sample smoothed-probability figure from the repaired public implementation, commit `c6b3a67cb863330dc401ef6408ed2d67f6e5d244`, using `--offline --start 2000-01-01 --end 2024-12-01`. `macro-hmm-data.json` preserves all 300 synthetic full-sample Viterbi states and the 240 filtered states after the 60-month warm-up, plus the input checksum and source revision. The new exhibit compares the two paths year by year; it does not equate the smoothed probability artwork with Viterbi states. Differences may reflect future information, estimation windows and changing state boundaries. No recession-prediction or investment-performance claim is made.

The three exhibits preserve source charts as inspectable references while improving labels, comparisons and interactions. Repository tests are software evidence, not independent human validation.

## Original artwork hashes

```text
customization.png        91de1a183f1599d266a5c1c580e17cfc3204b9d791e42bdb0fb8606d2ed8d29c
pure-news.png            b2f192a0e15b376f21334a65c97e3426be43b986e310efd82aab47255ca9f8ea
news-research.png        ebd244ccc9d8ed6510569d35d067b4d64f86fe28641db25602d22ab4c9e469a3
black-litterman.png      22a6614583aae4a8b1e5979e37753c869bd457edf7dba2db83d2ab8a7df5abb5
corporate-niche.png      2e8eb4728fb2de3568bb7cba07803923cd1d249fb5a49f90a9d242a3712c19f2
corporate-niche-cover.png 4ef19228f04bf4be7489d2c08f36b41a7a764e0a2c98a2bca797b53366554474
trading-floor.png        231b3330302f350c233d8554afb13d50c58099dd2e4121e085901e7d468a63ca
```


## Six-featured update and broader research sections — October 14

Optlab is promoted into the six featured projects. Ten additional projects remain, with the GARCH news-impact exhibit added. Sections 2–4 reuse existing evidence and do not create new empirical outcomes.

- **GARCH:** `garch-volatility.png` is a fresh rendering of the original `Garch-Volatility-Model` archive's `src/garch/charts.py::fig2_news_impact` equations, using explicitly illustrative GARCH/GJR parameters. It is not an archived fitted-market chart. The standalone source script and parameter methodology are published in that repository. `garch-data.json` contains all 41 shock scenarios; four independent hand-arithmetic checks validate the two equations at ±2%. The website redraws these values with a keyboard-operable shock control. No legacy forecast ranking is promoted as validated evidence.
- **Research in action:** the four decision views reuse the saved no-gold allocation comparison, housing forest/persistence forecasts, KHC disclosure packet, and 200,000-path covenant simulation. Each keeps its original source link and evidence boundary.
- **Research approach:** six methods link to twelve actual project examples. The background section broadens the description of the body of work without assigning unconfirmed duties to former employers.
