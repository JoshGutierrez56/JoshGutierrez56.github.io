import ProjectVisual from "./ProjectVisual";

const lenses = [
  { id: "portfolio", label: "Portfolio choices", detail: "Risk, constraints & costs" },
  { id: "models", label: "Model evaluation", detail: "Complexity versus a baseline" },
  { id: "evidence", label: "Disclosure evidence", detail: "A change is not yet a thesis" },
  { id: "risk", label: "Risk & underwriting", detail: "Follow the path, not just the endpoint" },
];

const cases: Record<string, { project: string; title: string; question: string; finding: string; implication: string; boundary: string; related: { id: string; label: string }[] }> = {
  models: {
    project: "housing-forest", title: "The simple forecast had half the error.",
    question: "A random forest tracks the housing index closely. The useful comparison is whether it improves on carrying forward the latest observation.",
    finding: "The saved forest has R² 0.978, but RMSE 5.579 versus 2.782 for persistence. The simpler forecast wins this comparison.",
    implication: "Evaluate on matched dates, choose a baseline that fits the decision, and distinguish visual fit from incremental forecasting value.",
    boundary: "Historical, current-vintage housing data; contemporaneous macro inputs are not reconstructed release-time information. Not a production forecast.",
    related: [{ id: "housing-forest", label: "Inspect the forest comparison" }, { id: "liquidity", label: "Compare liquidity forecasts" }, { id: "deep-momentum", label: "Explore a trained LSTM" }, { id: "sentiment-lab", label: "See NLP after trading costs" }],
  },
  evidence: {
    project: "pure-news", title: "Changed wording did not establish a new catalyst.",
    question: "A filing introduces stronger debt language. Before writing a thesis, check the prior disclosure and the role of each cited fact.",
    finding: "In the frozen Kraft Heinz example, an earlier 8-K already contained related financing information. A textual change alone does not establish a new investment catalyst.",
    implication: "Trace the source, challenge novelty, separate facts from inference, and let unsupported ideas stop at a research question.",
    boundary: "A saved disclosure-review example, not live inference, a default claim, or demonstrated analyst productivity. Formal blinded review remains pending.",
    related: [{ id: "pure-news", label: "Follow the evidence workflow" }, { id: "news-research", label: "Read the underlying null finding" }, { id: "corporate-niche", label: "Explore business-model measurement" }],
  },
  risk: {
    project: "covenant-risk", title: "Loan risk accumulates before maturity.",
    question: "A terminal snapshot can miss earlier pressure. Follow simulated income, floating-rate debt service, and covenant tests through the life of a loan.",
    finding: "In the saved 200,000-path scenario, 43.5% of paths breached a covenant by year one and 89.8% by year five. These are conditional simulated breaches, not default probabilities or realized losses.",
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
        <p className="p-eyebrow">A decision from the research</p><h3>{example.title}</h3>
        <dl><div><dt>What the evidence says</dt><dd>{example.finding}</dd></div><div><dt>What changes</dt><dd>{example.implication}</dd></div></dl>
        <p className="p-decision-boundary">{example.boundary}</p>
        <div className="p-decision-links">{example.related.map(link => <a key={link.id} href={`#project-${link.id}`}>{link.label} <span aria-hidden="true">↗</span></a>)}</div>
      </div>
      <div className="p-decision-exhibit"><ProjectVisual id={example.project} /></div>
    </div>}
  </>;
}

export const researchMethods = [
  { area: "Portfolio construction", title: "Turn conviction into an allocation", description: "The Black–Litterman prototype connects analyst confidence to constrained weights. The customization study quantifies how account restrictions change tracking risk and trading costs.", links: [{ id: "black-litterman", label: "Analyst views → allocation" }, { id: "customization", label: "Client restrictions → tracking risk" }] },
  { area: "Research engineering", title: "Make an equity study inspectable", description: "Optlab connects ten signal definitions and four universe presets to portfolio reporting. The business-model map separately tests whether a constructed measure recovers known synthetic structure.", links: [{ id: "optlab", label: "Universe and signal definitions" }, { id: "corporate-niche", label: "Competitive-crowding measurement" }] },
  { area: "Time-series research", title: "Separate hindsight from a decision", description: "The HMM exposes full-history and sequential state estimates side by side. Liquidity models use lagged inputs and training-only fitting, with an explicit boundary around previously viewed evaluation data.", links: [{ id: "macro-hmm", label: "Filtered versus full-history regimes" }, { id: "liquidity", label: "Chronological forecast comparison" }] },
  { area: "Model selection", title: "Identify what deserves to be used", description: "The simple housing forecast beat the random forest; sentiment's attractive gross Sharpe disappeared after modeled base costs. These comparisons show why a model should not be promoted on a headline metric.", links: [{ id: "housing-forest", label: "Random forest versus persistence" }, { id: "sentiment-lab", label: "NLP signals after costs" }] },
  { area: "Implementation & risk", title: "Challenge the portfolio arithmetic", description: "A separate Python / SQL implementation reconciled 30 historical portfolio paths and caught five injected faults. Risk Parity connects covariance-based targets to holdings that drift between rebalances.", links: [{ id: "customization", label: "Independent Python / SQL oversight" }, { id: "risk-parity", label: "Risk allocation and holdings drift" }] },
  { area: "Interactive research tools", title: "Make the evidence usable", description: "Pure News links 995 disclosure changes to source passages. Trading Floor offers six repeatable practice modes with feedback. Both make the reasoning available to inspect; user benefit remains a separate evaluation.", links: [{ id: "pure-news", label: "Evidence-linked disclosure review" }, { id: "trading-floor", label: "Practice, explanation and replay" }] },
];
