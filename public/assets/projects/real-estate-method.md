# When smooth returns hide risk

## The investment question

Public REIT prices and periodic property appraisals reveal risk differently. Before comparing allocations, examine whether a smooth private-return series understates the variability that an allocation model should consider.

This exhibit isolates the risk-measurement step in the [REIT / Private Real Estate Allocation project](https://github.com/JoshGutierrez56/REIT-PERE-Allocation-Optimizer). It uses **only the original seeded synthetic example**, not NCREIF, Bloomberg, employer data, or actual property results.

## Results reproduced for this exhibit

| Measure | Observed synthetic series | Model-adjusted series |
| --- | ---: | ---: |
| Quarterly standard deviation | 3.3308279% | 8.2151410% |
| Lag-one sample correlation | 0.7076589 | 0.2088159 |

The volatility ratio is 2.4663961, displayed as **2.47×**. There are 79 quarterly returns from 2004 Q2 through 2023 Q4, following 80 synthetic index levels. Calendar labels are simulation coordinates, not historical market observations.

## How the series is generated and adjusted

The existing generator uses NumPy `default_rng(42)`. It first draws 80 public-REIT returns, then draws a private series with persistence coefficient 0.65 and innovation standard deviation 0.025. It builds index levels and derives simple returns, dropping the first level observation.

The adjustment is:

`adjusted[t] = (observed[t] - (1-alpha) * observed[t-1]) / alpha`

The first adjusted return equals the first observed return. The parameter is estimated from a **zero-intercept lag regression on the entire demonstration sample**, with the original clipping rules. Here `alpha = 0.2864785306`. The reported lag-one sample correlation is a separate diagnostic, not the zero-intercept regression coefficient.

The replay is a narrow extraction of the original generator and unsmoothing logic. Run [real-estate-replay.py](real-estate-replay.py) with NumPy to reproduce the series and statistics. Download [the synthetic series](real-estate-series.csv) or inspect [the original chart](real-estate-risk.png).

## What changed in the visual

The portfolio redraws the original observed/adjusted comparison with readable labels, different colors and line styles, a shared fixed axis, and a toggle that reveals the adjustment. Volatility is consistently **quarterly**. The original figure's annualized volatility and correlation bars no longer share an unlabeled mixed-unit axis. The adjusted series is called a **model-adjusted estimate**, not “true” returns.

## Boundaries and next test

This is a synthetic measurement illustration. The model can amplify noise and can mistake genuine economic persistence for appraisal smoothing. Full-sample parameter estimation is unsuitable as evidence of point-in-time investment performance. No claim is made that this adjustment recovers true returns, improves an actual portfolio, or establishes an optimal allocation.

A next study would need appropriate real-world data rights, alternative smoothing assumptions, estimation limited to information available at each decision date, and realistic private-asset liquidity constraints. The portfolio deliberately does not use the synthetic strategy's return or Sharpe ratio as a hiring-facing outcome.
