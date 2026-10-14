import { useId, useState } from "react";
import rows from "./housingForestData.json";

export default function HousingForestVisual() {
  const id = useId();
  const [mode, setMode] = useState<"level" | "error">("error");
  const [month, setMonth] = useState(28);
  const row = rows[month];
  const error = mode === "error";
  const x = (i: number) => 58 + i / (rows.length - 1) * 490;
  const y = (value: number) => error ? 218 - value / 12 * 170 : 218 - (value - 210) / 140 * 170;
  const value = (r: typeof row, key: "actual" | "random_forest" | "naive_lag1") => error ? Math.abs(r[key] - r.actual) : r[key];
  const path = (key: "actual" | "random_forest" | "naive_lag1") => rows.map((r, i) => `${i ? "L" : "M"}${x(i).toFixed(2)},${y(value(r, key)).toFixed(2)}`).join(" ");
  const label = new Date(row.Date + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  return <figure className="project-visual hf-visual">
    <div className="pv-label"><span className="pv-dot" aria-hidden="true" /><span>Tree ensembles / Test the benchmark</span><a className="pv-original" href="/assets/projects/housing-forest-original.png" target="_blank" rel="noreferrer">Original ↗</a></div>
    <div className="pv-body">
      <div className="pv-visual-heading"><strong>Good fit. Wrong benchmark?</strong><span>Switch from the index level to the errors it hides.</span></div>
      <div className="hf-choices" role="group" aria-label="Housing forecast chart view">
        <button type="button" aria-pressed={!error} onClick={() => setMode("level")}>Index levels</button>
        <button type="button" aria-pressed={error} onClick={() => setMode("error")}>Absolute errors</button>
      </div>
      <div className="hf-score"><div><span>Random-forest R²</span><strong>0.978</strong></div><div><span>RMSE / index points</span><strong>5.58 <small>vs</small> 2.78</strong><small>Forest vs last month's value · lower is better</small></div></div>
      <div className="hf-legend"><span className="hf-rf-key">Forest — dashed</span><span className="hf-naive-key">Lag-one — dotted</span>{!error && <span>Actual — solid</span>}</div>
      <svg className="pv-diagram" viewBox="0 0 600 270" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{`${error ? "Absolute prediction errors" : "Housing index and predictions"}, January 2020 to January 2025`}</title>
        <desc id={`${id}-desc`}>Saved monthly historical results. Forest root mean squared error 5.579 index points; lag-one baseline 2.782. Select a month below for exact values. Historical macro inputs are not release-date controlled.</desc>
        <text className="pv-axis-title" x="58" y="25">{error ? "Absolute error / index points" : "Case-Shiller index / points"}</text>
        {(error ? [0, 4, 8, 12] : [210, 250, 300, 350]).map(tick => <g key={tick}><line className="pv-grid" x1="58" x2="548" y1={y(tick)} y2={y(tick)} /><text className="pv-axis" x="47" y={y(tick) + 7} textAnchor="end">{tick}</text></g>)}
        <line className="hf-cursor" x1={x(month)} x2={x(month)} y1="48" y2="218" />
        {!error && <path className="hf-actual" d={path("actual")} />}
        <path className="hf-rf" d={path("random_forest")} /><path className="hf-naive" d={path("naive_lag1")} />
        <circle className="hf-rf-dot" cx={x(month)} cy={y(value(row, "random_forest"))} r="5" /><circle className="hf-naive-dot" cx={x(month)} cy={y(value(row, "naive_lag1"))} r="5" />
        <text className="pv-axis" x="58" y="248">2020</text><text className="pv-axis" x="303" y="248" textAnchor="middle">2022–23</text><text className="pv-axis" x="548" y="248" textAnchor="end">2025</text>
      </svg>
      <label className="hf-month" htmlFor={`${id}-month`}>Inspect a recorded month <output htmlFor={`${id}-month`}>{label}</output></label>
      <input id={`${id}-month`} aria-label="Housing evaluation month" aria-valuetext={label} type="range" min="0" max={rows.length - 1} step="1" value={month} onChange={event => setMonth(Number(event.target.value))} />
      <div className="hf-readout" aria-live="polite" aria-atomic="true"><p><span>{label} · {error ? "absolute error" : "predicted index"}</span><strong>Forest {value(row, "random_forest").toFixed(2)} <small>/</small> Lag-one {value(row, "naive_lag1").toFixed(2)}</strong></p><p>{error ? "A smaller error is better. Both methods use the same target month." : `Actual index: ${row.actual.toFixed(2)}. The level axis starts at 210, not zero.`}</p></div>
      <div className="hf-method"><span>100 trees</span><span>14 features</span><span>61 refits</span></div>
    </div>
    <figcaption className="pv-caption">Historical archived evaluation · Current-vintage macro inputs, not a real-time information set · Original predictions redrawn, not new model output.</figcaption>
  </figure>;
}
