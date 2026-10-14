# Deep Momentum Network — archived implementation and evidence

## What this exhibit demonstrates

A real PyTorch recurrent-network implementation with engineered temporal features, a custom differentiable risk-adjusted objective, validation-based model selection, bounded signals, portfolio sizing, and walk-forward diagnostics. The saved run uses **synthetic ETF-like observations**, not historical market data. Neither a profitable strategy nor superiority to a simpler model has been established by this evidence.

The portfolio redraws the archived `results/fold_metrics.png` without inventing data. Its metric buttons select recorded drawdown, volatility, or annualized-return columns; its fold buttons select one of the nine recorded rows. No browser training or live inference occurs. The original chart is preserved unmodified in [deep-momentum-original.png](deep-momentum-original.png).

## Version and provenance

- Original research: [ETF-Deep-Momentum-Network](https://github.com/JoshGutierrez56/ETF-Deep-Momentum-Network), based on Lim, Zohren, and Roberts, [Enhancing Time Series Momentum Strategies Using Deep Neural Networks](https://arxiv.org/abs/1904.04912).
- Archived audited version: commit `3a963577bc3f85b0b867c1842f12cc456ef95315`, titled “Repair deep momentum backtest and attach verified results.” This local archived version, not the current public repository, supplies this exhibit's code and saved evidence.
- Public repository HEAD inspected on October 14, 2026: `a86e286b6ef9412c516be4c663164f192c6c6fab`. It contains the earlier implementation and hard-coded benchmark comparison values. Those advertised historical returns are **not** evidence for this exhibit and are not reproduced here.
- [Download the audited source bundle](deep-momentum-source.zip). It includes the archived code, requirements, tests, saved results, and a SHA-256 manifest. The bundle has no private market observations, credentials, or machine-specific paths. Its original files are unmodified; audit qualifications are added in `AUDIT-NOTES.md`.
- [Original fold CSV](deep-momentum-folds.csv) and [saved run summary](deep-momentum-summary.json) remain available separately.

No model was retrained for the portfolio expansion. Dependencies are lower-bounded rather than fully locked; exact numerical reproduction across hardware and library versions is not established.

## Architecture of the saved compact run

1. **Inputs: 63 daily observations × 14 features.** Six volatility-scaled returns, three MACD features, two breakout features, and three distances from moving averages.
2. **One LSTM layer, eight hidden units.** The last hidden state represents the input sequence. The full configuration defaults to 32 units; the saved quick run uses eight.
3. **Position head:** Linear(8, 8), ReLU, dropout 0.1, Linear(8, 1), tanh. The raw position is in [-1, 1].
4. **Training:** Adam, learning rate 0.001, weight decay 0.0001, batch size 128, four requested epochs, patience two, gradient-norm clipping at one, and best validation-checkpoint restoration. Seed 42. The objective is negative batch mean position-return divided by its standard deviation, annualized, plus a position-difference penalty.
5. **Sizing:** target volatility 15%, per-signal scaling clipped to [0.2, 3.0] when realized volatility is above 1%, and an aggregate gross-leverage cap of three. Positions are rebalanced every 21 available test days. Five basis points are charged per unit of realized absolute portfolio turnover.
6. **Evaluation:** expanding training windows, an initial three-year training segment, six-month validation and nominal six-month test segments. The compact run evaluates the equity asset class (nine simulated ETF-like series) in nine folds.

The source's quick-run configuration sets `sequence_length=21`, but `run_dmn` does not pass that setting to `prepare_sequences`; its default 63 is the length actually used. This exhibit describes the executed path, not that unused configuration value.

## Recorded result and interpretation

Seven of nine synthetic folds have positive annualized returns. Fold 6 has the largest recorded within-fold drawdown, -8.1861%; fold 7 has the lowest annualized return, -16.2521%; fold 1 has the highest, 192.9107%. These are short-window annualizations of simulated outcomes, not observed investable returns. The unusually large values and their dispersion are reasons to inspect the evaluation, not to advertise alpha.

The downloadable CSV and original figure preserve a column labeled `Sharpe`. In this code it is **CAGR divided by annualized volatility**, not the conventional annualized arithmetic mean excess return divided by volatility. The portfolio therefore does not display it as a standard Sharpe ratio or use it for a market-performance headline. No risk-free-rate adjustment is made.

Drawdown is the minimum decline from the running cumulative-return peak within each fold. The code's peak calculation begins with the first recorded wealth value rather than prepending initial wealth one; an immediate first-day loss may therefore not be included in reported maximum drawdown. Volatility is the sample daily return standard deviation multiplied by √252.

## Audit findings and next experiment

- **Training cost proxy is not temporal turnover.** Training batches are shuffled, while the loss differences adjacent batch positions. Those differences can span unrelated dates or assets. The backtest separately deducts actual chronological portfolio turnover. Rewrite the loss around ordered within-asset paths before interpreting it as cost-aware learning.
- **Configuration plumbing needs reconciliation.** Pass the declared sequence length explicitly; the current quick-run setting is ignored as described above.
- **Split-boundary warmup discards observations.** Train, validation, and test sequences are constructed separately, so each validation/test slice loses its initial 63 observations plus the prediction alignment offset. Thus the saved out-of-sample return series has gaps; it is not a continuous multi-year investable path. Preserve only already-known past context across boundaries in the next design.
- **Signal and return timing was repaired in the archived version.** Metadata identifies the realized return date at `i+1`, not `i`; the archived test checks that alignment. This does not certify every execution assumption.
- **Validation and loss differ from portfolio evaluation.** Checkpoint selection uses unscaled signal-return observations, without the realized portfolio costs, while the portfolio uses volatility sizing, leverage limits, and a rebalance schedule. A consistent objective and validation definition are needed.
- **No market benchmark or ablation conclusion.** The archive has no saved matched-sample historical buy-and-hold or simple-momentum comparison, no multi-seed robustness result, and no ablation establishing incremental value from the LSTM or loss.
- **Test coverage is bounded.** The archived tests cover deterministic data generation, realized-return metadata alignment, and refusing to plot missing evidence. They do not prove market validity or complete backtest correctness.

The next useful study is a frozen historical comparison with chronological cost-aware training, reconciled metrics, strong simple baselines, and representation/objective/sizing ablations. That study is not represented as completed.

## Reproduction command from the archive

```bash
python -m pip install -r requirements.txt
python dmn.py --offline --quick --output-dir results
python benchmark.py --metrics results/fold_metrics.csv --output results/fold_metrics.png
python -m pytest -q
```

The command trains models; the portfolio only reuses the previously saved evidence. The downloadable source is a research snapshot, not a production trading system.
