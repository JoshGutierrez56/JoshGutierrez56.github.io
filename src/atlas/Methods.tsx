import MethodWorkbench from "./MethodWorkbench";
import { useState } from "react";
import { researchMethods } from "../ResearchBreadth";
import { PageHeading, Arrow } from "./Shared";
import { projectUrl } from "./data";

export default function Methods() {
  const [active, setActive] = useState(0);
  const selected = researchMethods[active];
  return (
    <div className="a-shell">
      <PageHeading
        label="METHODS / EVIDENCE MAP"
        title="Capabilities connect."
        accent="Evidence anchors them."
        description="Select a discipline to see how it appears in the work. This is a map of demonstrated project methods—not a self-rated skills chart."
      />
      <section className="a-map-layout">
        <div className="a-method-map">
          <svg viewBox="0 0 600 500" aria-hidden="true">
            <defs>
              <radialGradient id="map-glow">
                <stop stopColor="#254da4" stopOpacity=".1" />
                <stop offset="1" stopColor="#254da4" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="250" r="240" fill="url(#map-glow)" />
            {researchMethods.map((_, i) => {
              const theta = (i * Math.PI) / 3 - Math.PI / 2;
              return (
                <line
                  className={
                    active === i
                      ? "method-connection active"
                      : "method-connection"
                  }
                  key={i}
                  x1="300"
                  y1="250"
                  x2={300 + 200 * Math.cos(theta)}
                  y2={250 + 175 * Math.sin(theta)}
                  stroke={active === i ? "#254da4" : "#becde3"}
                  strokeDasharray={active === i ? undefined : "3 6"}
                />
              );
            })}
            <circle
              className="method-core"
              cx="300"
              cy="250"
              r="63"
              fill="#e2ebf9"
              stroke="#9eb6dc"
            />
            <text
              x="300"
              y="244"
              textAnchor="middle"
              fill="#263348"
              fontSize="18"
            >
              JUDGMENT
            </text>
            <text
              x="300"
              y="267"
              textAnchor="middle"
              fill="#59677c"
              fontSize="9"
              letterSpacing="2"
            >
              + EVIDENCE
            </text>
          </svg>
          <div
            className="a-map-buttons"
            role="group"
            aria-label="Select a research capability"
          >
            {researchMethods.map((m, i) => (
              <button
                key={m.area}
                className={`a-map-node node-${i}`}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                <strong>{m.area}</strong>
              </button>
            ))}
          </div>
        </div>
        <div className="a-map-detail" aria-live="polite" key={active}>
          <span className="a-eyebrow">DISCIPLINE 0{active + 1}</span>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <span className="a-eyebrow">SEE IT IN THE WORK</span>
          <div className="a-source-list">
            {selected.links.map((l) => (
              <a key={l.id} href={projectUrl(l.id)}>
                {l.label}
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>
      <MethodWorkbench />
      <section className="a-method-boundaries">
        <h2>
          Different evidence.
          <br />
          <em>Different claims.</em>
        </h2>
        <div>
          {[
            [
              "Historical research",
              "Describes a defined sample under recorded assumptions. It is not live performance.",
            ],
            [
              "Synthetic experiments",
              "Test behavior under controlled assumptions. They do not establish real-world probabilities.",
            ],
            [
              "Software & prototypes",
              "Show implementation and a workflow. Tests are not proof of user benefit or predictive value.",
            ],
            [
              "AI-assisted development",
              "Used in project development. Research direction and interpretation should not be confused with unaided production-coding experience.",
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
