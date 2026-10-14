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

## SHA-256

```text
customization.png        91de1a183f1599d266a5c1c580e17cfc3204b9d791e42bdb0fb8606d2ed8d29c
pure-news.png            b2f192a0e15b376f21334a65c97e3426be43b986e310efd82aab47255ca9f8ea
news-research.png        ebd244ccc9d8ed6510569d35d067b4d64f86fe28641db25602d22ab4c9e469a3
black-litterman.png      22a6614583aae4a8b1e5979e37753c869bd457edf7dba2db83d2ab8a7df5abb5
corporate-niche.png      2e8eb4728fb2de3568bb7cba07803923cd1d249fb5a49f90a9d242a3712c19f2
corporate-niche-cover.png 4ef19228f04bf4be7489d2c08f36b41a7a764e0a2c98a2bca797b53366554474
trading-floor.png        231b3330302f350c233d8554afb13d50c58099dd2e4121e085901e7d468a63ca
```
