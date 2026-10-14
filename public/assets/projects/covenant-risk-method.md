# Debt-covenant scenario: methods and evidence

This exhibit redraws the project's existing cumulative covenant-breach chart from its saved aggregate results. Selecting a year changes the displayed horizon, not the assumptions, sample, or model. No new research run was performed for this website.

## Evidence

- [Original case-study repository and notebook](https://github.com/JoshGutierrez56/Monte-Carlo-Risk-Model).
- [Unaltered original cumulative-breach figure](covenant-risk.png).
- [Saved quarter-level aggregate results](covenant-risk.csv).
- Reproducibility run: 200,000 paths, seed 42, 20 quarters over five years. The original public notebook used an unseeded one-million-path run; the website uses the later seeded implementation's saved aggregates, not the notebook's rounded output.

## What is being measured?

At each quarter, the model checks two loan tests. Debt-service coverage (DSCR) is quarterly net operating income divided by quarterly interest. Debt yield is annualized net operating income divided by the fixed outstanding senior and mezzanine balances.

The chart shows the share of paths with **at least one** breach of either test on or before the selected quarter. It is cumulative: a path remains counted even if the loan tests pass later. The separate `period_*` columns in the CSV describe breaches in that quarter only and should not be mistaken for cumulative probabilities.

Year-end cumulative probabilities: 43.452% at year one, 70.923% at year two, 82.834% at year three, 87.5475% at year four, and 89.758% at year five. The website rounds these to one decimal place. The saved run's median maturity DSCR is 1.179166x.

## Case assumptions

- Starting SOFR: 4.0748%; long-run mean: 3.5504%; mean-reversion coefficient: 0.05; annualized rate volatility: 1.6 percentage points. Simulated SOFR cannot go below zero; interest calculations impose a 1% SOFR floor.
- Starting annual NOI: $11,278,069. Annual deterministic growth: 1.5%, with independent quarterly lognormal shocks of 0.015 log standard deviation. Those lognormal shocks also affect mean income; 1.5% is not a calibrated expected-growth estimate.
- Fixed senior balance: $116,268,750 at SOFR + 1.60%. Fixed mezzanine balance: $38,756,250 at SOFR + 5.80%. Interest is calculated quarterly; balances do not amortize.
- DSCR floor: 0.90x in quarter one, rising by 0.025x per quarter to 1.20x in quarter 13, then fixed. Debt-yield floor: 7.0% in quarter one, rising to 7.5% in quarter 13, then fixed.
- Rates and NOI shocks are independent. Assumptions describe the modeled case, not a currently underwritten property or a live market calibration.

## Interpretation

A covenant breach is **not default**, loss, or foreclosure. The model excludes cure rights, waivers, hedges, amortization, capex, asset sales, and refinancing. Actual contractual definitions may differ. These are assumption-sensitive scenario probabilities, not observed loan performance or a forecast guarantee.

Before underwriting use, the next work would be calibration to authorized property records and the actual loan documents, plus sensitivity analysis of rates, income, their dependence, and the covenant schedule. The portfolio exhibit publishes only aggregate simulation outputs; it does not redistribute private loan or property records.
