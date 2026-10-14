import { useId, useState } from "react";

type CostScenario = "gross" | "base" | "conservative";
const scenarios: { id: CostScenario; label: string; detail: string }[] = [
  { id: "gross", label: "Before costs", detail: "Gross" },
  { id: "base", label: "Base costs", detail: "Net" },
  { id: "conservative", label: "Higher costs", detail: "Conservative net" },
];
// Saved five-session portfolio Sharpe ratios, not event-level return ratios.
// Generic results are reported to four decimal places in the public README.
// Redesign values are from the pinned, public machine-readable evidence.
const models = [
  { id: "generic", label: "Generic sentiment", gross: 1.1396, base: 0.0082, conservative: -1.6210 },
  { id: "surprise", label: "Event-surprise redesign", gross: -0.27756334294066975, base: -0.7014459027310229, conservative: -1.1471453384121082 },
];

export default function SentimentVisual() {
  const [scenario, setScenario] = useState<CostScenario>("base");
  const uniqueId = useId();
  const selected = scenarios.find((item) => item.id === scenario)!;
  const zero = (2 / 3.5) * 100;

  return (
    <figure className="project-visual pv-sentiment">
      <div className="pv-label"><span className="pv-dot" aria-hidden="true" /><span>Applied transformers. Tested decisions.</span></div>
      <div className="pv-body">
        <div className="pv-visual-heading"><strong>Language is not an edge by itself.</strong><span>What survives the cost of acting on it?</span></div>
        <div className="sv-models" aria-label="Pretrained model roles">
          <div><b>Qwen</b><span>Structured assessment</span></div><span className="sv-versus" aria-hidden="true">↔</span><div><b>FinBERT</b><span>Sentiment reference</span></div>
        </div>
        <p className="sv-provenance">Pretrained inference · no transformer weights trained</p>
        <div className="sv-controls" role="group" aria-label="Sentiment study cost scenario">
          {scenarios.map((item) => <button type="button" key={item.id} aria-pressed={item.id === scenario} onClick={() => setScenario(item.id)}>{item.label}<span>{item.detail}</span></button>)}
        </div>
        <div className="sv-chart" role="group" aria-label={`${selected.label}: saved five-session portfolio Sharpe ratios`}>
          <div className="sv-chart-label"><span>Five-session strategy · annualized Sharpe</span><span>{selected.detail}</span></div>
          {models.map((model) => {
            const value = model[scenario];
            return <div className={`sv-row ${value < 0 ? "sv-negative" : ""}`} key={model.id}>
              <div className="sv-row-label"><span>{model.label}</span><b>{value.toFixed(4)}</b></div>
              <div className="sv-track" aria-hidden="true"><span className="sv-zero" style={{ left: `${zero}%` }} /><span className="sv-bar" style={{ left: `${value < 0 ? zero + value / 3.5 * 100 : zero}%`, width: `${Math.abs(value) / 3.5 * 100}%` }} /></div>
            </div>;
          })}
          <div className="sv-scale" aria-hidden="true"><span>−2.0</span><span style={{ left: `${zero}%` }}>0</span><span>+1.5</span></div>
        </div>
        <div className="sv-decision" aria-live="polite" aria-atomic="true"><strong>Neither strategy was promoted.</strong><span>{scenario === "gross" ? "Generic sentiment looked attractive before costs; the redesign was negative even gross." : scenario === "base" ? "Base costs consumed the generic signal's apparent advantage. The redesign remained negative." : "Under the conservative cost assumptions, both specifications had negative Sharpe."}</span></div>
        <div className="sv-split"><b>5,000 articles · 125 companies</b><span>Chronological split: 3,000 development / 1,000 validation / 1,000 holdout</span></div>
        <details className="sv-details"><summary>Inspect all six saved results</summary>
          <table><caption id={`${uniqueId}-caption`}>Five-session portfolio Sharpe by cost scenario</caption><thead><tr><th scope="col">Specification</th><th scope="col">Gross</th><th scope="col">Base net</th><th scope="col">Higher-cost net</th></tr></thead><tbody>{models.map((model) => <tr key={model.id}><th scope="row">{model.label}</th><td>{model.gross.toFixed(4)}</td><td>{model.base.toFixed(4)}</td><td>{model.conservative.toFixed(4)}</td></tr>)}</tbody></table>
          <p>The redesign's holdout IC had been viewed before its portfolio specification was frozen. These are two related specifications, not independent replications. Cost controls reveal saved scenarios; they do not rerun models.</p>
          <a href="/assets/projects/sentiment-cost-comparison.csv" download>Download the aggregate comparison ↗</a>
        </details>
      </div>
      <figcaption className="pv-caption">Saved historical NLP evaluation · Final redesign is a retrospective, not a pristine holdout · Modeled costs and licensed source data · No live inference or alpha claim.</figcaption>
    </figure>
  );
}
