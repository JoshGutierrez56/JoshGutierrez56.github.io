import { useEffect, useMemo, useState } from "react";
import ResearchTheater from "./ResearchTheater";
import { categories, projects } from "../content";
import { stories } from "../stories";
import { PageHeading, ResearchCard, Arrow } from "./Shared";
import { collections, shortNames, projectUrl } from "./data";

type LibraryFilters = {
  query: string;
  category: string;
  order: "curated" | "name";
  savedOnly: boolean;
};
const defaultFilters: LibraryFilters = {
  query: "", category: "All work", order: "curated", savedOnly: false,
};

function readLibraryFilters(): LibraryFilters {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  return {
    query: params.get("q") || "",
    category: categories.find((item) => item === category) || "All work",
    order: params.get("order") === "name" ? "name" : "curated",
    savedOnly: params.get("saved") === "1",
  };
}

function useLibraryFilters() {
  // Match the prerendered HTML first; URL state is applied after hydration.
  const [filters, setFilters] = useState<LibraryFilters>(defaultFilters);
  useEffect(() => {
    const restore = () => setFilters(readLibraryFilters());
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  function updateFilters(changes: Partial<LibraryFilters>) {
    const next = { ...filters, ...changes };
    setFilters(next);
    const url = new URL(window.location.href);
    const values = {
      q: next.query,
      category: next.category === "All work" ? "" : next.category,
      order: next.order === "curated" ? "" : next.order,
      saved: next.savedOnly ? "1" : "",
    };
    for (const [key, value] of Object.entries(values)) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    // Keep the library's Back destination without creating an entry per keystroke.
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }
  return { ...filters, updateFilters };
}

export default function Library({
  saved,
  onSave,
}: {
  saved: string[];
  onSave: (id: string) => void;
}) {
  const { query, category, order, savedOnly, updateFilters } = useLibraryFilters();
  const hasFilters = query !== "" || category !== "All work" || order !== "curated" || savedOnly;
  const ids = [
    ...new Set([
      ...collections.flatMap((c) => c.ids),
      ...projects.map((p) => p.id),
    ]),
  ];
  const visible = useMemo(
    () =>
      projects
        .filter(
          (p) =>
            (category === "All work" || p.category === category) &&
            (!savedOnly || saved.includes(p.id)) &&
            [
              p.id,
              p.title,
              p.question,
              shortNames[p.id],
              p.category,
              ...p.methods,
              stories[p.id].takeaway,
            ]
              .join(" ")
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          order === "name"
            ? shortNames[a.id].localeCompare(shortNames[b.id])
            : ids.indexOf(a.id) - ids.indexOf(b.id),
        ),
    [category, query, order, savedOnly, saved],
  );
  return (
    <div className="a-shell">
      <PageHeading
        label={`RESEARCH / ${projects.length} PROJECTS`}
        title="Questions worth"
        accent="working through."
        description="Portfolio construction, model evaluation, risk, and research engineering. Every study connects the question to a finding, an implementation, and its limits."
      />
      <a className="library-guided-link" href="/start-here/">Prefer a guided route? Start with six selected projects <Arrow /></a>
      <div className="a-library-tools">
        <label className="a-search">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Search research"
            placeholder="Search questions, methods, or projects…"
            value={query}
            onChange={(e) => updateFilters({ query: e.target.value })}
          />
          <span>{visible.length} results</span>
        </label>
        <label className="a-sort">
          Order
          <select value={order} onChange={(e) => updateFilters({ order: e.target.value === "name" ? "name" : "curated" })}>
            <option value="curated">Curated</option>
            <option value="name">A–Z</option>
          </select>
        </label>
      </div>
      <div className="a-filters" role="group" aria-label="Filter by discipline">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => updateFilters({ category: c })}
          >
            {c}
          </button>
        ))}
      </div>
      <h2 className="a-visually-hidden">Research results</h2>
      <div className="a-library-meta">
        <span aria-live="polite">
          {visible.length} of {projects.length} research projects
        </span>
        {hasFilters && <button onClick={() => updateFilters(defaultFilters)}>Reset filters</button>}
        <button
          onClick={() => updateFilters({ savedOnly: !savedOnly })}
          aria-pressed={savedOnly}
        >
          {savedOnly ? "✓ " : ""}Comparison list ({saved.length})
        </button>
      </div>
      {visible.length ? (
        <div className="a-card-grid a-library-grid">
          {visible.map((p) => (
            <ResearchCard
              key={p.id}
              project={p}
              selected={saved.includes(p.id)}
              onSave={onSave}
            />
          ))}
        </div>
      ) : (
        <div className="a-empty">
          <h2>No research matches that view.</h2>
          <p>Try a different term, or return to the complete collection.</p>
          <button
            className="a-button"
            onClick={() => updateFilters(defaultFilters)}
          >
            Reset view <Arrow />
          </button>
        </div>
      )}
      <details className="library-featured-stories"><summary>Explore the animated research showcase</summary><ResearchTheater /></details>
      <div className="a-library-bottom">
        <p>Looking for a faster way in?</p>
        <a href="/lab/">
          Try a research decision <Arrow />
        </a>
      </div>
    </div>
  );
}

export function Compare({
  saved,
  onSave,
}: {
  saved: string[];
  onSave: (id: string) => void;
}) {
  const selected = projects.filter((p) => saved.includes(p.id));
  return (
    <div className="a-shell">
      <PageHeading
        label="YOUR RESEARCH SHORTLIST"
        title="Compare the thinking."
        accent="Not a leaderboard."
        description="Put up to three studies side by side. Compare their questions, methods, evidence, and limits—not incomparable headline metrics."
      />
      {selected.length === 0 ? (
        <div className="a-empty">
          <h2>Your comparison starts in the library.</h2>
          <p>
            Use “Compare” on any project card to save it here. Your selection
            stays in this browser when storage is available.
          </p>
          <a className="a-button" href="/research/">
            Browse research <Arrow />
          </a>
        </div>
      ) : (
        <div className="a-compare-grid">
          {selected.map((p) => (
            <article key={p.id}>
              <div className="a-compare-title">
                <p className="a-eyebrow">{p.category}</p>
                <h2>{shortNames[p.id]}</h2>
                <button
                  onClick={() => onSave(p.id)}
                  aria-label={`Remove ${shortNames[p.id]} from comparison`}
                >
                  Remove ×
                </button>
              </div>
              {[
                ["The question", p.question],
                ["What the evidence says", p.result],
                ["Methods", p.methods.join(" · ")],
                ["Scope & limits", p.limitation],
              ].map(([title, text]) => (
                <section key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </section>
              ))}
              <a className="a-button a-button-outline" href={projectUrl(p.id)}>
                Read the case study <Arrow />
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
