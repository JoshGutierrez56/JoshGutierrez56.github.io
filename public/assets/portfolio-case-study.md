# The Cost of Customization

Josh Gutierrez | AI-assisted investment research

## Investment question

How much tracking risk should a portfolio manager accept to accommodate client restrictions and avoid trading?

## Design

This historical implementation study compares bounded proportional allocation, minimum-tracking-risk allocation and lower-turnover allocation. It uses actual WRDS/CRSP CIZ ETF total returns, with a fixed eight-ETF universe, lagged Ledoit-Wolf covariance estimates, monthly decisions, drifting holdings and self-financing assumed transaction costs.

Evaluation: January 2, 2014 through December 31, 2025 (3,018 trading days). The base specification uses a 756-day covariance lookback, a 25-basis-point estimated tracking-risk allowance for the lower-turnover method, and an assumed cost of 5 basis points per dollar bought or sold. Allocations are decided before execution-day outcomes; old holdings earn the execution day's return before the close trade.

## Results

Across nine constrained account scenarios, minimum-risk allocation reduced realized net tracking error by a median 35.5% versus proportional allocation. Reductions ranged from about 20% to 69%. This is a comparison within this historical evaluation period of the stated methods and restrictions, not a general performance guarantee.

In the no-gold case:

| Method | Gross annualized tracking error | Annual one-way turnover | Annual modeled cost / NAV |
| --- | ---: | ---: | ---: |
| Proportional | 1.7484% | 14.1541% | 1.4154 bp |
| Minimum risk | 1.3691% | 18.2310% | 1.8231 bp |
| Lower turnover | 1.6390% | 7.2453% | 0.7245 bp |

Moving from minimum risk to lower turnover reduces turnover by 60.26%, but saves only 1.10 basis points of account value annually under the assumed cost function while adding about 27 basis points of gross tracking error. At a constant $1 million reference NAV, that cost-rate difference is approximately $110 per year. It is not an exact compounded-wealth benefit or an observed execution saving.

The site's account-size control only rescales these modeled cost rates. It does not rerun allocations, model market impact, or forecast future results. The three method points are discrete, actually evaluated alternatives; no interpolated frontier is claimed.

## Interpretation

Risk-aware allocation can help implement restrictions, but avoiding trades in liquid ETFs may buy little direct cost relief. The investment decision is a trade-off between tracking risk, account constraints and implementation costs, not a search for the highest backtest return.

## Limitations

- A fixed eight-ETF universe and retrospective universe selection limit generality.
- CRSP is a current database vintage, not an archived as-known-at-the-time extract.
- Policy allocations, account restrictions and transaction costs are experimental assumptions.
- This is not actual client performance, evidence of alpha, or an execution-quality study.
- The full source-data rerun requires licensed access. Only reviewed aggregate method comparisons are provided here; no licensed security-level records are published.

## Provenance

Results are drawn from the completed September 30, 2026 Personalized Model Portfolios run and its scenario-summary artifact. The accompanying `portfolio-provenance.json` records the source SHA-256, and `no-gold-summary.csv` supplies the exact aggregate values used by the interactive display.

Development was AI-assisted. Research interpretation and methodological limitations remain part of the presentation, rather than implied independent coding or live investment-management results.
