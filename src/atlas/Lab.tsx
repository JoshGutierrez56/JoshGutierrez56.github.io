import { useState } from "react";
import { scenarios } from "../content";
import ProjectVisual from "./AsyncProjectVisual";
import { labCases, projectUrl } from "./data";
import { PageHeading, Arrow } from "./Shared";

function AllocationLab() {
  const [method, setMethod] = useState("turnover");
  const [account, setAccount] = useState(1000000);
  const selected = scenarios.find((s) => s.id === method)!;
  const money = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  return (
    <div className="a-allocation-lab">
      <div className="a-lab-controls">
        <p className="a-eyebrow">CHANGE THE DECISION</p>
        <h3>
          Three allocations.
          <br />
          One restriction.
        </h3>
        <div role="group" aria-label="Allocation method">
          {scenarios.map((s) => (
            <button
              key={s.id}
              aria-pressed={method === s.id}
              onClick={() => setMethod(s.id)}
            >
              <span>{s.name}</span>
              <span>{method === s.id ? "●" : "○"}</span>
            </button>
          ))}
        </div>
        <label htmlFor="lab-account">
          Illustrative account size <output>{money(account)}</output>
        </label>
        <input
          id="lab-account"
          type="range"
          min="250000"
          max="5000000"
          step="250000"
          value={account}
          aria-valuetext={money(account)}
          onChange={(e) => setAccount(Number(e.target.value))}
        />
        <p>
          Account size scales modeled dollars only. It does not rerun the
          historical study or change risk.
        </p>
        <button
          className="a-reset"
          onClick={() => {
            setAccount(1000000);
            setMethod("turnover");
          }}
        >
          Reset scenario ↺
        </button>
      </div>
      <div className="a-lab-results">
        <div className="a-lab-result-heading">
          <span className="a-eyebrow">
            HISTORICAL NO-GOLD ACCOUNT / 2014–2025
          </span>
          <span>Saved observations</span>
        </div>
        <h3>{selected.name}</h3>
        <p>{selected.description}</p>
        <div className="a-metric-pair" aria-live="polite">
          <div>
            <strong>{money((account * selected.cost) / 10000)}</strong>
            <span>Modeled annual trading cost</span>
          </div>
          <div>
            <strong>
              {selected.te.toFixed(2)}
              <small>%</small>
            </strong>
            <span>Gross tracking error</span>
          </div>
        </div>
        <div className="a-bars" aria-label="Gross tracking error by allocation">
          {scenarios.map((s) => (
            <div key={s.id} className={s.id === method ? "active" : ""}>
              <div>
                <span>{s.name}</span>
                <strong>{s.te.toFixed(2)}%</strong>
              </div>
              <span style={{ width: `${(s.te / 2) * 100}%` }} />
            </div>
          ))}
        </div>
        <p className="a-lab-insight">
          {method === "turnover"
            ? `${money((account * (scenarios[1].cost - selected.cost)) / 10000)} less modeled cost per year than minimum risk, with about 27 bp more gross tracking error.`
            : method === "risk"
              ? "The lowest realized tracking error among these three allocations. It also has the most trading."
              : "Simple redistribution avoids a covariance model, but had higher realized tracking error than both alternatives."}
        </p>
        <p className="a-lab-fineprint">
          Assumed cost: 5 bp per dollar traded. Constant reference NAV; not a
          compounded benefit. Gross tracking error measures variability of
          active returns, not a fee or predicted loss.
        </p>
      </div>
    </div>
  );
}

export default function Lab() {
  const [selected, setSelected] = useState(0);
  const item = labCases[selected];
  return (
    <div className="a-shell">
      <PageHeading
        label="THE DECISION LAB"
        title="Change something."
        accent="See what matters."
        description="Five guided encounters with the research. Explore saved historical comparisons, source-linked examples, and synthetic scenarios—with their assumptions visible."
      />
      <div className="a-lab-layout">
        <nav className="a-lab-menu" aria-label="Choose a lab experiment">
          {labCases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
            >
              <span>{c.label}</span>
              <strong>{c.title}</strong>
              <small>{c.subtitle}</small>
            </button>
          ))}
        </nav>
        <section
          className="a-lab-workspace"
          key={item.id}
          aria-labelledby="lab-question"
        >
          <div className="a-lab-question">
            <span className="a-eyebrow">{item.label}</span>
            <h2 id="lab-question">{item.title}</h2>
            <p>{item.question}</p>
          </div>
          {selected === 0 ? (
            <AllocationLab />
          ) : (
            <div className="a-exhibit portfolio-root">
              <ProjectVisual id={item.id} />
            </div>
          )}
          <a className="a-lab-source" href={projectUrl(item.id)}>
            Read the complete case study and limitations <Arrow />
          </a>
        </section>
      </div>
      <div className="a-lab-footer">
        <h2>Exploration is not validation.</h2>
        <p>
          Controls help explain a model or a saved comparison. They don’t turn
          an illustration into live performance, a simulated event into a
          forecast, or a prototype into a production system.
        </p>
      </div>
    </div>
  );
}
