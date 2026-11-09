import QuickReview from "./QuickReview";
import Contact, { ContactLinks } from "./Contact";
import ScrollResearch from "./ScrollResearch";
import ResearchTheater from "./ResearchTheater";
import { ResearchRibbon } from "./Motion";
import { useState } from "react";
import Field from "./Field";
import { collections, getProject, projectUrl, shortNames } from "./data";
import { Arrow, ResearchCard } from "./Shared";
import { outcomes } from "../outcomes";

export default function Home({
  saved,
  onSave,
  paused,
}: {
  saved: string[];
  onSave: (id: string) => void;
  paused: boolean;
}) {
  const [audience, setAudience] = useState(0);
  const [experience, setExperience] = useState("overview");
  const [signal, setSignal] = useState(0);
  const [landscapeOpen, setLandscapeOpen] = useState(false);
  const signals = [
    {
      title: "A constraint changes the portfolio.",
      label: "01 / Portfolio construction",
      id: "customization",
    },
    {
      title: "A model has to beat something.",
      label: "02 / Model evaluation",
      id: "housing-forest",
    },
    {
      title: "A claim needs a source.",
      label: "03 / Research engineering",
      id: "pure-news",
    },
  ];
  const selected = signals[signal];
  return (
    <>
      <section className="a-home-hero a-shell" aria-labelledby="home-title">
        <div className="a-hero-grid">
          <div className="a-hero-copy">
            <p className="a-hero-identity">Josh Gutierrez<span>Investment research & portfolio analytics</span></p>
            <h1 id="home-title" tabIndex={-1}>
              Make the
              <br />
              decision
              <br />
              <em>defensible.</em>
            </h1>
            <p className="a-intro">
              My background spans institutional portfolio analytics and fixed income.
              I turn investment questions into research, models, and tools you can inspect.
            </p>
            <p className="a-hero-credentials">MBA + MS Finance, Northeastern <span aria-hidden="true">/</span> BA Economics, Hamilton</p>
            <div className="a-actions">
              <a className="a-button" href="#quick-review">
                See three selected projects <Arrow />
              </a>
            </div>
            <div className="a-hero-secondary"><a className="a-text-link" href="/lab/">Decision Lab <Arrow /></a><ContactLinks compact /></div>
          </div>
          <button className="a-landscape-toggle" aria-expanded={landscapeOpen} aria-controls="home-landscape" onClick={()=>setLandscapeOpen(!landscapeOpen)}>{landscapeOpen ? 'Close the research landscape' : 'Explore the research landscape'} <span aria-hidden="true">{landscapeOpen ? '−' : '+'}</span></button>
          <div id="home-landscape" className={`a-hero-landscape${landscapeOpen ? ' is-expanded' : ''}`}>
            <div className="a-landscape-meta">
              <span>THE RESEARCH LANDSCAPE</span>
              <span>JG / 001</span>
            </div>
            <Field paused={paused} mode={signal} />
            <div className="a-landscape-cross" aria-hidden="true">
              +
            </div>
            <div className="a-signal-card" aria-live="polite">
              <span className="a-eyebrow">{selected.label}</span>
              <h2>{selected.title}</h2>
              <a href={projectUrl(selected.id)}>
                Follow the question <Arrow />
              </a>
            </div>
            <div
              className="a-signal-controls"
              role="group"
              aria-label="Explore a research question"
            >
              {signals.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={s.label}
                  aria-pressed={signal === i}
                  onClick={() => setSignal(i)}
                >
                  0{i + 1}
                  <span />
                </button>
              ))}
            </div>
            <span className="a-art-note">
              Generative illustration. Not market data.
            </span>
          </div>
        </div>
      </section>
      <div id="quick-review"><QuickReview /></div>
      <div className="a-shell a-experience-choice" id="home-explore">
        <div><p className="a-eyebrow">CHOOSE YOUR DEPTH</p><h2>Follow the work your way.</h2></div>
        <div role="tablist" aria-label="Homepage experience">
          {[['overview','Research overview','Browse by discipline'],['interactive','Interactive stories','Explore the moving exhibits']].map(([id,title,detail]) => <button key={id} role="tab" id={`experience-${id}`} aria-selected={experience===id} aria-controls={`experience-panel-${id}`} tabIndex={experience===id?0:-1} onClick={()=>setExperience(id)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'overview':e.key==='End'?'interactive':experience==='overview'?'interactive':'overview';setExperience(next);document.getElementById(`experience-${next}`)?.focus();}}}><strong>{title}</strong><span>{detail}</span></button>)}
        </div>
      </div>
      <div role="tabpanel" hidden={experience !== 'interactive'} id="experience-panel-interactive" aria-labelledby="experience-interactive" tabIndex={0}>{experience === 'interactive' && <>
        <ResearchRibbon />
        <ResearchTheater />
        <ScrollResearch paused={paused} />
      <section className="a-feature-band">
        <div className="a-shell a-feature-grid">
          <div>
            <p className="a-eyebrow">Research you can question</p>
            <h2>
              Don’t just read
              <br />
              the conclusion.
              <br />
              <em>Work the problem.</em>
            </h2>
            <p>
              Change an assumption. Compare alternatives. Trace a claim. The
              Decision Lab puts the reasoning in your hands.
            </p>
            <a className="a-button" href="/lab/">
              Open the Decision Lab <Arrow />
            </a>
          </div>
          <a className="a-lab-teaser" href="/lab/">
            <span className="a-eyebrow">A TRADE-OFF, NOT A FREE LUNCH</span>
            <div className="a-teaser-number">
              $110<span>/ year</span>
            </div>
            <p>Modeled savings per $1m from lower turnover</p>
            <div className="a-teaser-track">
              <span />
              <span />
              <span />
            </div>
            <div className="a-teaser-risk">
              <strong>+27 bp</strong>
              <span>additional gross tracking error</span>
            </div>
            <small>
              Historical no-gold account · lower turnover vs minimum risk ·
              assumed costs
            </small>
            <span className="a-teaser-open">
              Explore the trade-off <Arrow />
            </span>
          </a>
        </div>
      </section>
      </>}</div>
      <div role="tabpanel" hidden={experience !== 'overview'} id="experience-panel-overview" aria-labelledby="experience-overview" tabIndex={0}>{experience === 'overview' && <>
      <section className="a-shell a-section" id="start">
        <div className="a-section-head">
          <div>
            <p className="a-eyebrow">Choose your lens</p>
            <h2>
              Different questions.
              <br />
              <em>The same standard.</em>
            </h2>
          </div>
          <p>
            There isn’t one way into this work.
            <br />
            Start with what matters to your team.
          </p>
        </div>
        <div
          className="a-audiences"
          role="group"
          aria-label="Choose an audience"
        >
          {collections.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setAudience(i)}
              aria-pressed={audience === i}
            >
              <span>0{i + 1}</span>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
              <Arrow />
            </button>
          ))}
        </div>
        <div className="a-card-grid" key={audience}>
          {collections[audience].ids.map((id) => (
            <ResearchCard
              key={id}
              project={getProject(id)}
              selected={saved.includes(id)}
              onSave={onSave}
            />
          ))}
        </div>
        <a className="a-section-link" href="/research/">
          View the complete research library <Arrow />
        </a>
      </section>
      <section className="a-shell a-section">
        <div className="a-section-head">
          <div>
            <p className="a-eyebrow">What the research taught me</p>
            <h2>
              Interesting results.
              <br />
              <em>Including the inconvenient ones.</em>
            </h2>
          </div>
          <p>A negative finding can be the most useful output of a study.</p>
        </div>
        <div className="a-findings">
          {["sentiment-lab", "housing-forest", "macro-regime"].map((id, i) => (
            <a href={projectUrl(id)} key={id}>
              <span className="a-findings-index">0{i + 1}</span>
              <div>
                <span className="a-eyebrow">{shortNames[id]}</span>
                <h3>{outcomes[id].finding}</h3>
              </div>
              <Arrow />
            </a>
          ))}
        </div>
      </section>
      </>}</div>
      <section className="a-shell a-home-about">
        <div className="a-monograph" aria-hidden="true">
          <span>JG</span>
          <small>CONTEXT → QUESTION → EVIDENCE</small>
        </div>
        <div>
          <p className="a-eyebrow">The person behind the questions</p>
          <h2>
            Investment context.
            <br />
            <em>Research curiosity.</em>
          </h2>
          <p>
            My background connects institutional portfolio analytics,
            fixed-income communication, and graduate investment research. That
            perspective shapes what I choose to build—and what I choose to
            challenge.
          </p>
          <div className="a-actions">
            <a className="a-button a-button-outline" href="/about/">
              My story & experience <Arrow />
            </a>
            <a href="/methods/" className="a-text-link">
              How I work <Arrow />
            </a>
          </div>
        </div>
      </section>
      <div className="a-shell"><Contact /></div>
    </>
  );
}
