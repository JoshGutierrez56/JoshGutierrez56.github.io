import { useId, useState } from "react";

// Saved aggregate comparison only. No security-level data or live inference.
// Exact numbers and source provenance: /assets/projects/liquidity-evidence.md.
const models = [
  { id: "five_day", name: "Five-day persistence", validation: 0.1658365554378811, historical: 0.16209006181414246, featured: true },
  { id: "one_day", name: "One-day persistence", validation: 0.18186178636458525, historical: 0.17326630273559052 },
  { id: "mean_22", name: "22-day log mean", validation: 0.1859726621055399, historical: 0.18037755019111612 },
  { id: "expanding", name: "Expanding prior log mean", validation: 1.1694942452080996, historical: 1.1397217037711855 },
  { id: "weekday", name: "Training weekday mean", validation: 0.16614136848388683, historical: 0.1617263557291497 },
  { id: "ols", name: "OLS · simple linear", validation: 0.13836800398814372, historical: 0.1321318120242415, featured: true },
  { id: "ridge", name: "Ridge · regularized linear", validation: 0.13835790287865082, historical: 0.13219738305193582, featured: true },
  { id: "hist_gradient_boosting", name: "Fixed histogram boosting", validation: 0.14820192982387362, historical: 0.14379825146864636, featured: true },
] as const;

type Period = "validation" | "historical";

export default function LiquidityVisual() {
  const [period, setPeriod] = useState<Period>("validation");
  const uniqueId = useId();
  const baseline = models[0][period];
  const ridge = models[6][period];
  const improvement = (1 - ridge / baseline) * 100;
  const isValidation = period === "validation";
  const periodLabel = isValidation ? "2019–2021 validation" : "2022–2024 exposed history";

  return (
    <figure className="project-visual pv-liquidity">
      <div className="pv-label"><span className="pv-dot" aria-hidden="true" /><span>Forecasting is not execution.</span><a className="pv-original" href="/assets/projects/liquidity.png" target="_blank" rel="noreferrer" aria-label="Open the original liquidity model comparison in a new tab">Original ↗</a></div>
      <div className="pv-body">
        <div className="pv-visual-heading"><strong>The linear model earns its place.</strong><span>Does extra complexity add anything?</span></div>
        <div className="lv-periods" role="group" aria-label="Liquidity forecast evaluation period">
          <button type="button" aria-pressed={isValidation} onClick={() => setPeriod("validation")}>2019–2021<span>Validation</span></button>
          <button type="button" aria-pressed={!isValidation} onClick={() => setPeriod("historical")}>2022–2024<span>Exposed history</span></button>
        </div>
        <div className="lv-summary" aria-live="polite" aria-atomic="true"><strong>{improvement.toFixed(1)}<span>%</span></strong><p>less forecast MSE with ridge<br /><b>versus five-day persistence</b></p><small>{periodLabel} · {isValidation ? "729,481" : "742,278"} common security-days</small></div>
        <div className="lv-chart" role="group" aria-label={`Four key methods in ${periodLabel}. Lower mean squared error is better.`}>
          <div className="lv-chart-title"><span>Mean squared forecast error</span><span>Lower is better</span></div>
          {models.filter((model) => "featured" in model && model.featured).map((model) => <div className={`lv-bar-row ${model.id === "ols" || model.id === "ridge" ? "lv-linear" : ""}`} key={model.id}>
            <div className="lv-bar-label"><span>{model.name}</span><b>{model[period].toFixed(4)}</b></div>
            <div className="lv-bar-track" aria-hidden="true"><span style={{ width: `${model[period] / 0.2 * 100}%` }} /></div>
          </div>)}
          <div className="lv-scale" aria-hidden="true"><span>0</span><span>0.20</span></div>
        </div>
        <div className="lv-takeaway"><strong>OLS ≈ ridge.</strong><span>Both beat fixed boosting. Regularization did not establish a meaningful gain over OLS.</span></div>
        <details className="lv-details">
          <summary>Compare all 8 frozen methods</summary>
          <table aria-labelledby={`${uniqueId}-table-caption`}>
            <caption id={`${uniqueId}-table-caption`}>{periodLabel} · same sample for every method</caption>
            <thead><tr><th scope="col">Method</th><th scope="col">MSE</th><th scope="col">Reduction vs baseline</th></tr></thead>
            <tbody>{models.map((model) => <tr key={model.id}><th scope="row">{model.name}</th><td>{model[period].toFixed(6)}</td><td>{model.id === "five_day" ? "Baseline" : `${((1 - model[period] / baseline) * 100).toFixed(2)}%`}</td></tr>)}</tbody>
          </table>
          <p>Negative reduction means worse than five-day persistence. MSE is measured in squared natural-log units.</p>
          <a href="/assets/projects/liquidity-model-comparison.csv" download>Download both periods as CSV ↗</a>
        </details>
      </div>
      <figcaption className="pv-caption">Saved historical forecast results · MSE in squared natural-log units · 2022–2024 previously exposed, not an untouched holdout · No demonstrated execution savings.</figcaption>
    </figure>
  );
}
