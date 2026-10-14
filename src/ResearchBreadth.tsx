import ProjectVisual from "./ProjectVisual";

const lenses = [
  { id: "portfolio", label: "Portfolio choices", detail: "Risk, constraints & costs" },
  { id: "models", label: "Model evaluation", detail: "Complexity versus a baseline" },
  { id: "evidence", label: "Disclosure evidence", detail: "A change is not yet a thesis" },
  { id: "risk", label: "Risk & underwriting", detail: "Follow the path, not just the endpoint" },
];

const cases: Record<string, { project: string; title: string; question: string; finding: string; implication: string; boundary: string; related: { id: string; label: string }[] }> = {
  models: {
    project: "housing-forest", title: "Does a high R² beat a simple forecast?",
    question: "A random forest tracks the housing index closely. The useful comparison is whether it improves on carrying forward the latest observation.",
    finding: "The saved forest has R² 0.978, but RMSE 5.579 versus 2.782 for persistence. The simpler forecast wins this comparison.",
    implication: "Evaluate on matched dates, choose a baseline that fits the decision, and distinguish visual fit from incremental forecasting value.",
    boundary: "Historical, current-vintage housing data; contemporaneous macro inputs are not reconstructed release-time information. Not a production forecast.",
    related: [{ id: "housing-forest", label: "Inspect the forest comparison" }, { id: "liquidity", label: "Compare liquidity forecasts" }, { id: "deep-momentum", label: "Explore a trained LSTM" }, { id: "sentiment-lab", label: "See NLP after trading costs" }],
  },
  evidence: {
    project: "pure-news", title: "New wording—or genuinely new information?",
    question: "A filing introduces stronger debt language. Before writing a thesis, check the prior disclosure and the role of each cited fact.",
    finding: "In the frozen Kraft Heinz example, an earlier 8-K already contained related financing information. A textual change alone does not establish a new investment catalyst.",
    implication: "Trace the source, challenge novelty, separate facts from inference, and let unsupported ideas stop at a research question.",
    boundary: "A saved disclosure-review example, not live inference, a default claim, or demonstrated analyst productivity. Formal blinded review remains pending.",
    related: [{ id: "pure-news", label: "Follow the evidence workflow" }, { id: "news-research", label: "Read the underlying null finding" }, { id: "corporate-niche", label: "Explore business-model measurement" }],
  },
  risk: {
    project: "covenant-risk", title: "Can a loan breach before its final year?",
    question: "A terminal snapshot can miss earlier pressure. Follow simulated income, floating-rate debt service, and covenant tests through the life of a loan.",
    finding: "The saved 200,000-path scenario accumulates breaches over five years. A covenant breach is not the same event as default or a realized credit loss.",
    implication: "Keep path-dependent events separate from terminal outcomes, and identify which assumptions create the risk before interpreting a probability.",
    boundary: "Synthetic scenario, not a calibrated borrower forecast. The model excludes refinancing, cures and several real-world interactions.",
    related: [{ id: "covenant-risk", label: "Inspect the debt-covenant model" }, { id: "risk-parity", label: "Compare capital and risk shares" }, { id: "garch-volatility", label: "Explore asymmetric volatility" }, { id: "real-estate-risk", label: "Question smoothed property returns" }],
  },
};

export function DecisionExplorer({ selected, onChange }: { selected: string; onChange: (id: string) => void }) {
  const example = cases[selected];
  return <>
    <div className="p-decision-lenses" role="group" aria-label="Choose a research decision">
      {lenses.map(lens => <button key={lens.id} type="button" aria-pressed={selected === lens.id} onClick={() => onChange(lens.id)}><strong>{lens.label}</strong><span>{lens.detail}</span></button>)}
    </div>
    {example && <div className="p-decision-case" key={selected}>
      <div className="p-decision-narrative">
        <p className="p-eyebrow">A decision from the research</p><h3>{example.title}</h3><p>{example.question}</p>
        <dl><div><dt>What the evidence says</dt><dd>{example.finding}</dd></div><div><dt>What changes</dt><dd>{example.implication}</dd></div></dl>
        <p className="p-decision-boundary">{example.boundary}</p>
        <div className="p-decision-links">{example.related.map(link => <a key={link.id} href={`#project-${link.id}`}>{link.label} <span aria-hidden="true">↗</span></a>)}</div>
      </div>
      <div className="p-decision-exhibit"><ProjectVisual id={example.project} /></div>
    </div>}
  </>;
}

export const researchMethods = [
  { area: "Investment framing", title: "Translate beliefs into choices", description: "Define the portfolio decision, constraints, and economic tradeoff before choosing the model. Conviction and a portfolio weight are different objects.", links: [{ id: "black-litterman", label: "Analyst views → allocation" }, { id: "customization", label: "Client restrictions → tracking risk" }] },
  { area: "Data & measurement", title: "Make the input inspectable", description: "Separate source facts, constructed measures, and interpretation. A useful representation must first show what it measures—not just produce an attractive chart.", links: [{ id: "optlab", label: "Universe and signal definitions" }, { id: "corporate-niche", label: "Competitive-crowding measurement" }] },
  { area: "Chronology", title: "Respect the information clock", description: "Distinguish filtering from hindsight, lag estimates before decisions, and state when revised data prevent a true point-in-time reconstruction.", links: [{ id: "macro-hmm", label: "Filtered versus full-history regimes" }, { id: "liquidity", label: "Chronological forecast comparison" }] },
  { area: "Model evaluation", title: "Make complexity earn its place", description: "Compare models with simple alternatives on matched observations. Keep forecast accuracy, semantic validity, and net investment performance as separate questions.", links: [{ id: "housing-forest", label: "Random forest versus persistence" }, { id: "sentiment-lab", label: "NLP signals after costs" }] },
  { area: "Implementation & risk", title: "Reconcile what the model did", description: "Check holdings, cash, fees and timing independently. Use hand-derived cases and injected faults, then examine covariance and path-dependent risk.", links: [{ id: "customization", label: "Independent Python / SQL oversight" }, { id: "risk-parity", label: "Risk allocation and holdings drift" }] },
  { area: "Research communication", title: "Deliver something people can examine", description: "Connect conclusions to evidence, retain rejected hypotheses, and make the logic explorable. An interactive tool is a starting point for user evaluation, not proof of usefulness.", links: [{ id: "pure-news", label: "Evidence-linked disclosure review" }, { id: "trading-floor", label: "Practice, explanation and replay" }] },
];
