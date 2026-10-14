# Liquidity forecasting: when a simpler forecast is enough

Study finalized October 8, 2026. Portfolio evidence note prepared October 14, 2026 from saved aggregate results; no new forecast or performance experiment was run.

## Decision

Simple linear models improve on five-day persistence in this restricted historical sample. Ridge does not establish a meaningful improvement over ordinary least squares (OLS), and the fixed histogram-boosting comparison is worse than both. This is a **forecast-accuracy result**, not an investment-return or execution-savings result. The forecast comparison is complete; its economic-value follow-up is not.

## What is forecast?

Daily dollar volume is the proxy `V = abs(closing price) × shares traded`. It is not transaction-level turnover or a direct measure of executable capacity.

The target is:

`ln(V_t) − mean(ln(V_t−1), …, ln(V_t−5))`.

Five-day persistence predicts zero innovation: tomorrow's dollar volume is predicted from the prior five-session **geometric mean**. Inputs use complete prior-session windows and prior-month universe membership. Fitting and scaling use training data only.

MSE means mean squared forecast error, in squared natural-log units; lower is better. Relative reduction is `100 × (1 − MSE_model / MSE_persistence)`, on identical security-days. A 16.6% reduction in this loss is not 16.6% less trading cost, 16.6% higher return, or a 16.6-percentage-point change in volume.

## Samples and evaluation chronology

- Training: February 1, 2010–December 31, 2018; 2,191,154 scored rows.
- Validation: January 2, 2019–December 31, 2021; 729,481 common scored security-days out of 757,000 candidates, over 757 reference sessions. Validation was used for ridge selection.
- Exposed historical evaluation: January 3, 2022–December 31, 2024; 742,278 common scored security-days out of 753,000 candidates, over 753 reference sessions. This period had previously been exposed in related data/return-implementation work. It is **not an untouched holdout**.
- The expanded model comparisons and robustness rules were frozen before the historical replay. Models were replayed without refitting or reselection.

All eight models use the same scored observations within each evaluation period. Their raw model-specific forecast availability differs; the common sample prevents these differences from driving the comparison.

## Main comparisons

| Model | Validation MSE | Exposed historical MSE |
| --- | ---: | ---: |
| Five-day persistence | 0.165836555 | 0.162090062 |
| One-day persistence | 0.181861786 | 0.173266303 |
| 22-day log mean | 0.185972662 | 0.180377550 |
| Expanding prior log mean | 1.169494245 | 1.139721704 |
| Training weekday mean | 0.166141368 | 0.161726356 |
| OLS, eight lag features | 0.138368004 | 0.132131812 |
| Ridge, normalized penalty 0.001 | 0.138357903 | 0.132197383 |
| Fixed histogram boosting | 0.148201930 | 0.143798251 |

Ridge's reduction versus five-day persistence is **16.5697%** in validation and **18.4420%** in exposed history. Paired 20-session moving-date-block intervals, using 500 draws, are respectively **14.7071%–18.0297%** and **16.3548%–19.6084%**. These intervals do not correct validation selection, prior historical exposure, or subgroup multiplicity.

OLS captures essentially the entire improvement. Ridge's historical MSE is **0.04963% worse than OLS**. Its pooled OLS-relative difference interval includes zero in both periods; this is no demonstrated advantage, not a formal equivalence finding. A fixed nonlinear model doing worse here does not establish that every nonlinear method must fail.

Saved robustness checks retain positive ridge-versus-persistence gains in every declared year, all five lagged-liquidity groups, and all three lagged-activity regimes in both periods. Symmetric paired-loss trimming and training-cap diagnostics also retain positive gains. These checks are conditional on the observed sample; activity regimes are not verified whole-market crisis labels.

## Limits and economic interpretation

The universe is restricted and reconstructed from a later-vintage vendor cache, not an original-vintage whole-market panel. Missing current targets and incomplete histories can create nonrandom sample selection. The study is not a live or prospective forecast evaluation.

Lower log-volume MSE does not guarantee lower modeled execution cost. The frozen cost example depends on inverse volume, while trade sizes and recursive holdings can also differ by policy. A volume forecast alone does not settle corporate-action, tradability, settlement, or realistic-fill questions. The practical-value study did not deliver a completed cost frontier or risk-matched economic evaluation.

The next useful research tasks are a genuinely future or broader-universe forecasting evaluation and a separately specified execution comparison once its accounting and input boundaries are ready.

## Evidence and visual provenance

- [Original all-eight-model figure](liquidity.png): preserved unchanged. SHA-256 `b7567b0183499068fe4b9388ebd12127942aa382a9f6c9ee189812573671f6df`.
- [Download comparison CSV](liquidity-model-comparison.csv): 16 aggregate rows, covering all eight methods in both evaluation periods. `persistence_relative_r2` is a fraction, not a percentage; negative values mean worse than five-day persistence. No security identifiers or security-level observations are included.
- The source aggregate table was `model_comparison_common_sample.csv`, SHA-256 `63822793f4f92ec0f3b3f6e207cdea8b391fcfea2fdc8899dcaa89fd55ae2724`; source runs were `validation_20261008T0054Z_v2` and `historical_20261008T0109Z_v1`.
- The interactive website redraw shows four key methods on a fixed 0–0.20 MSE scale. Its expandable comparison retains all eight methods, including unfavorable results. Selecting a period changes only which saved aggregate results are displayed.
- Exact empirical reproduction requires independently licensed source inputs. This public evidence package contains aggregate research statistics and the original aggregate chart, not licensed raw data, security-level derived rows, a live model, or the complete research repository.

The model-selection and research interpretations above summarize the saved October 8 interview brief and final sprint report. This portfolio presentation is a source-grounded explanation of that completed forecasting work, not an independent rerun of the full empirical study.
