import { useId, useState } from "react";
import { Arrow } from "./Shared";
import { projectUrl } from "./data";

const chapters = [
  { id: "customization", name: "The allocation", field: "PORTFOLIO CONSTRUCTION", title: "Every constraint leaves a signature.", description: "A portfolio is a set of choices. Follow how customization changes tracking error, turnover, and the cost of implementation.", anchors: ["Constraints", "Risk", "Turnover"], question: "What changes when the account is no longer the benchmark?" },
  { id: "pure-news", name: "The evidence", field: "RESEARCH ENGINEERING", title: "Find the change. Keep the source.", description: "Move from a disclosure to a source-linked change, then to a research question. The trail matters as much as the signal.", anchors: ["Disclosure", "Comparison", "Source"], question: "Can another researcher retrace the claim?" },
  { id: "housing-forest", name: "The challenger", field: "MODEL EVALUATION", title: "Complexity has to earn its place.", description: "A housing forecast is only useful against a credible alternative. Inspect the forest model alongside the persistence baseline.", anchors: ["Forecast", "Baseline", "Error"], question: "Does the more elaborate model actually help?" },
  { id: "covenant-risk", name: "The boundary", field: "CONDITIONAL RISK", title: "The boundary is part of the story.", description: "Explore the conditions behind covenant breaches. Simulated paths describe an assumption-dependent experiment, not observed defaults.", anchors: ["Paths", "Threshold", "Assumptions"], question: "Which assumptions move the risk boundary?" },
];

/** Gemini-assisted art direction; geometry is illustrative, never financial output. */
export default function ResearchTheater() {
  const [active, setActive] = useState(0);
  const [tension, setTension] = useState(50);
  const uid = useId().replace(/:/g, "");
  const chapter = chapters[active];
  return (
    <section className={`a-theater theater-mode-${active}`} aria-label="Research in motion">
      <div className="theater-masthead"><span>SELECTED WORK / FOUR WAYS IN</span><span>JOSH GUTIERREZ / RESEARCH ATLAS</span></div>
      <div className="theater-stage">
        <div className="theater-copy" key={chapter.id}>
          <p className="a-eyebrow">0{active + 1} / {chapter.field}</p>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
          <a className="a-button" href={projectUrl(chapter.id)}>Open the case study <Arrow /></a>
        </div>
        <div className="theater-instrument">
          <svg viewBox="0 0 640 480" role="img" aria-label={`Illustrative ${chapter.field.toLowerCase()} geometry; not research data`}>
            <defs>
              <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#254da4" strokeOpacity=".08" /></pattern>
              <linearGradient id={`${uid}-ink`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#254da4" /><stop offset="1" stopColor="#91add8" /></linearGradient>
            </defs>
            <rect x="0" y="0" width="640" height="480" fill={`url(#${uid}-grid)`} />
            <g className="theater-calibration" fill="none" stroke="#becde3"><circle cx="320" cy="240" r="178" /><circle cx="320" cy="240" r="130" strokeDasharray="2 9" /><path d="M320 30V450M100 240H540" /></g>
            <g fill="none" stroke={`url(#${uid}-ink)`}>
              {Array.from({ length: 25 }, (_, i) => {
                const y = 90 + i * 12;
                const bend = (i - 12) * (1 + tension / 45);
                const d = active === 0
                  ? `M70 ${y} C235 ${y + bend},${260 + tension} ${240 - bend},320 240 S470 ${y - bend},570 ${y}`
                  : active === 1
                    ? `M70 ${y} H${185 + i * 2} Q${240 + tension} ${y},320 240 T${480 - i * 2} ${y} H570`
                    : active === 2
                      ? `M70 ${y} C180 ${y - tension * 2},230 ${y + tension * 2},320 ${y} S460 ${y - tension * 2},570 ${y}`
                      : `M70 240 C180 ${240 + bend},350 ${y - tension},570 ${y + bend * .6}`;
                return <path key={i} className="theater-filament" d={d} strokeWidth={i % 6 === 0 ? 2 : .8} opacity={i % 6 === 0 ? .9 : .4} style={{ animationDelay: `${-i * .23}s` }} />;
              })}
            </g>
            {active === 3 && <g className="theater-boundary"><path d={`M440 55V425`} stroke="#263348" strokeWidth="2" strokeDasharray="5 5" /><text x="450" y="75" fill="#263348" fontSize="11">THRESHOLD</text></g>}
            <g className="theater-hub"><circle cx="320" cy="240" r="32" fill="#f5f7fb" stroke="#254da4" /><circle cx="320" cy="240" r="23" fill="#e2ebf9" /><path d="M309 240h22M320 229v22" stroke="#254da4" strokeWidth="2" /></g>
            {chapter.anchors.map((label, i) => <g key={label}><rect x={80 + i * 186} y="433" width="108" height="28" rx="14" fill="#f5f7fb" stroke="#bdcde4" /><text x={134 + i * 186} y="451" textAnchor="middle" fill="#263348" fontSize="11">{label}</text></g>)}
            <text x="16" y="22" fill="#59677c" fontSize="10" letterSpacing="2">CONCEPTUAL INSTRUMENT / 0{active + 1}</text>
          </svg>
          <label className="theater-control"><span>Reshape the illustration</span><input type="range" min="0" max="100" value={tension} onChange={e => setTension(Number(e.target.value))} aria-label="Illustration tension" /></label>
          <p className="theater-disclaimer">An interactive visual metaphor. No model runs or financial estimates.</p>
        </div>
      </div>
      <div className="theater-question"><span>THE QUESTION</span><p aria-live="polite">{chapter.question}</p><span>0{active + 1} / 04</span></div>
      <div className="theater-chapters" role="group" aria-label="Choose a research chapter">
        {chapters.map((c, i) => <button key={c.id} aria-pressed={active === i} onClick={() => setActive(i)}><span className="theater-chapter-number">0{i + 1}</span><strong>{c.name}</strong><span className="theater-chapter-field">{c.field}</span><span className="theater-chapter-line" /></button>)}
      </div>
    </section>
  );
}
