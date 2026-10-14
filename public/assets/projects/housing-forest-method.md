# Case-Shiller random forest: evaluate against persistence

## What was built

An applied scikit-learn `RandomForestRegressor` workflow, not a new tree-learning algorithm. Each evaluation month fits 100 trees with random seed 42 on rows strictly earlier than that month. Inputs are ten contemporaneous macroeconomic variables plus Case-Shiller index lags of 1, 3, 6 and 12 months. The original bundled workbook spans January 2000–January 2025; evaluation covers January 2020–January 2025, or 61 monthly predictions.

The model is evaluated on the S&P CoreLogic Case-Shiller 20-City Composite Home Price Index. The source workbook's original retrieval procedure, revisions and point-in-time vintage have not been independently verified.

## Saved result

| Metric | Random forest | Last month's index |
| --- | ---: | ---: |
| RMSE, index points | 5.57905144345184 | 2.781508062297193 |
| MAE, index points | 4.8319687844276515 | 2.3222140308181967 |
| R² | 0.9782352860659727 | 0.9945900546550639 |

All metrics use the same 61 observations. RMSE = square root of the mean squared prediction error; MAE = mean absolute prediction error. Both models' scores were independently recalculated from the saved prediction CSV for the portfolio presentation. No model training was rerun for this exhibit.

The forest's RMSE is about 2.006 times the naive baseline's. A high level R² does not demonstrate incremental forecasting value. This specification fails its benchmark.

## Interactive exhibit

The exhibit redraws the [original evaluation chart](housing-forest-original.png) from the [unchanged prediction CSV](housing-forest-predictions.csv). The level view uses a visibly labeled 210–350 index-point axis; the absolute-error view uses 0–12 index points. Series share a scale within each view. The month selector only inspects saved observations. It does not fit a new model or interpolate a forecast.

## Chronology and limitations

- Calendar-ordered training is verified in the source, but contemporaneous macroeconomic inputs may not have been released at the forecast date. Revisions are also uncontrolled.
- The lag-one comparator uses the previous index observation in this historical workbook. Real-time index publication delays would need explicit treatment for both methods.
- There is no untouched future deployment sample, no economic-value test, and no claim of successful housing-price prediction.
- High errors do not establish that all random forests fail; release-date controls, nested temporal tuning, alternate targets and stronger baselines are proposed follow-up tests.

## Source lineage and reproduction

The original [notebook repository](https://github.com/JoshGutierrez56/CaseShillerRandomForest) does not currently contain the archived evaluation bundle. The exact evaluated source is therefore supplied in [housing-forest-source.zip](housing-forest-source.zip), with tests, requirements, frozen outputs, a workbook retrieval link and SHA-256 manifest. It preserves research revision `3cbb4e50f076b2056e104d22f2bc3cbc5527715d`; the original public notebook/data revision checked for this release is `6cc3ee3c3df5227280338a00dbae8b00c2e19f19`.

The source archive excludes the workbook and makes no claim to redistribute the original data rights. Dependency requirements specify minimum versions, not a fully locked environment. See [provenance](housing-forest-provenance.json) for exact hashes. Current public repository descriptions are not substituted for the evaluated snapshot.
