import { useEffect, useMemo, useState } from "react";
import { categories, github, projects, scenarios, type Category } from "./content";
import ProjectCard from "./ProjectCard";
import { stories } from "./stories";
import { featuredProjects, featuredSelection, isFeatured, linkedin, moreProjects } from "./projectSelection";


function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [category, setCategory] = useState<Category>("All work");
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState<(typeof scenarios)[number]["id"]>("turnover");
  const [account, setAccount] = useState(1000000);
  const [metric, setMetric] = useState<"te" | "turnover">("te");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState<string | null>(null);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const showProject = (id: string) => {
    setCategory("All work");
    setQuery("");
    setExpanded(id);
    setLibraryOpen(isFeatured(id) ? null : id);
    setScrollTarget(id);
  };
  useEffect(() => {
    const followHash = () => {
      const id = window.location.hash.replace("#project-", "");
      if (projects.some((project) => project.id === id)) showProject(id);
    };
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, []);
  useEffect(() => {
    if (!scrollTarget) return;
    const target = document.getElementById(`project-${scrollTarget}`);
    target?.scrollIntoView({ block: "start" });
    const focusTarget = target?.matches("details") ? target.querySelector<HTMLElement>(":scope > summary") : target;
    focusTarget?.focus({ preventScroll: true });
    setScrollTarget(null);
  }, [scrollTarget]);
  const visible = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === "All work" || project.category === category) &&
          [project.title, project.question, project.result, project.category, stories[project.id].subtitle, ...project.methods]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );
  const selected = scenarios.find((item) => item.id === method) ?? scenarios[2];
  const featuredVisible = featuredProjects.filter((project) => visible.includes(project));
  const moreVisible = moreProjects.filter((project) => visible.includes(project));
  const isFiltering = Boolean(query || category !== "All work");
  const toggleStory = (id: string) => {
    const opening = expanded !== id;
    setExpanded(opening ? id : null);
    if (opening) setScrollTarget(id);
  };
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  const annualCost = (account * selected.cost) / 10000;
  const savings = (account * (scenarios[1].cost - selected.cost)) / 10000;
  const axisMax = metric === "te" ? 2 : 20;
  const metricLabel = metric === "te" ? "Realized gross tracking error" : "Annual one-way turnover";
  const reset = () => {
    setCategory("All work");
    setQuery("");
  };

  return (
    <div className="portfolio-root" onClick={(event) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#project-"]');
      const id = link?.getAttribute("href")?.replace("#project-", "");
      if (id && projects.some((project) => project.id === id)) showProject(id);
    }}>
      <a className="p-skip" href="#main">
        Skip to content
      </a>
      <header className="p-header p-shell">
        <a className="p-brand" href="#home" aria-label="Josh Gutierrez home">
          <span className="p-monogram">
            JG<span>.</span>
          </span>
          <span className="p-brand-name">Josh Gutierrez</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work" onClick={reset}>Featured</a>
          <a href="#more-projects" onClick={reset}>More projects</a>
          <a href="#about">About</a>
        </nav>
        <a className="p-github" href={github} target="_blank" rel="noreferrer">
          GitHub <Arrow diagonal />
        </a>
      </header>

      <main id="main">
        <section id="home" className="p-hero p-shell" aria-labelledby="hero-heading">
          <div className="p-hero-copy">
            <p className="p-eyebrow">
              <span className="p-dot" /> Josh Gutierrez / Investment research
            </p>
            <h1 id="hero-heading">
              Better questions.
              <br />
              <span>Clearer decisions.</span>
            </h1>
            <p className="p-hero-intro">
              I build portfolio models and research tools that make investment decisions easier
              to examine. Explore five selected projects, their results, and the evidence behind them.
            </p>
            <div className="p-hero-actions">
              <a className="p-button" href="#work" onClick={reset}>
                Explore my top five <Arrow />
              </a>
              <a className="p-text-link" href="#tradeoffs">
                Try a portfolio decision <Arrow />
              </a>
            </div>
            <a className="p-hero-proof" href="#project-customization">
              <span className="p-label">Inside the portfolio oversight lab</span>
              <strong>30 portfolio paths. Independently checked.</strong>
              <span>Python + SQL reconstruction · five injected faults caught <Arrow /></span>
            </a>
            <div className="p-hero-foot">
              <span>MBA + MS in Finance</span>
              <span>
                Institutional perspective.
                <br />
                Independent research.
              </span>
            </div>
          </div>
          <figure className="p-hero-art">
            <div className="p-image-frame">
              <img
                src="/assets/research-cover.webp"
                alt="Abstract physical balance of sculptural forms, illustrating portfolio tradeoffs"
                fetchPriority="high"
                width="1200"
                height="1200"
              />
            </div>
            <figcaption>
              <span>01 / A study in tradeoffs</span>
              <span>Conceptual illustration, not data</span>
            </figcaption>
          </figure>
        </section>

        <section id="work" className="p-work p-shell p-section" aria-labelledby="work-heading">
          <div id="start" className="p-anchor" />
          <div className="p-section-heading">
            <div>
              <p className="p-eyebrow">01 / Five featured projects</p>
              <h2 id="work-heading">Investment questions.<br /><span>Work you can inspect.</span></h2>
            </div>
            <p>Start with portfolio decisions, research tools, or model evaluation. Each project includes an interactive exhibit, a 60-second walkthrough, and its sources.</p>
          </div>
          <nav className="p-featured-index" aria-label="Jump to a featured project">
            {featuredSelection.map((project, index) => (
              <a key={project.id} href={`#project-${project.id}`}>
                <span className="p-index-number">0{index + 1}</span>
                <span><strong>{project.label}</strong><small>{project.area}</small></span>
                <Arrow />
              </a>
            ))}
          </nav>
          <div className="p-collection-links">
            <a href="#more-projects" onClick={reset}>Browse {moreProjects.length} more projects <Arrow /></a>
            <a href="#project-deep-momentum">Explore the trained LSTM <Arrow /></a>
          </div>
          <div className="p-work-tools">
            <div className="p-filter-group" role="group" aria-label="Filter projects by category">
              {categories.map((item) => (
                <button key={item} type="button" aria-pressed={category === item}
                  className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
            <label className="p-search">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="p-sr-only">Search projects</span>
              <input type="search" placeholder={`Search all ${projects.length} projects...`} value={query}
                onChange={(event) => setQuery(event.target.value)} />
            </label>
          </div>
          <div className="p-results-meta">
            <p role="status" aria-live="polite">
              {isFiltering ? `${visible.length} of ${projects.length} projects` : `${featuredVisible.length} featured projects`}
              <span aria-hidden="true"> &middot; </span>
              {isFiltering && `${featuredVisible.length} featured / `}{moreVisible.length} more
            </p>
            {isFiltering ? <button type="button" onClick={reset}>Reset filters</button>
              : <a href="#more-projects">Jump to more projects <Arrow /></a>}
          </div>
          <div className="p-project-list" aria-label="Featured projects">
            {featuredVisible.map((project) => (
              <ProjectCard key={project.id} project={project}
                number={`0${featuredProjects.indexOf(project) + 1}`}
                className={project.id === "customization" ? "p-featured-lead" : ""}
                expanded={expanded === project.id} onToggle={() => toggleStory(project.id)} />
            ))}
          </div>
          {featuredVisible.length === 0 && moreVisible.length > 0 && (
            <p className="p-filter-notice">Your matches are in <a href="#more-projects">More projects <Arrow /></a> below.</p>
          )}
          {visible.length === 0 && (
            <div className="p-empty">
              <h3>No projects match this combination.</h3>
              <p>Try a broader search, or return to all {projects.length} projects.</p>
              <button className="p-button" type="button" onClick={reset}>Show all work <Arrow /></button>
            </div>
          )}
          {(moreVisible.length > 0 || !isFiltering) && (
            <section id="more-projects" className="p-more-projects" aria-labelledby="more-heading">
              <div className="p-more-heading">
                <div><p className="p-eyebrow">Further explorations</p><h2 id="more-heading">More projects<span> / {moreVisible.length}</span></h2></div>
                <p>Neural networks, real estate, credit risk, and more. Open a project for its original interactive exhibit and complete research story.</p>
              </div>
              <div className="p-library-list">
                {moreVisible.map((project) => (
                  <details className="p-library-item" id={`project-${project.id}`} key={project.id} open={libraryOpen === project.id}>
                    <summary onClick={(event) => {
                      event.preventDefault();
                      const opening = libraryOpen !== project.id;
                      setLibraryOpen(opening ? project.id : null);
                      if (opening) setExpanded(project.id);
                    }}>
                      <span className="p-library-label">
                        <span className="p-library-meta">{project.category} &middot; {project.status}</span>
                        <strong>{project.title}</strong>
                        <span className="p-library-description">{stories[project.id].subtitle}</span>
                      </span>
                      <span className="p-library-action">{libraryOpen === project.id ? "Close" : "Explore"}<Arrow /></span>
                    </summary>
                    <ProjectCard project={project} embedded number={String(moreProjects.indexOf(project) + 6).padStart(2, "0")}
                      expanded={expanded === project.id} onToggle={() => toggleStory(project.id)} />
                  </details>
                ))}
              </div>
              <a className="p-back-featured" href="#work" onClick={reset}>Back to the featured five <Arrow /></a>
            </section>
          )}
        </section>

        <section id="tradeoffs" className="p-scenario-wrap" aria-labelledby="scenario-heading">
          <div className="p-shell p-section">
            <div className="p-section-heading">
              <div>
                <p className="p-eyebrow">02 / A closer look</p>
                <h2 id="scenario-heading">
                  Less trading.
                  <br />
                  <span>At what cost?</span>
                </h2>
              </div>
              <p>
                One account. No gold allocation. Three implementation choices. Explore the tradeoff
                in the saved 2014 to 2025 historical study.
              </p>
            </div>
            <div className="p-scenario-grid">
              <div className="p-scenario-controls">
                <span className="p-label">Choose an allocation method</span>
                <div className="p-methods" role="group" aria-label="Allocation method">
                  {scenarios.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={method === item.id ? "is-active" : ""}
                      aria-pressed={method === item.id}
                      onClick={() => setMethod(item.id)}
                    >
                      <span className="p-method-number">0{index + 1}</span>
                      <span>{item.name}</span>
                      <span className="p-method-check" aria-hidden="true">
                        {method === item.id ? "●" : "○"}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="p-method-description">{selected.description}</p>
                <div className="p-account">
                  <label htmlFor="account-size">
                    Illustrative account size{" "}
                    <output htmlFor="account-size">{money(account)}</output>
                  </label>
                  <input
                    id="account-size"
                    type="range"
                    min="250000"
                    max="5000000"
                    step="250000"
                    value={account}
                    aria-valuetext={money(account)}
                    onChange={(event) => setAccount(Number(event.target.value))}
                  />
                  <div className="p-range-ends">
                    <span>$250k</span>
                    <span>$5m</span>
                  </div>
                  <p>
                    Scales modeled annual cost only. Portfolio weights and historical risk
                    statistics do not change.
                  </p>
                </div>
              </div>
              <div className="p-scenario-results">
                <div className="p-scenario-title">
                  <p className="p-eyebrow">Historical no-gold account</p>
                  <span>2014 to 2025</span>
                </div>
                <h3>{selected.name}</h3>
                <div className="p-metric-grid" aria-live="polite" aria-atomic="true">
                  <div>
                    <span className="p-metric-value">
                      {selected.te.toFixed(2)}
                      <small>%</small>
                    </span>
                    <span>Gross tracking error</span>
                  </div>
                  <div>
                    <span className="p-metric-value">
                      {selected.turnover.toFixed(2)}
                      <small>%</small>
                    </span>
                    <span>Annual one-way turnover</span>
                  </div>
                  <div>
                    <span className="p-metric-value">{money(annualCost)}</span>
                    <span>Modeled annual cost</span>
                  </div>
                </div>
                <div className="p-chart-heading">
                  <span className="p-label">Compare all three methods</span>
                  <label>
                    <span className="p-sr-only">Chart metric</span>
                    <select
                      value={metric}
                      onChange={(event) => setMetric(event.target.value as "te" | "turnover")}
                    >
                      <option value="te">Tracking error</option>
                      <option value="turnover">Turnover</option>
                    </select>
                  </label>
                </div>
                <svg
                  className="p-chart"
                  viewBox="0 0 560 188"
                  role="img"
                  aria-labelledby="chart-title chart-description"
                >
                  <title id="chart-title">{`${metricLabel} by allocation method`}</title>
                  <desc id="chart-description">
                    {scenarios
                      .map(
                        (item) =>
                          `${item.name}: ${item[metric].toFixed(2)} percent${item.id === method ? ", selected" : ""}`,
                      )
                      .join(". ")}
                    . The data table below provides these values.
                  </desc>
                  {[0, 1, 2, 3, 4].map((tick) => (
                    <g key={tick}>
                      <line
                        x1={150 + tick * 87.5}
                        y1="12"
                        x2={150 + tick * 87.5}
                        y2="149"
                        stroke="#d7e0ec"
                        strokeDasharray={tick === 0 ? undefined : "3 4"}
                      />
                      <text
                        x={150 + tick * 87.5}
                        y="176"
                        textAnchor="middle"
                        className="p-chart-axis"
                      >
                        {((axisMax / 4) * tick).toFixed(metric === "te" ? 1 : 0)}%
                      </text>
                    </g>
                  ))}
                  {scenarios.map((item, index) => (
                    <g key={item.id}>
                      <text
                        x="0"
                        y={39 + index * 48}
                        className={
                          item.id === method ? "p-chart-label is-selected" : "p-chart-label"
                        }
                      >
                        {item.short}
                      </text>
                      <rect
                        x="150"
                        y={22 + index * 48}
                        width={(item[metric] / axisMax) * 350}
                        height="25"
                        rx="2"
                        fill={item.id === method ? "#254da4" : "#bbcbe2"}
                      />
                      <text
                        x={158 + (item[metric] / axisMax) * 350}
                        y={39 + index * 48}
                        className="p-chart-value"
                      >
                        {item[metric].toFixed(2)}%
                      </text>
                    </g>
                  ))}
                </svg>
                <svg
                  className="p-chart-mobile"
                  viewBox="0 0 300 208"
                  role="img"
                  aria-labelledby="mobile-chart-title mobile-chart-description"
                >
                  <title id="mobile-chart-title">{`${metricLabel} by allocation method`}</title>
                  <desc id="mobile-chart-description">
                    {scenarios
                      .map((item) => `${item.name}: ${item[metric].toFixed(2)} percent`)
                      .join(". ")}
                  </desc>
                  {scenarios.map((item, index) => (
                    <g key={item.id}>
                      <text x="0" y={18 + index * 60} fill="#263348" fontSize="13">
                        {item.short}
                      </text>
                      <text
                        x="300"
                        y={18 + index * 60}
                        textAnchor="end"
                        fill="#254da4"
                        fontSize="13"
                      >
                        {item[metric].toFixed(2)}%
                      </text>
                      <rect x="0" y={28 + index * 60} width="300" height="19" fill="#e8edf4" />
                      <rect
                        x="0"
                        y={28 + index * 60}
                        width={(item[metric] / axisMax) * 300}
                        height="19"
                        fill={item.id === method ? "#254da4" : "#bbcbe2"}
                      />
                    </g>
                  ))}
                  <text x="0" y="199" fontSize="11" fill="#59677c">
                    0%
                  </text>
                  <text x="300" y="199" textAnchor="end" fontSize="11" fill="#59677c">
                    {axisMax}%
                  </text>
                </svg>
                <p className="p-takeaway">
                  {method === "turnover" ? (
                    <>
                      Compared with minimum-risk allocation, roughly 60% less turnover saved{" "}
                      <strong>{money(savings)} a year</strong> at this account size, while realized
                      gross tracking error rose by about 27 basis points.
                    </>
                  ) : method === "risk" ? (
                    <>
                      This method had the <strong>lowest realized tracking error</strong> in the
                      no-gold comparison. It also traded more than either alternative.
                    </>
                  ) : (
                    <>
                      Redistribution without a risk model produced{" "}
                      <strong>higher realized tracking error</strong> than both alternatives in this
                      historical no-gold scenario.
                    </>
                  )}
                </p>
              </div>
            </div>
            <details className="p-data-detail">
              <summary>
                Read the data and assumptions <span aria-hidden="true">+</span>
              </summary>
              <div
                className="p-table-scroll"
                tabIndex={0}
                role="region"
                aria-label="No-gold scenario data table"
              >
                <table>
                  <caption>
                    Saved historical results. Annual modeled cost is scaled to {money(account)}.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Method</th>
                      <th scope="col">Gross TE</th>
                      <th scope="col">Annual one-way turnover</th>
                      <th scope="col">Annual cost rate</th>
                      <th scope="col">Scaled annual cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((item) => (
                      <tr key={item.id} className={item.id === method ? "is-selected" : ""}>
                        <th scope="row">
                          {item.name}
                          {item.id === method ? " (selected)" : ""}
                        </th>
                        <td>{item.te.toFixed(4)}%</td>
                        <td>{item.turnover.toFixed(4)}%</td>
                        <td>{item.cost.toFixed(4)} bp</td>
                        <td>{money((account * item.cost) / 10000)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-assumptions">
                <p>
                  <strong>Cost assumption:</strong> 5 basis points per dollar bought or sold. Annual
                  cost equals the saved annual cost rate multiplied by a constant illustrative
                  account value. This is not an exact compounded-return benefit, a forecast, or
                  guaranteed savings.
                </p>
                <p>
                  <strong>Risk definition:</strong> tracking error is the annualized standard
                  deviation of active daily returns. The chart uses gross tracking error; allocation
                  costs are shown separately. Lower tracking error does not mean a higher return or
                  a smaller cumulative return gap.
                </p>
              </div>
              <div className="p-source-links">
                <a href="/assets/no-gold-summary.csv" download>
                  Download the three source rows <Arrow />
                </a>
                <a href="/assets/portfolio-case-study.md" download>
                  Read methodology and limitations <Arrow />
                </a>
              </div>
            </details>
            <p className="p-scenario-note">
              Historical research, not an investment recommendation. Fixed eight-ETF universe;
              hypothetical restrictions and execution costs; no tax lots or calibrated market
              impact.
            </p>
          </div>
        </section>

        <section
          id="approach"
          className="p-approach p-shell p-section"
          aria-labelledby="approach-heading"
        >
          <div className="p-section-heading">
            <div>
              <p className="p-eyebrow">03 / Research approach</p>
              <h2 id="approach-heading">
                Make the reasoning
                <br />
                <span>reviewable.</span>
              </h2>
            </div>
            <p>
              The useful output is not always a winning signal. Sometimes it is a better baseline, a
              rejected hypothesis, or a clearer implementation decision.
            </p>
          </div>
          <div className="p-principles">
            <article>
              <span>01</span>
              <h3>Start with the decision</h3>
              <p>
                Define the investment question, a simple comparison, and the cost of being wrong
                before adding complexity.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Respect the information clock</h3>
              <p>
                Separate what was known then from what is known now. Record source timing, universe
                selection, and the evaluation boundary.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Keep the inconvenient result</h3>
              <p>
                Distinguish software checks from empirical evidence. Preserve null results, missed
                gates, and the limits of each claim.
              </p>
            </article>
          </div>
          <aside className="p-in-progress">
            <span className="p-status">Research in progress</span>
            <p>
              <strong>Earnings reactions &amp; execution research.</strong> Earnings work remains
              focused on source audits and evaluation design. The liquidity forecast comparison
              above is complete within its historical sample; whether it improves execution costs
              remains an open research question.
            </p>
          </aside>
        </section>

        <section id="about" className="p-about-wrap" aria-labelledby="about-heading">
          <div className="p-shell p-about">
            <div>
              <p className="p-eyebrow">04 / Behind the work</p>
              <h2 id="about-heading">
                Institutional context.
                <br />
                Independent curiosity.
              </h2>
            </div>
            <div className="p-about-copy">
              <p>
                I’m Josh Gutierrez, an MBA and MS in Finance graduate from Northeastern University.
                My background spans institutional portfolio analytics, fixed-income communication,
                and investment research.
              </p>
              <p>
                Prior experience includes AEW Capital Management, Loomis Sayles, Wellington
                Management, and Prime Buchholz. This site presents independent and student research,
                not work products or endorsements from former employers.
              </p>
              <p className="p-ownership">
                I direct the research questions, investment interpretation, and project development.
                These projects use AI-assisted development; the evidence and limitations remain part
                of the work.
              </p>
              <div className="p-contact-links">
                <a className="p-button" href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow diagonal /></a>
                <a className="p-text-link" href={github} target="_blank" rel="noreferrer">Explore my GitHub <Arrow diagonal /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="p-footer p-shell">
        <a className="p-brand" href="#home">
          <span className="p-monogram">
            JG<span>.</span>
          </span>
          <span>Josh Gutierrez</span>
        </a>
        <p>Questions first. Evidence always.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}
