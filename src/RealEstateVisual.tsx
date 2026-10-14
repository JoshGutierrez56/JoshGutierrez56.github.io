import { useId, useState } from "react";
import data from "./realEstateData.json";

export default function RealEstateVisual() {
  const [adjusted, setAdjusted] = useState(true);
  const id = useId();
  const x = (i: number) => 62 + (i / (data.rows.length - 1)) * 480;
  const y = (value: number) => 202 - ((value + 0.2) / 0.5) * 170;
  const path = (key: "observed" | "adjusted") => data.rows.map((row, i) => `${i ? "L" : "M"}${x(i).toFixed(2)},${y(row[key]).toFixed(2)}`).join(" ");
  return (
    <figure className="project-visual pv-real-estate">
      <div className="pv-label"><span className="pv-dot" aria-hidden="true" /><span>Real assets / The risk behind the appraisal</span><a className="pv-original" href="/assets/projects/real-estate-risk.png" target="_blank" rel="noreferrer">Original ↗</a></div>
      <div className="pv-body">
        <div className="pv-visual-heading"><strong>Smoother does not always mean safer.</strong><span>Reveal the model adjustment on the same scale.</span></div>
        <div className="pv-re-choices" role="group" aria-label="Real estate return comparison">
          <button type="button" aria-pressed={!adjusted} onClick={() => setAdjusted(false)}>Observed only</button>
          <button type="button" aria-pressed={adjusted} onClick={() => setAdjusted(true)}>Show the adjustment</button>
        </div>
        <div className="pv-re-legend"><span><i />Observed synthetic returns</span><span className={adjusted ? "" : "is-hidden"}><i />Model-adjusted estimate</span></div>
        <svg className="pv-diagram" viewBox="0 0 600 265" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{`Synthetic quarterly real-estate returns, ${adjusted ? "observed and model-adjusted" : "observed only"}`}</title>
          <desc id={`${id}-desc`}>The model-adjusted series fluctuates more widely. Quarterly volatility is 3.33% observed and 8.22% adjusted. Same fixed vertical scale in both views. This is a synthetic illustration, not actual property returns.</desc>
          <text className="pv-axis-title" x="62" y="23">Quarterly return (%)</text>
          {[-0.2, 0, 0.2].map(value => <g key={value}><line className={value === 0 ? "pv-zero" : "pv-grid"} x1="62" x2="542" y1={y(value)} y2={y(value)} /><text className="pv-axis" x="52" y={y(value) + 7} textAnchor="end">{value * 100}%</text></g>)}
          {adjusted && <path d={path("adjusted")} className="pv-re-adjusted" />}
          <path d={path("observed")} className="pv-re-observed" />
          <text className="pv-axis" x="62" y="234">2004</text><text className="pv-axis" x="542" y="234" textAnchor="end">2023</text>
          <text className="pv-axis-title" x="302" y="261" textAnchor="middle">Synthetic calendar</text>
        </svg>
        <div className="pv-re-readout" aria-live="polite" aria-atomic="true">
          <div><span>Quarterly volatility</span><strong>{adjusted ? "8.22" : "3.33"}<small>%</small></strong><p>{adjusted ? "After the model adjustment" : "Before the model adjustment"}</p></div>
          <div><span>{adjusted ? "Compared with observed" : "Lag-one correlation"}</span><strong>{adjusted ? "2.47" : "0.708"}<small>{adjusted ? "×" : ""}</small></strong><p>{adjusted ? "Model-dependent, not ground truth" : "Persistence can mask variability"}</p></div>
        </div>
        <p className="pv-re-question">The allocation question: how much confidence should a low reported volatility earn?</p>
      </div>
      <figcaption className="pv-caption">Original seeded synthetic example · 79 quarters · Full-sample parameter estimate. The adjustment illustrates a measurement assumption, not validated investment performance.</figcaption>
    </figure>
  );
}
