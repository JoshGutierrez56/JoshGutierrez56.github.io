import EvidencePreview from "./EvidencePreview";
import { useEffect, useState } from "react";
import { projects } from "../content";
import { stories } from "../stories";
import { outcomes } from "../outcomes";
import ProjectVisual from "./AsyncProjectVisual";
import { Arrow } from "./Shared";
import { projectUrl, shortNames, themeFor, sourceUrl } from "./data";

export default function CaseStudy({
  id,
  saved,
  onSave,
}: {
  id: string;
  saved: string[];
  onSave: (id: string) => void;
}) {
  const p = projects.find((x) => x.id === id)!;
  const story = stories[id];
  const [tab, setTabState] = useState("overview");
  const [copied, setCopied] = useState(false);
  const tabs = [
    { id: "overview", name: "The decision" },
    { id: "exhibit", name: "Explore the exhibit" },
    { id: "method", name: "Under the hood" },
    { id: "contribution", name: "My contribution" },
    { id: "evidence", name: "Sources & limits" },
  ];
  const setTab = (next: string) => {
    setTabState(next);
    setCopied(false);
    const hash = `#chapter=${next}`;
    if (location.hash !== hash) history.pushState({}, '', location.pathname + hash);
  };
  useEffect(() => {
    const readChapter = () => {
      const requested = new URLSearchParams(location.hash.slice(1)).get('chapter');
      const next = tabs.some(t => t.id === requested) ? requested! : 'overview';
      setTabState(next);
      setCopied(false);
      if (requested) requestAnimationFrame(() => document.getElementById(`tab-${next}`)?.scrollIntoView({block:'start',behavior:'instant'}));
    };
    readChapter();
    window.addEventListener('popstate', readChapter);
    window.addEventListener('hashchange', readChapter);
    return () => { window.removeEventListener('popstate', readChapter); window.removeEventListener('hashchange', readChapter); };
  }, [id]);
  const related = projects
    .filter((x) => x.id !== id && x.category === p.category)
    .slice(0, 3);
  return (
    <article className={`a-case ${themeFor(p.category)}`}>
      <header className="a-shell a-case-header a-case-immersive">
        <div className="a-case-header-copy">
        <a href="/research/" className="a-back">
          ← Research library
        </a>
        <div className="a-case-meta">
          <span>
            {p.category} / {p.number.padStart(2, "0")}
          </span>
          <span>{p.status}</span>
        </div>
        <h1 tabIndex={-1}>{shortNames[id]}</h1>
        <p className="a-case-question">{p.question}</p>
        <div className="a-role-summary"><strong>MY ROLE</strong><p>{p.contribution}</p></div>
        <div className="a-case-tools">
          <button className="a-text-link a-source-shortcut" onClick={()=>{setTab('evidence');requestAnimationFrame(()=>{document.getElementById('tab-evidence')?.scrollIntoView({block:'start',behavior:'instant'});document.getElementById('tab-evidence')?.focus({preventScroll:true});});}}>Sources & limitations <Arrow /></button>
          <button className="a-button" onClick={()=>{setTab('exhibit');requestAnimationFrame(()=>{document.getElementById('tab-exhibit')?.scrollIntoView({block:'start',behavior:'instant'});document.getElementById('tab-exhibit')?.focus({preventScroll:true});});}}>Inspect the exhibit <Arrow /></button>
          <button
            className="a-button a-button-outline"
            aria-pressed={saved.includes(id)}
            onClick={() => onSave(id)}
          >
            {saved.includes(id) ? "✓ In comparison" : "+ Add to comparison"}
          </button>
          <a
            href={p.links[0]?.href || "/research/"}
            className="a-text-link"
            target="_blank"
            rel="noreferrer"
          >
            {p.links[0]?.label || "Research library"} <Arrow />
          </a>
        </div>
        </div>
        <EvidencePreview id={id} status={p.status} onOpen={()=>{setTab("exhibit");requestAnimationFrame(()=>document.getElementById("tab-exhibit")?.scrollIntoView({block:"start",behavior:"instant"}));}} />
      </header>
      <div className="a-case-navigation">
        <div
          className="a-shell a-tabs"
          role="tablist"
          aria-label="Case study chapters"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => {
                if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key))
                  return;
                e.preventDefault();
                const i = tabs.findIndex((x) => x.id === tab);
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? tabs.length - 1
                      : (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) %
                        tabs.length;
                setTab(tabs[n].id);
                document.getElementById(`tab-${tabs[n].id}`)?.focus();
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <div
        key={tab}
        className="a-shell a-case-panel"
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
      >
        <div className="a-chapter-sharing"><span>CHAPTER / {tabs.find(t => t.id === tab)?.name}</span><button onClick={async()=>{try{await navigator.clipboard.writeText(`${location.origin}${location.pathname}#chapter=${tab}`);setCopied(true);}catch{setCopied(false);}}}>{copied?'Link copied':'Copy chapter link'}</button><span className="a-visually-hidden" role="status">{copied ? 'Chapter link copied to clipboard' : ''}</span></div>
        {tab === "overview" && (
          <>
            <div className="a-case-overview">
              <div>
                <p className="a-eyebrow">THE IMPLICATION</p>
                <h2>What this changes.</h2>
                <p>{outcomes[id].implication}</p>
                <p className="a-scope">{story.evidenceNote}</p>
                <button className="a-button" onClick={() => setTab("exhibit")}>
                  Inspect the exhibit <Arrow />
                </button>
              </div>
              <aside role="note" className="a-case-brief">
                <span className="a-eyebrow">THE RESEARCH PATH</span>
                <ol className="a-brief-steps">{story.steps.map(step=><li key={step.label}>{step.label}</li>)}</ol>
                <details className="a-full-walkthrough"><summary>Read the full walkthrough</summary><p>{story.walkthrough}</p></details>
                <div className="a-tags">
                  {p.methods.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </aside>
            </div>
            <div className="a-narrative-grid">
              <section>
                <span className="a-eyebrow">01 / THE QUESTION</span>
                <h3>Start with the decision.</h3>
                <p>{story.context}</p>
              </section>
              <section>
                <span className="a-eyebrow">02 / THE JUDGMENT</span>
                <h3>The choice that mattered.</h3>
                <p>{story.decision}</p>
              </section>
              <section>
                <span className="a-eyebrow">03 / THE LEARNING</span>
                <h3>What I take forward.</h3>
                <p>{story.learning}</p>
              </section>
            </div>
          </>
        )}
        {tab === "exhibit" && (
          <>
            <div className="a-exhibit-intro">
              <div>
                <p className="a-eyebrow">THE RESEARCH, UP CLOSE</p>
                <h2>Inspect the evidence.</h2>
              </div>
              <p>
                {story.evidenceNote} Some exhibits are interactive; others
                explain the saved method or result.
              </p>
            </div>
            <div className="a-exhibit portfolio-root">
              <ProjectVisual id={id} />
            </div>
            <div className="a-boundary">
              <strong>Interpretation boundary</strong>
              <p>{p.limitation}</p>
            </div>
          </>
        )}
        {tab === "method" && (
          <>
            <div className="a-method-intro">
              <p className="a-eyebrow">IMPLEMENTATION & REASONING</p>
              <h2>
                How the question
                <br />
                <em>became a study.</em>
              </h2>
              <p>{p.contribution}</p>
            </div>
            <ol className="a-process">
              {story.steps.map((step, i) => (
                <li key={step.label}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{step.label}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="a-narrative-grid a-two-col">
              <section>
                <h3>The approach</h3>
                <p>{story.approach}</p>
              </section>
              <section>
                <h3>The next test</h3>
                <p>{story.nextStep}</p>
              </section>
            </div>
            <p className="a-disclosure">
              I directed the research and investment interpretation; implementation was AI-assisted.
            </p>
          </>
        )}
        {tab === "contribution" && <section className="a-contribution">
          <p className="a-eyebrow">ROLE / REASONING / IMPLEMENTATION</p>
          <h2>What I brought to this project.</h2>
          <p>{p.contribution}</p>
          <div className="a-narrative-grid a-two-col"><section><h3>The investment judgment</h3><p>{story.decision}</p></section><section><h3>What I learned</h3><p>{story.learning}</p></section></div>
          <div className="chapter-art-methods">{p.methods.map(m=><span key={m}>{m}</span>)}</div>
          <p className="a-disclosure">I directed the research and investment interpretation; implementation was AI-assisted. Independent or student research, not an employer deliverable.</p>
        </section>}
        {tab === "evidence" && (
          <>
            <div className="a-evidence-grid">
              <div>
                <p className="a-eyebrow">SOURCE MATERIAL</p>
                <h2>Follow the trail.</h2>
                <div className="a-source-list">
                  {p.links.map((link) => (
                    <a
                      key={link.href}
                      href={sourceUrl(link.href)}
                      target={
                        link.download || sourceUrl(link.href).startsWith("/")
                          ? undefined
                          : "_blank"
                      }
                      rel={link.download ? undefined : "noreferrer"}
                      download={link.download}
                    >
                      <span>
                        {link.label}
                        <small>
                          {sourceUrl(link.href).startsWith("/")
                            ? "Public project resource"
                            : new URL(link.href).hostname}
                        </small>
                      </span>
                      <Arrow />
                    </a>
                  ))}
                </div>
              </div>
              <aside role="note" className="a-boundary">
                <strong>What this does not establish</strong>
                <p>{p.limitation}</p>
                <p>{story.evidenceNote}</p>
              </aside>
            </div>
            <div className="a-discussion">
              <p className="a-eyebrow">QUESTIONS WORTH ASKING</p>
              {story.discussion.map((q) => (
                <p key={q}>{q}</p>
              ))}
            </div>
          </>
        )}
      </div>
      <section className="a-shell a-related">
        <p className="a-eyebrow">KEEP EXPLORING</p>
        <div>
          {related.length ? (
            related.map((r) => (
              <a href={projectUrl(r.id)} key={r.id}>
                <span>{shortNames[r.id]}</span>
                <Arrow />
              </a>
            ))
          ) : (
            <a href="/research/">
              Explore all research <Arrow />
            </a>
          )}
        </div>
      </section>
    </article>
  );
}
