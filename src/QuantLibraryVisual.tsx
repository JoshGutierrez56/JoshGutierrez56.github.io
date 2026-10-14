import { useId, useState } from "react";
import type { ReactNode } from "react";
import riskData from "./risk-parity-data.json";
import hmmData from "./macro-hmm-data.json";
import garchData from "./garch-data.json";

function Frame({ id, label, caption, children }: { id: string; label: string; caption: string; children: ReactNode }) {
  return <figure className={`project-visual qv-${id}`}>
    <div className="pv-label"><span className="pv-dot" aria-hidden="true" /><span>{label}</span>
      <a className="pv-original" href={`/assets/projects/${id}.png`} target="_blank" rel="noreferrer">Source chart ↗</a>
    </div>
    <div className="pv-body qv-body">{children}</div>
    <figcaption className="pv-caption">{caption}</figcaption>
  </figure>;
}

const pairs = [
  { id: "value-quality", name: "Value / profitability", a: "Book-to-market", b: "Gross profitability", value: -.52,
    note: "Higher value ranks tended to coincide with lower profitability ranks in this saved cross-section." },
  { id: "momentum-reversal", name: "Momentum / reversal", a: "12–2 momentum", b: "Short-term reversal", value: .14,
    note: "The observed relationship is mildly positive—not the negative relationship expected in the notebook. Inspect the definitions and sample before generalizing." },
  { id: "reversal-beta", name: "Reversal / market beta", a: "Short-term reversal", b: "60-month beta", value: .56,
    note: "These two rankings overlap positively in this snapshot. Combining them does not automatically add independent information." },
  { id: "size-beta", name: "Size / market beta", a: "Size", b: "60-month beta", value: -.22,
    note: "A modest negative relationship appears here. One universe on one date cannot establish a stable relationship." },
];

function Optlab() {
  const [pairId, setPairId] = useState(pairs[0].id);
  const pair = pairs.find(item => item.id === pairId) ?? pairs[0];
  const uid = useId();
  const x = (value: number) => 45 + (value + 1) * 235;
  return <Frame id="optlab" label="Read the relationship, not the label" caption="Archived liquid_500 cross-section · 2023-12-29 · Values transcribed at the source chart’s two-decimal precision; not freshly rerun.">
    <div className="pv-visual-heading"><strong>Do these signals tell the same story?</strong><span>Inspect four pairs from the original nine-signal matrix.</span></div>
    <label className="qv-control" htmlFor={`${uid}-pair`}>Signal pair
      <select id={`${uid}-pair`} aria-label="Signal pair" value={pairId} onChange={e => setPairId(e.target.value)}>{pairs.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
    </label>
    <div className="qv-pair-names"><span>{pair.a}</span><span aria-hidden="true">↔</span><span>{pair.b}</span></div>
    <svg viewBox="0 0 560 155" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
      <title id={`${uid}-title`}>{`${pair.name}: rank correlation ${pair.value.toFixed(2)}`}</title>
      <desc id={`${uid}-desc`}>Signed correlation on a scale from minus one to plus one. This measures cross-sectional co-movement in signal ranks, not return prediction.</desc>
      {[-1, -.5, 0, .5, 1].map(tick => <g key={tick}><line x1={x(tick)} x2={x(tick)} y1="26" y2="103" className={tick === 0 ? "qv-zero" : "pv-grid"} /><text x={x(tick)} y="132" textAnchor="middle" className="pv-axis">{tick.toFixed(1)}</text></g>)}
      <rect x={Math.min(x(0), x(pair.value))} y="45" width={Math.abs(x(pair.value)-x(0))} height="36" rx="3" fill={pair.value < 0 ? "#2e6e9e" : "#a84b35"} />
      <circle cx={x(pair.value)} cy="63" r="6" fill="#182a43" />
    </svg>
    <div className="qv-readout" aria-live="polite" aria-atomic="true"><strong>{pair.value > 0 ? "+" : ""}{pair.value.toFixed(2)}<small>rank correlation</small></strong><p>{pair.note}</p></div>
    <p className="qv-boundary">Correlation between signals is not evidence that either predicts returns.</p>
  </Frame>;
}

const portfolioNames = { risk_parity: "Equal risk contribution", inv_vol: "Inverse volatility", equal_weight: "Equal capital weight" };

function RiskParity() {
  const [strategy, setStrategy] = useState<keyof typeof portfolioNames>("risk_parity");
  const [metric, setMetric] = useState<"weight" | "risk_share">("weight");
  const uid = useId();
  const rows = riskData.rows.filter(row => row.strategy === strategy);
  const max = Math.max(.4, ...rows.map(row => row[metric]));
  const minimum = Math.min(-.05, ...rows.map(row => row[metric]));
  const scale = (value: number) => 110 + (value-minimum)/(max-minimum) * 350;
  return <Frame id="risk-parity" label="Same snapshot. Two ways to see the portfolio." caption={`Synthetic ten-ETF snapshot · ${riskData.date.slice(0, 10)} · Full-covariance risk shares are estimates, not forecasts of losses.`}>
    <div className="pv-visual-heading"><strong>Capital weight ≠ risk share.</strong><span>Change the portfolio, then compare the two views.</span></div>
    <label className="qv-control" htmlFor={`${uid}-strategy`}>Allocation
      <select id={`${uid}-strategy`} aria-label="Allocation" value={strategy} onChange={e => setStrategy(e.target.value as keyof typeof portfolioNames)}>{Object.entries(portfolioNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>
    </label>
    <div className="pv-methods" role="group" aria-label="Allocation chart measure">
      <button type="button" aria-pressed={metric === "weight"} onClick={() => setMetric("weight")}>Capital weight</button>
      <button type="button" aria-pressed={metric === "risk_share"} onClick={() => setMetric("risk_share")}>Risk share</button>
    </div>
    <svg viewBox="0 0 560 365" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
      <title id={`${uid}-title`}>{`${portfolioNames[strategy]}: ${metric === "weight" ? "capital weights" : "shares of variance"}`}</title>
      <desc id={`${uid}-desc`}>{rows.map(row => `${row.ticker}: ${(row[metric]*100).toFixed(2)} percent`).join(". ")}. Solid reference: zero. Dashed reference: ten percent per asset. Negative contributions extend left of zero.</desc>
      <line x1={scale(0)} x2={scale(0)} y1="15" y2="316" stroke="#a6b0bc" />
      <text x={scale(0)} y="342" textAnchor="middle" className="pv-axis">0%</text>
      <line x1={scale(.1)} x2={scale(.1)} y1="15" y2="316" stroke="#7b8797" strokeDasharray="4 4" />
      <text x={scale(.1)} y="342" textAnchor="middle" className="pv-axis">10%</text>
      {rows.map((row, i) => <g key={row.ticker}>
        <text x="60" y={i*30+35} textAnchor="end" className="pv-axis">{row.ticker}</text>
        <rect x={Math.min(scale(0), scale(row[metric]))} y={i*30+18} width={Math.abs(scale(row[metric])-scale(0))} height="23" rx="2" fill={row[metric] < 0 ? "#9b5149" : metric === "weight" ? "#275b97" : "#39775c"} />
        <text x={scale(row[metric])+(row[metric] < 0 ? -9 : 9)} y={i*30+35} textAnchor={row[metric] < 0 ? "end" : "start"} className="pv-axis">{(row[metric]*100).toFixed(1)}%</text>
      </g>)}
    </svg>
    <p className="qv-boundary" aria-live="polite">{strategy === "risk_parity" ? "ERC balances modeled risk contributions, not dollars invested." : strategy === "inv_vol" ? "Inverse volatility uses individual volatility; it need not balance full-covariance risk shares." : "Equal dollars leave different assets contributing different amounts of modeled risk."}</p>
    {metric === "risk_share" && rows.some(row => row.risk_share < 0) && <p className="qv-boundary">A negative risk share reflects a diversifying contribution under this covariance estimate—not negative standalone volatility or a risk-free holding.</p>}
    <details className="qv-data"><summary>Exact snapshot values</summary><table><caption>{portfolioNames[strategy]} · synthetic snapshot</caption><thead><tr><th>Asset</th><th>Capital</th><th>Risk share</th></tr></thead><tbody>{rows.map(row => <tr key={row.ticker}><th scope="row">{row.ticker}</th><td>{(row.weight*100).toFixed(3)}%</td><td>{(row.risk_share*100).toFixed(3)}%</td></tr>)}</tbody></table></details>
  </Frame>;
}

const stateNames = ["High slope", "Middle slope", "Low slope"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function MacroHMM() {
  const [year, setYear] = useState(2005);
  const uid = useId();
  const rows = hmmData.rows.filter(row => row.date.startsWith(String(year)));
  const differences = rows.filter(row => row.filtered !== null && row.full !== row.filtered).length;
  return <Frame id="macro-hmm" label="What did the model know at the time?" caption="Synthetic 2000–2024 series · Seed 42 · First 60 months train the model. State labels follow fitted yield-curve means, not verified recession categories.">
    <div className="pv-visual-heading"><strong>Hindsight and filtering are different tasks.</strong><span>Compare the same months under two information sets.</span></div>
    <label className="qv-control" htmlFor={`${uid}-year`}>Observation year
      <select id={`${uid}-year`} aria-label="Observation year" value={year} onChange={e => setYear(Number(e.target.value))}>{Array.from({length: 20}, (_, i) => i+2005).map(value => <option key={value} value={value}>{value}</option>)}</select>
    </label>
    {(["full", "filtered"] as const).map(mode => <section className="qv-timeline" key={mode} aria-label={mode === "full" ? "Full-history descriptive states" : "Sequentially filtered states"}>
      <h4>{mode === "full" ? "Full history" : "Sequential filtering"}<small>{mode === "full" ? "Includes observations through 2024" : "Parameters fitted before each month"}</small></h4>
      <ol>{rows.map((row, i) => { const state = row[mode]; return <li key={row.date}><span>{monthNames[i]}</span><strong className={`qv-state-${state}`} title={state === null ? "Training period" : stateNames[state]}><span className="p-sr-only">{state === null ? "Training period" : stateNames[state]}</span><span aria-hidden="true">{state === 0 ? "H" : state === 1 ? "M" : state === 2 ? "L" : "—"}</span></strong></li>; })}</ol>
    </section>)}
    <div className="qv-state-legend"><span>H / High slope</span><span>M / Middle slope</span><span>L / Low slope</span></div>
    <div className="qv-readout" aria-live="polite" aria-atomic="true"><strong>{differences}<small>of 12 states differ</small></strong><p>Differences can reflect future information, refitted parameters and changing state boundaries—not necessarily errors.</p></div>
    <p className="qv-boundary">Only the filtered state enters the allocation experiment, and only in the following calendar month.</p>
  </Frame>;
}

function GarchVolatility() {
  const [shock, setShock] = useState(-2);
  const uid = useId();
  const row = garchData.rows.find(item => item.shock_pct === shock) ?? garchData.rows[12];
  const x = (value: number) => 52 + (value + 5) / 10 * 450;
  const y = (value: number) => 222 - (value - 15) / 25 * 180;
  return <Frame id="garch-volatility" label="A model assumption you can inspect" caption="Adapted from the project’s original news-impact equations · Illustrative parameters · Prior annualized volatility 20%, 252 sessions per year.">
    <div className="pv-visual-heading"><strong>Same-sized shock. Different risk response.</strong><span>Move between a gain and an equal-sized loss.</span></div>
    <label className="qv-control" htmlFor={`${uid}-shock`}>Return innovation <output>{shock > 0 ? "+" : ""}{shock.toFixed(2)}%</output>
      <input id={`${uid}-shock`} aria-label="Return innovation" type="range" min="-5" max="5" step="0.25" value={shock} aria-valuetext={`${shock.toFixed(2)} percent`} onChange={event => setShock(Number(event.target.value))} />
    </label>
    <svg viewBox="0 0 550 275" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
      <title id={`${uid}-title`}>{`Next-session annualized volatility after a ${shock}% innovation`}</title>
      <desc id={`${uid}-desc`}>{`GARCH ${row.garch_vol_pct.toFixed(2)} percent; GJR ${row.gjr_vol_pct.toFixed(2)} percent. Both curves use illustrative parameters. The horizontal reference is prior annualized volatility of 20 percent, not a risk limit.`}</desc>
      {[15,20,25,30,35,40].map(value => <g key={value}><line x1="52" x2="502" y1={y(value)} y2={y(value)} className="pv-grid" strokeDasharray={value===20?"5 4":undefined} /><text x="42" y={y(value)+4} textAnchor="end" className="pv-axis">{value}%</text></g>)}
      <line x1={x(0)} x2={x(0)} y1="42" y2="222" className="qv-zero" />
      {([-5,0,5]).map(value => <text key={value} x={x(value)} y="248" textAnchor={value < 0 ? "start" : value > 0 ? "end" : "middle"} className="pv-axis">{value > 0 ? "+" : ""}{value}% shock</text>)}
      <polyline points={garchData.rows.map(item => `${x(item.shock_pct)},${y(item.garch_vol_pct)}`).join(" ")} fill="none" stroke="#275b97" strokeWidth="3" />
      <polyline points={garchData.rows.map(item => `${x(item.shock_pct)},${y(item.gjr_vol_pct)}`).join(" ")} fill="none" stroke="#a34b37" strokeWidth="3" strokeDasharray="7 3" />
      <line x1={x(shock)} x2={x(shock)} y1="42" y2="222" stroke="#788597" strokeDasharray="2 4" />
      <circle cx={x(shock)} cy={y(row.garch_vol_pct)} r="5" fill="#275b97" />
      <circle cx={x(shock)} cy={y(row.gjr_vol_pct)} r="5" fill="#a34b37" />
    </svg>
    <div className="qv-vol-readout" aria-live="polite" aria-atomic="true"><div><span>GARCH · solid blue</span><strong>{row.garch_vol_pct.toFixed(2)}%</strong><small>Symmetric response</small></div><div><span>GJR · dashed red</span><strong>{row.gjr_vol_pct.toFixed(2)}%</strong><small>Sign-sensitive response</small></div></div>
    <p className="qv-boundary">Annualized conditional volatility, not a predicted loss. These fixed parameters illustrate the mechanism; they do not establish forecast accuracy.</p>
  </Frame>;
}

export default function QuantLibraryVisual({ id }: { id: "optlab" | "risk-parity" | "macro-hmm" | "garch-volatility" }) {
  return id === "optlab" ? <Optlab /> : id === "risk-parity" ? <RiskParity /> : id === "macro-hmm" ? <MacroHMM /> : <GarchVolatility />;
}
