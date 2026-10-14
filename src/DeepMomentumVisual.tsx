import { useId, useState } from "react";

// Exact archived synthetic-run records. See deep-momentum-method.md for lineage.
const folds = [
  { fold: 0, cagr: 1.0293795636090897, vol: 6.239387011118112, drawdown: -3.657793324428984 },
  { fold: 1, cagr: 192.91065488947595, vol: 13.747823957795042, drawdown: -2.7845464009486753 },
  { fold: 2, cagr: 43.01769447675545, vol: 12.393682822689694, drawdown: -2.9932195973639826 },
  { fold: 3, cagr: -8.071786596921694, vol: 7.807112150555342, drawdown: -3.9028492310022442 },
  { fold: 4, cagr: 3.9166851844499195, vol: 4.585513101678491, drawdown: -3.514184355228024 },
  { fold: 5, cagr: 20.69621946579496, vol: 13.586692805328296, drawdown: -6.392196287321439 },
  { fold: 6, cagr: 1.5328091693562085, vol: 11.52968164383107, drawdown: -8.186149631730235 },
  { fold: 7, cagr: -16.252130286107814, vol: 4.17214495022303, drawdown: -4.8164270318041345 },
  { fold: 8, cagr: 173.01737913088397, vol: 17.372778811753463, drawdown: -3.3602199891457 },
] as const;

const metrics = {
  drawdown: { label: "Drawdown", title: "Maximum drawdown (%)", min: -10, max: 0, ticks: [-10, -5, 0] },
  vol: { label: "Volatility", title: "Annualized volatility (%)", min: 0, max: 20, ticks: [0, 10, 20] },
  cagr: { label: "Return", title: "Annualized fold return (%)", min: -25, max: 200, ticks: [-25, 0, 100, 200] },
} as const;
type Metric = keyof typeof metrics;

export default function DeepMomentumVisual() {
  const [metric, setMetric] = useState<Metric>("drawdown");
  const [selected, setSelected] = useState(6);
  const uniqueId = useId();
  const settings = metrics[metric];
  const chosen = folds[selected];
  const y = (value: number) => 22 + (settings.max - value) / (settings.max - settings.min) * 166;

  return (
    <figure className="project-visual pv-deep-momentum">
      <div className="pv-label"><span className="pv-dot" aria-hidden="true" /><span>Synthetic execution evidence only</span><a className="pv-original" href="/assets/projects/deep-momentum-original.png" target="_blank" rel="noreferrer" aria-label="Open original synthetic fold diagnostics in a new tab">Original ↗</a></div>
      <div className="pv-body">
        <div className="pv-visual-heading"><strong>Learn a position. Inspect every fold.</strong><span>PyTorch LSTM · risk-aware objective · nine test folds</span></div>
        <div className="dm-metrics" role="group" aria-label="Deep momentum diagnostic metric">
          {(Object.keys(metrics) as Metric[]).map((key) => <button key={key} type="button" aria-pressed={metric === key} onClick={() => setMetric(key)}>{metrics[key].label}</button>)}
        </div>
        <div className="dm-chart-title">{settings.title}<span>Saved synthetic run</span></div>
        <svg className="dm-chart" viewBox="0 0 480 222" role="img" aria-labelledby={`${uniqueId}-title ${uniqueId}-description`}>
          <title id={`${uniqueId}-title`}>{`${settings.title} across nine synthetic walk-forward folds`}</title>
          <desc id={`${uniqueId}-description`}>Fold {chosen.fold} is selected: {chosen[metric].toFixed(2)} percent. Use the buttons below to inspect each fold. Full values are in the accessible data table.</desc>
          {settings.ticks.map((tick) => <g key={tick}><line x1="49" x2="470" y1={y(tick)} y2={y(tick)} className={tick === 0 ? "dm-zero" : "dm-grid"} /><text x="40" y={y(tick) + 4} textAnchor="end">{tick}</text></g>)}
          {folds.map((fold, index) => <g key={fold.fold}>
            <rect x={58 + index * 46} y={Math.min(y(0), y(fold[metric]))} width="29" height={Math.max(1, Math.abs(y(fold[metric]) - y(0)))} rx="2" className={selected === index ? "dm-selected-bar" : "dm-bar"} />
            <text x={72.5 + index * 46} y="212" textAnchor="middle">{fold.fold}</text>
          </g>)}
        </svg>
        <div className="dm-fold-label">Select a recorded fold</div>
        <div className="dm-folds" role="group" aria-label="Select deep momentum fold">
          {folds.map((fold, index) => <button type="button" key={fold.fold} aria-label={`Fold ${fold.fold}`} aria-pressed={selected === index} onClick={() => setSelected(index)}>{fold.fold}</button>)}
        </div>
        <div className="dm-readout" aria-live="polite" aria-atomic="true"><strong>{chosen[metric].toFixed(2)}<span>%</span></strong><p>Fold {chosen.fold} · {settings.title.replace(" (%)", "").toLowerCase()}<br /><span>{metric === "cagr" ? "Short synthetic windows amplify annualized returns." : metric === "drawdown" ? "Largest peak-to-trough decline within this fold." : "Daily return variability, annualized by √252."}</span></p></div>
        <details className="dm-details">
          <summary>Inside the trained network</summary>
          <ol className="dm-architecture">
            <li><b>63 days × 14 features</b><span>Volatility-scaled returns, MACD, breakouts, and moving-average distances.</span></li>
            <li><b>LSTM · 8 hidden units</b><span>The saved compact run learns a sequence representation; the full configuration uses 32 units.</span></li>
            <li><b>Dense → ReLU → dropout → tanh</b><span>An 8-unit head produces a bounded signal, then volatility scaling and a portfolio leverage cap size positions.</span></li>
            <li><b>Train → validate → test</b><span>A Sharpe-style objective, Adam, gradient clipping, and validation-based checkpoint selection precede each unseen synthetic test slice.</span></li>
          </ol>
          <p>The engineering lesson is to inspect the loss, execution timing, and every fold—not infer market skill from a neural-network label. <a href="/assets/projects/deep-momentum-method.md">Read the audit and remaining tests ↗</a></p>
        </details>
        <details className="dm-details">
          <summary>Read all nine fold records</summary>
          <table><caption>Archived synthetic run · values in percent</caption><thead><tr><th scope="col">Fold</th><th scope="col">Ann. return</th><th scope="col">Volatility</th><th scope="col">Max. drawdown</th></tr></thead><tbody>{folds.map((fold) => <tr key={fold.fold}><th scope="row">{fold.fold}</th><td>{fold.cagr.toFixed(2)}</td><td>{fold.vol.toFixed(2)}</td><td>{fold.drawdown.toFixed(2)}</td></tr>)}</tbody></table>
          <a href="/assets/projects/deep-momentum-folds.csv" download>Download original fold records ↗</a>
        </details>
      </div>
      <figcaption className="pv-caption">A working deep-learning research pipeline, not validated trading alpha. Simulated ETF-like data · 5 bps turnover costs · no real-market benchmark established. Architecture and figures refer to the archived audited version.</figcaption>
    </figure>
  );
}
