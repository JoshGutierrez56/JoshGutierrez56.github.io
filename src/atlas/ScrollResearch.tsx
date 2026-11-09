import { useEffect, useRef, useState } from "react";
import { scenarios } from "../content";
import { projectUrl } from "./data";
import { Arrow } from "./Shared";

const chapters = [
  {
    id: "customization",
    label: "01 / Portfolio construction",
    title: "A restriction moves more than a weight.",
    text: "A no-gold account forces an allocation choice. The historical comparison makes the trade-off between tracking risk and trading cost visible.",
    boundary:
      "2014–2025 historical study · assumed trading costs · not live performance",
    short: "Allocate",
  },
  {
    id: "pure-news",
    label: "02 / Disclosure research",
    title: "Follow a claim all the way to its source.",
    text: "Pure News links disclosure changes to source passages. A changed sentence is the beginning of a research question—not proof of a new catalyst.",
    boundary:
      "Frozen public prototype · workflow illustration · not live inference",
    short: "Trace",
  },
  {
    id: "housing-forest",
    label: "03 / Model evaluation",
    title: "The better-looking model can still lose.",
    text: "The saved housing model fits closely, but its forecast error exceeds persistence. Put the comparison before the impressive-looking fit.",
    boundary:
      "Saved historical comparison · current-vintage data · not a production forecast",
    short: "Challenge",
  },
  {
    id: "covenant-risk",
    label: "04 / Risk analysis",
    title: "The path matters before the endpoint.",
    text: "The debt-covenant scenario follows pressure through time. Its cumulative breach rates describe one conditional simulation, not borrower default probabilities.",
    boundary:
      "200,000 simulated paths · conditional assumptions · not realized losses",
    short: "Stress-test",
  },
];

function Graphic({ stage }: { stage: number }) {
  return (
    <svg
      className={`a-story-svg story-stage-${stage}`}
      viewBox="0 0 620 365"
      role="img"
      aria-label={
        stage === 0
          ? "Saved annual gross tracking error: proportional 1.75%, minimum risk 1.37%, lower turnover 1.64%."
          : stage === 1
            ? "Conceptual workflow: disclosure, change, prior source, research question."
            : stage === 2
              ? "Housing forecast RMSE: random forest 5.579 versus persistence 2.782."
              : "Conditional simulated cumulative covenant breaches: 43.5% by year one and 89.8% by year five. Not default probabilities."
      }
    >
      <defs>
        <pattern
          id={`story-grid-${stage}`}
          width="31"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M31 0H0V30"
            fill="none"
            stroke="#254da4"
            strokeOpacity=".07"
          />
        </pattern>
      </defs>
      <rect width="620" height="365" fill={`url(#story-grid-${stage})`} />
      {stage === 0 && (
        <g className="a-story-marks">
          <text x="35" y="40" className="story-chart-label">
            GROSS TRACKING ERROR / ANNUALIZED
          </text>
          {scenarios.map((s, i) => (
            <g key={s.id}>
              <text x="35" y={94 + i * 82} className="story-chart-name">
                {s.short}
              </text>
              <rect
                className="story-bar"
                x="195"
                y={70 + i * 82}
                width={(s.te / 2) * 330}
                height="32"
                fill={i === 1 ? "#254da4" : "#92add6"}
                style={{ animationDelay: `${i * 110}ms` }}
              />
              <text
                x={205 + (s.te / 2) * 330}
                y={93 + i * 82}
                className="story-chart-value"
              >
                {s.te.toFixed(2)}%
              </text>
            </g>
          ))}
          <text x="35" y="337" className="story-chart-foot">
            Lower turnover: about $110 less annual cost per $1m, +27 bp risk vs
            minimum risk.
          </text>
        </g>
      )}
      {stage === 1 && (
        <g className="a-story-marks">
          <text x="35" y="40" className="story-chart-label">
            EVIDENCE-LINKED WORKFLOW
          </text>
          <path
            className="story-flow"
            d="M110 155H510"
            fill="none"
            stroke="#7c9ccc"
            strokeWidth="2"
          />
          {["DISCLOSURE", "CHANGE", "PRIOR SOURCE", "QUESTION"].map((s, i) => (
            <g
              key={s}
              className="story-source-node"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <rect
                x={36 + i * 146}
                y="115"
                width="112"
                height="80"
                rx="5"
                fill={i === 3 ? "#254da4" : "#fff"}
                stroke="#8aa8d2"
              />
              {[0, 1, 2].map((n) => (
                <path
                  key={n}
                  d={`M${56 + i * 146} ${137 + n * 16}h${n === 2 ? 35 : 65}`}
                  stroke={i === 3 ? "#fff" : "#92add6"}
                  strokeWidth="3"
                />
              ))}
              <text
                x={92 + i * 146}
                y="228"
                textAnchor="middle"
                className="story-chart-label"
              >
                {s}
              </text>
            </g>
          ))}
          <circle className="story-packet" r="5" fill="#254da4" />
          <text x="35" y="292" className="story-chart-value">
            995 disclosure changes linked to source passages.
          </text>
          <text x="35" y="323" className="story-chart-foot">
            Animated sequence illustrates the workflow; it is not processing
            live documents.
          </text>
        </g>
      )}
      {stage === 2 && (
        <g className="a-story-marks">
          <text x="35" y="40" className="story-chart-label">
            HOUSING FORECAST RMSE / LOWER IS BETTER
          </text>
          {[
            { name: "Random forest", value: 5.579 },
            { name: "Persistence", value: 2.782 },
          ].map((s, i) => (
            <g key={s.name}>
              <text x="35" y={121 + i * 105} className="story-chart-name">
                {s.name}
              </text>
              <rect
                className="story-bar"
                x="210"
                y={95 + i * 105}
                width={(s.value / 6) * 300}
                height="40"
                fill={i ? "#254da4" : "#92add6"}
                style={{ animationDelay: `${i * 180}ms` }}
              />
              <text
                x={220 + (s.value / 6) * 300}
                y={122 + i * 105}
                className="story-chart-value"
              >
                {s.value.toFixed(3)}
              </text>
            </g>
          ))}
          <text x="35" y="303" className="story-chart-value">
            The simpler baseline had about half the error.
          </text>
          <text x="35" y="334" className="story-chart-foot">
            Saved evaluation values. Animation reveals the bars; it does not
            rerun a forecast.
          </text>
        </g>
      )}
      {stage === 3 && (
        <g className="a-story-marks">
          <text x="35" y="40" className="story-chart-label">
            CUMULATIVE COVENANT BREACH / CONDITIONAL SIMULATION
          </text>
          {[
            { x: 185, label: "YEAR 1", value: 43.5 },
            { x: 440, label: "YEAR 5", value: 89.8 },
          ].map((s, i) => (
            <g key={s.label}>
              <circle
                cx={s.x}
                cy="174"
                r="77"
                fill="none"
                stroke="#d7e1f0"
                strokeWidth="13"
              />
              <circle
                className="story-risk-ring"
                cx={s.x}
                cy="174"
                r="77"
                fill="none"
                stroke="#254da4"
                strokeWidth="13"
                pathLength="100"
                strokeDasharray={`${s.value} 100`}
                transform={`rotate(-90 ${s.x} 174)`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
              <text
                x={s.x}
                y="182"
                textAnchor="middle"
                className="story-ring-number"
              >
                {s.value}%
              </text>
              <text
                x={s.x}
                y="282"
                textAnchor="middle"
                className="story-chart-label"
              >
                {s.label}
              </text>
            </g>
          ))}
          <text
            x="310"
            y="182"
            textAnchor="middle"
            className="story-chart-value"
          >
            →
          </text>
          <text x="35" y="337" className="story-chart-foot">
            Conditional covenant breaches, not defaults. No intermediate rates
            are inferred.
          </text>
        </g>
      )}
    </svg>
  );
}

export default function ScrollResearch({ paused }: { paused: boolean }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = matchMedia("(max-width: 760px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (paused || reduce.matches || narrow.matches) return;
      const steps = ref.current?.querySelectorAll<HTMLElement>(".a-story-step");
      if (!steps) return;
      let distance = Infinity,
        index = 0;
      steps.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - innerHeight * 0.5);
        if (d < distance) {
          distance = d;
          index = i;
        }
      });
      setActive(index);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, [paused]);
  const select = (i: number) => {
    setActive(i);
    if (
      !paused &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !matchMedia("(max-width: 760px)").matches
    )
      ref.current
        ?.querySelectorAll(".a-story-step")
        [i]?.scrollIntoView({ block: "center", behavior: "smooth" });
  };
  const item = chapters[active];
  return (
    <section
      className="a-scroll-research a-shell"
      ref={ref}
      aria-labelledby="scroll-research-heading"
    >
      <div className="a-section-head">
        <div>
          <p className="a-eyebrow">INSIDE THE WORK / FOUR DECISIONS</p>
          <h2 id="scroll-research-heading">
            Scroll through the question.
            <br />
            <em>Watch the evidence take shape.</em>
          </h2>
        </div>
        <p>
          Allocation. Sources. Baselines. Risk.
          <br />
          Four different questions, grounded in the work.
        </p>
      </div>
      <div className="a-story-layout">
        <div className="a-story-steps">
          {chapters.map((c, i) => (
            <article
              key={c.id}
              className={`a-story-step ${active === i ? "is-current" : ""}`}
            >
              <span className="a-eyebrow">{c.label}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <small>{c.boundary}</small>
              <a href={projectUrl(c.id)}>
                Explore the research <Arrow />
              </a>
            </article>
          ))}
        </div>
        <div className="a-story-visual">
          <div className="a-story-console-head">
            <span>RESEARCH IN FOCUS</span>
            <span>0{active + 1} / 04</span>
          </div>
          <nav aria-label="Choose a visual research chapter">
            {chapters.map((c, i) => (
              <button
                key={c.id}
                aria-pressed={active === i}
                onClick={() => select(i)}
              >
                {c.short}
              </button>
            ))}
          </nav>
          <div className="a-story-graphic" key={active}>
            <Graphic stage={active} />
          </div>
          <div className="a-story-caption">
            <strong>{item.title}</strong>
            <p>{item.boundary}</p>
            <a href={projectUrl(item.id)}>
              Inspect the case study <Arrow />
            </a>
          </div>
          <div className="a-story-segments" aria-hidden="true">
            {chapters.map((c, i) => (
              <span key={c.id} className={active >= i ? "complete" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
