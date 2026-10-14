import { useId, useState } from "react";

// Original aggregate simulation output, not a fitted curve or a new model run.
// Full quarter-level data and assumptions are linked beside the chart.
const cumulativeBreach = [
  0.04503, 0.177655, 0.316035, 0.43452, 0.52841,
  0.60315, 0.66226, 0.70923, 0.747465, 0.7794,
  0.805915, 0.82834, 0.84744, 0.85884, 0.86777,
  0.875475, 0.882205, 0.888085, 0.893, 0.89758,
];
const yearEndFloors = [
  { dscr: 0.975, debtYield: 7.125 },
  { dscr: 1.075, debtYield: 7.291666666666667 },
  { dscr: 1.175, debtYield: 7.458333333333333 },
  { dscr: 1.2, debtYield: 7.5 },
  { dscr: 1.2, debtYield: 7.5 },
];

export default function CovenantVisual() {
  const [year, setYear] = useState(5);
  const uid = useId();
  const selected = cumulativeBreach[year * 4 - 1];
  const floors = yearEndFloors[year - 1];
  const x = (quarter: number) => 57 + (quarter / 20) * 480;
  const y = (probability: number) => 198 - probability * 158;
  const curve = cumulativeBreach.map((probability, index) => `${x(index + 1)},${y(probability)}`).join(" ");

  return (
    <figure className="project-visual pv-covenant-risk">
      <div className="pv-label">
        <span className="pv-dot" aria-hidden="true" />
        <span>Follow the loan through time</span>
        <a className="pv-original" href="/assets/projects/covenant-risk.png" target="_blank" rel="noreferrer" aria-label="Open the original covenant-breach chart in a new tab">Original ↗</a>
      </div>
      <div className="pv-body">
        <div className="pv-visual-heading">
          <strong>A loan has to pass along the way.</strong>
          <span>Choose a horizon in the original simulation.</span>
        </div>
        <div className="cv-years" role="group" aria-label="Covenant simulation horizon">
          {[1, 2, 3, 4, 5].map((value) => <button type="button" key={value} aria-pressed={year === value} onClick={() => setYear(value)}>Year {value}</button>)}
        </div>
        <svg className="pv-diagram cv-chart" viewBox="0 0 600 248" role="img" aria-labelledby={`${uid}-title ${uid}-description`}>
          <title id={`${uid}-title`}>Cumulative covenant-breach probability</title>
          <desc id={`${uid}-description`}>In 200,000 simulated paths, at least one covenant breach occurred in 43.5 percent by year one, 70.9 percent by year two, 82.8 percent by year three, 87.5 percent by year four, and 89.8 percent by year five. The selected horizon is year {year}, at {(selected * 100).toFixed(1)} percent. These conditional probabilities are not default probabilities.</desc>
          <text className="cv-axis-title" x="57" y="23">Paths with a breach by this point (%)</text>
          {[0, 0.5, 1].map((tick) => <g key={tick}>
            <line className="pv-grid" x1="57" x2="537" y1={y(tick)} y2={y(tick)} />
            <text className="cv-axis" x="44" y={y(tick) + 6} textAnchor="end">{tick * 100}</text>
          </g>)}
          <polyline className="cv-curve" points={curve} />
          <line className="cv-selection" x1={x(year * 4)} x2={x(year * 4)} y1={y(selected)} y2="198" />
          {[1, 2, 3, 4, 5].map((value) => <g key={value}>
            <circle className="cv-year-point" cx={x(value * 4)} cy={y(cumulativeBreach[value * 4 - 1])} r={value === year ? 7 : 4} />
            <text className="cv-axis" x={x(value * 4)} y="222" textAnchor="middle">{value}</text>
          </g>)}
          <circle className="cv-ring" cx={x(year * 4)} cy={y(selected)} r="13" />
          <text className="cv-axis-title" x="300" y="246" textAnchor="middle">Years into the loan</text>
        </svg>
        <div className="cv-readout" aria-live="polite" aria-atomic="true">
          <div className="cv-probability"><strong>{(selected * 100).toFixed(1)}<span>%</span></strong><p>of simulated paths with <b>at least one breach</b> by year {year}</p></div>
          <div className="cv-floors"><span>Year-{year} end loan tests</span><p>DSCR ≥ <b>{floors.dscr.toFixed(3)}x</b><br />Debt yield ≥ <b>{floors.debtYield.toFixed(3)}%</b></p></div>
        </div>
        <p className="cv-explanation">Longer horizons include earlier breaches. Requirements also tighten; this is not a forecast of when a borrower defaults.</p>
      </div>
      <figcaption className="pv-caption">200,000 simulated paths · Seed 42 · Assumption-sensitive case study. <a href="/assets/projects/covenant-risk-method.md">Assumptions & evidence ↗</a></figcaption>
    </figure>
  );
}
